/**
 * ErrorBanner — top-of-page warning strip when some sections fail
 * but the page still renders meaningful content.
 */

import { globalCopy } from "@/data/en/global";

interface ErrorBannerProps {
  message?: string;
  affectedSections?: string[];
}

export function ErrorBanner({ message, affectedSections }: ErrorBannerProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 border-b border-destructive/30 bg-destructive/5 px-4 py-2 text-sm text-foreground"
      role="status"
    >
      <span>{message ?? globalCopy.errors.partialContent}</span>
      {import.meta.env.DEV && affectedSections && affectedSections.length > 0 && (
        <span className="text-xs text-muted-foreground">
          Sections: {affectedSections.join(", ")}
        </span>
      )}
    </div>
  );
}
