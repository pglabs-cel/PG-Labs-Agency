import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import { validateContactInquiry } from "../middleware/validation.middleware";
import { contactRateLimiter } from "../middleware/rateLimit.middleware";
import { verifyTurnstile } from "../middleware/turnstile.middleware";

const router: Router = Router();

// POST /api/contact (Bot verification -> Rate limiting -> Schema validation -> Handler)
router.post(
  "/contact",
  contactRateLimiter,
  verifyTurnstile,
  validateContactInquiry,
  ContactController.create
);

// GET /api/test-email (Diagnostic helper)
router.get("/test-email", ContactController.testEmail);

export default router;