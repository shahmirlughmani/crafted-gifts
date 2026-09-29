"use client";

import { useCallback, useState } from "react";
import { cx } from "@/lib/format";

/** Starting pose. `.reveal` supplies the transition; these only change where
 *  the element comes from. See globals.css. */
const VARIANTS = {
  up: "",
  fade: "reveal-fade",
  scale: "reveal-scale",
  left: "reveal-left",
  right: "reveal-right",
  blur: "reveal-blur",
} as const;

export type RevealVariant = keyof typeof VARIANTS;

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
  as?: React.ElementType;
}) {
  const [seen, setSeen] = useState(false);

  // A callback ref rather than an effect: the observer is attached the moment
  // the node exists, and React 19 runs the returned cleanup on detach.
  const ref = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cx("reveal", VARIANTS[variant], seen && "is-in", className)}
    >
      {children}
    </Tag>
  );
}
