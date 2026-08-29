export const SITE_CONFIG = {
  name: "PG Labs",
  legalName: "PG Labs Studio",
  tagline: "We Build Digital Products That Actually Work.",
  description:
    "PG Labs builds modern web applications, AI-powered solutions, and custom software built around real business problems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pglabs.dev",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/pglabs",
    github: "https://github.com/pglabs",
    linkedin: "https://linkedin.com/company/pglabs",
    email: "contact@pglabs.dev",
  },
};

export const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Process", href: "/#process" },
  { name: "About", href: "/about" },
];