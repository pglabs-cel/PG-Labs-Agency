"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "./Badge";

export interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  year?: string;
  thumbnail?: string;
}

/* Map categories to a visual identity for the placeholder */
const CATEGORY_THEME: Record<
  string,
  { from: string; via: string; to: string; dots: string[]; label: string }
> = {
  "AI / Business Software": {
    from: "from-violet-900/60",
    via: "via-purple-900/40",
    to: "to-background",
    dots: ["bg-violet-400", "bg-purple-400", "bg-indigo-400"],
    label: "AI · ML · Vision",
  },
  "SaaS / EdTech": {
    from: "from-blue-900/60",
    via: "via-cyan-900/40",
    to: "to-background",
    dots: ["bg-blue-400", "bg-cyan-400", "bg-teal-400"],
    label: "SaaS · Platform",
  },
  "Web Application": {
    from: "from-emerald-900/50",
    via: "via-green-900/30",
    to: "to-background",
    dots: ["bg-emerald-400", "bg-green-400", "bg-lime-400"],
    label: "Web · Product",
  },
};

const DEFAULT_THEME = {
  from: "from-zinc-900/60",
  via: "via-zinc-800/40",
  to: "to-background",
  dots: ["bg-zinc-400", "bg-zinc-300", "bg-zinc-500"],
  label: "Digital Product",
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  slug,
  title,
  category,
  description,
  technologies,
  year = "2025",
  thumbnail,
}) => {
  const theme = CATEGORY_THEME[category] ?? DEFAULT_THEME;

  return (
    <Link
      href={`/work/${slug}`}
      className="group relative flex flex-col justify-between overflow-hidden
        rounded-2xl bg-background-secondary border border-border
        transition-all duration-300
        hover:border-accent/40 hover:bg-background-surface/80
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
    >
      {/* ── Visual Media Area ── */}
      {thumbnail ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-background-surface">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent opacity-50 pointer-events-none" />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-md border border-border text-[10px] font-mono font-medium text-accent">
            {category}
          </div>
        </div>
      ) : (
        <div
          className={`relative aspect-[16/9] w-full overflow-hidden
            bg-gradient-to-b ${theme.from} ${theme.via} ${theme.to}
            transition-transform duration-400`}
        >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"
          aria-hidden="true"
        />

        {/* Glow orb behind content */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-32 h-32 rounded-full bg-white/5 blur-2xl
            group-hover:scale-150 group-hover:bg-white/8
            transition-all duration-700"
          aria-hidden="true"
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-5">
          <Badge variant="mono" size="sm">
            {category}
          </Badge>
          <span className="font-mono text-xs text-foreground-muted">{year}</span>
        </div>

        {/* Center visual — abstract UI bars */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 py-4">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {theme.dots.map((dot, i) => (
              <div
                key={i}
                className={`rounded-full ${dot} opacity-70 group-hover:opacity-100
                  transition-all duration-500`}
                style={{
                  width: i === 1 ? "10px" : "7px",
                  height: i === 1 ? "10px" : "7px",
                  transitionDelay: `${i * 60}ms`,
                }}
              />
            ))}
          </div>

          {/* Project name in monospace */}
          <h4
            className="text-xl sm:text-2xl font-bold tracking-tight text-foreground/90
              font-mono text-center px-4 leading-tight"
          >
            {title}
          </h4>

          {/* Abstract bar graph / UI lines */}
          <div className="flex items-end gap-1 mt-1">
            {[40, 65, 50, 80, 55, 70, 45, 85, 60].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-t-sm bg-white/20 group-hover:bg-white/30
                  transition-all duration-500"
                style={{
                  height: `${h * 0.32}px`,
                  transitionDelay: `${i * 30}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-5 pb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
          <span className="text-[11px] font-mono text-foreground-muted">Production Build</span>
        </div>

        {/* Hover: subtle overlay scale */}
        <div
          className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.03]
            transition-colors duration-300"
          aria-hidden="true"
        />
      </div>
      )}

      {/* ── Card info area ── */}
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between mb-3">
          <h3
            className="text-xl sm:text-2xl font-bold text-foreground tracking-tight
              group-hover:text-accent transition-colors duration-200"
          >
            {title}
          </h3>
          <div
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center
              text-foreground-secondary
              group-hover:text-accent group-hover:border-accent/40
              group-hover:shadow-[0_0_12px_rgba(139,92,246,0.2)]
              transition-all duration-200 flex-shrink-0"
          >
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-200
                group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/60">
          {technologies.map((tech, idx) => (
            <Badge key={idx} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};