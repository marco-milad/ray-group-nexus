import * as React from "react";
import type { Brand } from "@/types/brand";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  brand: Brand;
  variant?: "light" | "dark";
  className?: string;
}

/**
 * BrandLogo — fallback chain:
 *   requested variant → other variant → text fallback (brand.color bg)
 */
export function BrandLogo({ brand, variant = "light", className }: BrandLogoProps) {
  const primary = variant === "light" ? brand.logo.light : brand.logo.dark;
  const alt = variant === "light" ? brand.logo.dark : brand.logo.light;

  // Compute initial src; if both empty → text fallback immediately
  const initial = primary || alt || "";
  const [src, setSrc] = React.useState(initial);
  const [failed, setFailed] = React.useState(!initial);

  React.useEffect(() => {
    const next = primary || alt || "";
    setSrc(next);
    setFailed(!next);
  }, [primary, alt]);

  if (failed) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-white",
          className,
        )}
        style={{ backgroundColor: brand.color }}
        aria-label={brand.name}
      >
        {brand.name}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${brand.name} logo`}
      loading="lazy"
      className={cn("object-contain", className)}
      onError={() => {
        if (src === primary && alt && alt !== primary) {
          setSrc(alt);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
