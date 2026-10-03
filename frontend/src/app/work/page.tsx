"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { fetchPublicProjects, ProjectItem } from "@/lib/projects.api";
import { CANONICAL_PROJECTS } from "@/data/projectsData";
import { FadeUp } from "@/components/animations/FadeUp";
import { CtaSection } from "@/components/sections/CtaSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { cn } from "@/lib/utils";
import { ArrowRight, Compass, Cpu, TrendingUp } from "lucide-react";

const FILTER_TABS = ["All", "Web", "SaaS", "AI", "Business Software"] as const;

export default function WorkPage() {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(
    CANONICAL_PROJECTS as unknown as ProjectItem[]
  );
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    fetchPublicProjects().then((data) => {
      if (data && data.length > 0) {
        setProjectsList(data);
      }
    });
  }, []);

  const filteredProjects = projectsList.filter((project) => {
    if (activeFilter === "All") return true;

    const projectTags = [
      project.category || "",
      ...(project.categories || []),
    ].join(" ").toLowerCase();

    if (activeFilter === "Web") {
      return projectTags.includes("web");
    }
    if (activeFilter === "SaaS") {
      return projectTags.includes("saas");
    }
    if (activeFilter === "AI") {
      return projectTags.includes("ai") || projectTags.includes("vision") || projectTags.includes("yolo");
    }
    if (activeFilter === "Business Software") {
      return (
        projectTags.includes("business") ||
        projectTags.includes("software") ||
        projectTags.includes("custom")
      );
    }
    return projectTags.includes(activeFilter.toLowerCase());
  });

  return (
    <main className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Work", url: "/work" },
        ]}
      />

      {/* Portfolio Hero */}
      <PageHero
        badge="SELECTED WORK"
        badgeTag="ENGINEERING ARCHIVE"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Work", url: "/work" },
        ]}
        title={
          <>
            Things We&apos;ve{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-accent to-purple-300">
              Built.
            </span>
          </>
        }
        subtitle="A selection of products, platforms, and experiments engineered across web development, business software, and practical AI."
        tags={[
          { label: "PRODUCTION DEPLOYED", dot: true, dotColor: "bg-emerald-400" },
          { label: "REAL CLIENT CODE", dot: true, dotColor: "bg-accent" },
          { label: "FULL-STACK & APPLIED AI" },
        ]}
      />

      {/* Filter Tabs & Projects Grid */}
      <section className="py-16 md:py-24">
        <Container>
          {/* Accessible Filter Controls */}
          <div
            className="flex flex-wrap items-center justify-center gap-2.5 mb-14"
            role="tablist"
            aria-label="Project Categories"
          >
            {FILTER_TABS.map((filter) => {
              const isSelected = activeFilter === filter;
              return (
                <button
                  key={filter}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200 min-h-[44px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50",
                    isSelected
                      ? "border border-accent bg-accent/15 text-white shadow-[0_0_20px_rgba(139,92,246,0.25)] font-semibold"
                      : "border border-border bg-background-surface/50 text-foreground-secondary hover:border-accent/50 hover:text-white"
                  )}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredProjects.map((project, idx) => (
              <FadeUp key={project.slug} delay={idx * 0.08} className="h-full flex flex-col">
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  category={project.category}
                  categories={project.categories}
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
                No case studies found matching &ldquo;{activeFilter}&rdquo;.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Problem-Solving Philosophy Section (Section 18) */}
      <section className="py-20 md:py-28 bg-background-secondary/40 border-y border-border/60">
        <Container className="max-w-5xl">
          <FadeUp>
            <SectionHeading
              eyebrow="OUR PHILOSOPHY"
              title="Good Software Starts With the Right Problem."
              description="PG Labs focuses on solving operational and business bottlenecks rather than simply writing lines of code."
              align="center"
            />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FadeUp delay={0.05}>
              <div className="p-8 rounded-xl bg-background-surface border border-border space-y-4 h-full">
                <span className="text-xs font-mono font-bold text-accent px-2 py-1 rounded bg-background-secondary border border-border">
                  01 — UNDERSTAND
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  Understand the Problem
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  We interrogate the core operational constraint, the end-user workflow, and technical realities before writing any architecture plan.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="p-8 rounded-xl bg-background-surface border border-border space-y-4 h-full">
                <span className="text-xs font-mono font-bold text-accent px-2 py-1 rounded bg-background-secondary border border-border">
                  02 — BUILD
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  Engineer the Right Solution
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  Design clean user interfaces and write maintainable, modular software using modern tech stacks tailored to the business goal.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="p-8 rounded-xl bg-background-surface border border-border space-y-4 h-full">
                <span className="text-xs font-mono font-bold text-accent px-2 py-1 rounded bg-background-secondary border border-border">
                  03 — IMPROVE
                </span>
                <h3 className="text-xl font-bold text-foreground">
                  Measure, Refine & Scale
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed">
                  Track real user adoption, refine bottlenecks based on live telemetry, and scale system capacity as business demand grows.
                </p>
              </div>
            </FadeUp>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              Explore our full 5-step process <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}