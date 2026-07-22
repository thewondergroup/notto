# NOTTO — website

Static site. One `index.html`, one `/media/` folder. No build step, no dependencies.

## What's here

```
index.html        The whole site — markup, styles, menu data
/media/           All photos and videos
.nojekyll         Tells GitHub Pages to serve files as-is
```

## Put it live on GitHub Pages

1. Create a new repository on GitHub (e.g. `notto-site`).
2. Upload **everything in this folder** — `index.html`, the `/media/` folder, and `.nojekyll` — to the repo. Keep the folder structure exactly as it is (`index.html` at the top, media inside `/media/`).
3. In the repo, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and Save.
5. Wait a minute. Your site appears at `https://<your-username>.github.io/<repo-name>/`.

That's it. To point a custom domain (e.g. a NOTTO subdomain) at it, add the domain under Settings → Pages → Custom domain and set the DNS record with your registrar.

## Editing the site later

**Swap a photo or video:** drop the new file into `/media/` with the same filename, or use a new filename and update the matching line in the `ASSETS` / `IMAGES` / `LIFE` maps near the bottom of `index.html`.

**Change menu text or prices:** find the `MENU` object near the bottom of `index.html`. Each dish has a `name`, `price`, `blurb` and `build` breakdown. Prices are currently blank (`price:''`) — fill them in there and they'll show automatically.

**The two hero videos** are `media/togo.mp4` (Broadgate / On the go) and `media/hero.mp4` (restaurants / Sit down). The kitchen video is `media/reel.mp4`. Each has a matching `-poster.jpg` still that shows before the video plays.

## Notes

- Menu prices are blank pending confirmation — add them in the `MENU` object.
- Ordering links point at the NOTTO Square site; booking links at nottopastabars.com. Update these in `index.html` if they change.
- Videos are muted (required for autoplay) and loop.
