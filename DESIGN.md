# DESIGN.md

The complete visual system. Art direction, tokens, typography, motion. Nothing visual is decided outside this file.

## Direction: Signal Grid

Engineered, printed, loud where it matters and silent everywhere else.

The page reads like a well-set technical publication that occasionally shouts. Structure is visible: hairline rules, bordered cells, index numbers, running labels. Against that structure sit oversized headlines and full-bleed color bands that carry the energy of the reference sites.

Why this one: E-Cell sells competence to sponsors and energy to students. A visible grid signals competence. Flat color bands and huge type deliver the energy. Neither needs a gradient or a blur.

One direction. Never blended with another.

## Palette

Five values. No sixth without a documented reason.

| Token | Hex | Role |
|-------|-----|------|
| Ink | `#0E0E0F` | Text on light, and the ground of inverted sections. Never pure black. |
| Paper | `#FAF8F4` | Default page ground. Warm, not white. |
| Signal | `#FF4A1C` | The single accent. CTAs, active states, one word in a headline, full color bands. |
| Chalk | `#E2DED4` | Hairlines, borders, table rules, dividers. |
| Steel | `#6E6A63` | Secondary text, metadata, captions, disabled states. |

Rules:

- Signal is at full value or absent. Never a tint, never translucent.
- A section is grounded in Paper, Ink, or Signal. Those three, nothing else.
- On Signal, text is Ink. On Ink, text is Paper and the accent is Signal.
- Chalk is never text. Steel is never a border.
- One Signal ground per two viewport heights of scroll. Overuse kills it.

Contrast: Ink on Paper is 17.4:1. Ink on Signal is 13.8:1. Steel on Paper is 4.9:1, so Steel is never used below 14px. Signal on Paper is 3.4:1, so Signal is never body text. It is display type, borders, or a ground.

## Surface system

Depth comes from three devices only.

1. **Ground switching.** Adjacent sections change ground color. That contrast is the primary structure.
2. **Hairlines.** 1px Chalk on Paper, 1px Paper at 20 percent on Ink. Borders define cells, not shadows.
3. **Scale.** A large element reads as closer. A small tracked label reads as far.

Border radius is 0 everywhere except pills and status chips, which are fully rounded. Buttons square. Cards square. Images square.

Grain: SVG turbulence noise at 3.5 percent opacity, fixed to the viewport, above the ground and below content. It is the only texture in the system and never appears over a photograph.

## Layout DNA

- 12 columns, 24px gutters desktop, 16px mobile. Max content width 1440px, full-bleed sections break out.
- Asymmetry is the default. 5/7 and 4/8 splits, not 6/6.
- Sections do not share vertical padding. Rhythm varies by intent.
- The grid is often visible. Bordered cells, table layouts, and index rows beat floating cards.
- One section per two viewports may be 70 percent empty. Emptiness is a device.
- Marquee strips sit at the seam between two grounds.
- Numbering appears only where the content is a real sequence.

## Typography

| Role | Face | Weights |
|------|------|---------|
| Display | Bricolage Grotesque, variable | 600, 800 |
| Body and UI | Geist Sans | 400, 500 |
| Mono, labels, all numbers | JetBrains Mono | 400, 500 |

Self-hosted via `next/font/local`, subset to latin, `display: swap`, metric-adjusted fallbacks so a swap causes no shift. Total font payload budget 180KB.

### Scale

| Token | Size | Line height | Tracking | Use |
|-------|------|-------------|----------|-----|
| `--text-display` | clamp(3.25rem, 11vw, 11rem) | 0.88 | -0.03em | Hero and one-word statements. One per page. |
| `--text-h1` | clamp(2.5rem, 6.5vw, 5.5rem) | 0.94 | -0.025em | Page titles, major section heads |
| `--text-h2` | clamp(2rem, 4vw, 3.25rem) | 1.02 | -0.02em | Section heads |
| `--text-h3` | clamp(1.375rem, 2.2vw, 1.875rem) | 1.15 | -0.01em | Row titles, subsection heads |
| `--text-lead` | clamp(1.125rem, 1.6vw, 1.375rem) | 1.45 | 0 | Section intro, one per section |
| `--text-body` | 1rem | 1.6 | 0 | Body copy |
| `--text-small` | 0.875rem | 1.5 | 0 | Captions, secondary info |
| `--text-label` | 0.6875rem | 1.2 | 0.22em | Uppercase mono labels, eyebrows, plate captions |

The gap between `--text-h3` and `--text-lead` is deliberate. Do not fill it. The jump from very large to normal is part of the direction.

### Type rules

1. Display and h1 use the display face. Everything else is body or mono.
2. Labels are always mono, uppercase, tracked 0.22em: `01 / PROGRAMS`, `EST. 2019`, `PLATE 04`.
3. Every number, stat, year, date, and price is mono with `font-variant-numeric: tabular-nums`. Numbers must not change width while counting.
4. Body measure caps at 68 characters. A paragraph running the full 1440px fails review.
5. Headlines get manual line breaks in the content file. Do not let the browser decide where an 11vw headline wraps. `text-wrap: balance` on h2 and h3 only.
6. One word per headline may be Signal. Never more.
7. No italics except a work title in a plate caption.
8. No letter-spacing on body copy.
9. Uppercase is for labels only.
10. Minimum body size on mobile is 16px.

