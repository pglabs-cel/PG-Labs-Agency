import nodemailer from "nodemailer";
import dns from "node:dns";

// Force IPv4 globally
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

export interface InquiryEmailData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
}

function getEmailConfig() {
  return {
    user: (process.env.EMAIL_USER || "").trim(),
    pass: (process.env.EMAIL_PASS || "").replace(/\s+/g, "").replace(/^["']|["']$/g, ""),
    adminEmail: (process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER || "").trim(),
    senderName: (process.env.EMAIL_SENDER_NAME || "PG Labs").trim(),
  };
}

function createTransporter() {
  const config = getEmailConfig();
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: config.user, pass: config.pass },
    family: 4,
    tls: { rejectUnauthorized: false },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  } as any);
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getAdminHtml(data: InquiryEmailData): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const company = escapeHtml(data.company || "Not specified");
  const projectType = escapeHtml(data.projectType);
  const budget = escapeHtml(data.budget || "Not specified");
  const message = escapeHtml(data.message).replace(/\n/g, "<br />");
  const date = new Date().toUTCString();

  return `
<div style="font-family:sans-serif;max-width:580px;margin:0 auto;background:#121215;border:1px solid #2d2d33;border-radius:12px;overflow:hidden;">
  <div style="padding:24px 28px;border-bottom:1px solid #2d2d33;background:#18181c;">
    <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c084fc;">PG LABS &bull; INQUIRY ALERT</div>
    <div style="font-size:20px;font-weight:700;color:#fff;margin-top:4px;">New Lead Received</div>
  </div>
  <div style="padding:28px;color:#cbd5e1;font-size:14px;line-height:1.6;">
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr><td style="padding:10px 12px;color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700;border-bottom:1px solid #2d2d33;">Client</td><td style="padding:10px 12px;color:#fff;font-weight:700;border-bottom:1px solid #2d2d33;">${name}</td></tr>
      <tr><td style="padding:10px 12px;color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700;border-bottom:1px solid #2d2d33;">Email</td><td style="padding:10px 12px;border-bottom:1px solid #2d2d33;"><a href="mailto:${email}" style="color:#c084fc;font-weight:700;text-decoration:none;">${email}</a></td></tr>
      <tr><td style="padding:10px 12px;color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700;border-bottom:1px solid #2d2d33;">Company</td><td style="padding:10px 12px;color:#fff;border-bottom:1px solid #2d2d33;">${company}</td></tr>
      <tr><td style="padding:10px 12px;color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700;border-bottom:1px solid #2d2d33;">Project</td><td style="padding:10px 12px;color:#fff;font-weight:700;border-bottom:1px solid #2d2d33;">${projectType}</td></tr>
      <tr><td style="padding:10px 12px;color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700;border-bottom:1px solid #2d2d33;">Budget</td><td style="padding:10px 12px;color:#4ade80;font-weight:700;border-bottom:1px solid #2d2d33;">${budget}</td></tr>
      <tr><td style="padding:10px 12px;color:#94a3b8;font-size:11px;text-transform:uppercase;font-weight:700;">Time</td><td style="padding:10px 12px;color:#cbd5e1;font-size:12px;">${date}</td></tr>
    </table>
    <div style="font-size:11px;text-transform:uppercase;color:#94a3b8;font-weight:700;margin-bottom:8px;">Message:</div>
    <div style="background:#1a1a1f;border:1px solid #33333d;border-radius:8px;padding:16px;color:#f1f5f9;font-size:14px;line-height:1.6;">${message}</div>
  </div>
  <div style="padding:16px 28px;border-top:1px solid #2d2d33;background:#18181c;text-align:center;color:#94a3b8;font-size:12px;">PG Labs Notification System</div>
</div>`.trim();
}

