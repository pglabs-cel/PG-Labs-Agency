"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface SiteShellProps {
  children: React.ReactNode;
}

export const SiteShell: React.FC<SiteShellProps> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen flex flex-col">{children}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col pt-[64px] sm:pt-[72px]">{children}</div>
      <Footer />
    </>
  );
};
