"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { adminLogin } from "@/lib/admin";
import {
  adminFetchProjects,
  adminCreateProject,
  adminUpdateProject,
  adminDeleteProject,
  adminUploadMedia,
  adminDeleteMedia,
  ProjectDTO,
} from "@/lib/projects.api";
import {
  Lock,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle2,
  FolderKanban,
  Sparkles,
  Layers,
  X,
  Code2,
  Upload,
  Image as ImageIcon,
  Video as VideoIcon,
  Loader2,
  Film,
  Globe,
  Tag,
  ChevronDown,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectFormData {
  title: string;
  slug: string;
  categories: string[];
  category: string;
  year: string;
  featured: boolean;
  shortDescription: string;
  description: string;
  technologies: string;
  features: string;
  challenge: string;
  solution: string;
  outcome: string;
  thumbnail: string;
  images: string[];
  videoUrl: string;
  liveUrl: string;
}

const DEFAULT_FORM: ProjectFormData = {
  title: "",
  slug: "",
  categories: ["Web Application"],
  category: "Web Application",
  year: new Date().getFullYear().toString(),
  featured: true,
  shortDescription: "",
  description: "",
  technologies: "",
  features: "",
  challenge: "",
  solution: "",
  outcome: "",
  thumbnail: "",
  images: [],
  videoUrl: "",
  liveUrl: "",
};

const DEFAULT_CATEGORIES = [
  "Web Application",
  "AI / Business Software",
  "SaaS / EdTech",
  "Custom Software",
  "Automation & APIs",
  "Mobile / Cross-Platform",
];

export default function AdminProjectsPage() {
  const [token, setToken] = useState<string | null>(null);
  const [passcode, setPasscode] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Categories Management State
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [isCustomCategoryMode, setIsCustomCategoryMode] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectDTO | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(DEFAULT_FORM);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Media Upload State
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);
  const [deletingMedia, setDeletingMedia] = useState<string | null>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [toast, setToast] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("pglabs_admin_token");
    if (saved) {
      setToken(saved);
    }
  }, []);

  const loadProjects = useCallback(async (activeToken: string) => {
    setLoading(true);
    const res = await adminFetchProjects(activeToken);
    if (res.success) {
      setProjects(res.data);
    } else {
      if (res.error?.includes("Unauthorized") || res.error?.includes("expired")) {
        handleLogout();
        setToast({
          isOpen: true,
          type: "error",
          title: "Session Expired",
          message: "Please log in again.",
        });
      } else {
        setToast({
          isOpen: true,
          type: "error",
          title: "Fetch Error",
          message: res.error || "Failed to load projects.",
        });
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      loadProjects(token);
    }
  }, [token, loadProjects]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError("Please enter admin passcode.");
      return;
    }
    setAuthLoading(true);
    setAuthError("");

    const res = await adminLogin(passcode);
    if (res.success && res.token) {
      localStorage.setItem("pglabs_admin_token", res.token);
      setToken(res.token);
      setPasscode("");
      setToast({
        isOpen: true,
        type: "success",
        title: "Welcome Back",
        message: "Authenticated to PG Labs Studio Admin.",
      });
    } else {
      setAuthError(res.error || "Invalid passcode.");
    }
    setAuthLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("pglabs_admin_token");
    setToken(null);
    setProjects([]);
  };

  // Load & sync categories with localStorage and existing projects
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pg_admin_categories");
      const parsed = saved ? JSON.parse(saved) : [];
      const projectCats = projects
        .flatMap((p) =>
          p.categories && p.categories.length > 0
            ? p.categories
            : p.category
            ? p.category.split(",").map((c) => c.trim())
            : []
        )
        .filter(Boolean);
      const combined = Array.from(
        new Set([...DEFAULT_CATEGORIES, ...parsed, ...projectCats])
      );
      setCategories(combined);
    } catch {
      // Fallback
    }
  }, [projects]);

  // Close category dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleCategory = (cat: string) => {
    const current = formData.categories || [];
    let updated: string[];
    if (current.includes(cat)) {
      if (current.length === 1) {
        setToast({
          isOpen: true,
          type: "error",
          title: "At Least One Category",
          message: "A project must belong to at least one category.",
        });
        return;
      }
      updated = current.filter((c) => c !== cat);
    } else {
      updated = [...current, cat];
    }
    setFormData((prev) => ({
      ...prev,
      categories: updated,
      category: updated.join(", "),
    }));
  };

  const handleAddCategory = (newCat: string, selectInForm = false) => {
    const trimmed = newCat.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      const updated = [...categories, trimmed];
      setCategories(updated);
      try {
        localStorage.setItem("pg_admin_categories", JSON.stringify(updated));
      } catch {}
      setToast({
        isOpen: true,
        type: "success",
        title: "Category Added",
        message: `"${trimmed}" is now available for projects.`,
      });
    }
    if (selectInForm) {
      setFormData((prev) => {
        const curr = prev.categories || [];
        const nextCats = curr.includes(trimmed) ? curr : [...curr, trimmed];
        return {
          ...prev,
          categories: nextCats,
          category: nextCats.join(", "),
        };
      });
      setIsCustomCategoryMode(false);
      setIsCategoryDropdownOpen(false);
      setNewCategoryInput("");
    }
  };

  const handleDeleteCategory = (catToDelete: string) => {
    const inUseCount = projects.filter((p) => {
      const cats =
        p.categories && p.categories.length > 0
          ? p.categories
          : p.category
          ? p.category.split(",").map((c) => c.trim())
          : [];
      return cats.includes(catToDelete);
    }).length;

    if (inUseCount > 0) {
      const confirmDelete = window.confirm(
        `"${catToDelete}" is currently assigned to ${inUseCount} project(s). Delete this category from options?`
      );
      if (!confirmDelete) return;
    }
    const updated = categories.filter((c) => c !== catToDelete);
    setCategories(updated);
    try {
      localStorage.setItem("pg_admin_categories", JSON.stringify(updated));
    } catch {}

    setFormData((prev) => {
      const curr = prev.categories || [];
      if (curr.includes(catToDelete)) {
        const nextCats = curr.filter((c) => c !== catToDelete);
        const fallback = nextCats.length > 0 ? nextCats : [updated[0] || "Web Application"];
        return {
          ...prev,
          categories: fallback,
          category: fallback.join(", "),
        };
      }
      return prev;
    });

    if (selectedCategoryFilter === catToDelete) {
      setSelectedCategoryFilter("All");
    }
    setToast({
      isOpen: true,
      type: "success",
      title: "Category Deleted",
      message: `"${catToDelete}" has been deleted.`,
    });
  };

  const openCreateModal = () => {
    setEditingProject(null);
    const initialCategory = categories[0] || "Web Application";
    setFormData({
      ...DEFAULT_FORM,
      categories: [initialCategory],
      category: initialCategory,
    });
    setFormError("");
    setIsCustomCategoryMode(false);
    setIsCategoryDropdownOpen(false);
    setNewCategoryInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (proj: ProjectDTO) => {
    setEditingProject(proj);
    setIsCustomCategoryMode(false);
    setIsCategoryDropdownOpen(false);
    setNewCategoryInput("");

    const projectCats =
      Array.isArray(proj.categories) && proj.categories.length > 0
        ? proj.categories
        : proj.category
        ? proj.category.split(",").map((c) => c.trim()).filter(Boolean)
        : ["Web Application"];

    setFormData({
      title: proj.title,
      slug: proj.slug,
      categories: projectCats,
      category: projectCats.join(", "),
      year: proj.year,
      featured: proj.featured,
      shortDescription: proj.shortDescription,
      description: proj.description,
      technologies: (proj.technologies || []).join(", "),
      features: (proj.features || []).join("\n"),
      challenge: proj.challenge,
      solution: proj.solution,
      outcome: proj.outcome || "",
      thumbnail: proj.thumbnail || "",
      images: Array.isArray(proj.images) ? proj.images : [],
      videoUrl: proj.videoUrl || "",
      liveUrl: proj.liveUrl || "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleMediaUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "thumbnail" | "video" | "gallery"
  ) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploadingTarget(target);

    const res = await adminUploadMedia(token, file);
    if (res.success && res.url) {
      if (target === "thumbnail") {
        setFormData((prev) => ({ ...prev, thumbnail: res.url! }));
      } else if (target === "video") {
        setFormData((prev) => ({ ...prev, videoUrl: res.url! }));
      } else if (target === "gallery") {
        setFormData((prev) => ({ ...prev, images: [...prev.images, res.url!] }));
      }

      setToast({
        isOpen: true,
        type: "success",
        title: "Upload Successful",
        message: `${res.resource_type === "video" ? "Video" : "Image"} uploaded to Cloudinary.`,
      });
    } else {
      setToast({
        isOpen: true,
        type: "error",
        title: "Upload Failed",
        message: res.error || "Unable to upload to Cloudinary. Check credentials.",
      });
    }

    setUploadingTarget(null);
    // Reset file input so same file can be re-selected if needed
    e.target.value = "";
  };

  const handleRemoveMedia = async (
    target: "thumbnail" | "video" | "gallery",
    urlToRemove?: string,
    galleryIndex?: number
  ) => {
    const url =
      target === "thumbnail"
        ? formData.thumbnail
        : target === "video"
        ? formData.videoUrl
        : urlToRemove;

    if (!url) return;

    const projectId = editingProject?._id || editingProject?.slug;
    const field =
      target === "thumbnail"
        ? "thumbnail"
        : target === "video"
        ? "videoUrl"
        : "galleryImage";

    const deleteKey =
      target + (galleryIndex !== undefined ? `_${galleryIndex}` : "");
    setDeletingMedia(deleteKey);

    // Instant optimistic UI cleanup
    if (target === "thumbnail") {
      setFormData((prev) => ({ ...prev, thumbnail: "" }));
    } else if (target === "video") {
      setFormData((prev) => ({ ...prev, videoUrl: "" }));
    } else if (target === "gallery" && galleryIndex !== undefined) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== galleryIndex),
      }));
    }

    // Call backend to destroy on Cloudinary and MongoDB
    if (token) {
      const res = await adminDeleteMedia(token, url, projectId, field);
      if (res.success) {
        setToast({
          isOpen: true,
          type: "success",
          title: "Media Removed",
          message: `${
            target === "video" ? "Video" : "Image"
          } deleted from Cloudinary & project.`,
        });
        if (projectId) {
          loadProjects(token);
        }
      } else {
        setToast({
          isOpen: true,
          type: "error",
          title: "Notice",
          message: res.error || "Media removed from form.",
        });
      }
    }

    setDeletingMedia(null);
  };

  const handleAddGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newGalleryUrl.trim()],
    }));
    setNewGalleryUrl("");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (
      !formData.title.trim() ||
      !formData.shortDescription.trim() ||
      !formData.description.trim() ||
      !formData.challenge.trim() ||
      !formData.solution.trim()
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    setFormSaving(true);
    setFormError("");

    const selectedCats =
      formData.categories && formData.categories.length > 0
        ? formData.categories
        : formData.category
        ? formData.category.split(",").map((c) => c.trim()).filter(Boolean)
        : ["Web Application"];

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || undefined,
      category: selectedCats.join(", "),
      categories: selectedCats,
      year: formData.year.trim() || new Date().getFullYear().toString(),
      featured: formData.featured,
      shortDescription: formData.shortDescription.trim(),
      description: formData.description.trim(),
      technologies: formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      features: formData.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      challenge: formData.challenge.trim(),
      solution: formData.solution.trim(),
      outcome: formData.outcome.trim() || undefined,
      thumbnail: formData.thumbnail.trim() || undefined,
      images: formData.images,
      videoUrl: formData.videoUrl.trim() || undefined,
      liveUrl: formData.liveUrl.trim() || undefined,
    };

    const targetId = editingProject?._id || editingProject?.slug;
    if (editingProject && targetId) {
      const res = await adminUpdateProject(token, targetId, payload);
      if (res.success) {
        setToast({
          isOpen: true,
          type: "success",
          title: "Project Updated",
          message: `"${payload.title}" saved successfully.`,
        });
        setIsModalOpen(false);
        loadProjects(token);
      } else {
        setFormError(res.error || "Failed to update project.");
      }
    } else {
      const res = await adminCreateProject(token, payload as unknown as ProjectDTO);
      if (res.success) {
        setToast({
          isOpen: true,
          type: "success",
          title: "Project Created",
          message: `"${payload.title}" added to portfolio.`,
        });
        setIsModalOpen(false);
        loadProjects(token);
      } else {
        setFormError(res.error || "Failed to create project.");
      }
    }
    setFormSaving(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!token) return;
    if (!confirm(`Are you sure you want to delete project "${title}"? This cannot be undone.`)) {
      return;
    }

    const res = await adminDeleteProject(token, id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setToast({
        isOpen: true,
        type: "success",
        title: "Project Deleted",
        message: `"${title}" has been removed.`,
      });
    } else {
      setToast({
        isOpen: true,
        type: "error",
        title: "Delete Failed",
        message: res.error || "Could not delete project.",
      });
    }
  };

  const filteredProjects = projects.filter((p) => {
    const pCats =
      p.categories && p.categories.length > 0
        ? p.categories
        : p.category
        ? p.category.split(",").map((c) => c.trim()).filter(Boolean)
        : [];

    const matchesCategory =
      selectedCategoryFilter === "All" ||
      pCats.includes(selectedCategoryFilter) ||
      p.category.includes(selectedCategoryFilter);

    if (!searchQuery.trim()) return matchesCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      pCats.some((c) => c.toLowerCase().includes(q)) ||
      (p.technologies || []).some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  if (!token) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md p-8 rounded-2xl bg-background-secondary border border-border/80 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-background-surface border border-border flex items-center justify-center mx-auto mb-4 text-accent shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-accent uppercase font-medium">
              RESTRICTED ACCESS
            </span>
            <h1 className="text-2xl font-bold text-foreground mt-1">PG Labs Projects</h1>
            <p className="text-sm text-foreground-secondary mt-1">
              Enter administrator passcode to manage portfolio projects.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="passcode"
                className="block text-xs font-mono uppercase tracking-wider text-foreground-secondary mb-2"
              >
                Admin Passcode
              </label>
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-lg bg-background-surface border border-border text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-accent transition-colors"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {authError}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={authLoading}
            >
              {authLoading ? "Verifying..." : "Access Projects →"}
            </Button>
          </form>
        </div>

        <Toast
          isOpen={toast.isOpen}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      <AdminHeader
        activeTab="projects"
        onRefresh={() => token && loadProjects(token)}
        onLogout={handleLogout}
        loading={loading}
      />

      <Container className="max-w-7xl pt-8 sm:pt-12">
        {/* Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-background-secondary border border-border">
            <div className="flex items-center justify-between text-foreground-muted mb-2">
              <span className="text-xs font-mono uppercase">Total Projects</span>
              <FolderKanban className="w-4 h-4 text-foreground-secondary" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{projects.length}</p>
          </div>

          <div className="p-4 rounded-xl bg-background-secondary border border-border">
            <div className="flex items-center justify-between text-accent mb-2">
              <span className="text-xs font-mono uppercase">Featured on Homepage</span>
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-accent">
              {projects.filter((p) => p.featured).length}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-background-secondary border border-border col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-mono uppercase">Categories</span>
              <Tag className="w-4 h-4 text-zinc-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">
              {categories.length}
            </p>
          </div>
        </div>

        {/* Top Controls: Search + Single Category Dropdown Filter + Add Project Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects by title, category, or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-background-secondary border border-border text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-accent min-h-[38px]"
              />
            </div>

            {/* Single Clean Category Filter Dropdown */}
            <div className="relative min-w-[190px]">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2 text-xs rounded-lg bg-background-secondary border border-border text-foreground focus:outline-none focus:border-accent cursor-pointer min-h-[38px]"
              >
                <option value="All" className="bg-zinc-900">
                  All Categories ({projects.length})
                </option>
                {categories.map((cat) => {
                  const count = projects.filter((p) => {
                    const pCats =
                      p.categories && p.categories.length > 0
                        ? p.categories
                        : p.category
                        ? p.category.split(",").map((c) => c.trim()).filter(Boolean)
                        : [];
                    return pCats.includes(cat);
                  }).length;
                  return (
                    <option key={cat} value={cat} className="bg-zinc-900">
                      {cat} ({count})
                    </option>
                  );
                })}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-foreground-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <Button
            onClick={openCreateModal}
            variant="primary"
            size="sm"
            className="flex items-center gap-1.5 whitespace-nowrap shrink-0 min-h-[38px]"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap font-medium">Add New Project</span>
          </Button>
        </div>

        {/* Projects List / Table */}
        <div className="rounded-xl bg-background-secondary border border-border overflow-hidden shadow-lg">
          {loading ? (
            <div className="p-16 text-center text-foreground-muted flex flex-col items-center gap-3">
              <FolderKanban className="w-6 h-6 animate-pulse text-accent" />
              <p className="text-sm">Loading projects from database...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="p-16 text-center text-foreground-muted space-y-3">
              <Code2 className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
              <p className="text-base font-medium text-foreground">No projects found</p>
              <p className="text-xs text-foreground-muted">
                {searchQuery
                  ? "No projects match your search query."
                  : "No projects have been added yet."}
              </p>
              <Button onClick={openCreateModal} variant="outline" size="sm" className="mt-2">
                <Plus className="w-4 h-4 shrink-0" /> Create Your First Project
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/80 bg-background-surface/50 text-foreground-muted font-mono uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 font-medium">Visual</th>
                    <th className="py-3.5 px-4 font-medium">Project</th>
                    <th className="py-3.5 px-4 font-medium">Category</th>
                    <th className="py-3.5 px-4 font-medium">Technologies</th>
                    <th className="py-3.5 px-4 font-medium">Media</th>
                    <th className="py-3.5 px-4 font-medium">Featured</th>
                    <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredProjects.map((p) => (
                    <tr key={p.slug} className="hover:bg-background-surface/40 transition-colors">
                      {/* Thumbnail Preview */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="w-12 h-8 rounded bg-background-surface border border-border overflow-hidden flex items-center justify-center">
                          {p.thumbnail ? (
                            <img
                              src={p.thumbnail}
                              alt={p.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-zinc-600" />
                          )}
                        </div>
                      </td>

                      {/* Title & Slug */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                          <span>{p.title}</span>
                          <Link
                            href={`/work/${p.slug}`}
                            target="_blank"
                            className="text-foreground-muted hover:text-accent transition-colors"
                            title="Open live case study"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                        <p className="text-foreground-muted text-[11px] font-mono mt-0.5">
                          /work/{p.slug}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {(p.categories && p.categories.length > 0
                            ? p.categories
                            : p.category
                            ? p.category.split(",").map((c) => c.trim()).filter(Boolean)
                            : ["Web Application"]
                          ).map((cat) => (
                            <Badge key={cat} variant="default" size="sm">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </td>

                      {/* Technologies */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(p.technologies || []).slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background-surface border border-border text-foreground-secondary"
                            >
                              {tech}
                            </span>
                          ))}
                          {(p.technologies || []).length > 3 && (
                            <span className="text-[10px] font-mono text-foreground-muted">
                              +{p.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Media Badges */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          {p.thumbnail && (
                            <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                              IMG
                            </span>
                          )}
                          {p.videoUrl && (
                            <span className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 font-mono flex items-center gap-1">
                              <Film className="w-3 h-3" /> VIDEO
                            </span>
                          )}
                          {p.liveUrl && (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono flex items-center gap-1 hover:border-emerald-500/50"
                              title={`Open live site: ${p.liveUrl}`}
                            >
                              <Globe className="w-3 h-3" /> LIVE
                            </a>
                          )}
                          {p.images && p.images.length > 0 && (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                              +{p.images.length}
                            </span>
                          )}
                          {!p.thumbnail && !p.videoUrl && !p.liveUrl && (!p.images || p.images.length === 0) && (
                            <span className="text-zinc-600 font-mono">None</span>
                          )}
                        </div>
                      </td>

                      {/* Featured */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {p.featured ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" /> Yes
                          </span>
                        ) : (
                          <span className="text-[11px] text-zinc-500">No</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-background-surface hover:bg-background-secondary border border-border text-foreground-secondary hover:text-foreground transition-colors text-xs font-medium"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleDelete(p._id || p.slug, p.title)}
                            className="p-1.5 rounded hover:bg-red-500/10 text-foreground-muted hover:text-red-400 transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>

      {/* Hidden File Inputs for Cloudinary Uploads */}
      <input
        ref={thumbnailInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleMediaUpload(e, "thumbnail")}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => handleMediaUpload(e, "video")}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleMediaUpload(e, "gallery")}
      />

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-background-secondary border border-border shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium">
                {editingProject ? "EDIT PORTFOLIO PROJECT" : "NEW PORTFOLIO PROJECT"}
              </span>
              <h2 className="text-2xl font-bold text-foreground mt-1">
                {editingProject ? `Edit: ${editingProject.title}` : "Add Project Details"}
              </h2>
            </div>

            {formError && (
              <div className="p-3 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground-secondary font-mono uppercase mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Project Name"
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-foreground-secondary font-mono uppercase mb-1">
                    URL Slug (Optional auto-generated)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="project-name"
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Category, Year, Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                <div className="relative" ref={categoryDropdownRef}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-foreground-secondary font-mono uppercase text-xs">
                      Categories *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomCategoryMode(!isCustomCategoryMode);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="text-[10px] font-mono text-accent hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      {isCustomCategoryMode ? "← Pick existing" : "+ New Category"}
                    </button>
                  </div>

                  {/* Selected Category Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {(formData.categories || []).map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-mono bg-accent/15 text-accent border border-accent/30"
                      >
                        <span>{cat}</span>
                        <button
                          type="button"
                          title={`Remove ${cat}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleCategory(cat);
                          }}
                          className="hover:text-red-400 p-0.5 rounded transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {(formData.categories || []).length === 0 && (
                      <span className="text-zinc-500 text-xs italic">No category selected</span>
                    )}
                  </div>

                  {isCustomCategoryMode ? (
                    <div className="space-y-1.5">
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={newCategoryInput}
                          onChange={(e) => setNewCategoryInput(e.target.value)}
                          placeholder="e.g. Fintech, Cloud..."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-background-surface border border-accent/60 text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (newCategoryInput.trim()) {
                                handleAddCategory(newCategoryInput, true);
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddCategory(newCategoryInput, true)}
                          disabled={!newCategoryInput.trim()}
                          className="px-2.5 py-1.5 text-xs rounded-lg bg-accent text-white font-medium disabled:opacity-40 hover:bg-accent-hover transition-colors shrink-0 cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      {/* Multi-Category Dropdown Trigger */}
                      <button
                        type="button"
                        onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground hover:border-border/80 focus:outline-none focus:border-accent text-xs cursor-pointer transition-colors text-left"
                      >
                        <span className="font-medium text-foreground truncate">
                          {(formData.categories || []).length > 0
                            ? `Choose / toggle categories (${formData.categories.length} selected)`
                            : "Select categories..."}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 text-foreground-muted transition-transform duration-200 shrink-0 ml-2",
                            isCategoryDropdownOpen && "rotate-180 text-accent"
                          )}
                        />
                      </button>

                      {/* Dropdown Menu with Checkboxes and Delete Button for each Category */}
                      {isCategoryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-full min-w-[280px] bg-background-secondary border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                          <div className="p-2 border-b border-border/60 bg-background-surface/30">
                            <p className="text-[11px] font-mono text-foreground-muted">
                              Click to select / unselect categories:
                            </p>
                          </div>
                          <div className="max-h-56 overflow-y-auto p-1.5 space-y-0.5">
                            {categories.map((cat) => {
                              const isSelected = (formData.categories || []).includes(cat);
                              return (
                                <div
                                  key={cat}
                                  className={cn(
                                    "flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors group cursor-pointer",
                                    isSelected
                                      ? "bg-accent/15 text-accent font-semibold"
                                      : "text-foreground hover:bg-background-surface"
                                  )}
                                  onClick={() => handleToggleCategory(cat)}
                                >
                                  <div className="flex items-center gap-2 truncate mr-2">
                                    <div
                                      className={cn(
                                        "w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors",
                                        isSelected
                                          ? "bg-accent border-accent text-white"
                                          : "border-border bg-background-surface text-transparent"
                                      )}
                                    >
                                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                                    </div>
                                    <span className="truncate">{cat}</span>
                                  </div>

                                  {/* Delete Button right next to each category */}
                                  <button
                                    type="button"
                                    title={`Delete category "${cat}" from system`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteCategory(cat);
                                    }}
                                    className="p-1 rounded hover:bg-red-500/20 text-foreground-muted hover:text-red-400 transition-all shrink-0 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>

                          {/* + Add New Category button inside dropdown */}
                          <div className="p-1.5 border-t border-border/70 bg-background-surface/40">
                            <button
                              type="button"
                              onClick={() => {
                                setIsCategoryDropdownOpen(false);
                                setIsCustomCategoryMode(true);
                              }}
                              className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-accent font-medium hover:bg-accent/10 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>+ Add New Category...</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-foreground-secondary font-mono uppercase mb-1">
                    Year *
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2025"
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-foreground">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-border text-accent focus:ring-0 w-4 h-4 bg-background-surface"
                    />
                    <span className="font-medium">Show in Featured Work</span>
                  </label>
                </div>
              </div>

              {/* Live Project Link / Demo URL */}
              <div>
                <label className="block text-foreground-secondary font-mono uppercase mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs">
                    <Globe className="w-3.5 h-3.5 text-accent" /> Live Project Link / Demo URL
                  </span>
                  <span className="text-[11px] text-accent font-normal normal-case">Associated with project cards & live demo preview</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://example.com or https://clientproject.app"
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent text-sm font-mono"
                  />
                </div>
              </div>

              {/* ─── MEDIA UPLOAD SECTION ─── */}
              <div className="p-4 rounded-xl bg-background-surface border border-border/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" /> Project Images & Demo Video
                  </span>
                  <span className="text-[11px] font-mono text-foreground-muted">
                    Cloudinary Powered
                  </span>
                </div>

                {/* 1. Thumbnail Image */}
                <div>
                  <label className="block text-foreground-secondary font-mono uppercase mb-1.5">
                    Thumbnail / Main Banner Image
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      placeholder="Paste image URL (https://res.cloudinary.com/...)"
                      className="flex-1 h-10 px-3 py-2 rounded-lg bg-background-secondary border border-border text-foreground focus:outline-none focus:border-accent text-xs"
                    />
                    <button
                      type="button"
                      disabled={uploadingTarget === "thumbnail"}
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="w-10 h-10 rounded-lg bg-background-secondary hover:bg-background-surface border border-border hover:border-accent/60 text-foreground transition-all duration-200 flex items-center justify-center shrink-0 disabled:opacity-50"
                      title="Upload Image"
                    >
                      {uploadingTarget === "thumbnail" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-accent" />
                      ) : (
                        <Upload className="w-4 h-4 text-foreground-secondary hover:text-foreground" />
                      )}
                    </button>
                  </div>

                  {formData.thumbnail && (
                    <div className="mt-2 relative w-32 aspect-video rounded-lg overflow-hidden border border-border group">
                      <img
                        src={formData.thumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        disabled={deletingMedia === "thumbnail"}
                        onClick={() => handleRemoveMedia("thumbnail")}
                        className="absolute top-1 right-1 p-1 rounded bg-black/80 text-red-400 hover:text-red-300 disabled:opacity-50"
                        title="Delete thumbnail from Cloudinary & project"
                      >
                        {deletingMedia === "thumbnail" ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. Demo Video */}
                <div>
                  <label className="block text-foreground-secondary font-mono uppercase mb-1.5">
                    Demo Video (Cloudinary MP4, WebM, or Video URL)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="Paste video URL (https://res.cloudinary.com/.../video.mp4)"
                      className="flex-1 h-10 px-3 py-2 rounded-lg bg-background-secondary border border-border text-foreground focus:outline-none focus:border-accent text-xs"
                    />
                    <button
                      type="button"
                      disabled={uploadingTarget === "video"}
                      onClick={() => videoInputRef.current?.click()}
                      className="w-10 h-10 rounded-lg bg-background-secondary hover:bg-background-surface border border-border hover:border-accent/60 text-foreground transition-all duration-200 flex items-center justify-center shrink-0 disabled:opacity-50"
                      title="Upload Video"
                    >
                      {uploadingTarget === "video" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-accent" />
                      ) : (
                        <VideoIcon className="w-4 h-4 text-foreground-secondary hover:text-foreground" />
                      )}
                    </button>
                  </div>

                  {formData.videoUrl && (
                    <div className="mt-2 relative max-w-sm rounded-lg overflow-hidden border border-border">
                      <video
                        src={formData.videoUrl}
                        controls
                        className="w-full aspect-video object-contain bg-black"
                      />
                      <button
                        type="button"
                        disabled={deletingMedia === "video"}
                        onClick={() => handleRemoveMedia("video")}
                        className="absolute top-2 right-2 p-1 rounded bg-black/80 text-red-400 hover:text-red-300 disabled:opacity-50"
                        title="Delete video from Cloudinary & project"
                      >
                        {deletingMedia === "video" ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. Screenshot Gallery */}
                <div>
                  <label className="block text-foreground-secondary font-mono uppercase mb-1.5">
                    Screenshots Gallery ({formData.images.length} added)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      placeholder="Paste screenshot image URL"
                      className="flex-1 h-10 px-3 py-2 rounded-lg bg-background-secondary border border-border text-foreground focus:outline-none focus:border-accent text-xs"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddGalleryUrl();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddGalleryUrl}
                      className="shrink-0 h-10 px-3 text-xs whitespace-nowrap"
                    >
                      Add URL
                    </Button>
                    <button
                      type="button"
                      disabled={uploadingTarget === "gallery"}
                      onClick={() => galleryInputRef.current?.click()}
                      className="w-10 h-10 rounded-lg bg-background-secondary hover:bg-background-surface border border-border hover:border-accent/60 text-foreground transition-all duration-200 flex items-center justify-center shrink-0 disabled:opacity-50"
                      title="Upload Screenshot"
                    >
                      {uploadingTarget === "gallery" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-accent" />
                      ) : (
                        <Upload className="w-4 h-4 text-foreground-secondary hover:text-foreground" />
                      )}
                    </button>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                      {formData.images.map((img, i) => (
                        <div
                          key={i}
                          className="relative aspect-video rounded-lg overflow-hidden border border-border group bg-background-secondary"
                        >
                          <img
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            disabled={deletingMedia === `gallery_${i}`}
                            onClick={() => handleRemoveMedia("gallery", img, i)}
                            className="absolute top-1 right-1 p-1 rounded bg-black/80 text-red-400 hover:text-red-300 transition-opacity opacity-80 group-hover:opacity-100 disabled:opacity-50"
                            title="Delete image from Cloudinary & project"
                          >
                            {deletingMedia === `gallery_${i}` ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <X className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-foreground-secondary font-mono uppercase mb-1">
                  Short Description (Card summary, max 300 chars) *
                </label>
                <textarea
                  required
                  rows={2}
                  maxLength={300}
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, shortDescription: e.target.value })
                  }
                  placeholder="One or two sentences highlighting what the product is and who it helps."
                  className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent resize-none no-scrollbar"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-foreground-secondary font-mono uppercase mb-1">
                  Full Project Overview *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="In-depth explanation of the project, user experience, and architecture."
                  className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent no-scrollbar"
                />
              </div>

              {/* Technologies & Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground-secondary font-mono uppercase mb-1">
                    Technologies (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) =>
                      setFormData({ ...formData, technologies: e.target.value })
                    }
                    placeholder="Next.js, FastAPI, YOLO, MongoDB"
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-foreground-secondary font-mono uppercase mb-1">
                    Key Features (One feature per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder={"Real-time inventory sync\nComputer vision parts search\nAutomated invoice alerts"}
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent no-scrollbar"
                  />
                </div>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground-secondary font-mono uppercase mb-1">
                    The Challenge / Problem *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="What bottleneck, technical barrier, or business problem did the client face?"
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent no-scrollbar"
                  />
                </div>

                <div>
                  <label className="block text-foreground-secondary font-mono uppercase mb-1">
                    The Solution & Architecture *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    placeholder="How did PG Labs design, engineer, and deploy the system?"
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent no-scrollbar"
                  />
                </div>
              </div>

              {/* Outcome */}
              <div>
                <label className="block text-foreground-secondary font-mono uppercase mb-1">
                  Outcome & Delivery Results
                </label>
                <input
                  type="text"
                  value={formData.outcome}
                  onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                  placeholder="e.g. Accelerated catalog lookup speed and eliminated dispatch bottlenecks."
                  className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={formSaving}
                  className="min-w-[120px] justify-center"
                >
                  {formSaving
                    ? "Saving..."
                    : editingProject
                    ? "Save Changes"
                    : "Create Project"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}



      <Toast
        isOpen={toast.isOpen}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
      />
    </main>
  );
}
