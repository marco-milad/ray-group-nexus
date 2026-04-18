/**
 * Ray Lab Group — Brand types
 *
 * Sub-brand identifiers for the 6 platforms operating under Ray Lab Group.
 */

export type BrandId =
  | "cairo-scan"
  | "technoscan"
  | "crc"
  | "medray"
  | "clinics"
  | "ray-medical";

export type CountryCode = "eg" | "ksa" | "jo" | "mt";

export interface Brand {
  id: BrandId;
  name: string;
  shortName?: string;
  tagline?: string;
  country: CountryCode | CountryCode[];
  /** CSS color token reference, e.g. "var(--cairo-scan)" or hex */
  color: string;
  /** Cloudinary or local logo URLs in fallback order (best → worst) */
  logos: {
    primary: string;
    fallback?: string[];
  };
  description?: string;
}

/** Mapping from BrandId → CSS variable / hex color */
export const BRAND_COLORS: Record<BrandId, string> = {
  "cairo-scan": "#E53935",
  technoscan: "#00897B",
  crc: "#C8A96E",
  medray: "#1E88E5",
  clinics: "#F57C00",
  "ray-medical": "#7B1FA2",
} as const;
