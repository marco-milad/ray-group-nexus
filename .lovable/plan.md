
## Plan: Update Flag Image URLs to SVG Format

### What to do
Update the flag image URL in `NetworkPreviewSection.tsx` to use SVG format instead of PNG for infinite quality scaling.

### Change details
- **File:** `src/components/sections/home/NetworkPreviewSection.tsx`
- **Line 42:** Replace:
  - **From:** `https://flagcdn.com/w40/${c.country === "Egypt" ? "eg" : c.country === "Saudi Arabia" ? "sa" : "jo"}.png`
  - **To:** `https://flagcdn.com/${c.country === "Egypt" ? "eg" : c.country === "Saudi Arabia" ? "sa" : "jo"}.svg`

### What's different
- Removed `w40/` prefix (width parameter not needed for SVG)
- Changed `.png` to `.svg` for vector-based infinite quality
- All other code remains exactly the same

### Verification
- All three countries (Egypt, Saudi Arabia, Jordan) are covered by the ternary logic
- SVG flags will render with the same 36x26 dimensions as before
- No other changes to component structure, styling, or behavior
