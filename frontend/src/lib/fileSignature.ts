/**
 * Magic-Byte / Binary Signature Verification (Requirement 3 & 6)
 * Validates the raw binary header bytes of uploaded files.
 * Rejects disguised files (e.g., .txt / .exe renamed to .jpg / .png).
 * Strictly disallows SVG uploads to prevent stored XSS attacks.
 */

export interface FileSignatureResult {
  isValid: boolean;
  detectedMime?: string;
  detectedExt?: string;
  resourceType?: "image" | "video";
  error?: string;
}

export function verifyFileSignature(buffer: Buffer): FileSignatureResult {
  if (!buffer || buffer.length < 12) {
    return {
      isValid: false,
      error: "File buffer is too small to determine a valid file signature.",
    };
  }

  // 1. JPEG: starts with FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return {
      isValid: true,
      detectedMime: "image/jpeg",
      detectedExt: "jpg",
      resourceType: "image",
    };
  }

  // 2. PNG: starts with 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return {
      isValid: true,
      detectedMime: "image/png",
      detectedExt: "png",
      resourceType: "image",
    };
  }

  // 3. WebP: starts with 'RIFF' (bytes 0-3) and 'WEBP' (bytes 8-11)
  const riffHeader = buffer.subarray(0, 4).toString("ascii");
  const webpHeader = buffer.subarray(8, 12).toString("ascii");
  if (riffHeader === "RIFF" && webpHeader === "WEBP") {
    return {
      isValid: true,
      detectedMime: "image/webp",
      detectedExt: "webp",
      resourceType: "image",
    };
  }

  // 4. GIF: starts with 'GIF87a' or 'GIF89a'
  const gifHeader = buffer.subarray(0, 6).toString("ascii");
  if (gifHeader === "GIF87a" || gifHeader === "GIF89a") {
    return {
      isValid: true,
      detectedMime: "image/gif",
      detectedExt: "gif",
      resourceType: "image",
    };
  }

  // 5. MP4 / MOV / QuickTime Video:
  const boxType = buffer.subarray(4, 8).toString("ascii");
  if (boxType === "ftyp" || boxType === "moov" || boxType === "mdat") {
    return {
      isValid: true,
      detectedMime: "video/mp4",
      detectedExt: "mp4",
      resourceType: "video",
    };
  }

  // 6. WebM Video: starts with 1A 45 DF A3 (EBML ID)
  if (
    buffer[0] === 0x1a &&
    buffer[1] === 0x45 &&
    buffer[2] === 0xdf &&
    buffer[3] === 0xa3
  ) {
    return {
      isValid: true,
      detectedMime: "video/webm",
      detectedExt: "webm",
      resourceType: "video",
    };
  }

  // 7. Check for SVG (XML) — SVG upload is strictly disallowed to prevent stored XSS (Requirement 6)
  const startStr = buffer.subarray(0, 100).toString("utf8").toLowerCase();
  if (
    startStr.includes("<svg") ||
    startStr.includes("<?xml") ||
    startStr.includes("<!doctype svg")
  ) {
    return {
      isValid: false,
      error:
        "SVG uploads are disabled for security reasons (XSS & script injection prevention). Please use WebP, PNG, or JPG.",
    };
  }

  return {
    isValid: false,
    error:
      "Invalid file signature. File header does not match any allowed image or video format.",
  };
}
