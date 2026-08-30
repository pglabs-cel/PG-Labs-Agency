import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { SiteShell } from "@/components/layout/SiteShell";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "PG Labs — Web Development, AI & Custom Software Studio",
    template: "%s | PG Labs",
  },
  description:
    "PG Labs builds modern web applications, AI-powered solutions, and custom software built around real business problems.",
  keywords: [
    "software development agency",
    "web development",
    "Next.js development",
    "AI development",
    "custom software development",
    "SaaS development",
    "business software",
    "AI solutions",
    "web application development",
  ],
  authors: [{ name: "PG Labs", url: SITE_CONFIG.url }],
  creator: "PG Labs",
  publisher: "PG Labs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: "PG Labs — Web Development, AI & Custom Software Studio",
    description:
      "PG Labs builds modern web applications, AI-powered solutions and custom software for businesses and startups.",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.fullLogoUrl,
        width: 1200,
        height: 630,
        alt: "PG Labs — Digital Product Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PG Labs — Web Development, AI & Custom Software Studio",
    description:
      "PG Labs builds modern web applications, AI-powered solutions and custom software for businesses and startups.",
    creator: "@pglabs",
    images: [SITE_CONFIG.fullLogoUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-accent selection:text-white flex flex-col">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}