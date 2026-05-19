// Single source of truth for the routes that get prerendered to static HTML
// at build time. Imported by:
//   - vite.config.ts  → passed as nitro({ prerender: { routes: [...] } })
//   - scripts/sync-to-deploy.mjs → used to validate that every route produced
//     a valid HTML file before publishing to ../raylabgroup-site/dist/.
//
// MAINTENANCE: if routes are added/removed in src/routes/, or if brands are
// added/removed in src/data/en/brands.ts, update the lists below. The platform
// slugs MUST stay in sync with BRAND_SLUGS in scripts/generate-sitemap.mjs.

export const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/network",
  "/investors",
  "/contact",
  "/directory",
  "/gallery",
  "/privacy",
  "/terms",
  "/platforms",
];

export const PLATFORM_SLUGS = [
  "cairo-scan",
  "technoscan",
  "crc",
  "medray",
  "cairo-scan-polyclinics",
  "technoscan-polyclinics",
  "specialized-clinics",
  "ray-medical",
];

export const PRERENDER_ROUTES = [
  ...STATIC_ROUTES,
  ...PLATFORM_SLUGS.map((slug) => `/platforms/${slug}`),
];
