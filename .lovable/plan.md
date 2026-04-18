
## Phase 1B — Remaining Copy Files

Add the remaining page copy files and a brand lookup helper. No UI work — copy + types only.

### Files to create

1. **`src/data/en/investors.ts`** — full 9-section investors copy (hero, thesis, performance, shareholders, strategy, risks, expansion, exit, governance, press, tabs). Verbatim from the spec, typed `as const` + exported `InvestorsCopy`.

2. **`src/data/en/contact.ts`** — contact page copy (hero, form fields, offices, inquiry types). Verbatim, typed.

3. **`src/data/en/platforms.ts`** — platforms page copy. Spec didn't ship verbatim copy in 1B — I'll author a structured shell aligned to the 6 sub-brands (Cairo Scan, TechnoScan, CRC, MedRay, Specialized Clinics, Ray Medical) with: seo, hero, intro, brand-card framework (eyebrow/headline per brand placeholder), and a CTA strip. Conservative content matching the brand voice already established in `home.ts` / `about.ts` — easy to swap when client copy lands.

4. **`src/data/en/network.ts`** — full Network Intelligence Preview copy from the master spec (countries grid, brand distribution, growth insight, map-coming-soon). No interactive map. Verbatim from master prompt.

5. **`src/data/en/services.ts`** — services page copy. Spec didn't ship verbatim — I'll author a structured shell: seo, hero, three service pillars matching `ecosystemCopy` (Diagnostics / Clinics / Teleradiology) expanded into modality lists (MRI, CT, PET-CT, Mammography, Ultrasound, Lab, Teleradiology), and a CTA strip.

6. **`src/data/en/index.ts`** — extend the existing barrel to export all new copy modules + add to the `sections` namespace where applicable. Preserve `COPY_VERSION = 'v1'`. Verify nothing existing breaks.

7. **`src/lib/getBrand.ts`** — safe brand-id lookup helper:
   - `FALLBACK_BRAND` constant (Ray Lab Group default — neutral green).
   - `getBrand(id)` returns the matching brand entry from a small registry keyed off `Brand` type in `src/types/brand.ts`, or `FALLBACK_BRAND` if missing.
   - Dev-mode `console.warn` on miss (matches `getCopy` pattern).

### Already in place — skipped
- `src/lib/getCopy.ts` — already created in 1A, working as spec'd.
- `src/data/en/index.ts` already has `COPY_VERSION` — just extend it.

### Out of scope (deferred)
- TS interfaces beyond brand registry (1C handles `branchData`, `investorData`, `pathways`, `categories`).
- Any UI / route changes.
- AR translations (stub stays empty).

### Verification
- `tsc --noEmit` clean.
- `getCopy('investors.hero.headline')`, `getCopy('contact.form.submit')`, `getCopy('network.countries.items.0.country')`, `getCopy('platforms.hero.headline')`, `getCopy('services.hero.headline')` all resolve.
- `getBrand('cairo-scan')` returns brand entry; `getBrand('unknown')` returns `FALLBACK_BRAND` + warns in dev.
