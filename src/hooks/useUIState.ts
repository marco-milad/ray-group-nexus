/**
 * useUIState — single state machine per async operation.
 *
 * Replaces multiple boolean flags (isLoading / isError / isEmpty) with
 * one predictable, exhaustive state. Auto-detects 'empty' for null
 * results or empty arrays. Supports manual retry up to maxRetries.
 */

import { useCallback, useState } from "react";
import type { UIState } from "@/types/state";

export interface UseUIStateOptions {
  initialState?: UIState;
  maxRetries?: number;
  onError?: (error: Error) => void;
}

export interface UseUIStateReturn<T> {
  state: UIState;
  data: T | null;
  error: Error | null;
  retryCount: number;
  execute: (fn: () => Promise<T>) => Promise<void>;
  retry: () => void;
  reset: () => void;
}

export function useUIState<T>(options: UseUIStateOptions = {}): UseUIStateReturn<T> {
  const { initialState = "idle", maxRetries = 3, onError } = options;

  const [state, setState] = useState<UIState>(initialState);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [lastFn, setLastFn] = useState<(() => Promise<T>) | null>(null);

  const execute = useCallback(
    async (fn: () => Promise<T>) => {
      setLastFn(() => fn);
      setState("loading");
      setError(null);
      try {
        const result = await fn();
        setData(result);
        const isEmpty =
          result === null || result === undefined || (Array.isArray(result) && result.length === 0);
        setState(isEmpty ? "empty" : "success");
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        setState("error");
        onError?.(e);
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.error("[useUIState]", e);
        }
      }
    },
    [onError],
  );

  const retry = useCallback(() => {
    if (!lastFn || retryCount >= maxRetries) return;
    setRetryCount((c) => c + 1);
    void execute(lastFn);
  }, [lastFn, retryCount, maxRetries, execute]);

  const reset = useCallback(() => {
    setState("idle");
    setData(null);
    setError(null);
    setRetryCount(0);
  }, []);

  return { state, data, error, retryCount, execute, retry, reset };
}
