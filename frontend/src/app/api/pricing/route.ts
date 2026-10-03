import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Pricing } from "@/models/Pricing";
import {
  PRICING_CATEGORIES,
  PRICING_DISCLAIMER,
  ENGAGEMENT_MODELS,
  PRICING_FAQS,
} from "@/data/pricingData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    try {
      await connectToDatabase();
      const pricingDoc = await Pricing.findOne().lean();

      if (pricingDoc) {
        return NextResponse.json(
          {
            success: true,
            data: {
              disclaimer: pricingDoc.disclaimer || PRICING_DISCLAIMER,
              categories: pricingDoc.categories || PRICING_CATEGORIES,
              engagementModels: pricingDoc.engagementModels || ENGAGEMENT_MODELS,
              faqs: pricingDoc.faqs || PRICING_FAQS,
            },
          },
          { status: 200 }
        );
      }
    } catch (dbErr) {
      console.warn("[GET /api/pricing] DB lookup warning, serving fallback data:", dbErr);
    }

    // Fallback if no DB document exists or connection fails
    return NextResponse.json(
      {
        success: true,
        data: {
          disclaimer: PRICING_DISCLAIMER,
          categories: PRICING_CATEGORIES,
          engagementModels: ENGAGEMENT_MODELS,
          faqs: PRICING_FAQS,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[GET /api/pricing] Fatal error:", error);
    return NextResponse.json(
      {
        success: true,
        data: {
          disclaimer: PRICING_DISCLAIMER,
          categories: PRICING_CATEGORIES,
          engagementModels: ENGAGEMENT_MODELS,
          faqs: PRICING_FAQS,
        },
      },
      { status: 200 }
    );
  }
}
