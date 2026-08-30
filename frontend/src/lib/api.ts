export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
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
  return "http://localhost:5000/api";
}

export async function submitContactInquiry(
  payload: ContactPayload
): Promise<ContactResponse> {
  const baseUrl = getApiBaseUrl();
  const endpoint = baseUrl.endsWith("/contact")
    ? baseUrl
    : baseUrl.endsWith("/api")
    ? `${baseUrl}/contact`
    : `${baseUrl}/api/contact`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
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