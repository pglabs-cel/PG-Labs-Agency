import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Project } from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const projects = await Project.find()
      .sort({ order: 1, createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json(
      { success: true, data: projects },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/projects GET] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const {
      title,
      slug,
      category,
      categories,
      shortDescription,
      description,
      technologies,
      features,
      challenge,
      solution,
      outcome,
      year,
      featured,
      order,
      thumbnail,
      images,
      videoUrl,
      liveUrl,
    } = body;

    if (!title || !slug || !shortDescription || !description || !challenge || !solution) {
      return NextResponse.json(
        { success: false, error: "Missing required fields for project." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingSlug = await Project.findOne({ slug: slug.trim().toLowerCase() });
    if (existingSlug) {
      return NextResponse.json(
        { success: false, error: "A project with this slug already exists." },
        { status: 409 }
      );
    }

    const newProject = await Project.create({
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      category: category || "Web Application",
      categories: Array.isArray(categories) ? categories : [],
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      technologies: Array.isArray(technologies) ? technologies : [],
      features: Array.isArray(features) ? features : [],
      challenge: challenge.trim(),
      solution: solution.trim(),
      outcome: outcome?.trim() || "",
      year: year || new Date().getFullYear().toString(),
      featured: featured !== undefined ? Boolean(featured) : true,
      order: typeof order === "number" ? order : 0,
      thumbnail: thumbnail || "",
      images: Array.isArray(images) ? images : [],
      videoUrl: videoUrl || "",
      liveUrl: liveUrl || "",
    });

    return NextResponse.json(
      { success: true, data: newProject },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/projects POST] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create project." },
      { status: 500 }
    );
  }
}
