import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FadeUp } from "@/components/animations/FadeUp";
import { Terminal, ShieldCheck, HeartHandshake, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About — A Small Studio With a Builder Mindset",
  description:
    "Learn about PG Labs. Small team, direct engineering access, zero layers, and high-impact digital product development.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — A Small Studio With a Builder Mindset | PG Labs",
    description:
      "Learn about PG Labs. Small team, direct engineering access, zero layers, and high-impact digital product development.",
    url: "/about",
  },
};

const PRINCIPLES = [
  {
    icon: Terminal,
    title: "Direct Engineering",
    description: "You work directly with the product designers and developers writing your code. Zero account managers playing telephone.",
  },
  {
    icon: ShieldCheck,
    title: "No Technical Debt",
    description: "We write clean, strictly-typed TypeScript and modular architectures that your internal team can easily adopt.",
  },
  {
    icon: Zap,
    title: "Practical AI Only",
    description: "We deploy AI where it solves bottlenecks — computer vision, automated classification, and data extraction — not just novelty chat wrappers.",
  },
  {
    icon: HeartHandshake,
    title: "Transparent Collaboration",
    description: "Milestone-driven sprints, continuous staging previews, and open source hygiene. No surprise invoices or lock-in.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
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
              We combine product intuition, modern engineering, and practical AI to turn ideas into working digital products.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Honest Positioning & Mission */}
      <section className="py-20 md:py-28">
        <Container className="max-w-4xl space-y-16">
          <FadeUp>
            <div className="space-y-6 text-foreground-secondary text-lg leading-relaxed">
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
                Engineering over bureaucracy.
              </h2>
              <p>
                PG Labs was founded on a simple observation: modern businesses do not need giant agency retainers, bloated slide decks, or dozens of account executives. They need engineers who understand their business context and can ship reliable software fast.
              </p>
              <p>
                Whether building an AI-powered inventory identification pipeline, a collaborative live coding test suite, or custom administrative dashboards, we treat every system as mission-critical infrastructure.
              </p>
              <div className="p-6 rounded-xl bg-background-secondary border border-border text-foreground font-mono text-sm">
                <span className="text-accent font-bold">OUR COMMITMENT:</span> We will never fabricate client testimonials, inflate metrics, or suggest unneeded cloud architectures.
              </div>
            </div>
          </FadeUp>

          {/* Principles Grid */}
          <div className="pt-8 border-t border-border/60">
            <FadeUp>
              <SectionHeading
                eyebrow="HOW WE DELIVER"
                title="Our Operating Principles"
                description="The core tenets that guide every pull request, architecture review, and deployment."
              />
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PRINCIPLES.map((item, idx) => (
                <FadeUp key={item.title} delay={idx * 0.08}>
                  <div className="p-8 rounded-xl bg-background-secondary border border-border space-y-4">
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

      {/* CTA */}
      <CtaSection />
    </main>
  );
}