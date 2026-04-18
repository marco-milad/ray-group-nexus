/**
 * Global copy — shared across all pages.
 * Contains: brand identity, navigation, CTAs, footer, error strings.
 */

export const globalCopy = {
  brand: {
    name: "Ray Lab Group",
    tagline: "Diagnostic Intelligence. Delivered at Scale.",
    hq: "Malta HQ · Est. 2019",
  },
  nav: {
    links: {
      about: "About",
      platforms: "Platforms",
      services: "Services",
      network: "Network",
      investors: "Investors",
      contact: "Contact",
    },
    platformsDropdownLabel: "Our Platforms",
    mobileMenuLabel: "Menu",
    mobileMenuClose: "Close",
  },
  cta: {
    exploreNetwork: "Explore Our Network",
    contactUs: "Contact Us",
    findLocation: "Find a Location",
    learnMore: "Learn More",
    viewAll: "View All",
    submitInquiry: "Submit Inquiry",
    downloadOverview: "Download Group Overview",
    getInTouch: "Get in Touch",
    sendMessage: "Send Message",
    backToHome: "Back to Home",
  },
  footer: {
    copyright: "© 2025 Ray Lab Group · Malta HQ · All rights reserved.",
    tagline: "Empowering healthier lives through groundbreaking diagnostics.",
    followUs: "Follow Us",
    quickLinks: "Quick Links",
    ourPlatforms: "Our Platforms",
  },
  errors: {
    notFound: "Page not found.",
    genericError: "Something went wrong. Please try again.",
    emptyState: "No results found.",
  },
} as const;

export type GlobalCopy = typeof globalCopy;
