import sharp from "sharp";

export interface ProcessedImageResult {
  buffer: Buffer;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

const MAX_DIMENSION = 10000; // 10k pixels max dimension
const MAX_TOTAL_PIXELS = 89000000; // ~89 Megapixels decompression bomb protection

export class ImageProcessingService {
  /**
   * Validates pixel ceiling before full decode, then re-encodes through a clean
   * raster pipeline to strip all EXIF/GPS metadata and neutralize polyglots.
   */
  public static async processAndSanitizeImage(
    rawBuffer: Buffer
  ): Promise<ProcessedImageResult> {
    // 1. Peek metadata from header without full decode
    const metadata = await sharp(rawBuffer, {
      failOn: "error",
      limitInputPixels: MAX_TOTAL_PIXELS,
    }).metadata();

    const width = metadata.width || 0;
    const height = metadata.height || 0;

    if (!width || !height) {
      throw new Error("Unable to read image dimensions from file header.");
    }

    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      throw new Error(
        `Image dimensions (${width}x${height}) exceed safe maximum of ${MAX_DIMENSION}px.`
      );
    }

    if (width * height > MAX_TOTAL_PIXELS) {
      throw new Error(
        `Image pixel count (${width * height}) exceeds decompression bomb safety limit (89MP).`
      );
    }

    // 2. Re-encode through clean raster pipeline (strips EXIF, GPS, embedded scripts)
    // Sharp by default strips all EXIF, GPS, comments, and polyglots unless withMetadata() is called.
    const hasAlpha = metadata.hasAlpha;
    const sharpInstance = sharp(rawBuffer, {
      failOn: "error",
      limitInputPixels: MAX_TOTAL_PIXELS,
    }).rotate(); // Auto-rotates according to EXIF orientation before stripping tags

    let processedBuffer: Buffer;
    let finalFormat = "webp";

    if (metadata.format === "gif") {
      processedBuffer = await sharpInstance
        .webp({ quality: 90, effort: 4 })
        .toBuffer();
    } else if (hasAlpha && metadata.format === "png") {
      processedBuffer = await sharpInstance
        .webp({ quality: 92, alphaQuality: 95, effort: 4 })
        .toBuffer();
    } else {
      processedBuffer = await sharpInstance
        .webp({ quality: 90, effort: 4 })
        .toBuffer();
    }

    // Measure re-encoded image metadata
    const finalMeta = await sharp(processedBuffer).metadata();

    return {
      buffer: processedBuffer,
      width: finalMeta.width || width,
      height: finalMeta.height || height,
      format: finalFormat,
      bytes: processedBuffer.length,
    };
  }
}
