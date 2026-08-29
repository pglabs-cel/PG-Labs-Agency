"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Sparkles, Terminal } from "lucide-react";

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const ease = [0.21, 0.47, 0.32, 0.98];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-tech-grid">
      {/* Background Soft Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[400px] sm:w-[800px] sm:h-[500px] rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Step 1: Eyebrow */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-background-surface/80 backdrop-blur-sm mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-mono tracking-widest text-accent uppercase font-medium">
            PG LABS — DIGITAL PRODUCT STUDIO
          </span>
        </motion.div>

        {/* Step 2: Headline */}
        <motion.h1
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground max-w-5xl leading-[1.1] sm:leading-[1.08] mb-6"
        >
          We Build Digital Products That Actually Work.
        </motion.h1>

        {/* Step 3: Supporting text */}
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-foreground-secondary text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Modern web applications, AI-powered solutions, and custom software built around real business problems.
        </motion.p>

        {/* Step 4: CTAs */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
        >
          <Button href="/contact" size="lg" showArrow fullWidth className="sm:w-auto">
            Start a Project
          </Button>
          <Button
            href="#work"
            variant="outline"
            size="lg"
            fullWidth
            className="sm:w-auto group"
          >
            <span>View Our Work</span>
            <ArrowDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-1 text-foreground-muted" aria-hidden="true" />
          </Button>
        </motion.div>

        {/* Step 5: Abstract Tech Visual (Restrained editorial interface) */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="w-full max-w-4xl mx-auto rounded-2xl border border-border/80 bg-background-secondary/90 backdrop-blur-md p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-foreground-muted ml-2 hidden sm:inline">
                pglabs.engine/production.ts
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Studio Engine v2.4</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-lg bg-background-surface/70 border border-border/70 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-foreground-muted">
                <span>SYSTEM_STATUS</span>
                <span className="text-emerald-400">OPTIMAL</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Zero Compromise Architecture</p>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Next.js server-first execution paired with robust microservices.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-background-surface/70 border border-border/70 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-foreground-muted">
                <span>AI_PIPELINE</span>
                <span className="text-accent">CONNECTED</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Practical Intelligence</p>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Computer vision, automation, and real business inference models.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-background-surface/70 border border-border/70 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-foreground-muted">
                <span>DELIVERY_CYCLE</span>
                <span className="text-foreground">CONTINUOUS</span>
              </div>
              <p className="text-sm font-semibold text-foreground">Production-Ready Code</p>
              <p className="text-xs text-foreground-secondary leading-relaxed">
                Built from day one for scalability, security, and low operational overhead.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};