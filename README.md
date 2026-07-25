# Seyed Ehsan Hashemi — Portfolio

A cinematic, WebGL-driven personal portfolio. Scrolling does not move a page —
it moves a camera through a dark, volumetric world.

## The concept: THE THREAD

A single continuous curve of light winds through the void. The camera travels
that curve as you scroll, and every section of the site is a station along it.
Because one persistent WebGL canvas sits behind the entire document, sections
never cut — the scene simply flows from one act to the next.

The world reacts to presence: the camera leans toward the pointer, rolls and
widens its lens with scroll speed, energy pulses race along the thread as you
move faster, the particle field scatters away from the cursor, and headline
glyphs lift one by one as you sweep across them.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 with a CSS-variable token layer |
| 3D | Three.js · React Three Fiber · Drei · custom GLSL |
| Post-processing | Bloom · chromatic aberration · vignette · grain |
| Motion | GSAP (ScrollTrigger) · Framer Motion |
| Scroll | Lenis, driven from a single shared GSAP ticker |
| State | Zustand |
| Forms | React Hook Form · Zod |

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Architecture notes

**One render loop.** Lenis is ticked by GSAP rather than its own `requestAnimationFrame`,
so scroll, timeline animation and the 3D frame all advance together.

**Reactivity outside React.** Pointer position, pointer velocity and scroll
velocity live in a mutable module (`lib/pointer.ts`) that the scene samples every
frame. Nothing that animates per-frame goes through React state, so no re-renders
happen in the hot path.

**Adaptive quality.** Device signals pick a starting tier (particle count, thread
resolution, effect budget, DPR) and a runtime performance monitor steps down if
frames actually drop. `prefers-reduced-motion` switches the canvas to a single
static frame and disables camera drift.

**Content stays crawlable.** Every section renders its real copy as server-rendered
DOM, so the experience is readable to search engines and screen readers even though
the atmosphere is drawn in WebGL.

**Bilingual by construction.** English and Persian dictionaries are type-checked
against each other — a missing translation key fails the build. Switching locale
swaps typeface and flips the document to RTL.

## Project layout

```
app/          routes, layout, global styles
components/
  experience/ WebGL stage: camera rig, thread, particle field, stations
  sections/   the eight acts of the page
  ui/         cursor, preloader, monogram, reactive text, glass panels
  layout/     nav, fullscreen menu, footer
lib/          store, scroll, i18n, pointer state, hooks
content/      profile, projects, skills, journey, socials — edit these
```

All copy and project data lives in `content/`. Updating the site means editing
those files, not the components.

## Typography

Display type is **Instrument Serif**, running text is **Newsreader**, and Persian
is set in **Vazirmatn** — all served locally through `next/font`.

## License

© Seyed Ehsan Hashemi. All rights reserved.
