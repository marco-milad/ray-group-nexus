
## Phase 3 — Orchestration, Edge States & Polish (Final)

### Strict execution sequence

**Step A — Rename only (atomic batch):**
1. Create `src/components/layout/SectionShell.tsx` with the exact contents of the current `Section.tsx`.
2. Update all imports across the codebase: `import { Section } from "@/components/layout/Section"` → `import { SectionShell } from "@/components/layout/SectionShell"`, and every `<Section ...>` JSX usage → `<SectionShell ...>`. Affected files (~30) live under `src/components/sections/{home,about,services,network,investors,contact,shared}/` plus any route files using it directly.
3. Delete the old `src/components/layout/Section.tsx`.
4. **Gate:** run `tsc --noEmit`. Must be clean. If not, fix before Step B.

**Step B — Build orchestration primitives** (only after Step A passes):
- `src/types/state.ts` (re-export from `lib/stateUtils.ts`)
- `src/types/section.ts` — `SectionContract<TData>`
- `src/types/page.ts` — `PageContext<TCopy>`
- `src/hooks/usePageOrchestrator.ts`
- Verify existing `src/hooks/useUIState.ts` matches spec (extend if needed)

**Step C — Build state UI components:**
- `src/components/ui/states/Skeleton.tsx` (150ms delay, shape variants)
- `src/components/ui/states/EmptyState.tsx`
- `src/components/ui/states/ErrorState.tsx` (inline/page/banner variants + retry)
- `src/components/ui/states/StateRenderer.tsx`
- `src/components/ui/states/PageLoader.tsx`

**Step D — Build composition + boundaries:**
- `src/components/layout/Page.tsx` (new — orchestration provider)
- `src/components/layout/Section.tsx` (new — orchestration consumer; safe to create now that old one is gone)
- `src/components/layout/SectionWrapper.tsx` (per-section error boundary)
- `src/components/layout/ErrorBanner.tsx`
- `src/components/layout/ErrorBoundary.tsx` (mount in `__root.tsx`)

**Step E — Expand copy** in `src/data/en/global.ts`: add `errors.{persistentError, imageLoadError, brandNotFound, networkError}`, `loadingStates`, `emptyStates.{networkFilter, search, pressArticles, servicesCategory, generic}`.

**Step F — Refactor 7 routes onto `<Page>` + `<Section>`:**
`/`, `/about`, `/services`, `/network`, `/platforms`, `/platforms/$slug`, `/contact`, `/investors`. Each existing visual section component keeps using `<SectionShell>` internally and now accepts `data` via the orchestration child render prop. Static-copy sections get `state: 'success'` contracts.

**Step G — Final gates:**
- `tsc --noEmit` clean
- Grep: zero raw `<img>` for brand logos
- All `<Skeleton>` instances use 150ms delay
- All 7 routes render with visual parity
- Inject test error in one section → partial-error banner; rest of page renders

### Already satisfied (no work)
`BrandLogo`, `getBrand` + FALLBACK_BRAND, `getCopy` with dev warnings, branded 404 in `__root.tsx`, router-level error component, `Reveal` for scroll animations.
