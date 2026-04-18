/**
 * ErrorBoundary — global app-level error boundary.
 *
 * Wraps the router Outlet so any uncaught runtime error renders a
 * branded error screen instead of a white screen of death.
 */

import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorState } from "@/components/ui/states/ErrorState";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("[ErrorBoundary]", error, info);
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          error={this.state.error}
          variant="page"
          onRetry={() => {
            this.reset();
            window.location.reload();
          }}
        />
      );
    }
    return this.props.children;
  }
}
