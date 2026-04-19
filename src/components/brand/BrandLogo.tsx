import * as React from "react";
import type { Brand } from "@/types/brand";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  brand: Brand;
  variant?: "light" | "dark";
  className?: string;
}

export function BrandLogo({ brand, variant = "light", className }: BrandLogoProps) {
  const primary = variant === "light" ? brand.logo.light : brand.logo.dark;
  const alt = variant === "light" ? brand.logo.dark : brand.logo.light;

  const initial = primary || alt || "";
  const [src, setSrc] = React.useState(initial);
  const [failed, setFailed] = React.useState(!initial);

  // Tracks whether we already tried the alt URL this render cycle
  const triedAltRef = React.useRef(false);

  // Reset when primary/alt change (variant switch, logo update, re-fetch)
  React.useEffect(() => {
    const next = primary || alt || "";
    setSrc(next);
    setFailed(!next);
    triedAltRef.current = false;
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
      width={160}
      height={40}
      className={cn("object-contain", className)}
      onError={() => {
        if (!triedAltRef.current && alt && src !== alt) {
          triedAltRef.current = true;
          setSrc(alt);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
