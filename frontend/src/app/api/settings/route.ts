import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await SiteSettings.findOne().lean();

    if (!settings) {
      return NextResponse.json(
        {
          success: true,
          data: {
            email: "pglabs.agency@gmail.com",
            phone: "",
            whatsappNumber: "",
            linkedin: "",
            twitter: "",
            github: "",
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          email: settings.email || "pglabs.agency@gmail.com",
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
    console.error("[/api/settings] Error fetching site settings:", error);
    return NextResponse.json(
      {
        success: true,
        data: {
          email: "pglabs.agency@gmail.com",
          phone: "",
          whatsappNumber: "",
          linkedin: "",
          twitter: "",
          github: "",
        },
      },
      { status: 200 }
    );
  }
}
