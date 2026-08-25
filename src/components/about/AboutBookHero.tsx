import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Sparkles } from 'lucide-react'

import mobilePaper from '@/assets/about-page/mobile-paper.png'
import paper1 from '@/assets/about-page/paper-1-clean.png'
import paper2 from '@/assets/about-page/paper-2-clean.png'
import { HeroBackground } from '@/components/hero/HeroBackground'
import { WetPaintButton } from '@/components/ui/wet-paint-button'
import { cn } from '@/lib/utils'
import {
  PencilAtom,
  PencilBrainAI,
  PencilBulb,
  PencilCodeTerminal,
  PencilDefs,
  PencilGraduationCap,
  PencilNeuralNet,
  PencilPaperPlane,
  PencilRocket,
  PencilSparkles,
  PushPin,
} from './pencil-art'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scissor-cut hand-drawn frame polygons matching Jackie Zhang's quirky aesthetic.
 */
const QuirkyClipPaths = [
  'polygon(1.2% 1.8%, 34% 0.5%, 68% 2.1%, 98.8% 0.2%, 98.2% 34%, 99.8% 67%, 98% 98.5%, 65% 99.5%, 32% 98%, 1.5% 99.8%, 0.2% 66%, 1.8% 33%)',
  'polygon(0.8% 1.2%, 33% 2.6%, 67% 0.8%, 98.5% 1.9%, 99.8% 33%, 98% 66%, 99.2% 98.8%, 66% 97.4%, 34% 99.2%, 1.8% 97.8%, 0.2% 65%, 1.6% 34%)',
  'polygon(2.1% 0.9%, 35% 2.8%, 66% 0.6%, 99.2% 2.1%, 97.6% 36%, 99.5% 68%, 98.2% 99%, 65% 97.6%, 32% 99.4%, 0.8% 97.6%, 2.4% 64%, 0.5% 33%)',
  'polygon(1.5% 2.4%, 32% 0.8%, 69% 2.6%, 98.4% 1.2%, 99.8% 31%, 97.8% 68%, 99.2% 98.2%, 67% 99.6%, 31% 97.8%, 1.2% 99.2%, 0.5% 67%, 2.2% 32%)',
]

/**
 * True once the element has reached the viewport for scroll reveals.
 */
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
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

/**
 * Empty Quirky Photo Frame Component with Scissor Edge, Tape / Pins, and inline comments for images.
 */
