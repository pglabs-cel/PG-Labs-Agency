import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { CloudinaryPipeline } from "@/lib/cloudinaryPipeline";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1 & 10. Zero-Trust Authentication & Ownership Check (Requirements 1 & 10)
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { url, publicId, resourceType } = body;
    const targetIdentifier = url || publicId;

    if (!targetIdentifier || typeof targetIdentifier !== "string") {
      return NextResponse.json(
        { success: false, error: "Media URL or public ID is required." },
        { status: 400 }
      );
    }

    // 9 & 12. Reference-Counted Safe Deletion with CDN Invalidation (Requirements 9 & 12)
    const result = await CloudinaryPipeline.safeDeleteMedia(
      targetIdentifier,
      resourceType || "image"
    );

    if (!result.deleted && result.remainingReferences > 0) {
      return NextResponse.json(
        {
          success: true,
          deleted: false,
          message: `Asset is referenced by ${result.remainingReferences} other project(s). Deletion prevented to preserve references.`,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: true, deleted: true, message: "Media deleted successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/media/delete] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete media." },
      { status: 500 }
    );
  }
}
