# PRODUCT.md

Who this site is for, what it must achieve, what content it holds, and how it speaks.

## Register

Brand and institutional site for E-Cell KCCEMSR, the Entrepreneurship Cell of K.C. College of Engineering Management Studies and Research, Thane.

## Positioning

E-Cell builds founders inside a Mumbai engineering college. The site is the public record of that work.

It is not a brochure and not a club page. It is a credibility instrument. A sponsor lands on it and decides within two minutes whether we are worth a conversation.

## Audiences, ranked

Ranking matters. When two audiences want different things from the same section, the higher one wins.

**1. Sponsors and company partners.** They want proof, not enthusiasm. Their questions, in order: how many students do you reach and who are they, what have you run before and did it work, who else has backed you, what exactly do I get, who do I contact and how fast do they reply.

**2. Students at K.C. and nearby colleges.** What is happening next, how to get in, what membership actually gives them.

**3. College administration, faculty, and accreditation reviewers.** The institutional record. Structure, faculty involvement, outcomes, reports citable in NAAC and NBA documentation.

**4. Mentors, speakers, and founders.** What kind of room they would be walking into and who spoke before them.

**5. Press, alumni, and other E-Cells.** Assets, contact, and the archive.

## Brand personality

Problem-solving, ambitious, credible. Energetic and capable without becoming noisy or gimmicky.

## Design principles

1. Lead with proof of action. Events, projects, achievements, mentors, and people are the evidence.
2. Make ambition feel disciplined. Strong hierarchy and confident motion, not visual chaos.
3. Performance is part of the brand. Lightweight, smooth, and respectful of reduced-motion preferences.
4. Design for every context. Mobile, tablet, and desktop all stay easy to scan and operate.
5. Build credibility through clarity. Navigation, copy, and calls to action are direct.

## Anti-references

Never: laggy effects, clutter, generic startup visuals, neon or glow styling, template-like sections, heavy dark-theme card grids, effects that make navigation feel slow.

## Success metrics

Measured at 30 and 90 days after launch.

| Metric | Target |
|--------|--------|
| Sponsorship deck downloads per month | 25 |
| Sponsor inquiry submissions per month | 8 |
| Median time on `/sponsors` | above 60s |
| Event page to registration click-through | above 35 percent |
| Lighthouse mobile performance | 90+, accessibility 100 |
| Landing page bounce rate | below 55 percent |

## Non-goals

- Not a CMS with roles and workflows. Content is files in the repo.
- Not a login-gated member portal in v1. No admin dashboard.
- Not a payments platform. Registration and payment stay on Devfolio, Luma, or a form.
- Not blog-first. Writing is supported, it is not the spine.
- Not IIT Bombay E-Cell's information density. Match their clarity, not their volume.

## Reference sites and what we take

Design language only. Never copy markup, assets, or sentences.

| Site | Studied for | We take | We refuse |
|------|-------------|---------|-----------|
| Hack Club | Color-blocked layout, plainspoken voice | Full-bleed flat color bands, oversized type as the composition, hand-made artwork layer, peer-level copy | Many accent colors at once, heavy corner rounding |
| ETHGlobal | The event system | Event card contract with fixed field order, status pills, tiered sponsor wall, events-first nav | Dark-only theming, power-user density |
| Hack This Fall | Community warmth in a technical context | Stats band, editions archive, one recurring illustrated motif | Background pattern noise behind text |
| Flowfest | Tempo at the top of the page | Marquee strips as structural dividers, speaker grid with role and company | Motion for its own sake below the fold |
| Under25 | Youth culture and photography | Photography-forward proof sections, editorial crops with captions, faces over graphics | Lifestyle imagery that is not ours |
| FOSS United | Sober information design | Calm typographic baseline, past events as a scannable index, clear split between upcoming and history | The plainness of the hero |
| Devfolio | Product-grade UI quality | Component discipline, logo wall normalization, forms with real states, empty states written as copy | SaaS neutrality, dashboard feel |

## Content required for launch

This is a new site. Nothing is inherited. Every item below is written or produced fresh, and the site does not launch with a placeholder standing in for any of it.

