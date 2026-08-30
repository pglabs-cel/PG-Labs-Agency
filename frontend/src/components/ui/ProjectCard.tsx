"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { Badge } from "./Badge";

export interface ProjectCardProps {
  slug: string;
  title: string;
  category: string;
  categories?: string[];
  description: string;
  technologies: string[];
  year?: string;
  thumbnail?: string;
  liveUrl?: string;
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
  categories,
  description,
  technologies,
  year = "2025",
  thumbnail,
  liveUrl,
}) => {
  const allCategories =
    categories && categories.length > 0
      ? categories
      : category
      ? category.split(",").map((c) => c.trim()).filter(Boolean)
      : ["Web Application"];
  const primaryCategory = allCategories[0] || "Web Application";
  const theme = CATEGORY_THEME[primaryCategory] ?? DEFAULT_THEME;

  return (
    <div
      className="group relative flex flex-col justify-between overflow-hidden
        rounded-2xl bg-background-secondary border border-border
        transition-all duration-300
        hover:border-accent/40 hover:bg-background-surface/80
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] h-full"
    >
      {/* ── Visual Media / Image Area ── */}
      <Link
        href={`/work/${slug}`}
        className="relative aspect-[16/9] w-full overflow-hidden shrink-0 block cursor-pointer"
      >
          {thumbnail ? (
            <div className="relative w-full h-full overflow-hidden bg-background-surface">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent opacity-50 pointer-events-none" />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%] z-10">
                {allCategories.map((cat) => (
                  <span
                    key={cat}
                    className="px-2 py-0.5 rounded-md bg-background/85 backdrop-blur-md border border-border text-[10px] font-mono font-medium text-accent"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              {liveUrl && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono font-semibold text-emerald-400 flex items-center gap-1 z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE</span>
                </div>
              )}
            </div>
          ) : (
            <div
              className={`relative w-full h-full overflow-hidden
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
                <div className="flex flex-wrap gap-1 max-w-[70%]">
                  {allCategories.map((cat) => (
                    <Badge key={cat} variant="mono" size="sm">
                      {cat}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {liveUrl && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-medium">
                      LIVE
                    </span>
                  )}
                  <span className="font-mono text-xs text-foreground-muted">{year}</span>
                </div>
              </div>

              {/* Center visual — abstract UI bars */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-3 py-2">
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
                  className="text-lg sm:text-xl font-bold tracking-tight text-foreground/90
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
                        height: `${h * 0.3}px`,
                        transitionDelay: `${i * 30}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-5 pb-3 flex items-center gap-2">
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
        </Link>

      {/* ── Card Info Area (Equal Height Layout) ── */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
        <div>
          {/* Title Row with Fixed Min Height */}
          <div className="flex items-start justify-between gap-3 mb-3 min-h-[3.25rem]">
            <Link
              href={`/work/${slug}`}
              className="text-xl sm:text-2xl font-bold text-foreground tracking-tight hover:text-accent transition-colors duration-200 line-clamp-2"
            >
              <h3>{title}</h3>
            </Link>

            <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-[11px] font-mono flex items-center gap-1 transition-colors z-10"
                  title={`Open live project: ${liveUrl}`}
                >
                  <Globe className="w-3 h-3" />
                  <span className="hidden sm:inline">Live</span>
                </a>
              )}

              <Link
                href={`/work/${slug}`}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center
                  text-foreground-secondary
                  hover:text-accent hover:border-accent/40
                  hover:shadow-[0_0_12px_rgba(139,92,246,0.2)]
                  transition-all duration-200 shrink-0"
                aria-label={`View ${title} case study`}
              >
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-200
                    hover:translate-x-0.5 hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
            {description}
          </p>
        </div>

        {/* ── Technologies Fixed to Bottom ── */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/60 mt-auto">
          {technologies.map((tech, idx) => (
            <Badge key={idx} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};