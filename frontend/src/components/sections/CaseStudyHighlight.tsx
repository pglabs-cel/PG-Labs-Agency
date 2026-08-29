import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";

export const CaseStudyHighlight: React.FC = () => {
  return (
    <section className="py-20 md:py-32 border-t border-border/60 bg-tech-grid">
      <Container>
        <FadeUp>
          <div className="max-w-3xl mb-16">
            <p className="text-xs sm:text-sm font-mono tracking-widest text-accent uppercase font-medium mb-3">
              OUR PHILOSOPHY
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Good software starts with the right problem.
            </h2>
            <p className="text-foreground-secondary text-base sm:text-lg leading-relaxed">
              We focus on solving genuine operational and user bottlenecks rather than simply piling on features. Every engineering decision is rooted in clear business outcomes.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FadeUp delay={0.1}>
            <div className="p-8 rounded-2xl bg-background-secondary border border-border space-y-4">
              <span className="font-mono text-sm text-accent font-bold">01 — Understand</span>
              <h3 className="text-2xl font-bold text-foreground">Deep Discovery</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                Understand the business, users and problem deeply before writing a single line of production code.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="p-8 rounded-2xl bg-background-secondary border border-border space-y-4">
              <span className="font-mono text-sm text-accent font-bold">02 — Build</span>
              <h3 className="text-2xl font-bold text-foreground">Engineered Precision</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                Design and engineer the right solution with scalable architectural foundations and clean UX.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="p-8 rounded-2xl bg-background-secondary border border-border space-y-4">
              <span className="font-mono text-sm text-accent font-bold">03 — Improve</span>
              <h3 className="text-2xl font-bold text-foreground">Iterate & Scale</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                Measure, refine and scale continuously based on real user feedback and business performance.
              </p>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.4}>
          <div className="flex justify-start">
            <Button href="/work" showArrow>
              Explore Our Work
            </Button>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
};