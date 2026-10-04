import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FadeUp } from "@/components/animations/FadeUp";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import {
  Code2,
  TrendingUp,
  Share2,
  Sparkles,
  Bot,
  ArrowRight,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Terminal,
  CheckCircle2,
  Layers,
  Workflow,
  Globe,
  Palette,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About — Why PG Labs Exists & The Builder Behind It",
  description:
    "Learn about PG Labs. Founded by Pulkit Gaba. A studio building practical digital products, websites, and connected systems around real business problems.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — Why PG Labs Exists & The Builder Behind It | PG Labs",
    description:
      "Learn about PG Labs. Founded by Pulkit Gaba. A studio building practical digital products, websites, and connected systems around real business problems.",
    url: "/about",
  },
};

const FIVE_PILLARS = [
  {
    icon: Code2,
    tag: "BUILD",
    title: "Digital Products",
    desc: "Custom Web Applications, SaaS, Shopify stores & WordPress websites.",
  },
  {
    icon: TrendingUp,
    tag: "GROW",
    title: "Digital Growth",
    desc: "Search engine ranking (SEO), Google Ads, and Meta Ads that convert.",
  },
  {
    icon: Share2,
    tag: "MANAGE",
    title: "Digital Presence",
    desc: "Consistent social media management, content planning & channel growth.",
  },
  {
    icon: Palette,
    tag: "BRAND",
    title: "Brand & Creative",
    desc: "Clean logos, design systems, and startup brand identity kits.",
  },
  {
    icon: Bot,
    tag: "AUTOMATE",
    title: "AI & Workflows",
    desc: "Custom workflow automations and practical AI tools that save time.",
  },
];

const WHAT_I_CREATE = [
  {
    icon: Globe,
    title: "Websites",
    description:
      "Modern, fast, and high-converting websites designed for clarity, speed, and real business results.",
  },
  {
    icon: Code2,
    title: "Web Applications",
    description:
      "Custom SaaS platforms, dashboards, and portals built around the exact way your business operates.",
  },
  {
    icon: Workflow,
    title: "Custom Software",
    description:
      "Practical internal tools, inventory management systems, and automated pipelines that eliminate busywork.",
  },
  {
    icon: Layers,
    title: "Scalable Solutions",
    description:
      "Clean, maintainable codebases engineered with modern tools to scale smoothly as your team grows.",
  },
];

