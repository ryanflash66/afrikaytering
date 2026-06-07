# Afrikaytering — Digital QR Menu
### Product Requirements Document (PRD)

| | |
|---|---|
| **Product** | Afrikaytering Digital Menu |
| **Document status** | Draft — v1.0 |
| **Last updated** | 2026-06-07 |
| **Owner** | Ryan Balungeli |
| **Stakeholders** | Restaurant owner (cousin), customers (diners) |
| **Reference product** | [instalacarte](https://app.instalacarte.com/) |

---

## Table of contents

1. [Summary](#1-summary)
2. [Problem & opportunity](#2-problem--opportunity)
3. [Goals & success metrics](#3-goals--success-metrics)
4. [Users & personas](#4-users--personas)
5. [Scope](#5-scope)
6. [User stories](#6-user-stories)
7. [Functional requirements](#7-functional-requirements)
8. [Content model (Keystatic)](#8-content-model-keystatic)
9. [User flows](#9-user-flows)
10. [UX & design requirements](#10-ux--design-requirements)
11. [Technical architecture](#11-technical-architecture)
12. [QR code requirements](#12-qr-code-requirements)
13. [Non-functional requirements](#13-non-functional-requirements)
14. [Content management workflow](#14-content-management-workflow)
15. [Analytics](#15-analytics)
16. [Milestones & roadmap](#16-milestones--roadmap)
17. [Risks & mitigations](#17-risks--mitigations)
18. [Open questions](#18-open-questions)
19. [Future enhancements](#19-future-enhancements)
20. [Appendix](#20-appendix)

---

## 1. Summary

Afrikaytering is a single-restaurant **digital menu** that diners reach by scanning a QR code (on the table, counter, flyer, or storefront). The QR opens a fast, mobile-first web page showing the restaurant's food and drinks — with photos, descriptions, prices, dietary/allergen tags, and a highlighted "specials" section.

It is **view-only**: there is no cart, checkout, or payment. The goal is to replace printed menus with something that is always up to date, looks good on a phone, and costs almost nothing to run.

The restaurant owner (the user's cousin) maintains the menu themselves through **Keystatic**, a friendly git-based CMS. The site is built with **Astro** and hosted on **Vercel**.

**One-line pitch:** *Scan → see the menu. Edit in a simple dashboard → it's live in a minute.*

---

## 2. Problem & opportunity

### Problem
- Printed menus are expensive to reprint and go stale the moment a price or dish changes.
- Customers increasingly expect to scan a QR and see a clean digital menu.
- The owner is not a developer and needs to update items, prices, and photos without touching code.
- Existing SaaS menu tools (e.g. instalacarte) charge recurring fees and lock content into their platform.

### Opportunity
- A purpose-built, self-hosted menu that the owner controls, with near-zero running cost (static hosting + free CMS tier).
- Fast to load even on weak mobile connections — important for in-restaurant use.
- A foundation that can later grow into ordering, multi-language, or a multi-restaurant product if it proves useful.

---

## 3. Goals & success metrics

### Primary goals
1. A diner can scan the QR and see the full, accurate menu on their phone in **under 3 seconds**.
2. The owner can change any price, dish, or photo **without a developer** and see it live within ~1–2 minutes.
3. Running cost stays at **$0–$5/month**.

### Success metrics

| Metric | Target |
|---|---|
| Time to first scan → menu visible (LCP, 4G mobile) | < 2.5s |
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Owner self-service edits (no developer involved) | 100% of routine menu changes |
| Time from owner save → live on site | ≤ 2 min |
| Monthly hosting + CMS cost | ≤ $5 |
| Menu views per month (post-launch, vanity/health metric) | tracked via analytics |

### Non-goals for v1 (explicitly)
Increasing revenue, taking orders, processing payments, or managing reservations are **not** goals of this version. See [Scope](#5-scope).

---

## 4. Users & personas

### Persona A — "The Diner" (primary, view-only)
- Sitting in the restaurant or browsing before visiting.
- On a phone, possibly on mobile data with a weak signal.
- Wants to quickly see what's available, what it costs, what's in it (allergens), and what looks good.
- Will **not** install an app, create an account, or log in.

### Persona B — "The Owner" (the cousin, content editor)
- Runs the restaurant; not technical.
- Needs to update prices, add/remove dishes, mark items unavailable, swap photos, and set the daily/weekly special.
- Comfortable with a simple form-based dashboard; **not** comfortable with code, JSON, or git commands.

### Persona C — "The Maintainer" (Ryan, developer)
- Sets up the project, branding, domain, QR, and CMS access.
- Handles occasional structural changes and onboarding.
- Wants minimal ongoing maintenance.

---

## 5. Scope

### In scope (v1)
- Single restaurant (Afrikaytering only).
- Mobile-first, view-only digital menu reachable via QR / URL.
- Categories covering both **food and drinks**.
- Per-item: name, description, price, photo, dietary/allergen tags, availability toggle.
- **Featured / specials** section.
- Restaurant info: name, logo, tagline, hours, address, phone/WhatsApp, social links.
- Lightweight contact actions (tap-to-call, WhatsApp, directions) — informational, **not** ordering.
- Keystatic CMS for owner self-service editing.
- QR code generation and printable assets.
- Hosted on Vercel; built with Astro.

### Out of scope (v1)
- Online ordering, cart, checkout, payments.
- Table-side ordering / kitchen tickets / POS integration.
- Reservations / bookings.
- Customer accounts, login, reviews, or ratings.
- Multiple languages (data model will be **i18n-ready**, but only one language ships in v1).
- Multi-restaurant / multi-tenant platform.
- Real-time stock/availability sync with any external system.
- Push notifications, loyalty, coupons.

> These are deliberately deferred — several appear in [Future enhancements](#19-future-enhancements).

---

## 6. User stories

### Diner
- As a diner, I scan the QR code so that the menu opens immediately without installing anything.
- As a diner, I browse food and drinks by category so I can find what I want quickly.
- As a diner, I see a photo, description, and price for each item so I know what I'm getting.
- As a diner, I see dietary/allergen tags (e.g. vegetarian, halal, spicy, contains nuts) so I can avoid items I can't eat.
- As a diner, I see the "specials" up top so I know today's highlights.
- As a diner, I can tap to call or WhatsApp the restaurant, or get directions, from the menu.
- As a diner on a slow connection, the menu still loads fast and images don't block reading.

### Owner
- As the owner, I log in to a simple dashboard to edit the menu without needing a developer.
- As the owner, I add a new dish with a name, price, description, photo, and tags.
- As the owner, I mark an item "unavailable" so it's hidden or greyed out without deleting it.
- As the owner, I set an item as "featured" so it shows in the specials section.
- As the owner, I reorder categories and items so the menu reads the way I want.
- As the owner, I update the restaurant's hours and contact details.
- As the owner, after I save, the live menu updates within a couple of minutes.

### Maintainer
- As the maintainer, I generate a QR code that points to the menu and provide print-ready files.
- As the maintainer, I configure branding (logo, colors) once and rarely touch it again.
- As the maintainer, I onboard the owner to the CMS with minimal training.

---

## 7. Functional requirements

### 7.1 Menu browsing
- **FR-1** Display all visible categories, ordered by a configurable sort order.
- **FR-2** Categories are typed as **Food** or **Drink** and can be visually grouped/separated.
- **FR-3** Each menu item shows: name, price, short description, photo (if present), and dietary tags.
- **FR-4** Items can be marked **unavailable**; unavailable items are either hidden or shown greyed-out with an "unavailable" label (configurable; default = hidden).
- **FR-5** Tapping/expanding an item reveals its full description and larger photo (item detail view or expandable card).
- **FR-6** Support item **variants/options** with their own prices (e.g. Small / Large, or a drink by glass / bottle). *(Nice-to-have within v1; may slip to v1.1.)*

### 7.2 Featured / specials
- **FR-7** A **Featured** section appears at the top of the menu, populated by items flagged `featured = true`.
- **FR-8** If no items are featured, the section is hidden entirely (no empty state clutter).

### 7.3 Dietary & allergen tags
- **FR-9** Items support a configurable multi-select of tags. Default set: *Vegetarian, Vegan, Halal, Gluten-free, Dairy-free, Contains nuts, Spicy*.
- **FR-10** Tags render as small, legible, color-/icon-coded badges with accessible text labels (not color alone).

### 7.4 Restaurant info & contact
- **FR-11** Header shows logo, restaurant name, and optional tagline.
- **FR-12** Footer (or an "info" section) shows hours, address, phone, WhatsApp, and social links.
- **FR-13** Contact actions are real links: `tel:`, `https://wa.me/<number>`, and a maps directions URL. These are **informational**, not ordering.

### 7.5 Navigation
- **FR-14** Sticky category navigation (tabs or jump links) lets diners move between sections without long scrolling.
- **FR-15** Single-page menu by default (anchored sections) for speed; item detail may be an expandable card or a route.
- **FR-16** *(Optional v1.1)* Client-side search/filter by name or dietary tag.

### 7.6 Content management
- **FR-17** The owner edits all of the above through Keystatic's UI (forms, image upload, drag-to-reorder where supported).
- **FR-18** Saving in the CMS writes content to the repository and triggers an automatic redeploy.
- **FR-19** Content is validated (required fields like name and price) before it can break the live site.

---

## 8. Content model (Keystatic)

Content is stored as files in the repo (e.g. Markdown/YAML/JSON) and edited via Keystatic. The model is intentionally simple and **i18n-ready** (a `locale` dimension can be added later without restructuring).

### 8.1 Singleton — `restaurant` (site settings)
| Field | Type | Notes |
|---|---|---|
| `name` | text | "Afrikaytering" |
| `tagline` | text | optional |
| `logo` | image | |
| `heroImage` | image | optional banner |
| `currency` | select | e.g. USD, EUR, XAF — formats all prices |
| `phone` | text | for `tel:` |
| `whatsapp` | text | E.164 number for `wa.me` |
| `address` | text | |
| `mapsUrl` | url | directions link |
| `hours` | array of {day, open, close} | or freeform text |
| `social` | object | instagram, facebook, tiktok (optional) |
| `themeColor` | text/color | brand accent |
| `availabilityBehavior` | select | `hide` \| `greyOut` (default `hide`) |

### 8.2 Collection — `categories`
| Field | Type | Notes |
|---|---|---|
| `name` | text | "Starters", "Grilled", "Soft drinks"… |
| `slug` | slug | URL/anchor id |
| `type` | select | `food` \| `drink` |
| `description` | text | optional section blurb |
| `order` | integer | sort order |
| `visible` | boolean | default true |

### 8.3 Collection — `menuItems`
| Field | Type | Notes |
|---|---|---|
| `name` | text | required |
| `slug` | slug | |
| `category` | relationship → categories | required |
| `description` | text (multiline) | |
| `price` | number | required; formatted with `currency` |
| `image` | image | optional |
| `imageAlt` | text | accessibility; required if image set |
| `dietaryTags` | multiselect | vegetarian, vegan, halal, gluten-free, dairy-free, contains-nuts, spicy |
| `featured` | boolean | drives the Specials section |
| `available` | boolean | default true |
| `variants` | array of {label, price} | optional (e.g. Small/Large) |
| `order` | integer | sort within category |

### 8.4 Keystatic config sketch (illustrative, not final code)
```ts
// keystatic.config.ts
import { config, fields, collection, singleton } from '@keystatic/core'

export default config({
  storage: { kind: 'github', repo: 'ryanf/afrikaytering' }, // 'local' in dev
  singletons: {
    restaurant: singleton({
      label: 'Restaurant settings',
      path: 'src/content/settings/restaurant',
      schema: {
        name: fields.text({ label: 'Name' }),
        tagline: fields.text({ label: 'Tagline' }),
        logo: fields.image({ label: 'Logo', directory: 'public/images/brand' }),
        currency: fields.select({
          label: 'Currency',
          options: [
            { label: 'USD ($)', value: 'USD' },
            { label: 'EUR (€)', value: 'EUR' },
            { label: 'XAF (FCFA)', value: 'XAF' },
          ],
          defaultValue: 'USD',
        }),
        whatsapp: fields.text({ label: 'WhatsApp number (E.164)' }),
        // …phone, address, mapsUrl, hours, social, themeColor
      },
    }),
  },
  collections: {
    categories: collection({
      label: 'Categories',
      path: 'src/content/categories/*',
      slugField: 'name',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Food', value: 'food' },
            { label: 'Drink', value: 'drink' },
          ],
          defaultValue: 'food',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        order: fields.integer({ label: 'Sort order' }),
        visible: fields.checkbox({ label: 'Visible', defaultValue: true }),
      },
    }),
    menuItems: collection({
      label: 'Menu items',
      path: 'src/content/menu/*',
      slugField: 'name',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        category: fields.relationship({ label: 'Category', collection: 'categories' }),
        description: fields.text({ label: 'Description', multiline: true }),
        price: fields.number({ label: 'Price' }),
        image: fields.image({ label: 'Photo', directory: 'public/images/menu' }),
        imageAlt: fields.text({ label: 'Photo description (alt text)' }),
        dietaryTags: fields.multiselect({
          label: 'Dietary tags',
          options: [
            { label: 'Vegetarian', value: 'vegetarian' },
            { label: 'Vegan', value: 'vegan' },
            { label: 'Halal', value: 'halal' },
            { label: 'Gluten-free', value: 'gluten-free' },
            { label: 'Dairy-free', value: 'dairy-free' },
            { label: 'Contains nuts', value: 'contains-nuts' },
            { label: 'Spicy', value: 'spicy' },
          ],
        }),
        featured: fields.checkbox({ label: 'Featured / special', defaultValue: false }),
        available: fields.checkbox({ label: 'Available', defaultValue: true }),
        order: fields.integer({ label: 'Sort order' }),
      },
    }),
  },
})
```
> The exact API should be confirmed against current Keystatic docs at build time; this sketch communicates intent and shape.

---

## 9. User flows

### 9.1 Diner flow (happy path)
```
Scan QR  →  Menu home loads (logo, specials, category nav)
        →  Diner taps a category (e.g. "Grilled" / "Soft drinks")
        →  Scrolls items: photo, name, price, description, tags
        →  (optional) Expands an item for the full photo/description
        →  (optional) Taps WhatsApp / Call / Directions in the footer
```

### 9.2 Owner editing flow
```
Owner visits  https://<site>/keystatic
        →  Logs in (GitHub-backed auth)
        →  Edits an item: changes price, swaps photo, toggles "available"
        →  Clicks Save  →  Keystatic commits change to the repo
        →  Vercel auto-builds & deploys  (~1–2 min)
        →  Live menu reflects the change
```

### 9.3 Maintainer setup flow
```
Scaffold Astro + Keystatic  →  Configure branding & content model
        →  Add sample menu  →  Deploy to Vercel  →  Connect domain
        →  Generate QR → menu URL  →  Print assets
        →  Onboard owner to /keystatic
```

---

## 10. UX & design requirements

- **Mobile-first.** Designed for a phone held one-handed; desktop is a graceful scale-up, not the priority.
- **Single-column, scannable layout.** Big tap targets, generous spacing, readable type (min 16px body).
- **Light section nav.** With ~15 items the menu is a short single-page scroll with two sections (Food / Drinks); simple jump-links (optionally sticky) are enough — no search needed in v1.
- **Fast, non-blocking images.** Lazy-load below-the-fold photos; show a lightweight placeholder; text is readable before images finish.
- **Specials first.** Featured items surface at the top.
- **Clear price formatting.** Driven by the restaurant's selected currency/locale.
- **Accessible tags.** Dietary badges use icon **and** text/color (never color alone), with sufficient contrast.
- **Brandable.** Logo, accent color, and optional hero image reflect Afrikaytering's identity.
- **Empty/edge states.** Hidden sections when empty; graceful handling of missing photos (text-only card).
- **Optional dark mode** respecting the device preference (`prefers-color-scheme`). *(Nice-to-have.)*
- **No layout shift.** Reserve image space to keep CLS ≈ 0.

---

## 11. Technical architecture

### 11.1 Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro** | Ships near-zero JS by default → very fast on mobile; great for content sites; first-class Keystatic support. |
| CMS | **Keystatic** | Git-based, open-source, free; form-based UI for the owner; content lives in the repo (portable, versioned). |
| Hosting | **Vercel** | Free/cheap, global CDN, auto-deploy on git push, simple custom domains. |
| UI rendering | React island (for Keystatic admin) + Astro components for the menu | Menu pages stay static; only the admin needs React. |
| Images | Repo-stored assets (or Keystatic Cloud) + Astro/Vercel image optimization | Cheap and fast; optimized responsive images. |
| QR | Generated once, points at the menu URL | Static — no app logic needed. |
| Analytics | Vercel Web Analytics (privacy-friendly) | Lightweight view tracking without cookies. |

### 11.2 Rendering & deployment model

**Chosen for v1 — Keystatic local mode + fully static deployment.** Because the maintainer (Ryan) is the sole editor, the simplest and cheapest path is:

- The **entire menu is static** (pre-rendered at build) → served from Vercel's CDN. **No serverless functions, no `@astrojs/vercel` adapter, no auth to configure** on the deployed site.
- The **Keystatic admin runs only locally** (`localhost:4321/keystatic`) in local-storage mode, writing directly to content files on disk. It is not deployed.
- Keystatic's admin UI is React, so the `@astrojs/react` integration is added — but it only matters during local editing.
- **CI/CD:** the maintainer edits locally → commits → pushes to `main` → Vercel rebuilds and deploys the static menu automatically (~1–2 min).

**Optional upgrade — GitHub mode (edit from anywhere).** If you later want to edit from a phone/browser without a local checkout, or let the cousin help:
- Switch Keystatic storage to **GitHub mode**, add the `@astrojs/vercel` adapter, and deploy `/keystatic` + its API as on-demand serverless routes (menu pages stay pre-rendered).
- Saves become commits via the Keystatic GitHub App → Vercel rebuilds. This is a config change, not a rewrite.

### 11.3 High-level diagram
```
Diner's phone ──scan──▶  [Vercel CDN]  ──serves──▶  Static Astro menu pages
                                                     ▲
                                                     │ rebuild on push
Maintainer (local) ──localhost/keystatic──┐          │
   edit price/photo/item                  │ save     │
                                          ▼          │
                            [Local content files] ──commit+push──▶ [GitHub repo]
```
*(v1: editing happens locally; the deployed site is 100% static. GitHub-mode editing is an optional later upgrade.)*

### 11.4 Repository shape (proposed)
```
afrikaytering/
├─ astro.config.mjs
├─ keystatic.config.ts
├─ package.json
├─ public/
│  └─ images/{brand,menu}/      # uploaded photos & logo
├─ src/
│  ├─ content/
│  │  ├─ settings/restaurant.* # singleton
│  │  ├─ categories/*          # one file per category
│  │  └─ menu/*                # one file per item
│  ├─ components/              # MenuItemCard, CategoryNav, Badge, etc.
│  ├─ layouts/
│  └─ pages/
│     ├─ index.astro           # the menu
│     └─ keystatic/[...].astro # admin (server-rendered)
└─ docs/PRD.md
```

---

## 12. QR code requirements

- **QR-1** A single QR code encodes the canonical menu URL (e.g. `https://menu.afrikaytering.com` or the Vercel domain).
- **QR-2** The destination URL is **stable** so printed QR codes never need reprinting when the menu content changes.
- **QR-3** Provide print-ready assets: high-resolution **SVG + PNG**, with adequate quiet-zone/margin and error correction (level **M** or **Q**).
- **QR-4** Provide at least one branded layout (logo + "Scan for menu" caption) suitable for a table tent / sticker / counter card.
- **QR-5** *(Optional, future)* Use a short, memorable URL or a redirect so the destination can be changed later without reprinting (decouples the printed code from the live URL).
- **QR-6** *(Future)* Per-table QR codes with a `?table=` parameter, if table-level analytics or future ordering is added.

---

## 13. Non-functional requirements

| Category | Requirement |
|---|---|
| **Performance** | Mobile LCP < 2.5s on 4G; Lighthouse Performance ≥ 90; minimal JS on menu pages; optimized, lazy-loaded images; CLS ≈ 0. |
| **Accessibility** | WCAG 2.1 AA: semantic HTML, alt text on all dish photos, AA color contrast, keyboard-navigable, tags not conveyed by color alone, ≥16px body text. |
| **Reliability** | Static menu served from CDN → high availability even if the CMS/serverless layer is down. A bad CMS save should fail validation, not break the live site. |
| **Security** | Only the owner/maintainer can access `/keystatic` (GitHub-backed auth + repo permissions). No customer PII collected. HTTPS enforced by Vercel. |
| **Privacy** | Cookieless, privacy-friendly analytics only; no tracking of individual diners. |
| **SEO / sharing** | Sensible `<title>`, meta description, and Open Graph image so the link previews well if shared. (Indexing optional — can be `noindex` if the owner prefers.) |
| **Maintainability** | Content portable (plain files in git); infra reproducible; minimal moving parts. |
| **Cost** | Operate within Vercel + Keystatic free tiers where possible; target ≤ $5/month (domain amortized separately). |
| **i18n-readiness** | Data model and components avoid hard-coding a single language so a second language can be added later without a rewrite. |
| **Browser support** | Current versions of mobile Safari, Chrome, and Samsung Internet; graceful on 2–3 year-old devices. |

---

## 14. Content management workflow

**v1 model:** the **maintainer (Ryan) is the sole editor**. The owner (cousin) sends updates and photos; the maintainer makes the change. The cousin does **not** need a GitHub account or any login.

1. The owner sends the change (new dish, price, photo) to the maintainer.
2. The maintainer runs the project locally and opens `localhost:4321/keystatic`.
3. They edit using Keystatic's forms — add/remove items, change prices, upload photos, toggle availability, set featured.
4. Keystatic writes the change to the local content files.
5. The maintainer commits and pushes to `main`.
6. Vercel **redeploys automatically** (~1–2 min); the live menu reflects the change.

**Editorial safeguards**
- Required fields (name, price) are enforced by the schema.
- All history is in git → any change is reversible.
- The maintainer reviews every change before pushing (no broken content reaches the live site).

> ℹ️ **Trade-off:** this keeps setup dead simple (no auth, fully static site) at the cost of routing all updates through the maintainer. If the cousin later wants to self-serve — or the maintainer wants to edit from a phone — switch Keystatic to **GitHub mode** (see §11.2). In that case, produce a one-page "How to update your menu" guide for the owner.

---

## 15. Analytics

- **Vercel Web Analytics** (cookieless) to track menu page views and basic engagement.
- Useful signals: total menu views, views over time, device/referrer breakdown.
- *(Optional, lightweight)* Track which categories/items are expanded most, to inform menu design — only if it doesn't add weight or compromise privacy.
- No personally identifiable information is collected.

---

## 16. Milestones & roadmap

| Milestone | Deliverable | Notes |
|---|---|---|
| **M0 — Setup** | Astro + Keystatic + Vercel project deployed; domain connected | "Hello world" menu live |
| **M1 — Content model** | Keystatic schema for restaurant, categories, items; sample data | Food **and** drinks |
| **M2 — Menu UI** | Category nav, item cards, single-page menu | Mobile-first |
| **M3 — Rich items** | Photos, dietary tags, featured/specials, availability | Core differentiators |
| **M4 — Branding & contact** | Logo, theme color, hero, footer with call/WhatsApp/directions | |
| **M5 — CMS in production** | GitHub-mode editing; owner onboarding guide | Owner can self-serve |
| **M6 — QR & launch** | QR generation + print assets; QA (perf, a11y, cross-device); go live | |

**Suggested phasing**
- **v1.0 (MVP):** M0–M6 as above — view-only menu, photos, tags, specials, drinks, CMS, QR.
- **v1.1:** search/filter by tag, item variants/options, dark mode.
- **v2.0+:** see [Future enhancements](#19-future-enhancements).

*(Effort is intentionally not estimated in hours here; it can be sized during planning once open questions are resolved.)*

---

## 17. Risks & mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| All updates route through the maintainer (sole editor) | Owner can't change the menu without the maintainer; maintainer is a bottleneck/bus-factor | Acceptable for v1 given low change frequency; upgrade to GitHub-mode self-serve editing if it becomes a burden (§11.2). |
| Poor/low-quality dish photos | Menu looks unprofessional | Provide photo guidelines; enforce image optimization; allow text-only items as a clean fallback. |
| Prices/availability go stale | Customer frustration, trust loss | Make editing trivially easy; "available" toggle; show "last updated" if helpful. |
| Many large photos slow the menu | Misses performance targets | Astro/Vercel image optimization, responsive sizes, lazy loading, caps on dimensions. |
| Keystatic API/version drift vs this PRD's sketch | Build friction | Confirm against current Keystatic + Astro docs at implementation time. |
| Free-tier limits (Vercel/CMS) exceeded | Unexpected cost or downtime | Static-first architecture keeps usage low; monitor; upgrade path is cheap. |
| Printed QR points to a URL that later changes | Reprint needed | Use a stable canonical URL (or a redirect/short link) from day one. |
| Single language only | Excludes some diners | Data model kept i18n-ready; add languages in a later version. |

---

## 18. Open questions

### Resolved (kickoff)
1. ~~**Domain:**~~ → Use the **default Vercel URL** for v1 (custom domain later).
2. ~~**Currency & locale:**~~ → **USD**.
3. ~~**Menu size:**~~ → Small launch set: **~10 meals + ~5 drinks (~15 items)** → single-page menu, two sections (Food / Drinks), no search needed.
4. ~~**Photos:**~~ → Maintainer has photos the owner provided; ready to import.
7. ~~**CMS auth:**~~ → **Maintainer is sole editor** (Keystatic local mode); owner doesn't need GitHub.

### Still open
5. **Contact details:** Confirm phone, WhatsApp number (E.164), address, hours, and social links to show in the footer.
6. **Item variants:** Are sizes/options (e.g. Small/Large, glass/bottle) needed in v1, or can they wait for v1.1?
8. **Indexing:** Should the menu be publicly searchable (indexed by Google) or QR-only (`noindex`)?
9. **Branding:** Is there an existing logo, color palette, and font, or do these need to be created?
10. **QR placement:** Where will the QR codes live (tables, counter, flyers, storefront), and how many printed formats are needed?

---

## 19. Future enhancements

Deferred from v1, ordered roughly by likely value:

- **WhatsApp ordering** — tap items to build an order that opens pre-filled in WhatsApp to the restaurant's number (no payment system; well-suited to small/local restaurants).
- **Multiple languages** — e.g. English + French/local language, using the i18n-ready content model.
- **Search & filters** — find by name; filter by dietary tag (vegetarian, halal, etc.).
- **Scheduled specials** — daily/weekly specials that turn on and off by date.
- **Per-table QR + analytics** — table-level QR codes and engagement insights.
- **Full online ordering + payment** — cart, checkout, payment provider, order management (effectively a larger product).
- **Multi-restaurant platform** — generalize into a multi-tenant product (closer to instalacarte's model) if there's demand.
- **PWA / offline** — "add to home screen" and offline menu caching.
- **POS / inventory integration** — auto-hide sold-out items.

---

## 20. Appendix

### 20.1 Glossary
- **QR menu:** a printed QR code that opens a restaurant's digital menu in the phone's browser.
- **Keystatic:** an open-source, git-based headless CMS with a form-based editing UI; content is stored as files in the repository.
- **Astro:** a web framework optimized for fast, content-driven sites that ships minimal JavaScript by default.
- **SSR / serverless route:** a page rendered on demand by a server function (used for the Keystatic admin), as opposed to a pre-built static page.
- **i18n:** internationalization — structuring the app so it can support multiple languages.

### 20.2 Reference
- Inspiration / benchmark: **instalacarte** — <https://app.instalacarte.com/>
- Afrikaytering repo README: *"Restaurant Menu for Afrikaytering."*

### 20.3 Decisions captured (from kickoff)
| Decision | Choice |
|---|---|
| Scope | Single restaurant (Afrikaytering only) |
| CMS | Keystatic (git-based), **local mode** in v1 |
| Editor / maintenance | Maintainer (Ryan) is sole editor; owner doesn't need GitHub |
| Deployment | **Fully static** site (no serverless/auth in v1) |
| Interaction | View-only (no ordering/payments in v1) |
| Extras in v1 | Dish photos, dietary/allergen tags, featured/specials, food **and** drinks |
| Currency | **USD** |
| Domain | Default **Vercel URL** for v1 (custom domain later) |
| Initial menu size | ~10 meals + ~5 drinks |
| Languages | Single language in v1 (data model kept i18n-ready) |
| Framework / hosting | Astro on Vercel |

---

*End of document.*
