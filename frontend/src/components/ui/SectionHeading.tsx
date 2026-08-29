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
        <div
          className={cn(
            "flex items-center gap-2",
            isCentered && "justify-center"
          )}
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <p className="text-xs sm:text-sm font-mono tracking-widest text-accent uppercase font-medium">
            {eyebrow}
          </p>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
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