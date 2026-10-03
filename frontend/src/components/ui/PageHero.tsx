"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PageHeroTag {
  label: string;
  dot?: boolean;
  dotColor?: string;
}

export interface PageHeroProps {
  badge: string;
  badgeTag?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  tags?: PageHeroTag[];
  children?: React.ReactNode;
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  badgeTag,
  title,
  subtitle,
  breadcrumbs,
  tags,
  children,
  className,
}) => {
  return (
    <section
      className={cn(
        "relative pt-20 pb-16 md:pt-28 md:pb-24 border-b border-border/60 overflow-hidden bg-background",
        className
      )}
    >
      {/* ── Top Laser Accent Light Beam ── */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-96 h-[1px] bg-gradient-to-r from-transparent via-accent/80 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-48 h-[2px] bg-accent/40 blur-[3px] z-10"
        aria-hidden="true"
      />

      {/* ── Atmospheric Multi-Layer Radial Glow ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-gradient-to-b from-accent/15 via-accent/5 to-transparent rounded-full blur-[140px] -z-0"
        aria-hidden="true"
      />

      {/* ── Vignetted Tech Grid Background ── */}
      <div
        className="pointer-events-none absolute inset-0 bg-tech-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_15%,#000_35%,transparent_100%)] opacity-75 -z-0"
        aria-hidden="true"
      />

      {/* ── Decorative Technical Studio Markers (Corner + markers) ── */}
      <div
        className="pointer-events-none absolute top-6 left-6 text-[11px] font-mono text-border/70 select-none hidden lg:block"
        aria-hidden="true"
      >
        +
      </div>
      <div
        className="pointer-events-none absolute top-6 right-6 text-[11px] font-mono text-border/70 select-none hidden lg:block"
        aria-hidden="true"
      >
        +
      </div>

      <Container className="text-center max-w-4xl relative z-10">
        {/* Optional Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 flex justify-center">
            <ol className="flex items-center gap-2 text-xs font-mono text-foreground-muted">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={crumb.url}>
                    {idx > 0 && (
                      <ChevronRight
                        className="w-3 h-3 text-border"
                        aria-hidden="true"
                      />
                    )}
                    <li>
                      {isLast ? (
                        <span
                          className="text-accent font-semibold"
                          aria-current="page"
                        >
                          {crumb.name}
                        </span>
                      ) : (
                        <Link
                          href={crumb.url}
                          className="hover:text-foreground transition-colors"
                        >
                          {crumb.name}
                        </Link>
                      )}
                    </li>
                  </React.Fragment>
                );
              })}
            </ol>
          </nav>
        )}

        <FadeUp>
          {/* Studio Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-accent/30 bg-accent/[0.08] backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.15)] mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
              aria-hidden="true"
            />
            <span className="text-[11px] font-mono tracking-widest text-accent font-semibold uppercase">
              {badge}
            </span>
            {badgeTag && (
              <>
                <span className="w-1 h-1 rounded-full bg-accent/40" />
                <span className="text-[10px] font-mono text-foreground-muted uppercase tracking-wider">
                  {badgeTag}
                </span>
              </>
            )}
          </div>

          {/* Luminous Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.08] max-w-4xl mx-auto">
            {typeof title === "string" ? (
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/70">
                {title}
              </span>
            ) : (
              title
            )}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-foreground-secondary text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-5">
              {subtitle}
            </p>
          )}

          {/* Technical Studio Telemetry Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs font-mono text-foreground-muted">
              {tags.map((tag, i) => (
                <React.Fragment key={tag.label}>
                  {i > 0 && (
                    <span className="hidden sm:inline text-border/60">•</span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-background-surface/80 border border-border/80 text-[11px] uppercase tracking-wider text-foreground-secondary/90 shadow-sm backdrop-blur-sm hover:border-accent/30 transition-colors">
                    {tag.dot && (
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          tag.dotColor || "bg-accent"
                        )}
                        aria-hidden="true"
                      />
                    )}
                    {tag.label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
        </FadeUp>

        {/* Extra children slot (e.g. Guarantee banner, filter pills) */}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
};
