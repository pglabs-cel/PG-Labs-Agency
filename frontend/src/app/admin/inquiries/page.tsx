"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  adminLogin,
  fetchAdminInquiries,
  updateInquiryStatus,
  deleteInquiry,
  InquiryItem,
  InquiryStats,
} from "@/lib/admin";
import {
  Lock,
  Mail,
  RefreshCw,
  LogOut,
  Search,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  Archive,
  ChevronDown,
  X,
  MessageSquare,
  Building,
  DollarSign,
  Calendar,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  contacted: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  "in-progress": "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  completed: "bg-zinc-500/10 text-zinc-300 border-zinc-500/30",
  archived: "bg-zinc-800 text-zinc-400 border-zinc-700",
};

export default function AdminInquiriesPage() {
  const [token, setToken] = useState<string | null>(null);
  const [passcode, setPasscode] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [stats, setStats] = useState<InquiryStats>({
    total: 0,
    new: 0,
    contacted: 0,
    inProgress: 0,
    archived: 0,
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

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

  // Fetch inquiries callback
  const loadInquiries = useCallback(async (activeSessionToken: string, filter = activeTab) => {
    setLoading(true);
    const res = await fetchAdminInquiries(activeSessionToken, filter);
    if (res.success) {
      setInquiries(res.data);
      setStats(res.stats);
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
          message: res.error || "Failed to load inquiries.",
        });
      }
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    if (token) {
      loadInquiries(token, activeTab);
    }
  }, [token, activeTab, loadInquiries]);

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
    setInquiries([]);
    setSelectedInquiry(null);
  };

  const handleStatusChange = async (id: string, newStatus: InquiryItem["status"]) => {
    if (!token) return;

    // Optimistic UI update
    setInquiries((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedInquiry && selectedInquiry._id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    const res = await updateInquiryStatus(token, id, newStatus);
    if (res.success) {
      setToast({
        isOpen: true,
        type: "success",
        title: "Status Updated",
        message: `Inquiry marked as '${newStatus}'.`,
      });
      // Refresh counts
      loadInquiries(token, activeTab);
    } else {
      setToast({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message: res.error || "Could not update status.",
      });
      loadInquiries(token, activeTab);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!token) return;
    if (!confirm(`Are you sure you want to permanently delete inquiry from "${name}"?`)) {
      return;
    }

    const res = await deleteInquiry(token, id);
    if (res.success) {
      setInquiries((prev) => prev.filter((item) => item._id !== id));
      if (selectedInquiry?._id === id) setSelectedInquiry(null);
      setToast({
        isOpen: true,
        type: "success",
        title: "Inquiry Removed",
        message: "Submission deleted from database.",
      });
      loadInquiries(token, activeTab);
    } else {
      setToast({
        isOpen: true,
        type: "error",
        title: "Delete Failed",
        message: res.error || "Could not delete inquiry.",
      });
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      (item.company && item.company.toLowerCase().includes(q)) ||
      item.projectType.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q)
    );
  });

  // Login Gate Screen
  if (!token) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md p-8 rounded-2xl bg-background-secondary border border-border/80 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-background-surface border border-border flex items-center justify-center mx-auto mb-4 text-accent shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-accent uppercase font-medium">
              RESTRICTED ACCESS
            </span>
            <h1 className="text-2xl font-bold text-foreground mt-1">PG Labs Inquiries</h1>
            <p className="text-sm text-foreground-secondary mt-1">
              Enter administrator passcode to access client inquiries.
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
              {authLoading ? "Verifying..." : "Access Dashboard →"}
            </Button>
          </form>

          <p className="text-center text-xs font-mono text-foreground-muted mt-6">
            Default passcode: <code className="text-foreground-secondary">pglabs_admin_2026</code>
          </p>
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

  // Authenticated Admin Dashboard
  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Navbar */}
      <AdminHeader
        activeTab="inquiries"
        onRefresh={() => token && loadInquiries(token, activeTab)}
        onLogout={handleLogout}
        loading={loading}
      />

      <Container className="max-w-7xl pt-8 sm:pt-12">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-8">
          <div className="p-4 rounded-xl bg-background-secondary border border-border">
            <div className="flex items-center justify-between text-foreground-muted mb-2">
              <span className="text-xs font-mono uppercase">Total</span>
              <Layers className="w-4 h-4 text-foreground-secondary" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{stats.total}</p>
          </div>

          <div className="p-4 rounded-xl bg-background-secondary border border-violet-500/30 bg-violet-500/5">
            <div className="flex items-center justify-between text-violet-400 mb-2">
              <span className="text-xs font-mono uppercase">New</span>
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-violet-400">{stats.new}</p>
          </div>

          <div className="p-4 rounded-xl bg-background-secondary border border-border">
            <div className="flex items-center justify-between text-blue-400 mb-2">
              <span className="text-xs font-mono uppercase">Contacted</span>
              <Mail className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-blue-400">{stats.contacted}</p>
          </div>

          <div className="p-4 rounded-xl bg-background-secondary border border-border">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-mono uppercase">In Progress</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400">{stats.inProgress}</p>
          </div>

          <div className="p-4 rounded-xl bg-background-secondary border border-border col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-mono uppercase">Archived</span>
              <Archive className="w-4 h-4" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-zinc-400">{stats.archived}</p>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Leads" },
              { id: "new", label: "New" },
              { id: "contacted", label: "Contacted" },
              { id: "in-progress", label: "In Progress" },
              { id: "archived", label: "Archived" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-accent text-white shadow-sm"
                    : "bg-background-secondary text-foreground-secondary hover:text-foreground border border-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, company, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-background-secondary border border-border text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Inquiries Table / Content */}
        <div className="rounded-xl bg-background-secondary border border-border overflow-hidden shadow-lg">
          {loading ? (
            <div className="p-16 text-center text-foreground-muted flex flex-col items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-accent" />
              <p className="text-sm">Fetching latest inquiries from database...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-16 text-center text-foreground-muted space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
              <p className="text-base font-medium text-foreground">No inquiries found</p>
              <p className="text-xs text-foreground-muted">
                {searchQuery
                  ? "No results matching your search terms."
                  : `No submissions under '${activeTab}' status.`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border/80 bg-background-surface/50 text-foreground-muted font-mono uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 font-medium">Date</th>
                    <th className="py-3.5 px-4 font-medium">Client / Company</th>
                    <th className="py-3.5 px-4 font-medium">Project</th>
                    <th className="py-3.5 px-4 font-medium">Budget</th>
                    <th className="py-3.5 px-4 font-medium">Status</th>
                    <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredInquiries.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-background-surface/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedInquiry(item)}
                    >
                      {/* Date */}
                      <td className="py-4 px-4 whitespace-nowrap text-foreground-muted font-mono">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Client */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">
                          {item.name}
                        </div>
                        <div className="text-foreground-secondary flex items-center gap-2 mt-0.5">
                          <span>{item.email}</span>
                          {item.company && (
                            <span className="text-foreground-muted">
                              • {item.company}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Project Type */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <Badge variant="default" size="sm">
                          {item.projectType}
                        </Badge>
                      </td>

                      {/* Budget */}
                      <td className="py-4 px-4 whitespace-nowrap text-foreground-secondary font-mono">
                        {item.budget || "Not specified"}
                      </td>

                      {/* Status Selector */}
                      <td
                        className="py-4 px-4 whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative inline-block">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(
                                item._id,
                                e.target.value as InquiryItem["status"]
                              )
                            }
                            className={`appearance-none text-xs font-medium px-2.5 py-1 pr-6 rounded-md border cursor-pointer focus:outline-none ${
                              STATUS_COLORS[item.status] || STATUS_COLORS.new
                            }`}
                          >
                            <option value="new" className="bg-zinc-900 text-zinc-100">
                              ● New
                            </option>
                            <option value="contacted" className="bg-zinc-900 text-zinc-100">
                              ● Contacted
                            </option>
                            <option value="in-progress" className="bg-zinc-900 text-zinc-100">
                              ● In Progress
                            </option>
                            <option value="completed" className="bg-zinc-900 text-zinc-100">
                              ● Completed
                            </option>
                            <option value="archived" className="bg-zinc-900 text-zinc-100">
                              ● Archived
                            </option>
                          </select>
                          <ChevronDown className="w-3 h-3 text-current absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                        </div>
                      </td>

                      {/* Actions */}
                      <td
                        className="py-4 px-4 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`mailto:${item.email}?subject=${encodeURIComponent(
                              `Re: ${item.projectType} Inquiry — PG Labs`
                            )}&body=${encodeURIComponent(
                              `Hi ${item.name},\n\nThank you for reaching out to PG Labs regarding your ${item.projectType} project.\n\nWe have reviewed your inquiry and would love to schedule a brief technical discovery call.\n\nBest regards,\nPG Labs Engineering Team`
                            )}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-accent/10 hover:bg-accent text-accent hover:text-white border border-accent/30 transition-all font-medium"
                            title="Reply via Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply</span>
                          </a>

                          <button
                            onClick={() => handleDelete(item._id, item.name)}
                            className="p-1.5 rounded hover:bg-red-500/10 text-foreground-muted hover:text-red-400 transition-colors"
                            title="Delete Inquiry"
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

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-background-secondary border border-border shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            {/* Close Button */}
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-6 right-6 p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded border uppercase ${
                    STATUS_COLORS[selectedInquiry.status]
                  }`}
                >
                  {selectedInquiry.status}
                </span>
                <span className="text-xs font-mono text-foreground-muted flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(selectedInquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {selectedInquiry.name}
              </h2>
              {selectedInquiry.company && (
                <p className="text-sm text-foreground-secondary flex items-center gap-1.5 mt-1">
                  <Building className="w-3.5 h-3.5 text-accent" />
                  {selectedInquiry.company}
                </p>
              )}
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-background-surface border border-border mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase text-foreground-muted">
                  Email
                </span>
                <p className="text-xs font-medium text-foreground mt-0.5 truncate">
                  {selectedInquiry.email}
                </p>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-foreground-muted">
                  Project Type
                </span>
                <p className="text-xs font-medium text-accent mt-0.5">
                  {selectedInquiry.projectType}
                </p>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase text-foreground-muted">
                  Budget
                </span>
                <p className="text-xs font-medium text-foreground mt-0.5">
                  {selectedInquiry.budget || "Not provided"}
                </p>
              </div>
            </div>

            {/* Message Body */}
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted block mb-2">
                Client Project Requirements & Message
              </span>
              <div className="p-4 rounded-xl bg-background-surface/80 border border-border text-foreground-secondary text-sm leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-foreground-muted">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedInquiry._id,
                      e.target.value as InquiryItem["status"]
                    )
                  }
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg border focus:outline-none ${
                    STATUS_COLORS[selectedInquiry.status]
                  }`}
                >
                  <option value="new" className="bg-zinc-900">New</option>
                  <option value="contacted" className="bg-zinc-900">Contacted</option>
                  <option value="in-progress" className="bg-zinc-900">In Progress</option>
                  <option value="completed" className="bg-zinc-900">Completed</option>
                  <option value="archived" className="bg-zinc-900">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    `Re: ${selectedInquiry.projectType} Inquiry — PG Labs`
                  )}&body=${encodeURIComponent(
                    `Hi ${selectedInquiry.name},\n\nThank you for reaching out to PG Labs regarding your ${selectedInquiry.projectType} project.\n\nWe have reviewed your requirements and would like to connect on next steps.\n\nBest regards,\nPG Labs Engineering Team`
                  )}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-accent text-white font-medium text-xs hover:bg-accent-hover transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Toast */}
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
