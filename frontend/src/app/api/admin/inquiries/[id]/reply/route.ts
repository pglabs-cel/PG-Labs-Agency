import { NextRequest, NextResponse } from "next/server";
import { isRequestAdminAuthorized } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/models/Contact";
import { sendReplyEmail, EmailAttachment } from "@/lib/email";
import { verifyFileSignature } from "@/lib/fileSignature";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isRequestAdminAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication token required." },
        { status: 401 }
      );
    }

    const { id } = params;
    const contentType = req.headers.get("content-type") || "";

    let subject = "";
    let message = "";
    const emailAttachments: EmailAttachment[] = [];
    let totalBytes = 0;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
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
                error: `File "${file.name}" exceeds the maximum allowed size (10MB).`,
              },
              { status: 400 }
            );
          }

          totalBytes += file.size;
          if (totalBytes > 25 * 1024 * 1024) {
            return NextResponse.json(
              {
                success: false,
                error: "Total attachment size cannot exceed 25MB (email limit).",
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
                    sigCheck.error || "Unsupported file type."
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

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json(
        { success: false, error: "Reply subject is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Reply message body is required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const inquiry = await Contact.findById(id).exec();
    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: "Inquiry not found in database." },
        { status: 404 }
      );
    }

    // Send the branded email via Nodemailer with attachments
    await sendReplyEmail({
      recipientEmail: inquiry.email,
      recipientName: inquiry.name,
      subject: subject.trim(),
      message: message.trim(),
      attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
    });

    // Automatically update status to 'contacted' if it's currently 'new'
    if (inquiry.status === "new") {
      inquiry.status = "contacted";
      await inquiry.save();
    }

    return NextResponse.json(
      {
        success: true,
        message: `Reply email successfully sent to ${inquiry.email}.`,
        updatedStatus: inquiry.status,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Next.js /api/admin/inquiries/[id]/reply] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to send reply email. Please check server logs.",
      },
      { status: 500 }
    );
  }
}
