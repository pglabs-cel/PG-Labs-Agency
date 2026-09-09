export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  message: string;
  turnstileToken?: string;
  "cf-turnstile-response"?: string;
  attachments?: File[];
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    createdAt: string;
  };
  error?: string;
}

export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  // If explicitly configured with an absolute URL or relative path
  if (envUrl) {
    // If running in a browser on HTTPS and envUrl points to insecure http://localhost, use same-origin /api
    if (
      typeof window !== "undefined" &&
      window.location.protocol === "https:" &&
      envUrl.startsWith("http://localhost")
    ) {
      return "/api";
    }
    return envUrl.replace(/\/+$/, "");
  }

  // In browser, default to same-origin /api Next.js route handler
  if (typeof window !== "undefined") {
    return "/api";
  }

  // Server-side default
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${siteUrl.replace(/\/+$/, "")}/api`;
}

export async function submitContactInquiry(
  payload: ContactPayload | FormData
): Promise<ContactResponse> {
  const baseUrl = getApiBaseUrl();
  const endpoint = baseUrl.endsWith("/contact")
    ? baseUrl
    : baseUrl.endsWith("/api")
    ? `${baseUrl}/contact`
    : `${baseUrl}/api/contact`;

  try {
    let body: BodyInit;
    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (payload instanceof FormData) {
      body = payload;
    } else if (payload.attachments && payload.attachments.length > 0) {
      const fd = new FormData();
      fd.append("name", payload.name);
      fd.append("email", payload.email);
      fd.append("company", payload.company || "");
      fd.append("projectType", payload.projectType);
      fd.append("message", payload.message);
      if (payload.turnstileToken) fd.append("turnstileToken", payload.turnstileToken);
      if (payload["cf-turnstile-response"]) fd.append("cf-turnstile-response", payload["cf-turnstile-response"]);
      for (const file of payload.attachments) {
        fd.append("attachments", file);
      }
      body = fd;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(payload);
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMessage =
        data.error ||
        (Array.isArray(data.details) && data.details[0]?.msg) ||
        data.message ||
        `Submission failed (status ${res.status}). Please try again or email us.`;
      throw new Error(errorMessage);
    }

    return {
      success: true,
      message:
        data.message ||
        "Inquiry received successfully. We will be in touch within 24 hours.",
      data: data.data,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      // Re-throw if it's already an informative Error
      throw err;
    }
    throw new Error(
      "Unable to connect to the server. Please check your network connection or reach us directly at pglabs.agency@gmail.com."
    );
  }
}