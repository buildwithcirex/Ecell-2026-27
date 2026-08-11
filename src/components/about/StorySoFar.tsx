import { Fragment, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

import { WetPaintButton } from '@/components/ui/wet-paint-button'
import { cn } from '@/lib/utils'
import stat10 from '@/assets/hero/stat-10.webp'
import stat100 from '@/assets/hero/stat-100.webp'
import stat20 from '@/assets/hero/stat-20.webp'
import stat500 from '@/assets/hero/stat-500.webp'
import {
  PencilAtom,
  PencilBulb,
  PencilChart,
  PencilChip,
  PencilDefs,
  PencilFlask,
  PencilGear,
  PencilCoin,
  PencilMagnifier,
  PencilNeuralNet,
  PencilPaperPlane,
  PencilPlug,
  PencilRocket,
  PencilScribbleArrow,
  PencilStickyNote,
  PencilStopwatch,
  PencilTrophy,
  PinImpact,
  PushPin,
} from './pencil-art'

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: 500, label: 'Active Members', art: stat500, w: 340, h: 291 },
  { value: 100, label: 'Events and Workshops', art: stat100, w: 340, h: 95 },
  { value: 20, label: 'Industry Partners', art: stat20, w: 340, h: 332 },
  { value: 10, label: 'Student-led Initiatives', art: stat10, w: 340, h: 73 },
] as const

/**
 * The lead paragraph, split so one phrase can carry the drawn underline.
 * `mark` never wraps, so the underline always sits under the whole phrase.
 */
const LEAD = [
  { text: "We've been around for years, but we're always building" },
  { text: "what's next.", mark: true },
  {
    text: 'From new tech and entrepreneurship to hackathons and hands-on workshops, E-Cell is where curious minds come to learn, build, connect and try things out.',
  },
] as const

const COLUMNS = [
  'From AI/ML and Agentic Engineering to Game Dev, SIH and entrepreneurship, we’ve hosted workshops, sessions and events that go beyond the classroom. Basically, if it helps you learn, build or explore something new — we’re probably into it.',
  'E-Cell is about the people behind the ideas. We bring together students who want to experiment, collaborate, compete, create and occasionally turn a random “what if?” into something real.',
] as const

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

/**
 * True once the element has reached the viewport, and true forever after.
 *
 * The observer disconnects on the first hit: the reveal is a one-off, and
 * leaving it attached would keep firing for the life of the page.
 *
 * If `IntersectionObserver` is missing, this reports visible immediately rather
 * than leaving the section stuck at opacity 0.
 */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  // Seeded from the capability check rather than corrected inside the effect:
  // without an observer there is nothing to wait for, and setting state
  // synchronously in an effect just triggers a second render.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

/** Read once at mount. Cheap, and the setting does not change mid-visit. */
function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Counts up to `target` once `active` turns true.
 *
 * Under reduced motion the state starts at the final figure and never moves, so
 * the number is correct from the first paint rather than being corrected after.
 */
