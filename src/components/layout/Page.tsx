/**
 * Page — top-level orchestration provider for every page.
 *
 * Resolves overall page state from all SectionContracts and decides
 * whether to render the full page, a critical error, a global loader,
 * or a partial-error banner above the content.
 */

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { PageContext as PageContextType } from "@/types/page";
import type { SectionContract } from "@/types/section";
import { usePageOrchestrator } from "@/hooks/usePageOrchestrator";
import { ErrorState } from "@/components/ui/states/ErrorState";
import { PageLoader } from "@/components/ui/states/PageLoader";
import { ErrorBanner } from "./ErrorBanner";

const PageCtx = createContext<PageContextType | null>(null);

export function usePageContext(): PageContextType {
  const ctx = useContext(PageCtx);
  if (!ctx) {
    throw new Error("usePageContext must be used inside <Page>");
  }
  return ctx;
}

interface PageProps<TCopy> {
  pageId: string;
  copy: TCopy;
  sections: Record<string, SectionContract>;
  children: ReactNode;
}

export function Page<TCopy>({ pageId, copy, sections, children }: PageProps<TCopy>) {
  const { pageState, hasPartialErrors, criticalError, allLoading, errorSections } =
    usePageOrchestrator(sections);

  const ctxValue = useMemo<PageContextType>(
    () => ({ pageId, copy, sections, pageState }),
    [pageId, copy, sections, pageState],
  );

  if (criticalError) {
    return <ErrorState variant="page" />;
  }

  if (allLoading) {
    return <PageLoader />;
  }

  return (
    <PageCtx.Provider value={ctxValue}>
      {hasPartialErrors && <ErrorBanner affectedSections={errorSections} />}
      {children}
    </PageCtx.Provider>
  );
}
