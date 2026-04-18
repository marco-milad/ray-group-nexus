
## Phase 2B — Remaining Pages + Routing (Final)

### Pre-execution checks (in plan, before build)

1. **ShareholdersTab import** — corrected to: `import { investors } from '@/data/en/investorData'`
2. **react-hook-form + zod** — will verify presence in `package.json` first. If both present → use them. If either missing → fall back to native HTML5 validation (`required`, `type="email"`, `maxLength`, `pattern`) + minimal React state for submit/success/error. No new deps installed.

### Build (no other changes from prior approval)

**Pages**
- `src/routes/network.tsx` → 5 sections (Hero, CountriesGrid, BrandDistribution, GrowthInsight, MapComingSoon)
- `src/routes/services.tsx` → Hero+stats, FeaturedServices, CategoryTabs (shadcn `<Tabs>` over `categories[]`), Pathways
- `src/routes/investors.tsx` → Hero + 9 shadcn `<Tabs>` (Thesis, Performance, Shareholders, Strategy, Risks, Expansion, Press, Governance, Exit)
- `src/routes/contact.tsx` → Hero, Form, Offices (2 Malta), InquiryTypeCards (3)

**Section components** under `src/components/sections/{network,services,investors,contact}/` — one file per section.

**Other**
- 404: improve existing `__root.tsx` `notFoundComponent` with brand styling + back-to-home (no new route file — TanStack file-based routing handles unmatched URLs via root).
- Navbar: update Services/Network/Investors/Contact links from `/` stubs to real paths.
- `src/data/en/index.ts`: verify `contactCopy` is already exported (it is per file listing); no change needed.

**Stack alignment**
- No Framer Motion / AnimatePresence — use existing `<Reveal>` (CSS + IntersectionObserver) per project rule.
- No `src/App.tsx` — TanStack file-based routing via `src/routes/`.
- All copy from `src/data/en/`. Zero hardcoded strings.
- Empty-state fallback for any list that could be empty (e.g., category with 0 services).
- `head()` per route from each page's `seo` block.

### Verification
- `tsc --noEmit` clean
- `/network`, `/services`, `/investors`, `/contact` render
- Services + Investors tabs interactive
- Contact form: validates, shows success state on submit (simulated, no backend)
- Unknown URL → branded 404
- Navbar links resolve correctly
