import { mailTransporter, getMailConfig, isMailConfigured } from "../config/mail";

export interface EmailInquiryData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
  createdAt?: Date | string;
}

const escapeHtml = (str: string): string => {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export class EmailService {
  /**
   * Generates the Admin Notification HTML Template in Bulletproof Dark Mode
   */
  public static getAdminNotificationHtml(data: EmailInquiryData): string {
    const formattedDate = data.createdAt
      ? new Date(data.createdAt).toUTCString()
      : new Date().toUTCString();

    const clientName = escapeHtml(data.name);
    const clientEmail = escapeHtml(data.email);
    const clientCompany = escapeHtml(data.company || "Not specified");
    const projectType = escapeHtml(data.projectType);
    const budget = escapeHtml(data.budget || "Not specified");
    const message = escapeHtml(data.message).replace(/\n/g, "<br />");
    const mailtoLink = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(
      `Re: Your PG Labs Inquiry — ${data.projectType}`
    )}`;

    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" style="color-scheme: dark; supported-color-schemes: dark;">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
  <title>New Inquiry Notification</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    :root {
      color-scheme: dark !important;
      supported-color-schemes: dark !important;
    }
    body, table, td, p, a, div, span, h1, h2, h3 {
      color-scheme: dark !important;
    }
    /* Prevents Webkit & Gmail dark mode color inversions */
    .bg-main {
      background-color: #09090b !important;
      background-image: linear-gradient(#09090b, #09090b) !important;
    }
    .bg-card {
      background-color: #111113 !important;
      background-image: linear-gradient(#111113, #111113) !important;
    }
    .bg-header {
      background-color: #18181b !important;
      background-image: linear-gradient(#18181b, #18181b) !important;
    }
    .bg-table {
      background-color: #151518 !important;
      background-image: linear-gradient(#151518, #151518) !important;
    }
    .bg-box {
      background-color: #18181b !important;
      background-image: linear-gradient(#18181b, #18181b) !important;
    }
    .bg-badge {
      background-color: #8b5cf6 !important;
      background-image: linear-gradient(#8b5cf6, #8b5cf6) !important;
    }
    .text-title {
      color: #ffffff !important;
      -webkit-text-fill-color: #ffffff !important;
    }
    .text-body {
      color: #e4e4e7 !important;
      -webkit-text-fill-color: #e4e4e7 !important;
    }
    .text-secondary {
      color: #a1a1aa !important;
      -webkit-text-fill-color: #a1a1aa !important;
    }
    .text-muted {
      color: #71717a !important;
      -webkit-text-fill-color: #71717a !important;
    }
    .text-accent {
      color: #a78bfa !important;
      -webkit-text-fill-color: #a78bfa !important;
    }
    .text-green {
      color: #34d399 !important;
      -webkit-text-fill-color: #34d399 !important;
    }
    /* Outlook.com dark mode target */
    [data-ogsc] .bg-main, [data-ogsb] .bg-main { background-color: #09090b !important; background-image: linear-gradient(#09090b, #09090b) !important; }
    [data-ogsc] .bg-card, [data-ogsb] .bg-card { background-color: #111113 !important; background-image: linear-gradient(#111113, #111113) !important; }
    [data-ogsc] .bg-header, [data-ogsb] .bg-header { background-color: #18181b !important; background-image: linear-gradient(#18181b, #18181b) !important; }
    [data-ogsc] .text-title, [data-ogsb] .text-title { color: #ffffff !important; }
    [data-ogsc] .text-body, [data-ogsb] .text-body { color: #e4e4e7 !important; }
  </style>
</head>
<body class="bg-main" style="margin: 0; padding: 0; background-color: #09090b; background-image: linear-gradient(#09090b, #09090b); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #fafafa; -webkit-font-smoothing: antialiased;">
  <table class="bg-main" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; background-image: linear-gradient(#09090b, #09090b); padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table class="bg-card" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #111113; background-image: linear-gradient(#111113, #111113); border: 1px solid #27272a; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.6);">
          
          <!-- Header Bar -->
          <tr>
            <td class="bg-header" style="padding: 24px 28px; border-bottom: 1px solid #27272a; background-color: #18181b; background-image: linear-gradient(#18181b, #18181b);">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div class="text-accent" style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #a78bfa; text-transform: uppercase; margin-bottom: 4px;">
                      PG LABS &bull; INQUIRY ALERT
                    </div>
                    <div class="text-title" style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                      New Lead Received
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span class="bg-badge" style="display: inline-block; background-color: #8b5cf6; background-image: linear-gradient(#8b5cf6, #8b5cf6); color: #ffffff !important; font-size: 12px; font-weight: 600; padding: 6px 12px; border-radius: 6px; white-space: nowrap;">
                      ${projectType}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="bg-card" style="padding: 28px; background-color: #111113; background-image: linear-gradient(#111113, #111113);">
              <p class="text-secondary" style="margin-top: 0; margin-bottom: 24px; font-size: 14px; color: #a1a1aa; line-height: 1.5;">
                A new project inquiry has been submitted through the PG Labs website contact portal.
              </p>

              <!-- Inquiry Details Table -->
              <table class="bg-table" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-bottom: 24px; background-color: #151518; background-image: linear-gradient(#151518, #151518); border: 1px solid #27272a; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td class="text-muted" style="padding: 12px 16px; border-bottom: 1px solid #27272a; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em; width: 130px; font-weight: 700;">Client Name</td>
                  <td class="text-title" style="padding: 12px 16px; border-bottom: 1px solid #27272a; font-size: 14px; color: #ffffff; font-weight: 600;">${clientName}</td>
                </tr>
                <tr>
                  <td class="text-muted" style="padding: 12px 16px; border-bottom: 1px solid #27272a; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700;">Client Email</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #27272a; font-size: 14px;">
                    <a href="mailto:${clientEmail}" class="text-accent" style="color: #a78bfa !important; font-weight: 600; text-decoration: none;">${clientEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td class="text-muted" style="padding: 12px 16px; border-bottom: 1px solid #27272a; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700;">Company</td>
                  <td class="text-body" style="padding: 12px 16px; border-bottom: 1px solid #27272a; font-size: 14px; color: #e4e4e7;">${clientCompany}</td>
                </tr>
                <tr>
                  <td class="text-muted" style="padding: 12px 16px; border-bottom: 1px solid #27272a; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700;">Project Type</td>
                  <td class="text-title" style="padding: 12px 16px; border-bottom: 1px solid #27272a; font-size: 14px; color: #ffffff; font-weight: 600;">${projectType}</td>
                </tr>
                <tr>
                  <td class="text-muted" style="padding: 12px 16px; border-bottom: 1px solid #27272a; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700;">Budget Estimate</td>
                  <td class="text-green" style="padding: 12px 16px; border-bottom: 1px solid #27272a; font-size: 14px; color: #34d399; font-weight: 600;">${budget}</td>
                </tr>
                <tr>
                  <td class="text-muted" style="padding: 12px 16px; font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700;">Timestamp</td>
                  <td class="text-secondary" style="padding: 12px 16px; font-size: 12px; color: #a1a1aa; font-family: monospace;">${formattedDate}</td>
                </tr>
              </table>

              <!-- Project Message Box -->
              <div style="margin-bottom: 28px;">
                <div class="text-muted" style="font-size: 11px; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; margin-bottom: 8px;">
                  Project Scope & Requirements:
                </div>
                <div class="bg-box text-body" style="background-color: #18181b; background-image: linear-gradient(#18181b, #18181b); border: 1px solid #27272a; border-radius: 8px; padding: 16px; font-size: 14px; color: #e4e4e7; line-height: 1.6; white-space: pre-wrap;">${message}</div>
              </div>

              <!-- Quick Action Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="${mailtoLink}" class="bg-badge" style="display: inline-block; background-color: #8b5cf6; background-image: linear-gradient(#8b5cf6, #8b5cf6); color: #ffffff !important; font-size: 14px; font-weight: 600; text-decoration: none; padding: 13px 32px; border-radius: 8px; letter-spacing: 0.02em;">
                      Reply to ${clientName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="bg-header" style="padding: 18px 28px; border-top: 1px solid #27272a; background-color: #18181b; background-image: linear-gradient(#18181b, #18181b); text-align: center;">
              <p class="text-muted" style="margin: 0; font-size: 12px; color: #71717a;">
                PG Labs Automated Notification System &bull; Technology & Digital Product Studio
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  }

  /**
   * Generates the Client Acknowledgment Auto-Reply HTML Template in Bulletproof Dark Mode
   */
  public static getClientAutoReplyHtml(data: EmailInquiryData): string {
    const clientName = escapeHtml(data.name);
    const projectType = escapeHtml(data.projectType);
    const company = escapeHtml(data.company || "");

    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" style="color-scheme: dark; supported-color-schemes: dark;">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
  <title>Thank you for contacting PG Labs</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    :root {
      color-scheme: dark !important;
      supported-color-schemes: dark !important;
    }
    body, table, td, p, a, div, span, h1, h2, h3 {
      color-scheme: dark !important;
    }
    /* Prevents Webkit & Gmail dark mode color inversions */
    .bg-main {
      background-color: #09090b !important;
      background-image: linear-gradient(#09090b, #09090b) !important;
    }
    .bg-card {
      background-color: #111113 !important;
      background-image: linear-gradient(#111113, #111113) !important;
    }
    .bg-header {
      background-color: #18181b !important;
      background-image: linear-gradient(#18181b, #18181b) !important;
    }
    .bg-callout {
      background-color: #18181b !important;
      background-image: linear-gradient(#18181b, #18181b) !important;
    }
    .text-white {
      color: #ffffff !important;
      -webkit-text-fill-color: #ffffff !important;
    }
    .text-body {
      color: #e4e4e7 !important;
      -webkit-text-fill-color: #e4e4e7 !important;
    }
    .text-secondary {
      color: #a1a1aa !important;
      -webkit-text-fill-color: #a1a1aa !important;
    }
    .text-muted {
      color: #71717a !important;
      -webkit-text-fill-color: #71717a !important;
    }
    .text-purple {
      color: #a78bfa !important;
      -webkit-text-fill-color: #a78bfa !important;
    }
    /* Outlook.com dark mode target */
    [data-ogsc] .bg-main, [data-ogsb] .bg-main { background-color: #09090b !important; background-image: linear-gradient(#09090b, #09090b) !important; }
    [data-ogsc] .bg-card, [data-ogsb] .bg-card { background-color: #111113 !important; background-image: linear-gradient(#111113, #111113) !important; }
    [data-ogsc] .bg-header, [data-ogsb] .bg-header { background-color: #18181b !important; background-image: linear-gradient(#18181b, #18181b) !important; }
    [data-ogsc] .text-white, [data-ogsb] .text-white { color: #ffffff !important; }
    [data-ogsc] .text-body, [data-ogsb] .text-body { color: #e4e4e7 !important; }
  </style>
</head>
<body class="bg-main" style="margin: 0; padding: 0; background-color: #09090b; background-image: linear-gradient(#09090b, #09090b); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #fafafa; -webkit-font-smoothing: antialiased;">
  <table class="bg-main" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; background-image: linear-gradient(#09090b, #09090b); padding: 36px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table class="bg-card" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #111113; background-image: linear-gradient(#111113, #111113); border: 1px solid #27272a; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.6);">
          
          <!-- Header -->
          <tr>
            <td class="bg-header" style="padding: 28px 32px; border-bottom: 1px solid #27272a; background-color: #18181b; background-image: linear-gradient(#18181b, #18181b);">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div class="text-white" style="font-size: 17px; font-weight: 800; letter-spacing: 0.15em; color: #ffffff; text-transform: uppercase;">
                      PG LABS
                    </div>
                    <div class="text-purple" style="font-size: 11px; font-weight: 600; letter-spacing: 0.08em; color: #a78bfa; text-transform: uppercase; margin-top: 3px;">
                      Digital Product Studio
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="bg-card" style="padding: 32px; background-color: #111113; background-image: linear-gradient(#111113, #111113);">
              <div class="text-white" style="margin-top: 0; margin-bottom: 18px; font-size: 21px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; line-height: 1.3;">
                We've received your inquiry, ${clientName}.
              </div>

              <p class="text-body" style="margin-top: 0; margin-bottom: 20px; font-size: 15px; color: #e4e4e7; line-height: 1.6;">
                Thank you for reaching out to <strong class="text-white" style="color: #ffffff;">PG Labs</strong> regarding your <strong class="text-white" style="color: #ffffff;">${projectType}</strong> project${company ? ` at <strong class="text-white" style="color: #ffffff;">${company}</strong>` : ""}.
              </p>

              <p class="text-secondary" style="margin-top: 0; margin-bottom: 24px; font-size: 14px; color: #a1a1aa; line-height: 1.6;">
                Our engineering and design team is reviewing your project details. We focus on solving business problems with modern web applications, practical AI systems, and robust software architecture.
              </p>

              <!-- Callout Highlight Box -->
              <table class="bg-callout" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 26px; background-color: #18181b; background-image: linear-gradient(#18181b, #18181b); border: 1px solid #27272a; border-left: 4px solid #8b5cf6; border-radius: 6px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div class="text-purple" style="font-size: 11px; font-weight: 700; color: #a78bfa; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">
                      What Happens Next
                    </div>
                    <div class="text-body" style="font-size: 14px; color: #e4e4e7; line-height: 1.5;">
                      A member of our core technical team will evaluate your scope and respond with preliminary technical thoughts and next steps within <strong class="text-white" style="color: #ffffff;">24 business hours</strong>.
                    </div>
                  </td>
                </tr>
              </table>

              <p class="text-secondary" style="margin-top: 0; margin-bottom: 26px; font-size: 14px; color: #a1a1aa; line-height: 1.6;">
                If you have additional context, wireframes, or documents you would like to share in the meantime, simply reply directly to this email.
              </p>

              <!-- Signature -->
              <div style="border-top: 1px solid #27272a; padding-top: 20px; margin-top: 24px;">
                <div class="text-white" style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #ffffff;">PG Labs Engineering Team</div>
                <div class="text-muted" style="margin: 0; font-size: 13px; color: #71717a;">Web Applications &bull; AI Solutions &bull; Custom Software</div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="bg-header" style="padding: 18px 32px; border-top: 1px solid #27272a; background-color: #18181b; background-image: linear-gradient(#18181b, #18181b); text-align: center;">
              <p class="text-muted" style="margin: 0; font-size: 12px; color: #71717a; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} PG Labs. All rights reserved.<br />
                This is an automated confirmation sent to ${escapeHtml(data.email)}.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  }

  /**
   * Sends the admin notification email with client lead details
   */
  public static async sendAdminNotification(data: EmailInquiryData): Promise<void> {
    const config = getMailConfig();
    const mailOptions = {
      from: `"${config.senderName}" <${config.user}>`,
      to: config.adminEmail,
      replyTo: data.email,
      subject: `[New Inquiry] ${data.name} — ${data.projectType}`,
      text: `New Inquiry from ${data.name} (${data.email})\nCompany: ${data.company || "N/A"}\nProject: ${data.projectType}\nBudget: ${data.budget || "N/A"}\n\nMessage:\n${data.message}`,
      html: this.getAdminNotificationHtml(data),
    };

    await mailTransporter.sendMail(mailOptions);
    console.log(`[MailService] ✓ Admin notification sent to ${config.adminEmail}`);
  }

  /**
   * Sends the client confirmation auto-reply email
   */
  public static async sendClientAutoReply(data: EmailInquiryData): Promise<void> {
    const config = getMailConfig();
    const mailOptions = {
      from: `"${config.senderName}" <${config.user}>`,
      to: data.email,
      replyTo: config.adminEmail,
      subject: "Thank you for contacting PG Labs",
      text: `Hello ${data.name},\n\nThank you for reaching out to PG Labs regarding your ${data.projectType} project. We have received your inquiry and our engineering team will get back to you within 24 business hours.\n\nBest regards,\nPG Labs Engineering Team`,
      html: this.getClientAutoReplyHtml(data),
    };

    await mailTransporter.sendMail(mailOptions);
    console.log(`[MailService] ✓ Auto-reply confirmation sent to ${data.email}`);
  }

  /**
   * Fire-and-forget orchestrator for contact inquiry emails.
   * Runs asynchronously and non-blockingly without throwing errors to the caller.
   */
  public static async sendInquiryEmails(data: EmailInquiryData): Promise<void> {
    if (!isMailConfigured()) {
      console.warn(
        `[MailService] ⚠️ SMTP is not configured with EMAIL_PASS. Skipping email dispatch for inquiry from: ${data.email}`
      );
      return;
    }

    try {
      const results = await Promise.allSettled([
        this.sendAdminNotification(data),
        this.sendClientAutoReply(data),
      ]);

      results.forEach((result, index) => {
        const type = index === 0 ? "Admin Notification" : "Client Auto-Reply";
        if (result.status === "fulfilled") {
          console.log(`[MailService] ✓ ${type} dispatched successfully.`);
        } else {
          console.error(`[MailService] ❌ ${type} dispatch failed:`, result.reason);
        }
      });
    } catch (error) {
      console.error("[MailService] ❌ Unexpected error in sendInquiryEmails:", error);
    }
  }
}
