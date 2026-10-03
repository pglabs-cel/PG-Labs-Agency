import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { CtaSection } from "@/components/sections/CtaSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import {
  Search,
  Cpu,
  Palette,
  Terminal,
  Rocket,
  CheckCircle2,
  Users,
  Eye,
  FileCode,
  ShieldCheck,
  ArrowRight,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Process — How We Engineer & Launch Digital Systems",
  description:
    "Explore the 5-step engineering and growth framework at PG Labs: Discover, Plan, Design, Build, and Launch. Direct engineer access, continuous previews, and zero layers.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "Our Process — How We Engineer & Launch Digital Systems | PG Labs",
    description:
      "Explore the 5-step engineering and growth framework at PG Labs: Discover, Plan, Design, Build, and Launch. Direct engineer access, continuous previews, and zero layers.",
    url: "/process",
  },
};

const PROCESS_STEPS = [
  {
    step: "01",
    phase: "Discover",
    icon: Search,
    headline: "Understand the problem before touching a line of code.",
    description:
      "We begin by unpacking your business model, core operational bottlenecks, target audience, and system requirements. No assumptions or cookie-cutter solutions.",
    timeline: "3 – 5 Days",
    focus: "De-risk assumptions and define architecture boundaries before engineering",
    deliverables: [
      "Discovery summary & technical requirements document",
      "Core user flow & journey mapping",
      "Scope boundaries & milestone breakdown",
      "Recommended technology stack recommendation",
    ],
  },
  {
    step: "02",
    phase: "Plan",
    icon: Cpu,
    headline: "Architect for performance, scale, and simplicity.",
    description:
      "We design the technical blueprint: database schema, API contracts, third-party integrations, and milestone schedule. We prevent technical debt before it starts.",
    timeline: "3 – 7 Days",
    focus: "Zero architectural bottlenecks, clean schema design and fixed sprint roadmaps",
    deliverables: [
      "System architecture diagram & data model",
      "API contracts & third-party service specifications",
      "Sitemap & information hierarchy",
      "Sprint roadmap with delivery dates",
    ],
  },
  {
    step: "03",
    phase: "Design",
    icon: Palette,
    headline: "Create high-fidelity interfaces that users actually understand.",
    description:
      "We craft dark-mode-first or brand-aligned UI design systems, responsive wireframes, and interactive prototypes. Every screen is designed for conversion and clarity.",
    timeline: "1 – 2 Weeks",
    focus: "Production-ready design tokens, responsive layouts and Figma prototypes",
    deliverables: [
      "Interactive Figma click-through prototype",
      "Modular design tokens (typography, colors, spacing)",
      "Mobile, tablet, and desktop responsive layouts",
      "Developer-ready design assets & specifications",
    ],
  },
  {
    step: "04",
    phase: "Build",
    icon: Terminal,
    headline: "Engineering clean, tested, and modular production code.",
    description:
      "We build using modern stacks (Next.js, TypeScript, Node.js, Python). You get live staging URLs updated throughout each sprint so you see progress in real time.",
    timeline: "2 – 6 Weeks",
    focus: "Clean, modular, type-safe full-stack execution with live staging reviews",
    deliverables: [
      "Live staging URL with continuous deployment",
      "Clean, modular, type-safe codebase",
      "API integrations, authentication, and database logic",
      "Cross-browser and mobile responsive testing",
    ],
  },
  {
    step: "05",
    phase: "Launch",
    icon: Rocket,
    headline: "Deploy to production, configure SEO & verify performance.",
    description:
      "We handle cloud deployment, DNS cutover, SSL configuration, technical SEO verification, analytics setup, and comprehensive handoff.",
    timeline: "3 – 5 Days",
    focus: "Zero-downtime cutover, audited technical SEO and full repository ownership",
    deliverables: [
      "Production deployment with zero-downtime cutover",
      "Complete repository & infrastructure access handoff",
      "Technical SEO & analytics event tracking verification",
      "30-day post-launch warranty & bug-fix support",
    ],
  },
];