function useCountUp(target: number, active: boolean) {
  const [reduced] = useState(prefersReducedMotion)
  const [value, setValue] = useState(() => (reduced ? target : 0))

  useEffect(() => {
    // `value` is already seeded to `target` under reduced motion, so there is
    // nothing to correct here.
    if (!active || reduced) return

    let frame = 0
    const start = performance.now()
    const duration = 1400

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      // Ease-out cubic: fast off the mark, settles onto the final figure.
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, reduced])

  return value
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

/**
 * Graphite marks scattered behind the copy.
 *
 * Inert and hidden from assistive tech. Positioned in percentages so they track
 * the section rather than jumping at each breakpoint, and each one is placed in
 * a margin the copy does not reach. The smallest screens keep four of them; the
 * rest wait for room.
 */
function PaperBackdrop() {
  const marks = [
    // Spread across the sheet rather than lined up down the margins. `dim`
    // marks sit under the copy, so they run lighter and read as part of the
    // paper rather than competing with the words on top of them.
    { C: PencilBulb, cls: 'top-[4%] left-[6%] w-[13vw] max-w-24', rot: -8, d: 120 },
    { C: PencilChart, cls: 'top-[6%] right-[5%] w-[15vw] max-w-28', rot: 6, d: 180 },
    { C: PencilAtom, cls: 'top-[13%] left-[26%] hidden w-[9vw] max-w-20 lg:block', rot: 12, d: 220, dim: true },
    { C: PencilRocket, cls: 'top-[11%] right-[27%] hidden w-[7vw] max-w-16 lg:block', rot: -10, d: 260, dim: true },
    { C: PencilPaperPlane, cls: 'top-[25%] left-[45%] hidden w-[8vw] max-w-20 md:block', rot: -16, d: 300, dim: true },
    { C: PencilChip, cls: 'top-[34%] left-[2%] w-[11vw] max-w-24', rot: 10, d: 340 },
    { C: PencilNeuralNet, cls: 'top-[32%] right-[2%] hidden w-[13vw] max-w-32 md:block', rot: -7, d: 380 },
    { C: PencilStopwatch, cls: 'top-[41%] left-[31%] hidden w-[6vw] max-w-14 lg:block', rot: -6, d: 420, dim: true },
    { C: PencilCoin, cls: 'top-[43%] right-[30%] hidden w-[7vw] max-w-16 lg:block', rot: 14, d: 460, dim: true },
    { C: PencilMagnifier, cls: 'top-[52%] left-[13%] hidden w-[8vw] max-w-20 md:block', rot: 9, d: 500 },
    { C: PencilTrophy, cls: 'top-[54%] right-[12%] hidden w-[8vw] max-w-20 md:block', rot: 7, d: 540 },
    { C: PencilFlask, cls: 'top-[63%] left-[41%] hidden w-[8vw] max-w-20 lg:block', rot: -9, d: 580, dim: true },
    { C: PencilStickyNote, cls: 'top-[74%] left-[3%] w-[9vw] max-w-20', rot: -11, d: 620 },
    { C: PencilPlug, cls: 'top-[76%] right-[3%] hidden w-[7vw] max-w-16 md:block', rot: 8, d: 660 },
    { C: PencilAtom, cls: 'bottom-[13%] left-[36%] hidden w-[7vw] max-w-16 lg:block', rot: -14, d: 700, dim: true },
    { C: PencilGear, cls: 'bottom-[4%] left-[7%] w-[11vw] max-w-20', rot: 14, d: 740 },
    { C: PencilScribbleArrow, cls: 'bottom-[5%] right-[9%] w-[12vw] max-w-24', rot: -4, d: 780 },
    { C: PencilChart, cls: 'bottom-[8%] left-[47%] hidden w-[8vw] max-w-20 lg:block', rot: 9, d: 820, dim: true },
  ]

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 text-graphite/35"
    >
      {marks.map(({ C, cls, rot, d, dim }, i) => (
        <div
          key={i}
          className={cn('paper-pop absolute', dim && 'opacity-45', cls)}
          style={
            { '--pop-rot': `${rot}deg`, '--pop-delay': `${d}ms` } as CSSProperties
          }
        >
          <C className="w-full" />
        </div>
      ))}
    </div>
  )
}

/** Heading with the pin driven into it. */
function PinnedTitle() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        <span
          aria-hidden="true"
          className="pin-impact absolute -top-12 left-1/2 block w-16 -translate-x-1/2 text-signal sm:-top-16 sm:w-20 lg:-top-20 lg:w-24"
        >
          <PinImpact className="w-full" />
        </span>
        <span
          aria-hidden="true"
          className="pin-drop absolute -top-11 left-1/2 block w-11 -translate-x-1/2 sm:-top-14 sm:w-14 lg:-top-16 lg:w-16"
        >
          <PushPin className="w-full" />
        </span>
      </div>

      <h2 className="pin-title mt-4 text-center font-display text-[clamp(2.15rem,7.5vw,5.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-ink">
        The Story So Far<span className="text-signal">...</span>
      </h2>
    </div>
  )
}

function Stat({
  value,
  label,
  art,
  artWidth,
  artHeight,
  index,
  active,
}: {
  value: number
  label: string
  art: string
  artWidth: number
  artHeight: number
  index: number
  active: boolean
}) {
  const shown = useCountUp(value, active)

  return (
    <div
      className={cn(
        'stat-cell paper-rise flex flex-col items-center px-3 py-7 text-center sm:px-5',
        // Two up on narrow screens.
        index % 2 === 1 && 'border-l border-paper-rule',
        index >= 2 && 'border-t border-paper-rule',
        // Four across from lg: every cell but the first takes a left rule, and
        // the row rule disappears.
        'lg:border-t-0',
        index > 0 && 'lg:border-l',
      )}
      style={{ '--rise-i': index } as CSSProperties}
    >
      <div className="mb-3 flex h-14 w-full max-w-[8.5rem] items-center justify-center sm:h-16">
        <img
          src={art}
          alt=""
          width={artWidth}
          height={artHeight}
          loading="lazy"
          decoding="async"
          className="stat-icon max-h-full w-auto max-w-full object-contain"
        />
      </div>

      <p className="font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-none font-extrabold tracking-tight text-ink tabular-nums">
        {shown}
        <span className="text-signal">+</span>
      </p>

      <p className="mt-2.5 max-w-[16ch] font-body text-xs leading-snug text-graphite/70 sm:text-sm">
        {label}
      </p>
    </div>
  )
}

