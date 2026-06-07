# Afrikaytering — Digital QR Menu

A fast, mobile-first digital menu that diners reach by scanning a QR code. Built with
[Astro](https://astro.build) + [Keystatic](https://keystatic.com), deployed as a 100% static
site on [Vercel](https://vercel.com).

- **View-only menu** — food & drinks, photos, prices, dietary tags, and a "Specials" section.
- **Edited through a friendly CMS** — no code needed to change prices, dishes, or photos.
- **Static & cheap** — no database, no server, no login on the live site.

> 📄 Full product spec: [docs/PRD.md](docs/PRD.md)

## Tech stack

| | |
|---|---|
| Framework | Astro 6 (static output) |
| CMS | Keystatic (local mode) — content stored as YAML in `content/` |
| Images | Stored in `public/images/…` |
| Hosting | Vercel (static) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321  (menu)
                 # http://localhost:4321/keystatic  (edit the menu)
```

## Editing the menu (the everyday workflow)

The menu is edited through Keystatic, which runs **only in local development**:

1. `npm run dev`
2. Open **http://localhost:4321/keystatic**
3. Edit menu items, prices, photos, categories, and restaurant settings using the forms.
   Saving writes plain YAML files into `content/` (and copies photos into `public/images/`).
4. Commit and push:
   ```bash
   git add -A && git commit -m "Update menu" && git push
   ```
5. Vercel rebuilds and the live menu updates in ~1–2 minutes.

> The Keystatic admin is **not** part of the deployed site — the production build is purely
> static, so there is nothing to log into or secure online. All editing happens locally.

### Content structure

```
content/
├─ settings/restaurant.yaml   # name, currency, contact, hours, socials
├─ categories/*.yaml          # Starters, Main Dishes, Sides, Drinks…
└─ menu/*.yaml                # one file per dish/drink
public/images/
├─ brand/                     # logo
└─ menu/                      # dish photos
```

Each menu item has: name, category, description, price, photo, dietary tags
(vegetarian / vegan / halal / gluten-free / dairy-free / contains-nuts / spicy),
`featured` (shows in Specials), and `available` (hide without deleting).

## Build & deploy

```bash
npm run build    # outputs static site to dist/
npm run preview  # preview the production build locally
```

**Deploy to Vercel:** import the GitHub repo at [vercel.com/new](https://vercel.com/new).
Vercel auto-detects Astro — no configuration needed. It runs `astro build` and serves `dist/`.
Every push to `main` triggers a redeploy.

## QR code

Once deployed, point a QR code at the site's URL (the Vercel URL for now, e.g.
`https://afrikaytering.vercel.app`). The destination URL is stable, so the printed QR never
needs reprinting when the menu content changes. Generate print-ready SVG/PNG assets and place
them on tables / the counter / flyers.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server + Keystatic admin |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run sync` | Regenerate Astro/Keystatic types |
