"use client";

import React, { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";

interface ProjectFormData {
  title: string;
  slug: string;
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
}

const DEFAULT_FORM: ProjectFormData = {
  title: "",
  slug: "",
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
};

const CATEGORIES = [
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

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectDTO | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(DEFAULT_FORM);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState("");

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

  // Check saved session on mount
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

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData(DEFAULT_FORM);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (proj: ProjectDTO) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      slug: proj.slug,
      category: proj.category,
      year: proj.year,
      featured: proj.featured,
      shortDescription: proj.shortDescription,
      description: proj.description,
      technologies: (proj.technologies || []).join(", "),
      features: (proj.features || []).join("\n"),
      challenge: proj.challenge,
      solution: proj.solution,
      outcome: proj.outcome || "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    // Validate
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

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || undefined,
      category: formData.category.trim(),
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
    };

    if (editingProject && editingProject._id) {
      const res = await adminUpdateProject(token, editingProject._id, payload);
      if (res.success) {
        setToast({
          isOpen: true,
          type: "success",
          title: "Project Updated",
          message: `"${payload.title}" details saved.`,
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
        message: `"${title}" has been removed from portfolio.`,
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
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.technologies || []).some((t) => t.toLowerCase().includes(q))
    );
  });

  // Login Gate
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
              className="w-full justify-center py-3"
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
              <Layers className="w-4 h-4 text-zinc-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">
              {new Set(projects.map((p) => p.category)).size}
            </p>
          </div>
        </div>

        {/* Top Controls: Search + Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects by title, category, or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-background-secondary border border-border text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-accent"
            />
          </div>

          <Button
            onClick={openCreateModal}
            variant="primary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
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
                <Plus className="w-4 h-4 mr-1" /> Create Your First Project
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/80 bg-background-surface/50 text-foreground-muted font-mono uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 font-medium">Project</th>
                    <th className="py-3.5 px-4 font-medium">Category</th>
                    <th className="py-3.5 px-4 font-medium">Technologies</th>
                    <th className="py-3.5 px-4 font-medium">Year</th>
                    <th className="py-3.5 px-4 font-medium">Featured</th>
                    <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredProjects.map((p) => (
                    <tr key={p.slug} className="hover:bg-background-surface/40 transition-colors">
                      {/* Title & Slug */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                          <span>{p.title}</span>
                          <Link
                            href={`/work/${p.slug}`}
                            target="_blank"
                            className="text-foreground-muted hover:text-accent transition-colors"
                            title="Open case study"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                        <p className="text-foreground-muted text-[11px] font-mono mt-0.5">
                          /work/{p.slug}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <Badge variant="default" size="sm">
                          {p.category}
                        </Badge>
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

                      {/* Year */}
                      <td className="py-4 px-4 whitespace-nowrap text-foreground-secondary font-mono">
                        {p.year}
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

                          {p._id && (
                            <button
                              onClick={() => handleDelete(p._id!, p.title)}
                              className="p-1.5 rounded hover:bg-red-500/10 text-foreground-muted hover:text-red-400 transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
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

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
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
                    placeholder="e.g. Gaba Traders Inventory"
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
                    placeholder="e.g. gaba-traders-inventory"
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Category, Year, Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-foreground-secondary font-mono uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-zinc-900">
                        {c}
                      </option>
                    ))}
                  </select>
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
                  className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent resize-none"
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
                  className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent"
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
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent"
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
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent"
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
                    className="w-full px-3 py-2 rounded-lg bg-background-surface border border-border text-foreground focus:outline-none focus:border-accent"
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
