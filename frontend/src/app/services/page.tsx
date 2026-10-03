"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  SERVICES_DATA,
  PILLARS_CONFIG,
  ServicePillar,
} from "@/data/servicesData";
import { SITE_CONFIG } from "@/lib/constants";
import {
  Code2,
  TrendingUp,
  Share2,
  Palette,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PILLAR_ICONS: Record<ServicePillar, React.ElementType> = {
  BUILD: Code2,
  GROW: TrendingUp,
  MANAGE: Share2,
  BRAND: Palette,
  AUTOMATE: Cpu,
};

const PILLAR_FILTERS: Array<{ id: "ALL" | ServicePillar; label: string }> = [
  { id: "ALL", label: "All Capabilities" },
  { id: "BUILD", label: "BUILD" },
  { id: "GROW", label: "GROW" },
  { id: "MANAGE", label: "MANAGE" },
  { id: "BRAND", label: "BRAND" },
  { id: "AUTOMATE", label: "AUTOMATE" },
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState<"ALL" | ServicePillar>("ALL");

  const filteredServices =
    activeFilter === "ALL"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.pillar === activeFilter);

  const breadcrumbs = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Services", url: `${SITE_CONFIG.url}/services` },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* ── 1. Services Hub Hero ───────────────────────────────────── */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-tech-grid border-b border-border/60 relative overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-accent/10 blur-[130px]"
          aria-hidden="true"
        />

        <Container className="text-center max-w-4xl relative z-10 space-y-6">
          {/* Breadcrumbs */}
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
                  Services
                </span>
              </li>
            </ol>
          </nav>

          <FadeUp>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold px-3 py-1 rounded-full border border-accent/40 bg-accent/10 mb-4 inline-block">
              CAPABILITIES & SERVICES ECOSYSTEM
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
              Digital Products. Technology. Growth.
            </h1>
            <p className="text-base sm:text-xl font-mono text-accent mt-3">
              BUILD • AUTOMATE • SCALE
            </p>
            <p className="text-foreground-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mt-4">
              We design, build, brand, and scale modern web platforms, e-commerce storefronts, performance ad funnels, and practical automations.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* ── 2. Interactive Pillar Filter Tabs ──────────────────────── */}
      <section className="py-8 border-b border-border/60 bg-background-secondary/40 sticky top-[64px] sm:top-[72px] z-30 backdrop-blur-md">
        <Container>
          <div
            className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1"
            role="tablist"
            aria-label="Filter Services by Pillar"
          >
            {PILLAR_FILTERS.map((tab) => {
              const isSelected = activeFilter === tab.id;
              const count =
                tab.id === "ALL"
                  ? SERVICES_DATA.length
                  : SERVICES_DATA.filter((s) => s.pillar === tab.id).length;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(tab.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 border select-none shrink-0 min-h-[44px]",
                    isSelected
                      ? "bg-accent text-white border-accent shadow-[0_0_20px_rgba(139,92,246,0.35)] font-semibold"
                      : "bg-background-secondary border-border text-foreground-secondary hover:text-white hover:border-accent/40 hover:bg-background-surface"
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-md",
                      isSelected ? "bg-white/20 text-white" : "bg-background-surface text-foreground-muted"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── 3. Services Grid (All 13 Services) ──────────────────────── */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredServices.map((service, idx) => {
              const PillarIcon = PILLAR_ICONS[service.pillar] || Layers;
              return (
                <FadeUp key={service.slug} delay={idx * 0.05} className="h-full flex flex-col">
                  <div className="group h-full relative overflow-hidden rounded-2xl bg-background-secondary border border-border/80 hover:border-accent/50 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                    {/* Top Section */}
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-accent px-2.5 py-1 rounded-full border border-border bg-background-surface">
                          {service.pillar} • {service.number}
                        </span>
                        <div className="w-9 h-9 rounded-lg bg-background-surface border border-border flex items-center justify-center text-foreground-muted group-hover:text-accent group-hover:border-accent/40 transition-colors">
                          <PillarIcon className="w-4 h-4" aria-hidden="true" />
                        </div>
                      </div>

                      {service.heroImage && (
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-md">
                          <Image
                            src={service.heroImage}
                            alt={service.title}
                            fill
                            unoptimized
                            className="object-cover scale-[1.17] transition-transform duration-500 ease-out group-hover:scale-[1.22]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}

                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-white transition-colors">
                          {service.title}
                        </h2>
                        <p className="text-foreground-secondary text-xs sm:text-sm leading-relaxed mt-2 line-clamp-3">
                          {service.shortDescription}
                        </p>
                      </div>

                      {/* Deliverables snippet */}
                      <div className="pt-3 border-t border-border/50 space-y-2">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted font-semibold">
                          Includes:
                        </p>
                        <ul className="space-y-1.5 text-xs text-foreground/80" role="list">
                          {service.deliverables.slice(0, 3).map((deliv, i) => (
                            <li key={i} className="flex items-start gap-2 line-clamp-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                              <span className="truncate">{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between">
                      <span className="text-xs font-mono text-foreground-muted">
                        {service.startingPrice ? `From ${service.startingPrice}` : "Custom Scope"}
                      </span>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors group/link"
                      >
                        <span>Explore Page</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── 4. Why an Integrated Partner ───────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-border/60 bg-background-secondary/30">
        <Container className="max-w-4xl space-y-12">
          <FadeUp>
            <div className="text-center space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                THE STUDIO ADVANTAGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                Why work with an integrated digital partner?
              </h2>
              <p className="text-foreground-secondary text-base leading-relaxed max-w-2xl mx-auto">
                Hiring 5 different agencies for web development, SEO, paid ads, branding, and automation results in misaligned goals and finger-pointing. PG Labs unifies the entire digital stack under one roof.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeUp delay={0.1}>
              <div className="p-6 rounded-2xl bg-background-secondary border border-border space-y-3">
                <ShieldCheck className="w-6 h-6 text-accent" />
                <h3 className="text-lg font-bold text-foreground">Zero Disconnect</h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  Your ad creatives match your landing page typography, and your tracking pixels are implemented correctly in the codebase by the engineers who built it.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="p-6 rounded-2xl bg-background-secondary border border-border space-y-3">
                <Code2 className="w-6 h-6 text-accent" />
                <h3 className="text-lg font-bold text-foreground">Direct Engineering</h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  You work directly with builders. No account managers relaying messages or confusing technical specifications.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="p-6 rounded-2xl bg-background-secondary border border-border space-y-3">
                <TrendingUp className="w-6 h-6 text-accent" />
                <h3 className="text-lg font-bold text-foreground">Compounding Growth</h3>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  Fast code improves SEO rankings, good SEO lowers ad costs, and smooth automation converts inbound leads faster.
                </p>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ── 5. Final CTA ───────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-tech-grid relative overflow-hidden border-t border-border/60">
        <Container className="text-center max-w-3xl">
          <FadeUp>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold mb-3 inline-block">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
              Have a project in mind?
            </h2>
            <p className="text-foreground-secondary text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Tell us what you’re trying to build, launch, or automate. We’ll help you choose the right approach.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" size="lg" showArrow>
                Start a Project Inquiry
              </Button>
              <Button href="/pricing" variant="outline" size="lg">
                Explore Pricing Breakdown
              </Button>
            </div>
          </FadeUp>
        </Container>
      </section>
    </main>
  );
}