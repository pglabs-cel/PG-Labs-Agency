"use client";

import React, { useState, useEffect, MouseEvent as ReactMouseEvent } from "react";
import dynamic from "next/dynamic";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

// Dynamically import CanvasRevealEffect so Three.js is not bundled or executed during initial page load
const CanvasRevealEffect = dynamic(
  () =>
    import("@/components/ui/canvas-reveal-effect").then(
      (mod) => mod.CanvasRevealEffect
    ),
  { ssr: false }
);

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "rgba(139, 92, 246, 0.3)",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    try {
      // Only enable 3D Aceternity canvas on capable desktop browsers with real mice, NOT Safari or mobile
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const canHover = window.matchMedia("(hover: hover)").matches;
      const isSafari =
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
        /iPad|iPhone|iPod/.test(navigator.userAgent);

      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      if (canHover && !isTouch && !isSafari && Boolean(gl)) {
        setEnable3D(true);
      }
    } catch {
      setEnable3D(false);
    }
  }, []);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group/spotlight p-8 rounded-xl relative border border-border bg-background-secondary/90 overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* Mobile Ambient Subtle Radial Glow (clearly visible on touch devices/Safari) */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-violet-500/20 via-accent/10 to-transparent blur-2xl sm:hidden"
        aria-hidden="true"
      />

      {/* Desktop / Safari Radial Spotlight Glow (Smooth, vibrant & zero crash risk) */}
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100 hidden sm:block"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              ${color},
              rgba(167, 139, 250, 0.12) 40%,
              transparent 75%
            )
          `,
        }}
      />

      {/* Interactive Aceternity Canvas Reveal Effect (Active on Desktop Chrome/Firefox/Edge/Brave) */}
      {enable3D && isHovering && (
        <motion.div
          className="pointer-events-none absolute z-0 inset-0 rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100 hidden md:block overflow-hidden"
          style={{
            maskImage: useMotionTemplate`
              radial-gradient(
                ${radius}px circle at ${mouseX}px ${mouseY}px,
                white,
                transparent 80%
              )
            `,
            WebkitMaskImage: useMotionTemplate`
              radial-gradient(
                ${radius}px circle at ${mouseX}px ${mouseY}px,
                white,
                transparent 80%
              )
            `,
          }}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [139, 92, 246],
              [167, 139, 250],
            ]}
            dotSize={2.5}
            showGradient={false}
          />
        </motion.div>
      )}

      <div className="relative z-10 flex flex-col justify-between h-full">
        {children}
      </div>
    </div>
  );
};
