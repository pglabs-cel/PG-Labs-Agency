import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Project } from "../models/project.model";
import { MediaAsset } from "../models/mediaAsset.model";
import { verifyFileSignature } from "../utils/fileSignature";
import { ImageProcessingService } from "../services/imageProcessing.service";
import { CloudinaryService } from "../services/cloudinary.service";

export function parseCloudinaryUrl(url: string): {
  publicId: string;
  resourceType: "image" | "video";
} | null {
  if (!url || typeof url !== "string") return null;

  // Matches: https://res.cloudinary.com/<cloud_name>/<resource_type>/upload/(v12345/)?<public_id>.<ext>
  const regex =
    /res\.cloudinary\.com\/[^/]+\/(image|video)\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/;
  const match = url.match(regex);

  if (match && match[1] && match[2]) {
    return {
      resourceType: match[1] as "image" | "video",
      publicId: match[2],
    };
  }

  return null;
}

export class UploadController {
  public static async uploadFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          error: "No file provided for upload.",
        });
        return;
      }

      const rawBuffer = req.file.buffer;

      // 1. Magic-Byte Verification (Requirement 3 & 6)
      const signatureCheck = verifyFileSignature(rawBuffer);
      if (!signatureCheck.isValid) {
        res.status(400).json({
          success: false,
          error: signatureCheck.error || "Invalid file binary signature.",
        });
        return;
      }

      const resourceType = signatureCheck.resourceType || "image";

      let finalBuffer = rawBuffer;
      let width: number | undefined;
      let height: number | undefined;
      let format = signatureCheck.detectedExt || "bin";

      // 2. Image Decompression Bomb Protection & EXIF/GPS Stripping (Requirement 4 & 5)
      if (resourceType === "image") {
        try {
          const processed = await ImageProcessingService.processAndSanitizeImage(rawBuffer);
          finalBuffer = processed.buffer;
          width = processed.width;
          height = processed.height;
          format = processed.format;
        } catch (imgError: any) {
          res.status(400).json({
            success: false,
            error: imgError.message || "Failed to process and sanitize image.",
          });
          return;
        }
      } else if (resourceType === "video") {
        // Video validation (Requirement 7): max 50MB check already handled by Multer
        format = signatureCheck.detectedExt || "mp4";
      }

      // 3. Upload via CloudinaryService (Dedup, Retries, Local Fallback) (Requirement 8, 12, 14, 15)
      const uploadResult = await CloudinaryService.uploadMedia(finalBuffer, {
        resourceType,
        format,
        width,
        height,
      });

      res.status(200).json({
        success: true,
        message: `${resourceType === "video" ? "Video" : "Image"} uploaded successfully.${
          uploadResult.isDeduplicated ? " (Deduplicated)" : ""
        }`,
        data: {
          url: uploadResult.url,
          public_id: uploadResult.publicId,
          resource_type: uploadResult.resourceType,
          format: uploadResult.format,
          bytes: uploadResult.bytes,
          width: uploadResult.width,
          height: uploadResult.height,
          isDeduplicated: uploadResult.isDeduplicated || false,
          isLocal: uploadResult.isLocal || false,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public static async deleteMedia(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { url, projectId, field } = req.body;

      if (!url || typeof url !== "string") {
        res.status(400).json({
          success: false,
          error: "Media URL is required for deletion.",
        });
        return;
      }

      // 1. If an existing project is referenced, update MongoDB directly
      if (projectId && field) {
        const query = mongoose.isValidObjectId(projectId)
          ? { _id: projectId }
          : { slug: projectId };

        let updateOp: Record<string, unknown> = {};
        if (field === "thumbnail") {
          updateOp = { $set: { thumbnail: "" } };
        } else if (field === "videoUrl") {
          updateOp = { $set: { videoUrl: "" } };
        } else if (field === "galleryImage") {
          updateOp = { $pull: { images: url } };
        }

        if (Object.keys(updateOp).length > 0) {
          await Project.findOneAndUpdate(query, updateOp).exec();
        }
      }

      // 2. Reference-Counted Safe Deletion (Requirement 9 & 10)
      // Check whether ANY other project is still referencing this URL!
      const activeReferences = await Project.countDocuments({
        $or: [
          { thumbnail: url },
          { videoUrl: url },
          { images: url },
        ],
      });

      if (activeReferences > 0) {
        // Asset is still actively used by another project; do NOT destroy from Cloudinary!
        await MediaAsset.updateOne(
          { url },
          { $set: { referenceCount: activeReferences, status: "active" } }
        );

        res.status(200).json({
          success: true,
          message: "Media unlinked from project. Asset retained in storage because other records reference it.",
        });
        return;
      }

      // Zero remaining references: safe to purge from Cloudinary/local disk
      const parsed = parseCloudinaryUrl(url);
      const publicIdOrUrl = parsed ? parsed.publicId : url;
      const resourceType = parsed ? parsed.resourceType : "image";

      await CloudinaryService.safeDeleteMedia(publicIdOrUrl, resourceType);

      res.status(200).json({
        success: true,
        message: "Media deleted safely from storage and database.",
      });
    } catch (error) {
      next(error);
    }
  }
}
