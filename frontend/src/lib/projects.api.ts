export interface ProjectItem {
  slug: string;
  title: string;
  category: string;
  categories?: string[];
  shortDescription: string;
  description: string;
  technologies: string[];
  features: string[];
  challenge: string;
  solution: string;
  outcome?: string;
  year: string;
  featured: boolean;
  order?: number;
  thumbnail?: string;
  images?: string[];
  videoUrl?: string;
  liveUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectDTO extends ProjectItem {
  _id?: string;
}

function getProjectsApiUrl(path: string): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (envUrl && envUrl.startsWith("http")) {
    return `${envUrl.replace(/\/+$/, "")}${cleanPath}`;
  }
  if (typeof window !== "undefined") {
    return `/api${cleanPath}`;
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${siteUrl.replace(/\/+$/, "")}/api${cleanPath}`;
}

export async function fetchPublicProjects(featuredOnly = false): Promise<ProjectItem[]> {
  try {
    const base = getProjectsApiUrl("/projects");
    const targetUrl = featuredOnly ? `${base}?featured=true` : base;

    const res = await fetch(targetUrl, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json().catch(() => ({}));
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  } catch (err) {
    console.error("[fetchPublicProjects] Error:", err);
    return [];
  }
}

export async function fetchPublicProjectBySlug(
  slug: string
): Promise<ProjectItem | null> {
  try {
    const res = await fetch(getProjectsApiUrl(`/projects/${slug}`), {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json().catch(() => ({}));
    if (data.success && data.data) {
      return data.data;
    }

    return null;
  } catch (err) {
    console.error(`[fetchPublicProjectBySlug] Error fetching slug ${slug}:`, err);
    return null;
  }
}

// Admin API calls
export async function adminFetchProjects(
  token: string
): Promise<{ success: boolean; data: ProjectDTO[]; error?: string }> {
  try {
    const res = await fetch(getProjectsApiUrl("/admin/projects"), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        success: false,
        data: [],
        error: data.error || "Failed to fetch projects.",
      };
    }

    return {
      success: true,
      data: data.data || [],
    };
  } catch (err: unknown) {
    return {
      success: false,
      data: [],
      error: err instanceof Error ? err.message : "Network error fetching projects.",
    };
  }
}

export async function adminCreateProject(
  token: string,
  payload: Omit<ProjectDTO, "_id" | "createdAt" | "updatedAt">
): Promise<{ success: boolean; data?: ProjectDTO; error?: string }> {
  try {
    const res = await fetch(getProjectsApiUrl("/admin/projects"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Failed to create project.",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error creating project.",
    };
  }
}

export async function adminUpdateProject(
  token: string,
  id: string,
  payload: Partial<ProjectDTO>
): Promise<{ success: boolean; data?: ProjectDTO; error?: string }> {
  try {
    const res = await fetch(getProjectsApiUrl(`/admin/projects/${id}`), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Failed to update project.",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error updating project.",
    };
  }
}

export async function adminDeleteProject(
  token: string,
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(getProjectsApiUrl(`/admin/projects/${id}`), {
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
        error: data.error || "Failed to delete project.",
      };
    }

    return {
      success: true,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error deleting project.",
    };
  }
}

export async function adminUploadMedia(
  token: string,
  file: File
): Promise<{
  success: boolean;
  url?: string;
  resource_type?: string;
  error?: string;
}> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(getProjectsApiUrl("/admin/upload"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        success: false,
        error: data.error || "File upload failed.",
      };
    }

    return {
      success: true,
      url: data.data?.url,
      resource_type: data.data?.resource_type,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error during upload.",
    };
  }
}

export async function adminDeleteMedia(
  token: string,
  url: string,
  projectId?: string,
  field?: "thumbnail" | "videoUrl" | "galleryImage",
  resourceType?: "image" | "video"
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(getProjectsApiUrl("/admin/media/delete"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, projectId, field, resourceType }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        success: false,
        error: data.error || "Failed to delete media.",
      };
    }

    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error deleting media.",
    };
  }
}
