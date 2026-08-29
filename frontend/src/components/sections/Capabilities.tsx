import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

const CAPABILITIES = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "AI/ML",
];

export const Capabilities: React.FC = () => {
  return (
    <section className="py-12 border-y border-border/60 bg-background-secondary/40">
      <Container className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <p className="text-sm sm:text-base text-foreground font-medium text-center lg:text-left max-w-md">
          From idea to production — we build the technology behind ambitious products.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CAPABILITIES.map((tech) => (
            <Badge key={tech} variant="mono" size="md">
              {tech}
            </Badge>
          ))}
        </div>
      </Container>
    </section>
  );
};