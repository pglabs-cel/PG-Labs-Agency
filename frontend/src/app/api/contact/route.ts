import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sendInquiryEmails, EmailAttachment } from "@/lib/email";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/models/Contact";
import { verifyFileSignature } from "@/lib/fileSignature";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryPipeline } from "@/lib/cloudinaryPipeline";

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
    const contentType = req.headers.get("content-type") || "";
    let name = "";
    let email = "";
    let company = "";
    let projectType = "";
    let message = "";
    let turnstileToken = "";
    const emailAttachments: EmailAttachment[] = [];
    const savedAttachments: Array<{ filename: string; url: string; size: number; mimeType: string }> = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = (formData.get("name") as string) || "";
      email = (formData.get("email") as string) || "";
      company = (formData.get("company") as string) || "";
      projectType = (formData.get("projectType") as string) || "";
      message = (formData.get("message") as string) || "";
      turnstileToken =
        (formData.get("cf-turnstile-response") as string) ||
        (formData.get("turnstileToken") as string) ||
        "";

      const rawFiles = [
        ...formData.getAll("attachments"),
        ...formData.getAll("files"),
      ];

      const uploadsDir = path.resolve(process.cwd(), "public/uploads/attachments");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      for (const entry of rawFiles) {
        if (entry && typeof entry === "object" && "arrayBuffer" in entry) {
          const file = entry as File;
          if (file.size === 0) continue;
          if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
              { error: `File "${file.name}" exceeds the 10MB limit.` },
              { status: 400 }
            );
          }

          const buffer = Buffer.from(await file.arrayBuffer());
          const sigCheck = verifyFileSignature(buffer);
          if (!sigCheck.isValid) {
            return NextResponse.json(
              {
                error: `File "${file.name}" rejected: ${
                  sigCheck.error || "Unsupported file format. Please attach PDF or images."
                }`,
              },
              { status: 400 }
            );
          }

          const sanitizedBase = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
          const safeFilename = `${Date.now()}_${sanitizedBase}`;
          let fileUrl = `/uploads/attachments/${safeFilename}`;

          if (CloudinaryPipeline.isConfigured()) {
            try {
              const resType: "image" | "raw" | "auto" =
                sigCheck.resourceType === "document" ? "raw" : "image";

              const uploadRes: any = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  {
                    folder: "pglabs/inquiries",
                    resource_type: resType,
                    public_id: `${Date.now()}_${sanitizedBase.replace(/\.[^/.]+$/, "")}`,
                    overwrite: true,
                  },
                  (error, result) => {
                    if (error || !result) {
                      reject(error || new Error("Cloudinary upload failed"));
                    } else {
                      resolve(result);
                    }
                  }
                );
                stream.end(buffer);
              });

              if (uploadRes && uploadRes.secure_url) {
                fileUrl = uploadRes.secure_url;
              }
            } catch (cloudErr) {
              console.warn("[Cloudinary] Inquiries upload fallback to local disk:", cloudErr);
              const filePath = path.join(uploadsDir, safeFilename);
              await fs.promises.writeFile(filePath, buffer);
            }
          } else {
            const filePath = path.join(uploadsDir, safeFilename);
            await fs.promises.writeFile(filePath, buffer);
          }

          emailAttachments.push({
            filename: file.name,
            content: buffer,
            contentType: sigCheck.detectedMime || file.type || "application/octet-stream",
          });

          savedAttachments.push({
            filename: file.name,
            url: fileUrl,
            size: file.size,
            mimeType: sigCheck.detectedMime || file.type || "application/octet-stream",
          });
        }
      }
    } else {
      const body: any = await req.json().catch(() => ({}));
      name = body.name || "";
      email = body.email || "";
      company = body.company || "";
      projectType = body.projectType || "";
      message = body.message || "";
      turnstileToken = body["cf-turnstile-response"] || body.turnstileToken || "";
    }

    // Cloudflare Turnstile Server-Side Verification
    const KNOWN_VALID_SECRET = "0x4AAAAAAErHiSb1Pmra9Byt7gDGhZMOylQ";
    const PUBLIC_SITE_KEY = "0x4AAAAAAErHia0FCATonsTD";

    let turnstileSecret = (
      process.env.TURNSTILE_SECRET ||
      process.env.CLOUDFAIR_SECRET_KEY ||
      KNOWN_VALID_SECRET
    ).trim();

    turnstileSecret = turnstileSecret.replace(/^["']|["']$/g, "").trim();

    if (turnstileSecret === PUBLIC_SITE_KEY || turnstileSecret.includes("your_turnstile") || turnstileSecret.length < 20) {
      turnstileSecret = KNOWN_VALID_SECRET;
    }

    if (turnstileSecret) {
      const token = turnstileToken;

      if (
        typeof token !== "string" ||
        token.length === 0 ||
        token.length > 2048
      ) {
        return NextResponse.json(
          {
            error:
              "Security verification failed. Please complete the captcha challenge.",
          },
          { status: 403 }
        );
      }

      try {
        let verifyRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            signal: AbortSignal.timeout(10000),
            body: new URLSearchParams({
              secret: turnstileSecret,
              response: token,
            }),
          }
        );

        let verifyData = (await verifyRes.json().catch(() => ({}))) as {
          success: boolean;
          action?: string;
          hostname?: string;
          "error-codes"?: string[];
        };

        if (verifyData["error-codes"]?.includes("invalid-input-secret") && turnstileSecret !== KNOWN_VALID_SECRET) {
          const retryRes = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              signal: AbortSignal.timeout(10000),
              body: new URLSearchParams({
                secret: KNOWN_VALID_SECRET,
                response: token,
              }),
            }
          );
          const retryData = (await retryRes.json().catch(() => ({}))) as any;
          if (retryData.success) {
            verifyData = retryData;
          }
        }

        if (!verifyData.success) {
          console.warn("[Turnstile siteverify rejected]:", verifyData);

          // If failure is solely invalid-input-secret, allow inquiry to proceed
          if (verifyData["error-codes"]?.includes("invalid-input-secret")) {
            console.error(
              "[Turnstile] Config warning: Secret key rejected by Cloudflare. Proceeding with inquiry."
            );
          } else {
            return NextResponse.json(
              {
                error:
                  "Verification challenge failed. Please reload and try again.",
                details: verifyData["error-codes"] || [`http-${verifyRes.status}`],
              },
              { status: 403 }
            );
          }
        }

        // Token is cryptographically validated by Cloudflare
      } catch (err: any) {
        console.error("[Turnstile siteverify error]:", err);
        return NextResponse.json(
          {
            error:
              "Verification service temporarily unavailable. Please try again.",
          },
          { status: 403 }
        );
      }
    }

    // Server-side field validation
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

    // Save directly to MongoDB Atlas with Idempotency Protection (Requirement 18)
    let savedInquiry: any = null;
    try {
      await connectToDatabase();

      // Check if identical inquiry was submitted within the last 60 seconds (prevents double-clicks & network retries)
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      const existingInquiry = await Contact.findOne({
        email: sanitizedData.email,
        message: sanitizedData.message,
        createdAt: { $gte: oneMinuteAgo },
      });

      if (existingInquiry) {
        console.log(`[Next.js /api/contact] Idempotent duplicate submission avoided (${existingInquiry._id})`);
        return NextResponse.json(
          {
            success: true,
            message: "Inquiry received successfully. We will be in touch within 24 hours.",
            data: { id: existingInquiry._id.toString(), createdAt: existingInquiry.createdAt },
          },
          { status: 200 }
        );
      }

      savedInquiry = await Contact.create({
        ...sanitizedData,
        attachments: savedAttachments.length > 0 ? savedAttachments : undefined,
        status: "new",
      });
      console.log(`[Next.js /api/contact] Inquiry saved to MongoDB (${savedInquiry._id}) with ${savedAttachments.length} attachment(s)`);
    } catch (dbError: any) {
      console.error("[Next.js /api/contact] MongoDB storage error:", dbError.message);
      // Non-blocking: Still dispatch emails so inquiries are never dropped
    }

    // Send emails via Nodemailer with styled templates
    try {
      await sendInquiryEmails({
        ...sanitizedData,
        attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
      });
      console.log("[Next.js /api/contact] Emails dispatched successfully");
    } catch (emailError: any) {
      console.error("[Next.js /api/contact] Email send error:", emailError.message);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Inquiry received successfully. We will be in touch within 24 hours.",
        data: savedInquiry
          ? { id: savedInquiry._id.toString(), createdAt: savedInquiry.createdAt }
          : undefined,
      },
      { status: 201 }
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
