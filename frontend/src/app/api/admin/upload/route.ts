import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { checkUploadRateLimit } from "@/lib/rateLimiter";
import { verifyFileSignature } from "@/lib/fileSignature";
import { ImageProcessingService } from "@/lib/imageProcessing";
import { CloudinaryPipeline } from "@/lib/cloudinaryPipeline";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Zero-Trust Authentication (Requirement 1)
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication token required." },
        { status: 401 }
      );
    }

    // 2. Sliding-Window Rate Limiting (Requirement 2)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "admin-client";
    const rateLimit = checkUploadRateLimit(ip, 20, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Upload rate limit exceeded. Please retry after ${rateLimit.retryAfterSec} seconds.`,
        },
        { status: 429 }
      );
    }

    // Extract file from multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided for upload." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const rawBuffer = Buffer.from(bytes);

    // 3. Magic-Byte / Binary Signature Verification (Requirement 3 & 6)
    const signatureCheck = verifyFileSignature(rawBuffer);
    if (!signatureCheck.isValid) {
      return NextResponse.json(
        { success: false, error: signatureCheck.error || "Invalid file signature." },
        { status: 400 }
      );
    }

    const resourceType = signatureCheck.resourceType || "image";

    // Enforce 50MB ceiling
    if (rawBuffer.length > 50 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size exceeds maximum allowed limit (50MB)." },
        { status: 400 }
      );
    }

    let finalBuffer: Buffer = rawBuffer;
    let width: number | undefined;
    let height: number | undefined;
    let format = signatureCheck.detectedExt || "bin";

    // 4 & 5. Decompression Bomb Check & EXIF/GPS Stripping for Images (Requirement 4 & 5)
    if (resourceType === "image") {
      try {
        const processed = await ImageProcessingService.processAndSanitizeImage(rawBuffer);
        finalBuffer = Buffer.from(processed.buffer);
        width = processed.width;
        height = processed.height;
        format = processed.format;
      } catch (err: any) {
        return NextResponse.json(
          { success: false, error: err.message || "Failed to process image." },
          { status: 400 }
        );
      }
    }

    // 8, 12, 14, 15. Deterministic Deduplication, Retry with Backoff, Local Fallback & Invalidation
    const uploadResult = await CloudinaryPipeline.uploadMedia(finalBuffer, {
      resourceType,
      format,
      width,
      height,
    });

    return NextResponse.json(
      {
        success: true,
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
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/upload] Pipeline error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Media upload pipeline error." },
      { status: 500 }
    );
  }
}
