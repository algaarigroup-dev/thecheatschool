# Deploying The Cheat School site

## Build
```
npm ci
npm run build
```
This runs `vite build` and then `scripts/prerender-meta.mjs`, which writes one HTML file per route (with its own title, description and preview tags) plus `sitemap.xml` into `dist/`.

## Hostinger / cPanel (Apache or LiteSpeed)
Upload the **contents** of `dist/` into `public_html/`, replacing the old files. Make sure the hidden `.htaccess` file is uploaded too (enable "show hidden files" in the File Manager). It is what makes direct links like `/civil-engineering` work.

## Vercel
Works as is: `vercel.json` handles clean URLs and the app fallback.

## Settings to edit
All contact details, the Google Form link, next batch date and legal details live in `src/config/site.js`.
The Terms, Privacy and Refund pages stay hidden until `legalName`, `address` and `refundWindowDays` are filled in.

## Backend (optional)
Blogs and events load from Sanity by default. Registration and "notify me" forms open WhatsApp with the details prefilled.
To use a Spring Boot backend instead, set `VITE_BACKEND_API=https://your-api-domain` at build time.

## After deploying
1. Submit `https://thecheatschool.in/sitemap.xml` in Google Search Console.
2. Open `/civil-engineering` directly in a private window to confirm it loads.
