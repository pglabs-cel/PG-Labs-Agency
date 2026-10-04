import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  ServiceJsonLd,
  BreadcrumbJsonLd,
  FAQJsonLd,
} from "@/components/JsonLd";
import {
  SERVICES_DATA,
  getServiceBySlug,
  ServiceData,
} from "@/data/servicesData";
import { SITE_CONFIG } from "@/lib/constants";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
  Zap,
} from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const url = `${SITE_CONFIG.url}/services/${service.slug}`;

  return {
    title: service.seoTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${service.seoTitle} | PG Labs`,
      description: service.metaDescription,
      url: url,
      type: "website",
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: service.heroImage || SITE_CONFIG.fullLogoUrl,
          width: 1200,
          height: 630,
          alt: `${service.title} — PG Labs`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.seoTitle} | PG Labs`,
      description: service.metaDescription,
      images: [service.heroImage || SITE_CONFIG.fullLogoUrl],
    },
  };
}

function ServiceHeroMockup({
  service,
  priority = false,
}: {
  service: ServiceData;
  priority?: boolean;
}) {
  if (!service.heroImage) return null;

  return (
    <div className="relative group mx-auto max-w-lg lg:max-w-none w-full">
      {/* Ambient Glow */}
      <div
        className="absolute -inset-2 sm:-inset-3.5 rounded-3xl bg-gradient-to-tr from-accent/25 via-purple-600/15 to-transparent blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      {/* Window Container */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-border/80 bg-background-secondary/85 backdrop-blur-md p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group-hover:border-accent/40 transition-all duration-300">
        {/* Window Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border/60 px-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
            </div>
            <span className="text-[11px] font-mono text-foreground-muted ml-1.5 truncate max-w-[150px] sm:max-w-[200px]">
              pglabs.studio / {service.slug}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-mono text-accent font-semibold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYSTEM SPEC</span>
          </div>
        </div>

        {/* Main Illustration Surface */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mt-3 shadow-inner">
          <Image
            src={service.heroImage}
            alt={service.h1}
            fill
            priority={priority}
            unoptimized
            className="object-cover scale-[1.17] transition-transform duration-700 ease-out group-hover:scale-[1.21]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
        </div>

        {/* Window Footer / Metadata */}
        <div className="mt-3 pt-2.5 border-t border-border/50 flex items-center justify-between text-[11px] font-mono px-1">
          <span className="text-foreground-muted flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>PILLAR: {service.pillar}</span>
          </span>
          <span className="text-foreground-secondary truncate max-w-[180px] sm:max-w-none text-right">
            {service.technologies.slice(0, 3).map((t) => t.name).join(" • ")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Services", url: `${SITE_CONFIG.url}/services` },
    { name: service.title, url: `${SITE_CONFIG.url}/services/${service.slug}` },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* Structured Schema Data */}
      <ServiceJsonLd
        name={service.title}
        description={service.metaDescription}
        url={`${SITE_CONFIG.url}/services/${service.slug}`}
        serviceType={service.title}
        category={service.pillar}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FAQJsonLd faqs={service.faqs} />

      {/* ── 1. Hero & Breadcrumbs Section ───────────────────────────── */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-tech-grid border-b border-border/60 relative overflow-hidden">
        {/* Ambient Glows */}
        <div
          className="pointer-events-none absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-accent/10 blur-[140px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-10 top-1/3 w-[500px] h-[350px] rounded-full bg-purple-600/10 blur-[130px]"
          aria-hidden="true"
        />

        <Container className="relative z-10">
          {/* Breadcrumbs Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-mono text-foreground-muted">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-border" aria-hidden="true" />
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-border" aria-hidden="true" />
              </li>
              <li>
                <span className="text-accent font-semibold" aria-current="page">
                  {service.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Hero 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">
            {/* Left Column: Heading, Badges, Value, CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* Mobile Hero Visual Graphic (Displays directly above the badge on mobile only) */}
              {service.heroImage && (
                <div className="block lg:hidden w-full pb-2">
                  <FadeUp delay={0.04}>
                    <ServiceHeroMockup service={service} priority />
                  </FadeUp>
                </div>
              )}

              <FadeUp>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold px-3 py-1 rounded-full border border-accent/40 bg-accent/10">
                    {service.pillar} • {service.pillarLabel}
                  </span>
                  <span className="text-xs font-mono text-foreground-muted px-2.5 py-1 rounded-full border border-border bg-background-surface">
                    SERVICE {service.number}
                  </span>
                  {service.startingPrice && (
                    <span className="text-xs font-mono text-foreground-secondary px-2.5 py-1 rounded-full border border-border/80 bg-background-secondary">
                      Starting from {service.startingPrice}
                    </span>
                  )}
                </div>
              </FadeUp>

              <FadeUp delay={0.08}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
                  {service.h1}
                </h1>
              </FadeUp>

              <FadeUp delay={0.16}>
                <p className="text-foreground-secondary text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                  {service.intro}
                </p>
              </FadeUp>

              <FadeUp delay={0.24} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button href="/contact" size="lg" showArrow className="min-h-[48px] justify-center">
                  {service.ctaText}
                </Button>
                <Button href="/pricing" variant="outline" size="lg" className="min-h-[48px] justify-center">
                  View Starting Pricing
                </Button>
              </FadeUp>

              {/* Technical Trust Strip */}
              <FadeUp delay={0.3}>
                <div className="pt-3 border-t border-border/40 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-mono text-foreground-muted">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span>Production-ready code</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span>Direct engineering lead</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span>Transparent sprint pricing</span>
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right Column: Hero Visual Graphic in Studio Mockup Window (Laptop / Desktop only) */}
            {service.heroImage && (
              <div className="hidden lg:block lg:col-span-5 w-full">
                <FadeUp delay={0.18}>
                  <ServiceHeroMockup service={service} />
                </FadeUp>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── 2. Who It's For & Problems Solved ───────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border/60 bg-gradient-to-b from-background via-background-secondary/20 to-background">
        <Container>
          <div className="space-y-20 md:space-y-24">
            {/* 2A. Audience Fit */}
            <div className="space-y-8">
              <FadeUp>
                <div className="max-w-2xl space-y-3">
                  <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    AUDIENCE FIT
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                    Who this service is for.
                  </h2>
                  <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
                    Designed for teams, founders, and businesses that require production-grade engineering, fast execution, and zero bloated templates.
                  </p>
                </div>
              </FadeUp>

              <div
                className={`grid gap-4 sm:gap-5 ${
                  service.whoIsItFor.length === 3
                    ? "grid-cols-1 md:grid-cols-3"
                    : service.whoIsItFor.length === 4
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {service.whoIsItFor.map((item, idx) => (
                  <FadeUp key={idx} delay={idx * 0.06} className="h-full">
                    <div className="h-full group p-5 sm:p-6 rounded-2xl bg-background-surface/50 border border-border/80 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between space-y-4 hover:shadow-lg hover:shadow-accent/5">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent/20 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-accent" aria-hidden="true" />
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted font-medium">
                          PROFILE 0{idx + 1}
                        </span>
                      </div>
                      <p className="text-sm sm:text-[14.5px] font-medium text-foreground/90 group-hover:text-foreground leading-relaxed transition-colors">
                        {item}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* 2B. Operational Impact */}
            <div className="space-y-8 pt-12 border-t border-border/40">
              <FadeUp>
                <div className="max-w-2xl space-y-3">
                  <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    OPERATIONAL IMPACT
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                    Specific bottlenecks we solve.
                  </h2>
                  <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed">
                    How PG Labs replaces common agency friction, technical debt, and fragile setups with disciplined software architecture.
                  </p>
                </div>
              </FadeUp>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {service.problemsSolved.map((item, idx) => (
                  <FadeUp key={idx} delay={idx * 0.08} className="h-full">
                    <div className="h-full rounded-2xl bg-gradient-to-b from-background-surface/70 via-background-surface/30 to-background-secondary/60 border border-border/80 hover:border-accent/40 transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden shadow-sm hover:shadow-accent/5">
                      {/* Ambient hover glow */}
                      <div className="absolute -top-16 -right-16 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none group-hover:bg-accent/10 transition-colors" />

                      {/* Problem Header & Text */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-3 border-b border-border/60">
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-wider uppercase text-rose-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                            THE FRICTION
                          </span>
                          <span className="text-xs font-mono text-foreground-muted">
                            0{idx + 1} / 0{service.problemsSolved.length}
                          </span>
                        </div>
                        <p className="text-sm text-foreground-secondary leading-relaxed">
                          {item.problem}
                        </p>
                      </div>

                      {/* Visual Divider / Connector */}
                      <div className="py-4 my-2 flex items-center gap-3">
                        <div className="h-px bg-border/60 flex-1" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                          RESOLUTION
                        </span>
                        <div className="h-px bg-border/60 flex-1" />
                      </div>

                      {/* Solution Panel */}
                      <div className="space-y-2 rounded-xl bg-accent/[0.04] border border-accent/20 group-hover:border-accent/35 transition-colors p-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                            PG Labs Engineering
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground leading-relaxed">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. What We Provide & Deliverables ───────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What We Provide */}
            <div className="space-y-6">
              <FadeUp>
                <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  FULL-LIFECYCLE SCOPE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mt-2">
                  What PG Labs provides.
                </h2>
              </FadeUp>

              <ul className="space-y-3" role="list">
                {service.whatWeProvide.map((item, idx) => (
                  <FadeUp key={idx} delay={idx * 0.06}>
                    <li className="flex items-start gap-3 p-3.5 rounded-lg bg-background-secondary/60 border border-border/60 text-sm text-foreground-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  </FadeUp>
                ))}
              </ul>
            </div>

            {/* Deliverables & Technologies */}
            <div className="space-y-8">
              <div className="space-y-4">
                <FadeUp>
                  <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                    TANGIBLE ASSETS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mt-2">
                    Exact project deliverables.
                  </h2>
                </FadeUp>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.deliverables.map((deliv, idx) => (
                    <FadeUp key={idx} delay={idx * 0.05}>
                      <div className="p-3.5 rounded-xl bg-background-surface border border-border/80 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-foreground font-medium leading-snug">
                          {deliv}
                        </span>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>

              {/* Technologies / Tools Strip */}
              <div className="space-y-3 pt-6 border-t border-border/60">
                <FadeUp>
                  <p className="text-xs font-mono uppercase tracking-widest text-foreground-muted font-semibold">
                    Core Technologies & Platform Ecosystem
                  </p>
                </FadeUp>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-background-secondary text-xs font-mono text-foreground"
                    >
                      <span className="text-accent">•</span>
                      <span>{tech.name}</span>
                      <span className="text-[10px] text-foreground-muted font-normal">
                        ({tech.category})
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4. Service-Specific Process (NOT generic company steps) ─── */}
      <section className="py-20 md:py-28 border-b border-border/60 bg-tech-grid">
        <Container>
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                SERVICE DELIVERY TIMELINE
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight mt-2">
                How we deliver {service.title.toLowerCase()}.
              </h2>
              <p className="text-foreground-secondary text-sm mt-3">
                A focused workflow tailored specifically to the deliverables and milestones of this engagement.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.serviceProcess.map((step, idx) => (
              <FadeUp key={step.step} delay={idx * 0.08} className="h-full">
                <div className="h-full p-6 rounded-2xl bg-background-secondary border border-border/80 flex flex-col justify-between space-y-4 hover:border-accent/40 transition-colors">
                  <div className="space-y-3">
                    <span className="font-mono text-sm text-accent font-bold px-2.5 py-1 rounded bg-background-surface border border-border inline-block">
                      PHASE {step.step}
                    </span>
                    <h3 className="text-lg font-bold text-foreground tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-foreground-secondary text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 5. Comparison Component (where relevant) ───────────────── */}
      {service.comparison && (
        <section className="py-20 md:py-28 border-b border-border/60 bg-background-secondary/30">
          <Container className="max-w-4xl">
            <FadeUp>
              <div className="text-center mb-12">
                <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  DECISION FRAMEWORK
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight mt-2">
                  {service.comparison.title}
                </h2>
                <p className="text-foreground-secondary text-sm mt-3 max-w-2xl mx-auto">
                  {service.comparison.description}
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Option A */}
              <FadeUp delay={0.1}>
                <div className="p-6 sm:p-8 rounded-2xl bg-background-secondary border border-border space-y-6 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {service.comparison.optionA.name}
                    </h3>
                    <ul className="space-y-2.5 text-xs text-foreground-secondary" role="list">
                      {service.comparison.optionA.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3.5 rounded-xl bg-background-surface border border-border/70 text-xs font-mono">
                    <span className="text-accent font-semibold">BEST FOR: </span>
                    <span className="text-foreground-secondary">
                      {service.comparison.optionA.bestFor}
                    </span>
                  </div>
                </div>
              </FadeUp>

              {/* Option B */}
              <FadeUp delay={0.2}>
                <div className="p-6 sm:p-8 rounded-2xl bg-background-secondary border border-border space-y-6 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {service.comparison.optionB.name}
                    </h3>
                    <ul className="space-y-2.5 text-xs text-foreground-secondary" role="list">
                      {service.comparison.optionB.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3.5 rounded-xl bg-background-surface border border-border/70 text-xs font-mono">
                    <span className="text-accent font-semibold">BEST FOR: </span>
                    <span className="text-foreground-secondary">
                      {service.comparison.optionB.bestFor}
                    </span>
                  </div>
                </div>
              </FadeUp>
            </div>
          </Container>
        </section>
      )}

      {/* ── 6. Automation Flow Component (Special for /automation) ─── */}
      {service.slug === "automation" && (
        <section className="py-20 md:py-28 border-b border-border/60 bg-background-surface/30">
          <Container className="max-w-4xl">
            <FadeUp>
              <div className="text-center mb-12">
                <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  HOW DATA FLOWS
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight mt-2">
                  TRIGGER → PROCESS → ACTION
                </h2>
                <p className="text-foreground-secondary text-sm mt-3">
                  A real-world example of how we eliminate manual copying between client touchpoints:
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="p-6 sm:p-8 rounded-2xl bg-background-secondary border border-border space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center">
                  <div className="p-4 rounded-xl bg-background-surface border border-border space-y-2">
                    <span className="font-mono text-[10px] text-accent uppercase font-bold">01. TRIGGER</span>
                    <p className="text-xs font-semibold text-foreground">Website Form Submitted</p>
                    <p className="text-[11px] text-foreground-muted">Visitor requests a project quote</p>
                  </div>

                  <div className="hidden md:flex justify-center text-accent">
                    <ArrowRight className="w-5 h-5" />
                  </div>

                  <div className="p-4 rounded-xl bg-background-surface border border-border space-y-2">
                    <span className="font-mono text-[10px] text-accent uppercase font-bold">02. PROCESS</span>
                    <p className="text-xs font-semibold text-foreground">n8n / Serverless Webhook</p>
                    <p className="text-[11px] text-foreground-muted">Validates, sanitizes & logs lead</p>
                  </div>

                  <div className="hidden md:flex justify-center text-accent">
                    <ArrowRight className="w-5 h-5" />
                  </div>

                  <div className="p-4 rounded-xl bg-background-surface border border-border space-y-2">
                    <span className="font-mono text-[10px] text-accent uppercase font-bold">03. ACTION</span>
                    <p className="text-xs font-semibold text-foreground">WhatsApp + CRM Alert</p>
                    <p className="text-[11px] text-foreground-muted">Sales rep notified in &lt;10 seconds</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </Container>
        </section>
      )}

      {/* ── 7. Transparent Disclaimer (when applicable) ─────────────── */}
      {service.disclaimer && (
        <section className="py-12 border-b border-border/60 bg-background-secondary/50">
          <Container className="max-w-4xl">
            <FadeUp>
              <div className="p-5 sm:p-6 rounded-xl bg-background-surface border border-border/80 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
                    OUR COMMITMENT TO TRANSPARENCY
                  </p>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {service.disclaimer}
                  </p>
                </div>
              </div>
            </FadeUp>
          </Container>
        </section>
      )}

      {/* ── 8. Related Case Studies (Real Work) ────────────────────── */}
      {service.relatedCaseStudies && service.relatedCaseStudies.length > 0 && (
        <section className="py-20 md:py-28 border-b border-border/60">
          <Container>
            <FadeUp>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                    REAL PROJECT PROOF
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight mt-2">
                    Case studies built with this stack.
                  </h2>
                </div>
                <Link
                  href="/work"
                  className="text-xs font-mono text-foreground-secondary hover:text-accent transition-colors flex items-center gap-1 group"
                >
                  <span>View All Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.relatedCaseStudies.map((cs) => (
                <FadeUp key={cs.slug} className="h-full">
                  <div className="h-full p-6 rounded-2xl bg-background-secondary border border-border/80 flex flex-col justify-between space-y-4 hover:border-accent/40 transition-colors">
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-accent uppercase font-bold">
                        {cs.category}
                      </span>
                      <h3 className="text-xl font-bold text-foreground">
                        {cs.title}
                      </h3>
                      <p className="text-foreground-secondary text-xs leading-relaxed">
                        {cs.summary}
                      </p>
                    </div>

                    <Link
                      href={`/work/${cs.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:text-accent-hover font-semibold pt-2"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── 9. Service FAQs Accordion ──────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border/60 bg-background-secondary/30">
        <Container className="max-w-3xl">
          <FadeUp>
            <div className="text-center mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                COMMON QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight mt-2">
                {service.title} FAQs
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <FadeUp key={idx} delay={idx * 0.06}>
                <details className="group p-5 sm:p-6 rounded-xl bg-background-secondary border border-border/80 transition-all [&_summary::-webkit-details-marker]:none">
                  <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                    <h3 className="text-base sm:text-lg font-bold text-foreground pr-4 group-hover:text-accent transition-colors">
                      {faq.question}
                    </h3>
                    <span className="w-6 h-6 rounded-full bg-background-surface border border-border flex items-center justify-center text-foreground-muted group-open:rotate-45 transition-transform duration-200 shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="text-foreground-secondary text-sm leading-relaxed mt-4 pt-4 border-t border-border/40">
                    {faq.answer}
                  </p>
                </details>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 10. Related Services (Natural Internal Linking) ────────── */}
      <section className="py-16 md:py-24 border-b border-border/60">
        <Container>
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                  COMPLEMENTARY CAPABILITIES
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mt-1">
                  Related services to pair with {service.title.toLowerCase()}
                </h2>
              </div>
              <Link
                href="/services"
                className="text-xs font-mono text-foreground-secondary hover:text-accent transition-colors"
              >
                View All Services →
              </Link>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {service.relatedServices.map((rel) => (
              <FadeUp key={rel.slug}>
                <Link
                  href={`/services/${rel.slug}`}
                  className="group block p-5 rounded-xl bg-background-secondary border border-border/80 hover:border-accent/40 transition-all"
                >
                  <span className="text-[10px] font-mono text-accent uppercase font-bold">
                    {rel.pillar}
                  </span>
                  <h3 className="text-base font-bold text-foreground group-hover:text-white transition-colors mt-1 flex items-center justify-between">
                    <span>{rel.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-foreground-muted group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                </Link>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 11. Final High-Converting CTA ──────────────────────────── */}
      <section className="py-20 md:py-32 bg-tech-grid relative overflow-hidden">
        <Container className="text-center max-w-3xl">
          <FadeUp>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-bold mb-3 inline-block">
              READY TO BUILD
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
              {service.h1}
            </h2>
            <p className="text-foreground-secondary text-base sm:text-lg mb-8 max-w-xl mx-auto">
              {service.ctaSubtext}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" size="lg" showArrow>
                {service.ctaText}
              </Button>
              <Button href="/pricing" variant="outline" size="lg">
                View Pricing Breakdown
              </Button>
            </div>
          </FadeUp>
        </Container>
      </section>
    </main>
  );
}
