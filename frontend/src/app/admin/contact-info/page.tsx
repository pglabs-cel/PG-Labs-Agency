"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { adminLogin } from "@/lib/admin";
import {
  Lock,
  Mail,
  Phone,
  PhoneCall,
  MessageCircle,
  Linkedin,
  Twitter,
  Github,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface ContactSettingsData {
  email: string;
  phone: string;
  whatsappNumber: string;
  linkedin: string;
  twitter: string;
  github: string;
}

export default function AdminContactInfoPage() {
  const [token, setToken] = useState<string | null>(null);
  const [passcode, setPasscode] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [settings, setSettings] = useState<ContactSettingsData>({
    email: "pglabs.agency@gmail.com",
    phone: "",
    whatsappNumber: "",
    linkedin: "",
    twitter: "",
    github: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
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

  const loadSettings = useCallback(async (activeToken: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success && data.data) {
        setSettings({
          email: data.data.email || "pglabs.agency@gmail.com",
          phone: data.data.phone || "",
          whatsappNumber: data.data.whatsappNumber || "",
          linkedin: data.data.linkedin || "",
          twitter: data.data.twitter || "",
          github: data.data.github || "",
        });
      } else {
        if (res.status === 401) {
          handleLogout();
          setToast({
            isOpen: true,
            type: "error",
            title: "Session Expired",
            message: "Please log in again.",
          });
        }
      }
    } catch {
      setToast({
        isOpen: true,
        type: "error",
        title: "Network Error",
        message: "Failed to connect to settings server.",
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      loadSettings(token);
    }
  }, [token, loadSettings]);

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
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!settings.email.trim() || !/^\S+@\S+\.\S+$/.test(settings.email.trim())) {
      setToast({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: "Please provide a valid email address.",
      });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setToast({
          isOpen: true,
          type: "success",
          title: "Settings Saved",
          message: "Studio contact info and social links updated successfully.",
        });
      } else {
        setToast({
          isOpen: true,
          type: "error",
          title: "Update Failed",
          message: data.error || "Could not save settings.",
        });
      }
    } catch {
      setToast({
        isOpen: true,
        type: "error",
        title: "Network Error",
        message: "Failed to communicate with the server.",
      });
    }
    setSaving(false);
  };

  // Login Gate Screen
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
            <h1 className="text-2xl font-bold text-foreground mt-1">PG Labs Contact Settings</h1>
            <p className="text-sm text-foreground-secondary mt-1">
              Enter administrator passcode to manage contact channels.
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
                required
                className="w-full px-4 py-3 rounded-xl bg-background-surface border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent font-mono text-sm transition-colors"
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
              {authLoading ? "Verifying..." : "Access Settings →"}
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

  // Active items calculation for Live Preview
  const activeItemsCount = [
    Boolean(settings.email),
    Boolean(settings.phone.trim()),
    Boolean(settings.whatsappNumber.trim()),
    Boolean(settings.linkedin.trim()),
    Boolean(settings.twitter.trim()),
    Boolean(settings.github.trim()),
  ].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Navbar */}
      <AdminHeader
        activeTab="contact-info"
        onRefresh={() => token && loadSettings(token)}
        onLogout={handleLogout}
        loading={loading}
      />

      <Container className="max-w-5xl pt-8 sm:pt-10">
        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest text-accent uppercase font-medium">
                STUDIO CONFIGURATION
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                ● Live Sync
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mt-1">
              Contact & Social Channels
            </h1>
            <p className="text-sm text-foreground-secondary mt-1">
              Manage the public email, phone numbers, and social profiles shown across PG Labs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Edit Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Card 1: Direct Contact */}
              <div className="p-6 sm:p-7 rounded-2xl bg-background-secondary border border-border shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 pb-2 border-b border-border/80">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent border border-accent/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Direct Contact Channels</h2>
                    <p className="text-xs text-foreground-muted">
                      Clients use these channels to reach out to PG Labs directly.
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground-secondary flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-accent" />
                      Primary Studio Email <span className="text-accent">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-emerald-400">Always visible in footer</span>
                  </div>
                  <input
                    type="email"
                    required
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    placeholder="pglabs.agency@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-background-surface border border-border text-foreground text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                  />
                  <p className="text-[11px] text-foreground-muted mt-1.5">
                    This email is displayed in the footer and receives new lead notification alerts.
                  </p>
                </div>

                {/* Direct Calling Phone */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground-secondary flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-accent" />
                      Phone / Calling Number
                    </label>
                    <span className="text-[10px] font-mono text-foreground-muted">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-background-surface border border-border text-foreground text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                  />
                  <p className="text-[11px] text-foreground-muted mt-1.5">
                    Leave blank if you haven&apos;t taken a separate business number yet. If blank, it remains completely hidden from the footer.
                  </p>
                </div>

                {/* WhatsApp Contact */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground-secondary flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      WhatsApp Business / Contact Number
                    </label>
                    <span className="text-[10px] font-mono text-foreground-muted">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    placeholder="919876543210 (Country code + Number, no spaces or +)"
                    className="w-full px-4 py-2.5 rounded-xl bg-background-surface border border-border text-foreground text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                  />
                  <p className="text-[11px] text-foreground-muted mt-1.5">
                    When you enter your number here in the future, a &quot;WhatsApp ↗&quot; link will automatically appear in the footer for 1-click WhatsApp messaging. Leave blank for now.
                  </p>
                </div>
              </div>

              {/* Card 2: Social Profiles */}
              <div className="p-6 sm:p-7 rounded-2xl bg-background-secondary border border-border shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 pb-2 border-b border-border/80">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent border border-accent/20">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Social & Professional Profiles</h2>
                    <p className="text-xs text-foreground-muted">
                      Links are conditionally rendered in the footer only when URLs are provided.
                    </p>
                  </div>
                </div>

                {/* LinkedIn */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground-secondary flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                      LinkedIn Company Page URL
                    </label>
                    <span className="text-[10px] font-mono text-foreground-muted">Optional</span>
                  </div>
                  <input
                    type="url"
                    value={settings.linkedin}
                    onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/company/pglabs"
                    className="w-full px-4 py-2.5 rounded-xl bg-background-surface border border-border text-foreground text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                  />
                  <p className="text-[11px] text-foreground-muted mt-1.5">
                    Leave blank for now if not created yet. As soon as you paste your LinkedIn URL, it will appear in the footer.
                  </p>
                </div>

                {/* Twitter / X */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground-secondary flex items-center gap-1.5">
                      <Twitter className="w-3.5 h-3.5 text-zinc-300" />
                      Twitter / X Profile URL
                    </label>
                    <span className="text-[10px] font-mono text-foreground-muted">Optional</span>
                  </div>
                  <input
                    type="url"
                    value={settings.twitter}
                    onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                    placeholder="https://twitter.com/pglabs"
                    className="w-full px-4 py-2.5 rounded-xl bg-background-surface border border-border text-foreground text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* GitHub */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-foreground-secondary flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-zinc-300" />
                      GitHub Organization URL
                    </label>
                    <span className="text-[10px] font-mono text-foreground-muted">Optional</span>
                  </div>
                  <input
                    type="url"
                    value={settings.github}
                    onChange={(e) => setSettings({ ...settings, github: e.target.value })}
                    placeholder="https://github.com/pglabs"
                    className="w-full px-4 py-2.5 rounded-xl bg-background-surface border border-border text-foreground text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={saving}
                  className="shadow-md"
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  <span>{saving ? "Saving Changes..." : "Save Contact Settings"}</span>
                </Button>
              </div>
            </form>
          </div>

          {/* Right Sidebar: Live Preview & Logic Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Footer Preview */}
            <div className="p-6 rounded-2xl bg-background-secondary border border-border shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/80">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">Footer Live Preview</h3>
                </div>
                <span className="text-[11px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                  {activeItemsCount} Active
                </span>
              </div>

              <p className="text-xs text-foreground-muted leading-relaxed">
                This is how the &quot;Connect&quot; column currently looks to visitors at the bottom of the public website:
              </p>

              {/* Mock Footer Box */}
              <div className="p-4 rounded-xl bg-background-surface/90 border border-border space-y-3 font-sans">
                <div className="text-[11px] font-mono uppercase tracking-widest text-foreground font-semibold">
                  Connect
                </div>
                <div className="space-y-2 text-xs">
                  {/* Email */}
                  {settings.email ? (
                    <div className="flex items-center justify-between text-foreground-secondary">
                      <span className="font-mono text-accent truncate max-w-[200px]">{settings.email}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                    </div>
                  ) : null}

                  {/* Phone */}
                  {settings.phone.trim() ? (
                    <div className="flex items-center justify-between text-foreground-secondary">
                      <span>{settings.phone}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                    </div>
                  ) : null}

                  {/* WhatsApp */}
                  {settings.whatsappNumber.trim() ? (
                    <div className="flex items-center justify-between text-foreground-secondary">
                      <span>WhatsApp ↗</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                    </div>
                  ) : null}

                  {/* LinkedIn */}
                  {settings.linkedin.trim() ? (
                    <div className="flex items-center justify-between text-foreground-secondary">
                      <span>LinkedIn ↗</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                    </div>
                  ) : null}

                  {/* Twitter */}
                  {settings.twitter.trim() ? (
                    <div className="flex items-center justify-between text-foreground-secondary">
                      <span>Twitter / X ↗</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                    </div>
                  ) : null}

                  {/* GitHub */}
                  {settings.github.trim() ? (
                    <div className="flex items-center justify-between text-foreground-secondary">
                      <span>GitHub ↗</span>
                      <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                    </div>
                  ) : null}

                  {!settings.phone.trim() &&
                    !settings.whatsappNumber.trim() &&
                    !settings.linkedin.trim() &&
                    !settings.twitter.trim() &&
                    !settings.github.trim() && (
                      <div className="py-2 text-[11px] text-foreground-muted italic">
                        No dummy links rendered. Only direct email is shown.
                      </div>
                    )}
                </div>
              </div>
            </div>

            {/* Zero-Fake-Data Guarantee Info Box */}
            <div className="p-5 rounded-2xl bg-background-surface/50 border border-border text-xs text-foreground-secondary space-y-2.5">
              <div className="flex items-center gap-2 text-foreground font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Fake Data Policy</span>
              </div>
              <p className="text-foreground-muted leading-relaxed">
                As per studio rules, PG Labs does not display dummy links (such as placeholder WhatsApp numbers or empty LinkedIn pages). Channels only appear once you set them up.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Floating Toast Notification */}
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
