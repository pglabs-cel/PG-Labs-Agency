import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";

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
      <section className="pt-16 pb-24 md:pt-24 md:pb-32 bg-tech-grid border-b border-border/60">
        <Container className="max-w-4xl text-center">
          <FadeUp>
            <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium px-3 py-1 rounded-full border border-border bg-background-surface mb-6 inline-block">
              TECHNICAL WRITING
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Engineering Notes
            </h1>
            <p className="text-foreground-secondary text-lg sm:text-2xl leading-relaxed max-w-2xl mx-auto mb-12">
              Deep dives on full-stack architecture, machine learning in production, and lessons learned shipping digital products.
            </p>

            {/* Prepared categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
              {CATEGORIES.map((cat) => (
                <Badge key={cat} variant="mono" size="md">
                  {cat}
                </Badge>
              ))}
            </div>

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