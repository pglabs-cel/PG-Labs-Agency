import mongoose, { Document, Schema, Model } from "mongoose";

export interface IMediaAsset extends Document {
  contentHash: string; // SHA-256 hash of normalized buffer
  publicId: string; // Cloudinary public_id or local filename
  url: string; // Secure Cloudinary URL or local static URL
  resourceType: "image" | "video";
  format: string;
  bytes: number;
  width?: number;
  height?: number;
  referenceCount: number;
  status: "active" | "orphan" | "deleted";
  ownerRole: string;
  isLocal: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MediaAssetSchema: Schema = new Schema<IMediaAsset>(
  {
    contentHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    publicId: {
      type: String,
      required: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
    },
    resourceType: {
      type: String,
      enum: ["image", "video"],
      default: "image",
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    bytes: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    referenceCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "orphan", "deleted"],
      default: "orphan", // When initially uploaded before project save
    },
    ownerRole: {
      type: String,
      default: "admin",
    },
    isLocal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const MediaAsset: Model<IMediaAsset> =
  mongoose.models.MediaAsset ||
  mongoose.model<IMediaAsset>("MediaAsset", MediaAssetSchema);
