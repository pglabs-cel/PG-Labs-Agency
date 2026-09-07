import { MediaAsset } from "../models/mediaAsset.model";
import { Project } from "../models/project.model";
import { CloudinaryService } from "../services/cloudinary.service";

/**
 * Zombie Media Sweeper Job
 * Scans for orphaned media assets uploaded > 24 hours ago that have zero references
 * in the Project collection, and removes them from Cloudinary/disk.
 */
export async function runZombieMediaSweeper(): Promise<{
  scanned: number;
  deleted: number;
}> {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Find candidate assets: older than 24h and status === 'orphan' or referenceCount === 0
    const candidates = await MediaAsset.find({
      createdAt: { $lt: twentyFourHoursAgo },
      $or: [{ status: "orphan" }, { referenceCount: { $lte: 0 } }],
    }).limit(100);

    let deletedCount = 0;

    for (const asset of candidates) {
      // Double check whether ANY project references this URL in thumbnail, videoUrl, or images
      const isReferenced = await Project.exists({
        $or: [
          { thumbnail: asset.url },
          { videoUrl: asset.url },
          { images: asset.url },
        ],
      });

      if (!isReferenced) {
        console.log(
          `[ZombieSweeper] Cleaning up unreferenced asset: ${asset.publicId} (${asset.url})`
        );
        await CloudinaryService.safeDeleteMedia(
          asset.publicId,
          asset.resourceType
        );
        deletedCount++;
      } else {
        // Mark as active since it is referenced
        asset.status = "active";
        asset.referenceCount = 1;
        await asset.save();
      }
    }

    if (deletedCount > 0) {
      console.log(
        `[ZombieSweeper] Completed. Scanned: ${candidates.length}, Purged: ${deletedCount} orphaned assets.`
      );
    }

    return { scanned: candidates.length, deleted: deletedCount };
  } catch (error) {
    console.error("[ZombieSweeper] Error running media sweeper job:", error);
    return { scanned: 0, deleted: 0 };
  }
}

/**
 * Initializes the background scheduled job (runs once every 12 hours)
 */
export function initMediaSweeperCron(): void {
  const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

  // Run on startup after 30 seconds delay
  setTimeout(() => {
    runZombieMediaSweeper().catch(() => {});
  }, 30000);

  // Repeat every 12 hours
  setInterval(() => {
    runZombieMediaSweeper().catch(() => {});
  }, TWELVE_HOURS_MS);
}
