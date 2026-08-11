# PAGES.md

Section-by-section specification for every page. Read alongside `DESIGN.md` when building.

## Landing page

### Thesis

Scroll order answers a sponsor's questions in the order they ask them. Who are you, how big are you, what do you run, what have you actually done, who backs you, what do I get, how do I reach you.

Ground sequence controls the rhythm:

`Paper → Ink → Paper → Signal → Ink → Paper → Ink → Signal → Ink`

Build sections in order, one per session.

---

### 01 Hero

**Ground:** Paper. 100vh minimum, content anchored to the bottom two thirds, never centered.

The headline spans columns 1 to 9 at `--text-display`. Below it a bordered meta strip spans full width, divided into four cells by hairlines: founded, campus, members, next event. Columns 10 to 12 hold the illustration motif.

No centered subline. No button pair floating in space. Two CTAs sit in the bottom-left of the meta strip, square, 52px, flush against each other sharing a hairline: `Partner with us` on Signal, `See what we run` outlined.

Copy pattern, two lines with the emphasis word in Signal:

```
Problem solvers
building proof.
```

Meta cells are mono label over mono value: `EST. / <year>`, `CAMPUS / KCCEMSR, THANE`, `MEMBERS / <n>`, `NEXT / <event>, <date>`.

**Motion:** `SplitLines` on the headline after the preloader exits, 0.7s, stagger 0.06. Meta cells via `RevealGroup` at 0.25s delay. Illustration draws with `stroke-dashoffset` over 1.1s. Nothing loops.

**Acceptance:** headline occupies at least 40 percent of viewport height at 375px. Meta strip becomes 2x2 under 768px, never a horizontal scroll. LCP is the headline text, under 1.8s on throttled 4G. No shift when fonts load.

---

### 02 Marquee divider

**Ground:** Ink, 56px. Program and event names separated by a Signal square glyph. Constant velocity, duplicate `aria-hidden`, pauses on hover, frozen under reduced motion.

---

### 03 Stats band

**Ground:** Ink. Four numbers in a row on desktop, 2x2 on mobile, separated by hairlines at 20 percent Paper.

Each cell: number at `--text-h1` in mono with tabular figures, label below at `--text-label`, verification year in Steel at the bottom right.

Numbers come from `content/stats.ts` and nowhere else. No page states a figure that another page contradicts.

**Motion:** `CountUp` on scroll-in, one time, 0.9s, stagger 0.05.

**Acceptance:** every number renders its final value with JavaScript disabled. No horizontal shift during the count. Every number's source present in content.

---

### 04 What we run

**Ground:** Paper. The programs index. Not cards.

A bordered table of rows, one per program: index number in mono, name at `--text-h3`, kicker in Steel, cadence on the right, arrow glyph.

Desktop hover inverts the row to Ink and a thumbnail follows the cursor at 0.12 lerp. Mobile shows a small inline thumbnail and no hover behavior.

**Motion:** `RevealGroup` on rows, stagger 0.05. `ThumbFollow` desktop only. `HoverInvert` at 120ms.

**Acceptance:** rows are keyboard focusable and invert on focus, not only hover. Thumbnails preload so the first hover does not flash empty. Collapses to a stacked list under 768px.

---

### 05 The pitch

**Ground:** Signal. Roughly 70 percent empty, deliberately.

One statement at `--text-h1`, Ink on Signal, offset to columns 2 to 8. Below it a single paragraph at `--text-lead` capped at the text measure. Bottom right holds a small mono block listing what a partner gets, four lines maximum, fragments not sentences.

Write this section last, after the rest of the page exists, so it can respond to what is already proven above it.

**Motion:** `SplitLines` on the statement. Nothing else moves.

---

### 06 The Ledger, the signature section

**Ground:** Ink. The thing people remember. A table, the least fashionable component on the internet, treated with total seriousness.

A pinned viewport holds a bordered table. Header row fixed: `YEAR / EVENT / ATTENDANCE / SPONSORS / OUTCOME`. Rows from `content/ledger.ts`, oldest first. As the user scrolls, rows enter from the bottom and earlier rows compress upward. A bottom bar holds running totals that increment as each row passes.

Implementation:

