/**
 * getBrand — safe brand lookup with FALLBACK_BRAND.
 *
 * Pattern mirrors getCopy: dev-mode warn on miss, fallback returned on miss.
 */

import type { Brand } from "@/types/brand";
import { brands } from "@/data/en/brands";

/**
 * Neutral group default returned when a brand id cannot be resolved.
 */
export const FALLBACK_BRAND: Brand = {
  id: "unknown",
  slug: "unknown",
  name: "Ray Lab Group",
  country: "egypt",
  color: "var(--rl-green)",
  founded: 2026,
  branches: 0,
  serviceIds: [],
  description: "Ray Lab Group — fallback brand entry.",
  logo: { light: "", dark: "" },
};

export function getBrand(id: string): Brand {
  const match = brands.find((b) => b.id === id || b.slug === id);

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
