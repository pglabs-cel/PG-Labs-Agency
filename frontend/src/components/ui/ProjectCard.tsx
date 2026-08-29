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
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  slug,
  title,
  category,
  description,
  technologies,
  year = "2025",
}) => {
  return (
    <Link
      href={`/work/${slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-background-secondary border border-border p-6 sm:p-8 transition-all duration-300 hover:border-accent/40 hover:bg-background-surface/80"
    >
      {/* Visual Mockup Canvas Placeholder with Editorial Styling */}
      <div className="relative aspect-[16/9] w-full mb-6 overflow-hidden rounded-xl border border-border bg-background-surface flex flex-col justify-between p-4 sm:p-6 transition-transform duration-300 group-hover:scale-[1.01]">
        {/* Subtle grid pattern inside card preview */}
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" aria-hidden="true" />
        
        <div className="relative z-10 flex items-center justify-between w-full">
          <Badge variant="mono" size="sm">
            {category}
          </Badge>
          <span className="font-mono text-xs text-foreground-muted">
            {year}
          </span>
        </div>

        {/* Abstract UI representation */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-2 py-4">
          <div className="w-12 h-1.5 rounded-full bg-accent/40 mb-1" />
          <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-mono">
            {title}
          </h4>
          <p className="text-xs text-foreground-muted uppercase tracking-widest font-mono">
            Interactive Product Preview
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] font-mono text-foreground-muted">Production Build</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-200">
            {title}
          </h3>
          <div className="w-8 h-8 rounded-full bg-background-surface border border-border flex items-center justify-center text-foreground-secondary group-hover:text-accent group-hover:border-accent/40 transition-all duration-200">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
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