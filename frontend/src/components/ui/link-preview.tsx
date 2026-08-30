"use client";

import { encode } from "qss";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
  isStatic?: boolean;
  imageSrc?: string;
  asChild?: boolean;
};

export const LinkPreview = ({
  children,
  url,
  className,
  width = 240,
  height = 140,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
  asChild = false,
}: LinkPreviewProps) => {
  let src: string = "";
  if (!isStatic) {
    if (url && url.startsWith("http")) {
      const params = encode({
        url,
        screenshot: true,
        meta: false,
        embed: "screenshot.url",
        colorScheme: "dark",
        "viewport.isMobile": true,
        "viewport.deviceScaleFactor": 1,
        "viewport.width": width * 3,
        "viewport.height": height * 3,
      });
      src = `https://api.microlink.io/?${params}`;
    } else if (imageSrc) {
      src = imageSrc;
    }
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [placementBelow, setPlacementBelow] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 260, damping: 20 };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle dynamic rotation as mouse moves
  const rotateX = useTransform(smoothX, (val) => {
    if (typeof window === "undefined") return 0;
    const offset = val - window.innerWidth / 2;
    return (offset / window.innerWidth) * 12; // tilt slightly based on screen quadrant
  });

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (!src) return;
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
    setPlacementBelow(event.clientY < 190);
    setOpen(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
    if (event.clientY < 190 && !placementBelow) {
      setPlacementBelow(true);
    } else if (event.clientY >= 190 && placementBelow) {
      setPlacementBelow(false);
    }
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const childElement = asChild && React.isValidElement(children) ? (
    React.cloneElement(children as React.ReactElement<any>, {
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        handleMouseEnter(e);
        (children as any).props?.onMouseEnter?.(e);
      },
      onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
        handleMouseMove(e);
        (children as any).props?.onMouseMove?.(e);
      },
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        handleMouseLeave();
        (children as any).props?.onMouseLeave?.(e);
      },
    })
  ) : (
    <a
      href={url}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("text-foreground cursor-pointer inline-block", className)}
    >
      {children}
    </a>
  );

  return (
    <>
      {isMounted && src ? (
        <div className="hidden">
          <img src={src} width={width} height={height} alt="hidden preview preload" />
        </div>
      ) : null}

      {childElement}

      {isMounted &&
        typeof document !== "undefined" &&
        document.body &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                style={{
                  position: "fixed",
                  left: smoothX,
                  top: smoothY,
                  x: "-50%",
                  y: placementBelow ? "16%" : "-114%",
                  rotate: rotateX,
                  pointerEvents: "none",
                  zIndex: 99999,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                  },
                }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                className="shadow-[0_24px_60px_rgba(0,0,0,0.85)] rounded-xl border border-border bg-background-surface/95 backdrop-blur-xl p-1.5"
              >
                <div
                  className="block rounded-lg overflow-hidden border border-border/60"
                  style={{ fontSize: 0 }}
                >
                  {src ? (
                    <img
                      src={src}
                      width={width}
                      height={height}
                      className="rounded-lg object-cover w-full h-auto max-h-[165px]"
                      alt="Project live preview"
                    />
                  ) : (
                    <div className="w-48 h-28 bg-background-secondary flex items-center justify-center text-xs font-mono text-foreground-muted">
                      Preview
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
