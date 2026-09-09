"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { adminLogin, sendAdminOutreachEmail } from "@/lib/admin";
import {
  Lock,
  Mail,
  Send,
  Sparkles,
  Paperclip,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileText,
  FileCode,
  ShieldCheck,
  RefreshCw,
  Copy,
  Info,
} from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  body: string;
}

const TEMPLATES: EmailTemplate[] = [
  {
    id: "studio-intro",
    name: "Studio Intro & Capability",
    description: "Ideal for initial cold outreach to founders & tech leads.",
    subject: "Building your next digital product — PG Labs introduction",
    body: `I came across what you're building and wanted to reach out.

At PG Labs, we are a digital product and software studio specializing in modern web applications, scalable SaaS architectures, and practical AI/automation workflows.

We help ambitious teams turn ideas into high-performance software without the overhead of massive agencies or unpredictable freelancers.

Would you be open to a brief 10-minute chat this week to explore if we can help accelerate your roadmap? You can also review our recent work at https://pglabs.in/work.`,
  },
  {
    id: "deck-share",
    name: "Portfolio / Deck Share",
    description: "Sharing the studio portfolio, case studies, and pitch deck.",
    subject: "PG Labs — Studio Overview & Capabilities Deck",
    body: `Following up on our earlier conversation, please find attached our capabilities deck and brief overview of our engineering and design work.

We specialize in:
- Full-Stack Web Applications (Next.js, TypeScript, Node.js)
- AI & Machine Learning Integrations
- Custom Business Platforms & High-Performance SaaS

Take a look at the attached documents whenever convenient. Happy to answer any questions or discuss potential collaboration.`,
  },
  {
    id: "follow-up",
    name: "Gentle Follow-Up",
    description: "Polite follow-up for previously contacted leads.",
    subject: "Quick follow-up regarding our conversation — PG Labs",
    body: `I wanted to follow up quickly on my previous note. I know you have a busy schedule, so I just wanted to keep this at the top of your inbox.

If you have any current requirements for digital product development, web platforms, or custom software solutions, we'd love to assist.

Looking forward to hearing from you.`,
  },
  {
    id: "custom",
    name: "Blank / Custom Message",
    description: "Start fresh with your own custom message.",
    subject: "",
    body: "",
  },
];

