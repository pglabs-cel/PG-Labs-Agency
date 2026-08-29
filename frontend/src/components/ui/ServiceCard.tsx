import React from "react";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./Badge";

export interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  number,
  title,
  description,
  features,
  icon: Icon,
}) => {
  return (
    <Card
      hoverEffect
      className="group relative flex flex-col justify-between overflow-hidden p-6 sm:p-8"
    >
      {/* Soft accent background glow on hover */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-2xl"
        aria-hidden="true"
      />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-background-surface border border-border group-hover:border-accent/40 group-hover:text-accent transition-colors duration-200 text-foreground">
            <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
          </div>
          <span className="font-mono text-xs text-foreground-muted tracking-wider">
            {number}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3 flex items-center justify-between">
          <span>{title}</span>
          <ArrowUpRight
            className="w-5 h-5 text-foreground-muted opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent"
            aria-hidden="true"
          />
        </h3>

        <p className="text-foreground-secondary text-sm sm:text-base leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-border/60">
        <p className="text-xs font-mono uppercase tracking-wider text-foreground-muted mb-3">
          Capabilities
        </p>
        <div className="flex flex-wrap gap-1.5">
          {features.map((feature, idx) => (
            <Badge key={idx} variant="default" size="sm">
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};