"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import { Target, Cpu, Sparkles, TrendingUp } from "lucide-react";

const POINTS = [
  {
    title: "Business First",
    description:
      "We start with the problem, not the technology. Every feature must deliver verifiable operational or commercial value.",
    icon: Target,
    accent: "from-violet-500/20 to-transparent",
    border: "group-hover:border-violet-500/40",
    iconBg: "group-hover:bg-violet-500/10 group-hover:border-violet-500/30",
    iconColor: "group-hover:text-violet-400",
  },
  {
    title: "Modern Stack",
    description:
      "We use modern tools to build maintainable and scalable products without legacy baggage or technical debt.",
    icon: Cpu,
    accent: "from-blue-500/20 to-transparent",
    border: "group-hover:border-blue-500/40",
    iconBg: "group-hover:bg-blue-500/10 group-hover:border-blue-500/30",
    iconColor: "group-hover:text-blue-400",
  },
  {
    title: "AI When It Matters",
    description:
      "We use AI where it creates measurable value — not simply because it's trending.",
    icon: Sparkles,
    accent: "from-accent/20 to-transparent",
    border: "group-hover:border-accent/40",
    iconBg: "group-hover:bg-accent/10 group-hover:border-accent/30",
    iconColor: "group-hover:text-accent",
  },
  {
    title: "Built for Growth",
    description:
      "Products are designed with future users, features and scale in mind from the very first architecture sketch.",
    icon: TrendingUp,
    accent: "from-emerald-500/20 to-transparent",
    border: "group-hover:border-emerald-500/40",
    iconBg: "group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30",
    iconColor: "group-hover:text-emerald-400",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {POINTS.map((point, idx) => (
            <FadeUp key={point.title} delay={idx * 0.08}>
              <div
                className={`group h-full relative overflow-hidden
                  p-6 sm:p-8 rounded-xl bg-background-secondary
                  border border-border/80 ${point.border}
                  transition-all duration-300 cursor-default
                  hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]`}
              >
                {/* Subtle diagonal gradient accent on hover */}
                <div
                  className={`absolute -top-16 -right-16 w-40 h-40 rounded-full
                    bg-gradient-to-br ${point.accent} blur-2xl
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  aria-hidden="true"
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px
                    bg-gradient-to-r from-transparent via-white/10 to-transparent
                    group-hover:via-white/20 transition-colors duration-300"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex flex-col justify-between space-y-5 h-full">
                  <div
                    className={`w-11 h-11 rounded-lg bg-background-surface border border-border
                      ${point.iconBg} ${point.iconColor}
                      flex items-center justify-center text-foreground-muted
                      transition-all duration-300`}
                  >
                    <point.icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-foreground-secondary text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
};