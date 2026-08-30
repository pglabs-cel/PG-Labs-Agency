"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { Toast } from "@/components/ui/Toast";
import { submitContactInquiry, ContactPayload } from "@/lib/api";
import { CheckCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECT_TYPE_OPTIONS = [
  { value: "Web Application", label: "Web Application" },
  { value: "SaaS", label: "SaaS Platform" },
  { value: "AI/ML", label: "AI & Machine Learning Solution" },
  { value: "Custom Software", label: "Custom Software / Internal Tools" },
  { value: "Website", label: "Website / High-Converting Landing Page" },
  { value: "Automation", label: "Automation & API Integrations" },
  { value: "Other", label: "Other / Custom Scope" },
];

const BUDGET_OPTIONS_INR = [
  { value: "", label: "Select an estimated budget (optional)" },
  { value: "Under ₹50,000", label: "Under ₹50,000 (₹50k)" },
  { value: "₹50,000 – ₹1,50,000", label: "₹50,000 – ₹1,50,000 (₹50k – ₹1.5L)" },
  { value: "₹1,50,000 – ₹3,00,000", label: "₹1,50,000 – ₹3,00,000 (₹1.5L – ₹3L)" },
  { value: "₹3,00,000 – ₹5,00,000", label: "₹3,00,000 – ₹5,00,000 (₹3L – ₹5L)" },
  { value: "₹5,00,000+", label: "₹5,00,000+ (₹5L+)" },
  { value: "Flexible (INR)", label: "Flexible / Open to discussion" },
];

const BUDGET_OPTIONS_USD = [
  { value: "", label: "Select an estimated budget (optional)" },
  { value: "Under $5,000", label: "Under $5,000" },
  { value: "$5,000 – $15,000", label: "$5,000 – $15,000" },
  { value: "$15,000 – $30,000", label: "$15,000 – $30,000" },
  { value: "$30,000 – $50,000", label: "$30,000 – $50,000" },
  { value: "$50,000+", label: "$50,000+" },
  { value: "Flexible (USD)", label: "Flexible / Open to discussion" },
];

export const ContactSection: React.FC = () => {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [formData, setFormData] = useState<ContactPayload>({
    name: "",
    email: "",
    company: "",
    projectType: "Web Application",
    budget: "",
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

  const currentBudgetOptions = currency === "INR" ? BUDGET_OPTIONS_INR : BUDGET_OPTIONS_USD;

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
        budget: "",
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

                {/* Company & Project Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      placeholder="Acme Labs"
                      className="w-full rounded-xl bg-background-surface/80 border border-border/80 px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-h-[46px] text-sm transition-colors hover:border-border"
                    />
                  </div>

                  {/* Project Type Dropdown */}
                  <div className="space-y-2">
                    <label
                      htmlFor="projectType"
                      className="block text-xs font-mono uppercase tracking-wider text-foreground-secondary"
                    >
                      Project Type <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full appearance-none rounded-xl bg-background-surface/80 border border-border/80 px-4 py-3 pr-10 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-h-[46px] text-sm transition-colors hover:border-border cursor-pointer"
                      >
                        {PROJECT_TYPE_OPTIONS.map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            className="bg-background-secondary text-foreground py-1"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="w-4 h-4 text-foreground-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

                {/* Estimated Budget Dropdown with Dollar ($) & Rupee (₹) Toggle Buttons */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="budget"
                      className="block text-xs font-mono uppercase tracking-wider text-foreground-secondary"
                    >
                      Estimated Budget <span className="text-foreground-muted text-[11px] normal-case">(optional)</span>
                    </label>

                    {/* Currency Selector Buttons: Rupee default + Dollar */}
                    <div className="inline-flex items-center p-0.5 rounded-lg bg-background-surface border border-border">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrency("INR");
                          setFormData((prev) => ({ ...prev, budget: "" }));
                        }}
                        className={cn(
                          "px-2.5 py-1 text-xs font-mono rounded-md transition-all flex items-center gap-1 cursor-pointer",
                          currency === "INR"
                            ? "bg-accent text-white font-semibold shadow-sm"
                            : "text-foreground-secondary hover:text-foreground hover:bg-white/5"
                        )}
                        aria-label="Set currency to INR (Rupees)"
                      >
                        <span className="font-sans font-bold">₹</span>
                        <span>Rupee</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrency("USD");
                          setFormData((prev) => ({ ...prev, budget: "" }));
                        }}
                        className={cn(
                          "px-2.5 py-1 text-xs font-mono rounded-md transition-all flex items-center gap-1 cursor-pointer",
                          currency === "USD"
                            ? "bg-accent text-white font-semibold shadow-sm"
                            : "text-foreground-secondary hover:text-foreground hover:bg-white/5"
                        )}
                        aria-label="Set currency to USD (Dollars)"
                      >
                        <span className="font-sans font-bold">$</span>
                        <span>Dollar</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full appearance-none rounded-xl bg-background-surface/80 border border-border/80 px-4 py-3 pr-10 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent min-h-[46px] text-sm transition-colors hover:border-border cursor-pointer"
                    >
                      {currentBudgetOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          className="bg-background-secondary text-foreground py-1"
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="w-4 h-4 text-foreground-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      aria-hidden="true"
                    />
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