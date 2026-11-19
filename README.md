# Tanachot — Personal Portfolio

A personal website built with **Vite + React 19 + TypeScript**, styled with modern CSS
(custom properties, `color-mix()`, fluid `clamp()` typography) and animated with
**Framer Motion**. Routing is handled by **React Router**, and the site deploys to **Vercel**.

## Commands

```bash
npm install     # install dependencies (Node.js 20+ required)
npm run dev     # start the dev server with hot reload
npm run build   # type-check with tsc and build the production bundle into dist/
npm run preview # serve the production build locally
```

## Project structure

```
index.html                 Vite entry point (theme is applied here before first paint)
vercel.json                SPA rewrites so /works deep links work on Vercel
src/
  main.tsx                 React root
  App.tsx                  Theme provider + router + page shell
  theme.tsx                Light/dark theme context (persists in localStorage)
  data/site.ts             ← all editable content (about, education, skills, contacts)
  hooks/useGreeting.ts     time-based greeting
  components/              Header, Footer, BackToTop, ScrollToTop, Reveal
  pages/Home.tsx           hero + About Me / Education / Skills sections
  pages/Works.tsx          "My Works" placeholder page
  styles/global.css        design tokens and all styling
  assets/                  profile photo
```

## Editing content

Change text in `src/data/site.ts` — no markup editing is needed.

## SEO

Everything Google needs to index the site and understand who it is about:

- **`index.html`** — keyword-first title, meta description, canonical URL, Open Graph +
  Twitter cards, and JSON-LD `Person` structured data (name, KMITL, sameAs profile links).
- **`public/robots.txt`** + **`public/sitemap.xml`** — crawled by search engines; both are
  copied into `dist/` on build.
- **`src/hooks/usePageMeta.ts`** — keeps `<title>` and the canonical URL correct on each
  route of the single-page app.
- **`vercel.json`** — 301 redirects from the old `works.html` / `index.html` URLs.

The live URL appears in `index.html`, `public/robots.txt`, `public/sitemap.xml`, and
`siteUrl` in `src/data/site.ts` — update all four if the domain ever changes.
