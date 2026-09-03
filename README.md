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
- **Home page** — deliberately short: split hero → one-line story → "Choose your meal" (two menu cards) → three locations → loyalty & vouchers → newsletter. Catering is deliberately NOT on the home page (Broadgate only). The interactive To Go menu lives on menus.html only.
- **Ordering** — Click & collect / Order online buttons go to StoreKit (`https://order.storekit.com/notto-broadgate/menu`), set in `STOREKIT_URL.collect` in `site.js` and hard-coded in the nav buttons. Catering quote buttons still show a placeholder until `STOREKIT_URL.catering` is filled in.
- **Pre-theatre** — `pre-theatre.html` is an SEO landing page (not in the nav; linked from the footer and the Piccadilly/Covent Garden offer cards). It carries Restaurant + FAQ structured data and a canonical URL that assumes the site lives at nottopastabars.com — change the `<link rel="canonical">` if the domain differs. Theatre lists are walking-distance neighbours; edit freely.
- **Welcome offer popup** — home page only, once per visitor (localStorage). Copy lives in `WELCOME_OFFER` in `site.js`; set `headline` to '' to switch it off. The 25% offer itself has to be configured in Leat/StoreKit — the site only advertises it.
- **Menus page** — To Go menu is plain text on orange (no prices; StoreKit has them). Pasta bar menu is on green. menu-data.js is no longer used by any page but is kept in case the interactive menu is wanted again.
- **Vouchers** — nav, footer and home-page voucher links use `VOUCHER_URL` in `site.js`. Empty for now (shows a short message); paste the voucher shop URL to go live.
- **Forms** — the site is static, so the enquiry/CV/contact "forms" are mailto buttons to contact@nottobroadgate.com. The newsletter sign-up boxes still need wiring to a mailing provider (Leat or similar).
- **Bookings** — all "Book a table" links go to SevenRooms. Site-wide/footer: `?venues=nottopastabarscg,nottopastabar` (both venues). Piccadilly pages: `?venues=nottopastabar`; Covent Garden pages: `?venues=nottopastabarscg`.
- **Videos** — picc.mp4 (home Sit down), cg.mp4 (home On the go + Broadgate header), kitchen.mp4 (Covent Garden header + careers). All 1080×1920, muted, 5–7MB, encoded from the client's 26–30MB masters. The original low-res site clips were removed.
- **No placeholder slots remain.** Every media slot has a real photo. Spare photos in /media/ not currently placed: pepper-anchovy.jpg, caesar-lunch.jpg, cheers.jpg is used only on the private-dining drinks tile.
- **Confirm menu prices** (e.g. Lunchissimo £17.50) and per-restaurant delivery availability.

The Cervo Neue font is the licensed version, self-hosted in /fonts/.

## Editing tips
- Swap a photo: replace the file in /media/ (same name), or change the path in `site.js` (ASSETS) / `menu-data.js` (IMAGES).
- Focal point: add `pos:'50% 30%'` (CSS object-position) to an ASSETS entry to choose which part of a photo survives the crop — useful for portrait shots in landscape frames.
- Menu items/prices: edit the `MENU` object in `menu-data.js`.
- To show shoot labels again during a photo shoot: in `style.css`, set `.media[data-state="live"]:after { content: attr(data-shot); ... }`.
