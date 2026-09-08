import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";
import { CloudinaryPipeline } from "@/lib/cloudinaryPipeline";
import { parseCloudinaryUrl } from "@/lib/cloudinaryServer";

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
    const { url, publicId, resourceType: rawResourceType, projectId, field } = body;
    const targetIdentifier = url || publicId;

    if (!targetIdentifier || typeof targetIdentifier !== "string") {
      return NextResponse.json(
        { success: false, error: "Media URL or public ID is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // If projectId and field are provided, update the Project record in MongoDB first
    if (projectId && field) {
      const projQuery = mongoose.isValidObjectId(projectId)
        ? { _id: projectId }
        : { slug: projectId };

      if (field === "thumbnail") {
        await Project.findOneAndUpdate(projQuery, { $set: { thumbnail: "" } });
      } else if (field === "videoUrl") {
        await Project.findOneAndUpdate(projQuery, { $set: { videoUrl: "" } });
      } else if (field === "galleryImage") {
        await Project.findOneAndUpdate(projQuery, { $pull: { images: targetIdentifier } });
      }
    }

    // Accurately determine resourceType ("video" vs "image")
    let resourceType: "image" | "video" = rawResourceType === "video" ? "video" : "image";
    const parsed = parseCloudinaryUrl(targetIdentifier);
    if (parsed?.resourceType) {
      resourceType = parsed.resourceType;
    } else if (
      targetIdentifier.includes("/video/") ||
      /\.(mp4|webm|mov|mkv|m4v)$/i.test(targetIdentifier)
    ) {
      resourceType = "video";
    }

    // 9 & 12. Reference-Counted Safe Deletion with CDN Invalidation (Requirements 9 & 12)
    const result = await CloudinaryPipeline.safeDeleteMedia(
      targetIdentifier,
      resourceType,
      projectId
    );

    if (!result.deleted && result.remainingReferences > 0) {
      return NextResponse.json(
        {
          success: true,
          deleted: false,
          message: `Asset is referenced by ${result.remainingReferences} other project(s). Removed from current project.`,
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
