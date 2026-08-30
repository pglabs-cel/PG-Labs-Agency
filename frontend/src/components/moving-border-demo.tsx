"use client";
import React from "react";
import { Button } from "@/components/ui/moving-border";

export default function MovingBorderDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Button
        borderRadius="1.75rem"
        className="bg-background-surface text-foreground border-border hover:border-accent/40"
      >
        Borders are cool
      </Button>
    </div>
  );
}
