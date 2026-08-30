"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { RefreshCw, LogOut, MessageSquare, FolderKanban, ArrowUpRight } from "lucide-react";

interface AdminHeaderProps {
  activeTab: "inquiries" | "projects";
  onRefresh?: () => void;
  onLogout: () => void;
  loading?: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onRefresh,
  onLogout,
  loading = false,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/80">
      <Container className="max-w-7xl h-16 flex items-center justify-between">
        {/* Left: Studio Logo & Section Indicator */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold tracking-tight text-foreground text-lg group"
            title="View Live Site"
          >
            <span>PG Labs</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-foreground-muted group-hover:text-accent transition-colors" />
          </Link>

          <span className="text-border hidden sm:inline">/</span>

          {/* Admin Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-background-surface/80 p-1 rounded-lg border border-border">
            <Link
              href="/admin/inquiries"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === "inquiries"
                  ? "bg-accent text-white shadow-sm"
                  : "text-foreground-secondary hover:text-foreground hover:bg-background-secondary"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquiries</span>
            </Link>

            <Link
              href="/admin/projects"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === "projects"
                  ? "bg-accent text-white shadow-sm"
                  : "text-foreground-secondary hover:text-foreground hover:bg-background-secondary"
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Projects</span>
            </Link>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 rounded-lg bg-background-surface border border-border text-foreground-secondary hover:text-foreground hover:border-accent/40 transition-colors flex items-center gap-1.5 text-xs"
              title="Refresh Data"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? "animate-spin text-accent" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          )}

          <button
            onClick={onLogout}
            className="p-2 rounded-lg bg-background-surface border border-border text-foreground-secondary hover:text-red-400 hover:border-red-500/30 transition-colors flex items-center gap-1.5 text-xs"
            title="Log Out of Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </Container>
    </header>
  );
};
