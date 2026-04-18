
Two-part verification task. Both parts need default mode (grep needs exec; visual QA needs browser tools).

## Plan

**1. Brand logo `<img>` audit**
- Run `grep -rn "<img" src/components src/routes` and report every match.
- For each hit, classify: brand logo (must become `<BrandLogo>`) vs. legitimate non-logo image (hero photo, icon, etc.).
- If any brand-logo `<img>` exists, list the file + line and flag for replacement (no edits in this turn — report only, per user's request).

**2. Visual parity QA across 9 routes**
- Use `browser--navigate_to_sandbox` for each path: `/`, `/about`, `/platforms`, `/platforms/cairo-scan`, `/network`, `/services`, `/investors`, `/contact`, and one unknown URL (e.g. `/does-not-exist`) for the branded 404.
- For each: screenshot + observe key sections, then mark ✅ renders correctly / ⚠️ with description.
- For `/services` and `/investors`, also click through tabs to confirm interactivity.
- Check console logs after each route for runtime errors.

**Deliverable**: single combined report with both sections (grep results + per-route status table).
