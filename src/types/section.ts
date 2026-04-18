/**
 * SectionContract — the atomic unit of the orchestration system.
 *
 * Every section on every page must conform to this contract, so the
 * page orchestrator can deterministically resolve overall page state.
 */

import type { ReactNode } from "react";
import type { UIState } from "./state";

export interface SectionContract<TData = unknown> {
  /** Unique section identifier, e.g. 'home-hero' */
  id: string;
  /** The section's data — null until loaded */
  data: TData | null;
  /** Current state of this section */
  state: UIState;
  /** Custom fallback rendered when state === 'error' */
  fallback?: ReactNode;
  /**
   * If true, the page waits for this section and a failure escalates
   * to a critical page error. Defaults to true when omitted.
   */
  required?: boolean;
}
