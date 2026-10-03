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
      "WordPress & Shopify Development",
      "Custom Business Management Software & Portals",
      "UI/UX Design Systems & High-Fidelity Prototypes",
      "Scalable Backend APIs & Secure Databases",
    ],
    primaryLink: "/services/web-development",
    primaryLinkText: "Explore Build Capabilities",
    secondaryLinks: [
      { name: "Web Dev", href: "/services/web-development" },
      { name: "Custom Software", href: "/services/custom-software" },
      { name: "Shopify", href: "/services/shopify-development" },
      { name: "UI/UX", href: "/services/ui-ux-design" },
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
      "Technical SEO Audits, Core Web Vitals & Schema",
      "Intent-Driven On-Page Keyword Mapping",
      "Google Ads (Search, Performance Max, YouTube)",
      "Meta Ads (Instagram & Facebook Lead Generation)",
      "GA4 & Google Tag Manager Event Tracking",
    ],
    primaryLink: "/services/seo",
    primaryLinkText: "Explore Growth Services",
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
      "Strategic Monthly Content Calendars & Hooks",
      "High-Craft Branded Graphic Design & Carousels",
      "Short-Form Video Concepts (Reels & Shorts)",
      "Multi-Platform Publishing (Instagram, LinkedIn, FB)",
      "Audience Engagement & Growth Reporting",
    ],
    primaryLink: "/services/social-media-management",
    primaryLinkText: "Explore Social Management",
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
      "Responsive Logo Variants & Social Profile Kits",
      "Digital Typography Systems & Curated Color Palettes",
      "Corporate A4 Brochures & PDF Company Profiles",
      "Luxury Business Cards & Presentation Decks",
    ],
    primaryLink: "/services/branding",
    primaryLinkText: "Explore Brand Services",
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
      "Trigger → Process → Action Workflow Engineering",
      "Instant Lead Alerts to WhatsApp & Team Email",
      "Form-to-CRM & Google Sheet Auto-Syncing",
      "Computer Vision Models for Industrial Parts (YOLO)",
      "Document Extraction & Custom LLM API Workflows",
    ],
    primaryLink: "/services/automation",
    primaryLinkText: "Explore Automation & AI",
    secondaryLinks: [
      { name: "Workflow Automation", href: "/services/automation" },
      { name: "AI & Machine Learning", href: "/services/ai-solutions" },
      { name: "Backend APIs", href: "/services/backend-api-development" },
    ],
  },
];

export const WhatWeBuildSection: React.FC = () => {
  return (
    <section id="what-we-build" className="py-20 md:py-32 scroll-mt-20">
      <Container>
        <FadeUp>
          <SectionHeading
            eyebrow="WHAT WE BUILD & DELIVER"
            title="One digital partner from product build to market scale."
            description="We bridge software engineering, performance marketing, brand identity, and workflow automation so you don’t have to juggle multiple disconnected vendors."
          />
        </FadeUp>

        {/* 5 Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PILLARS.map((pillar, idx) => (
            <FadeUp
              key={pillar.id}
              delay={idx * 0.08}
              className={`h-full flex flex-col ${
                idx === 0 ? "lg:col-span-2" : idx === 3 ? "lg:col-span-1" : ""
              }`}
            >
              <div
                className={`group h-full relative overflow-hidden rounded-2xl bg-background-secondary/80 border border-border/80 ${pillar.borderColor} transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]`}
              >
                {/* Background Ambient Glow */}
                <div
                  className={`pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full bg-gradient-to-br ${pillar.accentGradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-6">
                  {/* Top Bar with Pillar Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent px-3 py-1 rounded-full border border-border bg-background-surface">
                      {pillar.pillar}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-background-surface border border-border flex items-center justify-center text-foreground group-hover:text-accent group-hover:border-accent/40 transition-all">
                      <pillar.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-white transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-accent/80 mt-1">
                      {pillar.tagline}
                    </p>
                    <p className="text-foreground-secondary text-sm leading-relaxed mt-3">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted font-semibold">
                      Key Capabilities
                    </p>
                    <ul className="space-y-2 text-xs" role="list">
                      {pillar.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-foreground/90">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Links */}
                <div className="relative z-10 pt-6 mt-6 border-t border-border/60 space-y-3">
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
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors group/link pt-1"
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
