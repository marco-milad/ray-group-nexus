// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";

// Load .env files into process.env so server-side code (vite dev SSR) sees them.
// Vite's built-in env injection only exposes VITE_-prefixed vars to client; non-prefixed
// vars (like RESEND_API_KEY) need to be merged into process.env for SSR functions.
//
// Precedence (Vite default): .env.local → .env.[mode].local → .env.[mode] → .env
// In production (Cloudflare Workers), process.env is populated by wrangler secrets
// at runtime via nodejs_compat — no .env loading needed.
const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
for (const [key, value] of Object.entries(env)) {
  if (process.env[key] === undefined) {
    process.env[key] = value;
  }
}

export default defineConfig({
  vite: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.TSS_PRERENDERING": JSON.stringify("false"),
      "process.env.TSS_SHELL": JSON.stringify("false"),
    },
  },
});
