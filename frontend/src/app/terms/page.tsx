import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { SITE_CONFIG } from "@/lib/constants";
import { FileText, CheckCircle2, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms of Service and Collaboration Agreement for PG Labs digital product engineering, custom software, and studio services.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms & Conditions | PG Labs",
    description:
      "Terms of Service and Collaboration Agreement for PG Labs digital product engineering, custom software, and studio services.",
    url: "/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "August 30, 2026";

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-20 bg-tech-grid border-b border-border/60">
        <Container className="max-w-4xl text-center">
          <FadeUp>
            <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border bg-background-surface text-xs font-mono text-accent">
              <FileText className="w-3.5 h-3.5" />
              <span>TERMS OF ENGAGEMENT</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-foreground-secondary text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-4">
              Clear, engineer-first contractual terms governing our digital product engineering services and client engagements.
            </p>
            <p className="text-xs font-mono text-foreground-muted">
              Last updated: {lastUpdated} &bull; Version 1.2
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <Container className="max-w-4xl">
          <FadeUp>
            <div className="space-y-12 text-foreground-secondary text-base sm:text-lg leading-relaxed">
              
              {/* Back Link */}
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-xs font-mono text-foreground-muted hover:text-accent transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Homepage</span>
                </Link>
              </div>

              {/* 01. Agreement to Terms */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    01
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Agreement to Terms
                  </h2>
                </div>
                <p>
                  By accessing the website of <strong className="text-foreground">PG Labs</strong> (&quot;Studio&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) at <span className="font-mono text-accent">{SITE_CONFIG.url}</span> or engaging our design, engineering, or AI consultancy services, you agree to be bound by these Terms and Conditions.
                </p>
                <p>
                  If you are entering into this agreement on behalf of a company or legal entity, you represent that you have the authority to bind such entity to these terms.
                </p>
              </div>

              {/* 02. Studio Services & Scope */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    02
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Services &amp; Scope of Work
                  </h2>
                </div>
                <p>
                  PG Labs provides custom technology development services, including but not limited to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-background-secondary border border-border flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-sm font-medium text-foreground">Web Applications &amp; SaaS Platforms</span>
                  </div>
                  <div className="p-4 rounded-xl bg-background-secondary border border-border flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-sm font-medium text-foreground">Computer Vision &amp; Practical AI Models</span>
                  </div>
                  <div className="p-4 rounded-xl bg-background-secondary border border-border flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-sm font-medium text-foreground">Custom Business Management Software</span>
                  </div>
                  <div className="p-4 rounded-xl bg-background-secondary border border-border flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-sm font-medium text-foreground">High-Throughput Backend &amp; REST APIs</span>
                  </div>
                </div>
                <p className="text-sm text-foreground-muted pt-2">
                  Each bespoke engagement is governed by an agreed project statement of work (SOW) or written technical architecture specification outlining deliverables, timelines, and milestone checkpoints.
                </p>
              </div>

              {/* 03. Intellectual Property & Code Ownership */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    03
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Code Ownership &amp; IP Rights
                  </h2>
                </div>
                <p>
                  We believe in total client sovereignty and <strong className="text-foreground">zero vendor lock-in</strong>:
                </p>
                <ul className="space-y-2 list-disc list-inside text-sm">
                  <li><strong className="text-foreground">Full Custom Ownership:</strong> Upon receipt of full payment for agreed milestones, all proprietary source code, database architectures, user interface designs, and documentation developed specifically for your project become your exclusive intellectual property.</li>
                  <li><strong className="text-foreground">Open Source Hygiene:</strong> Any standard open-source libraries (e.g. Next.js, React, Node.js, FastAPI, Tailwind CSS) incorporated into deliverables remain subject to their respective open-source licenses (such as MIT or Apache 2.0).</li>
                  <li><strong className="text-foreground">Repository Handover:</strong> We transfer full administrative access to your GitHub/GitLab repositories and cloud hosting environments upon project delivery.</li>
                </ul>
              </div>

              {/* 04. Confidentiality & Non-Disclosure */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    04
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Confidentiality &amp; NDA
                  </h2>
                </div>
                <p>
                  PG Labs treats all client communications, business logic, training datasets, and trade secrets with strict confidentiality. We will never share your private business specifications, database contents, or proprietary algorithm architectures with third parties.
                </p>
                <div className="p-4 rounded-xl bg-background-secondary/80 border border-border text-sm font-mono text-foreground-secondary">
                  <span className="text-accent font-semibold">&bull; MUTUAL NDA:</span> We gladly sign mutual Non-Disclosure Agreements (NDAs) prior to in-depth architecture discovery sessions upon request.
                </div>
              </div>

              {/* 05. Milestones & Payment Terms */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    05
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Milestones &amp; Payment Terms
                  </h2>
                </div>
                <ul className="space-y-2 list-disc list-inside text-sm">
                  <li>Projects proceed based on structured milestone sprints (e.g. Discovery &amp; Architecture &rarr; Frontend &amp; UI &rarr; Backend/API &rarr; Testing &amp; Deployment).</li>
                  <li>Invoices are issued per agreed milestone deliverables. Transparent milestone sign-offs are conducted in live staging environments before release.</li>
                  <li>Scope expansions or modifications requested during development will be clearly estimated and approved in writing before execution.</li>
                </ul>
              </div>

              {/* 06. Stabilization Warranty & Maintenance */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    06
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Stabilization Warranty
                  </h2>
                </div>
                <p>
                  Every software build delivered by PG Labs includes a standard stabilization warranty period following deployment:
                </p>
                <p className="text-sm">
                  Any defects, regression bugs, or deviations from the agreed specifications reported within the warranty window will be addressed and resolved promptly at no additional cost. Ongoing infrastructure maintenance, feature additions, or cloud support are available under tailored support agreements.
                </p>
              </div>

              {/* 07. Limitation of Liability */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    07
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Limitation of Liability
                  </h2>
                </div>
                <p className="text-sm">
                  To the maximum extent permitted by applicable law, PG Labs will not be liable for any indirect, incidental, special, or consequential damages resulting from third-party server outages, DNS failures, unauthorized client credential leaks, or third-party API service downtime (such as cloud hosting providers or AI model API rate limits).
                </p>
              </div>

              {/* 08. Inquiries & Contact */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    08
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Legal Inquiries &amp; Questions
                  </h2>
                </div>
                <p>
                  For any contractual questions, bespoke statement of work requests, or legal notices, contact our core team:
                </p>
                <div className="p-5 rounded-xl bg-background-secondary border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono uppercase text-foreground-muted">Direct Email</p>
                    <a
                      href={`mailto:${SITE_CONFIG.links.email}`}
                      className="text-base font-bold text-foreground hover:text-accent transition-colors"
                    >
                      {SITE_CONFIG.links.email}
                    </a>
                  </div>
                  <Button href="/contact" size="sm" showArrow>
                    Start a Project
                  </Button>
                </div>
              </div>

            </div>
          </FadeUp>
        </Container>
      </section>
    </main>
  );
}
