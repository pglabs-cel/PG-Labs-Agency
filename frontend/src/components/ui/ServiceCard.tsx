"use client";

import React, { useRef, useState } from "react";
import {
  ArrowUpRight,
  Globe,
  Brain,
  Layers,
  Layout,
  Server,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "./Badge";

const ICON_MAP: Record<string, LucideIcon> = {
  globe: Globe,
  brain: Brain,
  layers: Layers,
  layout: Layout,
  server: Server,
  workflow: Workflow,
  "01": Globe,
  "02": Brain,
  "03": Layers,
  "04": Layout,
  "05": Server,
  "06": Workflow,
};

export interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  icon?: string | LucideIcon;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  number,
  title,
  description,
  features,
  icon,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const Icon: LucideIcon =
    typeof icon === "function"
      ? icon
      : typeof icon === "string"
      ? ICON_MAP[icon.toLowerCase()] || Globe
      : ICON_MAP[number] || Globe;


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between overflow-hidden
        rounded-xl bg-background-secondary border border-border p-6 sm:p-8
        transition-all duration-300
        hover:border-accent/40 hover:bg-background-surface/80
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
    >
      {/* ── Mouse-tracking radial glow ── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500"
        style={{
          background: isHovered
            ? `radial-gradient(280px circle at ${glowPos.x}% ${glowPos.y}%, rgba(139,92,246,0.08) 0%, transparent 70%)`
            : "none",
        }}
        aria-hidden="true"
      />

      {/* ── Top gradient accent line on hover ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-accent/60 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* ── Card body ── */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-lg
              bg-background-surface border border-border
              group-hover:border-accent/50 group-hover:bg-accent/5
              group-hover:shadow-[0_0_16px_rgba(139,92,246,0.15)]
              transition-all duration-300 text-foreground group-hover:text-accent"
          >
            <Icon
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
          </div>
          <span className="font-mono text-xs text-foreground-muted tracking-wider">
            {number}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3
          flex items-center justify-between">
          <span>{title}</span>
          <ArrowUpRight
            className="w-5 h-5 text-foreground-muted opacity-0
              group-hover:opacity-100 group-hover:text-accent
              transition-all duration-200
              group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </h3>

        <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* ── Feature list ── */}
      <div className="pt-4 border-t border-border/60">
        <p className="text-xs font-mono uppercase tracking-wider text-foreground-muted mb-3">
          Capabilities
        </p>
        <div className="flex flex-wrap gap-1.5">
          {features.map((feature, idx) => (
            <Badge key={idx} variant="default" size="sm">
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};