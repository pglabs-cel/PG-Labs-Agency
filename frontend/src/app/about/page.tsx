import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FadeUp } from "@/components/animations/FadeUp";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  Terminal,
  ShieldCheck,
  HeartHandshake,
  Zap,
  Code2,
  TrendingUp,
  Share2,
  Sparkles,
  Bot,
  ArrowRight,
  UserCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About — A Small Studio With a Builder Mindset",
  description:
    "Learn about PG Labs. Founded by Pulkit Gaba. Small studio, direct engineering access, zero layers, and practical technology across Build, Grow, Manage, Brand, and Automate.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — A Small Studio With a Builder Mindset | PG Labs",
    description:
      "Learn about PG Labs. Founded by Pulkit Gaba. Small studio, direct engineering access, zero layers, and practical technology across Build, Grow, Manage, Brand, and Automate.",
    url: "/about",
  },
};

const PILLARS = [
  {
    icon: Code2,
    pillar: "BUILD",
    title: "Engineering & Development",
    desc: "From custom full-stack web platforms and SaaS to high-converting Shopify stores and manageable WordPress sites.",
  },
  {
    icon: TrendingUp,
    pillar: "GROW",
    title: "SEO & Performance Marketing",
    desc: "Technical SEO audits, search indexing, Google Ads campaigns, and Meta advertising with transparent conversion tracking.",
  },
  {
    icon: Share2,
    pillar: "MANAGE",
    title: "Digital Presence & Content",
    desc: "Structured content planning, brand-aligned visual design, and consistent social media channel management.",
  },
  {
    icon: Sparkles,
    pillar: "BRAND",
    title: "Identity & Business Collateral",
    desc: "Clean logo design, type systems, business cards, corporate brochures, and developer-ready brand guidelines.",
  },
  {
    icon: Bot,
    pillar: "AUTOMATE",
    title: "Workflows & Practical AI",
    desc: "Automating repetitive tasks, webhook connections, data pipelines, and targeted AI/ML computer vision systems.",
  },
];

const PRINCIPLES = [
  {
    icon: Terminal,
    title: "Direct Engineering Access",
    description:
      "You collaborate directly with the engineers designing and writing your codebase. Zero account managers playing telephone.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Technical Debt",
    description:
      "We write clean, typed, modular code that your internal team can easily adopt, maintain, and scale without being locked in.",
  },
  {
    icon: Zap,
    title: "Practical Technology Only",
    description:
      "We choose technology to solve real bottlenecks — never because an acronym is trending on social media. Practical value comes first.",
  },
  {
    icon: HeartHandshake,
    title: "Absolute Transparency",
    description:
      "Milestone-based sprints, live staging previews, open repos, and clear scope boundaries. No fabricated metrics or surprise invoices.",
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

      {/* Hero */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-tech-grid border-b border-border/60">
        <Container className="max-w-4xl text-center">
          <FadeUp>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium px-3 py-1 rounded-full border border-border bg-background-surface mb-6 inline-block">
              ABOUT PG LABS
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              A Small Studio With a Builder Mindset.
            </h1>
            <p className="text-foreground-secondary text-lg sm:text-2xl leading-relaxed max-w-2xl mx-auto">
              We combine product intuition, modern engineering, and digital growth to turn ideas into working digital systems.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Honest Positioning & Mission */}
      <section className="py-20 md:py-28">
        <Container className="max-w-4xl space-y-16">
          <FadeUp>
            <div className="space-y-6 text-foreground-secondary text-base sm:text-lg leading-relaxed">
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
                Engineering over bureaucracy.
              </h2>
              <p>
                PG Labs was founded on a simple premise: businesses do not need giant agency retainers, 60-slide pitch decks, or dozens of middle managers. They need skilled engineers and digital product specialists who understand business context and ship reliable solutions quickly.
              </p>
              <p>
                Whether building an AI-powered inventory identification pipeline, a full-stack technical examination platform, an e-commerce storefront, or a high-converting lead generation campaign, we treat every system as mission-critical infrastructure.
              </p>
              <div className="p-6 rounded-xl bg-background-secondary border border-border text-foreground font-mono text-xs sm:text-sm">
                <span className="text-accent font-bold">OUR TRANSPARENCY PLEDGE:</span> We never fabricate client testimonials, inflate performance metrics, invent awards, or recommend unneeded cloud architectures. Every case study and quote represents genuine work.
              </div>
            </div>
          </FadeUp>

          {/* Founder Section */}
          <FadeUp>
            <div className="p-8 sm:p-10 rounded-2xl bg-background-secondary border border-border">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-background-surface border border-border flex items-center justify-center text-accent shrink-0">
                  <UserCheck className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                      FOUNDER & LEAD PRODUCT BUILDER
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Pulkit Gaba
                    </h3>
                  </div>
                  <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed">
                    Pulkit is a software engineer and digital product builder passionate about building lean, high-craft systems. With deep experience across modern TypeScript frameworks, Python backend services, computer vision architectures, and practical growth systems, Pulkit leads the technical direction and engineering standards at PG Labs.
                  </p>
                  <blockquote className="border-l-2 border-accent pl-4 text-sm italic text-foreground font-mono">
                    &ldquo;Software should eliminate operational friction, not create more of it. We work directly with founders and teams so that every line of code directly supports business growth.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* The 5 Pillars */}
          <div className="pt-8 border-t border-border/60">
            <FadeUp>
              <SectionHeading
                eyebrow="WHAT WE COVER"
                title="Technology + Growth + Brand + Automation"
                description="We bridge the gap between technical software engineering and digital business execution."
              />
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {PILLARS.map((p, idx) => (
                <FadeUp key={p.pillar} delay={idx * 0.06}>
                  <div className="p-6 rounded-xl bg-background-secondary border border-border space-y-3 h-full">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-background-surface border border-border flex items-center justify-center text-accent">
                        <p.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-accent px-2 py-0.5 rounded bg-background-surface border border-border/80">
                        {p.pillar}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground">{p.title}</h4>
                    <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Principles Grid */}
          <div className="pt-8 border-t border-border/60">
            <FadeUp>
              <SectionHeading
                eyebrow="HOW WE OPERATE"
                title="Our Core Engineering Principles"
                description="The standards that guide every pull request, architecture decision, and client collaboration."
              />
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              {PRINCIPLES.map((item, idx) => (
                <FadeUp key={item.title} delay={idx * 0.08}>
                  <div className="p-8 rounded-xl bg-background-secondary border border-border space-y-4 h-full">
                    <div className="w-12 h-12 rounded-lg bg-background-surface border border-border flex items-center justify-center text-accent">
                      <item.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                    <p className="text-foreground-secondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Stack */}
      <TechnologySection />

      {/* Explore Process CTA */}
      <section className="py-16 border-t border-border/60 bg-background-surface/50">
        <Container className="max-w-4xl text-center space-y-6">
          <FadeUp>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              See How We Bring Projects From Discovery to Launch
            </h2>
            <p className="text-foreground-secondary text-sm sm:text-base max-w-xl mx-auto">
              Inspect our transparent 5-step development framework, sprint milestones, and code ownership guarantees.
            </p>
            <div className="pt-2">
              <Link
                href="/process"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-sm font-semibold text-white transition-colors"
              >
                Inspect Our 5-Step Process <ArrowRight className="w-4 h-4" />
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