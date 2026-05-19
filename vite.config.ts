// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// The cloudflare plugin is disabled (cloudflare: false) because we deploy to Node.js/IIS.
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig as lovableDefineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv, type ConfigEnv, type PluginOption } from "vite";

export default async (env: ConfigEnv) => {
  // Merge .env files into process.env so SSR functions see non-VITE_-prefixed vars
  // (e.g. RESEND_API_KEY). Vite's built-in injection only exposes VITE_-prefixed vars
  // to the client; non-prefixed vars need to be on process.env for server-side code.
  //
  // Precedence (Vite default): .env.local → .env.[mode].local → .env.[mode] → .env
  // In production (IIS + iisnode), process.env is populated by dotenv from a .env file
  // placed alongside server.js on the server (loaded at startup by server.js).
  const envVars = loadEnv(env.mode, process.cwd(), "");
  for (const [key, value] of Object.entries(envVars)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  // Nitro's prerender plugin is loaded ONLY for `vite build`. Dynamic import keeps
  // `nitro/vite` out of the dev module graph entirely — `vite dev` never executes
  // Nitro code, so the SSR-worker crash cannot occur:
  //   HTTPError: Vite environment "ssr" is unavailable
  const plugins: PluginOption[] = [];
  if (env.command === "build") {
    const { nitro } = await import("nitro/vite");
    const { PRERENDER_ROUTES } = await import("./scripts/prerender-routes.mjs");
    plugins.push(
      nitro({
        prerender: {
          crawlLinks: true,
          failOnError: true,
          routes: PRERENDER_ROUTES,
        },
      }),
    );
  }

  return lovableDefineConfig({
    cloudflare: false,
    plugins,
    vite: {
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
        "process.env.TSS_PRERENDERING": JSON.stringify("false"),
        "process.env.TSS_SHELL": JSON.stringify("false"),
      },
    },
  })(env);
};