| Content | Owner | Blocking |
|---------|-------|----------|
| Four verified stats with source and date | Core team | Yes, the stats band cannot ship without them |
| The Ledger: one row per past event with attendance, sponsor count, outcome | Core team | Yes, it is the signature section |
| Four to six programs with kicker, cadence, audience | Core team | Yes |
| Every upcoming event with date, venue, format, registration link | Events | Yes |
| Current team roster with roles and departments | Coordination | Yes |
| Sponsorship deck PDF, under 8MB | Sponsorship | Yes, `/sponsors` depends on it |
| Sponsorship tiers with deliverables per tier | Sponsorship | Yes |
| Audience composition: student count, colleges, year spread, interests | Sponsorship | Yes |
| 12 to 20 graded event photographs with alt text and plate captions | Design | Yes, the proof wall depends on it |
| One illustration motif per `DESIGN.md` | Design | Yes |
| Past sponsor logos as normalized SVG | Sponsorship | No, the wall renders an empty state until they exist |
| Projects and ventures with stage, builders, stack | Web | No |
| Achievements with year, organizer, prize | Coordination | No |
| Mentor and faculty profiles with verified links | Coordination | No |
| Blog posts | Anyone | No |

### Rules for entering content

1. **One source of truth per number.** A stat appears in `content/stats.ts` and is read from there by every page. Two pages never state different figures for the same thing.
2. **Verify before you publish.** Every stat records where it came from and when it was checked. A number nobody can trace gets deleted, not rounded up.
3. **Smaller and true beats larger and unverifiable.** A sponsor who checks will find the gap.
4. **Absence is designed, not faked.** No placeholder logos, no typographic stand-ins for brands we do not have, no "coming soon" as a substitute for a date. Empty states are written copy, specified in `PAGES.md`.
5. **Every link and email is verified before launch.** One spelling of the contact inbox across the entire site.

## Copy voice

Direct, specific, slightly understated. We are a student body that runs real events for real companies. We write like we have done the work.

Two registers. To sponsors: factual and confident, numbers first. To students: peer level, short sentences, what actually happens rather than what is possible.

Never: institutional PR voice, motivational-poster voice, startup-landing-page voice.

### Rules

1. No em dashes. Use a period, a comma, or a colon.
2. No rule of three. "Fast, scalable, and secure" is banned as a construction, not just as a phrase.
3. Numbers over adjectives. "480 builders from 14 colleges" beats "a massive turnout".
4. Every claim checkable. If you cannot point at the source, cut the sentence.
5. Sentences under 20 words.
6. Active voice. "We ran 11 events", not "11 events were organised".
7. No exclamation marks.
8. Second person for students, first person plural for us.
9. Say the boring thing plainly. "Applications close 12 March" beats anything clever.
10. Button labels are verbs with objects. "Download the deck", not "Learn more".

### Banned words

`seamless`, `elevate`, `empower`, `unlock`, `unleash`, `leverage`, `robust`, `cutting-edge`, `state of the art`, `game-changing`, `revolutionary`, `passionate`, `innovative`, `dynamic`, `synergy`, `journey`, `dive into`, `delve`, `navigate the landscape`, `in today's fast-paced world`, `at the end of the day`, `next level`, `world-class`, `best-in-class`, `one-stop`, `foster`, `nurture`, `holistic`, `vibrant community`, `like-minded individuals`, `endless possibilities`, `bringing together`, `ecosystem` unless literally about an ecosystem.

Banned structures: negative parallelism ("It's not about the code, it's about the people"), the superficial `-ing` analysis ("showcasing our commitment to innovation"), vague attribution ("many believe"), and any sentence opening "In an era where".

### Rewrites

| Weak | Better |
|------|--------|
| "Empowering the next generation of entrepreneurs and innovators" | "We run four programs. Two of them started companies." |
| "Join our passionate community of like-minded builders" | "100 members. 4 teams shipping right now." |
| "Singularity is our flagship event, bringing together the brightest minds" | "Singularity is an intra-college hackathon. Theme: Interstellar." |
| "Partner with us to unlock brand visibility" | "Partner with us. You get our students, on campus, for two days." |
| "Learn more" | "See the 2025 report" |
| "No results found" | "Nothing scheduled yet. The next announcement is usually in July." |
| "Oops! Page not found" | "That page does not exist. It may have moved in the 2026 rebuild." |

### Per-surface patterns

- **Section eyebrow:** `NN / SECTION NAME`, mono, uppercase. Nothing else.
- **Stat label:** two or three words, sentence case, no verbs. "Students reached", not "We reached students".
- **Event summary, 200 characters:** format, duration, scale, one distinguishing fact.
- **Plate caption:** `PLATE NN / EVENT NAME / YEAR`. Nothing descriptive.
- **Empty state:** state the situation, state when it changes, give one action. Three sentences maximum.
- **Form success:** what happened, what happens next, the timeframe. "Sent. We read this inbox and reply within two working days."
- **Alt text:** describe the frame for someone who cannot see it. "Four students at a whiteboard during Singularity judging", not "Singularity photo".

### Review pass

Search the diff for the banned list. Search for em dashes. Count sentences over 20 words and rewrite them. Find every adjective and ask whether a number replaces it. Read it aloud. If it sounds like a brochure, it is one.