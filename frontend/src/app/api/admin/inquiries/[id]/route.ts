import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/models/Contact";

export const dynamic = "force-dynamic";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication token required." },
        { status: 401 }
      );
    }

    const { id } = params;
    await connectToDatabase();

    const deleted = await Contact.findByIdAndDelete(id).exec();

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/inquiries/[id]] DELETE Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete inquiry." },
      { status: 500 }
    );
  }
}
