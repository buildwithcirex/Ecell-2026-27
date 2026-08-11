# ARCHITECTURE.md

Stack, routes, folders, content schemas, component contracts, performance budget, security. Everything about how the site is built.

## Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 15, App Router | Static generation, image optimization, route metadata, server actions |
| Language | TypeScript, `strict: true` | Content schemas and component contracts depend on it |
| Styling | Tailwind CSS v4 with `@theme inline` | Tokens in CSS, utilities in markup, no runtime CSS-in-JS |
| Scroll motion | GSAP + `@gsap/react` + Lenis | See `DESIGN.md` |
| State motion | `motion` | Menus, accordions, filters only |
| Content | TypeScript data files plus MDX for long-form | Git-versioned, type-checked, zero infra, survives handover |
| Validation | Zod | Content fails the build, not the browser |
| Forms | Server Actions, Resend, Cloudflare Turnstile, Upstash rate limit | No third-party embed, no exposed keys |
| Analytics | Vercel Analytics or Plausible | Cookieless, no consent banner |
| Hosting | Vercel | Preview deploys per PR, edge caching, image CDN |

Rejected for v1: a headless CMS, i18n, auth, a database, Redux or Zustand, a component library, an admin dashboard, any animation library beyond the two named.

## Routes

```
/                      Landing
/about                 Who E-Cell is, structure, faculty, timeline
/programs              Recurring programs and initiatives
/events                Upcoming and past, filterable
/events/[slug]         Single event
/projects              Student-built projects and ventures
/projects/[slug]       Single project
/wall-of-fame          Achievements, filterable by category and year
/team                  Current team plus past-year archive
/mentors               Mentor and faculty network
/sponsors              Pitch, tiers, deck, inquiry form
/join                  Membership and recruitment
/contact               Contact and location
/blog, /blog/[slug]    Writing
/not-found             404
```

Everything is statically generated. `/events` and `/events/[slug]` use ISR with `revalidate: 3600`. No route is client-rendered. Interactivity is islands inside static pages.

## Folder structure

```
kcecell/
├── AGENTS.md  CLAUDE.md -> AGENTS.md
├── PRODUCT.md  DESIGN.md  ARCHITECTURE.md  PAGES.md
├── app/
│   ├── layout.tsx            fonts, SmoothScroll, grain, nav, footer
│   ├── globals.css           tokens, grounds, resets
│   ├── page.tsx              landing
│   ├── (marketing)/          about, programs, sponsors, contact, join
│   ├── events/               page.tsx, [slug]/page.tsx
│   ├── projects/  wall-of-fame/  team/  mentors/  blog/
│   ├── actions/              server actions, one file per form
│   ├── sitemap.ts  robots.ts  opengraph-image.tsx
├── components/
│   ├── sections/             one file per landing section
│   ├── ui/                   Button, Pill, Field, IndexRow, DataTable, Plate, LogoWall
│   ├── motion/               primitives from DESIGN.md
│   └── layout/               Ground, Container, Grid, Nav, Footer
├── content/
│   ├── events/*.ts  projects/*.ts  team/<year>.ts  posts/*.mdx
│   ├── sponsors.ts  programs.ts  stats.ts  ledger.ts  achievements.ts  mentors.ts
├── lib/
│   ├── schemas.ts  content.ts  seo.ts  utils.ts
├── public/
│   ├── photos/  logos/  illustrations/  decks/  noise.svg
└── scripts/
    ├── validate-content.ts   runs in CI, fails the build on schema error
    └── optimize-images.ts
```

## Data flow

1. Content authors edit files in `content/`.
2. `lib/content.ts` imports them and parses each through its Zod schema at module load.
3. A schema failure throws at build time. The site cannot deploy with broken content.
4. Pages import typed loaders. Components never reach into `content/`.

```ts
// lib/content.ts
import { EventSchema } from './schemas';
import raw from '@/content/events';

export const events = raw
  .map((e) => EventSchema.parse(e))
  .sort((a, b) => b.startsAt.localeCompare(a.startsAt));

export const upcomingEvents = events.filter((e) => e.status === 'upcoming');
export const pastEvents = events.filter((e) => e.status === 'past');
export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
```

## Content schemas

