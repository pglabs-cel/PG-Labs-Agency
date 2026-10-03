"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  Code2,
  TrendingUp,
  Share2,
  Palette,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface PillarCard {
  id: string;
  pillar: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  accentGradient: string;
  borderColor: string;
  features: string[];
  primaryLink: string;
  primaryLinkText: string;
  secondaryLinks: Array<{ name: string; href: string }>;
}

const PILLARS: PillarCard[] = [
  {
    id: "build",
    pillar: "BUILD",
    title: "Digital Products & Technology",
    tagline: "Websites, Web Apps & Software",
    description:
      "We design and engineer high-performance web applications, SaaS platforms, bespoke business tools, and e-commerce stores using modern, maintainable codebases.",
    icon: Code2,
    accentGradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    borderColor: "group-hover:border-violet-500/50",
    features: [
      "Custom Web Applications & SaaS (Next.js, React)",
      "WordPress & Shopify E-Commerce Development",
      "Custom Business Management Portals & ERPs",
      "Production-Grade APIs & Database Architecture",
    ],
    primaryLink: "/services/web-development",
    primaryLinkText: "Explore Build",
    secondaryLinks: [
      { name: "Web Dev", href: "/services/web-development" },
      { name: "Custom Software", href: "/services/custom-software" },
      { name: "WordPress", href: "/services/wordpress-development" },
      { name: "Shopify", href: "/services/shopify-development" },
    ],
  },
  {
    id: "grow",
    pillar: "GROW",
    title: "SEO & Performance Marketing",
    tagline: "Organic Discovery & Targeted Ads",
    description:
      "Turn your digital presence into a measurable customer acquisition engine with rigorous technical SEO, conversion-optimized funnels, and data-driven ad management.",
    icon: TrendingUp,
    accentGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderColor: "group-hover:border-emerald-500/50",
    features: [
      "Technical SEO Audits & Core Web Vitals Optimization",
      "Intent-Driven On-Page Keyword Mapping",
      "Google & Meta Paid Ad Campaigns (Search & Leads)",
    ],
    primaryLink: "/services/seo",
    primaryLinkText: "Explore Growth",
    secondaryLinks: [
      { name: "SEO & Analytics", href: "/services/seo" },
      { name: "Google & Meta Ads", href: "/services/performance-marketing" },
    ],
  },
  {
    id: "manage",
    pillar: "MANAGE",
    title: "Social Media & Digital Presence",
    tagline: "Content Strategy & Consistency",
    description:
      "Keep your business top of mind with structured monthly content planning, bespoke post graphics, video concepts, and consistent multi-channel publishing.",
    icon: Share2,
    accentGradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    borderColor: "group-hover:border-blue-500/50",
    features: [
      "Monthly Content Strategy & Editorial Calendars",
      "High-Craft Branded Graphic Design & Carousels",
      "Multi-Platform Publishing & Monthly Growth Reports",
    ],
    primaryLink: "/services/social-media-management",
    primaryLinkText: "Explore Social",
    secondaryLinks: [
      { name: "Social Content", href: "/services/social-media-management" },
      { name: "Brand Guidelines", href: "/services/branding" },
    ],
  },
  {
    id: "brand",
    pillar: "BRAND",
    title: "Identity & Creative",
    tagline: "Logos, Typography & Collateral",
    description:
      "Establish an authentic, cohesive visual identity that builds buyer confidence across all digital touchpoints and professional print materials.",
    icon: Palette,
    accentGradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    borderColor: "group-hover:border-pink-500/50",
    features: [
      "Concept-Driven Logo Design & Vector Master Files",
      "Digital Typography Systems & Curated Palettes",
      "Corporate Profiles, Pitch Decks & Luxury Print Kits",
    ],
    primaryLink: "/services/branding",
    primaryLinkText: "Explore Brand",
    secondaryLinks: [
      { name: "Logo & Identity", href: "/services/branding" },
      { name: "Business Collateral", href: "/services/business-collateral" },
    ],
  },
  {
    id: "automate",
    pillar: "AUTOMATE",
    title: "Workflows & Practical AI",
    tagline: "Integrations & Applied Machine Learning",
    description:
      "Eliminate repetitive manual friction with practical automations that sync forms, databases, WhatsApp alerts, and applied AI models built for real utility.",
    icon: Cpu,
    accentGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    borderColor: "group-hover:border-amber-500/50",
    features: [
      "Instant WhatsApp & Email Automated Lead Alerts",
      "CRM, Form & Google Spreadsheet Workflow Syncing",
      "Computer Vision (YOLO) & Custom LLM API Workflows",
    ],
    primaryLink: "/services/automation",
    primaryLinkText: "Explore Automation",
    secondaryLinks: [
      { name: "Workflow Automation", href: "/services/automation" },
      { name: "AI & Machine Learning", href: "/services/ai-solutions" },
    ],
  },
];

export const WhatWeBuildSection: React.FC = () => {
  return (
    <section id="what-we-build" className="py-14 md:py-20 scroll-mt-20">
      <Container>
        <FadeUp>
          <SectionHeading
            eyebrow="WHAT WE BUILD & DELIVER"
            title="One digital partner from product build to market scale."
            description="We bridge software engineering, performance marketing, brand identity, and workflow automation so you don’t have to juggle multiple disconnected vendors."
            className="mb-8 sm:mb-10"
          />
        </FadeUp>

        {/* 5 Pillars Bento Grid - Streamlined & Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {PILLARS.map((pillar, idx) => (
            <FadeUp
              key={pillar.id}
              delay={idx * 0.06}
              className={`h-full flex flex-col ${
                idx === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div
                className={`group h-full relative overflow-hidden rounded-2xl bg-background-secondary/80 border border-border/80 ${pillar.borderColor} transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]`}
              >
                {/* Background Ambient Glow */}
                <div
                  className={`pointer-events-none absolute -top-24 -right-24 w-52 h-52 rounded-full bg-gradient-to-br ${pillar.accentGradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-4">
                  {/* Top Bar with Pillar Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent px-2.5 py-0.5 rounded-full border border-border bg-background-surface">
                      {pillar.pillar}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-background-surface border border-border flex items-center justify-center text-foreground group-hover:text-accent group-hover:border-accent/40 transition-all">
                      <pillar.icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-white transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] font-mono text-accent/80 mt-0.5">
                      {pillar.tagline}
                    </p>
                    <p className="text-foreground-secondary text-xs sm:text-[13px] leading-relaxed mt-2">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Feature Bullets - Compact Single Line Format */}
                  <div className="pt-2.5 border-t border-border/50">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-foreground-muted/80 font-semibold mb-2">
                      Key Capabilities
                    </p>
                    <ul
                      className={`text-xs ${
                        idx === 0
                          ? "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5"
                          : "space-y-1.5"
                      }`}
                      role="list"
                    >
                      {pillar.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-foreground/90"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 text-accent shrink-0"
                            aria-hidden="true"
                          />
                          <span className="text-xs leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Links & Primary CTA */}
                <div className="relative z-10 pt-3.5 mt-3.5 border-t border-border/50 flex flex-wrap items-center justify-between gap-2">
                  {/* Secondary Quick Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {pillar.secondaryLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-background-surface/80 border border-border/70 text-foreground-secondary hover:text-white hover:border-accent/50 transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={pillar.primaryLink}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-hover transition-colors group/link ml-auto shrink-0"
                  >
                    <span>{pillar.primaryLinkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
};
