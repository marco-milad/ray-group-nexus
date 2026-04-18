
## Phase 3 Implementation Report — Plan

This is a **report-generation task**, not a code change. The output is a single Markdown document the user will share for external spec review. I'll deliver it inline as the response (no file write needed unless the user asks).

### Report structure

1. **Files Created / Modified** — grouped by phase (1A foundation → 1B copy → 1C utilities → 2A layout+3 pages → 2B remaining 4 pages → 3 orchestration). Verified against current `src/` tree.
2. **Spec Compliance** — table per major deliverable with ✅ / ⚠️ / ❌.
3. **Deviations from Master Spec** — concrete list:
   - Stack: TanStack Start v1 file-based routing instead of `src/App.tsx` + React Router
   - Animations: `<Reveal>` (IntersectionObserver + CSS) instead of Framer Motion
   - Renames: `Section.tsx` → `SectionShell.tsx` (visual) + new `Section.tsx` (orchestration consumer)
   - Charts: CSS bar charts instead of a chart library on Investors page
   - 404: handled via `__root.tsx` `notFoundComponent`, not a `src/pages/NotFound/`
   - Empty-state context keys: camelCase (`networkFilter`) instead of kebab-case (`network-filter`) to match TS-friendly `keyof`
4. **Open Items** — Phase 2 deferrals: interactive map, Arabic copy population, contact form backend wiring, dev DebugBar
5. **Verification Status** — `tsc --noEmit` clean; visual parity confirmed on all 7 routes; orchestration partial-error path implemented but not yet runtime-tested with an injected error

### Approval needed
Confirm the report should be **delivered inline in chat** (default), or also **written to `docs/IMPLEMENTATION_REPORT.md`** in the repo for the external reviewer.
