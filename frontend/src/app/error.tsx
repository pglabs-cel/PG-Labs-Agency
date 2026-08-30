"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center py-20">
      <Container className="text-center max-w-xl">
        <span className="text-xs font-mono tracking-widest text-red-400 uppercase font-semibold px-3.5 py-1.5 rounded-full border border-border bg-background-surface mb-6 inline-block">
          ERROR
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
          Something went wrong.
        </h1>
        <p className="text-foreground-secondary text-base sm:text-lg mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-2.5 rounded-xl border border-border bg-background-surface text-foreground font-medium text-sm hover:bg-background-surface/80 transition-colors"
          >
            Go Home
          </a>
        </div>
      </Container>
    </main>
  );
}