function QuirkyImageFrame({
  placeholderText,
  commentTag,
  rotate = 0,
  className,
  clipIndex = 0,
  hasTape = true,
  tapePosition = 'top-left',
}: {
  placeholderText: string
  commentTag: string
  rotate?: number
  className?: string
  clipIndex?: number
  hasTape?: boolean
  tapePosition?: 'top-left' | 'top-right' | 'both'
}) {
  return (
    <div
      data-comment={commentTag}
      className={cn('relative m-0 inline-block bg-paper p-2.5 shadow-xl transition-transform hover:scale-105 overflow-visible', className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: QuirkyClipPaths[clipIndex % QuirkyClipPaths.length],
      }}
    >
      {/* Tape embellishments */}
      {hasTape && (tapePosition === 'top-left' || tapePosition === 'both') && (
        <span
          aria-hidden="true"
          className="absolute -top-3 -left-3 z-20 h-5 w-14 -rotate-12 bg-[#e8e0cc]/85 backdrop-blur-[1px] shadow-sm border-t border-b border-black/10"
        />
      )}
      {hasTape && (tapePosition === 'top-right' || tapePosition === 'both') && (
        <span
          aria-hidden="true"
          className="absolute -top-3 -right-3 z-20 h-5 w-14 rotate-12 bg-[#e8e0cc]/85 backdrop-blur-[1px] shadow-sm border-t border-b border-black/10"
        />
      )}

      {/*
        ========================================================================
        ${commentTag}
        Paste user image tag <img src="..." alt="..." /> inside this container.
        ========================================================================
      */}
      <div className="group relative flex aspect-[4/3] w-full min-w-[110px] items-center justify-center rounded-[2px] border border-dashed border-graphite/30 bg-graphite/[0.04] p-2.5 text-center transition-colors hover:border-signal/50">
        <div className="flex flex-col items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-graphite/40 transition-colors group-hover:text-signal" />
          <p className="font-body text-[9px] leading-tight tracking-[0.14em] text-graphite/60 uppercase group-hover:text-ink">
            {placeholderText}
          </p>
          <span className="font-mono text-[8px] text-graphite/40">
            [Drop Image]
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * About Us Page Landing Section featuring Jackie Zhang inspired 3D physics book for desktop/tablet,
 * and a dedicated mobile-paper layout for mobile devices with smooth scroll reveals.
 */
export function AboutBookHero() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>()
  const bookRef = useRef<HTMLDivElement>(null)
  const topCoverRef = useRef<HTMLDivElement>(null)
  const bottomSpreadWrapperRef = useRef<HTMLDivElement>(null)
  const bottomPageRef = useRef<HTMLDivElement>(null)
  const contentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only execute 3D book scroll triggers on desktop/tablet (>= 768px)
      if (window.matchMedia('(max-width: 767px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const book = bookRef.current
      const bottomPage = bottomPageRef.current
      const container = sectionRef.current
      if (!book || !container || !bottomPage) return

      // Initial 3D posture for bottom page sheet (no layout reflow height animation)
      gsap.set(bottomPage, {
        rotateX: -30,
        translateY: -20,
        opacity: 0.4,
        transformOrigin: 'top center',
        willChange: 'transform, opacity',
      })

      // GPU-accelerated 60 FPS ScrollTrigger timeline with light scrub distance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'top 35%',
          scrub: 0.4,
        },
      })

      // 1. Book rotates smoothly from initial 3D pitch to flat open view
      tl.to(
        book,
        {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        0,
      )

      // 2. Unfold lower page spread instantly and smoothly in 3D
      tl.to(
        bottomPage,
        {
          rotateX: 0,
          translateY: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.1,
      )

      // 3. Staggered pop-in for cutouts & frames inside the book
      if (contentsRef.current) {
        const elements = contentsRef.current.querySelectorAll('.book-pop-item')
        tl.fromTo(
          elements,
          { opacity: 0, y: 15, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.06,
            duration: 0.6,
            ease: 'power3.out',
          },
          0.3,
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative w-full bg-hero-deep text-cream font-body pt-4 md:pt-10 pb-16 md:pb-24 overflow-hidden',
        inView && 'is-visible',
      )}
    >
      <PencilDefs />

      {/* Deep Blue Wash Landing Background */}
      <HeroBackground />

      {/* Loose Pencil Doodles in Section Ground */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 text-steel/30">
        <div className="paper-pop absolute top-[4%] left-[2%] w-[10vw] max-w-28" style={{ '--pop-delay': '100ms', '--pop-rot': '-12deg' } as CSSProperties}>
          <PencilBulb className="w-full" />
        </div>
        <div className="paper-pop absolute top-[6%] right-[3%] w-[12vw] max-w-32" style={{ '--pop-delay': '200ms', '--pop-rot': '10deg' } as CSSProperties}>
          <PencilNeuralNet className="w-full" />
        </div>
        <div className="paper-pop absolute top-[40%] left-[2%] w-[11vw] max-w-28" style={{ '--pop-delay': '300ms', '--pop-rot': '6deg' } as CSSProperties}>
          <PencilBrainAI className="w-full" />
        </div>
        <div className="paper-pop absolute top-[45%] right-[2%] w-[13vw] max-w-36" style={{ '--pop-delay': '400ms', '--pop-rot': '-8deg' } as CSSProperties}>
          <PencilCodeTerminal className="w-full" />
        </div>
        <div className="paper-pop absolute bottom-[4%] left-[3%] w-[12vw] max-w-32" style={{ '--pop-delay': '500ms', '--pop-rot': '-14deg' } as CSSProperties}>
          <PencilGraduationCap className="w-full" />
        </div>
        <div className="paper-pop absolute bottom-[8%] right-[4%] w-[10vw] max-w-28" style={{ '--pop-delay': '600ms', '--pop-rot': '15deg' } as CSSProperties}>
          <PencilSparkles className="w-full" />
        </div>
      </div>

      {/*
        ========================================================================
        MOBILE DEVICES EXCLUSIVE LAYOUT (< 768px)
        Clean transparent mobile-paper.png container with generous top padding below spiral rings
        ========================================================================
      */}
      <div className="relative z-10 block md:hidden w-full px-4 pt-4 pb-8">
        <div className="relative mx-auto w-full max-w-md pt-36 sm:pt-40 md:pt-44 px-6 pb-8 text-ink rotate-[-1.5deg]">
          {/* Mobile Paper Background Asset (Clean Transparent PNG, spiral rings at TOP) */}
          <img
            src={mobilePaper}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-fill drop-shadow-xl z-0"
          />

          <div className="relative z-10 space-y-6">
            {/* Header Tag - Positioned safely below metal spiral binder rings */}
            <div className="paper-rise flex items-center gap-2 font-display text-xs font-extrabold text-graphite/75" style={{ '--rise-i': 1 } as CSSProperties}>
              <MapPin className="h-3.5 w-3.5 text-signal" />
              <span>Thane • GMT +5:30</span>
            </div>

            {/* Headline */}
            <h1 className="paper-rise font-display text-3xl font-extrabold leading-tight text-ink" style={{ '--rise-i': 2 } as CSSProperties}>
              The Story Begins<span className="text-signal">...</span>
            </h1>

            {/* Paragraph */}
            <p className="paper-rise font-body text-sm leading-relaxed text-graphite/90" style={{ '--rise-i': 3 } as CSSProperties}>
              Software should feel like magic. Building a startup should feel like a bold adventure. 
              Welcome to E-Cell KC—where Thane’s most fearless student coders, creators, and disruptors 
              turn late-night &ldquo;what ifs&rdquo; into real-world ventures.
            </p>

            {/* Wet Paint Button */}
            <div className="paper-rise" style={{ '--rise-i': 4 } as CSSProperties}>
              <WetPaintButton href="#team" className="inline-flex text-xs px-6 py-2.5">
                Meet the Larpers
              </WetPaintButton>
            </div>

            {/* Mobile Photo Frames 1 & 2 */}
            <div className="paper-rise flex flex-wrap items-center justify-center gap-3 pt-2 overflow-visible" style={{ '--rise-i': 5 } as CSSProperties}>
              <QuirkyImageFrame
                placeholderText="E-Cell Workspace"
                commentTag="IMAGE PLACEHOLDER 1: E-Cell Founding Workspace & Team"
                rotate={-3}
                clipIndex={0}
                className="w-full max-w-[130px] sm:max-w-[150px]"
              />

              <QuirkyImageFrame
                placeholderText="Late Night Ideation"
                commentTag="IMAGE PLACEHOLDER 2: Late Night Hackathon Session"
                rotate={3}
                clipIndex={1}
                className="w-full max-w-[130px] sm:max-w-[150px]"
              />
            </div>

            {/* Mission & Vision Section inside Mobile View */}
            <div className="pt-6 space-y-6 border-t border-graphite/20">
              <div className="paper-rise" style={{ '--rise-i': 6 } as CSSProperties}>
                <span className="font-display text-[10px] font-bold tracking-[0.2em] text-signal uppercase">
                  Core Philosophy
                </span>
                <h2 className="font-display text-xl font-extrabold text-ink">
                  Mission & Vision
                </h2>
              </div>

              {/* Mission Card on paper-1 */}
              <div className="paper-rise relative p-6 sm:p-7 rounded-lg overflow-hidden min-h-[340px] flex flex-col justify-between" style={{ '--rise-i': 7 } as CSSProperties}>
                <img src={paper1} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-fill drop-shadow-md z-0" />
                <div className="relative z-10 space-y-3">
                  <h3 className="font-display text-lg font-extrabold text-ink">OUR MISSION</h3>
                  <p className="font-body text-xs leading-relaxed text-ink font-semibold">
                    To ignite the entrepreneurial flame in every student—demystifying build culture, 
                    providing the stack, mentorship, and ecosystem to ship bold ideas without asking for permission.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2 overflow-visible">
                    <QuirkyImageFrame placeholderText="Mission Action" commentTag="IMAGE PLACEHOLDER 3" rotate={-2} clipIndex={2} className="w-full max-w-[125px]" hasTape={false} />
                    <QuirkyImageFrame placeholderText="Mentorship" commentTag="IMAGE PLACEHOLDER 4" rotate={2} clipIndex={3} className="w-full max-w-[125px]" hasTape={false} />
                  </div>
                </div>
              </div>

              {/* Vision Card on paper-2 */}
              <div className="paper-rise relative p-6 sm:p-7 rounded-lg overflow-hidden min-h-[340px] flex flex-col justify-between" style={{ '--rise-i': 8 } as CSSProperties}>
                <img src={paper2} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-fill drop-shadow-md z-0" />
                <div className="relative z-10 space-y-3">
                  <h3 className="font-display text-lg font-extrabold text-ink">OUR VISION</h3>
                  <p className="font-body text-xs leading-relaxed text-ink font-semibold">
                    To build Thane&apos;s premier student innovation hub—where college labs transform into venture launchpads, 
                    and the next generation of AI &amp; tech pioneers are forged.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2 overflow-visible">
                    <QuirkyImageFrame placeholderText="Vision Pitch" commentTag="IMAGE PLACEHOLDER 5" rotate={3} clipIndex={0} className="w-full max-w-[125px]" hasTape={false} />
                    <QuirkyImageFrame placeholderText="Prototype Demo" commentTag="IMAGE PLACEHOLDER 6" rotate={-2} clipIndex={1} className="w-full max-w-[125px]" hasTape={false} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
        ========================================================================
        DESKTOP / TABLET EXCLUSIVE 3D BOOK (>= 768px)
        ========================================================================
      */}
      <div className="relative z-10 hidden md:flex w-full items-start justify-center px-3 md:px-6 pt-2 md:pt-6">
        {/* 
          GRAND REALISTIC REDDISH LEATHER COVER CASING
        */}
        <div
          ref={bookRef}
          className="relative mx-auto w-[94vw] max-w-[1240px] rounded-[2.5rem] md:rounded-[3.5rem] p-4 md:p-8 lg:p-10 transition-transform duration-300 ease-out will-change-transform"
          style={{
            backgroundColor: '#ba3726',
            backgroundImage: `
              radial-gradient(ellipse 100% 100% at 50% 50%, rgba(225, 70, 50, 0.45) 0%, rgba(130, 22, 14, 0.95) 100%),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23000000' fill-opacity='0.09'%3E%3Cpath d='M0 0h40v40H0zM40 40h40v40H0z'/%3E%3Cpath d='M0 40h40v40H0zM40 0h40v40H40z' fill-opacity='0.05'/%3E%3C/g%3E%3C/svg%3E"),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.14'/%3E%3C/svg%3E")
            `,
            boxShadow: `
              0 45px 100px rgba(0, 0, 0, 0.85),
              inset 0 0 0 2px rgba(255, 255, 255, 0.25),
              inset 0 0 50px rgba(0, 0, 0, 0.6)
            `,
            perspective: '1600px',
            transform: 'rotateX(14deg) rotateY(-2deg) scale(0.96)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Cover Outer Highlight & Stitch Rim */}
          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/25 shadow-[inset_0_2px_8px_rgba(255,255,255,0.35)]" />

          {/* INSIDE PAGES WRAPPER */}
          <div ref={contentsRef} className="relative flex flex-col gap-3 md:gap-4">
            {/*
              ------------------------------------------------------------------
              PAGE SHEET 1: LANDING TOP SPREAD ("The Story Begins...")
              Equal Symmetrical Height (min-h-[500px] md:min-h-[580px] lg:min-h-[620px])
              ------------------------------------------------------------------
            */}
            <div className="relative w-full">
              {/* Stacked Underneath Paper Layers on TOP EDGE */}
              <div aria-hidden="true" className="absolute inset-x-3 -top-3 h-full rounded-[2rem] bg-[#d6c7ae] shadow-sm border border-black/10" />
              <div aria-hidden="true" className="absolute inset-x-1.5 -top-1.5 h-full rounded-[2rem] bg-[#e8dbbf] shadow-sm border border-black/10" />

              {/* Main Top Page Sheet */}
              <div
                ref={topCoverRef}
                className="relative overflow-hidden rounded-[2rem] bg-paper text-ink p-6 md:p-10 lg:p-14 border border-black/12 min-h-[500px] md:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between"
                style={{
                  backgroundImage: `
                    radial-gradient(circle, rgba(51, 55, 60, 0.08) 1px, transparent 1px),
                    linear-gradient(to right, transparent, rgba(51, 55, 60, 0.03) 50%, transparent 100%)
                  `,
                  backgroundSize: '24px 24px, 100% 100%',
                  boxShadow: `
                    0 16px 35px rgba(0, 0, 0, 0.35),
                    inset 0 0 90px rgba(120, 104, 74, 0.06)
                  `,
                }}
              >
                {/* Paper Texture Overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Main Headline & Subtitle */}
                <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center my-auto">
                  <div className="space-y-4 md:space-y-5">
                    <div className="paper-rise flex items-center gap-2 font-display text-xs md:text-sm font-extrabold text-graphite/70" style={{ '--rise-i': 1 } as CSSProperties}>
                      <MapPin className="h-4 w-4 text-signal" />
                      <span>Thane • GMT +5:30</span>
                    </div>

                    <h1 className="paper-rise font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-extrabold leading-[1.01] tracking-tight text-ink" style={{ '--rise-i': 2 } as CSSProperties}>
                      The Story Begins<span className="text-signal">...</span>
                    </h1>

                    <p className="paper-rise max-w-[46ch] font-body text-base md:text-xl leading-relaxed text-graphite/85" style={{ '--rise-i': 3 } as CSSProperties}>
                      Software should feel like magic. Building a startup should feel like a bold adventure. 
                      Welcome to E-Cell KC—where Thane’s most fearless student coders, creators, and disruptors 
                      turn late-night &ldquo;what ifs&rdquo; into real-world ventures.
                    </p>

                    {/* Wet Paint Button: MEET THE LARPERS */}
                    <div className="pt-3 book-pop-item paper-rise" style={{ '--rise-i': 4 } as CSSProperties}>
                      <WetPaintButton href="#team" className="inline-flex">
                        Meet the Larpers
                      </WetPaintButton>
                    </div>
                  </div>

                  {/* Photo Frame Scatter on Top Page */}
                  <div className="relative flex min-h-[220px] items-center justify-center lg:justify-end gap-3 md:gap-4 flex-wrap">
                    <div className="paper-pop absolute -top-8 left-2 w-16 md:w-20 text-graphite/30" style={{ '--pop-delay': '150ms', '--pop-rot': '-12deg' } as CSSProperties}>
                      <PencilRocket className="w-full" />
                    </div>

                    {/* IMAGE PLACEHOLDER 1 */}
                    <QuirkyImageFrame
                      placeholderText="E-Cell Workspace"
                      commentTag="IMAGE PLACEHOLDER 1: E-Cell Founding Workspace & Team"
                      rotate={-4}
                      clipIndex={0}
                      className="w-full max-w-[200px] md:max-w-[220px] book-pop-item paper-rise"
                    />

                    {/* IMAGE PLACEHOLDER 2 */}
                    <QuirkyImageFrame
                      placeholderText="Late Night Ideation"
                      commentTag="IMAGE PLACEHOLDER 2: Late Night Hackathon Session"
                      rotate={5}
                      clipIndex={1}
                      className="w-full max-w-[180px] md:max-w-[200px] book-pop-item paper-rise"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/*
              ------------------------------------------------------------------
              PAGE SHEET 2: MISSION & VISION UNFOLDED SPREAD
              Equal Symmetrical Height (min-h-[500px] md:min-h-[580px] lg:min-h-[620px])
              ------------------------------------------------------------------
            */}
            <div ref={bottomSpreadWrapperRef} className="relative w-full">
              {/* Main Bottom Page Sheet */}
              <div
                ref={bottomPageRef}
                id="mission-vision"
                className="relative overflow-hidden rounded-[2rem] bg-paper text-ink p-6 md:p-10 lg:p-14 border border-black/12 min-h-[500px] md:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between"
                style={{
                  backgroundImage: `
                    radial-gradient(circle, rgba(51, 55, 60, 0.08) 1px, transparent 1px),
                    linear-gradient(to right, transparent, rgba(51, 55, 60, 0.03) 50%, transparent 100%)
                  `,
                  backgroundSize: '24px 24px, 100% 100%',
                  boxShadow: `
                    0 26px 55px -4px rgba(0, 0, 0, 0.65),
                    0 8px 22px rgba(0, 0, 0, 0.3),
                    inset 0 0 90px rgba(120, 104, 74, 0.06)
                  `,
                }}
              >
                {/* Paper Texture Overlay */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Section Header Tag */}
                <div className="mb-4 md:mb-6 flex items-center justify-between">
                  <div>
                    <span className="font-display text-xs font-bold tracking-[0.2em] text-signal uppercase">
                      Core Philosophy
                    </span>
                    <h2 className="font-display text-2xl md:text-4xl font-extrabold text-ink">
                      Mission & Vision
                    </h2>
                  </div>
                  <PencilAtom className="h-9 w-9 md:h-10 md:w-10 text-graphite/30" />
                </div>

                {/* Jackie Zhang Style Cutout Cards Grid for Mission & Vision with Clean Transparent Paper-1 and Paper-2 */}
                <div className="grid gap-6 md:grid-cols-2 lg:gap-8 my-auto">
                  {/* 
                    PAPER CUTOUT 1: OUR MISSION
                    Using clean transparent paper-1-clean.png as physical paper card
                  */}
                  <div className="book-pop-item paper-rise relative flex flex-col justify-between p-6 md:p-9 lg:p-10 min-h-[400px] md:min-h-[440px] lg:min-h-[480px] transition-transform hover:-translate-y-1">
                    {/* Background Paper Asset: paper-1-clean.png */}
                    <img
                      src={paper1}
                      alt=""
                      className="pointer-events-none absolute inset-0 h-full w-full object-fill drop-shadow-xl z-0"
                    />

                    {/* Content Overlaid 100% inside paper-1 margins */}
                    <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                      <div>
                        {/* Tape top */}
                        <span
                          aria-hidden="true"
                          className="absolute -top-3 left-4 h-5 w-20 rotate-[-4deg] bg-[#e8e0cc]/90 backdrop-blur-[1px] shadow-sm border-t border-b border-black/10 z-20"
                        />
                        <div className="mb-3 flex items-center justify-between border-b border-graphite/20 pb-2">
                          <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-ink">
                            OUR MISSION
                          </h3>
                          <PencilPaperPlane className="h-6 w-6 text-signal" />
                        </div>
                        <p className="font-body text-xs md:text-sm lg:text-base leading-relaxed text-ink font-semibold max-w-[34ch]">
                          To ignite the entrepreneurial flame in every student—demystifying build culture, 
                          providing the stack, mentorship, and ecosystem to ship bold ideas without asking for permission.
                        </p>
                      </div>

                      {/* 
                        IMAGE PLACEHOLDER 3 & 4: Mission Photo Frames
                      */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 overflow-visible">
                        <QuirkyImageFrame
                          placeholderText="Mission Action"
                          commentTag="IMAGE PLACEHOLDER 3: Mission Action Shot / Hackathon Crowd"
                          rotate={-3}
                          clipIndex={2}
                          className="w-full max-w-[130px] md:max-w-[150px]"
                          hasTape={false}
                        />

                        <QuirkyImageFrame
                          placeholderText="Mentorship"
                          commentTag="IMAGE PLACEHOLDER 4: Community Mentorship Session"
                          rotate={3}
                          clipIndex={3}
                          className="w-full max-w-[120px] md:max-w-[140px]"
                          hasTape={false}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 
                    PAPER CUTOUT 2: OUR VISION
                    Using clean transparent paper-2-clean.png as physical paper card
                  */}
                  <div className="book-pop-item paper-rise relative flex flex-col justify-between p-6 md:p-9 lg:p-10 min-h-[400px] md:min-h-[440px] lg:min-h-[480px] transition-transform hover:-translate-y-1">
                    {/* Background Paper Asset: paper-2-clean.png */}
                    <img
                      src={paper2}
                      alt=""
                      className="pointer-events-none absolute inset-0 h-full w-full object-fill drop-shadow-xl z-0"
                    />

                    {/* Content Overlaid 100% inside paper-2 margins */}
                    <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                      <div>
                        {/* Push Pin */}
                        <div className="absolute -top-4 right-4 z-20">
                          <PushPin className="h-8 w-8 text-signal" />
                        </div>

                        <div className="mb-3 flex items-center justify-between border-b border-graphite/20 pb-2">
                          <h3 className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-ink">
                            OUR VISION
                          </h3>
                          <PencilBrainAI className="h-6 w-6 text-signal" />
                        </div>
                        <p className="font-body text-xs md:text-sm lg:text-base leading-relaxed text-ink font-semibold max-w-[34ch]">
                          To build Thane&apos;s premier student innovation hub—where college labs transform into venture launchpads, 
                          and the next generation of AI &amp; tech pioneers are forged.
                        </p>
                      </div>

                      {/* 
                        IMAGE PLACEHOLDER 5 & 6: Vision Photo Frames
                      */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 overflow-visible">
                        <QuirkyImageFrame
                          placeholderText="Vision Pitch"
                          commentTag="IMAGE PLACEHOLDER 5: Vision Pitch Presentation Stage"
                          rotate={4}
                          clipIndex={0}
                          className="w-full max-w-[130px] md:max-w-[150px]"
                          hasTape={false}
                        />

                        <QuirkyImageFrame
                          placeholderText="Prototype Demo"
                          commentTag="IMAGE PLACEHOLDER 6: Prototype Demo & Testing"
                          rotate={-2}
                          clipIndex={1}
                          className="w-full max-w-[120px] md:max-w-[140px]"
                          hasTape={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