```ts
// lib/schemas.ts
import { z } from 'zod';

const Slug = z.string().regex(/^[a-z0-9-]+$/, 'lowercase-hyphen-only');
const ISODate = z.string().datetime({ offset: true });

export const ImageSchema = z.object({
  src: z.string().startsWith('/'),
  alt: z.string().min(8, 'Alt text must describe the image, not name the file'),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  caption: z.string().optional(),
  credit: z.string().optional(),
});

export const StatSchema = z.object({
  id: Slug,
  label: z.string().max(32),
  value: z.number(),
  suffix: z.string().max(4).optional(),
  source: z.string().min(4),        // "Singularity 2025 registration export"
  verifiedOn: ISODate,              // stale after 12 months
});

export const EventSchema = z.object({
  slug: Slug,
  title: z.string().max(80),
  edition: z.string().optional(),
  status: z.enum(['upcoming', 'live', 'past', 'cancelled']),
  format: z.enum(['hackathon', 'summit', 'workshop', 'competition', 'speaker', 'bootcamp']),
  startsAt: ISODate,
  endsAt: ISODate.optional(),
  venue: z.string(),
  city: z.string().default('Thane'),
  theme: z.string().optional(),            // Singularity used "Interstellar"
  summary: z.string().max(200),
  description: z.string(),
  registrationUrl: z.string().url().optional(),
  registrationClosesAt: ISODate.optional(),
  attendance: z.number().int().optional(),
  prizePool: z.number().int().optional(),
  cover: ImageSchema,
  gallery: z.array(ImageSchema).max(24).default([]),
  speakers: z.array(Slug).default([]),
  sponsors: z.array(Slug).default([]),
  outcomes: z.array(z.string()).max(5).default([]),
  reportUrl: z.string().optional(),
}).refine((e) => e.status !== 'past' || typeof e.attendance === 'number',
  { message: 'Past events must record attendance' });

export const PersonSchema = z.object({
  id: Slug,
  name: z.string(),
  role: z.string(),
  department: z.enum(['leadership', 'web', 'game-dev', 'events', 'iot', 'social', 'pr-finance',
                      'blogging', 'coordination', 'faculty', 'mentor']),
  year: z.number().int(),                  // team year, e.g. 2026
  photo: ImageSchema.optional(),
  badge: z.string().max(32).optional(),    // e.g. "Built this site"
  links: z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    instagram: z.string().url().optional(),
    site: z.string().url().optional(),
  }).default({}),
  bio: z.string().max(220).optional(),
  expertise: z.array(z.string()).max(5).default([]),   // mentors only
  availableFor: z.array(z.string()).max(5).default([]),
});

export const ProjectSchema = z.object({
  slug: Slug,
  name: z.string(),
  tagline: z.string().max(90),
  stage: z.enum(['idea', 'prototype', 'live', 'revenue', 'funded', 'inactive']),
  kind: z.enum(['project', 'venture']),
  builders: z.array(z.string()).min(1),
  year: z.number().int(),
  stack: z.array(z.string()).max(8).default([]),
  description: z.string(),
  cover: ImageSchema.optional(),
  repoUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).max(4).default([]),
});

export const AchievementSchema = z.object({
  id: Slug,
  title: z.string(),
  category: z.enum(['hackathon', 'entrepreneurship', 'innovation', 'award', 'event']),
  year: z.number().int(),
  team: z.string().optional(),
  members: z.array(z.string()).default([]),
  organizer: z.string(),
  prize: z.string().optional(),        // "INR 20,000" or omitted, never "NA"
  description: z.string().max(240),
  image: ImageSchema.optional(),
  url: z.string().url().optional(),
});

export const SponsorSchema = z.object({
  id: Slug,
  name: z.string(),
  logo: z.string().startsWith('/logos/'),   // SVG, normalized
  url: z.string().url(),
  tier: z.enum(['title', 'platinum', 'gold', 'community', 'in-kind']),
  years: z.array(z.number().int()).min(1),
  quote: z.object({ text: z.string().max(240), by: z.string() }).optional(),
});

export const ProgramSchema = z.object({
  slug: Slug,
  index: z.number().int(),
  name: z.string(),
  kicker: z.string().max(60),
  description: z.string(),
  cadence: z.string(),
  audience: z.string(),
  image: ImageSchema.optional(),
  href: z.string().optional(),
});

export const LedgerRowSchema = z.object({
  year: z.number().int(),
  event: z.string(),
  attendance: z.number().int(),
  sponsors: z.number().int(),
  outcome: z.string().max(60),
});

export const PostSchema = z.object({
  slug: Slug,
  title: z.string().max(90),
  excerpt: z.string().max(180),
  publishedAt: ISODate,
  author: z.string(),
  tags: z.array(z.string()).max(4).default([]),
  cover: ImageSchema.optional(),
  readingMinutes: z.number().int().positive(),
});
```

### Content rules

1. Content is data, not markup. A content file never contains a class name or a hex value.
2. Every field on screen exists in a schema. If a component needs a string, it comes from content.
3. Numbers carry provenance. `source` and `verifiedOn` are required on every stat.
4. Empty-value strings are banned. `prize: "NA"` and `date: "TBA"` are not content. Omit the field and let the component's fallback handle it.

### Fallbacks

