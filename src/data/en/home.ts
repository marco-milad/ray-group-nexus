/**
 * Home page copy — page-specific only.
 * Reusable sections (ecosystem, stats, physicians, networkPreview)
 * live in /sections/ and are imported separately.
 */

export const homeCopy = {
  seo: {
    title: "Ray Lab Group — Diagnostic Intelligence. Delivered at Scale.",
    description:
      "Ray Lab Group is a multinational diagnostic healthcare group operating across Egypt, Saudi Arabia, and Jordan. Explore our 40+ branches and 6 diagnostic platforms.",
  },
  hero: {
    eyebrow: "Ray Lab Group · Est. 2019 · Malta HQ",
    headline: "Diagnostic Intelligence.",
    headlineAccent: "Delivered at Scale.",
    subheadline:
      "Consultant-led platform integrating diagnostics, clinical care, and teleradiology across Egypt, Saudi Arabia, and Jordan.",
    primaryCta: "Explore Our Network",
    secondaryCta: "Contact Us",
  },
  brands: {
    eyebrow: "Our Platforms",
    headline: "Six Brands.",
    headlineAccent: "One Standard of Excellence.",
    cta: "Find a Location",
  },
} as const;

export type HomeCopy = typeof homeCopy;
