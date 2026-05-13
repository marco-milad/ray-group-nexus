import type { Brand } from "@/types/brand";
import type { Branch } from "@/data/en/branches";
import { SITE_URL, canonical } from "./seo";

export const COUNTRY_NAMES: Record<Brand["country"], string> = {
  egypt: "Egypt",
  ksa: "Saudi Arabia",
  jordan: "Jordan",
  malta: "Malta",
};

export const COUNTRY_CODES: Record<Brand["country"], string> = {
  egypt: "EG",
  ksa: "SA",
  jordan: "JO",
  malta: "MT",
};

export const BREADCRUMB_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/services": "Services",
  "/gallery": "Gallery",
  "/network": "Network",
  "/platforms": "Platforms",
  "/investors": "Investors",
  "/contact": "Contact",
  "/directory": "Directory",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
};

/**
 * Official social/external URLs for the root Organization (Ray Lab Group).
 *
 * SCOPE: This list propagates ONLY to organizationSchema() and therefore only
 * appears on the root Organization entity. It does NOT attach to:
 *   - MedicalOrganization brand entities (per-brand sameAs is a future feature
 *     that would extend the Brand type with an optional sameAs field)
 *   - LocalBusiness branch entities (per-branch sameAs is not supported)
 *
 * FORMAT: absolute URLs only. Examples:
 *   - "https://www.linkedin.com/company/ray-lab-group"
 *   - "https://twitter.com/raylabgroup"
 *   - "https://www.facebook.com/raylabgroup"
 *   - "https://www.instagram.com/raylabgroup"
 *
 * Leave as empty array to suppress sameAs emission entirely (current state).
 * Schema.org accepts empty/missing sameAs without warnings.
 */
export const SAME_AS_URLS: string[] = [];

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const NAV_ID = `${SITE_URL}/#navigation`;

const LOGO_URL =
  "https://res.cloudinary.com/dcui0elwh/image/upload/v1776657151/svg_final_fwh3x1.svg";

export function safeStringify(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export function jsonLdScript(obj: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: safeStringify(obj) },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Ray Lab Group",
    url: SITE_URL,
    logo: LOGO_URL,
    description:
      "Multinational diagnostic healthcare group operating across Egypt, Saudi Arabia, and Jordan. 40+ branches, 6 platforms.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B2, Industry Street, Zone 5, Central Business District",
      addressLocality: "Qormi",
      postalCode: "CBD 5030",
      addressCountry: "MT",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${SITE_URL}/contact`,
      availableLanguage: ["en", "ar"],
    },
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Jordan" },
    ],
    sameAs: SAME_AS_URLS,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Ray Lab Group",
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

const PRIMARY_NAV: ReadonlyArray<{ name: string; path: string }> = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Platforms", path: "/platforms" },
  { name: "Network", path: "/network" },
  { name: "Investors", path: "/investors" },
  { name: "Contact", path: "/contact" },
];

export function siteNavigationElementSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": NAV_ID,
    name: "Primary Navigation",
    itemListElement: PRIMARY_NAV.map((item, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: item.name,
      url: canonical(item.path),
    })),
  };
}

interface WebPageInput {
  url: string;
  name: string;
  description: string;
  breadcrumbId?: string;
}

export function webPageSchema({ url, name, description, breadcrumbId }: WebPageInput) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
  };
  if (breadcrumbId) {
    schema.breadcrumb = { "@id": breadcrumbId };
  }
  return schema;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema({ url, items }: { url: string; items: BreadcrumbItem[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function breadcrumbsForRoute(
  path: string,
  brandName?: string,
): BreadcrumbItem[] {
  const home: BreadcrumbItem = { name: BREADCRUMB_LABELS["/"], url: canonical("/") };

  if (path === "/") return [home];

  if (path.startsWith("/platforms/") && path !== "/platforms/") {
    const slug = path.slice("/platforms/".length);
    return [
      home,
      { name: BREADCRUMB_LABELS["/platforms"], url: canonical("/platforms") },
      { name: brandName ?? slug, url: canonical(path) },
    ];
  }

  const label = BREADCRUMB_LABELS[path];
  if (!label) {
    return [home, { name: path.slice(1), url: canonical(path) }];
  }
  return [home, { name: label, url: canonical(path) }];
}

export function medicalOrganizationSchema(brand: Brand) {
  const url = canonical(`/platforms/${brand.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${url}#organization`,
    name: brand.name,
    url,
    logo: brand.logo.light,
    description: brand.description,
    foundingDate: String(brand.founded),
    areaServed: { "@type": "Country", name: COUNTRY_NAMES[brand.country] },
    parentOrganization: { "@id": ORG_ID },
  };
}

type BranchCountry = "egypt" | "ksa" | "jordan";

const BRANCH_COUNTRIES: readonly BranchCountry[] = ["egypt", "ksa", "jordan"] as const;

function isBranchCountry(c: Brand["country"]): c is BranchCountry {
  return c === "egypt" || c === "ksa" || c === "jordan";
}

export function localBusinessSchema(branch: Branch, brand: Brand) {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/network#branch-${branch.id}`,
    name: branch.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.city,
      addressCountry: COUNTRY_CODES[brand.country],
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: branch.lat,
      longitude: branch.lng,
    },
    hasMap: branch.mapsUrl,
    areaServed: { "@type": "Country", name: COUNTRY_NAMES[brand.country] },
    parentOrganization: { "@id": `${SITE_URL}/platforms/${brand.slug}#organization` },
  };
}

interface BranchListInput {
  countryName: string;
  countryId: string;
  branchIds: string[];
}

export function branchListSchema({ countryName, countryId, branchIds }: BranchListInput) {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/network#branches-${countryId}`,
    name: `${countryName} Branches`,
    numberOfItems: branchIds.length,
    itemListElement: branchIds.map((id, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@id": `${SITE_URL}/network#branch-${id}` },
    })),
  };
}

export function networkGraphSchema(branches: Branch[], brands: Brand[]) {
  const brandMap = new Map(brands.map((b) => [b.slug, b]));

  const byCountry: Record<BranchCountry, { branch: Branch; brand: Brand }[]> = {
    egypt: [],
    ksa: [],
    jordan: [],
  };

  for (const branch of branches) {
    const brand = brandMap.get(branch.brand);
    if (!brand) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn(`[schema] branch ${branch.id} references unknown brand "${branch.brand}"`);
      }
      continue;
    }
    if (!isBranchCountry(brand.country)) continue;
    byCountry[brand.country].push({ branch, brand });
  }

  const itemLists = BRANCH_COUNTRIES.filter((c) => byCountry[c].length > 0).map((c) =>
    branchListSchema({
      countryName: COUNTRY_NAMES[c],
      countryId: c,
      branchIds: byCountry[c].map(({ branch }) => branch.id),
    }),
  );

  const localBusinesses = BRANCH_COUNTRIES.flatMap((c) =>
    byCountry[c].map(({ branch, brand }) => localBusinessSchema(branch, brand)),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [...itemLists, ...localBusinesses],
  };
}
