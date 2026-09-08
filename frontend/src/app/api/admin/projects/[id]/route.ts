import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await req.json().catch(() => ({}));

    await connectToDatabase();

    const updated = await Project.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).exec();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/projects/[id] PUT] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update project." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      );
    }

    const { id } = params;
    await connectToDatabase();

    const deleted = await Project.findByIdAndDelete(id).exec();

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Project deleted successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/projects/[id] DELETE] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete project." },
      { status: 500 }
    );
  }
}
