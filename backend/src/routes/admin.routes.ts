import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { requireAdminAuth } from "../middleware/admin.middleware";

const router: Router = Router();

// Admin Authentication
router.post("/admin/login", AdminController.login);

// Protected Admin Inquiries Management
router.get("/admin/inquiries", requireAdminAuth, AdminController.getInquiries);
router.patch(
  "/admin/inquiries/:id/status",
  requireAdminAuth,
  AdminController.updateStatus
);
router.delete(
  "/admin/inquiries/:id",
  requireAdminAuth,
  AdminController.deleteInquiry
);

export default router;