/**
 * Splits a string into inline-block words carrying their stagger index.
 *
 * The separating space is a text node between the spans, never inside them. A
 * space inside an `inline-block` collapses, and the whole paragraph then renders
 * as one unbreakable token that overflows its container.
 */
function Words({ text, from }: { text: string; from: number }) {
  const words = text.trim().split(/\s+/)
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span style={{ '--i': from + i } as CSSProperties}>{word}</span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  )
}

/** Stagger offsets, resolved once because the copy never changes. */
const LEAD_SEGMENTS = LEAD.map((segment, index) => ({
  segment,
  index,
  from: LEAD.slice(0, index).reduce(
    (total, prev) => total + prev.text.trim().split(/\s+/).length,
    0,
  ),
}))

function Lead() {
  return (
    <p className="word-rise mx-auto max-w-[46ch] text-center font-display text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.28] font-semibold tracking-[-0.02em] text-ink sm:max-w-[40ch]">
      {LEAD_SEGMENTS.map(({ segment, index, from }) => {
        const leadingSpace = index > 0

        if (!('mark' in segment)) {
          return (
            <span key={index}>
              {leadingSpace ? ' ' : null}
              <Words text={segment.text} from={from} />
            </span>
          )
        }

        return (
          <span key={index}>
            {' '}
            <span className="relative inline-block whitespace-nowrap">
              <Words text={segment.text} from={from} />
              {/* pathLength normalises the dash maths, so the draw works
                  without measuring the real geometry at runtime. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="draw-underline absolute -bottom-1 left-0 h-2 w-full text-signal sm:-bottom-1.5 sm:h-2.5"
                style={{ '--len': 1 } as CSSProperties}
              >
                <path
                  d="M3 8C38 3 74 10 108 6s58-3 89 2"
                  pathLength={1}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        )
      })}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

/**
 * "The Story So Far" — the paper section directly below the hero.
 *
 * It carries `bg-paper` so the torn edge at the bottom of the hero reads as the
 * top of this sheet rather than as a band between two grounds.
 *
 * A single `is-visible` class, set once the section reaches the viewport, gates
 * every reveal in here. The alternative, an observer per animated element, would
 * mean two dozen observers for one screen of content.
 */
export function StorySoFar() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className={cn(
        'paper-depth relative isolate -mt-px overflow-hidden bg-paper px-5 pt-20 pb-24 sm:px-8 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-36',
        inView && 'is-visible',
      )}
    >
      <PencilDefs />
      <PaperBackdrop />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center">
        <div id="about-heading">
          <PinnedTitle />
        </div>

        {/* Numbers */}
        <div className="mt-14 grid w-full max-w-4xl grid-cols-2 sm:mt-16 lg:mt-20 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Stat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              art={stat.art}
              artWidth={stat.w}
              artHeight={stat.h}
              index={i}
              active={inView}
            />
          ))}
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-24">
          <Lead />
        </div>

        {/* Two columns of detail, and the slot the group photo drops into. */}
        <div className="mt-14 grid w-full gap-8 sm:mt-16 lg:mt-20 lg:grid-cols-[1fr_1fr_1.3fr] lg:gap-10">
          {COLUMNS.map((copy, i) => (
            <p
              key={i}
              className="paper-rise font-body text-sm leading-relaxed text-graphite/85 sm:text-base"
              style={{ '--rise-i': i + 1 } as CSSProperties}
            >
              {copy}
            </p>
          ))}

          {/*
            Reserved for the graffiti-style core group photo.

            The box holds a fixed 4/3 ratio, so dropping the real image in later
            shifts nothing on the page. Replace the inner placeholder with an
            <img> carrying the same aspect ratio and explicit width/height.
          */}
          <div
            className="paper-rise relative"
            style={{ '--rise-i': 3 } as CSSProperties}
          >
            {/* Two strips of tape, so the empty slot still reads as part of the
                paper board rather than as a missing asset. */}
            <span
              aria-hidden="true"
              className="absolute -top-3 -left-3 z-10 h-7 w-16 -rotate-12 rounded-[2px] bg-graphite/12"
            />
            <span
              aria-hidden="true"
              className="absolute -right-3 -bottom-3 z-10 h-7 w-16 -rotate-12 rounded-[2px] bg-graphite/12"
            />
            <div className="photo-slot flex aspect-[4/3] w-full items-center justify-center rounded-[3px] border-2 border-dashed border-graphite/25 bg-graphite/[0.04]">
              <p className="px-6 text-center font-body text-xs tracking-[0.18em] text-graphite/70 uppercase">
                Core group photo
              </p>
            </div>
          </div>
        </div>

        <div
          className="paper-rise mt-14 sm:mt-16 lg:mt-20"
          style={{ '--rise-i': 4 } as CSSProperties}
        >
          <WetPaintButton href="#work">Know More</WetPaintButton>
        </div>
      </div>
    </section>
  )
}
