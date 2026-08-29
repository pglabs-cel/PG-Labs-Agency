import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "mono";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-medium rounded-md tracking-wide transition-colors";

  const variantStyles = {
    default: "bg-background-surface text-foreground-secondary border border-border",
    accent: "bg-accent/10 text-accent border border-accent/20",
    outline: "bg-transparent text-foreground-muted border border-border",
    mono: "bg-background-surface text-foreground-secondary border border-border font-mono uppercase tracking-wider",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </span>
  );
};