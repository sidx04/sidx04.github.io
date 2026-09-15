# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio/blog site (Siddhartha Pal), built with [Zola](https://www.getzola.org/) (Rust static site generator). Deployed to GitHub Pages at `sidx04.github.io`.

## Commands

- `zola serve` — run local dev server with live reload (requires `zola` CLI installed).
- `zola build` — build static site to `public/`.
- `zola check` — validate internal/external links and config without building.

No JS package manager, linter, or test suite in this repo — it's Zola + hand-written CSS/JS.

## Deployment

`.github/workflows/main.yml` builds and deploys on every push to `main`, via `shalzz/zola-deploy-action`, publishing to the `gh-pages` branch. No manual deploy step needed — pushing to `main` is the deploy trigger.

## Architecture

- `config.toml` — Zola site config: base URL, taxonomies (`tags`), markdown/syntax-highlight settings (`gruvbox-dark`), and `[extra]` custom vars (author, social handles, `posts` permalink pattern `/posts/:slug.md`).
- `content/` — Markdown content. `_index.md` is the home page section; `posts/_index.md` is the posts section (paginated); each post is a markdown file under `posts/`.
- `templates/` — Tera templates.
  - `base.html` — shared HTML shell: SEO meta tags, Open Graph/Twitter cards, JSON-LD structured data (switches between `BlogPosting` and `Website` schema depending on whether `page` is set), nav with theme toggle, MathJax (loaded via CDN, supports `$...$`/`$$...$$`), Lucide icons (via CDN).
  - `index.html`, `posts.html`, `post-page.html`, `taxonomy_list.html`, `taxonomy_single.html` extend `base.html` and fill the `content` block.
- `sass/style.scss` — single stylesheet, compiled by Zola (`compile_sass = true`) to `style.css`.
- `static/scripts/theme.js` — dark/light theme toggle: reads/writes `localStorage("theme")`, falls back to `prefers-color-scheme`, toggled via `#theme-toggle` button in the nav (defined in `base.html`).
- `static/` — other static assets (favicon, robots.txt) served as-is at site root.

## Notes

- Theme switching depends on the `#theme-toggle` element existing in `base.html` and `theme.js` running before/after DOM load — don't remove one without the other.
- SEO/structured-data blocks in `base.html` branch heavily on Tera conditionals (`page.title`, `page.description`, `section.description`, `config.description`) — when editing, preserve the fallback chain.
