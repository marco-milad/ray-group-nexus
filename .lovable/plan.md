
## Diagnosis

The `process is not defined` error comes from TanStack Start's bundled SSR output containing literal `process.env.TSS_PRERENDERING` and `process.env.TSS_SHELL` references. In the Cloudflare Workers runtime there is no `process` global, and these reads happen at module top-level — before any compatibility shim could load — so the Worker throws on first request.

Your `define` attempt was the right idea, but two things blocked it:

1. **Wrong file is now active.** I renamed `wrangler.toml` → `wrangler.deploy.toml` last turn to unblock the build. The Cloudflare Vite plugin only auto-discovers `wrangler.toml`/`wrangler.jsonc`, so it no longer sees your config at build time and therefore does not run the Worker build pass that would consume those `define`s. Your "main field doesn't point to existing file" error was the plugin loading the toml *before* the build wrote `dist/server/server.js` — a chicken-and-egg.
2. **`nodejs_compat_v2`** alone does not polyfill bare `process` references that survive bundling — it polyfills `node:process` *imports*. The `define` approach (compile-time string replacement) is the correct fix, not a runtime polyfill.

The right architecture: keep the Worker config under a name the Vite plugin does *not* auto-load during build (`wrangler.deploy.toml`), use Vite `define` to inline-replace the three `process.env.*` reads at build time, and deploy with `wrangler deploy --config wrangler.deploy.toml`.

## Plan

### 1. `vite.config.ts` — keep `define`, but make replacements bulletproof

Current `define` is correct in shape but the keys must match exactly what's in the bundle. Add the plain `process.env` fallback so any other stray reads collapse to `{}` instead of throwing.

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.TSS_PRERENDERING": JSON.stringify("false"),
      "process.env.TSS_SHELL": JSON.stringify("false"),
    },
  },
});
```

(No change from current — confirmed correct.)

### 2. `wrangler.deploy.toml` — keep, but switch back to `nodejs_compat`

`nodejs_compat_v2` requires `compatibility_date >= 2024-09-23` and changes module resolution semantics in ways the Lovable preset isn't tuned for. Use plain `nodejs_compat` with a recent date.

```toml
name = "ray-lab-group"
main = "dist/server/server.js"
compatibility_date = "2024-11-01"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = "dist/client"

[vars]
NODE_ENV = "production"
```

### 3. Do NOT recreate `wrangler.toml` / `wrangler.jsonc`

That's what causes the "main field doesn't point to existing file" build failure — the Cloudflare Vite plugin auto-loads it during config resolution, before the build has produced `dist/server/server.js`. Keep the deploy config under the non-default name.

### 4. Deploy command

After `bun run build`, deploy with:
```
wrangler deploy --config wrangler.deploy.toml
```

### Why this works
- `define` performs **build-time string replacement** in the bundled output. After build, `dist/server/server.js` line 709–710 will read literally `var IS_PRERENDERING = "false" === "true";` — no `process` reference survives. The runtime error disappears at its source.
- The Worker config stays out of Vite's auto-discovery path, so the build can produce `dist/server/server.js` first, and `wrangler deploy` reads the config second.
- `nodejs_compat` is the supported flag for the date range and covers any remaining `node:*` imports the bundle may need.

### Files to change
1. `wrangler.deploy.toml` — change `compatibility_date` to `"2024-11-01"` and `compatibility_flags` to `["nodejs_compat"]`.
2. `vite.config.ts` — no change (already correct).
3. No new `wrangler.toml` / `wrangler.jsonc`.

### Verification
- `bun run build` completes; `dist/server/server.js` exists.
- `grep "process.env.TSS" dist/server/server.js` returns nothing.
- `wrangler deploy --config wrangler.deploy.toml` succeeds; first request to the Worker returns HTML, no `ReferenceError`.
