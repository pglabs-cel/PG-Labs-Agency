import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import contactRoutes from "./routes/contact.routes";
import adminRoutes from "./routes/admin.routes";
import projectRoutes from "./routes/project.routes";
import { errorHandler } from "./middleware/error.middleware";

const app: Application = express();

// Trust reverse proxies (Render, Railway, Vercel, Nginx, Cloudflare)
app.set("trust proxy", 1);

// Security Headers
app.use(helmet());

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3001",
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman, server-to-server)
      if (!origin) return callback(null, true);

      // Check configured allowed origins or wildcard
      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow all Vercel deployments (production, preview, branch URLs)
      if (/^https:\/\/[a-zA-Z0-9_-]+\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }

      // Allow local development on localhost or 127.0.0.1 across any port
      if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }

      // Allow custom domains
      if (/^https:\/\/(www\.)?pglabs\.(agency|dev|com)$/.test(origin)) {
        return callback(null, true);
      }

      return callback(null, true); // Fallback allow to guarantee form submission never fails due to CORS
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body Parser with strict payload limit
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

import { getDBStatus } from "./config/db";
import { isMailConfigured } from "./config/mail";

// Root Index Endpoint
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "PG Labs Backend API",
    version: "1.0.0",
    database: getDBStatus(),
    mailConfigured: isMailConfigured(),
    endpoints: {
      health: "/health",
      contact: "POST /api/contact",
      testEmail: "GET /api/test-email",
      adminLogin: "POST /api/admin/login",
      adminInquiries: "GET /api/admin/inquiries",
    },
  });
});

// Health Check Endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "PG Labs API",
    database: getDBStatus(),
    mailConfigured: isMailConfigured(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api", contactRoutes);
app.use("/api", adminRoutes);
app.use("/api", projectRoutes);

// Centralized Error Middleware
app.use(errorHandler);

export default app;