const COLLABORATION_RULES = [
  {
    icon: Users,
    title: "Direct Engineering Access",
    description:
      "You speak directly with the builders and developers executing your project. No account managers, middle layers, or messages lost in translation.",
  },
  {
    icon: Eye,
    title: "Continuous Staging Previews",
    description:
      "Never wait months to see what has been built. You receive private staging environments updated regularly with sprint demonstrations.",
  },
  {
    icon: FileCode,
    title: "100% Code & Asset Ownership",
    description:
      "You own the full source code, repositories, domain configurations, design assets, and credentials from day one. No vendor lock-in.",
  },
  {
    icon: ShieldCheck,
    title: "Honest Scopes & No Hidden Fees",
    description:
      "Clear milestone breakdowns and transparent scope definitions. If a requirement evolves, we address it collaboratively before incurring extra work.",
  },
];

export default function ProcessPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Process", url: "/process" },
        ]}
      />

      {/* Hero */}
      <PageHero
        badge="OUR PROCESS"
        badgeTag="EXECUTION PROTOCOL"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Process", url: "/process" },
        ]}
        title={
          <>
            <span>From Idea to Launch:</span>
            <span className="block mt-1 sm:mt-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-accent to-purple-300">
              A 5-Step Framework.
            </span>
          </>
        }
        subtitle="How we turn business requirements into fast, scalable, and production-ready digital systems with zero bureaucracy."
        tags={[
          { label: "5 CLEAR MILESTONES", dot: true, dotColor: "bg-accent" },
          { label: "WEEKLY PREVIEWS", dot: true, dotColor: "bg-emerald-400" },
          { label: "DIRECT ENGINEER ACCESS" },
        ]}
      />

      {/* 5-Step Deep Dive */}
      <section className="py-20 md:py-28 relative">
        {/* Subtle radial ambient background glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -z-10"
          aria-hidden="true"
        />

        <Container className="max-w-5xl">
          <FadeUp>
            <SectionHeading
              eyebrow="THE WORKFLOW"
              title="How Your Project Progresses"
              description="A disciplined, milestone-driven framework engineered to eliminate uncertainty and deliver working software."
              align="center"
            />
          </FadeUp>

          {/* Quick Milestone Navigation Ribbon */}
          <FadeUp delay={0.1}>
            <div className="mt-12 mb-16 p-2 rounded-2xl bg-gradient-to-b from-[#16161b] to-[#0f0f13] border border-border/80 shadow-lg">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {PROCESS_STEPS.map((step) => (
                  <a
                    key={step.step}
                    href={`#phase-${step.step}`}
                    className="group relative flex flex-col items-center text-center p-3 sm:p-3.5 rounded-xl bg-background/50 hover:bg-accent/10 border border-transparent hover:border-accent/30 transition-all duration-200"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-mono text-xs font-bold text-accent">
                        {step.step}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent group-hover:scale-125 transition-all" />
                      <span className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors">
                        {step.phase}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-foreground-muted group-hover:text-foreground-secondary transition-colors">
                      {step.timeline}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Connected Phase Cards */}
          <div className="space-y-6">
            {PROCESS_STEPS.map((step, idx) => (
              <React.Fragment key={step.step}>
                <FadeUp delay={idx * 0.06}>
                  <div
                    id={`phase-${step.step}`}
                    className="scroll-mt-28 relative rounded-2xl bg-gradient-to-b from-[#141419] via-[#0f0f13] to-[#0a0a0d] border border-border/80 hover:border-accent/50 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.36)] p-6 sm:p-9 group overflow-hidden"
                  >
                    {/* Top 1px laser beam */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

                    {/* Ambient corner glow */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/20 transition-all duration-500" />

                    {/* Card Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-7 border-b border-border/60">
                      <div className="flex items-center gap-4">
                        {/* Phase Icon */}
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 text-accent flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.18)] group-hover:border-accent group-hover:scale-105 transition-all duration-300 shrink-0">
                          <step.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono font-semibold tracking-wider uppercase text-accent bg-accent/10 border border-accent/25">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                              Phase {step.step}
                            </span>
                            <span className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider hidden sm:inline">
                              Stage {idx + 1} of 5
                            </span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight group-hover:text-white transition-colors">
                            {step.phase}
                          </h2>
                        </div>
                      </div>

                      {/* Right Duration & Milestone Badges */}
                      <div className="flex flex-wrap items-center gap-2 sm:self-center">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background-surface/80 border border-border/80 text-xs font-mono text-foreground-secondary shadow-sm">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span>Estimated: <strong className="text-foreground font-semibold">{step.timeline}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* 2-Column Body Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left: Objective & Philosophy */}
                      <div className="lg:col-span-7 space-y-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight leading-snug">
                          {step.headline}
                        </h3>
                        <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed">
                          {step.description}
                        </p>

                        <div className="pt-2">
                          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-background-surface/50 border border-border/60 text-xs font-mono text-foreground-secondary">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                            <span>
                              <strong className="text-foreground">Strategic Outcome:</strong> {step.focus}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Key Deliverables Panel */}
                      <div className="lg:col-span-5 rounded-xl bg-background-surface/60 border border-border/80 p-5 sm:p-6 group-hover:border-accent/30 transition-all shadow-inner">
                        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-border/50">
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                            <FileCode className="w-3.5 h-3.5" />
                            <span>Deliverables Manifest</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium text-accent bg-accent/10 border border-accent/20">
                            4 Assets
                          </span>
                        </div>
                        <ul className="space-y-2.5">
                          {step.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 leading-snug"
                            >
                              <div className="w-4 h-4 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center shrink-0 mt-0.5 text-accent">
                                <CheckCircle2 className="w-3 h-3 text-accent" />
                              </div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </FadeUp>

                {/* Vertical Circuit Connector between steps */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="flex flex-col items-center justify-center py-1" aria-hidden="true">
                    <div className="w-[2px] h-7 bg-gradient-to-b from-accent/50 via-purple-500/30 to-border/40 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(139,92,246,0.9)]" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </section>

      {/* Collaboration Rules */}
      <section className="py-20 md:py-28 bg-background-secondary/30 border-y border-border/60 relative">
        <Container className="max-w-5xl">
          <FadeUp>
            <SectionHeading
              eyebrow="ENGINEERING INTEGRITY"
              title="Transparent Collaboration Protocol"
              description="We built PG Labs around how engineering teams should operate: transparently, directly, and with full accountability."
              align="center"
            />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {COLLABORATION_RULES.map((rule, idx) => (
              <FadeUp key={rule.title} delay={idx * 0.08}>
                <div className="relative p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-[#141418] to-[#0c0c0f] border border-border/80 hover:border-accent/40 transition-all duration-300 shadow-md group overflow-hidden h-full flex flex-col justify-between">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 group-hover:border-accent/40 transition-all duration-300">
                        <rule.icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                        RULE // 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 group-hover:text-white transition-colors">
                      {rule.title}
                    </h3>
                    <p className="text-foreground-secondary text-sm leading-relaxed">
                      {rule.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* Quick Navigation to Pricing & Work */}
      <section className="py-16 border-b border-border/60">
        <Container className="max-w-4xl text-center space-y-6">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Explore Our Work or Review Estimated Pricing
            </h2>
            <p className="text-foreground-secondary text-sm sm:text-base max-w-xl mx-auto">
              Inspect real production systems we have engineered or review transparent starting rates across development, growth, and brand disciplines.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/work"
                className="px-6 py-3 rounded-xl bg-background-surface border border-border hover:border-accent text-sm font-semibold text-foreground transition-colors inline-flex items-center gap-2"
              >
                View Case Studies <ArrowRight className="w-4 h-4 text-accent" />
              </Link>
              <Link
                href="/pricing"
                className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-sm font-semibold text-white transition-colors inline-flex items-center gap-2"
              >
                Review Pricing Rates <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
