import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background-secondary text-foreground-secondary pt-16 pb-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-border/60">
          {/* Studio Info */}
          <div className="md:col-span-6 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-foreground font-bold tracking-tight text-2xl"
            >
              <span className="w-3 h-3 rounded-full bg-accent" />
              <span className="font-mono">{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-foreground-secondary text-base max-w-sm leading-relaxed">
              Digital products, AI solutions and custom software engineered for forward-thinking businesses.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Q3/Q4 Projects
              </span>
            </div>
          </div>

          {/* Explore Column */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition-colors duration-200 inline-block py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors duration-200 inline-block py-0.5"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
              Connect
            </p>
            <ul className="space-y-2.5 text-sm" role="list">
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.links.email}`}
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors duration-200 py-0.5 group"
                >
                  <span>{SITE_CONFIG.links.email}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-foreground-muted group-hover:text-accent transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors duration-200 py-0.5 group"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-foreground-muted group-hover:text-accent transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-foreground transition-colors duration-200 py-0.5 group"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-foreground-muted group-hover:text-accent transition-colors" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-foreground-muted">
          <p>© {new Date().getFullYear()} PG Labs. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};