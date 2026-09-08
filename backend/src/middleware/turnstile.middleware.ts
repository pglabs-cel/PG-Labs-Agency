import { Request, Response, NextFunction } from "express";

/**
 * Cloudflare Turnstile Server-Side Verification Middleware
 * Follows the canonical siteverify specification from developers.cloudflare.com/turnstile/spin
 */
export async function verifyTurnstile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const secret = process.env.TURNSTILE_SECRET || process.env.CLOUDFAIR_SECRET_KEY;

  // If Turnstile secret is not configured in this environment, allow request to proceed (e.g. testing)
  if (!secret) {
    return next();
  }

  // If request has already been verified by trusted upstream Next.js server route
  const internalForwardToken = req.headers["x-verified-turnstile"];
  if (internalForwardToken && internalForwardToken === secret) {
    return next();
  }

  const token =
    req.body?.["cf-turnstile-response"] ||
    req.body?.turnstileToken ||
    req.body?.token;

  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    res.status(403).json({
      success: false,
      error: "Bot verification required. Please complete the security check.",
    });
    return;
  }

  const expectedAction = "contact";
  const expectedHostnames = new Set(
    (
      process.env.TURNSTILE_HOSTNAMES ??
      "localhost,127.0.0.1,pglabs.co.in,www.pglabs.co.in,pglabs.agency,www.pglabs.agency,pg-labs-agency.vercel.app"
    )
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
  );

  const clientIp =
    (req.headers["cf-connecting-ip"] as string) ||
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.ip;

  try {
    const params = new URLSearchParams({
      secret,
      response: token,
      ...(clientIp ? { remoteip: clientIp } : {}),
    });

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(10000),
        body: params,
      }
    );

    const result = (await response.json().catch(() => ({}))) as {
      success: boolean;
      action?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (!response.ok || !result.success) {
      console.warn("[Turnstile] Express siteverify rejected or failed:", {
        status: response.status,
        result,
      });

      if (result["error-codes"]?.includes("invalid-input-secret")) {
        console.error(
          "[Turnstile] CONFIG ERROR: TURNSTILE_SECRET is invalid or rejected by Cloudflare. Check your Render environment variable!"
        );
      }

      res.status(403).json({
        success: false,
        error: "Security verification failed. Please refresh and try again.",
      });
      return;
    }

    if (
      (result.action && result.action !== expectedAction) ||
      (expectedHostnames.size > 0 &&
        result.hostname &&
        !expectedHostnames.has(result.hostname))
    ) {
      console.warn("[Turnstile] Express siteverify rejected:", result);
      res.status(403).json({
        success: false,
        error: "Security verification failed. Please refresh and try again.",
      });
      return;
    }

    next();
  } catch (error: any) {
    console.error("[Turnstile] Express verification error:", error?.message || error);
    res.status(403).json({
      success: false,
      error: "Bot verification service temporarily unavailable. Please try again.",
    });
  }
}
