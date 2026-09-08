import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/models/Contact";

export const dynamic = "force-dynamic";

export async function PATCH(
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
    const body = await req.json().catch(() => ({}));
    const { status } = body;

    const allowedStatuses = [
      "new",
      "contacted",
      "in-progress",
      "completed",
      "archived",
    ];

    if (!status || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`,
        },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updated = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).exec();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Inquiry status updated to '${status}'.`,
        data: updated,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/inquiries/[id]/status] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update inquiry status." },
      { status: 500 }
    );
  }
}
