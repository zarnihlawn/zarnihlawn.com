# zarnihlawn.com

Personal site and portfolio for Zarni Hlawn — software engineer in Yangon, Myanmar.
Built with SvelteKit 5 (runes), Tailwind CSS 4, mdsvex, Paraglide i18n, and deployed
as a Netlify build.

The site is a single long scroll of numbered sections (showcase, work experience,
academic record, conference papers, contributions, blog) plus standalone detail
pages for every project, degree, role, and post.

## Stack

| Concern        | Tooling                                                        |
| -------------- | -------------------------------------------------------------- |
| Framework      | SvelteKit 2 + Svelte 5 (runes forced project-wide)             |
| Styling        | Tailwind CSS 4 via `@tailwindcss/vite`                         |
| Markdown       | mdsvex (`.md`, `.svx`) with a build-time heading-anchor plugin |
| i18n           | Paraglide JS 2 — `en` (base), `my`, `ja`                       |
| Icons          | `@lucide/svelte`                                               |
| Unit/component | Vitest (node project + Playwright-powered browser project)     |
| End-to-end     | Playwright against a real `build` + `preview` server           |
| Adapter        | `@sveltejs/adapter-netlify`                                    |

## Getting started

```sh
npm install
npm run dev
```

`npm run dev -- --open` boots the server and opens a browser tab.

## Scripts

| Command             | Purpose                                                 |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Dev server with HMR                                     |
| `npm run build`     | Production build to `build/`                            |
| `npm run preview`   | Serve the production build                              |
| `npm run check`     | `svelte-kit sync` + `svelte-check` type/diagnostic pass |
| `npm run lint`      | Prettier check + ESLint                                 |
| `npm run format`    | Prettier write                                          |
| `npm run test:unit` | Vitest in watch mode (`--run` for CI)                   |
| `npm run test:e2e`  | Install Playwright browsers, then run `*.e2e.ts`        |
| `npm test`          | Unit run + e2e                                          |
| `npm run audio`     | Regenerate blog narration MP3s (see below)              |

## Project layout

```
src/
  app.html                 # %paraglide.lang% / %paraglide.dir% placeholders
  hooks.server.ts           # Paraglide middleware: locale + text direction
  hooks.ts                  # deLocalizeUrl reroute
  routes/
    +page.svelte            # the single-scroll home
    +layout.svelte          # shell, header, section rails
    +error.svelte
    blog/                   # index, [slug] post pages, filters, TOC rail
    development/[slug]/     # project detail
    academic/[slug]/        # program detail
    work-experience/[slug]/ # role detail
    contribution/           # contributions list
  lib/
    data/                   # typed source of truth: profile, work, academic,
                            # development projects, papers, certs, languages
    content/blog/*.md       # blog posts (frontmatter + markdown body)
    component/              # SiteHeader, BlogCard, BlogRail, CaseDialog,
                            # StudyPage/StudyChrome, Paginator, Seo, Schematic
    blog.ts, showcase.ts    # content aggregation, slugs, read time, TOC sections
    seo.ts                  # titles, meta descriptions, JSON-LD schemas
    portfolio/, asset/      # illustrations, fonts, images, styles
messages/{en,my,ja}.json    # Paraglide message catalogs
e2e/portfolio.e2e.ts        # Playwright specs
scripts/generate-audio.mjs  # edge-tts narration builder
static/                     # robots.txt, resume.pdf, portrait, blog audio/covers
```

## Authoring content

**Blog post** — drop a `.md` file in `src/lib/content/blog/`. The filename becomes the
slug, so `my-post.md` is served at `/blog/my-post`.

```md
---
title: 'Post title'
date: '2026-11-14'
category: 'Engineering'
excerpt: 'One or two sentences for cards and meta descriptions.'
cover: '/blog/my-post.webp'
---

Body in markdown. Every `##` heading gets an anchor id at build time and is
automatically listed in the reading rail.
```

Read time is derived from body word count, and `sections` (the table of contents) is
parsed from the same headings, so you never maintain them by hand.

**Projects, roles, degrees, papers** — edit the matching module in `src/lib/data/`.
Showcase cards, detail pages, and JSON-LD `ItemList` entries are all generated from
those modules; adding an entry is usually the only change needed.

## Internationalization

Paraglide resolves the locale from cookie, global variable, then base locale, and
prefixes non-default locales with `/my` or `/ja`. `hooks.server.ts` injects the locale
into `<html lang>` and sets `dir` from `getTextDirection`. Copy lives in
`messages/*.json`; the generated client is written to `src/lib/paraglide/` on every
build and is not committed by hand.

## Blog narration

Posts can ship prebuilt audio. One MP3 per post under `static/blog/audio/<slug>.mp3`,
referenced by `blogAudioPath()`.

```sh
python3 -m venv .venv && .venv/bin/pip install edge-tts
EDGE_TTS=.venv/bin/edge-tts npm run audio          # only stale/missing files
npm run audio -- --force                           # rebuild everything
```

## Testing

- `src/**/*.spec.ts` and `*.test.ts` run in the Vitest **server** (node) project.
- `*.svelte.spec.ts` run in the **client** project inside headless Chromium, with
  `expect.requireAssertions` enforced — a test with no assertion fails.
- `e2e/portfolio.e2e.ts` drives the built site on `127.0.0.1:4173`. The config builds
  and starts the preview server itself, reusing a running one outside CI.

## Deployment

`npm run build` produces the Netlify bundle (`netlify.toml`: build `build/`).
A `Dockerfile` and `fly.toml` are also present for a self-hosted Node runtime on
port `5173` (`PROTOCOL_HEADER=x-forwarded-proto` keeps redirects on HTTPS).

## Conventions

- Runes only in project files (`runes: true` in `svelte.config.js`); libraries opt out.
- One `<h1>` per page; `h2`/`h3` only in order. Anchors come from `anchorSlug()`.
- Every page sets a unique title, a 150–160 character description, a canonical link,
  and the relevant JSON-LD schema through `src/lib/seo.ts`.
- Change log entries live in `dev-log/YYYY-MM-DD.md`.
