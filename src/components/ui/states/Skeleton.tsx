/**
 * Skeleton — shape-matched placeholder with 150ms delay.
 *
 * The delay prevents flicker on fast connections: if real content
 * arrives within 150ms, the skeleton never renders.
 */

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type SkeletonVariant = "card" | "hero" | "stat" | "text" | "brand-chip" | "table-row";

interface SkeletonProps {
  variant?: SkeletonVariant;
  count?: number;
  delay?: number;
  className?: string;
}

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  card: "h-[220px] w-full rounded-lg",
  hero: "h-[480px] w-full rounded-xl",
  stat: "h-20 w-36 rounded-md",
  text: "h-4 w-[70%] rounded",
  "brand-chip": "h-8 w-32 rounded-full",
  "table-row": "h-[52px] w-full rounded-md",
};

export function Skeleton({ variant = "card", count = 1, delay = 150, className }: SkeletonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  const items = Array.from({ length: count });
  const containerClass =
    variant === "card" || variant === "table-row" || variant === "hero"
      ? "space-y-4"
      : "flex flex-wrap gap-3";

  return (
    <div className={cn(containerClass, className)} aria-busy="true" aria-live="polite">
      {items.map((_, i) => (
        <div key={i} className={cn("animate-pulse bg-muted/60", VARIANT_CLASSES[variant])} />
      ))}
    </div>
  );
}
