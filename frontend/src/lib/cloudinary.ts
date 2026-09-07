/**
 * PG Labs — Centralized Cloudinary Responsive Delivery Helper
 * Provides high-performance, bandwidth-aware, crystal-clear media delivery.
 * Automatically injects f_auto, q_auto:good / q_auto:best, DPR scaling,
 * responsive bounds, and blur placeholders for Core Web Vitals (LCP & zero CLS).
 */

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: "auto" | "good" | "best" | "eco" | "low" | number;
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
  crop?: "limit" | "fill" | "fit" | "thumb" | "scale";
  dpr?: number | "auto";
  blur?: number; // e.g. 1000 for LQIP blur
  aspectRatio?: string; // e.g. "16:9", "4:3"
}

/**
 * Checks whether a given URL is a Cloudinary hosted asset
 */
export function isCloudinaryUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  return url.includes("res.cloudinary.com");
}

/**
 * Injects Cloudinary transformations into an existing asset URL while preserving
 * asset paths, folders, versions, and original extensions.
 */
export function getCloudinaryUrl(
  url?: string | null,
  options: CloudinaryTransformOptions = {}
): string {
  if (!url || typeof url !== "string") return "";

  // If not Cloudinary (e.g. local /images/projects/... or external), return as is
  if (!isCloudinaryUrl(url)) {
    return url;
  }

  const {
    width,
    height,
    quality = "good", // 'good' guarantees crisp, sharp agency portfolio fidelity
    format = "auto", // 'auto' serves WebP or AVIF depending on browser support
    crop = "limit",
    dpr = "auto",
    blur,
    aspectRatio,
  } = options;

  // Build transformation segments
  const transforms: string[] = [];

  // Format & Quality
  transforms.push(`f_${format}`);
  if (typeof quality === "number") {
    transforms.push(`q_${quality}`);
  } else if (quality === "best" || quality === "good" || quality === "eco" || quality === "low") {
    transforms.push(`q_auto:${quality}`);
  } else {
    transforms.push("q_auto");
  }

  // DPR for high-density Retina screens
  if (dpr) {
    transforms.push(`dpr_${dpr}`);
  }

  // Dimensions & Cropping
  if (width) {
    transforms.push(`w_${width}`);
  }
  if (height) {
    transforms.push(`h_${height}`);
  }
  if (width || height) {
    transforms.push(`c_${crop}`);
  }

  // Aspect ratio if specified
  if (aspectRatio) {
    transforms.push(`ar_${aspectRatio}`);
  }

  // Blur (e.g. for LQIP placeholders)
  if (blur && blur > 0) {
    transforms.push(`e_blur:${blur}`);
  }

  const transformString = transforms.join(",");

  // Regular expression to match: .../upload/(transforms/)?(v\d+/)?(path)
  // Example: https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg
  // Or: https://res.cloudinary.com/demo/video/upload/sample.mp4
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  const prefix = url.slice(0, uploadIndex + "/upload/".length);
  const rest = url.slice(uploadIndex + "/upload/".length);

  // Check if there are existing transformations already injected
  // If the segment immediately following /upload/ doesn't start with 'v[0-9]+' or isn't a folder
  const parts = rest.split("/");
  const firstPart = parts[0] || "";

  // If first part has existing transform params (contains ',' or '_' like 'w_500' or 'f_auto')
  if (firstPart.includes("_") && !firstPart.startsWith("v")) {
    // Replace the first transformation segment
    parts[0] = transformString;
    return `${prefix}${parts.join("/")}`;
  }

  // Otherwise, insert transformString before version / publicId
  return `${prefix}${transformString}/${rest}`;
}

/**
 * Generates an ultra-lightweight Low Quality Image Placeholder (LQIP)
 * Displays instant blur preview while the full-resolution asset paints in.
 */
export function getCloudinaryBlurPlaceholder(url?: string | null): string {
  if (!url || typeof url !== "string") return "";
  if (!isCloudinaryUrl(url)) return url;

  return getCloudinaryUrl(url, {
    width: 30,
    quality: 1,
    blur: 1000,
    crop: "limit",
    format: "auto",
  });
}

/**
 * Generates a high-quality poster frame image for a Cloudinary video.
 * Extracts frame at 0.5s or 0s as a crisp JPEG/WebP.
 */
export function getCloudinaryVideoPoster(
  videoUrl?: string | null,
  width = 1280
): string {
  if (!videoUrl || typeof videoUrl !== "string") return "";

  if (!isCloudinaryUrl(videoUrl)) {
    return "";
  }

  // Replace file extension with .jpg and insert video frame offset (so_0)
  const baseImgUrl = videoUrl
    .replace(/\/video\/upload\//, "/video/upload/so_0,f_jpg,q_auto:good,")
    .replace(/\.[a-zA-Z0-9]+$/, ".jpg");

  return getCloudinaryUrl(baseImgUrl, {
    width,
    crop: "limit",
    quality: "good",
  });
}

/**
 * Generates responsive srcset string for standard breakpoint widths
 */
export function getCloudinarySrcSet(
  url?: string | null,
  widths: number[] = [480, 768, 1024, 1280, 1600],
  options: Omit<CloudinaryTransformOptions, "width"> = {}
): string {
  if (!url || !isCloudinaryUrl(url)) return "";

  return widths
    .map((w) => `${getCloudinaryUrl(url, { ...options, width: w })} ${w}w`)
    .join(", ");
}
