import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { sendOutreachEmail, EmailAttachment } from "@/lib/email";
import { verifyFileSignature } from "@/lib/fileSignature";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      );
    }

    const contentType = req.headers.get("content-type") || "";

    let recipientEmail = "";
    let recipientName = "";
    let subject = "";
    let message = "";
    const emailAttachments: EmailAttachment[] = [];
    let totalBytes = 0;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      recipientEmail = (formData.get("recipientEmail") as string) || "";
      recipientName = (formData.get("recipientName") as string) || "";
      subject = (formData.get("subject") as string) || "";
      message = (formData.get("message") as string) || "";

      // Collect attachments from both 'attachments' and 'files' fields
      const rawFiles = [
        ...formData.getAll("attachments"),
        ...formData.getAll("files"),
      ];

      for (const entry of rawFiles) {
        if (entry && typeof entry === "object" && "arrayBuffer" in entry) {
          const file = entry as File;
          if (file.size === 0) continue;

          if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
              {
                success: false,
                error: `File "${file.name}" exceeds the 10MB limit per file.`,
              },
              { status: 400 }
            );
          }

          totalBytes += file.size;
          if (totalBytes > 25 * 1024 * 1024) {
            return NextResponse.json(
              {
                success: false,
                error: "Total attachment size cannot exceed 25MB (email provider limit).",
              },
              { status: 400 }
            );
          }

          const buffer = Buffer.from(await file.arrayBuffer());
          const sigCheck = verifyFileSignature(buffer);
          if (!sigCheck.isValid) {
            return NextResponse.json(
              {
                success: false,
                error: `File "${file.name}" rejected: ${
                  sigCheck.error || "Unsupported file format. Please attach PDF or images."
                }`,
              },
              { status: 400 }
            );
          }

          emailAttachments.push({
            filename: file.name,
            content: buffer,
            contentType: sigCheck.detectedMime || file.type || "application/octet-stream",
          });
        }
      }
    } else {
      const body = await req.json().catch(() => ({}));
      recipientEmail = body.recipientEmail || "";
      recipientName = body.recipientName || "";
      subject = body.subject || "";
      message = body.message || "";

      if (Array.isArray(body.attachments)) {
        for (const att of body.attachments) {
          if (att && att.filename && att.content) {
            const buffer = Buffer.isBuffer(att.content)
              ? att.content
              : Buffer.from(att.content, "base64");

            if (buffer.length > 10 * 1024 * 1024) {
              return NextResponse.json(
                {
                  success: false,
                  error: `Attachment "${att.filename}" exceeds 10MB limit.`,
                },
                { status: 400 }
              );
            }

            totalBytes += buffer.length;
            if (totalBytes > 25 * 1024 * 1024) {
              return NextResponse.json(
                {
                  success: false,
                  error: "Total attachment size cannot exceed 25MB.",
                },
                { status: 400 }
              );
            }

            const sigCheck = verifyFileSignature(buffer);
            if (!sigCheck.isValid) {
              return NextResponse.json(
                {
                  success: false,
                  error: `Attachment "${att.filename}" rejected: ${
                    sigCheck.error || "Unsupported file format."
                  }`,
                },
                { status: 400 }
              );
            }

            emailAttachments.push({
              filename: att.filename,
              content: buffer,
              contentType: sigCheck.detectedMime || att.contentType || "application/octet-stream",
            });
          }
        }
      }
    }

    // Validate required fields
    recipientEmail = recipientEmail.trim();
    if (!recipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      return NextResponse.json(
        { success: false, error: "A valid recipient email address is required." },
        { status: 400 }
      );
    }

    subject = subject.trim();
    if (!subject) {
      return NextResponse.json(
        { success: false, error: "Email subject is required." },
        { status: 400 }
      );
    }

    message = message.trim();
    if (!message) {
      return NextResponse.json(
        { success: false, error: "Email message body is required." },
        { status: 400 }
      );
    }

    const cleanRecipientName = recipientName.trim() || recipientEmail.split("@")[0];

    // Send the wrapped outreach email
    await sendOutreachEmail({
      recipientEmail,
      recipientName: cleanRecipientName,
      subject,
      message,
      attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Email successfully sent to ${recipientEmail}.`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/emails/send] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to send email. Please check server email credentials.",
      },
      { status: 500 }
    );
  }
}
