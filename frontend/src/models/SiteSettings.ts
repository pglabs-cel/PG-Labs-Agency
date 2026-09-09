import mongoose, { Document, Schema, Model } from "mongoose";

export interface ISiteSettings extends Document {
  email: string;
  phone?: string;
  whatsappNumber?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  updatedAt: Date;
  createdAt: Date;
}

const SiteSettingsSchema: Schema = new Schema<ISiteSettings>(
  {
    email: {
      type: String,
      required: [true, "Studio email is required"],
      trim: true,
      default: "pglabs.agency@gmail.com",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    whatsappNumber: {
      type: String,
      trim: true,
      default: "",
    },
    linkedin: {
      type: String,
      trim: true,
      default: "",
    },
    twitter: {
      type: String,
      trim: true,
      default: "",
    },
    github: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
