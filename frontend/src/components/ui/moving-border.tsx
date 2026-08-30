"use client";
import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
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
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
        transform: "translateZ(0)",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        maskImage: "radial-gradient(white, black)",
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius,
          transform: "translateZ(0)",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          maskImage: "radial-gradient(white, black)",
        }}
      >
        <MovingBorder duration={duration} rx="16" ry="16">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#8B5CF6_40%,#A78BFA_60%,transparent_75%)] opacity-[0.9]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-border bg-[#111113] text-sm font-medium text-foreground antialiased backdrop-blur-xl px-6 py-2.5 transition-colors group-hover:bg-[#18181B] group-hover:text-white group-hover:border-accent/40",
          className,
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

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x,
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y,
  );

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
