import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featuredOnly = searchParams.get("featured") === "true";

  try {
    await connectToDatabase();
    const query = featuredOnly ? { featured: true } : {};
    const dbProjects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json(
      { success: true, data: dbProjects || [] },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/projects] Database fetch error:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects from database." },
      { status: 500 }
    );
  }
}
