# Wedlock Events

A premium, cinematic portfolio and inquiry site for **Wedlock Events**, a luxury
wedding design & planning studio. Built as a fast, responsive single-page
experience inspired by the restraint and motion of Apple's site and the
storytelling of luxury wedding films.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** for design tokens and layout
- **Framer Motion** for scroll reveals, parallax and transitions
- No backend required to run; the inquiry form has a clean integration point.

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build -> dist/
npm run preview    # preview the production build
npm run lint       # eslint
```

## Project structure

```
public/media/              # all photographs & videos, served at /media/*
public/media/posters/      # generated video poster frames
src/
  data/media.ts            # the media manifest — single source of truth
  data/content.ts          # brand, nav, services and section copy
  components/               # reusable UI (Navbar, MediaThumb, Lightbox, ...)
  sections/                 # page sections (Hero, Gallery, Inquiry, ...)
```

### Media manifest

Every image and video is catalogued in `src/data/media.ts` with its category,
display priority, dimensions (for layout-shift-free rendering), an optional
caption, a featured/hero flag and a classification confidence. **UI components
never hard-code media** — add or re-categorise assets by editing the manifest
only. Empty categories are automatically hidden.

Assets were classified by visual inspection of the studio's actual event
footage. The original media files at the repository root were left untouched; a
working copy lives in `public/media/` so the site can serve them.

## Inquiry form & submissions

The inquiry form validates fully on the client and is **not** wired to a live
service out of the box — it runs in a clearly-labelled preview mode. To make it
operational, set a public endpoint:

```bash
# .env
VITE_INQUIRY_ENDPOINT=https://your-form-endpoint.example/inquiries
```

The form will then `POST` the inquiry as JSON. **Never** place API keys or
secrets in a `VITE_*` variable — those are bundled into the client. Keep any
secret on the server behind that endpoint.

## Accessibility & performance

- Respects `prefers-reduced-motion` (animations and parallax disable).
- Keyboard-navigable gallery lightbox (`Esc`, `←`, `→`).
- Lazy-loaded media with reserved aspect ratios; videos load on demand with
  poster frames (nothing auto-downloads).
- Semantic landmarks, skip link, labelled form controls and image alt text.
