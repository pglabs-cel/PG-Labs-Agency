export const SITE_CONFIG = {
  name: "PG Labs",
  legalName: "PG Labs Studio",
  tagline: "Digital Products. Technology. Growth.",
  subTagline: "BUILD • AUTOMATE • SCALE",
  description:
    "PG Labs builds modern digital products, web applications, performance marketing channels, brand systems, and practical business automation.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.pglabs.co.in",
  ogImage: "/og.png",
  logo: "/logo-mark.jpg",
  logoMarkUrl: "https://res.cloudinary.com/y20gw7iu/image/upload/v1788118208/Logo_Only.jpg",
  fullLogoUrl: "https://res.cloudinary.com/y20gw7iu/image/upload/v1788118184/Full_logo.jpg",
  links: {
    twitter: "",
    github: "",
    linkedin: "",
    email: "pglabs.agency@gmail.com",
    phone: "",
    whatsapp: "",
  },
};

export const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Process", href: "/process" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
];