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
- **Venue photos** — exterior shots in place (locBroadgate.jpg, locPicc.jpg, locCG.jpg). locPicc.jpg is only 750px square — a larger original would help on the big venue panels. Interior shots of the rooms are still wanted ("the room sells the hour"); drop them in with the same filenames.
- **Team headshots** — in place (personPhil / personJulian / personAli). Julian (300px) and Ali (439px) are low-res web grabs and Julian is black & white — replace with larger colour originals when available (same filenames).
- **Bookings** — all "Book a table" links go to SevenRooms. Site-wide/footer: `?venues=nottopastabarscg,nottopastabar` (both venues). Piccadilly pages: `?venues=nottopastabar`; Covent Garden pages: `?venues=nottopastabarscg`.
- **Videos** — hero.mp4 (home sit-down + Piccadilly fallback), togo.mp4 (home on-the-go + Broadgate), picc.mp4 (Piccadilly header), cg.mp4 (Covent Garden header), reel.mp4 (spare), kitchen.mp4 (spare). All 720×1280, muted, 2–3MB. Source clips were 26–30MB each — always re-encode before adding new ones.
- **Still awaiting shoot** — private dining room (eventsRoom), front of house (careFoh), production kitchen (careProd). These show a tone frame until a photo is registered in `site.js`.
- **Confirm menu prices** (e.g. Lunchissimo £17.50) and per-restaurant delivery availability.

The Cervo Neue font is the licensed version, self-hosted in /fonts/.

## Editing tips
- Swap a photo: replace the file in /media/ (same name), or change the path in `site.js` (ASSETS) / `menu-data.js` (IMAGES).
- Focal point: add `pos:'50% 30%'` (CSS object-position) to an ASSETS entry to choose which part of a photo survives the crop — useful for portrait shots in landscape frames.
- Menu items/prices: edit the `MENU` object in `menu-data.js`.
- To show shoot labels again during a photo shoot: in `style.css`, set `.media[data-state="live"]:after { content: attr(data-shot); ... }`.
