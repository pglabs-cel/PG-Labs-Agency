import mongoose, { Document, Schema, Model } from "mongoose";
import {
  PricingCategory,
  EngagementModel,
  PricingFAQ,
  PRICING_CATEGORIES,
  PRICING_DISCLAIMER,
  ENGAGEMENT_MODELS,
  PRICING_FAQS,
} from "@/data/pricingData";

export interface IPricingDocument extends Document {
  disclaimer: string;
  categories: PricingCategory[];
  engagementModels: EngagementModel[];
  faqs: PricingFAQ[];
  updatedAt: Date;
  createdAt: Date;
}

const PricingTierSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    period: { type: String, trim: true, default: "" },
    description: { type: String, required: true, trim: true },
    highlights: [{ type: String, trim: true }],
    bestFor: { type: String, required: true, trim: true },
    popular: { type: Boolean, default: false },
    ctaText: { type: String, required: true, trim: true, default: "Start Project" },
    serviceSlug: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const PricingCategorySchema = new Schema(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    pillar: {
      type: String,
      required: true,
      trim: true,
      default: "BUILD",
    },
    eyebrow: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    tiers: [PricingTierSchema],
  },
  { _id: false }
);

const EngagementModelSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true, default: "" },
    description: { type: String, required: true, trim: true },
    benefits: [{ type: String, trim: true }],
  },
  { _id: false }
);

const PricingFAQSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const PricingSchema = new Schema<IPricingDocument>(
  {
    disclaimer: {
      type: String,
      default: PRICING_DISCLAIMER,
      trim: true,
    },
    categories: {
      type: [PricingCategorySchema],
      default: PRICING_CATEGORIES,
    },
    engagementModels: {
      type: [EngagementModelSchema],
      default: ENGAGEMENT_MODELS,
    },
    faqs: {
      type: [PricingFAQSchema],
      default: PRICING_FAQS,
    },
  },
  {
    timestamps: true,
  }
);

export const Pricing: Model<IPricingDocument> =
  mongoose.models.Pricing ||
  mongoose.model<IPricingDocument>("Pricing", PricingSchema);
