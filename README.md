# NOTTO — website

Full multi-page static site. No build step, no dependencies. Deploys on GitHub Pages as-is.

## Pages
- `index.html` — Home
- `restaurants.html` — All three locations
- `broadgate.html` · `piccadilly.html` · `covent-garden.html` — Venue detail pages
- `about.html` — Story, concepts, team, suppliers
- `menus.html` — Interactive To Go menu + pasta bar menu links
- `catering.html` — Corporate & catering
- `allergens.html` — Allergen & nutrition

## Shared files (edit once, applies everywhere)
- `style.css` — all styling
- `site.js` — media map, hydration, footer, nav, mobile menu, loyalty banner, StoreKit/Leat handlers
- `menu-data.js` — the interactive To Go menu
- `/media/` — photos & videos · `/fonts/` — licensed Cervo Neue Bold

## Deploy
1. Upload everything (keep structure) to your repo.
2. Settings → Pages → Deploy from a branch → main / root → Save.
3. Live at https://<user>.github.io/<repo>/

## Still to connect before/after launch
- **StoreKit ordering** — paste URLs into `STOREKIT_URL` in `site.js`.
- **Leat vouchers** — paste link into `LEAT_URL` in `site.js`.
- **Venue interior photos** — Broadgate / Piccadilly / Covent Garden use food stand-ins; drop real shots into `/media/` (same filenames: locBroadgate.jpg, locPicc.jpg, locCG.jpg).
- **Team headshots** — personPhil / personJulian / personAli (add to /media/ and register in site.js).
- **Confirm menu prices** (e.g. Lunchissimo £17.50) and per-restaurant delivery availability.

The Cervo Neue font is the licensed version, self-hosted in /fonts/.

## Editing tips
- Swap a photo: replace the file in /media/ (same name), or change the path in `site.js` (ASSETS) / `menu-data.js` (IMAGES).
- Menu items/prices: edit the `MENU` object in `menu-data.js`.
- To show shoot labels again during a photo shoot: in `style.css`, set `.media[data-state="live"]:after { content: attr(data-shot); ... }`.
