"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowUpRight, Mail } from "lucide-react";

interface ContactLinks {
  email: string;
  phone?: string;
  whatsappNumber?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export const Footer: React.FC = () => {
  const [links, setLinks] = useState<ContactLinks>({
    email: SITE_CONFIG.links.email || "pglabs.agency@gmail.com",
    phone: "",
    whatsappNumber: "",
    linkedin: "",
    twitter: "",
    github: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setLinks({
            email: data.data.email || SITE_CONFIG.links.email || "pglabs.agency@gmail.com",
            phone: data.data.phone || "",
            whatsappNumber: data.data.whatsappNumber || "",
            linkedin: data.data.linkedin || "",
            twitter: data.data.twitter || "",
            github: data.data.github || "",
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="border-t border-border bg-background-secondary text-foreground-secondary pt-16 pb-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-border/60">
          {/* Studio Info Column */}
          <div className="md:col-span-4 space-y-4">
            <Link
              href="/"
              className="group inline-flex items-center focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-xl"
              aria-label="PG Labs Home"
            >
              <div className="relative h-12 sm:h-14 w-auto rounded-xl overflow-hidden bg-black border border-border/40 group-hover:border-zinc-500 transition-all duration-200 p-1.5 flex items-center shadow-sm">
                <Image
                  src="/full-logo.jpg"
                  alt="PG Labs"
                  width={180}
                  height={56}
                  className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
            </Link>

            <div className="space-y-1">
              <p className="text-foreground font-semibold text-sm">
                Digital Products. Technology. Growth.
              </p>
              <p className="font-mono text-xs text-accent">
                BUILD • AUTOMATE • SCALE
              </p>
            </div>

            <p className="text-foreground-secondary text-sm max-w-sm leading-relaxed">
              We design, build, and grow modern web applications, digital brands, performance marketing funnels, and practical business automations.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Q3/Q4 Projects
              </span>
            </div>
          </div>

          {/* Column 2: Build & Grow */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
              BUILD & GROW
            </p>
            <ul className="space-y-2 text-xs" role="list">
              <li>
                <Link href="/services/web-development" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/wordpress-development" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  WordPress Development
                </Link>
              </li>
              <li>
                <Link href="/services/shopify-development" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Shopify Development
                </Link>
              </li>
              <li>
                <Link href="/services/custom-software" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Custom Software
                </Link>
              </li>
              <li>
                <Link href="/services/ui-ux-design" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/services/seo" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  SEO & Analytics
                </Link>
              </li>
              <li>
                <Link href="/services/performance-marketing" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Performance Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Brand & Automate */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
              BRAND & AUTOMATE
            </p>
            <ul className="space-y-2 text-xs" role="list">
              <li>
                <Link href="/services/branding" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Logo & Brand Identity
                </Link>
              </li>
              <li>
                <Link href="/services/business-collateral" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Business Collateral
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-management" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Social Media Management
                </Link>
              </li>
              <li>
                <Link href="/services/automation" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Business Automation
                </Link>
              </li>
              <li>
                <Link href="/services/backend-api-development" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Backend & APIs
                </Link>
              </li>
              <li>
                <Link href="/services/ai-solutions" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  AI & Machine Learning
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio & Connect */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
              STUDIO
            </p>
            <ul className="space-y-2 text-xs" role="list">
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Delivery Process
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Pricing & Tiers
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  About PG Labs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  Start Inquiry
                </Link>
              </li>
            </ul>

            <div className="pt-3 border-t border-border/40">
              <a
                href={`mailto:${links.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-foreground hover:text-accent transition-colors font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>Email Studio</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground-muted">
          <p>© {new Date().getFullYear()} PG Labs Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" prefetch={false} className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" prefetch={false} className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};