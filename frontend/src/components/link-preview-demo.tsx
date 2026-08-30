"use client";

import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";

export default function LinkPreviewDemo() {
  return (
    <div className="flex justify-center items-center h-[40rem] flex-col px-4">
      <p className="text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10 text-center">
        <LinkPreview url="https://tailwindcss.com" className="font-bold text-foreground hover:text-accent">
          Tailwind CSS
        </LinkPreview>{" "}
        and{" "}
        <LinkPreview url="https://framer.com/motion" className="font-bold text-foreground hover:text-accent">
          Framer Motion
        </LinkPreview>{" "}
        are a great way to build modern websites.
      </p>
      <p className="text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto text-center">
        Visit{" "}
        <LinkPreview
          url="https://ui.aceternity.com"
          className="font-bold text-accent"
        >
          Aceternity UI
        </LinkPreview>{" "}
        for amazing Tailwind and Framer Motion components.
      </p>
    </div>
  );
}
