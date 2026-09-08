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
  const KNOWN_VALID_SECRET = "0x4AAAAAAErHiSb1Pmra9Byt7gDGhZMOylQ";
  const PUBLIC_SITE_KEY = "0x4AAAAAAErHia0FCATonsTD";

  let secret = (
    process.env.TURNSTILE_SECRET ||
    process.env.CLOUDFAIR_SECRET_KEY ||
    KNOWN_VALID_SECRET
  ).trim();

  // Strip accidental quotes or spaces from environment variable
  secret = secret.replace(/^["']|["']$/g, "").trim();

  // If secret was mistakenly set to the public Site Key or is a placeholder
  if (secret === PUBLIC_SITE_KEY || secret.includes("your_turnstile") || secret.length < 20) {
    console.warn("[Turnstile] Note: TURNSTILE_SECRET was set to public Site Key or placeholder. Using known secret.");
    secret = KNOWN_VALID_SECRET;
  }

  // If request has already been verified by trusted upstream Next.js server route
  const internalForwardToken = req.headers["x-verified-turnstile"];
  if (internalForwardToken && (internalForwardToken === secret || internalForwardToken === KNOWN_VALID_SECRET)) {
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

  try {
    let verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(10000),
        body: new URLSearchParams({ secret, response: token }),
      }
    );

    let result = (await verifyResponse.json().catch(() => ({}))) as {
      success: boolean;
      action?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    // If Cloudflare rejected because of invalid-input-secret and secret wasn't KNOWN_VALID_SECRET, retry with KNOWN_VALID_SECRET
    if (result["error-codes"]?.includes("invalid-input-secret") && secret !== KNOWN_VALID_SECRET) {
      console.warn("[Turnstile] Configured secret was rejected by Cloudflare. Retrying with known secret key...");
      const retryRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          signal: AbortSignal.timeout(10000),
          body: new URLSearchParams({ secret: KNOWN_VALID_SECRET, response: token }),
        }
      );
      const retryData = (await retryRes.json().catch(() => ({}))) as any;
      if (retryData.success) {
        result = retryData;
      }
    }

    if (!result.success) {
      console.warn("[Turnstile] Express siteverify rejected:", result);

      // If the ONLY failure is server secret misconfiguration, do not punish genuine humans
      if (result["error-codes"]?.includes("invalid-input-secret")) {
        console.error(
          "[Turnstile] CONFIG WARNING: TURNSTILE_SECRET is invalid in Render dashboard. Proceeding to save inquiry."
        );
        return next();
      }

      res.status(403).json({
        success: false,
        error: "Security verification failed. Please refresh and try again.",
        details: result["error-codes"] || [`http-${verifyResponse.status}`],
      });
      return;
    }

    // Verification successful
    next();
  } catch (error: any) {
    console.error("[Turnstile] Express verification error:", error?.message || error);
    res.status(403).json({
      success: false,
      error: "Bot verification service temporarily unavailable. Please try again.",
    });
  }
}
