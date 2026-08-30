import { Request, Response, NextFunction } from "express";
import { ContactService } from "../services/contact.service";
import { EmailService } from "../services/email.service";
import { ensureDBConnected } from "../config/db";

export class ContactController {
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await ensureDBConnected();

      const { name, email, company, projectType, message } = req.body;

      const inquiry = await ContactService.createInquiry({
        name,
        email,
        company,
        projectType,
        message,
      });

      // Await email dispatch with safety timeout so container lifecycle completes sendMail
      try {
        await Promise.race([
          EmailService.sendInquiryEmails({
            name: inquiry.name,
            email: inquiry.email,
            company: inquiry.company,
            projectType: inquiry.projectType,
            message: inquiry.message,
            createdAt: inquiry.createdAt,
          }),
          new Promise((resolve) => setTimeout(resolve, 5000)),
        ]);
      } catch (err) {
        console.error("[ContactController] Background email dispatch error:", err);
      }

      res.status(201).json({
        success: true,
        message: "Inquiry received successfully. We will be in touch within 24 hours.",
        data: {
          id: inquiry._id,
          createdAt: inquiry.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public static async testEmail(
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { mailTransporter, getMailConfig, isMailConfigured } = await import(
        "../config/mail"
      );
      const config = getMailConfig();

      if (!isMailConfigured()) {
        res.status(400).json({
          status: "error",
          message:
            "EMAIL_PASS is missing or shorter than 8 characters in environment variables.",
          diagnostics: {
            user: config.user,
            adminEmail: config.adminEmail,
            host: config.host,
            port: config.port,
            passConfigured: Boolean(config.pass),
            passLength: config.pass?.length || 0,
          },
        });
        return;
      }

      await mailTransporter.verify();

      const info = await mailTransporter.sendMail({
        from: `"${config.senderName}" <${config.user}>`,
        to: config.adminEmail,
        subject: "PG Labs SMTP Diagnostic Test",
        text: `Diagnostic test from PG Labs backend on Render.\nTimestamp: ${new Date().toISOString()}`,
      });

      res.status(200).json({
        status: "ok",
        message: "Test email dispatched successfully!",
        messageId: info.messageId,
        recipient: config.adminEmail,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: "Failed to send test email.",
        details: error.message || error,
      });
    }
  }
}