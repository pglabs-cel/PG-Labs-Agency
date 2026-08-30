"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { TechIcon } from "@/components/ui/TechIcon";

const CAPABILITIES = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "AI/ML",
  "REST APIs",
  "Express",
  "Framer Motion",
];

// Duplicate for seamless infinite marquee
const DOUBLED = [...CAPABILITIES, ...CAPABILITIES];

export const Capabilities: React.FC = () => {
  return (
    <section
      className="py-10 border-y border-border/60 bg-background-secondary/40 overflow-hidden"
      aria-label="Technology capabilities"
    >
      <Container className="mb-6">
        <p className="text-xs sm:text-sm text-foreground-muted font-mono text-center tracking-widest uppercase">
          From idea to production — we build the technology behind ambitious products.
        </p>
      </Container>

      {/* Marquee strip */}
      <div className="relative">
        {/* Edge fades */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-32
            bg-gradient-to-r from-background-secondary/90 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-32
            bg-gradient-to-l from-background-secondary/90 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Scrolling track — pauses on hover */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap py-1">
          {DOUBLED.map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2.5 mx-2.5 px-4 py-2 rounded-full
                border border-border/70 bg-background-surface/80 backdrop-blur-md
                text-xs sm:text-sm font-medium text-foreground
                hover:border-accent/60 hover:text-white hover:bg-background-surface
                transition-all duration-200 cursor-default select-none shadow-sm"
            >
              <TechIcon name={tech} className="w-4 h-4 shrink-0" />
              <span className="font-mono text-xs text-foreground/90">{tech}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};