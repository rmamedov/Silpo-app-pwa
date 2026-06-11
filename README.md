# Сільпо — Home screen PWA

A mobile-first Progressive Web App prototype of the **Сільпо** (Silpo) grocery
app home screen, built with **Vite + React**. The UI follows the official Сільпо
Figma design system, and product data (prices, discounts, units of measure and
basket steps) is pulled from the **Silpo MCP** (`mcp.silpo.ua`).

## Features

- **Pixel-accurate home screen** — top app bar with delivery address + ВР
  (Власний Рахунок) balance, promo banner carousel, white service tiles,
  brand cards, popular categories, product carousels and a bottom tab bar.
- **Real product data** — prices, `oldPrice` discounts, unit of measure
  (`ratio`: «кг» / «шт») and add-to-basket `step` fetched per product via the
  Silpo MCP `silpo_get_product_details`.
- **Add-to-cart counters** — morph from `+` into a stepper; the increment uses
  the real API step (e.g. banana +400 г, cucumber +300 г, мayonnaise +1 шт).
  Cart and favourites persist in `localStorage`.
- **PWA** — web app manifest (standalone, Ukrainian locale), service worker
  with offline app-shell + font caching, full icon set (SVG / 192 / 512 /
  maskable / apple-touch-icon), safe-area insets for notch & home indicator.

## Getting started

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Open the dev server in a mobile viewport (DevTools device toolbar) or from a
phone on the same network. Use **Add to Home Screen** to install it as a PWA.

## Deploy

The app is deployed to a droplet (nginx) at **http://104.248.132.130**.

```bash
SSHPASS='<server-password>' ./deploy.sh
```

`deploy.sh` builds the app, mirrors `dist/` to the web root, and **preserves
server media** — it excludes `media/` from the `--delete`, so product videos are
never wiped by an app deploy. It then syncs the local `media/` folder up to the
server **additively** (no `--delete`), so videos are uploaded once and stay
available forever.

### Product videos (served from the server, not bundled)

Product media lives in `media/` and is served from `http://<host>/media/<file>`
— it is **not** part of the app bundle or `dist/`. To add a video to a product
gallery:

1. Drop the file into `./media/` (e.g. `media/torchyn-evropeyskyi.mp4`).
2. Reference it in `src/data/gallery.js` as `http://104.248.132.130/media/<file>`,
   placed in that product's gallery array (`.mp4` items auto-play muted on swipe).
3. Run `./deploy.sh` — the video is uploaded and will survive future deploys.

## Project structure

```
public/
  fonts/            Silpo Text + Silpo Rounded (TrueType)
  icons/            app icons (svg + png) + maskable
  assets/           service-tile imagery
  manifest.webmanifest
  sw.js             service worker (app-shell + asset cache)
src/
  App.jsx           all home-screen components
  main.jsx          entry + SW registration
  styles.css        design tokens + @font-face
  components/
    Icon.jsx        outline icon set
    logos.jsx       official brand / service / category vector marks
  data/
    home.live.js    live data snapshot (from Silpo MCP)
    home.js         original design-handoff mock data
```

## Data source

`src/data/home.live.js` is a snapshot fetched from the Silpo MCP for branch
`1edee435-04af-6882-8c3a-c70e6ed87655` (Київ, доставка додому). In production
this would be replaced with live API calls at runtime.

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)
