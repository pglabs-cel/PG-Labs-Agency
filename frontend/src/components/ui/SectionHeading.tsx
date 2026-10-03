import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}) => {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "space-y-4 mb-12 sm:mb-16",
        isCentered ? "text-center mx-auto max-w-3xl" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <div className={cn("flex", isCentered ? "justify-center" : "justify-start")}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/25 bg-accent/[0.06] backdrop-blur-sm shadow-[0_0_16px_rgba(139,92,246,0.1)]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
              aria-hidden="true"
            />
            <p className="text-[11px] font-mono tracking-widest text-accent uppercase font-semibold">
              {eyebrow}
            </p>
          </div>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/75">
        {title}
      </h2>
      {description && (
        <p className="text-foreground-secondary text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};