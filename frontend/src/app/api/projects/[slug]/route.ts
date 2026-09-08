import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    await connectToDatabase();
    const dbProject = await Project.findOne({ slug }).lean().exec();

    if (dbProject) {
      return NextResponse.json(
        { success: true, data: dbProject },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Project not found." },
      { status: 404 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/projects/[slug]] Database fetch error:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project from database." },
      { status: 500 }
    );
  }
}
