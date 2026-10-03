import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactSection } from "@/components/sections/ContactSection";
import { FadeUp } from "@/components/animations/FadeUp";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SITE_CONFIG } from "@/lib/constants";
import { Mail, MessageSquare, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Start a Project With PG Labs",
  description:
    "Get in touch with PG Labs to discuss your web application, custom software, AI integration, or SaaS development project.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Start a Project With PG Labs",
    description:
      "Get in touch with PG Labs to discuss your web application, custom software, AI integration, or SaaS development project.",
    url: "/contact",
  },
};

const FAQS = [
  {
    q: "How does PG Labs work with new clients?",
    a: "We start with an initial technical discovery session to understand your business requirements, timeline, and tech constraints. We then provide a concise architectural proposal and transparent milestone pricing before starting work.",
  },
  {
    q: "What types of projects do you take on?",
    a: "We build modern Next.js/React web applications, SaaS platforms, custom business tools (inventory, internal dashboards), automated pipelines, and practical AI/computer vision integrations.",
  },
  {
    q: "How quickly can we kick off a build?",
    a: "Depending on our current deployment schedule, projects can typically start within 1 to 2 weeks following architecture approval.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. Every build includes a stabilization warranty period, optional ongoing maintenance agreements, and complete code handoff documentation.",
  },
];

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      {/* Contact Hero */}
      <PageHero
        badge="LET’S TALK"
        badgeTag="FAST RESPONSE"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
        title={
          <>
            Start a{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-accent to-purple-300">
              Project.
            </span>
          </>
        }
        subtitle="Have a problem you need solved with software, digital growth, or automation? Tell us what you’re building."
      >
        {/* Quick Contact Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-left max-w-3xl mx-auto">
          <div className="p-4 rounded-xl bg-background-surface/80 border border-border flex items-center gap-3.5 hover:border-accent/40 transition-colors shadow-sm backdrop-blur-sm">
            <div className="p-2.5 rounded-lg bg-accent/10 text-accent border border-accent/20 shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-wider text-foreground-muted">Email Direct</p>
              <a
                href={`mailto:${SITE_CONFIG.links.email}`}
                className="text-xs sm:text-sm font-medium text-foreground hover:text-accent transition-colors font-mono truncate block"
                title={SITE_CONFIG.links.email}
              >
                {SITE_CONFIG.links.email}
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-background-surface/80 border border-border flex items-center gap-3.5 hover:border-accent/40 transition-colors shadow-sm backdrop-blur-sm">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-foreground-muted">Response Time</p>
              <p className="text-xs sm:text-sm font-medium text-foreground">Under 24 Hours</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-background-surface/80 border border-border flex items-center gap-3.5 hover:border-accent/40 transition-colors shadow-sm backdrop-blur-sm">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-foreground-muted">Direct Engineering</p>
              <p className="text-xs sm:text-sm font-medium text-foreground">Talk With Builders</p>
            </div>
          </div>
        </div>
      </PageHero>

      {/* Main Interactive Form Component */}
      <ContactSection showHeading={false} className="py-12 md:py-20" />

      {/* FAQ Section */}
      <section className="py-20 md:py-28 border-t border-border/60 bg-background-secondary/30">
        <Container className="max-w-4xl">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium mb-3 inline-block">
                COMMONLY ASKED
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <FadeUp key={faq.q} delay={idx * 0.08}>
                <div className="p-6 sm:p-8 rounded-xl bg-background-secondary border border-border space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    {faq.q}
                  </h3>
                  <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}