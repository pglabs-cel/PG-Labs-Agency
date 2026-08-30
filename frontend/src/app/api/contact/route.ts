import { NextRequest, NextResponse } from "next/server";
import { sendInquiryEmails } from "@/lib/email";

export const dynamic = "force-dynamic";
export const maxDuration = 30; // Allow up to 30s for Vercel serverless

interface ContactBody {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
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

    const { name, email, company, projectType, message } = body;

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

    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || "",
      projectType: resolvedProjectType,
      message: message.trim(),
    };

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

    // Forward request to Node.js/Express backend (for MongoDB storage)
    let backendSuccess = false;
    let backendData: any = {};

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout for cold start

    try {
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(sanitizedData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      backendData = await response.json().catch(() => ({}));
      backendSuccess = response.ok;

      if (!backendSuccess) {
        console.error(
          `[Next.js /api/contact] Backend returned ${response.status}:`,
          backendData.error || "unknown"
        );
      }
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      console.error("[Next.js /api/contact] Backend connection error:", fetchError.message);
      // Don't return error — still try to send emails even if backend is down
    }

    // Send emails from Vercel (bypasses Render SMTP block)
    try {
      await sendInquiryEmails(sanitizedData);
      console.log("[Next.js /api/contact] Emails dispatched from Vercel");
    } catch (emailError: any) {
      console.error("[Next.js /api/contact] Email send error:", emailError.message);
    }

    // If backend saved successfully, return 201
    if (backendSuccess) {
      return NextResponse.json(
        {
          success: true,
          message:
            backendData.message ||
            "Inquiry received successfully. We will be in touch within 24 hours.",
          data: backendData.data,
        },
        { status: 201 }
      );
    }

    // Even if backend was down, if we reached here the form was valid and emails were attempted
    return NextResponse.json(
      {
        success: true,
        message:
          "Your inquiry has been received. We will get back to you within 24 hours.",
      },
      { status: 200 }
    );
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
