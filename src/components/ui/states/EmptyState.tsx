/**
 * EmptyState — context-driven empty UI.
 *
 * Copy is sourced from globalCopy.emptyStates — never hardcoded here.
 */

import { Button } from "@/components/ui/button";
import { globalCopy, type EmptyContext } from "@/data/en/global";

interface EmptyStateProps {
  context?: EmptyContext;
  onReset?: () => void;
}

export function EmptyState({ context = "generic", onReset }: EmptyStateProps) {
  const copy = globalCopy.emptyStates[context] ?? globalCopy.emptyStates.generic;

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-6 py-12 text-center">
      <h3 className="text-lg font-semibold text-foreground">{copy.title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{copy.body}</p>
      {copy.cta && onReset && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onReset}>
          {copy.cta}
        </Button>
      )}
    </div>
  );
}