| Missing | Behavior |
|---------|----------|
| `PersonSchema.photo` | Initials block on Ink ground, same aspect ratio as a photo |
| `ProjectSchema.cover` | Name set in display type at the same box size |
| `EventSchema.gallery` empty | Gallery section does not render, layout unaffected |
| `SponsorSchema.quote` | Quote block omitted, wall still renders |
| `registrationUrl` on an upcoming event | CTA becomes "Registration opens soon" plus the date |

No default placeholder image files exist. Absence is handled in the component, which is why every fallback above is a designed state rather than a stand-in asset.

### File conventions

| Content | Location |
|---------|----------|
| Events | `content/events/<year>-<slug>.ts` |
| Projects | `content/projects/<slug>.ts` |
| Team | `content/team/<year>.ts`, new file each year, old years kept |
| Everything else | single arrays in `content/<name>.ts` |
| Posts | `content/posts/<slug>.mdx`, frontmatter validated |

Images: photography at 2400px on the long edge, served through `next/image` as AVIF with WebP fallback. Logos SVG only, trimmed viewBox, optical width matched so a wide wordmark and a square mark read at the same weight. Naming `photos/<event-slug>/<nn>.jpg`, no spaces, no camelCase.

`npm run validate` parses every content file and reports errors as `content/events/2025-singularity.ts: attendance is required for past events`. Runs in CI and blocks merge.

## Components

### Rules

1. Server component by default. `'use client'` only for state, effects, or GSAP.
2. Props explicit. No spreading unknown props into a DOM node except a typed `className`.
3. Every list component handles the empty case.
4. Variants are unions, not booleans. `ground: 'paper' | 'ink' | 'signal'`, not `isDark`.
5. No component over 150 lines. If it grows, it is two components.

### Contracts

```tsx
// layout
<Ground as?="section|div|footer" ground="paper|ink|signal"
        rhythm?="tight|base|loose|none" bleed?={boolean} id?={string} />
<Container width?="max|text" />
<Grid />                                    // 12 columns, token gutters
<Nav />      // 72px, hairline bottom, hides on scroll down via Lenis direction,
             // full-screen Ink overlay under 1024px with focus trap and Escape
<Footer />

// ui
<Button variant="solid|outline" size?="md|sm" href?={string} external?={boolean} />
<Pill tone="live|upcoming|past|closed|neutral" />          // always carries text
<Label index?={string} />                                   // renders "01 / PROGRAMS"
<IndexRow index={number} title={string} meta?={string} right?={string}
          href?={string} thumbnail?={ImageData} />
<DataTable head={string[]} rows={(string|number)[][]}
           align?={('left'|'right')[]} caption?={string} />
<StatCell value={number} suffix?={string} label={string} verifiedOn={string} />
<Field name label type?="text|email|textarea|select" options?
       required? help? error? />
<Plate image={ImageData} plate?={number} />
<LogoWall sponsors={Sponsor[]} groupByTier?={boolean} />
<EmptyState title body action?={{ label, href }} />
```

`Ground` wraps every section and applies the ground, the rhythm, and the border color context. Sections never set their own background.

`DataTable` renders a real `<table>` with `<caption>` and scope attributes, and collapses to stacked definition rows under 768px with a data-label pattern, never a horizontal scroll.

`Field` keeps the label visible always. Placeholders are not label substitutes. Errors are announced with `aria-live="polite"` and linked by `aria-describedby`.

### Anti-patterns

- A `Card` component. We do not use cards. Use `Ground`, `Grid`, and borders.
- An `Icon` component for decorative icons. Icons carry information or they do not ship.
- A `Section` component with 14 optional props. Sections are explicit files.
- `useEffect` for animations. Use `useGSAP`.
- Branching on `window.innerWidth` during render. Use CSS and `gsap.matchMedia`.
- Glow or neon components of any kind. If a component's name contains Glow, Neon, or AnimatedBackground, it does not belong here.

## Code conventions

- `strict: true`, `noUncheckedIndexedAccess: true`. No `any`. No non-null assertions except right after a runtime check.
- Content types come from `z.infer`, never hand-written twice.
- Components `PascalCase.tsx`, one per file, named export. Utilities `camelCase.ts`. Content `kebab-case.ts`.
- Booleans read as questions: `isOpen`, `hasQuote`.
- GSAP selector hooks are data attributes: `data-reveal`, `data-line`. Not class names.
- ESLint `next/core-web-vitals` plus `jsx-a11y` recommended, as errors. Prettier at `printWidth: 100`.
- Pre-commit: typecheck, lint, `validate`. CI adds build and Lighthouse on `/` and `/sponsors`.

## Accessibility

Target WCAG 2.2 AA. These are functional bugs, not nice-to-haves.

