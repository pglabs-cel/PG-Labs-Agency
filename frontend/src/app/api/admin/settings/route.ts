import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";

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
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = await SiteSettings.create({
        email: "pglabs.agency@gmail.com",
        phone: "",
        whatsappNumber: "",
        linkedin: "",
        twitter: "",
        github: "",
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          email: settings.email,
          phone: settings.phone || "",
          whatsappNumber: settings.whatsappNumber || "",
          linkedin: settings.linkedin || "",
          twitter: settings.twitter || "",
          github: settings.github || "",
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[GET /api/admin/settings] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load settings." },
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
    const { email, phone, whatsappNumber, linkedin, twitter, github } = body;

    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "A valid studio email address is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    let settings = await SiteSettings.findOne();

    const updatePayload = {
      email: email.trim().toLowerCase(),
      phone: typeof phone === "string" ? phone.trim() : "",
      whatsappNumber: typeof whatsappNumber === "string" ? whatsappNumber.trim() : "",
      linkedin: typeof linkedin === "string" ? linkedin.trim() : "",
      twitter: typeof twitter === "string" ? twitter.trim() : "",
      github: typeof github === "string" ? github.trim() : "",
    };

    if (!settings) {
      settings = await SiteSettings.create(updatePayload);
    } else {
      settings.email = updatePayload.email;
      settings.phone = updatePayload.phone;
      settings.whatsappNumber = updatePayload.whatsappNumber;
      settings.linkedin = updatePayload.linkedin;
      settings.twitter = updatePayload.twitter;
      settings.github = updatePayload.github;
      await settings.save();
    }

    return NextResponse.json(
      {
        success: true,
        message: "Studio contact info updated successfully.",
        data: {
          email: settings.email,
          phone: settings.phone,
          whatsappNumber: settings.whatsappNumber,
          linkedin: settings.linkedin,
          twitter: settings.twitter,
          github: settings.github,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[PUT /api/admin/settings] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save settings." },
      { status: 500 }
    );
  }
}
