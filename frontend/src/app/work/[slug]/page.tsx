import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProjectJsonLd } from "@/components/JsonLd";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { fetchPublicProjectBySlug } from "@/lib/projects.api";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowLeft, ArrowRight, CheckCircle2, Globe, ExternalLink } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await fetchPublicProjectBySlug(params.slug);
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

export default async function CaseStudyPage({ params }: Props) {
  const project = await fetchPublicProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const projectIndex = PROJECTS.findIndex((p) => p.slug === params.slug);
  const nextProject: ProjectItem =
    projectIndex !== -1
      ? PROJECTS[(projectIndex + 1) % PROJECTS.length]
      : PROJECTS[0];

  const allCategories =
    project.categories && project.categories.length > 0
      ? project.categories
      : project.category
      ? project.category.split(",").map((c) => c.trim()).filter(Boolean)
      : ["Web Application"];

  return (
    <main className="flex flex-col min-h-screen">
      <ProjectJsonLd
        title={project.title}
        description={project.shortDescription}
        url={`${SITE_CONFIG.url}/work/${project.slug}`}
        technologies={project.technologies}
      />

      {/* Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border/40 relative overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
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
            <div className="flex flex-wrap items-center gap-2">
              {allCategories.map((cat) => (
                <Badge key={cat} variant="accent" size="md">
                  {cat}
                </Badge>
              ))}
              <span className="font-mono text-xs text-foreground-muted ml-1">
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

            {project.liveUrl && (
              <div className="pt-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/60 font-medium text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                >
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>Visit Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Hero Visual Mockup / Video Demo */}
      <section className="py-12 -mt-10">
        <Container>
          {project.videoUrl ? (
            <div className="w-full aspect-video rounded-2xl border border-border bg-black overflow-hidden shadow-2xl relative">
              <video
                src={project.videoUrl}
                controls
                playsInline
                poster={project.thumbnail}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <LinkPreview
              url={project.liveUrl || (project.thumbnail ? project.thumbnail : "")}
              isStatic={!project.liveUrl && Boolean(project.thumbnail)}
              imageSrc={project.thumbnail || ""}
              width={280}
              height={160}
              asChild
            >
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full cursor-pointer group"
                >
                  {project.thumbnail ? (
                    <div className="w-full aspect-[21/9] rounded-2xl border border-border bg-background-secondary overflow-hidden shadow-2xl relative group-hover:border-accent/50 transition-colors">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 left-6 px-3 py-1 rounded-md bg-background/80 backdrop-blur-md border border-border text-xs font-mono text-accent">
                        {allCategories.join(" · ")} · {project.year}
                      </div>
                      <div className="absolute top-6 right-6 px-3 py-1.5 rounded-lg bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE PREVIEW ↗</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[21/9] rounded-2xl border border-border bg-background-secondary p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl group-hover:border-accent/50 transition-colors">
                      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
                      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-foreground-muted">
                        <span>{project.slug}.architecture</span>
                        <span className="text-emerald-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          STATUS: VERIFIED DEPLOYMENT · PREVIEW LIVE SITE ↗
                        </span>
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
                  )}
                </a>
              ) : (
                <div className="block w-full">
                  {project.thumbnail ? (
                    <div className="w-full aspect-[21/9] rounded-2xl border border-border bg-background-secondary overflow-hidden shadow-2xl relative">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 left-6 px-3 py-1 rounded-md bg-background/80 backdrop-blur-md border border-border text-xs font-mono text-accent">
                        {allCategories.join(" · ")} · {project.year}
                      </div>
                    </div>
                  ) : (
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
                  )}
                </div>
              )}
            </LinkPreview>
          )}
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

          {project.images && project.images.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-border/60">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Interface & System Screenshots
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-xl border border-border overflow-hidden bg-background-surface relative shadow-lg group"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} screenshot ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

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