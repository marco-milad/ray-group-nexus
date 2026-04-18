/**
 * UI state resolution utility.
 *
 * Used by SectionContract, useUIState, and usePageOrchestrator to
 * deterministically pick the most important state when multiple sources
 * report status simultaneously.
 *
 * Priority (lowest number wins):
 *   error → loading → empty → success → idle
 */

export type UIState = "idle" | "loading" | "success" | "error" | "empty";

export const STATE_PRIORITY: Record<UIState, number> = {
  error: 0,
  loading: 1,
  empty: 2,
  success: 3,
  idle: 4,
};

export function resolveState(states: UIState[]): UIState {
  return states.reduce((winner, current) =>
    STATE_PRIORITY[current] < STATE_PRIORITY[winner] ? current : winner,
  );
}
