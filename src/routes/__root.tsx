import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import * as React from "react";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { Preloader } from "@/components/ui/Preloader";
import { FloatingActions } from "@/components/ui/FloatingActions";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div
          className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white"
          style={{ backgroundColor: "var(--rl-green)" }}
          aria-hidden
        >
          R
        </div>
        <h1 className="mt-6 text-7xl font-bold tracking-tight" style={{ color: "var(--rl-green)" }}>
          404
        </h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--rl-green)" }}
          >
            Back to home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ray Lab Group — Diagnostic Intelligence. Delivered at Scale." },
      {
        name: "description",
        content:
          "Multinational diagnostic healthcare group operating across Egypt, Saudi Arabia, and Jordan. 40+ branches, 6 platforms.",
      },
      { name: "author", content: "Ray Lab Group" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  // Always start with ready=false so server and client agree (no hydration mismatch).
  // The preloader is part of the SSR HTML and covers the screen from first paint.
  const [ready, setReady] = React.useState(false);
  const [skipPreloader, setSkipPreloader] = React.useState(false);

  React.useEffect(() => {
    // Returning visitor — skip the preloader animation entirely.
    if (sessionStorage.getItem("preloader-shown") === "true") {
      setSkipPreloader(true);
      setReady(true);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("preloader-shown", "true");
    setReady(true);
  };

  return (
    <>
      {!ready && <Preloader onComplete={handleComplete} skip={skipPreloader} />}
      <div
        className="flex min-h-screen flex-col bg-background"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <Navbar />
        <main className="flex-1">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </>
  );
}
