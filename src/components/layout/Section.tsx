/**
 * Section — orchestration consumer.
 *
 * Reads its own SectionContract from PageContext by id, wraps the
 * render tree in a per-section error boundary, and delegates state
 * dispatch (loading / empty / error / success) to StateRenderer.
 *
 * NOTE: This is the orchestration `<Section>`. The visual wrapper
 * (padding + Reveal + PageWrapper) lives in `<SectionShell>`.
 */

import type { ReactNode } from "react";
import { usePageContext } from "./Page";
import { SectionWrapper } from "./SectionWrapper";
import { StateRenderer } from "@/components/ui/states/StateRenderer";
import type { SkeletonVariant } from "@/components/ui/states/Skeleton";
import type { EmptyContext } from "@/data/en/global";

interface SectionProps {
  id: string;
  skeletonVariant?: SkeletonVariant;
  skeletonCount?: number;
  emptyContext?: EmptyContext;
  onEmptyReset?: () => void;
  children: (data: unknown) => ReactNode;
}

export function Section({
  id,
  skeletonVariant = "card",
  skeletonCount = 3,
  emptyContext,
  onEmptyReset,
  children,
}: SectionProps) {
  const { sections } = usePageContext();
  const contract = sections[id];

  if (!contract) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`[Section] No contract found for section: "${id}"`);
    }
    return null;
  }

  return (
    <SectionWrapper sectionName={id} fallback={contract.fallback}>
      <StateRenderer
        state={contract.state}
        data={contract.data}
        skeletonVariant={skeletonVariant}
        skeletonCount={skeletonCount}
        emptyContext={emptyContext}
        onEmptyReset={onEmptyReset}
        fallback={contract.fallback}
      >
        {children}
      </StateRenderer>
    </SectionWrapper>
  );
}
