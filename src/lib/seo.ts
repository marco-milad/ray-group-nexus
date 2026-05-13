export const SITE_URL = "https://raylabgroup.com";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

/**
 * Official Ray Lab Group Twitter/X handle, including the leading "@".
 * Leave as empty string to suppress emission of <meta name="twitter:site">.
 * When populated, __root.tsx will conditionally include the meta tag.
 */
export const TWITTER_HANDLE = "";

export function canonical(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/**
 * Self-referencing hreflang annotations for a given route path.
 * Returns two <link rel="alternate"> entries: hreflang="en" + hreflang="x-default",
 * both pointing to the canonical URL of the current page.
 *
 * Safe for single-language sites (Google's documented pattern). When /ar/* routes
 * land in a future sprint, extend this helper to emit pairs (en, ar, x-default).
 */
export function hreflangLinks(path: string) {
  const href = canonical(path);
  return [
    { rel: "alternate", hreflang: "en", href },
    { rel: "alternate", hreflang: "x-default", href },
  ];
}
