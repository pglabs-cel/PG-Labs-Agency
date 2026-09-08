import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";
import { PROJECTS } from "@/data/projects";

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

    if (dbProjects && dbProjects.length > 0) {
      return NextResponse.json(
        { success: true, data: dbProjects },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.warn("[Next.js /api/projects] DB fetch fallback to static data:", error.message);
  }

  // Fallback gracefully to static data
  const fallbackData = featuredOnly
    ? PROJECTS.filter((p) => p.featured)
    : PROJECTS;

  return NextResponse.json(
    { success: true, data: fallbackData },
    { status: 200 }
  );
}
