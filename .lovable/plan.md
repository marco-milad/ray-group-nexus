
## Phase 2A — Layout + Pages Implementation

Build the shared layout and first 3 pages (Home, About, Platforms) with all sections.

### UI Atoms (src/components/ui/)
- **stat-card.tsx** — Number + label + optional note
- **section-header.tsx** — Eyebrow + headline + headlineAccent + subheadline
- **brand-chip.tsx** — Colored dot + brand name
- **reveal.tsx** — IntersectionObserver + CSS fade-in animation

### Brand Component (src/components/brand/)
- **BrandLogo.tsx** — Props: brand, variant?, className?; fallback chain: requested variant → other variant → text div with brand.color bg

### Layout Shell (src/components/layout/)
- **Navbar.tsx** — Sticky, backdrop-blur, logo left, nav center, Contact CTA right, platforms dropdown (6 brands), mobile sheet drawer
- **Footer.tsx** — Dark bg, brand chips, quick links, social icons, copyright from globalCopy
- **PageWrapper.tsx** — max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- **Section.tsx** — `<section>` wrapper with `<Reveal>` and consistent py-16/24 spacing

### Route Updates

**__root.tsx** — Add `<Navbar />` + `<main><Outlet /></main>` + `<Footer />` inside existing root shell; keep notFoundComponent

**index.tsx (Home)** — Replace placeholder with 5 sections:
- HeroSection — homeCopy.hero + 4 stats from statsCopy
- EcosystemSection — ecosystemCopy 3 cards
- BrandsGridSection — Cairo Scan featured (col-span-2) + 5 others = 6 cards, each with BrandLogo
- PhysiciansSection — green bg, physiciansCopy.flow 4 steps
- NetworkPreviewSection — networkPreviewCopy headline + 3-country mini-stats from networkCopy.countries.items

**about.tsx (About)** — 5 sections:
- AboutHeroSection — aboutCopy.hero
- VisionMissionSection — aboutCopy.vision + aboutCopy.mission
- ValuesSection — 4 value cards from aboutCopy.values.items
- TimelineSection — 8 events alternating layout (L/R desktop, stacked mobile)
- TechPartnersSection — 4 partner cards

**platforms.tsx (Platforms Overview)** — 6 brand cards grid (3/2/1 cols responsive), each card links to /platforms/$slug with Link params; uses platformsCopy.hero + platformsCopy.overview

**platforms.$slug.tsx (Dynamic Brand)** — Loader: getBrand(params.slug), throw notFound() if brand.id === 'unknown'; sections: brand hero with BrandLogo, services list via getServicesByBrand(brand.slug) grouped by category, ecosystem note, CTA strip; head() with brand name in title; errorComponent + notFoundComponent per stack rules

### Key Paths
- NetworkPreviewSection: networkPreviewCopy + networkCopy.countries.items (Egypt, Saudi Arabia, Jordan)
- BrandsGridSection: brands array from src/data/en/brands.ts
- Brand detail: getBrand(slug), getServicesByBrand(slug)

### Verification
- tsc --noEmit clean
- /, /about, /platforms, /platforms/cairo-scan render
- /platforms/unknown → 404 (brand.id === 'unknown' triggers notFound())
- Mobile nav drawer functional
- Scroll reveal triggers once per section