- Pin with ScrollTrigger, `end: '+=' + rows.length * 90 + '%'`, `scrub: 0.6`
- Rows animate `yPercent` and `opacity`, never `height`
- Totals use a scrubbed count bound to timeline progress, not a one-shot tween
- `invalidateOnRefresh: true` so resize recalculates
- Header uses `position: sticky` inside the pinned container, not a separate fixed element

Under 1024px: no pinning. A normal scrollable list of rows with a static totals bar, revealed with `RevealGroup`.

Under reduced motion: fully static table, all rows visible, totals at final value.

**Acceptance:** no jitter during pin at 60fps on a mid-range laptop. Resizing mid-pin does not break layout. Readable as a plain table with JavaScript disabled. Every row matches `content/ledger.ts` exactly.

---

### 07 Proof wall

**Ground:** Paper. Event photography, horizontal scroll pinned and scrubbed on desktop.

Each photograph is full-height minus 160px with a plate caption beneath in mono. Not padded, not rounded, not shadowed. Aspect ratios vary and that variation is the composition.

Under 1024px: native horizontal overflow with `scroll-snap-type: x mandatory`, no GSAP.

**Acceptance:** `next/image` with explicit sizes, `priority` false. Section image weight under 900KB on desktop. Works with trackpad, wheel, and touch. Keyboard users can tab through captions without being trapped.

---

### 08 Backed by

**Ground:** Ink. The sponsor wall. Logos in a bordered grid, one per cell, normalized to a single optical weight, rendered in Paper as monochrome SVG. Tiers separated by a labeled hairline row, not by size differences within a row.

Below it, one sponsor quote if available: text at `--text-h3`, attribution in mono, no decorative quotation marks.

If there are no sponsors yet, this section renders the `EmptyState` copy pattern instead, pointing at `/sponsors`. Never fake a wall with typographic marks standing in for brands we do not have.

**Motion:** `RevealGroup` only. Logos change color to Signal on hover, nothing else.

**Acceptance:** every cell the same size regardless of logo aspect ratio. Each logo links out with `rel="noopener noreferrer"`. Reflows to 2 columns at 375px with no cropping.

---

### 09 Partner CTA

**Ground:** Signal. The conversion moment for audience one.

State what we want, state what we give, state how fast we reply. Three short lines. Deck download button, inquiry link, and a named contact with a real inbox.

**Acceptance:** deck is a direct PDF link under 8MB, tracked as an event. The inbox is monitored. The stated response time is one the team can actually meet.

---

### 10 Footer

**Ground:** Ink. Four columns: navigation, programs, contact, social. Full-width hairline, then a bottom bar with the college name, the year, and a colophon naming the typefaces. Oversized `E-CELL` wordmark is allowed as the closing device.

No newsletter signup unless someone owns sending the newsletter. No scenic backdrop and no externally hosted image, which is both a design problem and a privacy problem.

**Motion:** none.

---

## Shared inner-page shell

Every inner page opens the same way: Paper masthead, page title at `--text-h1`, mono eyebrow with the route index (`03 / EVENTS`), and a factual aside on the right holding counts, a date range, or a status. Full-width hairline below it. No hero images on inner pages. The masthead is typographic.

---

## /sponsors

The most important inner page.

1. Masthead with a one-sentence value line and the deck download top right.
2. **Who you reach.** Audience composition as a bordered data table: student count, colleges represented, year distribution, primary interests. Every figure sourced.
3. **What we run.** Four upcoming or recurring properties with dates, expected scale, and format. Bordered rows, not cards.
4. **Tiers.** A comparison table. Columns are tiers, rows are deliverables, cells are specifics. Prices shown if the team is comfortable, otherwise "on request" with the inquiry CTA. Never a pricing card grid.
5. **Past partners.** The sponsor wall component, reused.
6. **What partners said.** Up to two quotes. Omit the section entirely if there are none.
7. **Inquiry form.** Company, name, role, email, budget range, what they want (hackathon, speaker slot, hiring, workshop, other), message. Turnstile. Server action. Success state states the response time and gives the direct email as an alternative.
8. **Deck**, repeated, with one line on what is inside it.

**Acceptance:** a sponsor can answer all five questions from `PRODUCT.md` without leaving this page.

---

## /events

Aside: `<n> EDITIONS / <first year> TO <current year>`.

Upcoming events first as full-width bordered rows with a status pill. Then a hairline labeled `ARCHIVE`, then past events as a numbered index sorted newest first.

