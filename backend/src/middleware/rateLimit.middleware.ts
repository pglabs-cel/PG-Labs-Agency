import rateLimit from "express-rate-limit";

// 15 minutes window, generous threshold in development to prevent lockouts during testing
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 15 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false },
  message: {
    error: "Too many project inquiries submitted from this IP. Please wait 15 minutes before trying again or email us directly.",
  },
});

// Upload Rate Limiter: 20 uploads per minute per IP (Requirement 2)
export const uploadRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 20, // Max 20 uploads per minute
  standardHeaders: true,
  legacyHeaders: false,
  validate: { trustProxy: false },
  message: {
    success: false,
    error: "Too many media uploads requested. Please wait 60 seconds before uploading more files.",
  },
});