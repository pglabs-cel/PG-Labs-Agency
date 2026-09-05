"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const MOBILE_MENU_ITEMS = [
  {
    name: "Services",
    href: "/services",
    number: "01",
    description: "Web, SaaS & AI solutions",
  },
  {
    name: "Work",
    href: "/work",
    number: "02",
    description: "Featured client projects",
  },
  {
    name: "Process",
    href: "/#process",
    number: "03",
    description: "How we build & ship",
  },
  {
    name: "About",
    href: "/about",
    number: "04",
    description: "Studio mindset & team",
  },
  {
    name: "Contact",
    href: "/contact",
    number: "05",
    description: "Start your project inquiry",
  },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body & document scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalDocOverflow = document.documentElement.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalDocOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-250",
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
              <img
                src="/full-logo.jpg"
                alt="PG Labs"
                className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 py-1 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 rounded",
                    isActive ? "text-accent font-semibold" : "text-foreground-secondary"
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

      {/* Mobile Animated Full-Screen Overlay (Rendered via Portal to eliminate containing-block clipping) */}
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
                {/* Mobile Menu Top Header Bar */}
                <div className="h-[64px] px-4 sm:px-6 flex items-center justify-between border-b border-border/80 bg-background/95 backdrop-blur-md shrink-0">
                  {/* Brand Logo */}
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-xl"
                    aria-label="PG Labs Home"
                  >
                    <div className="relative h-10 w-auto rounded-xl overflow-hidden bg-black border border-border/40 group-hover:border-zinc-500 transition-all duration-200 p-1.5 flex items-center shadow-sm">
                      <img
                        src="/full-logo.jpg"
                        alt="PG Labs"
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  </Link>

                  {/* Close Menu Button */}
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-foreground-secondary hover:text-foreground bg-background-surface hover:bg-background-surface/80 border border-border/80 hover:border-zinc-500 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 active:scale-95"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5 text-foreground" aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile Menu Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 flex flex-col justify-between">
                  {/* Navigation Links */}
                  <nav className="flex flex-col space-y-2 pt-2" aria-label="Mobile Navigation">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-foreground-muted px-2 pb-2">
                      Navigation
                    </p>

                    {MOBILE_MENU_ITEMS.map((item, index) => {
                      const isActive = pathname === item.href;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.04 * index, duration: 0.22, ease: "easeOut" }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "group flex items-center justify-between p-3 rounded-xl transition-all duration-200",
                              isActive
                                ? "bg-accent/10 border border-accent/30 text-accent font-semibold"
                                : "hover:bg-white/[0.04] text-foreground/90 hover:text-foreground border border-transparent"
                            )}
                          >
                            <div className="flex items-center gap-3.5">
                              <span className="font-mono text-xs text-accent/70 font-medium">
                                {item.number}
                              </span>
                              <div className="flex flex-col">
                                <span className="text-xl sm:text-2xl font-bold tracking-tight">
                                  {item.name}
                                </span>
                                <span className="text-xs text-foreground-muted font-normal mt-0.5">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                            <ArrowUpRight
                              className={cn(
                                "w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                                isActive ? "text-accent" : "text-foreground-muted group-hover:text-foreground"
                              )}
                              aria-hidden="true"
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* Bottom Action Area */}
                  <div className="pt-6 pb-2 border-t border-border/80 flex flex-col gap-4 mt-6">
                    <Button
                      href="/contact"
                      size="lg"
                      fullWidth
                      showArrow
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Start a Project
                    </Button>

                    {/* Studio Contact Info */}
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