# AGENTS.md

Operating manual for anyone building this site, human or AI. Read this first, every session.

Symlink `CLAUDE.md` to this file so both tools pick it up.

## The four files

| File | Holds | Read when |
|------|-------|-----------|
| `AGENTS.md` | Rules, workflow, build plan, definition of done | Every session |
| `PRODUCT.md` | Audience, goals, real content inventory, copy voice | Writing copy, adding content, deciding scope |
| `DESIGN.md` | Art direction, tokens, typography, motion system | Any visual or animation work |
| `ARCHITECTURE.md` | Stack, routes, folders, content schemas, components, security, performance | Any code work |
| `PAGES.md` | Section-by-section spec for every page | Building or editing a page |

One decision lives in one file. If a hex value appears in two files, one is stale. Fix it in the same commit.

## Hard constraints

Not preferences. A change that violates one is rejected regardless of quality.

1. No gradients. Not on backgrounds, text, borders, or hover. Flat color only.
2. No glassmorphism. No `backdrop-filter: blur`, no frosted panels, no translucent cards over imagery.
3. No glow, neon, or drop shadows for elevation. Depth comes from borders, flat color blocks, and scale.
4. No em dashes in copy, docs, alt text, or comments. Use a period or a comma.
5. No lorem ipsum. If real copy is missing, write real copy and flag it `COPY-PENDING:` in the PR.
6. No stock photography. Our own event photos or nothing.
7. No hardcoded colors, sizes, radii, or durations in components. Tokens only, from `DESIGN.md`.
8. No number on screen without a source recorded in `content/stats.ts`.
9. No new dependency without a line in the PR explaining why the platform primitive is insufficient.
10. No copying markup, CSS, assets, illustrations, or sentences from the reference sites. Design language only.

## Forbidden layout patterns

These mark a site as template output. Do not produce them.

- Centered hero with headline, subline, and two buttons side by side
- A row of three equal cards with icons above titles
- Alternating image-left and image-right feature bands
- Full-width testimonial carousel with decorative quotation marks
- Every section centered at the same max width with the same vertical padding
- Bento grids
- Icons used as decoration where the icon carries no information

If a section looks like what a generic model would output for any student club, change the composition. Break symmetry, push content off-center, let one element cross a column boundary, make the type much larger or much smaller than expected, or delete 40 percent of the elements.

## Session workflow

1. Read `AGENTS.md` plus only the files the task names.
2. Restate the task in two sentences and list the files you will create or edit. If the task is larger than one section or one component, stop and confirm before building.
3. Build.
4. Run the self-review below.
5. Update any doc your change invalidated.

Narrow scope wins. One section per session beats one page per session.

## Self-review

Run before reporting a task complete.

- Tokens only, no literal hex or px?
- Works at 375, 768, 1280, 1920, with no horizontal scrollbar?
- Every interactive element keyboard reachable with a visible focus ring?
- Respects `prefers-reduced-motion`?
- Every image has explicit dimensions or a fixed aspect ratio, so CLS stays at 0?
- Every animated component is a client component with GSAP inside `useGSAP`?
- Copy passes the banned list in `PRODUCT.md`?
- Content still readable with JavaScript disabled?

## Build plan

Each task is written so it can be pasted in as a whole session instruction. Update the status column in the same commit that completes the task.

### Phase 0, foundation

| ID | Task | Read | Status |
|----|------|------|--------|
| 0.1 | Next.js 15 scaffold, TS strict, Tailwind v4, ESLint with jsx-a11y, Prettier, Husky, folder structure, path alias, `.env.example` | ARCHITECTURE | todo |
| 0.2 | `globals.css`: theme block, ground classes, grain layer, base resets, focus defaults, `noise.svg` | DESIGN | todo |
| 0.3 | Self-host the three typefaces, metric-adjusted fallbacks, type scale utilities | DESIGN | todo |
| 0.4 | Layout shell: Ground, Container, Grid, Nav, Footer, skip link, mobile overlay with focus trap | ARCHITECTURE, DESIGN | todo |
| 0.5 | Motion providers and primitives: SmoothScroll, Preloader, PageTransition, SplitLines, RevealGroup, CountUp, Marquee, HoverInvert | DESIGN | todo |

