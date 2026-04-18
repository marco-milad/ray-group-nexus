/**
 * getCopy — key-based copy resolver with i18n support.
 *
 * Usage:
 *   getCopy('home.hero.headline', 'Diagnostic Intelligence.')
 *
 * Why key-based (not value-based):
 *   - Enables future locale switching without component changes
 *   - Logs missing keys in dev for easier debugging
 *   - Future-proofs for CMS integration
 */

import * as enCopy from "@/data/en";
import * as arCopy from "@/data/ar";

type SupportedLocale = "en" | "ar";

const copyMap: Record<SupportedLocale, Record<string, unknown>> = {
  en: enCopy as Record<string, unknown>,
  ar: arCopy as Record<string, unknown>,
};

export function getCopy(
  path: string,
  fallback = "",
  locale: SupportedLocale = "en",
): string {
  const keys = path.split(".");
  const source = copyMap[locale] ?? copyMap.en;
  let result: unknown = source;

  for (const key of keys) {
    if (result === undefined || result === null) break;
    result = (result as Record<string, unknown>)[key];
  }

  if (result === undefined || result === null) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(
        `[getCopy] Missing key: "${path}" in locale "${locale}". Using fallback: "${fallback}"`,
      );
    }
    return fallback;
  }

  return typeof result === "string" ? result : fallback;
}
