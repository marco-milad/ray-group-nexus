export const SITE_URL = "https://raylabgroup.com";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export function canonical(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
