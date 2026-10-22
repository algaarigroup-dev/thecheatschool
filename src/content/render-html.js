// Plain HTML version of a local article, used by scripts/prerender-meta.mjs so
// search engines can read the full text without running JavaScript.
// React replaces this markup with the live page as soon as the app loads.

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const articleToHtml = (a) => {
  const parts = [`<article class="max-w-4xl mx-auto px-4 pt-36 pb-16 font-secondary"><h1>${esc(a.title)}</h1><p>${esc(a.description)}</p>`];
  for (const b of a.body) {
    if (b.h2) parts.push(`<h2>${esc(b.h2)}</h2>`);
    else if (b.h3) parts.push(`<h3>${esc(b.h3)}</h3>`);
    else if (b.p) parts.push(`<p>${esc(b.p)}</p>`);
    else if (b.ul) parts.push(`<ul>${b.ul.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`);
    else if (b.ol) parts.push(`<ol>${b.ol.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>`);
    else if (b.table)
      parts.push(
        `<table><thead><tr>${b.table.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>` +
          b.table.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("") +
          `</tbody></table>`
      );
    else if (b.tip) parts.push(`<p><strong>Cheat code:</strong> ${esc(b.tip)}</p>`);
    else if (b.cta) parts.push(`<p>${esc(b.cta.text)} <a href="${esc(b.cta.to)}">${esc(b.cta.label)}</a></p>`);
  }
  parts.push(`<p><a href="/blogs">More cheat sheets</a></p></article>`);
  return parts.join("");
};

export const blogIndexHtml = (articles) =>
  `<section class="max-w-4xl mx-auto px-4 pt-36 pb-16 font-secondary"><h1>Cheat Sheets and Articles</h1><ul>` +
  articles.map((a) => `<li><a href="/blogs/${a.slug}">${esc(a.title)}</a><p>${esc(a.description)}</p></li>`).join("") +
  `</ul></section>`;
