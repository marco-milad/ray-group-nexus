export const directoryCopy = {
  seo: {
    title: "Corporate Directory — Ray Lab Group",
    description:
      "A complete directory of Ray Lab Group's diagnostic platforms, network, and headquarters across Egypt, Saudi Arabia, and Jordan.",
  },
  hero: {
    eyebrow: "Corporate Directory",
    headline: "Ray Lab Group — Our Brands & Network",
    subheadline:
      "A complete directory of Ray Lab Group's diagnostic platforms across Egypt, Saudi Arabia, and Jordan.",
  },
  brands: {
    eyebrow: "Platforms",
    headline: "Our Brands",
    subheadline: "Eight diagnostic and clinical platforms under one standard of excellence.",
  },
  stats: {
    eyebrow: "Network Summary",
    headline: "Reach by the numbers.",
    items: [
      { value: "78+", label: "Branches" },
      { value: "6", label: "Brands" },
      { value: "3", label: "Operating Markets" },
      { value: "1.6M+", label: "Annual Exams" },
    ],
  },
  hq: {
    eyebrow: "Headquarters",
    headline: "Malta HQ",
    addressLines: [
      "B2, Industry Street, Zone 5",
      "Central Business District",
      "Qormi CBD 5030, Malta",
    ],
    badge: "EU Regulated · Malta",
  },
} as const;

export type DirectoryCopy = typeof directoryCopy;
