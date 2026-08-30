import { PROJECTS, ProjectItem } from "@/data/projects";

export interface ProjectDTO {
  _id?: string;
  slug: string;
  title: string;
  category: string;
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
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchPublicProjects(featuredOnly = false): Promise<ProjectItem[]> {
  try {
    const url = new URL(`${API_BASE_URL}/projects`);
    if (featuredOnly) url.searchParams.append("featured", "true");

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      return featuredOnly ? PROJECTS.filter((p) => p.featured) : PROJECTS;
    }

    const data = await res.json().catch(() => ({}));
    if (data.success && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }

    return featuredOnly ? PROJECTS.filter((p) => p.featured) : PROJECTS;
  } catch {
    // Fallback gracefully to static data if backend is offline
    return featuredOnly ? PROJECTS.filter((p) => p.featured) : PROJECTS;
  }
}

export async function fetchPublicProjectBySlug(
  slug: string
): Promise<ProjectItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return PROJECTS.find((p) => p.slug === slug) || null;
    }

    const data = await res.json().catch(() => ({}));
    if (data.success && data.data) {
      return data.data;
    }

    return PROJECTS.find((p) => p.slug === slug) || null;
  } catch {
    return PROJECTS.find((p) => p.slug === slug) || null;
  }
}

// Admin API calls
export async function adminFetchProjects(
  token: string
): Promise<{ success: boolean; data: ProjectDTO[]; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`, {
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
    const res = await fetch(`${API_BASE_URL}/admin/projects`, {
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
    const res = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
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
    const res = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
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
