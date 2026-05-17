// Entry point for iisnode (and `npm start` locally).
// Named app.js (not server.js) because Nitro auto-detects any root
// server.{ts,js,mjs,...} as its own server-entry override, which would
// hijack this wrapper at build time.
// package.json has "type": "module", so this file is ESM.
// dotenv loads .env from the current working directory into process.env
// before the Nitro bundle starts the HTTP server.
import "dotenv/config";
import "./.output/server/index.mjs";