export default function AdminEmailsPage() {
  const [token, setToken] = useState<string | null>(null);
  const [passcode, setPasscode] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Form states
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [subject, setSubject] = useState(TEMPLATES[0].subject);
  const [message, setMessage] = useState(TEMPLATES[0].body);
  const [selectedTemplate, setSelectedTemplate] = useState("studio-intro");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [sending, setSending] = useState(false);
  const [previewTab, setPreviewTab] = useState<"desktop" | "code">("desktop");

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

  const showToast = (type: "success" | "error", title: string, message: string) => {
    setToast({ isOpen: true, type, title, message });
  };

  // Auth Initialization
  useEffect(() => {
    const saved = localStorage.getItem("pg_admin_token");
    if (saved) {
      setToken(saved);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError("Please enter admin passcode");
      return;
    }
    setAuthLoading(true);
    setAuthError("");

    const res = await adminLogin(passcode.trim());
    setAuthLoading(false);

    if (res.success && res.token) {
      localStorage.setItem("pg_admin_token", res.token);
      setToken(res.token);
    } else {
      setAuthError(res.error || "Invalid passcode.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("pg_admin_token");
    setToken(null);
  };

  const handleTemplateSelect = (tmplId: string) => {
    setSelectedTemplate(tmplId);
    const tmpl = TEMPLATES.find((t) => t.id === tmplId);
    if (tmpl) {
      if (tmpl.subject) setSubject(tmpl.subject);
      if (tmpl.body) setMessage(tmpl.body);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleAddAttachments = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;
    const allowedExts = [".pdf", ".png", ".jpg", ".jpeg", ".webp", ".gif"];
    const valid: File[] = [];

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!allowedExts.includes(ext)) {
        showToast("error", "File Rejected", `"${file.name}" is not an accepted format (PDF or images only).`);
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        showToast("error", "File Too Large", `"${file.name}" exceeds the 10MB limit.`);
        continue;
      }
      valid.push(file);
    }

    const currentTotal = attachments.reduce((acc, f) => acc + f.size, 0);
    const incomingTotal = valid.reduce((acc, f) => acc + f.size, 0);

    if (currentTotal + incomingTotal > 25 * 1024 * 1024) {
      showToast("error", "Total Limit Exceeded", "Total attachments size cannot exceed 25MB.");
      return;
    }

    setAttachments((prev) => [...prev, ...valid]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveAttachment = (idx: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) {
      showToast("error", "Invalid Recipient", "Please enter a valid recipient email address.");
      return;
    }

    if (!subject.trim()) {
      showToast("error", "Missing Subject", "Please provide a subject line.");
      return;
    }

    if (!message.trim()) {
      showToast("error", "Missing Message", "Please write an email message body.");
      return;
    }

    if (!token) {
      showToast("error", "Authentication Error", "Admin session expired. Please re-login.");
      return;
    }

    setSending(true);

    const res = await sendAdminOutreachEmail(token, {
      recipientEmail: recipientEmail.trim(),
      recipientName: recipientName.trim() || undefined,
      subject: subject.trim(),
      message: message.trim(),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    setSending(false);

    if (res.success) {
      showToast("success", "Email Delivered", res.message || `Email sent successfully to ${recipientEmail}.`);
      // Reset form but retain template selection
      setRecipientEmail("");
      setRecipientName("");
      setAttachments([]);
    } else {
      showToast("error", "Sending Failed", res.error || "Failed to send email. Check credentials.");
    }
  };

  // Pre-login screen
  if (!token) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-md bg-background-surface border border-border rounded-xl p-8 shadow-2xl">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 mx-auto mb-6 text-accent">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-center text-foreground mb-1">
            PG Labs Admin
          </h1>
          <p className="text-xs text-foreground-muted text-center mb-6">
            Enter admin passcode to access email & outreach tools
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground-secondary mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-background-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-md">
                {authError}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              disabled={authLoading}
            >
              {authLoading ? "Authenticating..." : "Unlock Studio Console"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  const clientDisplayName = recipientName.trim() || (recipientEmail ? recipientEmail.split("@")[0] : "there");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Global Admin Header with activeTab="emails" */}
      <AdminHeader
        activeTab="emails"
        onLogout={handleLogout}
        loading={sending}
      />

      <main className="flex-1 py-8">
        <Container className="max-w-7xl space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Send Outbound Email & Outreach
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 rounded-full">
                  Branded
                </span>
              </div>
              <p className="text-xs text-foreground-muted mt-1">
                Compose general or client outreach emails. Mails are wrapped in PG Labs official design template with logo, header, and signature.
              </p>
            </div>

            {/* Quick Stats / Info Pill */}
            <div className="flex items-center gap-2 bg-background-surface border border-border px-3.5 py-2 rounded-lg text-xs text-foreground-secondary">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Sent via SMTP (pglabs.agency@gmail.com)</span>
            </div>
          </div>

          {/* Outreach Templates Bar */}
          <div className="bg-background-surface/60 border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Quick Outreach Templates
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleTemplateSelect(tmpl.id)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    selectedTemplate === tmpl.id
                      ? "bg-accent/10 border-accent text-foreground shadow-sm"
                      : "bg-background-secondary/50 border-border/70 text-foreground-secondary hover:text-foreground hover:border-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-foreground">
                      {tmpl.name}
                    </span>
                    {selectedTemplate === tmpl.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    )}
                  </div>
                  <p className="text-[11px] text-foreground-muted line-clamp-2">
                    {tmpl.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Main 2-Column Workspace: Left Composer, Right Live Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Email Composer Form (7 cols) */}
            <div className="lg:col-span-7 bg-background-surface border border-border rounded-xl p-6 shadow-sm space-y-5">
              <form onSubmit={handleSend} className="space-y-4">
                {/* Recipient Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground-secondary mb-1">
                      Recipient Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="founder@company.com"
                      className="w-full px-3 py-2 bg-background-secondary border border-border rounded-lg text-xs text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground-secondary mb-1">
                      Recipient Name / Company <span className="text-foreground-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Alex / Acme Corp"
                      className="w-full px-3 py-2 bg-background-secondary border border-border rounded-lg text-xs text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Line */}
                <div>
                  <label className="block text-xs font-medium text-foreground-secondary mb-1">
                    Subject Line <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject of your message..."
                    className="w-full px-3 py-2 bg-background-secondary border border-border rounded-lg text-xs text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent transition-colors font-medium"
                  />
                </div>

                {/* Message Body */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-foreground-secondary">
                      Message Content <span className="text-red-400">*</span>
                    </label>
                    <span className="text-[11px] text-foreground-muted">
                      Line breaks will automatically format into neat paragraphs
                    </span>
                  </div>
                  <textarea
                    required
                    rows={10}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your email body here..."
                    className="w-full px-3.5 py-2.5 bg-background-secondary border border-border rounded-lg text-xs text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-accent transition-colors leading-relaxed font-sans resize-y"
                  />
                </div>

                {/* Attachments Upload Zone */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-foreground-secondary flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-accent" />
                      <span>Attachments (Pitch Decks, Proposals, Images)</span>
                    </label>
                    <span className="text-[11px] text-foreground-muted">
                      Max 10MB/file, up to 25MB total
                    </span>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
                    className="hidden"
                    onChange={(e) => handleAddAttachments(e.target.files)}
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-dashed border-border hover:border-accent/60 bg-background-secondary/40 hover:bg-background-secondary/80 rounded-lg p-4 text-center cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2 text-xs text-foreground-secondary">
                      <Paperclip className="w-4 h-4 text-accent" />
                      <span className="font-medium text-foreground">Click to browse files</span>
                      <span className="text-foreground-muted">or drag and drop</span>
                    </div>
                    <p className="text-[10px] text-foreground-muted mt-1">
                      PDF documents, PNG, JPG, or WebP
                    </p>
                  </div>

                  {/* Attached Files List */}
                  {attachments.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      {attachments.map((file, idx) => (
                        <div
                          key={`${file.name}-${idx}`}
                          className="flex items-center justify-between bg-background-secondary border border-border/80 px-3 py-2 rounded-lg text-xs"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span className="font-medium text-foreground truncate">{file.name}</span>
                            <span className="text-[11px] text-foreground-muted shrink-0">
                              ({formatFileSize(file.size)})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveAttachment(idx)}
                            className="text-foreground-muted hover:text-red-400 p-1 transition-colors"
                            title="Remove attachment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit / Action Bar */}
                <div className="pt-2 flex items-center justify-between border-t border-border">
                  <div className="text-[11px] text-foreground-muted flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Recipient will receive email with PG Labs branding</span>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={sending}
                    className="px-6 flex items-center gap-2"
                  >
                    {sending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Email...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Outreach Email</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Right: Live Branded Email Preview (5 cols) */}
            <div className="lg:col-span-5 bg-background-surface border border-border rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-accent" />
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    Live Email Preview
                  </h2>
                </div>
                <span className="text-[11px] text-foreground-muted">
                  Recipient View
                </span>
              </div>

              {/* Email Client Shell Mockup */}
              <div className="bg-[#0b0b0e] border border-[#27272a] rounded-xl overflow-hidden shadow-inner">
                {/* Email Client Header Details */}
                <div className="bg-[#18181b] border-b border-[#27272a] p-3 text-xs space-y-1">
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <span className="font-semibold text-foreground-secondary w-12">From:</span>
                    <span className="text-foreground">PG Labs &lt;pglabs.agency@gmail.com&gt;</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <span className="font-semibold text-foreground-secondary w-12">To:</span>
                    <span className="text-accent">{recipientEmail || "client@company.com"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <span className="font-semibold text-foreground-secondary w-12">Subject:</span>
                    <span className="text-foreground font-medium truncate">{subject || "(No subject)"}</span>
                  </div>
                </div>

                {/* Email Wrapped Body (Mirroring getReplyHtml) */}
                <div className="p-4 sm:p-5 font-sans text-xs text-[#e2e8f0] leading-relaxed">
                  {/* Studio Header */}
                  <div className="border border-[#2d2d33] rounded-lg overflow-hidden bg-[#121215]">
                    <div className="p-4 border-b border-[#2d2d33] bg-[#18181c] flex items-center gap-3">
                      <img
                        src="https://res.cloudinary.com/y20gw7iu/image/upload/v1788118208/Logo_Only.jpg"
                        alt="PG Labs"
                        className="w-8 h-8 rounded-md object-cover"
                      />
                      <div>
                        <div className="text-[13px] font-extrabold tracking-wider uppercase text-white">
                          PG LABS
                        </div>
                        <div className="text-[9px] font-bold tracking-wider uppercase text-purple-400">
                          Digital Product Studio
                        </div>
                      </div>
                    </div>

                    {/* Email Text */}
                    <div className="p-4 sm:p-5 space-y-3">
                      <div className="text-sm font-semibold text-white">
                        Hi {clientDisplayName},
                      </div>

                      <div className="text-[#f1f5f9] whitespace-pre-line text-[11px] leading-relaxed">
                        {message || "Your message will appear here..."}
                      </div>

                      {/* Attachments in Email */}
                      {attachments.length > 0 && (
                        <div className="mt-3 p-3 bg-[#18181c] border border-[#2d2d33] rounded-md space-y-1.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                            Attached Documents ({attachments.length})
                          </div>
                          <ul className="space-y-1 text-[11px] text-white">
                            {attachments.map((file, i) => (
                              <li key={i} className="flex items-center gap-1.5 truncate">
                                <span className="text-purple-400">📎</span>
                                <span className="truncate">{file.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Studio Signature */}
                      <div className="border-t border-[#2d2d33] pt-3 mt-4 text-[11px]">
                        <div className="font-semibold text-white">PG Labs Engineering Team</div>
                        <div className="text-[#94a3b8] text-[10px]">
                          Web Applications • AI Solutions • Custom Software
                        </div>
                        <div className="text-purple-400 text-[10px] mt-1">
                          pglabs.in
                        </div>
                      </div>
                    </div>

                    {/* Email Footer Bar */}
                    <div className="p-2.5 border-t border-[#2d2d33] bg-[#18181c] text-center text-[#71717a] text-[10px]">
                      © {new Date().getFullYear()} PG Labs. All rights reserved.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      <Toast
        isOpen={toast.isOpen}
        onClose={() => setToast((prev) => ({ ...prev, isOpen: false }))}
        type={toast.type}
        title={toast.title}
        message={toast.message}
      />
    </div>
  );
}
