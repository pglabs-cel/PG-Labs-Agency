import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

const getSecret = (): string => {
  return process.env.ADMIN_JWT_SECRET || "pglabs_admin_jwt_secret_token_secure_key_2026";
};

export function generateAdminToken(): string {
  const payload = {
    role: "admin",
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days session
    salt: crypto.randomBytes(8).toString("hex"),
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${signature}`;
}

export function verifyAdminToken(token: string): boolean {
  try {
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return false;

    const expectedSig = crypto
      .createHmac("sha256", getSecret())
      .update(payloadB64)
      .digest("base64url");

    if (signature !== expectedSig) return false;

    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString());
    if (!payload.exp || payload.exp < Date.now()) return false;

    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function requireAdminAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      error: "Unauthorized. Admin authentication token required.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!verifyAdminToken(token)) {
    res.status(401).json({
      success: false,
      error: "Invalid or expired admin session token. Please log in again.",
    });
    return;
  }

  next();
}
