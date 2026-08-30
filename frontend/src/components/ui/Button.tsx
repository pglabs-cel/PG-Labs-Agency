"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MovingBorder } from "@/components/ui/moving-border";

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
  duration = 3000,
  borderRadius = "0.75rem",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background group select-none min-h-[44px] whitespace-nowrap shrink-0";

  const variantStyles = {
    primary: "",
    secondary:
      "bg-background-surface text-foreground hover:bg-background-surface/80 border border-border hover:border-accent/40",
    outline:
      "bg-transparent text-foreground border border-border hover:border-accent/60 hover:text-white",
    ghost:
      "bg-transparent text-foreground-secondary hover:text-foreground hover:bg-white/[0.04]",
  };

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5 min-h-[36px]",
    md: "text-sm px-5 py-2.5 gap-2 min-h-[44px]",
    lg: "text-base px-6 py-3 gap-2.5 min-h-[48px]",
  };

  const dotSize = size === "sm" ? "h-12 w-12" : size === "lg" ? "h-20 w-20" : "h-16 w-16";
  const svgRadius = size === "sm" ? "8" : size === "lg" ? "14" : "12";

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

  // Moving Border Theme for Primary Buttons
  if (variant === "primary") {
    const Component = href ? Link : "button";
    const componentProps: any = href
      ? {
          href,
          onClick: props.onClick,
          className: cn(
            "relative overflow-hidden bg-transparent p-[1px] font-medium transition-all duration-200 focus:outline-none select-none whitespace-nowrap shrink-0 group inline-flex items-center justify-center cursor-pointer active:scale-[0.98]",
            fullWidth ? "w-full" : "w-auto",
            className
          ),
          style: {
            borderRadius,
            transform: "translateZ(0)",
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
            maskImage: "radial-gradient(white, black)",
          },
        }
      : {
          ...props,
          className: cn(
            "relative overflow-hidden bg-transparent p-[1px] font-medium transition-all duration-200 focus:outline-none select-none whitespace-nowrap shrink-0 group inline-flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
            fullWidth ? "w-full" : "w-auto",
            className
          ),
          style: {
            borderRadius,
            transform: "translateZ(0)",
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
            maskImage: "radial-gradient(white, black)",
          },
        };

    return (
      <Component {...componentProps}>
        {/* Animated Moving Glow Border */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            borderRadius,
            transform: "translateZ(0)",
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
            maskImage: "radial-gradient(white, black)",
          }}
        >
          <MovingBorder duration={duration} rx={svgRadius} ry={svgRadius}>
            <div
              className={cn(
                "bg-[radial-gradient(#8B5CF6_40%,#A78BFA_60%,transparent_75%)] opacity-95",
                dotSize
              )}
            />
          </MovingBorder>
        </div>

        {/* Solid Inner Button Face that masks center of the glow */}
        <div
          className={cn(
            "relative flex h-full w-full items-center justify-center border border-border/80 bg-[#111113] text-foreground font-medium antialiased transition-colors group-hover:bg-[#18181B] group-hover:text-white group-hover:border-accent/40",
            sizeStyles[size]
          )}
          style={{
            borderRadius: `calc(${borderRadius} - 1px)`,
          }}
        >
          {content}
        </div>
      </Component>
    );
  }

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