function getClientHtml(data: InquiryEmailData): string {
  const name = escapeHtml(data.name);
  return `
<div style="font-family:sans-serif;max-width:580px;margin:0 auto;background:#121215;border:1px solid #2d2d33;border-radius:12px;overflow:hidden;">
  <div style="padding:28px 32px;border-bottom:1px solid #2d2d33;background:#18181c;">
    <div style="font-size:18px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;color:#fff;">PG LABS</div>
    <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#c084fc;margin-top:3px;">Digital Product Studio</div>
  </div>
  <div style="padding:32px;color:#e2e8f0;font-size:15px;line-height:1.6;">
    <div style="font-size:22px;font-weight:700;color:#fff;margin-bottom:20px;">We've received your inquiry, ${name}.</div>
    <p>Thank you for reaching out to <strong style="color:#fff;">PG Labs</strong> regarding your <strong style="color:#fff;">${escapeHtml(data.projectType)}</strong> project.</p>
    <p style="color:#cbd5e1;font-size:14px;">Our engineering and design team is reviewing your project details.</p>
    <div style="background:#18181c;border:1px solid #2d2d33;border-left:4px solid #8b5cf6;border-radius:6px;padding:16px 20px;margin:24px 0;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#c084fc;margin-bottom:6px;">What Happens Next</div>
      <div style="font-size:14px;color:#f1f5f9;">A member of our core team will respond within <strong style="color:#fff;">24 business hours</strong>.</div>
    </div>
    <p style="font-size:14px;color:#cbd5e1;">If you have additional context or documents, reply directly to this email.</p>
    <div style="border-top:1px solid #2d2d33;padding-top:20px;margin-top:24px;">
      <div style="font-size:14px;font-weight:700;color:#fff;">PG Labs Engineering Team</div>
      <div style="font-size:13px;color:#94a3b8;">Web Applications &bull; AI Solutions &bull; Custom Software</div>
    </div>
  </div>
  <div style="padding:18px 32px;border-top:1px solid #2d2d33;background:#18181c;text-align:center;color:#94a3b8;font-size:12px;">&copy; ${new Date().getFullYear()} PG Labs. All rights reserved.</div>
</div>`.trim();
}

export async function sendInquiryEmails(data: InquiryEmailData): Promise<void> {
  const config = getEmailConfig();

  if (!config.user || !config.pass || config.pass.length < 8) {
    console.warn("[Vercel Mail] EMAIL_USER or EMAIL_PASS not configured. Skipping emails.");
    return;
  }

  const transporter = createTransporter();

  try {
    const results = await Promise.allSettled([
      transporter.sendMail({
        from: `"${config.senderName}" <${config.user}>`,
        to: config.adminEmail,
        replyTo: data.email,
        subject: `[New Inquiry] ${data.name} — ${data.projectType}`,
        text: `New Inquiry from ${data.name} (${data.email})\nCompany: ${data.company || "N/A"}\nProject: ${data.projectType}\nBudget: ${data.budget || "N/A"}\n\nMessage:\n${data.message}`,
        html: getAdminHtml(data),
      }),
      transporter.sendMail({
        from: `"${config.senderName}" <${config.user}>`,
        to: data.email,
        replyTo: config.adminEmail,
        subject: "Thank you for contacting PG Labs",
        text: `Hello ${data.name},\n\nThank you for reaching out to PG Labs regarding your ${data.projectType} project. We will get back to you within 24 business hours.\n\nBest regards,\nPG Labs Engineering Team`,
        html: getClientHtml(data),
      }),
    ]);

    results.forEach((result, i) => {
      const type = i === 0 ? "Admin Notification" : "Client Auto-Reply";
      if (result.status === "fulfilled") {
        console.log(`[Vercel Mail] ✓ ${type} sent (${result.value.messageId})`);
      } else {
        console.error(`[Vercel Mail] ❌ ${type} failed:`, result.reason?.message);
      }
    });
  } catch (error: any) {
    console.error("[Vercel Mail] Unexpected error:", error.message);
  }
}
