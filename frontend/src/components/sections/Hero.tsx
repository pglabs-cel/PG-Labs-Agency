"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  ArrowDown,
  Sparkles,
  Zap,
  Shield,
  GitBranch,
  Activity,
  CheckCircle2,
  Code2,
  Cpu,
} from "lucide-react";

/* ─── floating mini-cards shown behind the hero visual ─── */
const FloatingCard = ({
  className,
  children,
  delay = 0,
  animClass = "animate-float",
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  animClass?: string;
}) => (
  <div
    className={`absolute hidden xl:flex flex-col gap-1 px-3 py-2.5 rounded-xl
      border border-border/60 bg-background-secondary/90 backdrop-blur-md
      shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${animClass} pointer-events-none z-20 ${className}`}
    style={{ animationDelay: `${delay}s` }}
    aria-hidden="true"
  >
    {children}
  </div>
);

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const ease = [0.21, 0.47, 0.32, 0.98];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-36 bg-tech-grid">

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

      {/* ── Floating tech cards (decorative, desktop only) ── */}
      <FloatingCard className="left-6 xl:left-16 top-32" delay={0} animClass="animate-float">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          </div>
          <span className="text-[11px] font-mono text-foreground-muted">build passed</span>
        </div>
        <div className="text-[11px] font-mono text-foreground/60 pl-7">100% coverage</div>
      </FloatingCard>

      <FloatingCard className="right-6 xl:right-20 top-40" delay={1.5} animClass="animate-float-slow">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-accent" />
          <span className="text-[11px] font-mono text-foreground-muted">AI pipeline</span>
          <span className="text-[10px] font-mono text-accent ml-auto">LIVE</span>
        </div>
        <div className="flex gap-1 mt-1">
          {[65, 80, 45, 90, 70, 85, 60].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-accent/60"
              style={{ height: `${h * 0.2}px` }}
            />
          ))}
        </div>
      </FloatingCard>

      <FloatingCard className="left-8 xl:left-24 bottom-52" delay={3} animClass="animate-float-slower">
        <div className="flex items-center gap-2">
          <GitBranch className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-[11px] font-mono text-foreground-muted">main</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-mono text-foreground/50">deploy ready</span>
        </div>
      </FloatingCard>

      <FloatingCard className="right-8 xl:right-28 bottom-44" delay={0.8} animClass="animate-float">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-mono text-foreground-muted">security</span>
        </div>
        <div className="text-[10px] font-mono text-emerald-400/80 mt-0.5">A+ rating</div>
      </FloatingCard>

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
            w-full sm:w-auto mb-20"
        >
          {/* Primary CTA with shimmer class */}
          <Button
            href="/contact"
            size="lg"
            showArrow
            fullWidth
            className="sm:w-auto btn-shimmer"
          >
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
            <ArrowDown
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-y-1 text-foreground-muted"
              aria-hidden="true"
            />
          </Button>
        </motion.div>

        {/* Step 5: Rich animated hero visual */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="w-full max-w-4xl mx-auto rounded-2xl border border-border/80
            bg-background-secondary/95 backdrop-blur-md overflow-hidden
            shadow-card-elevated"
        >
          {/* ── Window chrome bar ── */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-border/60
              bg-gradient-to-r from-background-surface/80 via-background-secondary to-background-surface/80"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-default" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-default" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors cursor-default" />
              <span className="text-xs font-mono text-foreground-muted ml-3 hidden sm:inline select-none">
                pglabs.engine / production.ts
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-foreground-muted">
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>TypeScript</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-accent">
                <span className="relative flex w-2 h-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50 opacity-75" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
                </span>
                <span>Studio Engine v2.4</span>
              </div>
            </div>
          </div>

          {/* ── Main content area: code + panels ── */}
          <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border/50">

            {/* Left: Terminal / Code block */}
            <div className="md:col-span-3 p-5 sm:p-6 font-mono text-xs leading-6 bg-background/60 relative overflow-hidden">
              {/* Subtle scanline gradient */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)",
                }}
                aria-hidden="true"
              />
              {/* Comment line */}
              <div className="text-foreground-muted/50 mb-1 code-line code-line-1">
                <span>{"// Building production-grade systems"}</span>
              </div>

              {/* Code lines */}
              <div className="text-violet-400 code-line code-line-2">
                <span className="text-blue-400">const</span>{" "}
                <span className="text-foreground/80">engine</span>{" "}
                <span className="text-foreground-muted">=</span>{" "}
                <span className="text-emerald-400">new</span>{" "}
                <span className="text-accent">PGLabs</span>
                <span className="text-foreground-muted">({"{"}</span>
              </div>
              <div className="pl-4 text-foreground-secondary code-line code-line-3">
                <span className="text-amber-400">stack</span>
                <span className="text-foreground-muted">:</span>{" "}
                <span className="text-emerald-300">&apos;Next.js + Node + AI&apos;</span>
                <span className="text-foreground-muted">,</span>
              </div>
              <div className="pl-4 text-foreground-secondary code-line code-line-4">
                <span className="text-amber-400">deploy</span>
                <span className="text-foreground-muted">:</span>{" "}
                <span className="text-emerald-300">&apos;production&apos;</span>
                <span className="text-foreground-muted">,</span>
              </div>
              <div className="text-foreground-muted/70">{"}"}<span className="text-foreground-muted">);</span></div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-emerald-400">▶</span>
                <span className="text-foreground-muted">Ready in </span>
                <span className="text-foreground/80">847ms</span>
                <span className="text-foreground-muted ml-auto animate-blink-cursor">█</span>
              </div>

              {/* Status row */}
              <div className="mt-4 pt-4 border-t border-border/40 flex flex-wrap gap-3">
                {[
                  { label: "Build", value: "passing", color: "text-emerald-400" },
                  { label: "Tests", value: "100%", color: "text-emerald-400" },
                  { label: "Perf", value: "A+", color: "text-accent" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span className="text-foreground-muted">{s.label}:</span>
                    <span className={s.color}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Status cards */}
            <div className="md:col-span-2 flex flex-col divide-y divide-border/50">

              {/* Card 1 */}
              <div className="p-4 sm:p-5 space-y-2 group hover:bg-background-surface/30 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Zap className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-mono text-foreground-muted uppercase tracking-wider">Performance</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                    OPTIMAL
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Zero-Compromise Architecture
                </p>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  Server-first Next.js execution with robust microservices.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 sm:p-5 space-y-2 group hover:bg-background-surface/30 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                      <Cpu className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-mono text-foreground-muted uppercase tracking-wider">AI Pipeline</span>
                  </div>
                  <span className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded">
                    CONNECTED
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Practical Intelligence
                </p>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  Vision, automation, and real business inference models.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 sm:p-5 space-y-2 group hover:bg-background-surface/30 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <GitBranch className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-mono text-foreground-muted uppercase tracking-wider">Delivery</span>
                  </div>
                  <span className="text-[10px] font-mono text-foreground/60 bg-white/5 px-1.5 py-0.5 rounded">
                    CONTINUOUS
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Production-Ready Code
                </p>
                <p className="text-xs text-foreground-secondary leading-relaxed">
                  Built for scalability, security, and low overhead from day one.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};