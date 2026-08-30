"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TECHNOLOGIES, TechnologyItem } from "@/data/technologies";
import { FadeUp } from "@/components/animations/FadeUp";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";
import { Sparkles, Cpu, Layers, Server, Database, Cloud } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  frontend: Layers,
  backend: Server,
  data: Database,
  infrastructure: Cloud,
  ai: Cpu,
};

export const TechnologySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredTech, setHoveredTech] = useState<TechnologyItem | null>(null);

  const filterTabs = [
    { id: "all", label: "All Stack", count: TECHNOLOGIES.reduce((acc, cat) => acc + cat.items.length, 0) },
    ...TECHNOLOGIES.map((cat) => ({
      id: cat.id,
      label: cat.category,
      count: cat.items.length,
    })),
  ];

  const displayedGroups =
    activeCategory === "all"
      ? TECHNOLOGIES
      : TECHNOLOGIES.filter((cat) => cat.id === activeCategory);

  return (
    <section className="py-20 md:py-32 border-t border-border/60 bg-tech-grid relative overflow-hidden">
      {/* Background Soft Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-accent/10 blur-[130px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <FadeUp>
          <SectionHeading
            eyebrow="ENGINEERING STACK"
            title="Built with modern technology."
            description="We engineer high-performance systems with battle-tested frameworks, cloud infrastructure, and practical AI tooling."
          />
        </FadeUp>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-14">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 border select-none",
                  isActive
                    ? "bg-accent text-white border-accent shadow-[0_0_20px_rgba(139,92,246,0.35)] font-semibold"
                    : "bg-background-secondary/80 border-border text-foreground-secondary hover:text-white hover:border-accent/40 hover:bg-background-surface"
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-md",
                    isActive ? "bg-white/20 text-white" : "bg-background-surface text-foreground-muted"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Technology Cards Grid */}
        <motion.div
          layout
          className={cn(
            "grid gap-5 items-stretch",
            displayedGroups.length === 1
              ? "grid-cols-1 max-w-xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
          )}
        >
          <AnimatePresence mode="popLayout">
            {displayedGroups.map((group) => {
              const IconComponent = CATEGORY_ICONS[group.id] || Sparkles;
              return (
                <motion.div
                  key={group.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 sm:p-6 rounded-2xl bg-background-secondary/95 border border-border/80 hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] transition-all duration-300 flex flex-col justify-between group backdrop-blur-sm relative"
                >
                  {/* Top Category Header */}
                  <div className="border-b border-border/60 pb-4 mb-4">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs font-mono tracking-widest text-accent uppercase font-bold">
                          {group.category}
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-foreground-muted font-semibold">
                        {group.index}
                      </span>
                    </div>
                    <p className="text-[11px] text-foreground-muted truncate">
                      {group.subtitle}
                    </p>
                  </div>

                  {/* Interactive Tech Items List */}
                  <ul className="space-y-2 mb-4" role="list">
                    {group.items.map((item) => {
                      const isHovered = hoveredTech?.name === item.name;
                      return (
                        <li
                          key={item.name}
                          onMouseEnter={() => setHoveredTech(item)}
                          onMouseLeave={() => setHoveredTech(null)}
                          className={cn(
                            "p-2 rounded-xl transition-all duration-200 flex items-center justify-between border cursor-pointer select-none",
                            isHovered
                              ? "bg-accent/15 border-accent/40 text-white shadow-sm -translate-y-0.5"
                              : "bg-background-surface/50 border-border/60 text-foreground-secondary hover:border-accent/30 hover:bg-background-surface hover:text-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0">
                              <TechIcon name={item.name} className="w-4 h-4 shrink-0" />
                            </div>
                            <span className="font-mono text-xs font-medium text-foreground truncate">
                              {item.name}
                            </span>
                          </div>

                          <span
                            className={cn(
                              "text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors shrink-0",
                              isHovered
                                ? "bg-accent text-white font-semibold"
                                : "bg-background-secondary text-foreground-muted"
                            )}
                          >
                            {item.badge}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Bottom Card Summary */}
                  <div className="pt-3 border-t border-border/40 text-[10px] font-mono text-foreground-muted flex items-center justify-between">
                    <span>{group.items.length} Technologies</span>
                    <span className="text-accent/80 font-medium">Production Tested</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Live Architecture Inspector Bar */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-background-secondary/90 border border-border/80 backdrop-blur-md max-w-3xl mx-auto shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>

            <div className="min-w-0 flex-1">
              {hoveredTech ? (
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-foreground">
                      {hoveredTech.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-accent/20 text-accent font-semibold">
                      {hoveredTech.badge}
                    </span>
                  </div>
                  <p className="text-xs text-foreground-secondary leading-relaxed">
                    {hoveredTech.description}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-mono font-medium text-foreground">
                    Interactive Stack Inspector
                  </p>
                  <p className="text-xs text-foreground-muted">
                    Hover or tap any technology above to inspect how we apply it to production systems.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Architectural Guarantees Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-foreground-muted">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Zero Vendor Lock-in</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Sub-Second Response Times</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Cloud-Native Containerization</span>
          </div>
        </div>
      </Container>
    </section>
  );
};