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

      const { name, email, company, projectType, budget, message } = req.body;

      const inquiry = await ContactService.createInquiry({
        name,
        email,
        company,
        projectType,
        budget,
        message,
      });

      // Asynchronously trigger email notifications non-blockingly
      EmailService.sendInquiryEmails({
        name: inquiry.name,
        email: inquiry.email,
        company: inquiry.company,
        projectType: inquiry.projectType,
        budget: inquiry.budget,
        message: inquiry.message,
        createdAt: inquiry.createdAt,
      }).catch((err) => {
        console.error("[ContactController] Background email dispatch error:", err);
      });

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
}