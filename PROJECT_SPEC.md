# Swan City Roadhouse — Website Project Spec

_Last updated: 2026-04-19_

This document is the single source of truth for the website build. Review and approve before development begins.

---

## 1. Brand

- **Name:** Swan City Roadhouse
- **Tagline:** _Eats · Drinks · Relax_
- **Location:** 11401 100 Ave., Grande Prairie, AB T8V 5M6, Canada
- **Phone:** +1 (587) 322-0786
- **Hours:** Monday – Sunday, 9:00 AM – 10:00 PM

### Logos (already in repo root)
- `SwanCity_Logo.png` — primary logo
- `Swan City Roadhouse logo.png` — secondary/alternate logo

### Menus (already in repo root, to be served as PDFs)
- `SwanCity_Food_Menu.pdf` — food / bar menu
- `SwanCity_Beverage_Menu.pdf` — beverage menu

---

## 2. Color Palette

| Role                | Color           | Hex        | Notes                                  |
| ------------------- | --------------- | ---------- | -------------------------------------- |
| Primary (accent)    | Red             | `#C8102E`  | CTA buttons, highlights, link hover    |
| Background (dark)   | Black           | `#111111`  | Nav bar, footer, hero overlay          |
| Surface (light)     | White           | `#FFFFFF`  | Page background, cards                 |
| Menu card BG        | Cream / Parchment | `#F3E6C4` | Pulled from the menu PDF’s card color — final hex confirmed after extracting from the PDF |
| Text (primary)      | Near-black      | `#1A1A1A`  | Body copy                              |
| Text (on dark)      | White           | `#FFFFFF`  | Copy on black nav/footer               |

> The exact “menu card” cream will be sampled from `SwanCity_Food_Menu.pdf` during setup; the hex above is a placeholder close to typical roadhouse menu stock.

---

## 3. Tech Stack

- **Framework:** React 18 (plain React, no Next.js) — bootstrapped with **Vite** for fast dev/build
- **Language:** JavaScript (JSX). No TypeScript unless you ask.
- **Routing:** `react-router-dom` (HashRouter or BrowserRouter — BrowserRouter by default)
- **Styling:** Plain CSS modules + a small shared variables file (`theme.css`) for the palette. No Tailwind, to keep the stack minimal and match the “React JS” request.
- **PDF viewing:** Native `<iframe>` / `<object>` embed + a download button fallback. No heavy PDF.js dependency unless needed.
- **Icons:** `react-icons` (phone, clock, location, social).
- **Fonts:** Google Fonts — a bold display face (e.g. _Bebas Neue_ or _Oswald_) for headings, _Inter_ for body.
- **Deployment target:** static build output (`dist/`) — deployable to Netlify, Vercel, or any static host.

---

## 4. Site Map & Navigation

Top nav (sticky, black background, white text, red hover underline):

1. **Home** — `/`
2. **Menu** — `/menu`  (dropdown or in-page tabs: _Food Menu_ | _Beverage Menu_)
3. **About Us** — `/about`
4. **Contact Us** — `/contact`

Logo on the left links back to Home. On mobile, the nav collapses into a hamburger.

---

## 5. Page-by-Page Content

### 5.1 Home  (`/`)
- **Hero:** Full-width dark hero with logo overlay, tagline _Eats · Drinks · Relax_, and two CTAs: _See the Menu_ → `/menu`, _Contact Us_ → `/contact`.
- **Welcome strip:** Short 2–3 sentence intro about the Roadhouse vibe.
- **Highlights (3-card row):** _Great Food_, _Full Bar_, _Warm Atmosphere_ — each with an icon and a one-line blurb.
- **Hours & Location snippet:** Pulled from Contact; links through to `/contact`.
- **Footer:** Logo, address, phone, hours, small copyright line.

### 5.2 Menu  (`/menu`)
- Tabbed view with two tabs: **Food Menu** and **Beverage Menu**.
- Each tab renders the corresponding PDF embedded full-width (with cream menu-card background framing it) plus a **Download PDF** button.
- Mobile fallback: if the embedded PDF doesn’t render inline, show a large “Open Food Menu (PDF)” / “Open Beverage Menu (PDF)” button.

### 5.3 About Us  (`/about`)
- Short story section (placeholder copy until you supply final text).
- Values / what-we-stand-for trio (food, drinks, community).
- Photo slots (placeholders for now).

### 5.4 Contact Us  (`/contact`)
- **Phone:** +1 (587) 322-0786  (click-to-call `tel:` link)
- **Location:** 11401 100 Ave., Grande Prairie, AB T8V 5M6, Canada
- **Business Hours:** Monday – Sunday, 9:00 AM – 10:00 PM
- Embedded Google Map of Grande Prairie (generic pin until exact street address is provided).
- Optional simple contact form (name / email / message) — mailto-based unless a backend is added.

---

## 6. Project Structure (proposed)

```
SwanCity-Website/
├── public/
│   ├── SwanCity_Logo.png
│   ├── Swan City Roadhouse logo.png
│   ├── SwanCity_Food_Menu.pdf
│   └── SwanCity_Beverage_Menu.pdf
├── src/
│   ├── assets/                 # icons, decorative images
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroCTA.jsx
│   │   └── MenuTabs.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   ├── theme.css           # color + font variables
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── PROJECT_SPEC.md            # this file
```

_Note:_ The existing `.next/` directory from a prior Next.js attempt will be deleted before the Vite scaffold is created.

---

## 7. Build Steps (once plan is approved)

1. Remove stale `.next/` folder.
2. Scaffold Vite React app in-place.
3. Install deps: `react-router-dom`, `react-icons`.
4. Move the 2 logos and 2 PDFs into `public/`.
5. Create `theme.css` with the palette above.
6. Build `Navbar` + `Footer` shared layout.
7. Build pages: Home → Menu → About → Contact.
8. Wire routing in `App.jsx`.
9. Responsive pass (mobile ≤ 480px, tablet ≤ 900px, desktop).
10. `npm run build`, smoke test `npm run preview`.

---

## 8. Open Questions (please confirm)

1. **Menu page layout:** tabs (Food | Beverage) on one page — OK? Or two separate sub-pages under `/menu/food` and `/menu/beverage`?
2. **Exact menu-card cream color:** sample from the PDF, or do you have a specific hex?
3. **Street address for Grande Prairie** — is there one to drop into the map and footer, or just the city for now?
4. **About Us copy** — do you have the story text, or use placeholder until you provide it?
5. **Contact form:** include a simple mailto-based form, or phone/address only?
6. **Social links** (Facebook / Instagram) — do any exist yet?

---

## 9. Out of Scope (for this first build)

- CMS / admin panel
- Online ordering or reservations
- Multi-language support
- Backend / database
- Analytics beyond a simple GA4 snippet (can add on request)
