import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Pricing } from "@/models/Pricing";
import {
  PRICING_CATEGORIES,
  PRICING_DISCLAIMER,
  ENGAGEMENT_MODELS,
  PRICING_FAQS,
} from "@/data/pricingData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication token required." },
        { status: 401 }
      );
    }

    await connectToDatabase();
    let pricingDoc = await Pricing.findOne();

    if (!pricingDoc) {
      pricingDoc = await Pricing.create({
        disclaimer: PRICING_DISCLAIMER,
        categories: PRICING_CATEGORIES,
        engagementModels: ENGAGEMENT_MODELS,
        faqs: PRICING_FAQS,
      });
    }

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
  } catch (error: any) {
    console.error("[GET /api/admin/pricing] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load pricing data." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication token required." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { disclaimer, categories, engagementModels, faqs } = body;

    if (!Array.isArray(categories)) {
      return NextResponse.json(
        { success: false, error: "Invalid categories payload. Expected an array." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    let pricingDoc = await Pricing.findOne();

    const updatePayload = {
      disclaimer: typeof disclaimer === "string" ? disclaimer.trim() : PRICING_DISCLAIMER,
      categories,
      engagementModels: Array.isArray(engagementModels) ? engagementModels : ENGAGEMENT_MODELS,
      faqs: Array.isArray(faqs) ? faqs : PRICING_FAQS,
    };

    if (!pricingDoc) {
      pricingDoc = await Pricing.create(updatePayload);
    } else {
      pricingDoc.disclaimer = updatePayload.disclaimer;
      pricingDoc.categories = updatePayload.categories;
      pricingDoc.engagementModels = updatePayload.engagementModels;
      pricingDoc.faqs = updatePayload.faqs;
      await pricingDoc.save();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pricing configuration successfully saved.",
        data: {
          disclaimer: pricingDoc.disclaimer,
          categories: pricingDoc.categories,
          engagementModels: pricingDoc.engagementModels,
          faqs: pricingDoc.faqs,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[PUT /api/admin/pricing] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save pricing configuration." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication token required." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));

    if (body.action === "reset") {
      await connectToDatabase();
      let pricingDoc = await Pricing.findOne();

      const defaultPayload = {
        disclaimer: PRICING_DISCLAIMER,
        categories: PRICING_CATEGORIES,
        engagementModels: ENGAGEMENT_MODELS,
        faqs: PRICING_FAQS,
      };

      if (!pricingDoc) {
        pricingDoc = await Pricing.create(defaultPayload);
      } else {
        pricingDoc.disclaimer = defaultPayload.disclaimer;
        pricingDoc.categories = defaultPayload.categories;
        pricingDoc.engagementModels = defaultPayload.engagementModels;
        pricingDoc.faqs = defaultPayload.faqs;
        await pricingDoc.save();
      }

      return NextResponse.json(
        {
          success: true,
          message: "Pricing reset to studio defaults.",
          data: defaultPayload,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Unsupported action." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("[POST /api/admin/pricing] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to reset pricing." },
      { status: 500 }
    );
  }
}
