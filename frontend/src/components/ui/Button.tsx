"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  showArrow?: boolean;
  fullWidth?: boolean;
  duration?: number;
  borderRadius?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  showArrow = false,
  fullWidth = false,
  duration,
  borderRadius,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background group select-none min-h-[44px] whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-[#111113] hover:bg-[#18181B] text-foreground hover:text-white border border-accent/50 hover:border-accent shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] active:scale-[0.98]",
    secondary:
      "bg-background-surface text-foreground hover:bg-background-surface/80 border border-border hover:border-zinc-500 hover:text-white active:scale-[0.98]",
    outline:
      "bg-transparent text-foreground border border-border hover:border-zinc-500 hover:text-white active:scale-[0.98]",
    ghost:
      "bg-transparent text-foreground-secondary hover:text-foreground hover:bg-white/[0.04] active:scale-[0.98]",
  };

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-2 min-h-[38px]",
    md: "text-sm px-5 py-2.5 gap-2 min-h-[44px]",
    lg: "text-base px-6 py-3.5 gap-2.5 min-h-[48px]",
  };

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1 text-accent shrink-0"
          aria-hidden="true"
        />
      )}
    </>
  );

  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "w-auto",
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};