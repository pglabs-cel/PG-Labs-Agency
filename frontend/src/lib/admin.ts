export interface InquiryItem {
  _id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "in-progress" | "completed" | "archived";
  attachments?: Array<{
    filename: string;
    url: string;
    size?: number;
    mimeType?: string;
  }>;
  createdAt: string;
  updatedAt?: string;
}

export interface InquiryStats {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  archived: number;
}

function getAdminApiUrl(endpoint: string): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  if (envUrl && envUrl.startsWith("http")) {
    return `${envUrl.replace(/\/+$/, "")}${cleanEndpoint}`;
  }
  return `/api${cleanEndpoint}`;
}

export async function adminLogin(passcode: string): Promise<{
  success: boolean;
  token?: string;
  error?: string;
}> {
  try {
    const res = await fetch(getAdminApiUrl("/admin/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Authentication failed. Please check passcode.",
      };
    }

    return {
      success: true,
      token: data.token,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Network error. Unable to connect to backend.",
    };
  }
}

export async function fetchAdminInquiries(
  token: string,
  statusFilter?: string
): Promise<{
  success: boolean;
  data: InquiryItem[];
  stats: InquiryStats;
  error?: string;
}> {
  try {
    const base = getAdminApiUrl("/admin/inquiries");
    const targetUrl =
      statusFilter && statusFilter !== "all"
        ? `${base}?status=${encodeURIComponent(statusFilter)}`
        : base;

    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        data: [],
        stats: { total: 0, new: 0, contacted: 0, inProgress: 0, archived: 0 },
        error: data.error || "Failed to fetch inquiries.",
      };
    }

    return {
      success: true,
      data: data.data || [],
      stats: data.stats || {
        total: 0,
        new: 0,
        contacted: 0,
        inProgress: 0,
        archived: 0,
      },
    };
  } catch (err: unknown) {
    return {
      success: false,
      data: [],
      stats: { total: 0, new: 0, contacted: 0, inProgress: 0, archived: 0 },
      error:
        err instanceof Error
          ? err.message
          : "Network error fetching inquiries.",
    };
  }
}

export async function updateInquiryStatus(
  token: string,
  id: string,
  status: InquiryItem["status"]
): Promise<{ success: boolean; data?: InquiryItem; error?: string }> {
  try {
    const res = await fetch(getAdminApiUrl(`/admin/inquiries/${id}/status`), {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Failed to update inquiry status.",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Network error updating inquiry status.",
    };
  }
}

export async function deleteInquiry(
  token: string,
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(getAdminApiUrl(`/admin/inquiries/${id}`), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Failed to delete inquiry.",
      };
    }

    return {
      success: true,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error:
        err instanceof Error ? err.message : "Network error deleting inquiry.",
    };
  }
}

export async function sendInquiryReply(
  token: string,
  id: string,
  payload:
    | { subject: string; message: string; attachments?: File[] }
    | FormData
): Promise<{ success: boolean; message?: string; updatedStatus?: string; error?: string }> {
  try {
    let body: BodyInit;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (payload instanceof FormData) {
      body = payload;
      // Do not set Content-Type header so browser sets multipart boundary automatically
    } else if (payload.attachments && payload.attachments.length > 0) {
      const fd = new FormData();
      fd.append("subject", payload.subject);
      fd.append("message", payload.message);
      for (const file of payload.attachments) {
        fd.append("attachments", file);
      }
      body = fd;
    } else {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify({
        subject: payload.subject,
        message: payload.message,
      });
    }

    const res = await fetch(getAdminApiUrl(`/admin/inquiries/${id}/reply`), {
      method: "POST",
      headers,
      body,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Failed to send reply email.",
      };
    }

    return {
      success: true,
      message: data.message,
      updatedStatus: data.updatedStatus,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error:
        err instanceof Error ? err.message : "Network error sending reply email.",
    };
  }
}

export async function sendAdminOutreachEmail(
  token: string,
  payload: {
    recipientEmail: string;
    recipientName?: string;
    subject: string;
    message: string;
    attachments?: File[];
  }
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const fd = new FormData();
    fd.append("recipientEmail", payload.recipientEmail);
    if (payload.recipientName) {
      fd.append("recipientName", payload.recipientName);
    }
    fd.append("subject", payload.subject);
    fd.append("message", payload.message);

    if (payload.attachments && payload.attachments.length > 0) {
      for (const file of payload.attachments) {
        fd.append("attachments", file);
      }
    }

    const res = await fetch(getAdminApiUrl("/admin/emails/send"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Failed to send email.",
      };
    }

    return {
      success: true,
      message: data.message || "Email successfully sent.",
    };
  } catch (err: unknown) {
    return {
      success: false,
      error:
        err instanceof Error ? err.message : "Network error sending email.",
    };
  }
}