Filters for format and year as mono pill toggles, not a dropdown. Client-side over static data, updates the URL query, works with the back button, no loading state.

**Empty state:** when nothing is upcoming, a bordered cell states when the next announcement is expected and links to Instagram or the mailing list. An event either carries a real date or it is not published yet. "Coming soon" is not a date.

---

## /events/[slug]

1. Masthead: title, edition, status pill, date, venue, theme, and the registration CTA if upcoming. If past, the CTA becomes the report link when one exists.
2. Cover photograph, full-bleed, plate caption.
3. Two columns: description at text measure on the left, a bordered fact panel on the right with format, dates, venue, attendance, prize pool, registration deadline.
4. Agenda if present, numbered index with mono times.
5. Speakers if present. Photo, name, role, company. No bios here.
6. Sponsors of that edition, wall component reused.
7. Gallery if present, treated like the proof wall.
8. Outcomes if present, up to five bordered rows.

Metadata: title, description from `summary`, OG image from the cover.

---

## /projects

Bordered grid of student-built projects and ventures. Each cell: name in display type or logo, tagline, stage pill, year, stack tags in mono. Search and filter by stage and stack, client-side.

Cells link to `/projects/[slug]` when a detail page exists, otherwise out to the repo or live URL with an external glyph.

Honesty rule: `inactive` projects stay listed with the stage pill visible. A record that hides what died reads as a record that is inflated.

**/projects/[slug]:** masthead, description, builders, stack, metrics table, links out.

---

## /wall-of-fame

Achievements as a numbered index rather than a card gallery. Each row: year in mono, title at `--text-h3`, team, organizer, prize. Expanding a row reveals members, description, and the image.

Filters: category (hackathon, entrepreneurship, innovation, award, event) and year, as mono pill toggles.

Prize renders only when a prize exists. An empty value is never printed to a user.

---

## /team

Current year first, grouped by department: leadership, then functional teams. Each person is a bordered cell with photograph or initials block, name, role, and social links as mono labels rather than icons. Badges render where set.

Below the current team, a hairline labeled `PAST TEAMS` and a year selector. Past years render as a compact name-and-role list with no photographs, which keeps the archive without keeping the payload.

---

## /mentors

Faculty advisors and industry mentors. Each: photo, name, role, organization, expertise as mono tags, what they are available for, and a contact route. Every link and email is verified before publishing, and contact icons match the channel they open.

Closing block: what E-Cell wants from a mentor and how to start the conversation. A specific ask, not "Want to become a mentor?".

---

## /programs

The full version of landing section 04. Each program is a full-width block alternating Paper and Ink: index number, name at `--text-h2`, description at text measure, cadence and audience in a mono aside, one photograph. No cards.

---

## /about

1. Masthead.
2. A single statement on Signal ground, roughly 70 percent empty.
3. What we do, prose at text measure, 300 words maximum.
4. Structure: an org diagram drawn with the illustration motif showing departments and their remits.
5. Timeline: numbered index of milestones by year, Ledger-style rows.
6. Faculty and institutional backing, with names and designations.
7. Contact strip.

---

## /join

1. Masthead with an application status pill: `OPEN`, `CLOSING SOON`, or `CLOSED`, driven by a date in content.
2. What membership gives, four bordered rows, written honestly.
3. Open roles as an index table: role, department, weekly commitment, what you will actually do.
4. Process as a numbered sequence with expected timelines.
5. Application form or a link to the external form, with the deadline in mono.
6. When closed: state the next cycle's expected month and offer a reminder signup.

---

## /contact

Split layout. Left is a bordered contact table: email, phone, Instagram, LinkedIn, physical address, each with its own stated response time. Right is a map or a photograph of the campus entrance. Below, a short general inquiry form.

One spelling of the contact inbox across the whole site, verified before launch.

---

## /blog

Index as a bordered table: date in mono, title at `--text-h3`, author, reading time. Hover inverts the row. No excerpt cards, no thumbnails in the index.

**/blog/[slug]:** MDX, single column at text measure, mono metadata header, optional full-bleed cover. Code blocks in the mono face on Ink ground.

---

## /not-found and error

Ink ground. Illustration motif at large scale. One short line in E-Cell's voice, not a joke that will age badly. Three links: home, events, contact. Nothing else.