/**
 * Global copy — shared across all pages.
 * Contains: brand identity, navigation, CTAs, footer, error/empty/loading strings.
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
    tryAgain: "Try Again",
    refreshPage: "Refresh Page",
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
    persistentError: "Something keeps going wrong. Please contact us.",
    imageLoadError: "Image unavailable.",
    brandNotFound: "Platform not found.",
    networkError: "Unable to load content. Check your connection.",
    partialContent: "Some content is temporarily unavailable.",
    emptyState: "No results found.",
  },
  loadingStates: {
    page: "Loading…",
    content: "Fetching content…",
    map: "Loading network map…",
    brands: "Loading platforms…",
  },
  emptyStates: {
    networkFilter: {
      title: "No branches found.",
      body: "Try selecting 'All Branches' or a different filter.",
      cta: "Clear Filter",
    },
    search: {
      title: "No results.",
      body: "Try a different search term or browse our platforms.",
      cta: "Browse Platforms",
    },
    pressArticles: {
      title: "No articles yet.",
      body: "Check back soon for the latest news from Ray Lab Group.",
      cta: null,
    },
    servicesCategory: {
      title: "Coming soon.",
      body: "Services for this category are being updated.",
      cta: null,
    },
    generic: {
      title: "Nothing here yet.",
      body: "This section is currently being updated.",
      cta: null,
    },
  },
} as const;

export type GlobalCopy = typeof globalCopy;
export type EmptyContext = keyof typeof globalCopy.emptyStates;
