# Karaoke Night — Eventbrite Integration Plan

Plan for embedding the Karaoke Night Eventbrite event on the SwanCity Roadhouse website so visitors can purchase tickets without leaving the site.

## Event Details

- **Event:** Karaoke Night
- **Eventbrite URL:** https://www.eventbrite.com/e/karaoke-night-tickets-1990185338923
- **Eventbrite Event ID:** `1990185338923` (the numeric suffix of the URL)

## Decisions Made

| Decision | Choice |
|---|---|
| Placement | Inline section on the Entertainment page (`/entertainment`) |
| Embed style | Eventbrite **Modal Checkout Widget** (official JS widget) |
| Scope | Karaoke only — hardcode the event ID, no reusable system yet |

### Note on placement + embed style

"Inline embed" and "modal checkout widget" are slightly different things. The interpretation in this plan: a **dedicated, always-visible Karaoke ticket section sits inline on the Entertainment page**, and inside that section a **"Get Tickets" button opens the Eventbrite modal checkout**. The checkout itself is a modal, but the section that hosts the button is inline and persistent. Confirm this matches your intent before development.

## How Eventbrite Embedded Checkout Works

Eventbrite provides an official JS widget (`eb_widgets.js`) that mounts a "Tickets" button. When clicked, it opens a modal over the host site containing the full Eventbrite checkout flow. Tickets, payment, and confirmation all happen inside the modal — users never leave SwanCity.

Reference: https://www.eventbrite.com/platform/docs/embedded-checkout

Required pieces:
1. Load the script `https://www.eventbrite.com/static/widgets/eb_widgets.js`
2. A trigger button with a unique `id`
3. A JS call: `window.EBWidgets.createWidget({ widgetType: 'checkout', eventId: '...', modal: true, modalTriggerElementId: '...' })`

## Step-by-Step Implementation Plan

### Step 1 — Add the Eventbrite widget script to `index.html`

In `index.html`, add the Eventbrite widget script to `<head>` (or just before `</body>`):

```html
<script src="https://www.eventbrite.com/static/widgets/eb_widgets.js"></script>
```

This loads the widget globally so any page can use it. Lightweight, no performance concern.

### Step 2 — Build a small React component for the ticket button

Create `src/components/EventbriteCheckoutButton.jsx`. Responsibilities:

- Accepts `eventId` and `label` (e.g. "Get Tickets") as props
- Renders a styled `<button>` with a unique DOM id
- On mount, calls `window.EBWidgets.createWidget({ widgetType: 'checkout', eventId, modal: true, modalTriggerElementId: <unique id> })` inside a `useEffect`
- On unmount, no cleanup required (Eventbrite manages its own modal state)
- Defensive: if `window.EBWidgets` isn't loaded yet, no-op gracefully (the script in step 1 should always be loaded, but be safe)

Companion CSS file `src/components/EventbriteCheckoutButton.css` for button styling that matches the existing `.btn .btn-primary` look on the site (see `Entertainment.css` and other pages for the visual language — rustic/roadhouse, star accents, warm tones).

### Step 3 — Add a Karaoke ticket section to the Entertainment page

In `src/pages/Entertainment.jsx`, add a **new dedicated section** between the weekly lineup grid and the existing CTA section. This new section will be the "inline" home of the Karaoke ticketing.

Suggested structure:

```
[page header — unchanged]
[weekly lineup grid — unchanged]
[NEW: Karaoke Night ticket section]
  - Eyebrow: "— This Thursday —" (or similar)
  - Heading: "Karaoke Night — Get Your Tickets"
  - Short blurb / time / what to expect
  - <EventbriteCheckoutButton eventId="1990185338923" label="Get Tickets" />
  - Optional: small "Powered by Eventbrite" line for trust
[party/private events CTA — unchanged]
```

Styling lives in `src/pages/Entertainment.css` — reuse existing visual tokens (star rule, eyebrow text, container, section padding) so it feels native to the page.

### Step 4 — (Optional) Cross-link from the existing Karaoke card

The existing Karaoke event card in the weekly lineup grid (`Entertainment.jsx` lines 14–20) could get a small "Get Tickets ↓" link that scrolls down to the new ticket section. This is a nice-to-have, not required. Decide during development whether it adds clarity or noise.

### Step 5 — Manual QA in the browser

Run `npm run dev` and verify in a real browser:

- [ ] Entertainment page renders without console errors
- [ ] New Karaoke ticket section appears inline below the events grid
- [ ] "Get Tickets" button is styled consistently with other site buttons
- [ ] Clicking the button opens the Eventbrite modal overlay
- [ ] Modal shows the correct Karaoke Night event with ticket options
- [ ] Closing the modal returns user cleanly to the Entertainment page
- [ ] Test on mobile viewport (modal should be responsive — Eventbrite handles this)
- [ ] Test in an incognito window (no logged-in Eventbrite session)
- [ ] Verify nothing breaks on other pages

### Step 6 — Deploy

Standard Vercel deploy via the existing pipeline. No backend changes, no env vars, no new dependencies.

## Files Touched

| File | Change |
|---|---|
| `index.html` | Add Eventbrite widget `<script>` tag |
| `src/components/EventbriteCheckoutButton.jsx` | **NEW** — reusable button component |
| `src/components/EventbriteCheckoutButton.css` | **NEW** — button styling |
| `src/pages/Entertainment.jsx` | Add new Karaoke ticket section |
| `src/pages/Entertainment.css` | Styles for new section |

## Open Questions / Things to Confirm

1. **Placement interpretation** — confirm the "inline section with modal-trigger button" reading above matches your intent.
2. **Section copy** — what should the heading, blurb, and date/time text say in the new Karaoke ticket section? Should it pull from the existing Karaoke card text or be unique copy?
3. **Visuals** — should the new section have a background image (e.g. a stage/mic photo) or stay text-only with star accents like the rest of the page?
4. **Future events** — if Trivia or Live Music also get Eventbrite events later, do you want me to refactor at that point, or build the reusable system now? (Current plan: refactor later.)
5. **Analytics** — do you want any tracking when the "Get Tickets" button is clicked (e.g. Google Analytics event)? Not in scope unless requested.

## Out of Scope

- Backend changes (Eventbrite handles all ticketing, payment, and confirmation emails)
- Custom checkout UI (using Eventbrite's modal as-is)
- A dedicated event-management admin page on SwanCity
- Email reminders or post-purchase flow on SwanCity side
