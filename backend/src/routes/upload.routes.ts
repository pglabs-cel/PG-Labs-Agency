import { Router } from "express";
import { UploadController } from "../controllers/upload.controller";
import { uploadMiddleware } from "../config/cloudinary";
import { requireAdminAuth } from "../middleware/admin.middleware";

const router: Router = Router();

// POST /api/admin/upload
router.post(
  "/admin/upload",
  requireAdminAuth,
  uploadMiddleware.single("file"),
  UploadController.uploadFile
);

// POST /api/admin/media/delete
router.post(
  "/admin/media/delete",
  requireAdminAuth,
  UploadController.deleteMedia
);

export default router;
