/**
 * getBrand — safe brand lookup with FALLBACK_BRAND.
 *
 * Phase 1B note: brands.ts does not yet exist (lands in 1C).
 * Until then, getBrand accepts the brands array as a parameter.
 * In 1C this will be refactored to import directly from @/data/en/brands.
 *
 * Pattern mirrors getCopy: dev-mode warn on miss, fallback returned on miss.
 */

import type { Brand } from "@/types/brand";

/**
 * Neutral group default returned when a brand id cannot be resolved.
 * Uses the Ray Lab Group green token (defined in src/styles.css).
 */
export const FALLBACK_BRAND: Brand = {
  id: "ray-medical",
  name: "Ray Lab Group",
  shortName: "Ray Lab",
  country: "mt",
  color: "var(--rl-green)",
  logos: { primary: "" },
  description: "Ray Lab Group — fallback brand entry.",
};

export function getBrand(id: string, brandsArray: Brand[]): Brand {
  const match = brandsArray.find((b) => b.id === id);

  if (!match) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        `[getBrand] Unknown brand id: "${id}". Using FALLBACK_BRAND.`,
      );
    }
    return FALLBACK_BRAND;
  }

  return match;
}
