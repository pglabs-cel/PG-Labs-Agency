import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import { validateContactInquiry } from "../middleware/validation.middleware";
import { contactRateLimiter } from "../middleware/rateLimit.middleware";

const router: Router = Router();

// POST /api/contact
router.post(
  "/contact",
  contactRateLimiter,
  validateContactInquiry,
  ContactController.create
);

export default router;