const PRINCIPLES = [
  {
    icon: Terminal,
    title: "Direct Engineering Access",
    desc: "You talk directly with the engineer building your product. Zero account managers playing telephone.",
  },
  {
    icon: ShieldCheck,
    title: "Clean, Maintainable Code",
    desc: "We write clean, typed code that you completely own and can easily build upon in the future.",
  },
  {
    icon: Zap,
    title: "Practical Technology Only",
    desc: "We pick tools that actually solve your problem — never because something is just trending online.",
  },
  {
    icon: HeartHandshake,
    title: "100% Transparency",
    desc: "Milestone-based sprints, clear timelines, honest pricing, and zero hidden agency retainers.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />

      {/* Page Hero */}
      <PageHero
        badge="ABOUT PG LABS"
        badgeTag="THE IDEA & THE BUILDER"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
        title={
          <>
            We Build Digital Systems Around{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-accent to-purple-300">
              Real Problems.
            </span>
          </>
        }
        subtitle="A small, founder-led studio combining modern web development, practical automation, and digital growth to build things that actually work."
        tags={[
          { label: "FOUNDER-LED STUDIO", dot: true, dotColor: "bg-accent" },
          { label: "DIRECT DEVELOPER ACCESS", dot: true, dotColor: "bg-emerald-400" },
          { label: "NO MIDDLEMEN" },
        ]}
      />

      {/* SECTION 02: THE IDEA — Why PG Labs Exists */}
      <section className="py-16 md:py-24 border-b border-border/60">
        <Container className="max-w-5xl space-y-16">
          <FadeUp>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold tracking-wider text-accent uppercase px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
                02 / THE IDEA
              </span>
              <span className="text-xs font-mono text-foreground-muted">
                PHILOSOPHY & PURPOSE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
              Why PG Labs Exists.
            </h2>
            <p className="text-foreground-secondary text-base sm:text-lg mt-3 max-w-2xl leading-relaxed">
              Building digital systems around real problems — instead of forcing businesses into disconnected templates.
            </p>
          </FadeUp>

          {/* The Problem vs The Idea Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Problem */}
            <FadeUp delay={0.05}>
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-background-secondary/70 border border-border/80 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs font-semibold">
                    <span>THE PROBLEM</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    Disconnected Solutions & Bloat
                  </h3>
                  <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed">
                    Too many businesses are forced to juggle fragmented providers — a website from one agency, ads from another, automation somewhere else, and branding handled separately.
                  </p>
                </div>
                <div className="space-y-2.5 pt-4 border-t border-border/60 text-xs sm:text-sm text-foreground-muted">
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Wasted budgets and conflicting advice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Account managers playing endless telephone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Cookie-cutter templates that fail to scale</span>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* The Idea */}
            <FadeUp delay={0.1}>
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-background-secondary/90 border border-accent/40 relative overflow-hidden flex flex-col justify-between space-y-6 shadow-[0_0_30px_rgba(139,92,246,0.08)]">
                <div className="absolute top-0 right-0 w-36 h-36 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-4 relative">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-accent/20 border border-accent/30 text-accent-light font-mono text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>THE PG LABS WAY</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    One Connected System
                  </h3>
                  <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed">
                    We bring technology, growth, automation, and brand together so your entire digital ecosystem works as a single, coordinated engine focused on real business impact.
                  </p>
                </div>
                <div className="space-y-2.5 pt-4 border-t border-border/60 text-xs sm:text-sm text-foreground-secondary relative">
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span>Single point of engineering accountability</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span>Direct access to the builder writing the code</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span>Custom systems designed around how you work</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Connected System: 5 Pillars */}
          <div className="space-y-6 pt-4">
            <FadeUp>
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <span className="text-xs font-mono font-semibold text-accent tracking-wider uppercase">
                  CONNECTED CAPABILITIES
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Different Capabilities. One Stronger Business.
                </h3>
                <p className="text-xs sm:text-sm text-foreground-secondary">
                  Everything you need to launch, run, and scale your digital presence:
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {FIVE_PILLARS.map((item, idx) => (
                <FadeUp key={item.tag} delay={idx * 0.05}>
                  <div className="p-5 rounded-xl bg-background-secondary border border-border hover:border-accent/50 transition-colors flex flex-col justify-between h-full group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-lg bg-background-surface border border-border flex items-center justify-center text-accent group-hover:text-accent-light transition-colors">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-accent px-2 py-0.5 rounded bg-background-surface border border-border/80">
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-xs text-foreground-secondary leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Problem-to-Improvement Pipeline */}
          <FadeUp>
            <div className="p-6 rounded-2xl bg-background-surface border border-border/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono font-semibold text-foreground-muted uppercase tracking-wider">
                  OUR PRACTICAL APPROACH
                </span>
                <span className="text-xs font-mono text-accent">
                  We build around the business — not the template
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                {["PROBLEM", "IDEA", "EXPERIMENT", "BUILD", "IMPROVE"].map(
                  (step, idx, arr) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="px-3.5 py-1.5 rounded-lg bg-background-secondary border border-border text-foreground font-mono text-xs font-semibold">
                        <span className="text-accent mr-1.5">0{idx + 1}</span>
                        {step}
                      </div>
                      {idx < arr.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-foreground-muted hidden md:block" />
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </FadeUp>

          {/* Name Origin: What does PG Labs mean? */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <FadeUp delay={0.05}>
              <div className="p-6 rounded-xl bg-background-secondary border border-border space-y-3">
                <div className="text-xs font-mono text-accent font-bold tracking-wider">
                  NAME ORIGIN / PART 1
                </div>
                <h4 className="text-lg font-bold text-foreground">
                  &ldquo;PG&rdquo; — Production Grade
                </h4>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  Our quality standard. Every system we ship is tested, typed, and engineered for real traffic and production workloads — while also carrying the initials of our founder.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="p-6 rounded-xl bg-background-secondary border border-border space-y-3">
                <div className="text-xs font-mono text-accent font-bold tracking-wider">
                  NAME ORIGIN / PART 2
                </div>
                <h4 className="text-lg font-bold text-foreground">
                  &ldquo;Labs&rdquo; — Continuous Experimentation
                </h4>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  We never rely on stagnant templates. We constantly experiment with modern tools, AI, and streamlined frameworks to find faster, better ways to solve problems.
                </p>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* SECTION 03: THE BUILDER — Pulkit Gaba */}
      <section className="py-16 md:py-24 border-b border-border/60 bg-background-secondary/30">
        <Container className="max-w-5xl space-y-16">
          <FadeUp>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold tracking-wider text-accent uppercase px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
                03 / THE BUILDER
              </span>
              <span className="text-xs font-mono text-foreground-muted">
                MEET THE FOUNDER
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
              The Builder Behind PG Labs.
            </h2>
            <p className="text-foreground-secondary text-base sm:text-lg mt-3 max-w-2xl leading-relaxed">
              I create web solutions and digital systems for real businesses. Direct access, zero middle layers.
            </p>
          </FadeUp>

          {/* Founder Profile Card */}
          <FadeUp>
            <div className="p-6 sm:p-10 rounded-2xl bg-background-secondary border border-border relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Photo Column */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative group w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-accent/40 shadow-[0_0_35px_rgba(139,92,246,0.15)] bg-background-surface">
                    <Image
                      src="https://res.cloudinary.com/y20gw7iu/image/upload/v1791100456/profile.jpg"
                      alt="Pulkit Gaba — Founder & Developer at PG Labs"
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-base font-bold text-foreground">
                        Pulkit Gaba
                      </div>
                      <div className="text-xs text-accent font-mono font-medium">
                        Founder & Lead Builder
                      </div>
                    </div>
                  </div>

                  {/* Status chip */}
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background-surface border border-border text-xs font-mono text-foreground-secondary">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Available for Select Projects</span>
                  </div>
                </div>

                {/* Bio & Philosophy Column */}
                <div className="md:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                      BCA GRADUATE • PRODUCT BUILDER • DEVELOPER
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Engineering solutions that people actually use.
                    </h3>
                  </div>

                  <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed">
                    Pulkit Gaba is a BCA graduate and technology enthusiast focused on building practical web solutions and digital products for real business problems. He combines technical knowledge, design thinking, and hands-on development experience to create websites, web applications, and custom digital tools that help businesses grow and operate better.
                  </p>

                  {/* Direct Quote Block */}
                  <blockquote className="border-l-2 border-accent pl-4 py-1 text-sm sm:text-base italic text-foreground font-sans bg-accent/5 rounded-r-lg">
                    &ldquo;I enjoy turning ideas into practical web solutions that people actually use.&rdquo;
                    <footer className="mt-1 text-xs font-mono text-accent not-italic font-semibold">
                      — Pulkit Gaba
                    </footer>
                  </blockquote>

                  {/* Direct Developer Advantage */}
                  <div className="p-4 rounded-xl bg-background-surface border border-border space-y-1">
                    <div className="text-xs font-mono text-foreground font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span>Direct Collaboration:</span>
                    </div>
                    <p className="text-xs text-foreground-secondary pl-6 leading-relaxed">
                      You work directly with the engineer writing your code. Sprints are transparent, feedback is immediate, and nothing gets lost in translation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* What I Create Grid (4 Cards) */}
          <div className="space-y-6 pt-4">
            <FadeUp>
              <div className="space-y-2">
                <span className="text-xs font-mono font-semibold text-accent tracking-wider uppercase">
                  CORE CAPABILITIES
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  What I Create for Businesses
                </h3>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHAT_I_CREATE.map((item, idx) => (
                <FadeUp key={item.title} delay={idx * 0.05}>
                  <div className="p-6 rounded-xl bg-background-secondary border border-border hover:border-accent/50 transition-colors space-y-3 h-full">
                    <div className="w-10 h-10 rounded-lg bg-background-surface border border-border flex items-center justify-center text-accent">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* End-to-End Build Pipeline */}
          <FadeUp>
            <div className="p-6 rounded-2xl bg-background-secondary border border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-mono font-semibold text-foreground-muted uppercase tracking-wider">
                  END-TO-END EXECUTION
                </span>
                <span className="text-xs font-mono text-accent">
                  From initial idea to live production
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                {["IDEA", "DESIGN", "DEVELOPMENT", "DEPLOY", "GROW"].map(
                  (step, idx, arr) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className="px-3.5 py-1.5 rounded-lg bg-background-surface border border-border text-foreground font-mono text-xs font-semibold">
                        <span className="text-accent mr-1.5">0{idx + 1}</span>
                        {step}
                      </div>
                      {idx < arr.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-foreground-muted hidden md:block" />
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* Principles Grid */}
      <section className="py-16 md:py-24 border-b border-border/60">
        <Container className="max-w-5xl space-y-12">
          <FadeUp>
            <SectionHeading
              eyebrow="HOW WE OPERATE"
              title="Our Core Engineering Principles"
              description="The standards that guide every line of code, sprint milestone, and client collaboration."
            />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRINCIPLES.map((item, idx) => (
              <FadeUp key={item.title} delay={idx * 0.05}>
                <div className="p-6 sm:p-8 rounded-xl bg-background-secondary border border-border space-y-4 h-full">
                  <div className="w-10 h-10 rounded-lg bg-background-surface border border-border flex items-center justify-center text-accent">
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-foreground-secondary text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* Production Tech Stack */}
      <TechnologySection />

      {/* Process CTA */}
      <section className="py-16 border-t border-border/60 bg-background-surface/50">
        <Container className="max-w-4xl text-center space-y-6">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              See How We Bring Projects From Discovery to Launch
            </h2>
            <p className="text-foreground-secondary text-sm sm:text-base max-w-xl mx-auto">
              Inspect our transparent 5-step development framework, sprint milestones, and code ownership guarantees.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/process"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-sm font-semibold text-white transition-colors"
              >
                Inspect Our 5-Step Process <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background-secondary hover:bg-background-surface border border-border text-sm font-semibold text-foreground transition-colors"
              >
                Start a Project
              </Link>
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}