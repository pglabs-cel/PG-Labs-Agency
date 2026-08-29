import rateLimit from "express-rate-limit";

// 15 minutes window, generous threshold in development to prevent lockouts during testing
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 15 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many project inquiries submitted from this IP. Please wait 15 minutes before trying again or email us directly.",
  },
});