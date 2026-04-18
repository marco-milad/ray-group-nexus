
## Phase 1A — Foundation (No UI)

Adapting the spec to TanStack Start + Tailwind v4. No components or pages built yet — only configuration, types, and copy files.

### 1. Design tokens & fonts
- Update `src/styles.css`:
  - Add Google Fonts `@import` for **Montserrat** (EN) and **Alexandria** (AR, future)
  - Add Ray Lab brand color tokens + sub-brand colors as CSS custom properties under `:root`
  - Register them in the existing `@theme inline` block so they become Tailwind utilities (`bg-rl-green`, `text-rl-eerie`, `bg-cairo-scan`, etc.)
  - Add `--font-en` / `--font-ar` and wire into `@theme inline` as `--font-sans`
  - Set `body` to use Montserrat by default

> Note: Tailwind v4 uses CSS-based config, so there's no `tailwind.config.ts`. All tokens live in `styles.css` — same outcome, idiomatic syntax.

### 2. Folder structure
Create empty placeholder directories (with a `.gitkeep` or barrel `index.ts` where useful) so the structure exists for 1B:
- `src/components/ui/{Button,Badge,Card,StatCard,BrandChip,BrandLogo,SectionHeader,states}/`
- `src/components/layout/{Navbar,Footer,PageWrapper}/`
- `src/data/en/sections/`
- `src/types/`
- `src/hooks/`
- `src/lib/`

> Pages will live in `src/routes/` (TanStack file-based routing), **not** `src/pages/`. One route file per top-level page (about.tsx, platforms.tsx, network.tsx, services.tsx, investors.tsx, contact.tsx) — created in 1B.

### 3. TypeScript types (`src/types/`)
- `brand.ts` — Brand, sub-brand identifiers, brand color map
- `branch.ts` — Branch location shape (country, city, brand, services)
- `investor.ts` — Shareholder / DFI consortium shape

### 4. Copy infrastructure (`src/lib/`)
- `getCopy.ts` — key-based path resolver with locale support, dev-mode missing-key warnings, fallback string. Imports from `@/data/en` (and a stub `@/data/ar` for future).

### 5. Copy files — Phase 1A scope only
All typed with `as const` + exported `*Copy` type.

**Global & shared:**
- `src/data/en/global.ts` — brand, nav, CTAs, footer, errors
- `src/data/en/index.ts` — barrel export + `COPY_VERSION = 'v1'`
- `src/data/ar/index.ts` — empty stub for getCopy fallback

**Reusable sections (`src/data/en/sections/`):**
- `ecosystem.ts` — Diagnostics / Clinics / Teleradiology cards
- `stats.ts` — 8 KPI stats
- `physicians.ts` — referring physicians 4-step flow
- `networkPreview.ts` — homepage network teaser
- `contactCta.ts` — bottom-of-page CTA strip

**Page copy:**
- `src/data/en/home.ts` — seo, hero, brands intro
- `src/data/en/about.ts` — seo, hero, vision, mission, values, timeline (8 events), tech partners

### 6. Verification
- `index.tsx` route stays as placeholder for now (1B will replace it)
- Confirm `npm run build` passes — TanStack route tree regenerates cleanly, no missing imports, no TS errors
- `getCopy('home.hero.headline')` resolves correctly

### Out of scope for 1A (deferred to 1B / later)
- Framer Motion (using CSS + tw-animate-css instead)
- All UI components, layout shell, pages
- Remaining copy files: platforms, network (full), services, investors, contact, brands, branchData, investorData, pathways, categories
- Logo/asset loading and BrandLogo fallback hierarchy

After approval, I'll switch to default mode and execute this foundation pass.
