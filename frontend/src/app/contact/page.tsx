import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactSection } from "@/components/sections/ContactSection";
import { FadeUp } from "@/components/animations/FadeUp";
import { SITE_CONFIG } from "@/lib/constants";
import { Mail, MessageSquare, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Start a Project With PG Labs",
  description:
    "Get in touch with PG Labs to discuss your web application, custom software, AI integration, or SaaS development project.",
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
      {/* Contact Hero */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-tech-grid border-b border-border/60">
        <Container className="max-w-4xl text-center">
          <FadeUp>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium px-3 py-1 rounded-full border border-border bg-background-surface mb-6 inline-block">
              LET’S TALK
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Start a Project
            </h1>
            <p className="text-foreground-secondary text-lg sm:text-2xl leading-relaxed max-w-xl mx-auto">
              Have a problem you need solved with software? Tell us what you’re building.
            </p>
          </FadeUp>

          {/* Quick Contact Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 text-left">
            <div className="p-4 rounded-xl bg-background-secondary border border-border flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <div>
                <p className="text-[11px] font-mono uppercase text-foreground-muted">Email Direct</p>
                <a href={`mailto:${SITE_CONFIG.links.email}`} className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                  {SITE_CONFIG.links.email}
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-background-secondary border border-border flex items-center gap-3">
              <Clock className="w-5 h-5 text-accent shrink-0" />
              <div>
                <p className="text-[11px] font-mono uppercase text-foreground-muted">Response Time</p>
                <p className="text-sm font-medium text-foreground">Within 24 Hours</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-background-secondary border border-border flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-accent shrink-0" />
              <div>
                <p className="text-[11px] font-mono uppercase text-foreground-muted">Location</p>
                <p className="text-sm font-medium text-foreground">Remote-First Studio</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Interactive Form Component */}
      <ContactSection />

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