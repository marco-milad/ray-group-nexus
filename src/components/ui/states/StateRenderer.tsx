/**
 * StateRenderer — declarative dispatcher for UI state.
 *
 * Priority: error > loading > empty > success.
 * Eliminates if/else chains in pages and section components.
 */

import type { ReactNode } from "react";
import type { UIState } from "@/types/state";
import { Skeleton, type SkeletonVariant } from "./Skeleton";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import type { EmptyContext } from "@/data/en/global";

interface StateRendererProps<T> {
  state: UIState;
  data: T | null;
  error?: Error | null;
  onRetry?: () => void;
  retryCount?: number;
  maxRetries?: number;
  skeletonVariant?: SkeletonVariant;
  skeletonCount?: number;
  emptyContext?: EmptyContext;
  onEmptyReset?: () => void;
  fallback?: ReactNode;
  children: (data: T) => ReactNode;
}

export function StateRenderer<T>({
  state,
  data,
  error,
  onRetry,
  retryCount = 0,
  maxRetries = 3,
  skeletonVariant = "card",
  skeletonCount = 3,
  emptyContext = "generic",
  onEmptyReset,
  fallback,
  children,
}: StateRendererProps<T>) {
  if (state === "error") {
    if (fallback !== undefined) return <>{fallback}</>;
    return (
      <ErrorState
        error={error}
        onRetry={onRetry}
        retryCount={retryCount}
        maxRetries={maxRetries}
        variant="inline"
      />
    );
  }
  if (state === "loading" || state === "idle") {
    return <Skeleton variant={skeletonVariant} count={skeletonCount} />;
  }
  if (state === "empty") {
    return <EmptyState context={emptyContext} onReset={onEmptyReset} />;
  }
  if (state === "success" && data !== null && data !== undefined) {
    return <>{children(data)}</>;
  }
  return null;
}
