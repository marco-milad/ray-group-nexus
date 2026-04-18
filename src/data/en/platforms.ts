export const platformsCopy = {
  seo: {
    title:       'Our Platforms — Ray Lab Group',
    description: 'Explore Ray Lab Group\'s 6 diagnostic platforms across Egypt, Saudi Arabia, and Jordan.',
  },
  hero: {
    eyebrow:        'Our Platforms',
    headline:       'Six Brands.',
    headlineAccent: 'One Ecosystem.',
    subheadline:    'Select a platform to explore its services, locations, and role within the Ray Lab Group ecosystem.',
  },
  overview: {
    eyebrow:    'The Group Portfolio',
    headline:   'Built for Scale. Designed for Precision.',
    subheadline:"Each brand operates independently within its market — unified under Ray Lab Group's standards of diagnostic excellence.",
  },
  brandPage: {
    servicesLabel:   'Diagnostic Services',
    locationsLabel:  'Locations',
    ecosystemLabel:  'Group Ecosystem Role',
    foundedLabel:    'Founded',
    branchesLabel:   'Branches',
    countryLabel:    'Market',
    modalitiesLabel: 'Available Modalities',
    primaryCta:      'Find a Branch',
    secondaryCta:    'Get in Touch',
  },
  ecosystemNote:
    "Each Ray Lab Group platform is fully integrated into the group's shared infrastructure — including teleradiology support via Ray Medical, physician referral pathways, and cross-platform reporting capabilities.",
} as const;

export type PlatformsCopy = typeof platformsCopy;
