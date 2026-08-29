import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log technical diagnostic details server-side only
  console.error("❌ Internal Server Error:", {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  // Handle Mongoose duplicate key error specifically without raw dump
  if (err.code === 11000) {
    res.status(409).json({
      error: "An inquiry with this detail already exists.",
    });
    return;
  }

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val: any) => val.message);
    res.status(400).json({
      error: messages[0] || "Invalid submission data.",
    });
    return;
  }

  // Default clean error response
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong processing your request. Please try again later.",
  });
};