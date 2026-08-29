import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center py-20">
      <Container className="text-center max-w-xl">
        <span className="text-xs font-mono tracking-widest text-accent uppercase font-semibold px-3.5 py-1.5 rounded-full border border-border bg-background-surface mb-6 inline-block">
          404 — PAGE NOT FOUND
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-foreground-secondary text-base sm:text-lg mb-8 leading-relaxed">
          The link you followed may be broken, or the page may have been moved.
        </p>
        <div className="flex justify-center">
          <Button href="/" size="md" showArrow>
            Back to Home
          </Button>
        </div>
      </Container>
    </main>
  );
}
