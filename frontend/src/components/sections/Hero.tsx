"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.21, 0.47, 0.32, 0.98];

  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-28 md:pb-28 bg-tech-grid">
      {/* ── Multi-layer background glows ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4
          w-[700px] h-[500px] sm:w-[1000px] sm:h-[700px]
          rounded-full bg-accent/8 blur-[140px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/3
          w-[400px] h-[400px]
          rounded-full bg-violet-900/20 blur-[100px] animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0
          w-[350px] h-[350px]
          rounded-full bg-indigo-900/15 blur-[90px] animate-float-slower"
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Step 1: Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
            border border-accent/30 bg-accent/5 backdrop-blur-sm mb-8
            shadow-[0_0_20px_rgba(139,92,246,0.08)]"
        >
          {/* Animated glow ring */}
          <span className="relative flex w-2 h-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60 opacity-75" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs sm:text-sm font-mono tracking-widest text-accent uppercase font-medium">
            PG LABS — DIGITAL PRODUCT STUDIO
          </span>
          <Sparkles className="w-3.5 h-3.5 text-accent/60" aria-hidden="true" />
        </motion.div>

        {/* Step 2: Headline */}
        <motion.h1
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold tracking-tight
            text-foreground max-w-5xl leading-[1.07] sm:leading-[1.05] mb-7"
        >
          We Build Digital Products That{" "}
          <span className="text-gradient-accent relative">
            Actually Work.
            {/* Subtle glow under accent text */}
            <span
              className="absolute -inset-x-4 -bottom-2 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
              aria-hidden="true"
            />
          </span>
        </motion.h1>

        {/* Step 3: Supporting text */}
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          className="text-foreground-secondary text-lg sm:text-xl md:text-2xl
            max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Modern web applications, AI-powered solutions, and custom software built
          around real business problems.
        </motion.p>

        {/* Step 4: CTAs */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4
            w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <Button
            href="/contact"
            size="lg"
            showArrow
            fullWidth
            className="sm:w-auto"
          >
            Start a Project
          </Button>

          {/* Secondary CTA */}
          <Button
            href="#work"
            variant="outline"
            size="lg"
            showArrow
            fullWidth
            className="sm:w-auto"
          >
            View Our Work
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};