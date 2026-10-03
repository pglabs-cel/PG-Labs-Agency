import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";

import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Engineering Notes & Insights",
  description:
    "Technical articles, case study breakdowns, and architectural patterns from the PG Labs engineering team.",
};

const CATEGORIES = [
  "Web Development",
  "AI & Computer Vision",
  "Software Engineering",
  "Product Architecture",
  "Case Studies",
];

export default function BlogPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <PageHero
        badge="TECHNICAL WRITING"
        badgeTag="ENGINEERING DISPATCHES"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
        title={
          <>
            Engineering{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-accent to-purple-300">
              Notes & Insights.
            </span>
          </>
        }
        subtitle="Deep dives on full-stack architecture, machine learning in production, and lessons learned shipping digital products."
      >
        {/* Prepared categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
          {CATEGORIES.map((cat) => (
            <Badge key={cat} variant="mono" size="md">
              {cat}
            </Badge>
          ))}
        </div>
      </PageHero>

      <section className="py-20 md:py-28">
        <Container className="max-w-4xl text-center">
          <FadeUp>
            {/* Architecture placeholder */}
            <div className="p-8 sm:p-12 rounded-2xl bg-background-secondary border border-border text-center space-y-4 max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono font-bold flex items-center justify-center mx-auto text-sm">
                v1.0
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                First technical essays publishing soon
              </h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                We are currently authoring our detailed case writeup on production YOLO model deployment with FastAPI. Check back soon or subscribe via our direct inquiry channel.
              </p>
              <div className="pt-2">
                <Button href="/contact" variant="secondary" size="sm">
                  Get notified when articles drop
                </Button>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>
    </main>
  );
}