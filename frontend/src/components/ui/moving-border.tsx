"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-14 w-auto min-w-[140px] overflow-hidden bg-transparent p-[1px] text-base group select-none cursor-pointer",
        containerClassName
      )}
      style={{
        borderRadius,
        transform: "translateZ(0)",
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius,
          transform: "translateZ(0)",
        }}
      >
        <MovingBorder duration={duration} rx="16" ry="16">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#8B5CF6_40%,#A78BFA_60%,transparent_75%)] opacity-[0.9]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-border bg-[#111113] text-sm font-medium text-foreground antialiased backdrop-blur-xl px-6 py-2.5 transition-colors group-hover:bg-[#18181B] group-hover:text-white group-hover:border-accent/40",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} - 1px)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 3000,
  rx = "12",
  ry = "12",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>(null);
  const progress = useMotionValue<number>(0);

  // Cross-browser calculation of element perimeter and point coordinates
  const getDimensions = () => {
    const el = pathRef.current;
    if (!el) return { w: 140, h: 44 };
    const w =
      el.ownerSVGElement?.clientWidth ||
      el.clientWidth ||
      el.parentElement?.clientWidth ||
      140;
    const h =
      el.ownerSVGElement?.clientHeight ||
      el.clientHeight ||
      el.parentElement?.clientHeight ||
      44;
    return { w, h };
  };

  useAnimationFrame((time) => {
    let length = 0;
    if (pathRef.current && typeof pathRef.current.getTotalLength === "function") {
      try {
        length = pathRef.current.getTotalLength();
      } catch {}
    }
    if (!length) {
      const { w, h } = getDimensions();
      length = 2 * (w + h);
    }
    if (length > 0) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const getPoint = (val: number): { x: number; y: number } => {
    // 1. Try standard SVG getPointAtLength if supported (Blink/Chromium/Firefox)
    if (pathRef.current && typeof pathRef.current.getPointAtLength === "function") {
      try {
        const pt = pathRef.current.getPointAtLength(val);
        if (pt && typeof pt.x === "number" && typeof pt.y === "number") {
          return { x: pt.x, y: pt.y };
        }
      } catch {}
    }

    // 2. Safe mathematical perimeter calculation for WebKit / Safari on iOS / macOS
    const { w, h } = getDimensions();
    const perimeter = 2 * (w + h);
    if (perimeter <= 0) return { x: 0, y: 0 };

    const d = ((val % perimeter) + perimeter) % perimeter;
    if (d < w) {
      // Top edge: moving left to right
      return { x: d, y: 0 };
    } else if (d < w + h) {
      // Right edge: moving top to bottom
      return { x: w, y: d - w };
    } else if (d < 2 * w + h) {
      // Bottom edge: moving right to left
      return { x: w - (d - (w + h)), y: h };
    } else {
      // Left edge: moving bottom to top
      return { x: 0, y: h - (d - (2 * w + h)) };
    }
  };

  const x = useTransform(progress, (val) => getPoint(val).x);
  const y = useTransform(progress, (val) => getPoint(val).y);

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
