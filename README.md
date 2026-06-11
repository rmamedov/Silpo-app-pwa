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

The app runs on a DigitalOcean droplet (nginx).

**Canonical URL: https://104.248.132.130.sslip.io** (HTTPS, Let's Encrypt).

| Droplet | Role |
| --- | --- |
| Silpo-App-Prototype · 104.248.132.130 | serves the app over HTTPS at `104.248.132.130.sslip.io` (free [sslip.io](https://sslip.io) domain); :80 → 301 → HTTPS |

### HTTPS / domain

The free domain `104.248.132.130.sslip.io` (sslip.io resolves any embedded IP — no
registration) has a Let's Encrypt cert issued via:

```bash
ssh root@104.248.132.130 'apt-get install -y certbot && \
  certbot certonly --webroot -w /var/www/silpo -d 104.248.132.130.sslip.io \
  --agree-tos -m <email> --deploy-hook "systemctl reload nginx"'
scp deploy/nginx-silpo-ssl.conf root@104.248.132.130:/etc/nginx/sites-available/silpo
ssh root@104.248.132.130 'nginx -t && systemctl reload nginx'
```

`deploy/nginx-silpo-ssl.conf` serves the app on :443, redirects :80 → the canonical
HTTPS domain, serves the manifest with the right MIME, and keeps the
ACME-challenge path open for renewals (certbot auto-renews via its systemd timer +
the `--deploy-hook` nginx reload).

```bash
SSHPASS='<server-password>' ./deploy.sh                       # → default droplet
SILPO_HOST=<ip> SSHPASS='<password>' ./deploy.sh              # → a specific droplet
```

`deploy.sh` builds the app, mirrors `dist/` to the web root, and **preserves
server media** — it excludes `media/` from the `--delete`, so product videos are
never wiped by an app deploy. It then syncs the local `media/` folder up to the
server **additively** (no `--delete`), so videos are uploaded once and stay
available forever. Pass `SILPO_HOST=<ip>` to target a particular droplet (each
has its own password, so deploy them one at a time).

### Provisioning a fresh droplet

A new droplet needs nginx set up once before the first deploy:

```bash
ssh root@<ip> 'apt-get update && apt-get install -y nginx && mkdir -p /var/www/silpo/media'
scp deploy/nginx-silpo.conf root@<ip>:/etc/nginx/sites-available/silpo
ssh root@<ip> 'ln -sf /etc/nginx/sites-available/silpo /etc/nginx/sites-enabled/silpo \
  && rm -f /etc/nginx/sites-enabled/default && nginx -t && systemctl reload nginx'
```

`deploy/nginx-silpo.conf` serves the SPA (`index.html` fallback), keeps `/sw.js`
uncached, and long-caches `/assets/` and `/media/`.

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
