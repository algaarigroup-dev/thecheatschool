// Runs after `vite build`. For every known route it writes dist/<route>.html:
// a copy of the app shell with that page's title, description, canonical and
// Open Graph tags baked in. This lets search engines and WhatsApp/LinkedIn
// link previews read the right tags, and gives Apache a real file to serve so
// direct links never hit the host's 404 page. Also writes sitemap.xml.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES_META } from "../src/config/routes-meta.js";
import { SITE, legalPageReady } from "../src/config/site.js";
import { ARTICLES, ARTICLE_AUTHOR } from "../src/content/articles.js";
import { articleToHtml, blogIndexHtml } from "../src/content/render-html.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const shell = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const replaceTag = (html, regex, replacement) => {
  if (!regex.test(html)) throw new Error(`prerender: tag not found for ${regex}`);
  return html.replace(regex, replacement);
};

const render = (route, { title, description, ogType, jsonLd, bodyHtml, keywords }) => {
  const url = `${SITE.url}${route === "/" ? "/" : route}`;
  let html = shell;
  if (ogType) html = replaceTag(html, /<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${ogType}" />`);
  const extraHead = [
    keywords ? `<meta name="keywords" content="${esc(keywords.join(", "))}" />` : "",
    jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>` : "",
  ].join("");
  if (extraHead) html = html.replace("</head>", `${extraHead}</head>`);
  if (bodyHtml) html = replaceTag(html, /<div id="root"><\/div>/, `<div id="root">${bodyHtml}</div>`);
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = replaceTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(description)}" />`);
  html = replaceTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(title)}" />`);
  html = replaceTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(description)}" />`);
  html = replaceTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`);
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(title)}" />`);
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(description)}" />`);
  return html;
};

const routes = Object.entries(ROUTES_META).filter(([r, m]) => !m.legal || legalPageReady(r.slice(1)));

for (const [route, meta] of routes) {
  const html = render(route, route === "/blogs" ? { ...meta, bodyHtml: blogIndexHtml(ARTICLES) } : meta);
  const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  fs.writeFileSync(path.join(dist, file), html);
  console.log(`prerender: ${route} -> ${file}`);
}

// Built in cheat sheet articles: one static page each, with full text and Article schema.
fs.mkdirSync(path.join(dist, "blogs"), { recursive: true });
for (const a of ARTICLES) {
  const route = `/blogs/${a.slug}`;
  const html = render(route, {
    title: `${a.title} | The Cheat School`,
    description: a.description,
    keywords: a.keywords,
    ogType: "article",
    bodyHtml: articleToHtml(a),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.description,
      datePublished: a.date,
      dateModified: a.updated || a.date,
      author: { "@type": "Organization", name: ARTICLE_AUTHOR },
      publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}${SITE.ogImage}` } },
      mainEntityOfPage: `${SITE.url}${route}`,
      keywords: a.keywords.join(", "),
      articleSection: a.category,
    },
  });
  fs.writeFileSync(path.join(dist, "blogs", `${a.slug}.html`), html);
}
console.log(`prerender: ${ARTICLES.length} articles -> blogs/*.html`);

// Blog post URLs for the sitemap (best effort; skipped if Sanity is unreachable).
let posts = [];
try {
  const q = encodeURIComponent('*[_type == "post" && defined(slug.current)]{"slug": slug.current, publishedAt}');
  const res = await fetch(`https://4x6wdy47.apicdn.sanity.io/v2024-01-01/data/query/production?query=${q}`, {
    signal: AbortSignal.timeout(8000),
  });
  if (res.ok) posts = (await res.json()).result || [];
} catch {
  console.log("prerender: Sanity unreachable, sitemap will not list individual blog posts");
}

const today = new Date().toISOString().slice(0, 10);
const urls = [
  ...routes.map(([route]) => ({ loc: `${SITE.url}${route === "/" ? "/" : route}`, lastmod: today })),
  ...ARTICLES.map((a) => ({ loc: `${SITE.url}/blogs/${a.slug}`, lastmod: a.updated || a.date })),
  ...posts.map((p) => ({ loc: `${SITE.url}/blogs/${encodeURIComponent(p.slug)}`, lastmod: (p.publishedAt || today).slice(0, 10) })),
];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
console.log(`prerender: sitemap.xml with ${urls.length} URLs`);
