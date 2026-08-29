import rateLimit from "express-rate-limit";

// Maximum 5 inquiries per 15 minutes per IP address to safeguard against spam
export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many project inquiries submitted from this IP. Please wait 15 minutes before trying again or email us directly.",
  },
});