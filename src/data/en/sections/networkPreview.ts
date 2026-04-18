/**
 * Network preview copy — shown on Home page as a teaser strip.
 * Full Network page uses networkCopy (added in Phase 1B).
 *
 * ⚠️ Phase 1: interactive map deferred to Phase 2.
 *    Reason: real branch coordinates + clustering not yet available.
 */

export const networkPreviewCopy = {
  eyebrow: "Our Network",
  headline: "40+ Branches Across",
  headlineAccent: "4 Countries.",
  subheadline:
    "From Cairo to Amman, Riyadh to Upper Egypt — Ray Lab Group serves patients across the MENA region.",
  cta: "View Full Network",
} as const;

export type NetworkPreviewCopy = typeof networkPreviewCopy;
