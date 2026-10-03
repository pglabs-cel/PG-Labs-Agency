"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  PRICING_CATEGORIES,
  PRICING_DISCLAIMER,
  ENGAGEMENT_MODELS,
  PRICING_FAQS,
  PricingTier,
} from "@/data/pricingData";
import { SITE_CONFIG } from "@/lib/constants";
import {
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Zap,
  Clock,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const displayedCategories =
    activeCategory === "all"
      ? PRICING_CATEGORIES
      : PRICING_CATEGORIES.filter((c) => c.id === activeCategory);

  const breadcrumbs = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Pricing", url: `${SITE_CONFIG.url}/pricing` },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* ── 1. Hero & Disclaimer Section ───────────────────────────── */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-tech-grid border-b border-border/60 relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-accent/10 blur-[130px]"
          aria-hidden="true"
        />

        <Container className="text-center max-w-4xl relative z-10 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4 flex justify-center">
            <ol className="flex items-center gap-2 text-xs font-mono text-foreground-muted">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-border" aria-hidden="true" />
              </li>
              <li>
                <span className="text-accent font-semibold" aria-current="page">
                  Pricing
                </span>
              </li>
            </ol>
          </nav>

          <FadeUp>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold px-3 py-1 rounded-full border border-accent/40 bg-accent/10 mb-4 inline-block">
              TRANSPARENT INVESTMENT MODEL
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
              Simple, Transparent Starting Rates.
            </h1>
            <p className="text-foreground-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mt-4">
              We believe in honest, upfront numbers. Every project starts with a realistic baseline so you know what to expect before technical discovery.
            </p>
          </FadeUp>

          {/* Transparent Scope Disclaimer Banner */}
          <FadeUp delay={0.1}>
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-background-surface border border-accent/30 max-w-2xl mx-auto flex items-start gap-3.5 text-left shadow-lg">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <p className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
                  TRANSPARENCY GUARANTEE
                </p>
                <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                  {PRICING_DISCLAIMER}
                </p>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ── 2. Category Filter Pills ───────────────────────────────── */}
      <section className="py-3.5 sm:py-4 border-b border-border/60 bg-background/95 sm:bg-background-secondary/80 sticky top-[64px] sm:top-[72px] z-30 backdrop-blur-md">
        <Container className="px-0 sm:px-6 lg:px-8">
          <div className="w-full overflow-x-auto md:overflow-x-visible no-scrollbar py-1">
            <div
              className="flex items-center justify-start md:justify-center md:flex-wrap gap-2 sm:gap-2.5 min-w-max md:min-w-0 px-4 sm:px-0"
              role="tablist"
              aria-label="Filter Pricing by Discipline"
            >
              <button
                role="tab"
                aria-selected={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shrink-0 min-h-[42px] border select-none",
                  activeCategory === "all"
                    ? "bg-accent text-white border-accent shadow-[0_0_20px_rgba(139,92,246,0.35)] font-semibold"
                    : "bg-background-secondary border-border text-foreground-secondary hover:text-white hover:bg-background-surface hover:border-zinc-500"
                )}
              >
                All Packages ({PRICING_CATEGORIES.reduce((acc, c) => acc + c.tiers.length, 0)})
              </button>
              {PRICING_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shrink-0 min-h-[42px] border select-none",
                    activeCategory === cat.id
                      ? "bg-accent text-white border-accent shadow-[0_0_20px_rgba(139,92,246,0.35)] font-semibold"
                      : "bg-background-secondary border-border text-foreground-secondary hover:text-white hover:bg-background-surface hover:border-zinc-500"
                  )}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. Pricing Cards Grouped by Discipline ─────────────────── */}
      <section className="py-20 md:py-32">
        <Container className="space-y-24">
          {displayedCategories.map((category) => (
            <div key={category.id} className="space-y-10">
              <FadeUp>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold px-2.5 py-0.5 rounded bg-accent/10 border border-accent/30">
                      {category.pillar}
                    </span>
                    <span className="font-mono text-xs text-foreground-muted">
                      {category.eyebrow}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
                    {category.title}
                  </h2>
                  <p className="text-foreground-secondary text-sm max-w-2xl">
                    {category.description}
                  </p>
                </div>
              </FadeUp>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {category.tiers.map((tier, idx) => (
                  <FadeUp key={tier.name} delay={idx * 0.08} className="h-full flex flex-col">
                    <div
                      className={cn(
                        "h-full relative overflow-hidden rounded-2xl bg-background-secondary border transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
                        tier.popular
                          ? "border-accent shadow-[0_0_30px_rgba(139,92,246,0.15)]"
                          : "border-border/80 hover:border-accent/50"
                      )}
                    >
                      {tier.popular && (
                        <div className="absolute top-0 right-0 bg-accent text-white font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-sm">
                          POPULAR CHOICE
                        </div>
                      )}

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold text-foreground tracking-tight">
                            {tier.name}
                          </h3>
                          <div className="mt-3 flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-bold font-mono text-white">
                              {tier.price}
                            </span>
                            {tier.period && (
                              <span className="text-xs font-mono text-foreground-muted">
                                {tier.period}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-foreground-muted font-mono mt-1">
                            Starting estimate
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                          {tier.description}
                        </p>

                        {/* Deliverables Checklist */}
                        <div className="space-y-2.5 pt-4 border-t border-border/50">
                          <p className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted font-semibold">
                            What is included:
                          </p>
                          <ul className="space-y-2 text-xs text-foreground/90" role="list">
                            {tier.highlights.map((item, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-border/60 space-y-4">
                        <div className="p-2.5 rounded-lg bg-background-surface border border-border/60 text-[11px] font-mono text-foreground-muted">
                          <span className="text-accent font-semibold">BEST FOR: </span>
                          <span>{tier.bestFor}</span>
                        </div>

                        <Button
                          href={`/contact?service=${encodeURIComponent(tier.serviceSlug || tier.name)}`}
                          variant={tier.popular ? "primary" : "outline"}
                          size="md"
                          fullWidth
                          showArrow
                        >
                          {tier.ctaText}
                        </Button>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* ── 4. Engagement Models Breakdown ─────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-border/60 bg-background-secondary/30">
        <Container className="max-w-5xl">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                HOW WE CONTRACT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mt-2">
                Flexible engagement models.
              </h2>
              <p className="text-foreground-secondary text-sm mt-3">
                Choose the structure that matches your project maturity, delivery speed, and internal resources.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <FadeUp key={model.title} delay={idx * 0.08} className="h-full">
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-background-secondary border border-border/80 flex flex-col justify-between space-y-6 hover:border-accent/40 transition-colors">
                  <div className="space-y-4">
                    <span className="font-mono text-xs font-bold text-accent px-2 py-1 rounded bg-background-surface border border-border">
                      MODEL 0{idx + 1}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">
                      {model.title}
                    </h3>
                    <p className="text-xs font-mono text-foreground-muted">
                      {model.subtitle}
                    </p>
                    <p className="text-xs text-foreground-secondary leading-relaxed">
                      {model.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/50 space-y-2">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted font-semibold">
                      Key Highlights:
                    </p>
                    <ul className="space-y-2 text-xs text-foreground/80" role="list">
                      {model.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. Pricing FAQs Accordion ──────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-border/60">
        <Container className="max-w-3xl">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                FREQUENTLY ASKED
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight mt-2">
                Pricing & Billing FAQs
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-4">
            {PRICING_FAQS.map((faq, idx) => (
              <FadeUp key={idx} delay={idx * 0.06}>
                <details className="group p-5 sm:p-6 rounded-xl bg-background-secondary border border-border/80 transition-all [&_summary::-webkit-details-marker]:none">
                  <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                    <h3 className="text-base sm:text-lg font-bold text-foreground pr-4 group-hover:text-accent transition-colors">
                      {faq.question}
                    </h3>
                    <span className="w-6 h-6 rounded-full bg-background-surface border border-border flex items-center justify-center text-foreground-muted group-open:rotate-45 transition-transform duration-200 shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="text-foreground-secondary text-sm leading-relaxed mt-4 pt-4 border-t border-border/40">
                    {faq.answer}
                  </p>
                </details>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 6. Final Quote CTA ─────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-tech-grid relative overflow-hidden border-t border-border/60">
        <Container className="text-center max-w-3xl">
          <FadeUp>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold mb-3 inline-block">
              GET AN ACCURATE ESTIMATE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
              Need an itemized project proposal?
            </h2>
            <p className="text-foreground-secondary text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Tell us about your target features, timeline, and current assets. We will provide a transparent architecture scope and fixed-milestone pricing within 24 to 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" size="lg" showArrow>
                Request an Itemized Quote
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Explore Full Services Hub
              </Button>
            </div>
          </FadeUp>
        </Container>
      </section>
    </main>
  );
}
