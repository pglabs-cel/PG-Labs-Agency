import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverEffect = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-background-secondary border border-border p-6 transition-all duration-300",
        hoverEffect &&
          "hover:border-border-accent hover:bg-background-surface/80 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};