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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function submitContactInquiry(
  payload: ContactPayload
): Promise<ContactResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(
        data.error || "Failed to submit project inquiry. Please try again."
      );
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
      throw err;
    }
    throw new Error(
      "Unable to connect to the server. Please check your network or reach us via email."
    );
  }
}