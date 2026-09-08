import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export function uploadStreamToCloudinary(
  buffer: Buffer,
  options: {
    resource_type: "image" | "video" | "auto";
    folder?: string;
  }
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: options.resource_type,
        folder: options.folder || "pg-labs-projects",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed"));
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
}

export function parseCloudinaryUrl(url: string): {
  publicId: string;
  resourceType: "image" | "video";
} | null {
  if (!url || typeof url !== "string") return null;

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

export async function deleteFromCloudinary(url: string): Promise<boolean> {
  const parsed = parseCloudinaryUrl(url);
  if (!parsed) return false;

  const result = await cloudinary.uploader.destroy(parsed.publicId, {
    resource_type: parsed.resourceType,
  });

  return result.result === "ok" || result.result === "not found";
}

export { cloudinary };
