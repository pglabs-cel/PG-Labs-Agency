export interface InquiryItem {
  _id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "in-progress" | "completed" | "archived";
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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function adminLogin(passcode: string): Promise<{
  success: boolean;
  token?: string;
  error?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/login`, {
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
    const url = new URL(`${API_BASE_URL}/admin/inquiries`);
    if (statusFilter && statusFilter !== "all") {
      url.searchParams.append("status", statusFilter);
    }

    const res = await fetch(url.toString(), {
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
    const res = await fetch(`${API_BASE_URL}/admin/inquiries/${id}/status`, {
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
    const res = await fetch(`${API_BASE_URL}/admin/inquiries/${id}`, {
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
