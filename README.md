# NOTTO — website

Full multi-page static site. No build step, no dependencies. Deploys on GitHub Pages as-is.

## Pages
- `index.html` — Home
- `restaurants.html` — All three locations
- `broadgate.html` · `piccadilly.html` · `covent-garden.html` — Venue detail pages
- `pre-theatre.html` — Pre-theatre dining landing page (SEO; footer link only)
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
- **StoreKit catering URL** — collect is live; paste the catering URL into `STOREKIT_URL.catering` in `site.js`.
- **Leat loyalty sign-up** — every "Join NOTTO loyalty" button (banner, home page, Broadgate, footer "Loyalty scheme" and "Vouchers") opens a modal. Paste the Leat embed snippet into `LEAT_EMBED` in `site.js` and it renders inside the modal (script tags are handled). If you only have a hosted join URL, put it in `LEAT_URL` and it loads in an iframe. Until one is set the modal shows a placeholder. NEVER put the Leat API token in the site code.
- **Venue photos** — exterior shots in place (locBroadgate.jpg, locPicc.jpg, locCG.jpg). locPicc.jpg is only 750px square — a larger original would help on the big venue panels. room-interior.jpg is the dining room shot (private dining page).
- **Team headshots** — in place (personPhil / personJulian / personAli). Julian (300px) and Ali (439px) are low-res web grabs and Julian is black & white — replace with larger colour originals when available (same filenames).
- **Home page** — deliberately short: split hero → one-line story → "Choose your meal" (two menu cards) → three locations → catering → newsletter. The interactive To Go menu lives on menus.html only.
- **Ordering** — Click & collect / Order online buttons go to StoreKit (`https://order.storekit.com/notto-broadgate/menu`), set in `STOREKIT_URL.collect` in `site.js` and hard-coded in the nav buttons. Catering quote buttons still show a placeholder until `STOREKIT_URL.catering` is filled in.
- **Pre-theatre** — `pre-theatre.html` is an SEO landing page (not in the nav; linked from the footer and the Piccadilly/Covent Garden offer cards). It carries Restaurant + FAQ structured data and a canonical URL that assumes the site lives at nottopastabars.com — change the `<link rel="canonical">` if the domain differs. Theatre lists are walking-distance neighbours; edit freely.
- **Bookings** — all "Book a table" links go to SevenRooms. Site-wide/footer: `?venues=nottopastabarscg,nottopastabar` (both venues). Piccadilly pages: `?venues=nottopastabar`; Covent Garden pages: `?venues=nottopastabarscg`.
- **Videos** — hero.mp4 (home sit-down + Piccadilly fallback), togo.mp4 (home on-the-go + Broadgate), picc.mp4 (Piccadilly header), cg.mp4 (Covent Garden header), reel.mp4 (spare), kitchen.mp4 (spare). All 720×1280, muted, 2–3MB. Source clips were 26–30MB each — always re-encode before adding new ones.
- **No placeholder slots remain.** Every media slot has a real photo. Spare photos in /media/ not currently placed: pepper-anchovy.jpg, caesar-lunch.jpg, cheers.jpg is used only on the private-dining drinks tile.
- **Confirm menu prices** (e.g. Lunchissimo £17.50) and per-restaurant delivery availability.

The Cervo Neue font is the licensed version, self-hosted in /fonts/.

## Editing tips
- Swap a photo: replace the file in /media/ (same name), or change the path in `site.js` (ASSETS) / `menu-data.js` (IMAGES).
- Focal point: add `pos:'50% 30%'` (CSS object-position) to an ASSETS entry to choose which part of a photo survives the crop — useful for portrait shots in landscape frames.
- Menu items/prices: edit the `MENU` object in `menu-data.js`.
- To show shoot labels again during a photo shoot: in `style.css`, set `.media[data-state="live"]:after { content: attr(data-shot); ... }`.
