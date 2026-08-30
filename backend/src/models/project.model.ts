import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  features: string[];
  challenge: string;
  solution: string;
  outcome?: string;
  year: string;
  featured: boolean;
  order: number;
  thumbnail?: string;
  images?: string[];
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema<IProject>(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      default: "Web Application",
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [300, "Short description cannot exceed 300 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    challenge: {
      type: String,
      required: [true, "Challenge is required"],
      trim: true,
    },
    solution: {
      type: String,
      required: [true, "Solution is required"],
      trim: true,
    },
    outcome: {
      type: String,
      trim: true,
      default: "",
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      trim: true,
      default: () => new Date().getFullYear().toString(),
    },
    featured: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      trim: true,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    videoUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
