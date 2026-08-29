import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TECHNOLOGIES } from "@/data/technologies";
import { FadeUp } from "@/components/animations/FadeUp";

export const TechnologySection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 border-t border-border/60 bg-background-secondary/30">
      <Container>
        <FadeUp>
          <SectionHeading
            eyebrow="STACK"
            title="Built with modern technology."
            description="We select mature, high-performance tools that guarantee maintainability, enterprise security, and longevity."
          />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {TECHNOLOGIES.map((group, idx) => (
            <FadeUp key={group.category} delay={idx * 0.08}>
              <div className="p-6 rounded-xl bg-background-secondary border border-border flex flex-col justify-between h-full space-y-4">
                <p className="text-xs font-mono tracking-widest text-accent uppercase font-bold border-b border-border/60 pb-3">
                  {group.category}
                </p>
                <ul className="space-y-2.5 text-sm" role="list">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-foreground-secondary flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/60" aria-hidden="true" />
                      <span className="font-medium text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
};