### Headline construction

Build each line as its own mask so GSAP can reveal them independently.

```tsx
<h1 className="font-display text-display leading-[0.88] tracking-[-0.03em]">
  <span className="block overflow-hidden"><span className="block" data-line>Problem solvers</span></span>
  <span className="block overflow-hidden"><span className="block" data-line>building <em className="text-signal not-italic">proof</em>.</span></span>
</h1>
```

## Imagery

Ours only. Event photos, team photos, campus. No stock.

- Full-bleed or full-column. No photographs inside padded cards.
- Editorial crops. A 3:2 or 4:5 crop that cuts the subject deliberately beats a centered safe crop.
- One consistent grade across every image: raised contrast, warm point matched to Paper. A mixed-quality set must read as one set.
- Every content-page photograph carries a plate caption in Steel mono: `PLATE 04 / SINGULARITY 2025 / KCCEMSR`.
- Text over a photograph sits on a solid Ink bar. No gradient veils, ever.

## Illustration

One motif, drawn by us, reused.

Flat two-color line system built from arrows, grids, and node diagrams. Signal on Paper or Paper on Ink. 2px strokes, no fills except solid Signal blocks. It should look like something drawn on a whiteboard during a pitch review, redrawn cleanly.

Appears in: section markers, empty states, the 404, the sponsor tier diagram, and one large piece in the hero. Nowhere else. If a section needs an illustration to feel finished, its content is too thin.

Never: 3D renders, isometric people, generic tech icon sets, borrowed mascots.

## Tokens

Implemented as CSS custom properties in `app/globals.css`, exposed to Tailwind v4 through `@theme inline`.

```css
@import "tailwindcss";

@theme inline {
  --color-ink: #0E0E0F;
  --color-paper: #FAF8F4;
  --color-signal: #FF4A1C;
  --color-chalk: #E2DED4;
  --color-steel: #6E6A63;
  --color-ink-line: rgb(250 248 244 / 0.20);
  --color-signal-ink: #0E0E0F;

  --font-display: "Bricolage Grotesque Variable", "Arial Black", sans-serif;
  --font-body: "Geist Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --text-display: clamp(3.25rem, 11vw, 11rem);
  --text-h1: clamp(2.5rem, 6.5vw, 5.5rem);
  --text-h2: clamp(2rem, 4vw, 3.25rem);
  --text-h3: clamp(1.375rem, 2.2vw, 1.875rem);
  --text-lead: clamp(1.125rem, 1.6vw, 1.375rem);
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-label: 0.6875rem;

  --spacing-1: 0.25rem;  --spacing-2: 0.5rem;   --spacing-3: 0.75rem;
  --spacing-4: 1rem;     --spacing-6: 1.5rem;   --spacing-8: 2rem;
  --spacing-12: 3rem;    --spacing-16: 4rem;    --spacing-24: 6rem;
  --spacing-32: 8rem;    --spacing-40: 10rem;   --spacing-60: 15rem;

  --section-tight: clamp(4rem, 8vw, 6rem);
  --section-base: clamp(6rem, 12vw, 10rem);
  --section-loose: clamp(8rem, 18vw, 15rem);

  --container-max: 90rem;
  --container-text: 42rem;
  --gutter: 1.5rem;
  --gutter-mobile: 1rem;

  --border-hair: 1px;
  --border-heavy: 2px;
  --radius-none: 0px;
  --radius-pill: 999px;

  --dur-instant: 120ms;
  --dur-fast: 320ms;
  --dur-base: 620ms;
  --dur-slow: 1100ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-mech: cubic-bezier(0.2, 0, 0, 1);

  --z-base: 0; --z-grain: 5; --z-sticky: 20; --z-nav: 40;
  --z-overlay: 60; --z-modal: 80; --z-preloader: 100;
}

.ground-paper  { background: var(--color-paper);  color: var(--color-ink); }
.ground-ink    { background: var(--color-ink);    color: var(--color-paper); }
.ground-signal { background: var(--color-signal); color: var(--color-signal-ink); }

.grain::after {
  content: ""; position: fixed; inset: 0;
  z-index: var(--z-grain); pointer-events: none;
  opacity: 0.035;
  background-image: url("/noise.svg");
  background-size: 180px 180px;
}
```

Inside `.ground-ink`, borders use `--color-ink-line`. Elsewhere they use `--color-chalk`.

### Component values

| Token | Value |
|-------|-------|
| Button height | 52px desktop, 48px mobile |
| Button padding X | `--spacing-8` |
| Pill height | 28px |
| Nav height | 72px desktop, 60px mobile |
| Marquee height | 56px desktop, 44px mobile |
| Focus ring | 2px solid Signal, 2px offset |
| Table row height | 64px desktop, auto mobile |
| Card border | 1px Chalk |

### Breakpoints

Tailwind defaults, unchanged. Design targets 375, 768, 1280, 1920. Dark mode is not supported in v1. Inverted sections are an art direction device, not a theme.

