"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { adminLogin } from "@/lib/admin";
import {
  PricingCategory,
  PricingTier,
  EngagementModel,
  PricingFAQ,
  PRICING_CATEGORIES,
  PRICING_DISCLAIMER,
  ENGAGEMENT_MODELS,
  PRICING_FAQS,
} from "@/data/pricingData";
import {
  Lock,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Tag,
  Layers,
  HelpCircle,
  FileText,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingDataState {
  disclaimer: string;
  categories: PricingCategory[];
  engagementModels: EngagementModel[];
  faqs: PricingFAQ[];
}

export default function AdminPricingPage() {
  const [token, setToken] = useState<string | null>(null);
  const [passcode, setPasscode] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"tiers" | "engagement" | "faqs" | "disclaimer">("tiers");
  const [selectedCatId, setSelectedCatId] = useState<string>("web-development");

  const [pricingData, setPricingData] = useState<PricingDataState>({
    disclaimer: PRICING_DISCLAIMER,
    categories: PRICING_CATEGORIES,
    engagementModels: ENGAGEMENT_MODELS,
    faqs: PRICING_FAQS,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
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

  const loadPricing = useCallback(async (activeToken: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/pricing", {
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });

      const json = await res.json().catch(() => ({}));

      if (res.status === 401) {
        localStorage.removeItem("pglabs_admin_token");
        setToken(null);
        setToast({
          isOpen: true,
          type: "error",
          title: "Session Expired",
          message: "Please log in again.",
        });
        return;
      }

      if (json.success && json.data) {
        setPricingData({
          disclaimer: json.data.disclaimer || PRICING_DISCLAIMER,
          categories: json.data.categories || PRICING_CATEGORIES,
          engagementModels: json.data.engagementModels || ENGAGEMENT_MODELS,
          faqs: json.data.faqs || PRICING_FAQS,
        });
      }
    } catch {
      setToast({
        isOpen: true,
        type: "error",
        title: "Network Error",
        message: "Failed to connect to backend pricing service.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadPricing(token);
    }
  }, [token, loadPricing]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setAuthLoading(true);
    setAuthError("");

    const res = await adminLogin(passcode);
    setAuthLoading(false);

    if (res.success && res.token) {
      localStorage.setItem("pglabs_admin_token", res.token);
      setToken(res.token);
      setPasscode("");
    } else {
      setAuthError(res.error || "Authentication failed. Incorrect passcode.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("pglabs_admin_token");
    setToken(null);
    setToast({
      isOpen: true,
      type: "success",
      title: "Logged Out",
      message: "Admin session closed.",
    });
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);

    try {
      const res = await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pricingData),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success) {
        setToast({
          isOpen: true,
          type: "success",
          title: "Saved Successfully",
          message: "All pricing rates and content are live on the public website.",
        });
        if (json.data) {
          setPricingData(json.data);
        }
      } else {
        setToast({
          isOpen: true,
          type: "error",
          title: "Save Failed",
          message: json.error || "Could not update pricing configuration.",
        });
      }
    } catch (err: any) {
      setToast({
        isOpen: true,
        type: "error",
        title: "Error",
        message: err.message || "Failed to reach backend.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    if (!token) return;
    if (!window.confirm("Are you sure you want to reset all pricing to the studio defaults? Custom changes will be overwritten.")) {
      return;
    }

    setResetting(true);
    try {
      const res = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "reset" }),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success) {
        setToast({
          isOpen: true,
          type: "success",
          title: "Reset Completed",
          message: "Pricing restored to original studio defaults.",
        });
        if (json.data) {
          setPricingData(json.data);
        }
      } else {
        setToast({
          isOpen: true,
          type: "error",
          title: "Reset Failed",
          message: json.error || "Could not reset pricing.",
        });
      }
    } catch {
      setToast({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to reset pricing.",
      });
    } finally {
      setResetting(false);
    }
  };

  // Tier editing helpers
  const currentCategory = pricingData.categories.find((c) => c.id === selectedCatId) || pricingData.categories[0];

  const updateTierField = (tierIdx: number, field: keyof PricingTier, value: any) => {
    if (!currentCategory) return;
    setPricingData((prev) => {
      const newCats = prev.categories.map((cat) => {
        if (cat.id !== currentCategory.id) return cat;
        const newTiers = [...cat.tiers];
        newTiers[tierIdx] = { ...newTiers[tierIdx], [field]: value };
        return { ...cat, tiers: newTiers };
      });
      return { ...prev, categories: newCats };
    });
  };

  const updateTierHighlight = (tierIdx: number, highIdx: number, val: string) => {
    if (!currentCategory) return;
    setPricingData((prev) => {
      const newCats = prev.categories.map((cat) => {
        if (cat.id !== currentCategory.id) return cat;
        const newTiers = [...cat.tiers];
        const newHighlights = [...newTiers[tierIdx].highlights];
        newHighlights[highIdx] = val;
        newTiers[tierIdx] = { ...newTiers[tierIdx], highlights: newHighlights };
        return { ...cat, tiers: newTiers };
      });
      return { ...prev, categories: newCats };
    });
  };

  const addTierHighlight = (tierIdx: number) => {
    if (!currentCategory) return;
    setPricingData((prev) => {
      const newCats = prev.categories.map((cat) => {
        if (cat.id !== currentCategory.id) return cat;
        const newTiers = [...cat.tiers];
        const newHighlights = [...newTiers[tierIdx].highlights, "New feature or deliverable"];
        newTiers[tierIdx] = { ...newTiers[tierIdx], highlights: newHighlights };
        return { ...cat, tiers: newTiers };
      });
      return { ...prev, categories: newCats };
    });
  };

  const removeTierHighlight = (tierIdx: number, highIdx: number) => {
    if (!currentCategory) return;
    setPricingData((prev) => {
      const newCats = prev.categories.map((cat) => {
        if (cat.id !== currentCategory.id) return cat;
        const newTiers = [...cat.tiers];
        const newHighlights = newTiers[tierIdx].highlights.filter((_, i) => i !== highIdx);
        newTiers[tierIdx] = { ...newTiers[tierIdx], highlights: newHighlights };
        return { ...cat, tiers: newTiers };
      });
      return { ...prev, categories: newCats };
    });
  };

  const addTierToCategory = () => {
    if (!currentCategory) return;
    const newTier: PricingTier = {
      name: "New Package",
      price: "₹10,000+",
      period: "",
      description: "Brief overview of what this package delivers.",
      highlights: ["Core deliverable 1", "Core deliverable 2", "Core deliverable 3"],
      bestFor: "Ideal client or project type.",
      popular: false,
      ctaText: "Start Project",
      serviceSlug: currentCategory.id,
    };

    setPricingData((prev) => {
      const newCats = prev.categories.map((cat) => {
        if (cat.id !== currentCategory.id) return cat;
        return { ...cat, tiers: [...cat.tiers, newTier] };
      });
      return { ...prev, categories: newCats };
    });
  };

  const removeTierFromCategory = (tierIdx: number) => {
    if (!currentCategory) return;
    if (!window.confirm("Delete this tier package?")) return;
    setPricingData((prev) => {
      const newCats = prev.categories.map((cat) => {
        if (cat.id !== currentCategory.id) return cat;
        return { ...cat, tiers: cat.tiers.filter((_, i) => i !== tierIdx) };
      });
      return { ...prev, categories: newCats };
    });
  };

  // Engagement models helpers
  const updateEngagementField = (idx: number, field: keyof EngagementModel, val: any) => {
    setPricingData((prev) => {
      const newModels = [...prev.engagementModels];
      newModels[idx] = { ...newModels[idx], [field]: val };
      return { ...prev, engagementModels: newModels };
    });
  };

  const updateEngagementBenefit = (modelIdx: number, bIdx: number, val: string) => {
    setPricingData((prev) => {
      const newModels = [...prev.engagementModels];
      const newBenefits = [...newModels[modelIdx].benefits];
      newBenefits[bIdx] = val;
      newModels[modelIdx] = { ...newModels[modelIdx], benefits: newBenefits };
      return { ...prev, engagementModels: newModels };
    });
  };

  // FAQ helpers
  const updateFaq = (idx: number, field: keyof PricingFAQ, val: string) => {
    setPricingData((prev) => {
      const newFaqs = [...prev.faqs];
      newFaqs[idx] = { ...newFaqs[idx], [field]: val };
      return { ...prev, faqs: newFaqs };
    });
  };

  const addFaq = () => {
    setPricingData((prev) => ({
      ...prev,
      faqs: [
        ...prev.faqs,
        {
          question: "New Question Title?",
          answer: "Clear, transparent answer explaining policy or terms.",
        },
      ],
    }));
  };

  const removeFaq = (idx: number) => {
    setPricingData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== idx),
    }));
  };

  // 1. Logged Out State
  if (!token) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <Toast
          isOpen={toast.isOpen}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast({ ...toast, isOpen: false })}
        />

        <div className="w-full max-w-md bg-background-secondary border border-border rounded-2xl p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              PG Labs Admin
            </h1>
            <p className="text-xs text-foreground-secondary">
              Enter studio passcode to manage live pricing packages & rates.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="passcode"
                className="text-xs font-mono uppercase tracking-wider text-foreground-secondary"
              >
                Passcode
              </label>
              <input
                id="passcode"
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl bg-background-surface border border-border px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent font-mono text-sm"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={authLoading}
            >
              {authLoading ? "Authenticating..." : "Authenticate Admin Session"}
            </Button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-foreground-muted hover:text-accent transition-colors"
            >
              ← Back to PG Labs Live Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 2. Logged In Admin Dashboard
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminHeader
        activeTab="pricing"
        onRefresh={() => loadPricing(token)}
        onLogout={handleLogout}
        loading={loading}
      />

      <Toast
        isOpen={toast.isOpen}
        type={toast.type}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />

      <main className="flex-1 py-8 sm:py-12">
        <Container className="max-w-7xl space-y-8">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider uppercase text-accent bg-accent/10 border border-accent/20">
                  LIVE PRICING ENGINE
                </span>
                <span className="text-xs font-mono text-foreground-muted">
                  Instant public synchronization
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Manage Packages & Starting Rates
              </h1>
              <p className="text-xs sm:text-sm text-foreground-secondary mt-1">
                Edit prices, package deliverables, engagement models, and FAQs displayed on /pricing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/pricing"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-background-surface border border-border hover:border-accent/50 text-xs font-mono text-foreground-secondary hover:text-foreground transition-all flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-accent" />
                <span>View Live /pricing</span>
                <ExternalLink className="w-3 h-3 text-foreground-muted" />
              </Link>

              <button
                type="button"
                onClick={handleResetDefaults}
                disabled={resetting || saving}
                className="px-3.5 py-2 rounded-xl bg-background-surface border border-border hover:border-amber-500/40 text-xs font-mono text-foreground-secondary hover:text-amber-400 transition-all flex items-center gap-1.5"
                title="Reset pricing to default studio baseline"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${resetting ? "animate-spin text-amber-400" : ""}`} />
                <span>Reset Defaults</span>
              </button>

              <Button
                onClick={handleSave}
                variant="primary"
                size="sm"
                disabled={saving}
                className="shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              >
                <Save className={`w-3.5 h-3.5 mr-1.5 ${saving ? "animate-spin" : ""}`} />
                <span>{saving ? "Saving..." : "Save All Changes"}</span>
              </Button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 border-b border-border/60 pb-3 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("tiers")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border",
                activeTab === "tiers"
                  ? "bg-accent text-white border-accent shadow-sm"
                  : "bg-background-secondary border-border/80 text-foreground-secondary hover:text-foreground"
              )}
            >
              <Tag className="w-4 h-4" />
              <span>Package Tiers ({pricingData.categories.reduce((acc, c) => acc + c.tiers.length, 0)})</span>
            </button>

            <button
              onClick={() => setActiveTab("engagement")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border",
                activeTab === "engagement"
                  ? "bg-accent text-white border-accent shadow-sm"
                  : "bg-background-secondary border-border/80 text-foreground-secondary hover:text-foreground"
              )}
            >
              <Layers className="w-4 h-4" />
              <span>Engagement Models ({pricingData.engagementModels.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("faqs")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border",
                activeTab === "faqs"
                  ? "bg-accent text-white border-accent shadow-sm"
                  : "bg-background-secondary border-border/80 text-foreground-secondary hover:text-foreground"
              )}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Pricing FAQs ({pricingData.faqs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("disclaimer")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer border",
                activeTab === "disclaimer"
                  ? "bg-accent text-white border-accent shadow-sm"
                  : "bg-background-secondary border-border/80 text-foreground-secondary hover:text-foreground"
              )}
            >
              <FileText className="w-4 h-4" />
              <span>Disclaimer Notice</span>
            </button>
          </div>

          {/* TAB 1: TIER PACKAGES */}
          {activeTab === "tiers" && (
            <div className="space-y-8">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-background-secondary/80 border border-border/80">
                {pricingData.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCatId(cat.id)}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-xs font-mono transition-all border cursor-pointer",
                      selectedCatId === cat.id
                        ? "bg-accent/20 border-accent text-white font-bold"
                        : "bg-background-surface/60 border-border/60 text-foreground-secondary hover:text-foreground"
                    )}
                  >
                    <span>{cat.title}</span>
                    <span className="ml-2 text-[10px] text-accent font-semibold px-1.5 py-0.2 rounded bg-background">
                      {cat.tiers.length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Category Meta Header */}
              {currentCategory && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-accent/10 via-background-secondary to-background-surface border border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                      DISCIPLINE // {currentCategory.pillar}
                    </span>
                    <h2 className="text-xl font-bold text-foreground">
                      {currentCategory.title}
                    </h2>
                    <p className="text-xs text-foreground-secondary mt-0.5">
                      {currentCategory.description}
                    </p>
                  </div>

                  <Button
                    onClick={addTierToCategory}
                    variant="outline"
                    size="sm"
                    className="shrink-0 border-accent/40 text-accent hover:bg-accent/10"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    <span>Add Package Tier</span>
                  </Button>
                </div>
              )}

              {/* Tiers List in Category */}
              {currentCategory && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCategory.tiers.map((tier, tIdx) => (
                    <div
                      key={tIdx}
                      className={cn(
                        "rounded-2xl bg-background-secondary border p-6 flex flex-col justify-between space-y-6 relative transition-all shadow-lg",
                        tier.popular ? "border-accent shadow-[0_0_20px_rgba(139,92,246,0.15)]" : "border-border/80"
                      )}
                    >
                      {/* Popular Toggle & Delete */}
                      <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-foreground-secondary">
                          <input
                            type="checkbox"
                            checked={tier.popular || false}
                            onChange={(e) => updateTierField(tIdx, "popular", e.target.checked)}
                            className="w-4 h-4 rounded text-accent bg-background border-border focus:ring-accent"
                          />
                          <span className={tier.popular ? "text-accent font-bold" : ""}>
                            Popular Choice
                          </span>
                        </label>

                        <button
                          type="button"
                          onClick={() => removeTierFromCategory(tIdx)}
                          className="p-1.5 rounded-lg text-foreground-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete package tier"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Tier Fields */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                            Package Name
                          </label>
                          <input
                            type="text"
                            value={tier.name}
                            onChange={(e) => updateTierField(tIdx, "name", e.target.value)}
                            className="w-full rounded-lg bg-background-surface border border-border px-3 py-2 text-sm font-bold text-foreground focus:border-accent focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                              Price (e.g. ₹15,000+)
                            </label>
                            <input
                              type="text"
                              value={tier.price}
                              onChange={(e) => updateTierField(tIdx, "price", e.target.value)}
                              className="w-full rounded-lg bg-background-surface border border-border px-3 py-2 text-sm font-mono font-bold text-accent focus:border-accent focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                              Billing Period
                            </label>
                            <input
                              type="text"
                              value={tier.period || ""}
                              onChange={(e) => updateTierField(tIdx, "period", e.target.value)}
                              placeholder="/month or leave empty"
                              className="w-full rounded-lg bg-background-surface border border-border px-3 py-2 text-xs font-mono text-foreground focus:border-accent focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={tier.description}
                            onChange={(e) => updateTierField(tIdx, "description", e.target.value)}
                            className="w-full rounded-lg bg-background-surface border border-border px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none resize-none leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                            Best For (Target Audience)
                          </label>
                          <input
                            type="text"
                            value={tier.bestFor}
                            onChange={(e) => updateTierField(tIdx, "bestFor", e.target.value)}
                            className="w-full rounded-lg bg-background-surface border border-border px-3 py-1.5 text-xs text-foreground focus:border-accent focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                              CTA Button Text
                            </label>
                            <input
                              type="text"
                              value={tier.ctaText}
                              onChange={(e) => updateTierField(tIdx, "ctaText", e.target.value)}
                              className="w-full rounded-lg bg-background-surface border border-border px-3 py-1.5 text-xs text-foreground focus:border-accent focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                              Service Slug
                            </label>
                            <input
                              type="text"
                              value={tier.serviceSlug || ""}
                              onChange={(e) => updateTierField(tIdx, "serviceSlug", e.target.value)}
                              placeholder="e.g. web-development"
                              className="w-full rounded-lg bg-background-surface border border-border px-3 py-1.5 text-xs font-mono text-foreground focus:border-accent focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Deliverables Highlights List */}
                        <div className="space-y-2 pt-2 border-t border-border/60">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-mono uppercase text-foreground-muted font-semibold">
                              Included Deliverables ({tier.highlights.length})
                            </label>
                            <button
                              type="button"
                              onClick={() => addTierHighlight(tIdx)}
                              className="text-[10px] font-mono text-accent hover:underline flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Add item
                            </button>
                          </div>

                          <div className="space-y-1.5">
                            {tier.highlights.map((h, hIdx) => (
                              <div key={hIdx} className="flex items-center gap-1.5">
                                <input
                                  type="text"
                                  value={h}
                                  onChange={(e) => updateTierHighlight(tIdx, hIdx, e.target.value)}
                                  className="flex-1 rounded bg-background-surface border border-border/70 px-2 py-1 text-xs text-foreground focus:border-accent focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeTierHighlight(tIdx, hIdx)}
                                  className="p-1 text-foreground-muted hover:text-red-400"
                                  title="Remove item"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ENGAGEMENT MODELS */}
          {activeTab === "engagement" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-background-secondary border border-border/80">
                <p className="text-xs text-foreground-secondary">
                  These 3 engagement structures explain how PG Labs contracts with clients (Fixed-Scope, Monthly Growth, Dedicated Sprints).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingData.engagementModels.map((model, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-6 rounded-2xl bg-background-secondary border border-border/80 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                          Model Title
                        </label>
                        <input
                          type="text"
                          value={model.title}
                          onChange={(e) => updateEngagementField(mIdx, "title", e.target.value)}
                          className="w-full rounded-lg bg-background-surface border border-border px-3 py-2 text-sm font-bold text-foreground focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={model.subtitle}
                          onChange={(e) => updateEngagementField(mIdx, "subtitle", e.target.value)}
                          className="w-full rounded-lg bg-background-surface border border-border px-3 py-1.5 text-xs text-foreground focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                          Description
                        </label>
                        <textarea
                          rows={4}
                          value={model.description}
                          onChange={(e) => updateEngagementField(mIdx, "description", e.target.value)}
                          className="w-full rounded-lg bg-background-surface border border-border px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none resize-none leading-relaxed"
                        />
                      </div>

                      <div className="space-y-2 pt-2 border-t border-border/60">
                        <label className="block text-[11px] font-mono uppercase text-foreground-muted font-semibold">
                          Benefits Checklist
                        </label>
                        {model.benefits.map((b, bIdx) => (
                          <input
                            key={bIdx}
                            type="text"
                            value={b}
                            onChange={(e) => updateEngagementBenefit(mIdx, bIdx, e.target.value)}
                            className="w-full rounded bg-background-surface border border-border/70 px-2.5 py-1 text-xs text-foreground focus:border-accent focus:outline-none mb-1.5"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PRICING FAQS */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2">
                <p className="text-xs text-foreground-secondary">
                  Manage accordion questions and answers displayed on the pricing page.
                </p>
                <Button onClick={addFaq} variant="outline" size="sm">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add FAQ Item
                </Button>
              </div>

              <div className="space-y-4">
                {pricingData.faqs.map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-5 rounded-2xl bg-background-secondary border border-border/80 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-accent font-bold">
                        FAQ #{fIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFaq(fIdx)}
                        className="p-1 text-foreground-muted hover:text-red-400 transition-colors"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(fIdx, "question", e.target.value)}
                        className="w-full rounded-lg bg-background-surface border border-border px-3 py-2 text-sm font-semibold text-foreground focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-foreground-muted mb-1">
                        Answer
                      </label>
                      <textarea
                        rows={3}
                        value={faq.answer}
                        onChange={(e) => updateFaq(fIdx, "answer", e.target.value)}
                        className="w-full rounded-lg bg-background-surface border border-border px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DISCLAIMER */}
          {activeTab === "disclaimer" && (
            <div className="max-w-3xl space-y-6">
              <div className="p-6 rounded-2xl bg-background-secondary border border-border/80 space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-accent font-bold mb-2">
                    Transparency Guarantee Notice
                  </label>
                  <p className="text-xs text-foreground-secondary mb-3">
                    This message appears in the prominent Shield badge right below the hero on the pricing page.
                  </p>
                  <textarea
                    rows={4}
                    value={pricingData.disclaimer}
                    onChange={(e) => setPricingData({ ...pricingData, disclaimer: e.target.value })}
                    className="w-full rounded-xl bg-background-surface border border-border px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sticky Bottom Save Bar */}
          <div className="sticky bottom-6 z-20 p-4 rounded-2xl bg-background-surface/90 border border-border/80 backdrop-blur-md shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-foreground-secondary hidden sm:inline">
                Admin Engine Ready — Click Save to push live
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetDefaults}
                disabled={resetting || saving}
                className="px-4 py-2 rounded-xl text-xs font-mono text-foreground-muted hover:text-amber-400 transition-colors"
              >
                Reset to Defaults
              </button>

              <Button
                onClick={handleSave}
                variant="primary"
                size="md"
                disabled={saving}
                className="shadow-[0_0_20px_rgba(139,92,246,0.35)]"
              >
                <Save className={`w-4 h-4 mr-2 ${saving ? "animate-spin" : ""}`} />
                <span>{saving ? "Saving Changes..." : "Save All Changes"}</span>
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
