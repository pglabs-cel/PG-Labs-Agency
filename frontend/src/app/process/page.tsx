import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { CtaSection } from "@/components/sections/CtaSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
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
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-tech-grid border-b border-border/60">
        <Container className="max-w-4xl text-center">
          <FadeUp>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium px-3 py-1 rounded-full border border-border bg-background-surface mb-6 inline-block">
              OUR PROCESS
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              From Idea to Launch: A Transparent 5-Step Framework.
            </h1>
            <p className="text-foreground-secondary text-lg sm:text-2xl leading-relaxed max-w-2xl mx-auto">
              How we turn business requirements into fast, scalable, and production-ready digital systems with zero bureaucracy.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* 5-Step Deep Dive */}
      <section className="py-20 md:py-28">
        <Container className="max-w-5xl">
          <FadeUp>
            <SectionHeading
              eyebrow="THE WORKFLOW"
              title="How Your Project Progresses"
              description="A disciplined, milestone-driven approach designed to eliminate uncertainty and deliver working software."
              align="center"
            />
          </FadeUp>

          <div className="space-y-12 mt-16">
            {PROCESS_STEPS.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.08}>
                <div className="p-8 sm:p-10 rounded-2xl bg-background-secondary border border-border hover:border-accent/40 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-6 border-b border-border/60">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-background-surface border border-border flex items-center justify-center text-accent font-mono font-bold text-xl">
                        {step.step}
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                          Phase {step.step}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                          {step.phase}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background-surface border border-border/80 text-xs font-mono text-foreground-secondary self-start">
                      <Clock className="w-3.5 h-3.5 text-accent" />
                      <span>Typical duration: {step.timeline}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-6 space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {step.headline}
                      </h3>
                      <p className="text-foreground-secondary text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="md:col-span-6 bg-background-surface p-6 rounded-xl border border-border/60">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-foreground-muted mb-4 font-semibold">
                        Key Deliverables
                      </h4>
                      <ul className="space-y-2.5">
                        {step.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground-secondary"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* Collaboration Rules */}
      <section className="py-20 md:py-28 bg-background-secondary/40 border-y border-border/60">
        <Container className="max-w-5xl">
          <FadeUp>
            <SectionHeading
              eyebrow="TRANSPARENT COLLABORATION"
              title="What Working With Us Looks Like"
              description="We built PG Labs around how engineering teams should operate: transparently, directly, and with full accountability."
              align="center"
            />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {COLLABORATION_RULES.map((rule, idx) => (
              <FadeUp key={rule.title} delay={idx * 0.08}>
                <div className="p-8 rounded-xl bg-background-surface border border-border space-y-4 h-full">
                  <div className="w-12 h-12 rounded-lg bg-background-secondary border border-border flex items-center justify-center text-accent">
                    <rule.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {rule.title}
                  </h3>
                  <p className="text-foreground-secondary text-sm leading-relaxed">
                    {rule.description}
                  </p>
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
