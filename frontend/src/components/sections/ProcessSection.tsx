import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "Understand your goals, users and business requirements.",
  },
  {
    number: "02",
    title: "Plan",
    description: "Define the product architecture, features and technical approach.",
  },
  {
    number: "03",
    title: "Design",
    description: "Create intuitive interfaces and experiences before development.",
  },
  {
    number: "04",
    title: "Build",
    description: "Develop, integrate and test the product rigorously.",
  },
  {
    number: "05",
    title: "Launch",
    description: "Deploy the product and help you improve it over time.",
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-32 border-t border-border/60">
      <Container>
        <FadeUp>
          <SectionHeading
            eyebrow="OUR PROCESS"
            title="From idea to launch."
            description="A disciplined, transparent delivery framework engineered to transform technical complexity into working software."
          />
        </FadeUp>

        {/* Desktop: Horizontal Flow */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative mt-16">
          {/* Subtle connecting line across steps */}
          <div
            className="absolute top-7 left-10 right-10 h-px bg-border -z-0"
            aria-hidden="true"
          />

          {STEPS.map((step, idx) => (
            <FadeUp key={step.number} delay={idx * 0.1} className="relative z-10">
              <div className="flex flex-col space-y-4 pr-4">
                <div className="w-14 h-14 rounded-xl bg-background-surface border border-border flex items-center justify-center font-mono text-sm font-bold text-accent shadow-sm">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">
                  {step.title}
                </h3>
                <p className="text-foreground-secondary text-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Mobile & Tablet: Vertical Timeline (No horizontal scroll) */}
        <div className="lg:hidden flex flex-col space-y-8 relative pl-6 border-l border-border/80 mt-12">
          {STEPS.map((step, idx) => (
            <FadeUp key={step.number} delay={idx * 0.08} className="relative">
              {/* Dot on vertical border */}
              <div
                className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background"
                aria-hidden="true"
              />
              <div className="space-y-1.5">
                <span className="font-mono text-xs text-accent font-semibold">
                  STEP {step.number}
                </span>
                <h3 className="text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
};