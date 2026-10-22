import { useEffect } from "react";
import { SITE } from "@/config/site";

const setMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

// Keeps <title>, description, Open Graph tags and canonical URL in sync with
// the current page during client side navigation. Static HTML for each route
// is also generated at build time (scripts/prerender-meta.mjs) so crawlers and
// link previews see the right tags without running JavaScript.
export default function usePageMeta({ title, description, path, image } = {}) {
  useEffect(() => {
    const t = title || SITE.defaultTitle;
    const d = description || SITE.defaultDescription;
    const url = `${SITE.url}${path ?? window.location.pathname}`;
    const img = image || `${SITE.url}${SITE.ogImage}`;

    document.title = t;
    setMeta("name", "description", d);
    setMeta("property", "og:title", t);
    setMeta("property", "og:description", d);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", img);
    setMeta("name", "twitter:title", t);
    setMeta("name", "twitter:description", d);
    setMeta("name", "twitter:image", img);
    setCanonical(url);
  }, [title, description, path, image]);
}
