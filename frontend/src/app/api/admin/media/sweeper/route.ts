import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { MediaAsset } from "@/models/MediaAsset";
import { Project } from "@/models/Project";
import { CloudinaryPipeline } from "@/lib/cloudinaryPipeline";

export const dynamic = "force-dynamic";

/**
 * Zombie Asset Sweeper (Requirement 11)
 * Periodically searches for orphaned assets older than 24 hours with zero DB references
 * and safely purges them from Cloudinary / local storage and the database.
 */
export async function POST(req: NextRequest) {
  try {
    // Authenticate either via Admin Bearer token OR CRON_SECRET header for Vercel Cron
    const authHeader = req.headers.get("authorization");
    const cronSecret = req.headers.get("x-cron-secret");
    const validCronSecret = process.env.CRON_SECRET || "pglabs_media_sweeper_cron_2026";

    const isAuthorized =
      isRequestAdminAuthorized(req) ||
      (cronSecret && cronSecret === validCronSecret) ||
      (authHeader && authHeader === `Bearer ${validCronSecret}`);

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin token or cron secret required." },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const olderThanHours = 24;
    const cutoffDate = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);

    // Find candidate assets created before cutoff date
    const candidateAssets = await MediaAsset.find({
      createdAt: { $lt: cutoffDate },
    }).limit(100);

    let purgedCount = 0;
    const purgedUrls: string[] = [];

    for (const asset of candidateAssets) {
      // Check if referenced by any Project
      const projectRefCount = await Project.countDocuments({
        $or: [
          { thumbnail: asset.url },
          { thumbnail: asset.publicId },
          { images: asset.url },
          { images: asset.publicId },
          { videoUrl: asset.url },
          { videoUrl: asset.publicId },
        ],
      });

      if (projectRefCount === 0) {
        // Safe to purge
        await CloudinaryPipeline.safeDeleteMedia(
          asset.publicId,
          asset.resourceType
        );
        purgedCount++;
        purgedUrls.push(asset.url);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Zombie media sweeper completed. Purged ${purgedCount} orphaned asset(s).`,
        purgedCount,
        purgedUrls,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/media/sweeper] Sweeper error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute media sweeper." },
      { status: 500 }
    );
  }
}
