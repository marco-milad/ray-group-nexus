/**
 * ErrorState — branded error UI with retry logic.
 *
 * Variants:
 *   inline — small, inside a section
 *   page   — full-page error screen
 *   banner — top-of-page warning strip for partial failures
 *
 * After maxRetries is exhausted, swaps the retry CTA for a Contact Us link.
 */

import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { globalCopy } from "@/data/en/global";

export type ErrorStateVariant = "inline" | "page" | "banner";

interface ErrorStateProps {
  error?: Error | null;
  onRetry?: () => void;
  retryCount?: number;
  maxRetries?: number;
  variant?: ErrorStateVariant;
  message?: string;
}

export function ErrorState({
  error,
  onRetry,
  retryCount = 0,
  maxRetries = 3,
  variant = "inline",
  message,
}: ErrorStateProps) {
  const exhausted = retryCount >= maxRetries;
  const text =
    message ??
    (exhausted ? globalCopy.errors.persistentError : globalCopy.errors.genericError);

  const wrapperClass =
    variant === "page"
      ? "flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
      : variant === "banner"
        ? "flex flex-wrap items-center justify-between gap-3 border-l-4 border-destructive bg-destructive/5 px-4 py-3 text-sm"
        : "flex flex-col items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-8 text-center";

  return (
    <div className={wrapperClass} role="alert">
      <div className={cn(variant === "banner" ? "flex items-center gap-2" : "")}>
        {variant !== "banner" && (
          <div className="text-3xl" aria-hidden>
            ⚠️
          </div>
        )}
        <p
          className={cn(
            variant === "page"
              ? "mt-3 text-lg font-medium text-foreground"
              : variant === "banner"
                ? "text-foreground"
                : "mt-2 text-sm font-medium text-foreground",
          )}
        >
          {text}
        </p>
      </div>

      <div
        className={cn(
          "flex flex-wrap items-center gap-2",
          variant === "page" ? "mt-6" : variant === "banner" ? "" : "mt-4",
        )}
      >
        {!exhausted && onRetry && (
          <Button size={variant === "page" ? "default" : "sm"} onClick={onRetry}>
            {globalCopy.cta.tryAgain}
            {retryCount > 0 ? ` (${retryCount}/${maxRetries})` : ""}
          </Button>
        )}
        {exhausted && (
          <Button asChild size={variant === "page" ? "default" : "sm"} variant="outline">
            <Link to="/contact">{globalCopy.cta.contactUs}</Link>
          </Button>
        )}
        {variant === "page" && (
          <Button asChild size="default" variant="ghost">
            <Link to="/">{globalCopy.cta.backToHome}</Link>
          </Button>
        )}
      </div>

      {import.meta.env.DEV && error && (
        <details className="mt-4 max-w-2xl text-left text-xs text-muted-foreground">
          <summary className="cursor-pointer">Dev: Error Details</summary>
          <pre className="mt-2 overflow-auto whitespace-pre-wrap rounded bg-muted/40 p-3">
            {error.message}
            {error.stack ? `\n${error.stack}` : ""}
          </pre>
        </details>
      )}
    </div>
  );
}