### Token rules

1. A component needing a value not listed here adds it here first.
2. No opacity-modified colors beyond the two derived tokens. Do not write `text-ink/60`.
3. No arbitrary Tailwind values in components. `p-[37px]` fails review.

## Motion

| Library | Role |
|---------|------|
| `gsap` + `@gsap/react` 3.13+ | All scroll choreography, text reveals, timelines, pinning |
| `lenis` 1.1+ | Site-wide smooth scroll, driving ScrollTrigger's clock |
| `motion` (Framer Motion) 11+ | Component state only: menus, accordions, tabs, filters |

Division is strict. GSAP owns scroll. Motion owns component state. They never animate the same property.

### Character

Fast and mechanical, not cinematic. This is an engineering site.

- Reveals 0.5 to 0.9s, not 1.6s
- Stagger 0.04 to 0.07s
- `--ease-mech` for entrances, `--ease-out` for exits, never a default ease
- Hover states near-instant at 120ms and blunt: full color inversion, no fade
- Marquees at constant velocity, no easing
- Nothing animates on scroll up except scrubbed timelines
- Lenis lerp 0.12, responsive rather than floaty

### Lenis provider

Mounted once in the root layout.

```tsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);

  return <>{children}</>;
}
```

The named `raf` reference matters. An inline arrow passed to both `add` and `remove` leaks the ticker. Call `ScrollTrigger.refresh()` after each route change.

### React rules, non-negotiable

1. Every animated component starts with `'use client'`.
2. All GSAP lives inside `useGSAP()` with `{ scope: containerRef }`.
3. Hover and click animations use `contextSafe()`.
4. Register plugins once per file.
5. Never animate `width`, `height`, `top`, `left`, `margin`, or `filter`. Transform and opacity only.
6. `will-change` is set for the duration of an animation, never permanently in CSS.
7. Import plugins individually. `gsap/ScrollTrigger`, never `gsap/all`.

```tsx
'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Section() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('[data-reveal]', {
      yPercent: 110, duration: 0.7, ease: 'power3.out', stagger: 0.06,
      scrollTrigger: { trigger: container.current, start: 'top 78%', once: true },
    });
  }, { scope: container });

  return <section ref={container}>...</section>;
}
```

### Primitives

Built once in `components/motion/`. No section writes its own.

| Primitive | Behavior |
|-----------|----------|
| `SplitLines` | Splits a heading into lines, masks each with `overflow: hidden`, reveals `yPercent 110` to `0`, stagger 0.06. Re-splits on resize. |
| `RevealGroup` | Staggered `y: 24, opacity: 0` entrance, fires once at `top 78%`. |
| `CountUp` | Counts to target on scroll-in. Tabular figures, fixed width, no shift. |
| `Marquee` | Constant-velocity loop, pauses on hover, duplicates content so the wrap point is invisible, `aria-hidden` on the duplicate. |
| `HoverInvert` | Ground and text swap at 120ms. Applies on `:focus-visible` too. |
| `PinnedTable` | Pins a section, scrubs rows in as scroll progresses. Used by The Ledger. |
| `ThumbFollow` | Thumbnail follows the cursor at 0.12 lerp on index row hover. Desktop only. |
| `PageTransition` | Signal panel wipes in from left, content swaps, panel exits right. 0.7s total. |
| `Preloader` | First visit only, session-stored. Mono counter 0 to 100, then a vertical wipe. Max 1.4s, skippable. |

### Motion map

Nothing outside this table animates on scroll.

| Section | Technique |
|---------|-----------|
| Preloader | Counter and wipe, first visit only |
| Hero | `SplitLines` on the headline, `RevealGroup` on the meta row, illustration draws in with `stroke-dashoffset` |
| Marquee dividers | `Marquee` |
| Stats band | `CountUp`, one time |
| What we run | `RevealGroup` rows, `ThumbFollow` on hover |
| The Ledger | `PinnedTable` scrubbed, `CountUp` bound to timeline progress |
| Proof wall | Pinned horizontal scroll, scrubbed, desktop only |
| Backed by | `RevealGroup` only |
| Footer | None |

### Mobile, under 1024px

Pinned sections unpin into vertical stacks. Horizontal sections become native overflow with `scroll-snap-type: x mandatory` and no GSAP. `ThumbFollow` disabled. Stagger drops to 0.04, durations reduce 20 percent. Preloader capped at 0.9s.

### Reduced motion

```tsx
useGSAP(() => {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => { /* full choreography */ });
  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('[data-reveal]', { opacity: 1, y: 0 });
  });
}, { scope: container });
```

Under reduced motion: no Lenis, no pinning, no scrubbing, no marquee movement, no preloader. Content is in its final state immediately. This is a functional requirement.

### Restraint pass

After building a section, remove animation until it feels slightly under-animated, then stop.

- More than one thing moving in the viewport at once? Cut one.
- Does an animation delay someone reading? Cut it.
- Does anything move on scroll up? Cut it.
- Does the page still make sense with JavaScript off? It must.

Constant motion reads as generated. Choreographed silence reads as designed.