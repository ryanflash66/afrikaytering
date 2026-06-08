# Claude Design Prompt — Afrikaytering QR Menu (Structure Brief)

> **How to use.** Paste everything below the line into Claude Design. It describes only the
> **structure** of the app — pages, layout, components, content, and behavior. All visual
> design (color, type, spacing, theming, etc.) is intentionally left to Claude Design's own
> design system.

---

**Your design system comes first — always.** This brief describes only the app's
*structure* (pages, layout, components, content, behavior). Before applying anything here,
check whether your design system already covers it. If a component, pattern, layout, or
behavior implied below is already defined by your design system, **use the design system and
ignore this brief on that point** — the design system overrides this prompt every time. This
brief never dictates how anything should look; it only says what exists and how it is
organized.

Build the frontend for **Afrikaytering**, a single-restaurant **digital QR menu**. A diner
scans a QR code at the table and the menu opens in their phone browser. It is **view-only**:
no cart, no checkout, no accounts, no payments. Design it **mobile-first** as a **single
page** (one scrollable menu; not a multi-page app).

## Page structure (one page, top to bottom)

1. **Header** — restaurant logo, name ("Afrikaytering"), and tagline ("Authentic African
   home cooking, made with love").
2. **Category navigation** — a sticky bar of jump-links: one entry per section below, plus a
   leading "Specials" entry. Selecting an entry scrolls to that section; the entry for the
   section currently in view is marked as active.
3. **Specials** — the items flagged as featured, surfaced at the top. Hidden if none.
4. **Menu sections** — the categories in order, each with a heading, an optional one-line
   description, and its list of item cards. Food categories come first, then drink
   categories (with a clear "Drinks" separator between the two groups).
5. **Footer / contact** — contact actions (Call, WhatsApp, Directions), opening hours,
   address, and social links (Instagram, Facebook). Informational only — not ordering.

## Components

- **Item card** — name, price, short description, dietary tags, and an image area (with a
  graceful fallback when there is no photo). Selecting a card expands it in place to show the
  full description and a larger image; it must also read correctly when collapsed.
  Supports two states: **featured** (also shown in Specials) and **unavailable** (clearly
  labeled; otherwise hidden by default).
- **Dietary tag** — a small labeled tag. Tag set: Vegetarian, Vegan, Halal, Gluten-free,
  Dairy-free, Contains nuts, Spicy.
- **Contact action** — a tappable link: Call (`tel:`), WhatsApp (`wa.me`), Directions (maps
  URL).

## Behavior

- Sticky jump-navigation with active-section tracking; smooth scroll to anchored sections.
- Expand/collapse on item cards.
- Prices formatted as currency (USD, e.g. `$13.00`).
- A category with no items, and the Specials section with no featured items, do not render.
- Single page; near-instant; works on a phone held one-handed.

## Content (the real menu to populate it with)

**Featured / Specials:** Jollof Rice, Poulet DG, Bissap.

**Starters** — "Small bites to begin"
- Puff Puff — $5 — Soft, golden deep-fried dough balls, lightly sweet. — Vegetarian
- Suya Skewers — $8 — Grilled spiced beef skewers rolled in our smoky groundnut suya spice. — Spicy, Contains nuts, Halal
- Nigerian Meat Pie — $6 — Flaky pastry filled with seasoned minced beef, potato and carrot.

**Main Dishes** — "Hearty plates from across the continent"
- Jollof Rice ★ — $13 — Smoky party-style rice simmered in a rich pepper-and-tomato sauce. — Spicy
- Egusi Soup & Fufu — $16 — Melon-seed stew with leafy greens and tender beef, served with soft fufu. — Spicy
- Poulet DG ★ — $18 — Cameroonian favourite: fried chicken sautéed with ripe plantains and vegetables.
- Ndolé & Plantains — $17 — Bitterleaf simmered with groundnuts and shrimp, served with fried plantains. — Contains nuts
- Grilled Tilapia — $16 — Whole tilapia marinated in herbs and grilled, with a side of pepper sauce. — Spicy, Halal
- Beef Suya Platter — $15 — A generous platter of smoky suya beef with onions, tomato and extra spice. — Spicy, Contains nuts, Halal

**Sides**
- Fried Plantain (Dodo) — $5 — Sweet ripe plantains fried golden. — Vegetarian, Vegan

**Drinks** — "Fresh juices and more"
- Bissap (Hibiscus Juice) ★ — $4 — Chilled hibiscus infusion with a hint of ginger and mint. — Vegetarian, Vegan
- Ginger Juice — $4 — House-made spicy-sweet ginger drink. — Vegan
- Palm Wine — $5 — Naturally sweet, lightly fermented palm sap.
- Bottled Water — $2 — 500ml still water. — Vegan
- Soft Drink — $2.50 — Coke, Fanta or Sprite, served chilled.

(The dishes currently have no photos — the image area should fall back gracefully and accept
a real photo later.)
