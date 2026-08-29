import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { CheckCircle2 } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 border-t border-border/60">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <FadeUp>
              <SectionHeading
                eyebrow="ABOUT"
                title="A small studio with a builder mindset."
                className="mb-6"
              />
              <div className="space-y-6 text-foreground-secondary text-base sm:text-lg leading-relaxed">
                <p>
                  PG Labs is a technology studio focused on building modern web applications, AI-powered products and custom software for businesses and startups.
                </p>
                <p>
                  We combine product thinking, modern engineering and practical AI to turn ideas into working digital products.
                </p>
                <div className="p-4 rounded-xl bg-background-secondary border border-border/80 text-foreground font-mono text-sm">
                  <span className="text-accent font-bold">CORE PHILOSOPHY:</span> Small team. Direct communication. No unnecessary layers.
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <FadeUp delay={0.1}>
              <div className="p-6 rounded-xl bg-background-secondary border border-border space-y-3">
                <div className="flex items-center gap-3 text-foreground font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span>Direct Engineering Access</span>
                </div>
                <p className="text-foreground-secondary text-xs sm:text-sm pl-8">
                  Work directly with the software engineers writing your code, not intermediaries.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="p-6 rounded-xl bg-background-secondary border border-border space-y-3">
                <div className="flex items-center gap-3 text-foreground font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span>Transparent Development Cadence</span>
                </div>
                <p className="text-foreground-secondary text-xs sm:text-sm pl-8">
                  Continuous staging deployments and clear milestones throughout the build.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="p-6 rounded-xl bg-background-secondary border border-border space-y-3">
                <div className="flex items-center gap-3 text-foreground font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span>Long-Term Product Stability</span>
                </div>
                <p className="text-foreground-secondary text-xs sm:text-sm pl-8">
                  Codebases built to be maintained, extended, or handed off with zero lock-in.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </Container>
    </section>
  );
};