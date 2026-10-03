"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Mail,
  Code2,
  TrendingUp,
  Share2,
  Palette,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ServiceMenuItem {
  name: string;
  href: string;
  shortDesc: string;
}

interface PillarGroup {
  key: string;
  name: string;
  tagline: string;
  icon: React.ElementType;
  items: ServiceMenuItem[];
}

const PILLARS_NAV: PillarGroup[] = [
  {
    key: "BUILD",
    name: "BUILD",
    tagline: "Products & Tech",
    icon: Code2,
    items: [
      { name: "Web Development", href: "/services/web-development", shortDesc: "Next.js, React & Coded Apps" },
      { name: "WordPress Development", href: "/services/wordpress-development", shortDesc: "Clean, Fast CMS Websites" },
      { name: "Shopify Development", href: "/services/shopify-development", shortDesc: "E-Commerce Stores Built to Sell" },
      { name: "Custom Software", href: "/services/custom-software", shortDesc: "Portals & Operational Systems" },
      { name: "UI/UX Design", href: "/services/ui-ux-design", shortDesc: "Product Interfaces & Systems" },
      { name: "Backend & APIs", href: "/services/backend-api-development", shortDesc: "Scalable Server Architecture" },
    ],
  },
  {
    key: "GROW",
    name: "GROW",
    tagline: "Search & Paid Ads",
    icon: TrendingUp,
    items: [
      { name: "SEO & Analytics", href: "/services/seo", shortDesc: "Organic Search & Technical SEO" },
      { name: "Performance Marketing", href: "/services/performance-marketing", shortDesc: "Google & Meta Paid Campaigns" },
    ],
  },
  {
    key: "MANAGE",
    name: "MANAGE",
    tagline: "Digital Presence",
    icon: Share2,
    items: [
      { name: "Social Media", href: "/services/social-media-management", shortDesc: "Content & Multi-Platform Growth" },
    ],
  },
  {
    key: "BRAND",
    name: "BRAND",
    tagline: "Identity & Creative",
    icon: Palette,
    items: [
      { name: "Logo & Brand Identity", href: "/services/branding", shortDesc: "Logos & Visual Guidelines" },
      { name: "Business Collateral", href: "/services/business-collateral", shortDesc: "Brochures, Profiles & Cards" },
    ],
  },
  {
    key: "AUTOMATE",
    name: "AUTOMATE",
    tagline: "Workflows & AI",
    icon: Cpu,
    items: [
      { name: "Business Automation", href: "/services/automation", shortDesc: "n8n, Webhooks & WhatsApp" },
      { name: "AI Solutions", href: "/services/ai-solutions", shortDesc: "Computer Vision & ML Systems" },
    ],
  },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePillarsOpen, setMobilePillarsOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [pathname]);

  // Handle ESC key to close open menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setMegaMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body & document scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalDocOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalDocOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleMouseEnterMegaMenu = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeaveMegaMenu = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 180);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-200",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-b border-border/80 py-3 sm:py-3.5 shadow-sm"
            : "bg-transparent py-3.5 sm:py-5"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-xl"
            aria-label="PG Labs Home"
          >
            <div className="relative h-10 sm:h-11 md:h-12 w-auto rounded-xl overflow-hidden bg-black border border-border/40 group-hover:border-zinc-500 transition-all duration-200 p-1.5 flex items-center shadow-sm">
              <Image
                src="/full-logo.jpg"
                alt="PG Labs"
                width={160}
                height={48}
                priority
                className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {/* Services Mega-Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterMegaMenu}
              onMouseLeave={handleMouseLeaveMegaMenu}
            >
              <div className="flex items-center">
                <Link
                  href="/services"
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 flex items-center gap-1.5",
                    pathname.startsWith("/services")
                      ? "text-accent font-semibold"
                      : "text-foreground-secondary hover:bg-white/[0.03]"
                  )}
                  aria-expanded={megaMenuOpen}
                  aria-haspopup="true"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      megaMenuOpen && "rotate-180 text-accent"
                    )}
                    aria-hidden="true"
                  />
                </Link>
              </div>

              {/* Desktop Mega-Menu Dropdown Panel */}
              <AnimatePresence>
                {megaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[720px] lg:w-[860px] z-50 pointer-events-auto"
                    role="menu"
                    aria-label="Services Mega Menu"
                  >
                    <div className="rounded-2xl border border-border/90 bg-background-secondary/95 backdrop-blur-xl shadow-2xl p-6 overflow-hidden">
                      {/* Top Header */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/70">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
                            SERVICES ECOSYSTEM
                          </span>
                          <span className="text-xs text-foreground-muted font-mono">• BUILD • AUTOMATE • SCALE</span>
                        </div>
                        <Link
                          href="/services"
                          onClick={() => setMegaMenuOpen(false)}
                          className="text-xs font-mono text-foreground-secondary hover:text-accent transition-colors flex items-center gap-1 group"
                        >
                          <span>Explore All Services</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>

                      {/* 5 Pillars Grid */}
                      <div className="grid grid-cols-5 gap-4">
                        {PILLARS_NAV.map((pillar) => (
                          <div key={pillar.key} className="space-y-3">
                            <div className="flex items-center gap-1.5 pb-1 border-b border-border/40">
                              <pillar.icon className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
                              <span className="font-mono text-xs font-bold text-foreground tracking-wider">
                                {pillar.name}
                              </span>
                            </div>
                            <ul className="space-y-1.5" role="none">
                              {pillar.items.map((item) => {
                                const isCurrent = pathname === item.href;
                                return (
                                  <li key={item.href} role="none">
                                    <Link
                                      href={item.href}
                                      onClick={() => setMegaMenuOpen(false)}
                                      role="menuitem"
                                      className={cn(
                                        "block p-1.5 rounded-lg transition-all duration-150 group",
                                        isCurrent
                                          ? "bg-accent/15 text-accent"
                                          : "hover:bg-white/[0.05] text-foreground-secondary hover:text-foreground"
                                      )}
                                    >
                                      <p className="text-xs font-semibold leading-tight group-hover:text-accent transition-colors">
                                        {item.name}
                                      </p>
                                      <p className="text-[10px] text-foreground-muted line-clamp-1 mt-0.5">
                                        {item.shortDesc}
                                      </p>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Quick-Action Strip */}
                      <div className="mt-5 pt-3 border-t border-border/70 flex items-center justify-between text-xs text-foreground-muted font-mono">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-accent" />
                          <span>Need a custom architecture or technical audit?</span>
                        </span>
                        <Link
                          href="/contact"
                          onClick={() => setMegaMenuOpen(false)}
                          className="text-foreground hover:text-accent transition-colors font-medium flex items-center gap-1"
                        >
                          <span>Talk with our engineering team</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Navigation Links */}
            {NAV_LINKS.filter((l) => l.name !== "Services").map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40",
                    isActive
                      ? "text-accent font-semibold"
                      : "text-foreground-secondary hover:bg-white/[0.03]"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Primary CTA */}
          <div className="hidden md:flex items-center">
            <Button href="/contact" size="sm" showArrow>
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-foreground-secondary hover:text-foreground bg-white/[0.03] hover:bg-white/[0.06] border border-border/70 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 active:scale-95"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-foreground" aria-hidden="true" />
          </button>
        </Container>
      </header>

      {/* Mobile Animated Full-Screen Drawer (Rendered via Portal) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation Menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed inset-0 z-[100] bg-background flex flex-col h-[100dvh] w-screen overflow-hidden"
              >
                {/* Header Bar */}
                <div className="h-[64px] px-4 sm:px-6 flex items-center justify-between border-b border-border/80 bg-background/95 backdrop-blur-md shrink-0">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-xl"
                    aria-label="PG Labs Home"
                  >
                    <div className="relative h-10 w-auto rounded-xl overflow-hidden bg-black border border-border/40 group-hover:border-zinc-500 transition-all duration-200 p-1.5 flex items-center shadow-sm">
                      <Image
                        src="/full-logo.jpg"
                        alt="PG Labs"
                        width={140}
                        height={40}
                        priority
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-foreground-secondary hover:text-foreground bg-background-surface hover:bg-background-surface/80 border border-border/80 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 active:scale-95"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5 text-foreground" aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile Menu Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 flex flex-col justify-between">
                  <nav className="flex flex-col space-y-2 pt-2" aria-label="Mobile Navigation Links">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-foreground-muted px-2 pb-1">
                      Menu
                    </p>

                    {/* Services Accordion */}
                    <div className="rounded-xl border border-border/80 bg-background-secondary/60 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setMobilePillarsOpen((prev) => !prev)}
                        className="w-full flex items-center justify-between p-3.5 text-left transition-colors hover:bg-white/[0.03] min-h-[44px]"
                        aria-expanded={mobilePillarsOpen}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-accent font-semibold">01</span>
                          <span className="text-xl font-bold tracking-tight text-foreground">Services</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-foreground-muted transition-transform duration-200",
                            mobilePillarsOpen && "rotate-180 text-accent"
                          )}
                          aria-hidden="true"
                        />
                      </button>

                      <AnimatePresence>
                        {mobilePillarsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-border/60 bg-black/40 px-3 py-3 space-y-4"
                          >
                            <Link
                              href="/services"
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs font-mono font-semibold text-accent flex items-center gap-1.5 p-1.5 rounded hover:bg-accent/10"
                            >
                              <span>Explore All Services Overview</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>

                            {PILLARS_NAV.map((pillar) => (
                              <div key={pillar.key} className="space-y-1.5">
                                <p className="font-mono text-[10px] uppercase tracking-wider text-foreground-muted font-bold px-1.5 flex items-center gap-1.5">
                                  <pillar.icon className="w-3 h-3 text-accent" />
                                  <span>{pillar.name} — {pillar.tagline}</span>
                                </p>
                                <div className="grid grid-cols-1 gap-1">
                                  {pillar.items.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="text-xs text-foreground-secondary hover:text-white px-2 py-1.5 rounded-md hover:bg-white/[0.04] transition-colors flex items-center justify-between"
                                    >
                                      <span>{sub.name}</span>
                                      <ArrowUpRight className="w-3 h-3 text-foreground-muted" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Standard Links */}
                    {[
                      { name: "Work", href: "/work", number: "02", desc: "Featured client proof" },
                      { name: "Process", href: "/process", number: "03", desc: "How we engineer & ship" },
                      { name: "About", href: "/about", number: "04", desc: "Builder mindset & team" },
                      { name: "Pricing", href: "/pricing", number: "05", desc: "Starting rates & tiers" },
                      { name: "Contact", href: "/contact", number: "06", desc: "Inquire about a build" },
                    ].map((item, idx) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 min-h-[44px]",
                            isActive
                              ? "bg-accent/10 border border-accent/30 text-accent font-semibold"
                              : "hover:bg-white/[0.04] text-foreground/90 hover:text-foreground border border-transparent"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-accent/70 font-medium">
                              {item.number}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-xl font-bold tracking-tight">
                                {item.name}
                              </span>
                              <span className="text-xs text-foreground-muted font-normal">
                                {item.desc}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-foreground-muted" />
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Bottom Action Area */}
                  <div className="pt-6 pb-2 border-t border-border/80 flex flex-col gap-3.5 mt-6">
                    <Button
                      href="/contact"
                      size="lg"
                      fullWidth
                      showArrow
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Start a Project
                    </Button>

                    <a
                      href={`mailto:${SITE_CONFIG.links.email}`}
                      className="inline-flex items-center justify-center gap-2 py-2 text-xs font-mono text-foreground-secondary hover:text-foreground transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                      <span>{SITE_CONFIG.links.email}</span>
                    </a>

                    <p className="text-[11px] text-foreground-muted text-center font-mono tracking-wide">
                      {SITE_CONFIG.tagline}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};