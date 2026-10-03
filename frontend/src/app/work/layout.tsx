import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Case Studies — Digital Products & Systems",
  description:
    "Explore production systems built by PG Labs across Web Development, SaaS platforms, AI Computer Vision, and Custom Business Software.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work & Case Studies — Digital Products & Systems | PG Labs",
    description:
      "Explore production systems built by PG Labs across Web Development, SaaS platforms, AI Computer Vision, and Custom Business Software.",
    url: "/work",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
