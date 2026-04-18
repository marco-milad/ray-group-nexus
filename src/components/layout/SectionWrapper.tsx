/**
 * SectionWrapper — per-section error boundary.
 *
 * Each major section is wrapped in this so a runtime error in one
 * section never takes down the entire page.
 */

import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorState } from "@/components/ui/states/ErrorState";

interface SectionWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName: string;
}

interface SectionWrapperState {
  hasError: boolean;
  error: Error | null;
}

export class SectionWrapper extends Component<SectionWrapperProps, SectionWrapperState> {
  state: SectionWrapperState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): SectionWrapperState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error(
        `[SectionWrapper] Error in section "${this.props.sectionName}":`,
        error,
        info,
      );
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) return this.props.fallback;
      return (
        <div className="px-4 py-12">
          <ErrorState error={this.state.error} variant="inline" />
        </div>
      );
    }
    return this.props.children;
  }
}