Gate for 0.5: mount and unmount the demo route 20 times with no growing tween count, and reduced motion renders final states.

### Phase 1, content layer

| ID | Task | Read | Status |
|----|------|------|--------|
| 1.1 | `lib/schemas.ts`, `lib/content.ts`, `scripts/validate-content.ts`, wired into CI and pre-commit | ARCHITECTURE | todo |
| 1.2 | Write and enter every blocking item from the launch content table into `content/` | PRODUCT, ARCHITECTURE | todo |
| 1.3 | Image pipeline: collect, grade, resize, rename, normalize sponsor logos to SVG, write alt text for every image | PRODUCT, DESIGN | todo |

Gate for 1.1: a deliberately broken content file fails the build with a message naming the file and the field.

### Phase 2, landing page

One task per section, in order. Read `PAGES.md` plus `DESIGN.md` for each.

| ID | Section | Status |
|----|---------|--------|
| 2.1 | Hero | todo |
| 2.2 | Marquee divider | todo |
| 2.3 | Stats band | todo |
| 2.4 | What we run | todo |
| 2.5 | Pitch statement | todo |
| 2.6 | The Ledger | todo |
| 2.7 | Proof wall | todo |
| 2.8 | Backed by | todo |
| 2.9 | Partner CTA | todo |
| 2.10 | Assembly, Lighthouse pass, bundle analysis | todo |

### Phase 3, sponsor path

| ID | Task | Status |
|----|------|--------|
| 3.1 | `/sponsors` page | todo |
| 3.2 | Inquiry form: server action, server-side Zod, Turnstile, rate limit, honeypot, Resend | todo |
| 3.3 | Sponsorship deck plus download tracking | todo |

### Phase 4, content routes

`/events`, `/events/[slug]`, `/projects`, `/wall-of-fame`, `/team`, `/mentors`, `/about`, `/join`, `/contact`, `not-found`, `error`.

### Phase 5, hardening

Security headers and CSP, SEO and sitemap and OG images, accessibility audit, performance pass, analytics.

### Phase 6, launch

Work the launch checklist below.

## Definition of done, per task

- Acceptance criteria in `PAGES.md` pass
- Renders correctly at 375, 768, 1280, 1920
- Keyboard reachable, visible focus, logical tab order
- Works under `prefers-reduced-motion`
- Content readable with JavaScript disabled. Motion is lost, content is not.
- `build`, `lint`, `tsc --noEmit`, `validate` all pass
- Any doc invalidated by the change was updated in the same commit

## PR review checklist

The reviewer runs this, not the author.

1. Any gradient, blur, glow, shadow, or rounded corner outside a pill?
2. Any em dash in the diff?
3. New dependency? Justified?
4. Hardcoded values that should be tokens?
5. New interactive element without keyboard support?
6. Bundle growth recorded?
7. New number on screen without a source in content?
8. Anything animating on scroll up that should not?

## Launch checklist

- [ ] `kcecell.org` on the new deploy, HTTPS enforced, HSTS preloaded
- [ ] 301 redirects for any previously indexed URL that no longer exists, everything else to `/`
- [ ] `sitemap.xml` and `robots.txt` served, submitted to Search Console
- [ ] OG images verified in LinkedIn, X, and WhatsApp preview tools
- [ ] Favicon and app icons at every size
- [ ] Analytics live, deck download and form submission tracked
- [ ] Form delivers to the real inbox, tested from an external address
- [ ] Turnstile live keys, rate limiting verified
- [ ] securityheaders.com grade A or above
- [ ] 404 and error pages styled
- [ ] Deploy access list reviewed, past members removed
- [ ] Branch protection on `main`
- [ ] Lighthouse mobile: performance 90+, accessibility 100, on `/`, `/sponsors`, `/events`

## Annual handover

Before each outgoing team leaves:

1. Add the new year to `content/team/`
2. Re-verify every stat and update `verifiedOn`
3. Archive the year's events with attendance and reports
4. Rotate API keys and deploy access
5. Walk the incoming team through this file and the common edits section of `ARCHITECTURE.md`