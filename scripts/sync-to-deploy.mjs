// Postbuild sync: copies the prerendered static site from .output/public/
// into the sibling deploy repo at ../raylabgroup-site/dist/.
//
// SAFETY CONTRACT (do not relax):
//   - fs.rm is ONLY ever called on the constant DIST path computed below.
//   - DIST resolves to ../raylabgroup-site/dist relative to this script.
//   - Nothing else in ../raylabgroup-site/ is ever touched. The deploy repo's
//     .git/, README, deploy configs, and any future repo-root files are safe
//     by construction because they live OUTSIDE DIST.
//
// Run automatically after `vite build` via the npm `postbuild` hook.

import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, relative, sep, posix } from "node:path";
import { PRERENDER_ROUTES } from "./prerender-routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SOURCE = resolve(ROOT, ".output", "public");
const DEPLOY_REPO = resolve(ROOT, "..", "raylabgroup-site");
const DIST = resolve(DEPLOY_REPO, "dist");

function routeToHtmlPath(route) {
  if (route === "/") return resolve(SOURCE, "index.html");
  const segments = route.replace(/^\/+|\/+$/g, "").split("/");
  return resolve(SOURCE, ...segments, "index.html");
}

async function fileStatus(path) {
  try {
    const stat = await fs.stat(path);
    if (!stat.isFile()) return { ok: false, reason: "not a file" };
    if (stat.size === 0) return { ok: false, reason: "file exists but empty" };
    const head = await fs.readFile(path, "utf8");
    if (!/<html[\s>]/i.test(head)) {
      return { ok: false, reason: "no <html> tag found" };
    }
    return { ok: true, size: stat.size };
  } catch (err) {
    if (err.code === "ENOENT") return { ok: false, reason: "missing" };
    return { ok: false, reason: `stat error: ${err.message}` };
  }
}

async function walkHtmlFiles(dir, acc = []) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return acc;
    throw err;
  }
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      await walkHtmlFiles(full, acc);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      acc.push(full);
    }
  }
  return acc;
}

function htmlPathToRoute(absHtmlPath) {
  const rel = relative(SOURCE, absHtmlPath).split(sep).join(posix.sep);
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"/index.html".length);
  return "/" + rel.replace(/\.html$/, "");
}

async function countFiles(dir) {
  let count = 0;
  let bytes = 0;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await countFiles(full);
      count += sub.count;
      bytes += sub.bytes;
    } else if (entry.isFile()) {
      count += 1;
      bytes += (await fs.stat(full)).size;
    }
  }
  return { count, bytes };
}

async function main() {
  console.log(`[sync] SOURCE = ${SOURCE}`);
  console.log(`[sync] DIST   = ${DIST}`);

  const failures = [];
  for (const route of PRERENDER_ROUTES) {
    const htmlPath = routeToHtmlPath(route);
    const status = await fileStatus(htmlPath);
    if (!status.ok) {
      failures.push({ route, htmlPath, reason: status.reason });
    }
  }

  if (failures.length > 0) {
    console.error("\n[sync] Prerender did not produce valid HTML for these routes:");
    for (const f of failures) {
      const relPath = relative(ROOT, f.htmlPath);
      console.error(`  - ${f.route.padEnd(40)} (${f.reason}: ${relPath})`);
    }
    console.error("\n  Check vite.config.ts prerender config and rerun `npm run build`.\n");
    process.exit(1);
  }

  const expectedHtml = new Set(
    PRERENDER_ROUTES.map((r) => routeToHtmlPath(r)),
  );
  const allHtml = await walkHtmlFiles(SOURCE);
  const unexpected = allHtml.filter((p) => !expectedHtml.has(p));
  if (unexpected.length > 0) {
    console.warn(
      `[sync] Warning: ${unexpected.length} HTML file(s) in ${relative(ROOT, SOURCE)} not in manifest:`,
    );
    for (const p of unexpected) {
      console.warn(`  - ${htmlPathToRoute(p)}  (${relative(ROOT, p)})`);
    }
    console.warn(
      "  Consider adding these to scripts/prerender-routes.mjs so future validation covers them.",
    );
  }

  await fs.mkdir(DEPLOY_REPO, { recursive: true });
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });
  await fs.cp(SOURCE, DIST, { recursive: true, force: true });

  const { count, bytes } = await countFiles(DIST);
  const mb = (bytes / 1024 / 1024).toFixed(2);
  console.log(`[sync] copied ${count} file(s), ${mb} MB → ${DIST}`);
  console.log(`[sync] HTML routes published (${PRERENDER_ROUTES.length}):`);
  for (const route of PRERENDER_ROUTES) {
    console.log(`  - ${route}`);
  }
}

main().catch((err) => {
  console.error("[sync] failed:", err);
  process.exit(1);
});
