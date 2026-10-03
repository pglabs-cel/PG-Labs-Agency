"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowUpRight, Mail, Instagram, Facebook, Linkedin, Twitter, Github } from "lucide-react";

function ThreadsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
    </svg>
  );
}

interface ContactLinks {
  email: string;
  phone?: string;
  whatsappNumber?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
  threads?: string;
}

export const Footer: React.FC = () => {
  const [links, setLinks] = useState<ContactLinks>({
    email: SITE_CONFIG.links.email || "pglabs.agency@gmail.com",
    phone: "",
    whatsappNumber: "",
    linkedin: "",
    twitter: "",
    github: "",
    instagram: "",
    facebook: "",
    threads: "",
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
            instagram: data.data.instagram || "",
            facebook: data.data.facebook || "",
            threads: data.data.threads || "",
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="border-t border-border bg-background-secondary text-foreground-secondary pt-16 pb-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-border/60">
          {/* Studio Info Column */}
          <div className="lg:col-span-4 md:col-span-1 space-y-4">
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
          <div className="lg:col-span-3 md:col-span-1 space-y-3">
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
          <div className="lg:col-span-2 md:col-span-1 space-y-3">
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
                <Link href="/services/ai-solutions" className="hover:text-foreground transition-colors py-0.5 inline-block">
                  AI & Machine Learning
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio & Connect */}
          <div className="lg:col-span-3 md:col-span-1 space-y-3">
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

            <div className="pt-3 border-t border-border/40 space-y-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted block mb-1.5 font-medium">
                  Direct Inquiries
                </span>
                <a
                  href={`mailto:${links.email}`}
                  className="inline-flex items-center gap-2 text-xs font-mono text-foreground hover:text-accent transition-colors py-1.5 px-3 rounded-xl bg-background-surface/90 border border-border/80 hover:border-accent/60 whitespace-nowrap group shadow-sm max-w-full overflow-hidden"
                  title={`Send email to ${links.email}`}
                >
                  <Mail className="w-3.5 h-3.5 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium truncate">{links.email}</span>
                </a>
              </div>

              {links.phone ? (
                <div>
                  <a
                    href={`tel:${links.phone}`}
                    className="inline-flex items-center gap-2 text-xs font-mono text-foreground hover:text-accent transition-colors py-1.5 px-3 rounded-xl bg-background-surface/90 border border-border/80 hover:border-accent/60 whitespace-nowrap group shadow-sm"
                  >
                    <span>{links.phone}</span>
                  </a>
                </div>
              ) : null}

              {links.whatsappNumber ? (
                <div>
                  <a
                    href={`https://wa.me/${links.whatsappNumber.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-foreground hover:text-emerald-400 transition-colors py-1.5 px-3 rounded-xl bg-background-surface/90 border border-border/80 hover:border-emerald-500/50 whitespace-nowrap group shadow-sm"
                  >
                    <span>WhatsApp ↗</span>
                  </a>
                </div>
              ) : null}

              {(links.instagram || links.facebook || links.threads || links.linkedin || links.twitter || links.github) ? (
                <div className="pt-2 border-t border-border/30">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted mb-2 font-medium">
                    Follow & Connect
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {links.instagram ? (
                      <a
                        href={links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="PG Labs on Instagram"
                        title="Instagram"
                        className="w-8 h-8 rounded-lg bg-background-surface/90 border border-border/80 hover:border-accent hover:text-accent text-foreground-secondary hover:bg-background-surface flex items-center justify-center transition-all group shadow-sm"
                      >
                        <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
                      </a>
                    ) : null}
                    {links.facebook ? (
                      <a
                        href={links.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="PG Labs on Facebook"
                        title="Facebook"
                        className="w-8 h-8 rounded-lg bg-background-surface/90 border border-border/80 hover:border-accent hover:text-accent text-foreground-secondary hover:bg-background-surface flex items-center justify-center transition-all group shadow-sm"
                      >
                        <Facebook className="w-4 h-4 transition-transform group-hover:scale-110" />
                      </a>
                    ) : null}
                    {links.threads ? (
                      <a
                        href={links.threads}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="PG Labs on Threads"
                        title="Threads"
                        className="w-8 h-8 rounded-lg bg-background-surface/90 border border-border/80 hover:border-accent hover:text-accent text-foreground-secondary hover:bg-background-surface flex items-center justify-center transition-all group shadow-sm"
                      >
                        <ThreadsIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
                      </a>
                    ) : null}
                    {links.linkedin ? (
                      <a
                        href={links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="PG Labs on LinkedIn"
                        title="LinkedIn"
                        className="w-8 h-8 rounded-lg bg-background-surface/90 border border-border/80 hover:border-accent hover:text-accent text-foreground-secondary hover:bg-background-surface flex items-center justify-center transition-all group shadow-sm"
                      >
                        <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
                      </a>
                    ) : null}
                    {links.twitter ? (
                      <a
                        href={links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="PG Labs on X (Twitter)"
                        title="X (Twitter)"
                        className="w-8 h-8 rounded-lg bg-background-surface/90 border border-border/80 hover:border-accent hover:text-accent text-foreground-secondary hover:bg-background-surface flex items-center justify-center transition-all group shadow-sm"
                      >
                        <Twitter className="w-4 h-4 transition-transform group-hover:scale-110" />
                      </a>
                    ) : null}
                    {links.github ? (
                      <a
                        href={links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="PG Labs on GitHub"
                        title="GitHub"
                        className="w-8 h-8 rounded-lg bg-background-surface/90 border border-border/80 hover:border-accent hover:text-accent text-foreground-secondary hover:bg-background-surface flex items-center justify-center transition-all group shadow-sm"
                      >
                        <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
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