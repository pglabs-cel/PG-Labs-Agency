"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { fetchPublicProjects } from "@/lib/projects.api";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Web", "SaaS", "AI", "Business Software"] as const;
type FilterType = (typeof FILTERS)[number];

export default function WorkPage() {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(PROJECTS);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  useEffect(() => {
    fetchPublicProjects().then((data) => {
      if (data && data.length > 0) {
        setProjectsList(data);
      }
    });
  }, []);

  const filteredProjects = projectsList.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Web") return project.category.includes("Web");
    if (activeFilter === "SaaS") return project.category.includes("SaaS");
    if (activeFilter === "AI") return project.category.includes("AI");
    if (activeFilter === "Business Software") return project.category.includes("Business Software");
    return true;
  });

  return (
    <main className="flex flex-col min-h-screen">
      {/* Portfolio Hero */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-20 bg-tech-grid border-b border-border/60">
        <Container className="text-center max-w-3xl">
          <FadeUp>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium px-3 py-1 rounded-full border border-border bg-background-surface mb-6 inline-block">
              PORTFOLIO & CASE STUDIES
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Selected Work & Experiments
            </h1>
            <p className="text-foreground-secondary text-lg sm:text-xl leading-relaxed">
              Real platforms, automated systems, and enterprise software engineered for actual business use cases.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Filter Tabs & Projects Grid */}
      <section className="py-16 md:py-24">
        <Container>
          {/* Accessible Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14" role="tablist" aria-label="Project Categories">
            {FILTERS.map((filter) => {
              const isSelected = activeFilter === filter;
              return (
                <button
                  key={filter}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200 min-h-[42px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50",
                    isSelected
                      ? "border border-accent bg-accent/10 text-white shadow-[0_0_20px_rgba(139,92,246,0.2)] font-semibold"
                      : "border border-border bg-transparent text-foreground-secondary hover:border-accent/50 hover:text-white hover:bg-white/[0.02]"
                  )}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {filteredProjects.map((project, idx) => (
              <FadeUp key={project.slug} delay={idx * 0.08} className="h-full flex flex-col">
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  category={project.category}
                  description={project.shortDescription}
                  technologies={project.technologies}
                  year={project.year}
                  thumbnail={project.thumbnail}
                  liveUrl={project.liveUrl}
                />
              </FadeUp>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 border border-dashed border-border rounded-xl">
              <p className="text-foreground-muted font-mono text-sm">
                No case studies found under this category.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}