// Minimal Vite SPA config. We deploy a static build to GoDaddy.
// `@lovable.dev/vite-tanstack-config` already wires up tanstackStart, viteReact,
// tailwindcss, tsConfigPaths, componentTagger (dev-only), VITE_* env injection,
// @ path alias, React/TanStack dedupe, error logger plugins, and sandbox detection.
// The cloudflare plugin is disabled because we target static hosting (not Workers).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  // TanStack Start's built-in SPA mode emits a single static SPA shell that
  // the client-side router takes over from. No SSR server, no Nitro, no
  // server-side prerender pipeline — exactly what static hosting (GoDaddy) needs.
  //
  // The default shell filename is `_shell.html`, but static hosts serve
  // `index.html` for `/` by convention, so we override the output path.
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: { outputPath: "/index" },
    },
  },
  vite: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.TSS_PRERENDERING": JSON.stringify("false"),
      "process.env.TSS_SHELL": JSON.stringify("false"),
    },
  },
});
