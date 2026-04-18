/**
 * PageLoader — minimal branded loader shown when an entire page is
 * still initialising. Not a full-screen spinner; subtle and on-brand.
 */

import { globalCopy } from "@/data/en/global";

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div
        className="flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl text-xl font-bold text-white"
        style={{ backgroundColor: "var(--rl-green)" }}
        aria-hidden
      >
        R
      </div>
      <p className="text-sm text-muted-foreground">{globalCopy.loadingStates.page}</p>
    </div>
  );
}
