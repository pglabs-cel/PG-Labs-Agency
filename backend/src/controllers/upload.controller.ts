import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { cloudinary } from "../config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { Project } from "../models/project.model";

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

      if (
        !process.env.CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
      ) {
        res.status(500).json({
          success: false,
          error: "Cloudinary is not configured on server. Please check .env settings.",
        });
        return;
      }

      const isVideo = req.file.mimetype.startsWith("video/");
      const resourceType: "video" | "image" = isVideo ? "video" : "image";

      const uploadPromise = new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "pglabs/projects",
            resource_type: resourceType,
          },
          (error, result) => {
            if (error || !result) {
              reject(error || new Error("Cloudinary upload failed"));
            } else {
              resolve(result);
            }
          }
        );
        stream.end(req.file!.buffer);
      });

      const result = await uploadPromise;

      res.status(200).json({
        success: true,
        message: `${isVideo ? "Video" : "Image"} uploaded successfully.`,
        data: {
          url: result.secure_url,
          public_id: result.public_id,
          resource_type: result.resource_type,
          format: result.format,
          bytes: result.bytes,
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

      // 1. Delete from Cloudinary if it's a Cloudinary asset
      const parsed = parseCloudinaryUrl(url);
      if (parsed) {
        try {
          await cloudinary.uploader.destroy(parsed.publicId, {
            resource_type: parsed.resourceType,
          });
        } catch (cloudinaryErr) {
          console.warn(
            "[Cloudinary] Warning destroying asset:",
            parsed.publicId,
            cloudinaryErr
          );
        }
      }

      // 2. If an existing project is referenced, update MongoDB directly
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

      res.status(200).json({
        success: true,
        message: "Media deleted successfully from Cloudinary and database.",
      });
    } catch (error) {
      next(error);
    }
  }
}
