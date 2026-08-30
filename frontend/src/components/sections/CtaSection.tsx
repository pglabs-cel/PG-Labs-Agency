import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";

export const CtaSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 border-t border-border/60 relative overflow-hidden bg-tech-grid">
      {/* Background Soft Violet Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] sm:w-[700px] sm:h-[400px] rounded-full bg-accent/15 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative z-10 text-center max-w-3xl">
        <FadeUp>
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold mb-4 inline-block">
            READY TO SHIP
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Have an idea worth building?
          </h2>
          <p className="text-foreground-secondary text-base sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Tell us what you’re working on. We’ll help you figure out what to build, how to build it and what it could take.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" size="lg" showArrow fullWidth className="sm:w-auto">
              Start a Project
            </Button>
            <Button
              href="mailto:pglabs.agency@gmail.com"
              variant="outline"
              size="lg"
              fullWidth
              className="sm:w-auto"
            >
              Talk to Us
            </Button>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
};