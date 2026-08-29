import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { Target, Cpu, Sparkles, TrendingUp } from "lucide-react";

const POINTS = [
  {
    title: "Business First",
    description: "We start with the problem, not the technology. Every feature must deliver verifiable operational or commercial value.",
    icon: Target,
  },
  {
    title: "Modern Stack",
    description: "We use modern tools to build maintainable and scalable products without legacy baggage or technical debt.",
    icon: Cpu,
  },
  {
    title: "AI When It Matters",
    description: "We use AI where it creates measurable value — not simply because it’s trending.",
    icon: Sparkles,
  },
  {
    title: "Built for Growth",
    description: "Products are designed with future users, features and scale in mind from the very first architecture sketch.",
    icon: TrendingUp,
  },
];

export const WhyUs: React.FC = () => {
  return (
    <section className="py-20 md:py-32 border-t border-border/60 bg-background-secondary/30">
      <Container>
        <FadeUp>
          <SectionHeading
            eyebrow="WHY PG LABS"
            title="Technology should solve problems, not create more of them."
            description="We combine engineering rigor with product intuition to ship systems that last."
          />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {POINTS.map((point, idx) => (
            <FadeUp key={point.title} delay={idx * 0.08}>
              <div className="h-full p-6 sm:p-8 rounded-xl bg-background-secondary border border-border/80 hover:border-accent/40 transition-colors flex flex-col justify-between space-y-4">
                <div className="w-10 h-10 rounded-lg bg-background-surface border border-border flex items-center justify-center text-accent">
                  <point.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-foreground-secondary text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
};