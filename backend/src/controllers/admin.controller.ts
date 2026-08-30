import { Request, Response, NextFunction } from "express";
import { ContactService } from "../services/contact.service";
import { generateAdminToken } from "../middleware/admin.middleware";

export class AdminController {
  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { passcode } = req.body;
      const expectedPasscode =
        process.env.ADMIN_PASSCODE || "pglabs_admin_2026";

      if (!passcode || typeof passcode !== "string") {
        res.status(400).json({
          success: false,
          error: "Admin passcode is required.",
        });
        return;
      }

      if (passcode !== expectedPasscode) {
        res.status(401).json({
          success: false,
          error: "Invalid admin passcode. Access denied.",
        });
        return;
      }

      const token = generateAdminToken();

      res.status(200).json({
        success: true,
        message: "Authenticated as PG Labs Administrator.",
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getInquiries(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const status = typeof req.query.status === "string" ? req.query.status : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 100;
      const skip = req.query.skip ? parseInt(req.query.skip as string, 10) : 0;

      const result = await ContactService.getInquiriesWithStats(
        status,
        isNaN(limit) ? 100 : limit,
        isNaN(skip) ? 0 : skip
      );

      res.status(200).json({
        success: true,
        data: result.inquiries,
        stats: result.stats,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async updateStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const { status } = req.body;

      const allowedStatuses = [
        "new",
        "contacted",
        "in-progress",
        "completed",
        "archived",
      ];

      if (!status || !allowedStatuses.includes(status)) {
        res.status(400).json({
          success: false,
          error: `Invalid status. Allowed values: ${allowedStatuses.join(", ")}`,
        });
        return;
      }

      const updated = await ContactService.updateStatus(id, status);

      if (!updated) {
        res.status(404).json({
          success: false,
          error: "Inquiry not found.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: `Inquiry status updated to '${status}'.`,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async deleteInquiry(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await ContactService.deleteInquiry(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: "Inquiry not found.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Inquiry deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}
