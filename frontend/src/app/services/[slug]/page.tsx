import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
          url: SITE_CONFIG.fullLogoUrl,
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
      images: [SITE_CONFIG.fullLogoUrl],
    },
  };
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
        {/* Ambient Glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-accent/10 blur-[130px]"
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

          {/* Hero Content */}
          <div className="max-w-4xl space-y-6">
            <FadeUp>
              <div className="flex flex-wrap items-center gap-3">
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
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                {service.h1}
              </h1>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p className="text-foreground-secondary text-base sm:text-xl leading-relaxed max-w-3xl">
                {service.intro}
              </p>
            </FadeUp>

            <FadeUp delay={0.24} className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button href="/contact" size="lg" showArrow>
                {service.ctaText}
              </Button>
              <Button href="/pricing" variant="outline" size="lg">
                View Starting Pricing
              </Button>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ── 2. Who It's For & Problems Solved ───────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border/60 bg-background-secondary/20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Who It Is For */}
            <div className="lg:col-span-5 space-y-6">
              <FadeUp>
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                    AUDIENCE FIT
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Who this service is for.
                  </h2>
                </div>
              </FadeUp>

              <div className="space-y-3">
                {service.whoIsItFor.map((item, idx) => (
                  <FadeUp key={idx} delay={idx * 0.08}>
                    <div className="p-4 rounded-xl bg-background-secondary border border-border/80 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-sm text-foreground/90 leading-relaxed">{item}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Problems Solved */}
            <div className="lg:col-span-7 space-y-6">
              <FadeUp>
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                    OPERATIONAL IMPACT
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Specific bottlenecks we solve.
                  </h2>
                </div>
              </FadeUp>

              <div className="space-y-4">
                {service.problemsSolved.map((item, idx) => (
                  <FadeUp key={idx} delay={idx * 0.08}>
                    <div className="p-5 sm:p-6 rounded-xl bg-background-secondary border border-border/80 space-y-3">
                      <div className="flex items-start gap-2.5">
                        <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 shrink-0">
                          PROBLEM
                        </span>
                        <p className="text-sm text-foreground-secondary font-medium leading-relaxed">
                          {item.problem}
                        </p>
                      </div>
                      <div className="flex items-start gap-2.5 pt-2 border-t border-border/50">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                          PG LABS FIX
                        </span>
                        <p className="text-sm text-foreground font-semibold leading-relaxed">
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
