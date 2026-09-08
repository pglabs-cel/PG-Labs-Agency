/**
 * In-memory sliding-window rate limiter for serverless media uploads (Requirement 2)
 */

interface RateLimitRecord {
  timestamps: number[];
}

const uploadRateLimitMap = new Map<string, RateLimitRecord>();

const CLEANUP_INTERVAL = 60 * 1000;
let lastCleanup = Date.now();

function cleanupStaleRecords(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  uploadRateLimitMap.forEach((record, key) => {
    record.timestamps = record.timestamps.filter((t) => now - t < windowMs);
    if (record.timestamps.length === 0) {
      uploadRateLimitMap.delete(key);
    }
  });
}

export function checkUploadRateLimit(
  identifier: string,
  limit = 20, // 20 uploads per minute
  windowMs = 60 * 1000
): { allowed: boolean; remaining: number; retryAfterSec?: number } {
  const now = Date.now();
  cleanupStaleRecords(windowMs);

  const record = uploadRateLimitMap.get(identifier) || { timestamps: [] };
  // Filter only timestamps within the window
  record.timestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const retryAfterSec = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(1, retryAfterSec),
    };
  }

  record.timestamps.push(now);
  uploadRateLimitMap.set(identifier, record);

  return {
    allowed: true,
    remaining: limit - record.timestamps.length,
  };
}
