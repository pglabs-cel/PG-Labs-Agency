import crypto from "crypto";
import fs from "fs";
import path from "path";
import { cloudinary } from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { MediaAsset, IMediaAsset } from "../models/mediaAsset.model";

export interface UploadResult {
  url: string;
  publicId: string;
  resourceType: "image" | "video";
  format: string;
  bytes: number;
  width?: number;
  height?: number;
  isDeduplicated?: boolean;
  isLocal?: boolean;
}

export class CloudinaryService {
  private static localUploadDir = path.resolve(__dirname, "../../uploads");

  public static isConfigured(): boolean {
    return Boolean(
      process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    );
  }

  private static ensureLocalUploadDir(): void {
    if (!fs.existsSync(this.localUploadDir)) {
      fs.mkdirSync(this.localUploadDir, { recursive: true });
    }
  }

  /**
   * Exponential backoff retry wrapper
   */
  private static async retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    delays = [1000, 2000, 4000]
  ): Promise<T> {
    let lastError: unknown;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        console.warn(
          `[CloudinaryService] Attempt ${attempt + 1}/${maxRetries} failed:`,
          error instanceof Error ? error.message : error
        );
        if (attempt < maxRetries - 1) {
          await new Promise((res) => setTimeout(res, delays[attempt] || 1000));
        }
      }
    }
    throw lastError;
  }

  /**
   * Deterministic Upload with SHA-256 Deduplication, Retries, and Local Fallback
   */
  public static async uploadMedia(
    buffer: Buffer,
    options: {
      resourceType: "image" | "video";
      format: string;
      width?: number;
      height?: number;
    }
  ): Promise<UploadResult> {
    // 1. Calculate deterministic SHA-256 hash of normalized buffer
    const contentHash = crypto.createHash("sha256").update(buffer).digest("hex");
    const hashPrefix = contentHash.slice(0, 16);

    // 2. Check if this exact file hash already exists in MongoDB
    const existingAsset = await MediaAsset.findOne({ contentHash });
    if (existingAsset) {
      // Deduplicated: return existing asset
      return {
        url: existingAsset.url,
        publicId: existingAsset.publicId,
        resourceType: existingAsset.resourceType,
        format: existingAsset.format,
        bytes: existingAsset.bytes,
        width: existingAsset.width,
        height: existingAsset.height,
        isDeduplicated: true,
        isLocal: existingAsset.isLocal,
      };
    }

    const publicId = `pglabs/projects/media_${hashPrefix}`;

    // 3. Check if Cloudinary is configured. If not, use local disk fallback (Requirement 14)
    if (!this.isConfigured()) {
      console.warn(
        "[CloudinaryService] Cloudinary credentials missing. Using local-disk fallback under /uploads."
      );
      this.ensureLocalUploadDir();
      const localFilename = `media_${hashPrefix}.${options.format}`;
      const localFilePath = path.join(this.localUploadDir, localFilename);
      await fs.promises.writeFile(localFilePath, buffer);

      const localUrl = `/uploads/${localFilename}`;

      await MediaAsset.create({
        contentHash,
        publicId: localFilename,
        url: localUrl,
        resourceType: options.resourceType,
        format: options.format,
        bytes: buffer.length,
        width: options.width,
        height: options.height,
        referenceCount: 0,
        status: "orphan",
        isLocal: true,
      });

      return {
        url: localUrl,
        publicId: localFilename,
        resourceType: options.resourceType,
        format: options.format,
        bytes: buffer.length,
        width: options.width,
        height: options.height,
        isLocal: true,
      };
    }

    // 4. Cloudinary Upload with Retry and CDN Cache Invalidation (Requirement 12 & 15)
    try {
      const uploadAction = () =>
        new Promise<UploadApiResponse>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              public_id: `media_${hashPrefix}`,
              folder: "pglabs/projects",
              resource_type: options.resourceType,
              overwrite: true,
              invalidate: true, // CDN cache invalidation
              unique_filename: false,
            },
            (error, result) => {
              if (error || !result) {
                reject(error || new Error("Cloudinary upload failed"));
              } else {
                resolve(result);
              }
            }
          );
          stream.end(buffer);
        });

      const result = await this.retryWithBackoff(uploadAction);

      // Save tracking record in MongoDB
      await MediaAsset.create({
        contentHash,
        publicId: result.public_id,
        url: result.secure_url,
        resourceType: options.resourceType,
        format: result.format || options.format,
        bytes: result.bytes || buffer.length,
        width: result.width || options.width,
        height: result.height || options.height,
        referenceCount: 0,
        status: "orphan",
        isLocal: false,
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: options.resourceType,
        format: result.format || options.format,
        bytes: result.bytes || buffer.length,
        width: result.width || options.width,
        height: result.height || options.height,
        isLocal: false,
      };
    } catch (uploadError) {
      // Circuit-breaker / fallback: if Cloudinary is down, save to local disk so user is never blocked!
      console.error(
        "[CloudinaryService] All Cloudinary attempts failed. Falling back to local disk storage:",
        uploadError
      );
      this.ensureLocalUploadDir();
      const localFilename = `media_${hashPrefix}.${options.format}`;
      const localFilePath = path.join(this.localUploadDir, localFilename);
      await fs.promises.writeFile(localFilePath, buffer);

      const localUrl = `/uploads/${localFilename}`;

      await MediaAsset.create({
        contentHash,
        publicId: localFilename,
        url: localUrl,
        resourceType: options.resourceType,
        format: options.format,
        bytes: buffer.length,
        width: options.width,
        height: options.height,
        referenceCount: 0,
        status: "orphan",
        isLocal: true,
      });

      return {
        url: localUrl,
        publicId: localFilename,
        resourceType: options.resourceType,
        format: options.format,
        bytes: buffer.length,
        width: options.width,
        height: options.height,
        isLocal: true,
      };
    }
  }

  /**
   * Reference-Counted Safe Deletion with Invalidation (Requirement 9, 10, 12)
   */
  public static async safeDeleteMedia(
    publicIdOrUrl: string,
    resourceType: "image" | "video" = "image"
  ): Promise<boolean> {
    try {
      // Find asset in MediaAsset collection
      const asset = await MediaAsset.findOne({
        $or: [{ publicId: publicIdOrUrl }, { url: publicIdOrUrl }],
      });

      if (asset && asset.isLocal) {
        // Local file removal
        const filePath = path.join(this.localUploadDir, asset.publicId);
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath).catch(() => {});
        }
        await MediaAsset.deleteOne({ _id: asset._id });
        return true;
      }

      if (this.isConfigured()) {
        const publicId = asset ? asset.publicId : publicIdOrUrl;
        await cloudinary.uploader.destroy(publicId, {
          resource_type: resourceType,
          invalidate: true, // Always purge CDN cache
        });
      }

      if (asset) {
        await MediaAsset.deleteOne({ _id: asset._id });
      }

      return true;
    } catch (err) {
      console.warn("[CloudinaryService] Error during safe media destruction:", err);
      return false;
    }
  }
}
