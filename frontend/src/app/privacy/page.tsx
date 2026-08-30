import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { SITE_CONFIG } from "@/lib/constants";
import { Shield, Lock, Server, Mail, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for PG Labs — How we collect, handle, and safeguard your data when using our services and website.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | PG Labs",
    description:
      "Privacy Policy for PG Labs — How we collect, handle, and safeguard your data when using our services and website.",
    url: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 30, 2026";

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-20 bg-tech-grid border-b border-border/60">
        <Container className="max-w-4xl text-center">
          <FadeUp>
            <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border bg-background-surface text-xs font-mono text-accent">
              <Shield className="w-3.5 h-3.5" />
              <span>LEGAL &amp; COMPLIANCE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-foreground-secondary text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-4">
              Transparent, privacy-first principles governing how PG Labs collects, uses, and protects your information.
            </p>
            <p className="text-xs font-mono text-foreground-muted">
              Last updated: {lastUpdated} &bull; Effective immediately
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

              {/* 01. Overview */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    01
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Overview &amp; Philosophy
                  </h2>
                </div>
                <p>
                  At <strong className="text-foreground">PG Labs</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we respect your privacy and are committed to protecting any personal data you share with us. We are an engineering and digital product studio, not an ad network or data broker. We do not sell, rent, monetize, or trade your personal information under any circumstances.
                </p>
                <p>
                  This Privacy Policy explains what information we collect when you visit our website, submit a project inquiry, or engage our software development and AI engineering services.
                </p>
              </div>

              {/* 02. Information We Collect */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    02
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Information We Collect
                  </h2>
                </div>
                <p>We only collect information that is genuinely required to communicate with you and evaluate your software requirements:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-xl bg-background-secondary border border-border space-y-2">
                    <div className="flex items-center gap-2 text-foreground font-mono text-sm font-semibold">
                      <Mail className="w-4 h-4 text-accent" />
                      <span>Project Inquiries</span>
                    </div>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      When you submit our contact form, we collect your name, email address, company name (optional), selected project type, and inquiry message.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-background-secondary border border-border space-y-2">
                    <div className="flex items-center gap-2 text-foreground font-mono text-sm font-semibold">
                      <Server className="w-4 h-4 text-accent" />
                      <span>Technical Telemetry</span>
                    </div>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      Anonymous standard web server logs (browser user-agent, response codes, timestamp) used strictly for performance optimization and DDoS mitigation.
                    </p>
                  </div>
                </div>
              </div>

              {/* 03. How We Use Information */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    03
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    How We Use Your Information
                  </h2>
                </div>
                <ul className="space-y-2.5 list-disc list-inside">
                  <li>To review project feasibility, prepare architectural proposals, and respond to your inquiry within 24 hours.</li>
                  <li>To coordinate milestones, development sprints, and technical consultations.</li>
                  <li>To maintain security, prevent automated spam, and ensure reliable server operations.</li>
                </ul>
                <div className="p-4 rounded-xl bg-background-secondary/80 border border-border text-sm font-mono text-foreground-secondary">
                  <span className="text-emerald-400 font-semibold">&bull; NO SPAM PROMISE:</span> You will never receive marketing newsletters, cold promotional blasts, or third-party sponsor emails from us.
                </div>
              </div>

              {/* 04. Data Security & Storage */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    04
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Data Security &amp; Storage
                  </h2>
                </div>
                <p>
                  We apply enterprise engineering standards to secure all data:
                </p>
                <ul className="space-y-2 list-disc list-inside text-sm">
                  <li><strong className="text-foreground">Encryption in Transit:</strong> 100% of website traffic and API transmissions are encrypted using modern TLS/HTTPS protocols.</li>
                  <li><strong className="text-foreground">Isolated Databases:</strong> Project inquiries are persisted in secure, firewall-protected MongoDB Atlas clusters with strict role-based access.</li>
                  <li><strong className="text-foreground">Sanitization:</strong> Input fields are strictly validated and sanitized to block SQL/NoSQL injection and XSS vectors.</li>
                </ul>
              </div>

              {/* 05. Third-Party Infrastructure */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    05
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Third-Party Subprocessors
                  </h2>
                </div>
                <p>We rely on trusted cloud infrastructure providers to run our platform:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="p-4 rounded-xl bg-background-secondary border border-border">
                    <p className="font-mono font-semibold text-foreground">Vercel Inc.</p>
                    <p className="text-xs text-foreground-muted mt-1">Edge hosting &amp; frontend serverless computing.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background-secondary border border-border">
                    <p className="font-mono font-semibold text-foreground">MongoDB Atlas</p>
                    <p className="text-xs text-foreground-muted mt-1">Encrypted database storage for inquiries.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background-secondary border border-border">
                    <p className="font-mono font-semibold text-foreground">Cloudinary</p>
                    <p className="text-xs text-foreground-muted mt-1">Global CDN for optimized media and image delivery.</p>
                  </div>
                </div>
              </div>

              {/* 06. Cookies & Tracking */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    06
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Cookies &amp; Local Storage
                  </h2>
                </div>
                <p>
                  We do not use invasive third-party ad trackers, behavioral retargeting pixels, or surveillance scripts. The only client-side storage we utilize is strictly functional (e.g. temporary admin session tokens in browser local storage).
                </p>
              </div>

              {/* 07. Your Data Rights */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    07
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Your Data Rights
                  </h2>
                </div>
                <p>
                  Regardless of your jurisdiction, you have complete sovereignty over your data. At any time, you may request:
                </p>
                <ul className="space-y-2 list-disc list-inside text-sm">
                  <li>A copy of any inquiry data or contact records associated with your email.</li>
                  <li>Immediate correction of inaccurate information.</li>
                  <li>Permanent deletion of your inquiries and project records from our databases.</li>
                </ul>
              </div>

              {/* 08. Contact Information */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
                    08
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                    Contact &amp; Data Inquiries
                  </h2>
                </div>
                <p>
                  If you have any questions or wish to exercise your data privacy rights, email us directly:
                </p>
                <div className="p-5 rounded-xl bg-background-secondary border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-mono uppercase text-foreground-muted">Direct Legal Contact</p>
                    <a
                      href={`mailto:${SITE_CONFIG.links.email}`}
                      className="text-base font-bold text-foreground hover:text-accent transition-colors"
                    >
                      {SITE_CONFIG.links.email}
                    </a>
                  </div>
                  <Button href="/contact" size="sm" showArrow>
                    Contact Studio
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
