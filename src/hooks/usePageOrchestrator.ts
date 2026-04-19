/**
 * usePageOrchestrator — the brain of the page composition system.
 *
 * Consumes all section contracts and resolves an overall pageState plus
 * decision flags that drive what `<Page>` renders.
 *
 * Resolution rules (priority-ordered):
 *   1. ALL required sections error    → 'error' (critical)
 *   2. ALL sections loading/idle      → 'loading'
 *   3. ANY required section loading   → 'loading'
 *   4. SOME (not all) sections error  → partial errors, render with banner
 *   5. ALL success/empty              → 'success'
 */

import { useMemo } from "react";
import type { SectionContract } from "@/types/section";
import type { UIState } from "@/types/state";
import { resolveState } from "@/lib/stateUtils";

export interface OrchestratorResult {
  pageState: UIState;
  hasErrors: boolean;
  hasPartialErrors: boolean;
  allLoading: boolean;
  criticalError: boolean;
  readySections: string[];
  errorSections: string[];
}

export function usePageOrchestrator(sections: Record<string, SectionContract>): OrchestratorResult {
  return useMemo(() => {
    const all = Object.values(sections);
    const required = all.filter((s) => s.required !== false);

    const states = all.map((s) => s.state);
    const reqStates = required.map((s) => s.state);

    const hasErrors = states.some((s) => s === "error");
    const criticalError = reqStates.length > 0 && reqStates.every((s) => s === "error");
    const allLoading = states.length > 0 && states.every((s) => s === "loading" || s === "idle");
    const hasPartialErrors = hasErrors && !criticalError;

    const readySections = all
      .filter((s) => s.state === "success" || s.state === "empty")
      .map((s) => s.id);
    const errorSections = all.filter((s) => s.state === "error").map((s) => s.id);

    let pageState: UIState;
    if (criticalError) pageState = "error";
    else if (allLoading) pageState = "loading";
    else pageState = states.length > 0 ? resolveState(states) : "idle";

    return {
      pageState,
      hasErrors,
      hasPartialErrors,
      allLoading,
      criticalError,
      readySections,
      errorSections,
    };
  }, [sections]);
}
