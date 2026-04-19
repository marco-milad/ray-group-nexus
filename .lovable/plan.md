
## Diagnosis: Why content flashes before the preloader

The flash is a classic SSR hydration mismatch. Here is the exact sequence with the current code in `src/routes/__root.tsx`:

1. **Server render (Cloudflare Worker)**: `typeof window === "undefined"` is true, so the initializer returns `ready = true`. The server emits HTML with the **full page** (Navbar + Outlet + Footer) at `opacity: 1`, and **no `<Preloader>`** in the DOM.
2. **Browser receives HTML**: Before any JS runs, the browser paints that fully-rendered page. **This is the flash.**
3. **Hydration starts**: React runs the same `useState` initializer on the client. Now `typeof window !== "undefined"`, so it checks `sessionStorage.getItem("preloader-shown")`. On a first visit it returns `null`, so `ready` becomes `false`.
4. **React reconciles**: `<Preloader>` mounts on top, and the page wrapper switches to `opacity: 0`. The preloader now covers the already-painted content.
5. Preloader finishes → `ready = true` → content fades in.

Two things make this worse:
- The server HTML and the first client render disagree on `ready` → React logs a hydration warning and the server-painted DOM is visible for the entire time between paint and hydration (often 200–800 ms on a cold Worker + slow network).
- `Preloader` is rendered as a sibling **after** the content wrapper in the tree, but it relies on `position: fixed` + `z-index: 9999` to cover. It only covers **after** it mounts, not during the pre-hydration paint window.

Root cause in one line: the preloader's "should I show?" decision lives in client-only `sessionStorage`, but the server has to commit to an HTML output before it can know that — so the server always ships "no preloader, content visible," and the client has to undo that after paint.

## The correct fix for SSR on Cloudflare Workers

You cannot read `sessionStorage` on the server. So the server must always ship HTML in the **safe default state** that matches what a first-time visitor will see, and the client only **removes** the preloader — never adds it after paint.

Concretely:

1. **Server-side default = preloader visible, content hidden.** The server always renders `<Preloader>` and the content wrapper at `opacity: 0`. This means the very first paint the browser does — before any JS — is the dark preloader screen. No flash possible, because content is never visible first.

2. **Client decides whether to skip.** After hydration, a `useEffect` checks `sessionStorage`. If `preloader-shown === "true"`, it immediately sets `ready = true` and the preloader fades out instantly (or is skipped entirely). If not, the preloader runs its animation as normal and then sets `ready = true` on completion.

3. **Avoid hydration mismatch.** Because both server and client render the same initial state (`ready = false`, preloader present), React hydrates cleanly with no warning and no DOM swap.

4. **Inline critical CSS for the preloader background on `<body>` or `<html>`** so that even the brief moment between HTML parse and React hydration shows the dark `--rl-eerie` background, not a white flash. Set `background-color: var(--rl-eerie)` on `body` in `styles.css` (or via inline style in `RootShell`). The content wrapper keeps its own `bg-background` which overrides once visible.

## Plan

**File: `src/routes/__root.tsx`**
- Change `useState` initializer to always return `false` (no `typeof window` branch). Server and client now agree: preloader shows, content hidden.
- Add a `useEffect` that runs once on mount: if `sessionStorage.getItem("preloader-shown") === "true"`, call `setReady(true)` immediately (returning visitor — preloader gets skipped/instant-fade).
- Keep `handleComplete` as-is for first-time visitors.
- Keep the content wrapper's `opacity` tied to `ready` so it stays hidden under the preloader.

**File: `src/components/ui/Preloader.tsx`**
- Add a `skip` prop (boolean). When `true`, the component renders nothing (or fades out in one frame) and calls `onComplete` immediately via `useEffect`. This handles returning visitors cleanly without running the 3-second animation.
- No other changes to the animation logic.

**File: `src/styles.css`**
- Add `body { background-color: var(--rl-eerie); }` so the pre-hydration paint matches the preloader background. This eliminates the white flash before React even runs.

**No changes** to `vercel.json`, `wrangler.toml`, the routes, or any other file. This is purely a render-order fix.

### Why this works on Cloudflare Workers SSR specifically
- The Worker emits HTML that is identical to the first client render → no hydration mismatch, no React warning, no DOM swap.
- The preloader is in the server HTML, so it covers the screen from the very first paint, before JS even loads.
- `sessionStorage` access is deferred to `useEffect`, which only runs after hydration — that is the only place it is legal to read it in an SSR app.
- Returning visitors see the preloader for ~1 frame at most (then it skips), which is imperceptible and far better than the current flash.

### Verification after the change
- Hard reload (Cmd+Shift+R): preloader visible immediately, no content flash, full animation plays, content fades in.
- Soft reload after that: preloader either invisible or visible for one frame, content appears immediately.
- Check browser console: no "hydration mismatch" warnings from React.
