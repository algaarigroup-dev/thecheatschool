// Runs after prerender-meta.mjs. Opens every page in the sitemap in a
// headless browser and saves the fully rendered page text into that page's
// HTML file, so search engines and AI crawlers that don't run JavaScript
// (ChatGPT search, Perplexity, Bing and others) can read the whole page.
//
// If the browser can't start, the build continues with title and meta tags
// only, so a deploy is never blocked by this step.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

// 1. A neutral app shell for URLs that have no prerendered page
//    (new CMS posts, unknown paths). Unlike index.html it holds no homepage
//    content and no homepage canonical.
const shell = fs
  .readFileSync(path.join(dist, "index.html"), "utf8")
  .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, "");
fs.writeFileSync(path.join(dist, "app.html"), shell);

// 2. Pages to render: everything in the sitemap that has its own HTML file.
const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8");
const fileFor = (route) => (route === "/" ? "index.html" : `${decodeURIComponent(route.slice(1))}.html`);
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)]
  .map((m) => m[1] || "/")
  .filter((r) => fs.existsSync(path.join(dist, fileFor(r))));

// 3. Serve dist/ with the same rules as .htaccess.
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain", ".woff2": "font/woff2" };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(dist, p);
  if (p === "/") file = path.join(dist, "index.html");
  else if (!fs.existsSync(file) || fs.statSync(file).isDirectory())
    file = fs.existsSync(`${file}.html`) ? `${file}.html` : path.join(dist, "app.html");
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

let browser;
try {
  const { chromium } = await import("playwright");
  browser = await chromium.launch(
    process.env.PRERENDER_CHROMIUM ? { executablePath: process.env.PRERENDER_CHROMIUM } : {}
  );
} catch (e) {
  console.warn(`prerender-pages: browser unavailable, skipping full text prerender (${e.message.split("\n")[0]})`);
  server.close();
  process.exit(0);
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
// Fonts and CMS images are not needed for the text snapshot.
await page.route(/fonts\.(googleapis|gstatic)\.com|cdn\.sanity\.io\/images/, (r) => r.abort());

let done = 0;
for (const route of routes) {
  try {
    await page.goto(base + route, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForFunction(() => document.querySelector("#root main")?.innerText.trim().length > 40, null, { timeout: 15000 });
    await page.waitForTimeout(300);
    const html = await page.evaluate(() => {
      const root = document.getElementById("root").cloneNode(true);
      // Canvases are drawn at runtime and sized to the window; drop them.
      root.querySelectorAll("canvas").forEach((c) => c.remove());
      return root.innerHTML;
    });
    const file = path.join(dist, fileFor(route));
    const current = fs.readFileSync(file, "utf8");
    const updated = current.replace(/<div id="root">[\s\S]*?<\/div>(\s*<\/body>)/, (_, end) => `<div id="root">${html}</div>${end}`);
    if (updated === current) throw new Error("root element not found");
    fs.writeFileSync(file, updated);
    done++;
  } catch (e) {
    console.warn(`prerender-pages: ${route} kept meta only (${e.message.split("\n")[0]})`);
  }
}

await browser.close();
server.close();
console.log(`prerender-pages: full text for ${done} of ${routes.length} pages`);
