import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/models/Contact";

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

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    const allowedStatuses = [
      "new",
      "contacted",
      "in-progress",
      "completed",
      "archived",
    ];

    const query: Record<string, any> = {};
    if (statusFilter && statusFilter !== "all" && allowedStatuses.includes(statusFilter)) {
      query.status = statusFilter;
    }

    const [inquiries, total, newCount, contactedCount, inProgressCount, archivedCount] =
      await Promise.all([
        Contact.find(query)
          .sort({ createdAt: -1 })
          .skip(isNaN(skip) ? 0 : skip)
          .limit(isNaN(limit) ? 100 : limit)
          .lean()
          .exec(),
        Contact.countDocuments(),
        Contact.countDocuments({ status: "new" }),
        Contact.countDocuments({ status: "contacted" }),
        Contact.countDocuments({ status: "in-progress" }),
        Contact.countDocuments({ status: "archived" }),
      ]);

    return NextResponse.json(
      {
        success: true,
        data: inquiries,
        stats: {
          total,
          new: newCount,
          contacted: contactedCount,
          inProgress: inProgressCount,
          archived: archivedCount,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/inquiries] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries from database." },
      { status: 500 }
    );
  }
}
