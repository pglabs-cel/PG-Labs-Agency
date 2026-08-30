import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
  createdAt: Date;
  status: "new" | "contacted" | "in-progress" | "completed" | "archived";
}

const ContactSchema: Schema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, "Company cannot exceed 100 characters"],
      default: "",
    },
    projectType: {
      type: String,
      required: [true, "Project type is required"],
      enum: [
        "Website",
        "Web Application",
        "SaaS",
        "AI/ML",
        "Custom Software",
        "Automation",
        "Other",
      ],
      default: "Web Application",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [3000, "Message cannot exceed 3000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in-progress", "completed", "archived"],
      default: "new",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);