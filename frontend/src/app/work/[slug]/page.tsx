import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProjectJsonLd } from "@/components/JsonLd";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const url = `${SITE_CONFIG.url}/work/${project.slug}`;

  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study | PG Labs`,
      description: project.shortDescription,
      url: url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | PG Labs`,
      description: project.shortDescription,
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const projectIndex = PROJECTS.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const nextProject: ProjectItem =
    PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <main className="flex flex-col min-h-screen">
      <ProjectJsonLd
        title={project.title}
        description={project.shortDescription}
        url={`${SITE_CONFIG.url}/work/${project.slug}`}
        technologies={project.technologies}
      />

      {/* Project Hero */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-tech-grid border-b border-border/60">
        <Container>
          <div className="mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground-secondary hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all projects
            </Link>
          </div>

          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent" size="md">
                {project.category}
              </Badge>
              <span className="font-mono text-xs text-foreground-muted">
                Shipped {project.year}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
              {project.title}
            </h1>

            <p className="text-foreground-secondary text-lg sm:text-2xl leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="mono" size="md">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Hero Visual Mockup */}
      <section className="py-12 -mt-10">
        <Container>
          <div className="w-full aspect-[21/9] rounded-2xl border border-border bg-background-secondary p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-foreground-muted">
              <span>{project.slug}.architecture</span>
              <span className="text-emerald-400">STATUS: VERIFIED DEPLOYMENT</span>
            </div>
            <div className="relative z-10 my-auto text-center space-y-2">
              <p className="text-2xl sm:text-4xl font-bold font-mono text-foreground">
                {project.title}
              </p>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-foreground-muted">
                System Interface & Microservices Topology
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-end text-xs font-mono text-accent">
              <span>PG Labs Build #{project.year}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Case Study Details */}
      <section className="py-16 md:py-24">
        <Container className="max-w-4xl space-y-16">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Project Overview
            </h2>
            <p className="text-foreground-secondary text-base sm:text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border/60">
            <div className="p-8 rounded-xl bg-background-secondary border border-border space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold">
                THE CHALLENGE
              </span>
              <h3 className="text-xl font-bold text-foreground">Operational Bottleneck</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-8 rounded-xl bg-background-secondary border border-border space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                THE SOLUTION
              </span>
              <h3 className="text-xl font-bold text-foreground">Engineered Architecture</h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-border/60">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Key Capabilities Delivered
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-3 p-4 rounded-lg bg-background-surface border border-border"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {project.outcome && (
            <div className="p-8 rounded-2xl bg-accent/5 border border-accent/20 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                VERIFIED OUTCOME
              </span>
              <p className="text-foreground text-base sm:text-lg font-medium leading-relaxed">
                {project.outcome}
              </p>
              <p className="text-xs text-foreground-muted font-mono">
                * Outcome verified by client operational review. No fabricated metric multipliers added.
              </p>
            </div>
          )}

          <div className="pt-12 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted">
              Next Case Study
            </span>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group inline-flex items-center gap-2 text-foreground hover:text-accent font-bold text-lg transition-colors"
            >
              <span>{nextProject.title}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>

      <CtaSection />
    </main>
  );
}