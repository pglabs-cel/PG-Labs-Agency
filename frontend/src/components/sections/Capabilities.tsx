"use client";

import React from "react";
import { Container } from "@/components/ui/Container";

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
  "TypeScript",
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
        <p className="text-sm sm:text-base text-foreground-muted font-mono text-center tracking-wider uppercase">
          From idea to production — we build the technology behind ambitious products.
        </p>
      </Container>

      {/* Marquee strip */}
      <div className="relative">
        {/* Edge fades */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-32
            bg-gradient-to-r from-background-secondary/80 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-32
            bg-gradient-to-l from-background-secondary/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Scrolling track — pauses on hover */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
          {DOUBLED.map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 mx-3 px-4 py-2 rounded-full
                border border-border/60 bg-background-surface/60 backdrop-blur-sm
                text-sm font-mono text-foreground-secondary
                hover:border-accent/40 hover:text-foreground
                transition-colors duration-200 cursor-default select-none"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0"
                aria-hidden="true"
              />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};