"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          action?: string;
          cData?: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (error?: any) => void;
          size?: "normal" | "compact" | "flexible";
          [key: string]: any;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export interface TurnstileRef {
  reset: () => void;
}

interface TurnstileWidgetProps {
  siteKey: string;
  action?: string;
  onSuccess: (token: string) => void;
  onExpire?: () => void;
  onError?: (error?: any) => void;
  className?: string;
}

export const TurnstileWidget = forwardRef<TurnstileRef, TurnstileWidgetProps>(
  (
    {
      siteKey,
      action = "contact",
      onSuccess,
      onExpire,
      onError,
      className = "",
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [scale, setScale] = useState(1);

    // Keep callbacks fresh in refs to avoid rerendering widget on parent callback identity changes
    const callbacksRef = useRef({ onSuccess, onExpire, onError });
    useEffect(() => {
      callbacksRef.current = { onSuccess, onExpire, onError };
    }, [onSuccess, onExpire, onError]);

    // Expose reset method to parent
    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.reset(widgetIdRef.current);
          } catch (err) {
            console.error("[Turnstile] Reset failed:", err);
          }
        }
      },
    }));

    // Measure parent width on mobile to ensure zero overflow on narrow viewports (< 320px)
    useEffect(() => {
      const updateScale = () => {
        if (!wrapperRef.current) return;
        const availableWidth = wrapperRef.current.clientWidth;
        // Standard Turnstile widget width is 300px
        if (availableWidth > 0 && availableWidth < 300) {
          const computedScale = Math.max(0.72, Math.min(1, (availableWidth - 8) / 300));
          setScale(computedScale);
        } else {
          setScale(1);
        }
      };

      updateScale();
      window.addEventListener("resize", updateScale);
      return () => window.removeEventListener("resize", updateScale);
    }, []);

    // Load Turnstile script and initialize widget
    useEffect(() => {
      let isMounted = true;

      const renderWidget = () => {
        if (!containerRef.current || !window.turnstile || widgetIdRef.current) return;

        try {
          // Clear any leftover DOM nodes inside container
          containerRef.current.innerHTML = "";

          const id = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            theme: "dark",
            action,
            callback: (token: string) => {
              if (isMounted) {
                callbacksRef.current.onSuccess(token);
              }
            },
            "expired-callback": () => {
              if (isMounted) {
                callbacksRef.current.onExpire?.();
              }
            },
            "error-callback": (err?: any) => {
              if (isMounted) {
                callbacksRef.current.onError?.(err);
              }
            },
          });

          widgetIdRef.current = id;
          if (isMounted) setIsReady(true);
        } catch (error) {
          console.error("[Turnstile] Render exception:", error);
        }
      };

      if (window.turnstile) {
        renderWidget();
      } else {
        const SCRIPT_ID = "cf-turnstile-script";
        let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

        if (!script) {
          script = document.createElement("script");
          script.id = SCRIPT_ID;
          script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }

        const checkInterval = setInterval(() => {
          if (window.turnstile) {
            clearInterval(checkInterval);
            if (isMounted) {
              renderWidget();
            }
          }
        }, 80);

        return () => {
          clearInterval(checkInterval);
          isMounted = false;
          if (widgetIdRef.current && window.turnstile) {
            try {
              window.turnstile.remove(widgetIdRef.current);
              widgetIdRef.current = null;
            } catch {}
          }
        };
      }

      return () => {
        isMounted = false;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
            widgetIdRef.current = null;
          } catch {}
        }
      };
    }, [siteKey, action]);

    return (
      <div
        ref={wrapperRef}
        className={`w-full flex justify-center sm:justify-start select-none ${className}`}
      >
        <div
          className="relative overflow-visible flex items-center justify-center sm:justify-start max-w-full"
          style={{
            minHeight: 65,
            width: scale < 1 ? `${Math.round(300 * scale)}px` : "300px",
            height: scale < 1 ? `${Math.round(65 * scale)}px` : "65px",
          }}
        >
          {/* Skeleton loading state before Turnstile mounts */}
          {!isReady && (
            <div
              className="absolute inset-0 rounded-lg bg-background-surface/40 border border-border/40 flex items-center justify-center gap-2 text-foreground-muted text-xs font-mono"
              style={{ width: 300, height: 65 }}
            >
              <Loader2 className="w-3.5 h-3.5 animate-spin text-accent" />
              <span>Verifying secure connection...</span>
            </div>
          )}

          {/* Scalable widget container */}
          <div
            className="flex justify-center sm:justify-start transition-transform duration-150 origin-center sm:origin-left"
            style={{
              transform: scale < 1 ? `scale(${scale})` : undefined,
              width: 300,
              height: 65,
            }}
          >
            <div
              ref={containerRef}
              className="cf-turnstile w-full flex justify-center sm:justify-start [&>iframe]:!mx-auto sm:[&>iframe]:!mx-0"
            />
          </div>
        </div>
      </div>
    );
  }
);

TurnstileWidget.displayName = "TurnstileWidget";