1. One `<h1>` per page. Heading levels never skip.
2. Landmarks: `header`, `nav`, `main` with `id="main"`, `footer`. A skip link is the first focusable element.
3. Every interactive element keyboard reachable in visual order with a visible focus ring. Never `outline: none` without a replacement.
4. Hover inversions apply on `:focus-visible` too.
5. Color is never the only signal. Pills carry text. Links in prose are underlined.
6. Contrast per `DESIGN.md`. Signal is never body text.
7. Descriptive alt text. Decorative images get `alt=""` and `aria-hidden`.
8. Marquee duplicates are `aria-hidden` and stop under reduced motion.
9. Pinned and horizontal sections never trap keyboard focus.
10. Forms: visible labels, `aria-describedby`, errors announced, focus moves to the first invalid field.
11. Mobile menu traps focus while open, closes on Escape, returns focus to the trigger.
12. Before launch: keyboard-only pass, VoiceOver and NVDA pass, axe with zero critical and zero serious, and 200 percent zoom at 1280px with no overlap.

## Performance budget

Measured on a simulated mid-range Android, 4G throttle, Lighthouse mobile. These are pass or fail.

| Metric | Budget |
|--------|--------|
| LCP | under 2.0s |
| CLS | under 0.05, target 0.00 |
| INP | under 200ms |
| JS transferred, landing | under 180KB gzipped |
| Font payload | under 180KB |
| Largest image | under 250KB |
| Landing page first view | under 1.4MB |
| Lighthouse performance mobile | 90+ |
| Lighthouse accessibility | 100 |

How it is held: GSAP imported per plugin; below-fold client sections via `next/dynamic` with `ssr: true`; `next/image` everywhere with explicit `sizes`; fonts subset and preloaded for the display face only; analytics under 2KB; bundle analyzer run before each release with the delta recorded in the PR.

## Security

Threat model: form spam, dependency compromise, and defacement through a leaked deploy token.

1. **Headers** in `next.config.ts`: CSP with `default-src 'self'`, explicit allowances for analytics and Turnstile, `frame-ancestors 'none'`, nonces for any inline script, no `unsafe-eval`. Plus HSTS `max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
2. **Forms:** server actions only. Validate with the same Zod schema on the server. Turnstile on every public form. Rate limit by IP, 5 per hour. Honeypot field that must stay empty. Strip HTML from all inputs before sending mail.
3. **Secrets:** never behind `NEXT_PUBLIC_`. Rotate annually and whenever someone with access leaves. `.env.local` gitignored, `.env.example` committed with keys and no values.
4. **External links:** every `target="_blank"` carries `rel="noopener noreferrer"`.
5. **Dependencies:** Dependabot weekly, `npm audit` in CI, high and critical block merge, major versions pinned.
6. **Uploads:** there are none. Do not add file upload without revisiting this section.
7. **Access:** deploy access limited to the current core team plus one faculty account, reviewed at handover. Branch protection on `main`, review required.
8. **Content permission:** sponsor logos and photographs used with permission, recorded in the repo. Never commit a photo of a minor without consent on file.

### Environment variables

| Variable | Scope |
|----------|-------|
| `RESEND_API_KEY` | server |
| `CONTACT_INBOX` | server |
| `TURNSTILE_SECRET_KEY` | server |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | client |
| `UPSTASH_REDIS_REST_URL` | server |
| `UPSTASH_REDIS_REST_TOKEN` | server |
| `NEXT_PUBLIC_SITE_URL` | client |

## Error handling

`app/error.tsx` and `app/not-found.tsx` are styled per `PAGES.md`. Never a default Next.js error screen in production. Server actions return a typed result object, never throw to the client. A content schema failure fails the build, which is correct. Do not add a try-catch that swallows it.

## Browser support

Last two versions of Chrome, Safari, Firefox, Edge, plus Safari on iOS 16+ and Chrome on Android 10+.

Check specifically: pinned ScrollTrigger sections and sticky-inside-pinned on Safari; scroll performance in the proof wall and Lenis versus pull-to-refresh on Android Chrome.

## Common edits, for a maintainer who is not a developer

**Add an event:** copy the newest file in `content/events/`, rename it `<year>-<slug>.ts`, change every field, set `status` to `upcoming`, put the cover image in `public/photos/<slug>/`. Open a PR. CI tells you if a field is wrong.

**Mark an event past:** change `status` to `past` and add `attendance`. The build fails if you forget attendance. That is intentional.

**Add a sponsor:** put the SVG in `public/logos/`, add an entry to `content/sponsors.ts` with tier and years.

**Update the team:** create `content/team/<year>.ts`. Do not delete last year's file.

**Change a number on the landing page:** edit `content/stats.ts` and update `verifiedOn`. Never edit a component to change a number.