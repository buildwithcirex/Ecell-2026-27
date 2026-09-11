import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/lib/utils'
import {
  type TeamPageData,
  type TeamStrip,
} from '@/content/team-2026'
import { FlowfestCard } from './FlowfestCard'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/* Hooks                                                              */
/* ------------------------------------------------------------------ */

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
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
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

/* ------------------------------------------------------------------ */
/* Strip                                                              */
/* ------------------------------------------------------------------ */

interface StripProps {
  strip: TeamStrip
  index: number
}

/**
 * One labelled section of the page.
 *
 * All cards across all strips share the exact same uniform max-width (280px)
 * matching the Leadership strip.
 *
 * - Technical (10 cards): 4-column grid with cards 9 & 10 centered on row 3.
 * - Events (5 cards): 3 cards centered on row 1, 2 cards centered on row 2.
 * - Faculty (1 card): Centered.
 * - Media (3 cards): Centered.
 * - Leadership (4 cards): 4-column grid.
 */
function Strip({ strip, index }: StripProps) {
  const { ref } = useInView<HTMLElement>()

  const isFaculty = strip.id === 'faculty'
  const isLeadership = strip.id === 'leadership'
  const isTechnical = strip.id === 'technical'
  const isEvents = strip.id === 'events'
  const isMedia = strip.id === 'media'

  return (
    <section
      ref={ref}
      aria-labelledby={`strip-${strip.id}-title`}
      className={cn(
        'relative w-full px-4 py-14 sm:px-6 sm:py-20 lg:px-10',
        index === 0 ? 'pt-8 sm:pt-12' : '',
      )}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Strip header: brutalist section counter + bold header + rule */}
        <div className="mb-12 flex items-end gap-4 sm:mb-14">
          <span className="font-quicksand text-xs font-bold uppercase tracking-[0.2em] text-[#f97028] sm:text-sm">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2
            id={`strip-${strip.id}-title`}
            className="font-display text-2xl font-extrabold tracking-tight text-[#121212] sm:text-3xl lg:text-4xl"
          >
            {strip.title}
          </h2>
          <span
            aria-hidden="true"
            className="mb-2 hidden h-[2px] flex-1 bg-[#121212]/15 sm:block"
          />
        </div>

        {/* 1. Faculty (1 card centered) */}
        {isFaculty && (
          <div className="flex justify-center">
            {strip.members.map((member, i) => (
              <FlowfestCard
                key={member.id}
                member={member}
                index={i}
                stripIndex={index}
                defaultTag={strip.title}
              />
            ))}
          </div>
        )}

        {/* 2. Leadership (4 cards in 4-column grid) */}
        {isLeadership && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {strip.members.map((member, i) => (
              <FlowfestCard
                key={member.id}
                member={member}
                index={i}
                stripIndex={index}
                defaultTag={strip.title}
              />
            ))}
          </div>
        )}

        {/* 3. Technical (10 cards in 4-column grid with last 2 centered) */}
        {isTechnical && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {strip.members.map((member, i) => {
              // Card 9 (index 8) starts at column 2 on desktop to center the last 2 cards
              const centeringClass =
                i === 8
                  ? 'sm:col-start-auto lg:col-start-2'
                  : i === 9
                  ? 'sm:col-start-auto lg:col-start-3'
                  : ''

              return (
                <FlowfestCard
                  key={member.id}
                  member={member}
                  index={i}
                  stripIndex={index}
                  defaultTag={strip.title}
                  className={centeringClass}
                />
              )
            })}
          </div>
        )}

        {/* 4. Events and Operations (5 cards: 3 cards on row 1, 2 cards on row 2, all centered) */}
        {isEvents && (
          <div className="flex flex-col gap-y-14 sm:gap-y-16">
            {/* First 3 cards */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-14 sm:gap-y-16">
              {strip.members.slice(0, 3).map((member, i) => (
                <FlowfestCard
                  key={member.id}
                  member={member}
                  index={i}
                  stripIndex={index}
                  defaultTag={strip.title}
                />
              ))}
            </div>
            {/* Last 2 cards centered */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-14 sm:gap-y-16">
              {strip.members.slice(3).map((member, i) => (
                <FlowfestCard
                  key={member.id}
                  member={member}
                  index={3 + i}
                  stripIndex={index}
                  defaultTag={strip.title}
                />
              ))}
            </div>
          </div>
        )}

        {/* 5. Media and Communications (3 cards centered) */}
        {isMedia && (
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-14 sm:gap-y-16">
            {strip.members.map((member, i) => (
              <FlowfestCard
                key={member.id}
                member={member}
                index={i}
                stripIndex={index}
                defaultTag={strip.title}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

interface TeamPageProps {
  data: TeamPageData
}

/**
 * The team page. Renders every strip from `data` in order.
 *
 * Background matches FlowFest's warm cream ground (#f9f6ef), with crisp
 * typography, no seam line divider, and centered masthead.
 */
export function TeamPage({ data }: TeamPageProps) {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLElement>()

  return (
    <article className="relative w-full overflow-hidden bg-[linear-gradient(to_right,#f9f6ef_0%,#f9f6ef_100%)] text-[#121212] min-h-screen">
      {/* Skip target */}
      <span id="team" tabIndex={-1} className="sr-only" aria-hidden="true" />

      {/* Masthead */}
      <header
        ref={headerRef}
        aria-labelledby="team-heading"
        className={cn(
          'relative w-full px-4 pt-24 pb-8 sm:px-6 sm:pt-28 sm:pb-12 lg:px-10',
          headerInView && 'is-visible',
        )}
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center gap-6">
          <h1
            id="team-heading"
            className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[#121212]"
          >
            Meet the <span className="text-[#f97028]">Larpers</span>
          </h1>

          <p className="max-w-[58ch] font-quicksand text-base font-semibold leading-relaxed text-[#121212]/80 sm:text-lg">
            Faculty advisor, leadership, and the five teams that ship every
            workshop, hackathon and pitch. Real names, real roles, real people
            to blame when the WiFi drops.
          </p>
        </div>
      </header>

      {/* The strips */}
      {data.strips.map((strip, index) => (
        <Strip key={strip.id} strip={strip} index={index} />
      ))}
    </article>
  )
}