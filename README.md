# Sharon K Davasia — Portfolio

A white-themed, editorial portfolio for an AI/ML engineer and full-stack developer.
Built as a Framer-quality interactive experience: choreographed hero, scroll-driven motion,
tactile project showcases, and a restrained motion system.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion
**Fonts (self-hosted):** Inter Tight (sans) · Instrument Serif (accent) · JetBrains Mono (metadata)

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build
```

No environment variables, no backend, no external assets. Every preview graphic is
original inline SVG/CSS, so the site loads fast and stays consistent offline.

---

## Structure

```
src/
├─ App.tsx                  section composition + MotionConfig
├─ data/content.ts          single source of truth (profile, projects, experience…)
├─ lib/
│  ├─ motion.ts             motion language: easings, durations, stagger, hooks
│  └─ hooks.ts              active section, local time, pointer, media queries
├─ styles/index.css         design tokens, component classes, a11y base
└─ components/
   ├─ Nav.tsx               condensed-on-scroll nav, active indicator, mobile overlay
   ├─ Chrome.tsx            scroll progress bar, section rail, crosshair accent
   ├─ Hero.tsx              choreographed entrance, asymmetric editorial grid
   ├─ ProfileVisual.tsx     abstract portrait composition (no invented face)
   ├─ Ticker.tsx            kinetic separator, pauses on hover
   ├─ Work.tsx              featured editorial projects + compact rows
   ├─ ProjectVisual.tsx     original per-project SVG previews
   ├─ Experience.tsx        timeline with a scroll-drawn rail
   ├─ About.tsx             scroll-lit statement, toolkit, credentials
   ├─ Contact.tsx           closing CTA, socials, footer
   └─ primitives.tsx        SplitText, MaskedLines, Reveal, Stagger, DrawLine, arrows
```

---

## Motion system

One motion language, defined in `src/lib/motion.ts` and used everywhere:

| Property | Guideline |
| --- | --- |
| Micro-interactions | 150–250 ms |
| Button transitions | 180–250 ms |
| Standard reveals | 500–750 ms |
| Hero word stagger | 60–100 ms (`0.075s`) |
| Image transitions | 600–900 ms |
| Section transitions | 400–700 ms |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` + `(0.16, 1, 0.3, 1)` |
| Travel distance | 8–24 px |

**Hero choreography** (seconds): nav `0.15` → label `0.45` → heading `0.62` (words stagger)
→ visual `0.95` → description `1.32` → actions `1.50` → accents `1.70`.

**Scroll behaviour**
- Masked line reveals for section headings; staggered opacity for supporting copy.
- Clip-path reveals on project visuals, with controlled scroll-linked scale.
- Parallax at different rates for hero copy, portrait, and ambient shapes.
- A single scroll-lit paragraph in *About* — used once, deliberately.
- Progress bar, section rail, and a scroll-drawn experience timeline.

---

## Accessibility & performance

- `prefers-reduced-motion` is respected globally (`MotionConfig reducedMotion="user"` plus a CSS
  guard that neutralises animation/transition durations). Scroll-linked text falls back to full
  opacity, parallax collapses to zero, and marquees stop.
- Transform/opacity-only animations; no layout-affecting props in scroll handlers.
- Cursor-follow effects are gated behind `(hover: hover) and (pointer: fine)` and are strictly
  decorative (`aria-hidden`).
- Semantic landmarks, one `<h1>`, skip link, visible focus rings, `aria-current` on nav, and
  labelled links — all interactive states are keyboard reachable.
- No scroll-jacking; native smooth scrolling only, and `scroll-mt` offsets for anchored sections.
- Self-hosted fonts with `font-display: swap`; below-the-fold work is CSS/SVG only, so there are
  no network-blocking images.

---

## Content

All copy lives in `src/data/content.ts`. Update a project, role, or skill group there and every
section picks it up.

Social links point at the live profiles: GitHub `Sharon-Davasia` and the LinkedIn profile listed on
the résumé. Project "Repository / Live demo" links currently point to the GitHub profile —
swap in the exact repo URLs in `content.ts` as each project is published.

---

## Deployment

Static output — deploy `dist/` to Vercel, Netlify, or GitHub Pages.

```bash
npm run build
```
