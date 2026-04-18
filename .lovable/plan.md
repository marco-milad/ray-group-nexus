
## Phase 1C — Types & Structured Data (Final)

### Type changes (replace existing)

1. **`src/types/brand.ts`** — replace. New shape: `{ id, slug, name, country: 'egypt'|'ksa'|'jordan'|'malta', color, founded, branches, serviceIds[], description, logo:{light,dark} }`. Drops `BrandId` union, `BRAND_COLORS`, etc.

2. **`src/types/branch.ts`** — replace. New shape: `{ id, brandId, name, city, country, coordinates, serviceIds[] }`.

3. **`src/types/investor.ts`** — replace. New shape: `{ id, name, shortName, portfolio, focus, color, type }`.

4. **`src/types/service.ts`** — NEW. `ServiceCategoryId`, `ServicePriority`, `ServiceCategory`, `ServiceItem`, `ClinicalPathway`.

### File rename (resolves naming collision)

5. **`src/data/en/services.ts`** → rename to **`src/data/en/servicesPage.ts`** (export stays `servicesCopy`). Update import in `src/data/en/index.ts`.

### New data files (verbatim from spec)

6. **`src/data/en/categories.ts`** — `categories[]` + `getCategoryById`.
7. **`src/data/en/services.ts`** (new file, structured catalogue) — full service catalogue + indexed O(1) helpers (`getServiceById`, `getServicesByBrand`, `getServicesByCategory`, `getFeaturedServices`, `getServicesSortedByPriority`).
8. **`src/data/en/pathways.ts`** — `pathways[]` + helpers.
9. **`src/data/en/brands.ts`** — 6 brands with `serviceIds` + Cloudinary logos.
10. **`src/data/en/investorData.ts`** — 5 shareholders (will add the missing `import type { Investor }`).

### Helpers

11. **`src/lib/getBrand.ts`** — refactor: drop `brandsArray` parameter, import `brands` from `@/data/en/brands` directly. Update `FALLBACK_BRAND` to match new `Brand` shape.

12. **`src/lib/stateUtils.ts`** — NEW, **using user's exact spec**:
    ```ts
    export type UIState = 'idle' | 'loading' | 'success' | 'error' | 'empty'
    export const STATE_PRIORITY: Record<UIState, number> = {
      error: 0, loading: 1, empty: 2, success: 3, idle: 4,
    }
    export function resolveState(states: UIState[]): UIState {
      return states.reduce((winner, current) =>
        STATE_PRIORITY[current] < STATE_PRIORITY[winner] ? current : winner
      )
    }
    ```

### Index barrel

13. **`src/data/en/index.ts`** — only update the `services` import path to `./servicesPage`. Data files (brands, services catalogue, categories, pathways, investorData) are NOT added to the copy barrel — they're imported directly via `@/data/en/<file>`, keeping `getCopy()` namespace clean.

### Verification

- `tsc --noEmit` clean.
- `getCopy('services.hero.headline')` still resolves (copy moved to `servicesPage.ts`).
- `getBrand('cairo-scan').name === 'Cairo Scan'`; `getBrand('xxx')` returns `FALLBACK_BRAND` + dev warn.
- `getServicesByBrand('cairo-scan').length > 0`, `getCategoryById('imaging')?.label === 'Imaging & Radiology'`.
- `resolveState(['success','loading','error']) === 'error'`.
