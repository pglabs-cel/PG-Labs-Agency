import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";
import { PROJECTS } from "@/data/projects";

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
  } catch (error: any) {
    console.warn("[Next.js /api/projects/[slug]] DB fallback to static data:", error.message);
  }

  // Fallback to static data
  const staticProject = PROJECTS.find((p) => p.slug === slug);
  if (staticProject) {
    return NextResponse.json(
      { success: true, data: staticProject },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { success: false, error: "Project not found." },
    { status: 404 }
  );
}
