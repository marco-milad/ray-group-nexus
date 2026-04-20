
## Plan: Verify build output, then deploy

### What I'll do (once you approve and I switch to default mode)

1. **Run the production build**
   ```
   bun run build
   ```
   Confirm exit code 0 and that `dist/server/server.js` exists.

2. **Verify the `process.env.TSS_*` replacements landed**
   ```
   grep -nE "process\.env\.TSS_(PRERENDERING|SHELL)" dist/server/server.js || echo "OK: no TSS process.env references"
   grep -nE "IS_PRERENDERING|IS_SHELL_ENV" dist/server/server.js | head
   ```
   Expected: zero matches for `process.env.TSS_*`. The `IS_PRERENDERING` / `IS_SHELL_ENV` lines should now read literal `"false" === "true"` after Vite's compile-time replacement.

3. **Sanity-check for any other surviving free `process` references**
   ```
   grep -nE "(^|[^.\w])process\." dist/server/server.js | head -20
   ```
   Any remaining hits get reported back so we can decide whether they are inside a polyfilled `node:process` import (safe) or another bare reference that needs a `define` entry.

4. **Deploy to Cloudflare Workers**
   ```
   wrangler deploy --config wrangler.deploy.toml
   ```
   Note: this requires `CLOUDFLARE_API_TOKEN` (and account ID) to be available in the sandbox env. I'll check `compgen -e | grep -i cloudflare` first. If the token isn't present, I'll stop and ask you to add it as a secret rather than failing the deploy.

5. **Smoke-test the deployed Worker**
   ```
   curl -sS -o /tmp/resp.html -w "HTTP %{http_code}\n" https://ray-lab-group.<account>.workers.dev/
   head -c 500 /tmp/resp.html
   ```
   Expected: `HTTP 200` and HTML starting with `<!DOCTYPE html>`. No `ReferenceError: process is not defined`. If the response is an error page, I'll pull `wrangler tail` output to surface the runtime error.

### What I won't change
- No code edits. No config edits. This is verification + deploy only.
- If step 2 shows `process.env.TSS_*` still present, I'll stop and report — that would mean the `define` keys don't match the bundle and we'd need a follow-up plan, not a blind deploy.

### What I need from you
- Confirm `CLOUDFLARE_API_TOKEN` is set as a project secret. If not, add it before approving so step 4 can run. Without it I can complete steps 1–3 only.
