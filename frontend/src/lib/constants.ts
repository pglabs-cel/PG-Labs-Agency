export const SITE_CONFIG = {
  name: "PG Labs",
  legalName: "PG Labs Studio",
  tagline: "We Build Digital Products That Actually Work.",
  description:
    "PG Labs builds modern web applications, AI-powered solutions, and custom software built around real business problems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pglabs.dev",
  ogImage: "/og.png",
  logo: "/logo-mark.jpg",
  logoMarkUrl: "https://res.cloudinary.com/y20gw7iu/image/upload/v1788118208/Logo_Only.jpg",
  fullLogoUrl: "https://res.cloudinary.com/y20gw7iu/image/upload/v1788118184/Full_logo.jpg",
  links: {
    twitter: "https://twitter.com/pglabs",
    github: "https://github.com/pglabs",
    linkedin: "https://linkedin.com/company/pglabs",
    email: "pglabs.agency@gmail.com",
  },
};

export const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Process", href: "/#process" },
  { name: "About", href: "/about" },
];