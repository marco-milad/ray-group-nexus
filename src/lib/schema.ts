import type { Brand } from "@/types/brand";
import { SITE_URL, canonical } from "./seo";

export const COUNTRY_NAMES: Record<Brand["country"], string> = {
  egypt: "Egypt",
  ksa: "Saudi Arabia",
  jordan: "Jordan",
  malta: "Malta",
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
