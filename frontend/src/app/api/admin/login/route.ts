import { NextRequest, NextResponse } from "next/server";
import { generateAdminToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { passcode } = body;
    const expectedPasscode =
      process.env.ADMIN_PASSCODE || "pglabs_admin_2026";

    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json(
        { success: false, error: "Admin passcode is required." },
        { status: 400 }
      );
    }

    if (passcode !== expectedPasscode) {
      return NextResponse.json(
        { success: false, error: "Invalid admin passcode. Access denied." },
        { status: 401 }
      );
    }

    const token = generateAdminToken();

    return NextResponse.json(
      {
        success: true,
        message: "Authenticated as PG Labs Administrator.",
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/login] Error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
