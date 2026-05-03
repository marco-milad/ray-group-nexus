export const networkCopy = {
  seo: {
    title: "Network — Ray Lab Group",
    description:
      "Ray Lab Group operates 74+ branches across Egypt, Saudi Arabia, and Jordan — the most geographically diverse private diagnostic network in MENA.",
  },

  hero: {
    eyebrow: "Our Network",
    headline: "Diagnostic Coverage",
    headlineAccent: "Across MENA.",
    subheadline:
      "74+ branches across 3 operating markets, under 6 brands — unified by group governance and Ray Medical teleradiology infrastructure.",
  },

  countries: {
    eyebrow: "Geographic Footprint",
    headline: "Three Countries. One Operating Standard.",
    subheadline:
      "Each country is served by dedicated brands tuned to local market dynamics — supported by group-wide infrastructure.",
    items: [
      {
        country: "Egypt",
        flag: "🇪🇬",
        branches: 64,
        brands: ["Cairo Scan", "TechnoScan", "Specialized Clinics"],
        cities: ["Cairo", "Alexandria", "Mansoura", "Tanta", "Ismailia", "Suez", "Assiut", "Sohag"],
        soWhat:
          "Largest national footprint — Upper Egypt presence is unmatched by any private competitor.",
      },
      {
        country: "Saudi Arabia",
        flag: "🇸🇦",
        branches: 3,
        brands: ["CRC"],
        cities: ["Riyadh"],
        soWhat:
          "Premium, consultant-led positioning in the region's highest-revenue private healthcare market — Jeddah expansion under evaluation.",
      },
      {
        country: "Jordan",
        flag: "🇯🇴",
        branches: 7,
        brands: ["MedRay"],
        cities: ["Amman", "Abdoun", "Sweifieh", "Khalda", "Marj Al-Hamam"],
        soWhat:
          "Hub-and-spoke model fully built out across Greater Amman — the most accessible radiology network in Jordan.",
      },
    ],
  },

  brandDistribution: {
    eyebrow: "Brand Distribution",
    headline: "Six Brands. Tuned to Their Markets.",
    subheadline:
      "Each brand is positioned for its local context — premium consultant-led, accessible neighbourhood, integrated clinic, or B2B teleradiology.",
    items: [
      { brand: "Cairo Scan", country: "Egypt", branches: 20, color: "var(--cairo-scan)" },
      { brand: "TechnoScan", country: "Egypt", branches: 35, color: "var(--technoscan)" },
      { brand: "Specialized Clinics", country: "Egypt", branches: 9, color: "var(--clinics)" },
      { brand: "CRC", country: "Saudi Arabia", branches: 3, color: "var(--crc)" },
      { brand: "MedRay", country: "Jordan", branches: 7, color: "var(--medray)" },
      {
        brand: "Ray Medical",
        country: "Egypt + KSA",
        branches: 0,
        color: "var(--ray-medical)",
        note: "Teleradiology — no physical branches",
      },
    ],
  },

  growthInsight: {
    eyebrow: "Growth Insight",
    headline: "Branches Added per Year",
    subheadline:
      "Expansion has accelerated since 2023 — 2025 marks the largest single-year expansion in group history.",
    data: [
      { year: "2021", added: 4 },
      { year: "2022", added: 7 },
      { year: "2023", added: 7 },
      { year: "2024", added: 11 },
      { year: "2025", added: 12 },
    ],
    soWhat:
      "The hub-and-spoke model is compounding — each new market entry lowers the marginal cost of the next.",
  },

  mapTeaser: {
    eyebrow: "Coming Soon",
    headline: "Interactive Network Map",
    body: "A full interactive map of every Ray Lab Group branch — filterable by brand, city, and service — is in development.",
    note: "In the meantime, use the countries grid above to explore each market.",
  },
} as const;

export type NetworkCopy = typeof networkCopy;
