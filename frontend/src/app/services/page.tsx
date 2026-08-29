import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { SERVICES } from "@/data/services";
import { FadeUp } from "@/components/animations/FadeUp";

export const metadata: Metadata = {
  title: "Services — Software Engineering & AI Capabilities",
  description:
    "Explore PG Labs capabilities across high-performance web development, machine learning, custom enterprise software, backend APIs, and automation.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Services Hero */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-tech-grid border-b border-border/60">
        <Container className="text-center max-w-3xl">
          <FadeUp>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium px-3 py-1 rounded-full border border-border bg-background-surface mb-6 inline-block">
              CAPABILITIES & EXPERTISE
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Engineering Built Around Your Business
            </h1>
            <p className="text-foreground-secondary text-lg sm:text-xl leading-relaxed">
              We design, build, and deploy production software that turns manual friction into streamlined, automated value.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32">
        <Container>
          <FadeUp>
            <SectionHeading
              eyebrow="SERVICE ARCHITECTURE"
              title="Full-lifecycle digital product development"
              description="Each capability is delivered with modular codebases, comprehensive testing, and transparent communication."
            />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <FadeUp key={service.number} delay={idx * 0.08}>
                <ServiceCard
                  number={service.number}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  icon={service.icon}
                />
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* Reused Process Section */}
      <ProcessSection />

      {/* Reused Technology Stack Section */}
      <TechnologySection />

      {/* Call to Action */}
      <CtaSection />
    </main>
  );
}