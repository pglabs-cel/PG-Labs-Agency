"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { Toast } from "@/components/ui/Toast";
import { submitContactInquiry, ContactPayload } from "@/lib/api";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECT_TYPE_OPTIONS = [
  { value: "Web Application", label: "Web Application" },
  { value: "SaaS", label: "SaaS Platform" },
  { value: "AI/ML", label: "AI & ML" },
  { value: "Custom Software", label: "Custom Software" },
  { value: "Website", label: "Website" },
  { value: "Automation", label: "Automation" },
  { value: "Other", label: "Other" },
];

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactPayload>({
    name: "",
    email: "",
    company: "",
    projectType: "Web Application",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
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

  const validateClient = (): string | null => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      return "Please provide a brief message of at least 10 characters.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clientValidationError = validateClient();
    if (clientValidationError) {
      setErrorMessage(clientValidationError);
      setStatus("error");
      setToast({
        isOpen: true,
        type: "error",
        title: "Validation Error",
        message: clientValidationError,
      });
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await submitContactInquiry(formData);
      setStatus("success");
      setToast({
        isOpen: true,
        type: "success",
        title: "Inquiry Received",
        message: response.message,
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "Web Application",
        message: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to process inquiry. Please try again or reach out via email.";
      setErrorMessage(msg);
      setToast({
        isOpen: true,
        type: "error",
        title: "Submission Issue",
        message: msg,
      });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 border-t border-border/60">
      <Container className="max-w-3xl">
        <FadeUp>
          <SectionHeading
            align="center"
            eyebrow="CONTACT"
            title="Let’s build something useful."
            description="Have a project, idea or problem you’d like to solve? Tell us about it."
          />
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="bg-background-secondary/80 border border-border/80 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
            {status === "success" ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Inquiry Received</h3>
                <p className="text-foreground-secondary text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. We will review your project details and get back to you within 24 hours.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setStatus("idle")}
                  className="mt-4"
                >
                  Send another inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono uppercase tracking-wider text-foreground-secondary"
                    >
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl bg-background-surface/80 border border-border/80 px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-h-[46px] text-sm transition-colors hover:border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono uppercase tracking-wider text-foreground-secondary"
                    >
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full rounded-xl bg-background-surface/80 border border-border/80 px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-h-[46px] text-sm transition-colors hover:border-border"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="block text-xs font-mono uppercase tracking-wider text-foreground-secondary"
                  >
                    Company <span className="text-foreground-muted text-[11px] normal-case">(optional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Labs / Studio"
                    className="w-full rounded-xl bg-background-surface/80 border border-border/80 px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-h-[46px] text-sm transition-colors hover:border-border"
                  />
                </div>

                {/* Project Type - Clickable Chips (No Dropdown) */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-foreground-secondary">
                    Project Type <span className="text-accent">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPE_OPTIONS.map((opt) => {
                      const isSelected = formData.projectType === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: opt.value })}
                          className={cn(
                            "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer select-none active:scale-[0.98]",
                            isSelected
                              ? "bg-accent text-white border-accent shadow-[0_2px_12px_rgba(139,92,246,0.35)] font-semibold"
                              : "bg-background-surface/60 border-border/80 text-foreground-secondary hover:text-foreground hover:border-accent/40 hover:bg-background-surface"
                          )}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>


                {/* Message */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-foreground-secondary"
                  >
                    Tell us about your project <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide an overview of what you want to build, current challenges, or timeline..."
                    className="w-full rounded-xl bg-background-surface/80 border border-border/80 px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm resize-y transition-colors hover:border-border min-h-[120px]"
                  />
                </div>

                {/* Form Footer / Submit */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-foreground-muted text-center sm:text-left">
                    We typically respond within 24 hours. No sales spam.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    showArrow
                    fullWidth
                    disabled={status === "loading"}
                    className="sm:w-auto"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting Inquiry...
                      </span>
                    ) : (
                      "Send Project Inquiry"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </FadeUp>
      </Container>

      {/* Floating Toast Notification */}
      <Toast
        isOpen={toast.isOpen}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />
    </section>
  );
};