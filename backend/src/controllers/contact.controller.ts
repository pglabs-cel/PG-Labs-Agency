import { Request, Response, NextFunction } from "express";
import { ContactService } from "../services/contact.service";

export class ContactController {
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, company, projectType, budget, message } = req.body;

      const inquiry = await ContactService.createInquiry({
        name,
        email,
        company,
        projectType,
        budget,
        message,
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