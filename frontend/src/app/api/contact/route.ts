import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface ContactBody {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message?: string;
}

const ALLOWED_PROJECT_TYPES = [
  "Website",
  "Web Application",
  "SaaS",
  "AI/ML",
  "Custom Software",
  "Automation",
  "Other",
];

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json().catch(() => ({}));

    const { name, email, company, projectType, budget, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    const resolvedProjectType =
      projectType && ALLOWED_PROJECT_TYPES.includes(projectType)
        ? projectType
        : "Web Application";

    // Determine Backend API endpoint
    let backendApi =
      process.env.BACKEND_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000/api";

    // Strip trailing slashes
    backendApi = backendApi.replace(/\/+$/, "");

    // Ensure URL has /api suffix if not present
    const targetUrl = backendApi.endsWith("/contact")
      ? backendApi
      : backendApi.endsWith("/api")
      ? `${backendApi}/contact`
      : `${backendApi}/api/contact`;

    // Forward request to Node.js/Express backend
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout for cold start

    try {
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          company: company?.trim() || "",
          projectType: resolvedProjectType,
          budget: budget?.trim() || "",
          message: message.trim(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return NextResponse.json(
          {
            error:
              data.error ||
              `Backend returned status ${response.status}. Please try again later.`,
          },
          { status: response.status }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message:
            data.message ||
            "Inquiry received successfully. We will be in touch within 24 hours.",
          data: data.data,
        },
        { status: response.status === 201 ? 201 : 200 }
      );
    } catch (fetchError: any) {
      clearTimeout(timeoutId);

      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          {
            error:
              "The backend server is taking longer than expected to respond (waking up). Please try again in a few seconds.",
          },
          { status: 504 }
        );
      }

      console.error("[Next.js /api/contact] Backend connection error:", fetchError);

      return NextResponse.json(
        {
          error:
            "Unable to reach the PG Labs backend API service. Please verify your connection or email us directly at pglabs.agency@gmail.com.",
        },
        { status: 503 }
      );
    }
  } catch (error: any) {
    console.error("[Next.js /api/contact] Handler error:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while processing your inquiry. Please try again later.",
      },
      { status: 500 }
    );
  }
}
