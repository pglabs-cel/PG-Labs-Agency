import { mailTransporter, getMailConfig, isMailConfigured } from "../config/mail";

export interface EmailInquiryData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
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
   * Generates the Admin Notification HTML Template (Persistent Dark Theme)
   */
  public static getAdminNotificationHtml(data: EmailInquiryData): string {
    const formattedDate = data.createdAt
      ? new Date(data.createdAt).toUTCString()
      : new Date().toUTCString();

    const clientName = escapeHtml(data.name);
    const clientEmail = escapeHtml(data.email);
    const clientCompany = escapeHtml(data.company || "Not specified");
    const projectType = escapeHtml(data.projectType);
    const message = escapeHtml(data.message).replace(/\n/g, "<br />");
    const mailtoLink = `mailto:${encodeURIComponent(data.email)}?subject=${encodeURIComponent(
      `Re: Your PG Labs Inquiry — ${data.projectType}`
    )}`;

    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
  <title>New Inquiry Notification</title>
  <style type="text/css">
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    body, table, td, p, a, div, span, h1, h2, h3, font {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
    }
    @media (prefers-color-scheme: dark) {
      body, .bg-body {
        background-color: #09090b !important;
      }
      .bg-card {
        background-color: #121215 !important;
      }
      .bg-header, .bg-table, .bg-box {
        background-color: #18181c !important;
      }
      .dark-text-white {
        color: #ffffff !important;
      }
    }
    /* Gmail & Webmail Target */
    u + .body .bg-body { background-color: #09090b !important; }
    u + .body .bg-card { background-color: #121215 !important; }
    u + .body .bg-header { background-color: #18181c !important; }
    u + .body .dark-text-white { color: #ffffff !important; }
  </style>
</head>
<body class="body bg-body" style="margin: 0; padding: 0; background-color: #09090b; background: #09090b; -webkit-font-smoothing: antialiased;">
  <table class="bg-body" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; background: #09090b; padding: 24px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table class="bg-card" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #121215; background: #121215; border: 1px solid #2d2d33; border-radius: 12px; overflow: hidden;">
          
          <!-- Header Bar -->
          <tr>
            <td class="bg-header" style="padding: 24px 28px; border-bottom: 1px solid #2d2d33; background-color: #18181c; background: #18181c;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="48" valign="middle" style="padding-right: 14px;">
                    <img src="https://res.cloudinary.com/y20gw7iu/image/upload/v1788118208/Logo_Only.jpg" alt="PG Labs" width="38" height="38" style="display: block; border-radius: 8px;" />
                  </td>
                  <td valign="middle">
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 3px;">
                      <font color="#c084fc">PG LABS &bull; INQUIRY ALERT</font>
                    </div>
                    <div class="dark-text-white" style="font-size: 19px; font-weight: 700; letter-spacing: -0.02em; color: #ffffff;">
                      <font color="#ffffff">New Lead Received</font>
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; background-color: #8b5cf6; background: #8b5cf6; padding: 6px 14px; border-radius: 6px; white-space: nowrap;">
                      <font color="#ffffff" style="font-size: 12px; font-weight: 700;">${projectType}</font>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td class="bg-card" style="padding: 28px; background-color: #121215; background: #121215;">
              <p style="margin-top: 0; margin-bottom: 24px; font-size: 14px; line-height: 1.5;">
                <font color="#cbd5e1">A new project inquiry has been submitted through the PG Labs website contact portal.</font>
              </p>

              <!-- Inquiry Details Table -->
              <table class="bg-table" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-bottom: 24px; background-color: #18181c; background: #18181c; border: 1px solid #2d2d33; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #2d2d33; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; width: 130px; font-weight: 700;">
                    <font color="#94a3b8">Client Name</font>
                  </td>
                  <td class="dark-text-white" style="padding: 14px 16px; border-bottom: 1px solid #2d2d33; font-size: 14px; font-weight: 700; color: #ffffff;">
                    <font color="#ffffff">${clientName}</font>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #2d2d33; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">
                    <font color="#94a3b8">Client Email</font>
                  </td>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #2d2d33; font-size: 14px;">
                    <a href="mailto:${clientEmail}" style="text-decoration: none; font-weight: 700; color: #c084fc;">
                      <font color="#c084fc">${clientEmail}</font>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #2d2d33; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">
                    <font color="#94a3b8">Company</font>
                  </td>
                  <td class="dark-text-white" style="padding: 14px 16px; border-bottom: 1px solid #2d2d33; font-size: 14px; color: #ffffff;">
                    <font color="#ffffff">${clientCompany}</font>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #2d2d33; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">
                    <font color="#94a3b8">Project Type</font>
                  </td>
                  <td class="dark-text-white" style="padding: 14px 16px; border-bottom: 1px solid #2d2d33; font-size: 14px; font-weight: 700; color: #ffffff;">
                    <font color="#ffffff">${projectType}</font>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">
                    <font color="#94a3b8">Timestamp</font>
                  </td>
                  <td style="padding: 14px 16px; font-size: 12px; font-family: monospace;">
                    <font color="#cbd5e1">${formattedDate}</font>
                  </td>
                </tr>
              </table>

              <!-- Project Message Box -->
              <div style="margin-bottom: 28px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; margin-bottom: 8px;">
                  <font color="#94a3b8">Project Scope & Requirements:</font>
                </div>
                <div class="bg-box dark-text-white" style="background-color: #1a1a1f; background: #1a1a1f; border: 1px solid #33333d; border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.6; color: #f1f5f9;">
                  <font color="#f1f5f9">${message}</font>
                </div>
              </div>

              <!-- Quick Action Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center" style="background-color: #8b5cf6; background: #8b5cf6; border-radius: 8px;">
                          <a href="${mailtoLink}" style="display: inline-block; padding: 14px 36px; text-decoration: none;">
                            <font color="#ffffff" style="font-size: 15px; font-weight: 700; letter-spacing: 0.02em;">Reply to ${clientName} &rarr;</font>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="bg-header" style="padding: 18px 28px; border-top: 1px solid #2d2d33; background-color: #18181c; background: #18181c; text-align: center;">
              <font color="#94a3b8" style="font-size: 12px;">
                PG Labs Automated Notification System &bull; Technology & Digital Product Studio
              </font>
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
   * Generates the Client Acknowledgment Auto-Reply HTML Template (Persistent Dark Theme)
   */
  public static getClientAutoReplyHtml(data: EmailInquiryData): string {
    const clientName = escapeHtml(data.name);
    const clientEmail = escapeHtml(data.email);
    const projectType = escapeHtml(data.projectType);
    const company = escapeHtml(data.company || "");

    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
  <title>Thank you for contacting PG Labs</title>
  <style type="text/css">
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    body, table, td, p, a, div, span, h1, h2, h3, font {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
    }
    @media (prefers-color-scheme: dark) {
      body, .bg-body {
        background-color: #09090b !important;
      }
      .bg-card {
        background-color: #121215 !important;
      }
      .bg-header, .bg-callout {
        background-color: #18181c !important;
      }
      .dark-text-white {
        color: #ffffff !important;
      }
    }
    /* Gmail & Webmail Target */
    u + .body .bg-body { background-color: #09090b !important; }
    u + .body .bg-card { background-color: #121215 !important; }
    u + .body .bg-header { background-color: #18181c !important; }
    u + .body .dark-text-white { color: #ffffff !important; }
  </style>
</head>
<body class="body bg-body" style="margin: 0; padding: 0; background-color: #09090b; background: #09090b; -webkit-font-smoothing: antialiased;">
  <table class="bg-body" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #09090b; background: #09090b; padding: 24px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table class="bg-card" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #121215; background: #121215; border: 1px solid #2d2d33; border-radius: 12px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td class="bg-header" style="padding: 28px 32px; border-bottom: 1px solid #2d2d33; background-color: #18181c; background: #18181c;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50" valign="middle" style="padding-right: 14px;">
                    <img src="https://res.cloudinary.com/y20gw7iu/image/upload/v1788118208/Logo_Only.jpg" alt="PG Labs" width="40" height="40" style="display: block; border-radius: 8px;" />
                  </td>
                  <td valign="middle">
                    <div class="dark-text-white" style="font-size: 18px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #ffffff;">
                      <font color="#ffffff">PG LABS</font>
                    </div>
                    <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px;">
                      <font color="#c084fc">Digital Product Studio</font>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="bg-card" style="padding: 32px; background-color: #121215; background: #121215;">
              <div class="dark-text-white" style="margin-top: 0; margin-bottom: 20px; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.3; color: #ffffff;">
                <font color="#ffffff">We've received your inquiry, ${clientName}.</font>
              </div>

              <p style="margin-top: 0; margin-bottom: 20px; font-size: 15px; line-height: 1.6;">
                <font color="#e2e8f0">
                  Thank you for reaching out to <strong><font color="#ffffff">PG Labs</font></strong> regarding your <strong><font color="#ffffff">${projectType}</font></strong> project${company ? ` at <strong><font color="#ffffff">${company}</font></strong>` : ""}.
                </font>
              </p>

              <p style="margin-top: 0; margin-bottom: 24px; font-size: 14px; line-height: 1.6;">
                <font color="#cbd5e1">
                  Our engineering and design team is reviewing your project details. We focus on solving business problems with modern web applications, practical AI systems, and robust software architecture.
                </font>
              </p>

              <!-- Callout Highlight Box -->
              <table class="bg-callout" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 26px; background-color: #18181c; background: #18181c; border: 1px solid #2d2d33; border-left: 4px solid #8b5cf6; border-radius: 6px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">
                      <font color="#c084fc">What Happens Next</font>
                    </div>
                    <div style="font-size: 14px; line-height: 1.5;">
                      <font color="#f1f5f9">
                        A member of our core technical team will evaluate your scope and respond with preliminary technical thoughts and next steps within <strong><font color="#ffffff">24 business hours</font></strong>.
                      </font>
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin-top: 0; margin-bottom: 26px; font-size: 14px; line-height: 1.6;">
                <font color="#cbd5e1">
                  If you have additional context, wireframes, or documents you would like to share in the meantime, simply reply directly to this email.
                </font>
              </p>

              <!-- Signature -->
              <div style="border-top: 1px solid #2d2d33; padding-top: 20px; margin-top: 24px;">
                <div class="dark-text-white" style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #ffffff;">
                  <font color="#ffffff">PG Labs Engineering Team</font>
                </div>
                <div style="margin: 0; font-size: 13px;">
                  <font color="#94a3b8">Web Applications &bull; AI Solutions &bull; Custom Software</font>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="bg-header" style="padding: 18px 32px; border-top: 1px solid #2d2d33; background-color: #18181c; background: #18181c; text-align: center;">
              <font color="#94a3b8" style="font-size: 12px; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} PG Labs. All rights reserved.<br />
                This is an automated confirmation sent to ${clientEmail}.
              </font>
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
  public static async sendAdminNotification(data: EmailInquiryData): Promise<any> {
    const config = getMailConfig();
    const mailOptions = {
      from: `"${config.senderName}" <${config.user}>`,
      to: config.adminEmail,
      replyTo: data.email,
      subject: `[New Inquiry] ${data.name} — ${data.projectType}`,
      text: `New Inquiry from ${data.name} (${data.email})\nCompany: ${data.company || "N/A"}\nProject: ${data.projectType}\n\nMessage:\n${data.message}`,
      html: this.getAdminNotificationHtml(data),
    };

    const info = await mailTransporter.sendMail(mailOptions);
    console.log(`[MailService] ✓ Admin notification sent to ${config.adminEmail} (MsgID: ${info.messageId})`);
    return info;
  }

  /**
   * Sends the client confirmation auto-reply email
   */
  public static async sendClientAutoReply(data: EmailInquiryData): Promise<any> {
    const config = getMailConfig();
    const mailOptions = {
      from: `"${config.senderName}" <${config.user}>`,
      to: data.email,
      replyTo: config.adminEmail,
      subject: "Thank you for contacting PG Labs",
      text: `Hello ${data.name},\n\nThank you for reaching out to PG Labs regarding your ${data.projectType} project. We have received your inquiry and our engineering team will get back to you within 24 business hours.\n\nBest regards,\nPG Labs Engineering Team`,
      html: this.getClientAutoReplyHtml(data),
    };

    const info = await mailTransporter.sendMail(mailOptions);
    console.log(`[MailService] ✓ Auto-reply confirmation sent to ${data.email} (MsgID: ${info.messageId})`);
    return info;
  }

  /**
   * Fire-and-forget orchestrator for contact inquiry emails.
   * Runs asynchronously and non-blockingly without throwing errors to the caller.
   */
  public static async sendInquiryEmails(data: EmailInquiryData): Promise<void> {
    const config = getMailConfig();
    console.log(`[MailService] Processing email dispatch for inquiry from: ${data.email}, admin: ${config.adminEmail}, user: ${config.user}`);

    if (!isMailConfigured()) {
      console.warn(
        `[MailService] ⚠️ SMTP credentials not configured (EMAIL_PASS is empty or invalid). Skipping email dispatch.`
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
          console.log(`[MailService] ✓ ${type} delivered successfully.`);
        } else {
          console.error(`[MailService] ❌ ${type} failed:`, result.reason?.message || result.reason);
        }
      });
    } catch (error: any) {
      console.error("[MailService] ❌ Unexpected error in sendInquiryEmails:", error.message || error);
    }
  }
}
