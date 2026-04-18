/**
 * PageContext — single source of truth per page.
 *
 * Binds copy + section contracts + resolved page state into one
 * object passed down via React Context. No prop drilling.
 */

import type { UIState } from "./state";
import type { SectionContract } from "./section";

export interface PageContext<TCopy = unknown> {
  pageId: string;
  copy: TCopy;
  sections: Record<string, SectionContract>;
  pageState: UIState;
}
