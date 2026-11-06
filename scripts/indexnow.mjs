// Tells Bing (which also feeds Microsoft Copilot), Yandex and other IndexNow
// search engines that pages changed, so they recrawl within hours instead of
// weeks. Runs after each deploy. Failures never block a deploy.
import fs from "node:fs";

const KEY = "6e87057b7120c1f831cf339e4e454415"; // matches public/6e87057b7120c1f831cf339e4e454415.txt
const HOST = "thecheatschool.in";

const sitemap = fs.readFileSync(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
  });
  console.log(`indexnow: submitted ${urlList.length} URLs, status ${res.status}`);
} catch (e) {
  console.warn(`indexnow: could not submit (${e.message})`);
}
