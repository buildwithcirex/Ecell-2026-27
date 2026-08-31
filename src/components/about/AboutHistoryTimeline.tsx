import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import paper3 from '@/assets/about-page/paper-3.png'
import pencilImg from '@/assets/about-page/pencil.png'
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
} from './pencil-art'

gsap.registerPlugin(ScrollTrigger)

export interface HistoryMilestone {
  year: string
  description: string
  side: 'left' | 'right'
  tilt: number
}

/**
 * Exact historical milestones matching the reference timeline.
 * Cards randomly tilted between 10-15 degrees.
 */
const MILESTONES: HistoryMilestone[] = [
  {
    year: '2016',
    description:
      'E-Cell was established with the vision of fostering entrepreneurship among students, creating a platform where ideas could be explored, developed and transformed into ventures.',
    side: 'left',
    tilt: -11,
  },
  {
    year: '2017',
    description:
      'E-Cell expanded its entrepreneurial ecosystem through Google Crowdsource, drone workshops and entrepreneurship boot camps, encouraging students to experiment with technology and innovation.',
    side: 'right',
    tilt: 13,
  },
  {
    year: '2018',
    description:
      "E-Cell secured 2nd place at IIT Bombay's National Entrepreneurship Challenge, marking its emergence on the national entrepreneurship stage.",
    side: 'left',
    tilt: -12,
  },
  {
    year: '2019',
    description:
      'The Cell won 1st place at the Innovation Mela while several student ventures and projects emerged through its growing incubation ecosystem.',
    side: 'right',
    tilt: 14,
  },
  {
    year: '2020',
    description:
      "RESPAWN brought hundreds of students together for an inter-college gaming event. As the pandemic changed campus life, E-Cell shifted its activities online and continued building.",
    side: 'left',
    tilt: -10,
  },
  {
    year: '2021-23',
    description:
      'The Cell moved beyond events into real-world projects, international collaborations and technology-driven solutions, while strengthening its incubation and mentorship ecosystem.',
    side: 'right',
    tilt: 13,
  },
  {
    year: '2024',
    description:
      'KCECell collaborated with E-Cell IIT Bombay and reached the grand finale of the National Entrepreneurship Challenge, finishing 44th among 500+ teams.',
    side: 'left',
    tilt: -14,
  },
  {
    year: '2025',
    description:
      "The Cell's teams continued competing at the national level, culminating in Hack4Hygiene winning Smart India Hackathon 2025.",
    side: 'right',
    tilt: 12,
  },
  {
    year: '2026',
    description:
      'Singularity marks the next chapter of KCECell, transforming years of entrepreneurship, innovation and competition into a platform built around hackathons, mentorship and building real solutions.',
    side: 'left',
    tilt: -11,
  },
]

export function AboutHistoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const shadowPathRef = useRef<SVGPathElement>(null)
  const pencilRef = useRef<HTMLDivElement>(null)
  const pencilInnerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const dotsRef = useRef<(SVGGElement | null)[]>([])

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  // Track responsive screen size with debounced ScrollTrigger refresh
  useEffect(() => {
    let resizeTimer: number | null = null
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        const mobile = window.innerWidth < 768
        setIsMobile(mobile)
        ScrollTrigger.refresh()
      }, 50)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimer) window.clearTimeout(resizeTimer)
    }
  }, [])

  // Geometry configuration with exact row synchronization
  const svgWidth = isMobile ? 380 : 1000
  const rowHeight = isMobile ? 380 : 360
  const topPad = isMobile ? 40 : 60
  const svgHeight = MILESTONES.length * rowHeight + topPad

  // Milestone points along the path
  const milestonePoints: { x: number; y: number }[] = []
  let pathD = ''

  if (isMobile) {
    // Mobile straight vertical line down X = 36
    const startX = 36
    const startY = topPad * 0.5

    MILESTONES.forEach((_, i) => {
      milestonePoints.push({
        x: startX,
        y: topPad + i * rowHeight + rowHeight / 2,
      })
    })

    // Path terminates precisely at the last dot (2026)
    const lastTargetY = milestonePoints[milestonePoints.length - 1]?.y ?? (svgHeight - rowHeight / 2)
    pathD = `M ${startX} ${startY} L ${startX} ${lastTargetY}`
  } else {
    // Desktop wavy harmonic Bézier curve weaving through milestones
    const startX = 500
    const startY = topPad * 0.5
    let currentX = startX
    let currentY = startY

    pathD = `M ${startX} ${startY}`

    MILESTONES.forEach((milestone, i) => {
      const targetX = milestone.side === 'left' ? 465 : 535
      const targetY = topPad + i * rowHeight + rowHeight / 2

      milestonePoints.push({ x: targetX, y: targetY })

      const cp1X = currentX
      const cp1Y = currentY + rowHeight * 0.45
      const cp2X = targetX
      const cp2Y = targetY - rowHeight * 0.45

      pathD += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${targetY}`
      currentX = targetX
      currentY = targetY
    })
    // Path terminates precisely at the 2026 dot (currentX, currentY)
  }

  // Setup GSAP scroll-driven path drawing & pencil tracking
  useEffect(() => {
    const container = containerRef.current
    const svg = svgRef.current
    const path = pathRef.current
    const shadowPath = shadowPathRef.current
    const pencil = pencilRef.current
    const pencilInner = pencilInnerRef.current

    if (!container || !svg || !path || !pencil) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const totalLength = path.getTotalLength()

    // Measure exact arc length of each milestone point along the path
    const dotLengths: number[] = milestonePoints.map((pt) => {
      if (isMobile) {
        return Math.max(0, pt.y - topPad * 0.5)
      }
      let bestLen = 0
      let bestDist = Infinity
      const samples = 200
      for (let s = 0; s <= samples; s++) {
        const l = (s / samples) * totalLength
        const p = path.getPointAtLength(l)
        const dist = Math.hypot(p.x - pt.x, p.y - pt.y)
        if (dist < bestDist) {
          bestDist = dist
          bestLen = l
        }
      }
      return bestLen
    })

    // Cache scale metrics to avoid layout reflows in onUpdate
    let scaleX = 1
    let scaleY = 1
    const updateScales = () => {
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        scaleX = rect.width / svgWidth
        scaleY = rect.height / svgHeight
      }
    }
    updateScales()

    // Initialize SVG path stroke dash
    gsap.set([path, shadowPath], {
      strokeDasharray: totalLength,
      strokeDashoffset: prefersReduced ? 0 : totalLength,
    })

    if (prefersReduced) {
      gsap.set(pencil, { opacity: 0 })
      cardsRef.current.forEach((card) => {
        if (card) gsap.set(card, { opacity: 1, y: 0, scale: 1 })
      })
      dotsRef.current.forEach((dot) => {
        if (dot) gsap.set(dot, { opacity: 1, scale: 1 })
      })
      return
    }

    // Initialize cards & dots completely transparent
    cardsRef.current.forEach((card) => {
      if (card) gsap.set(card, { opacity: 0, scale: 0.85 })
    })
    dotsRef.current.forEach((dot) => {
      if (dot) gsap.set(dot, { opacity: 0, scale: 0 })
    })

    // Active wobble animation loop for pencil drawing realism
    let wobbleTween: gsap.core.Tween | null = null
    const startWobble = () => {
      if (wobbleTween) return
      wobbleTween = gsap.to(pencilInner, {
        rotation: '+=3.5',
        y: '+=1.5',
        x: '+=1',
        duration: 0.07,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }

    const stopWobble = () => {
      if (wobbleTween) {
        wobbleTween.kill()
        wobbleTween = null
        gsap.to(pencilInner, {
          rotation: 0,
          y: 0,
          x: 0,
          duration: 0.15,
          ease: 'power2.out',
        })
      }
    }

    // ScrollTrigger instance with 60 FPS performance and zero lag
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top 65%',
        end: 'bottom bottom',
        scrub: 0.35,
        onRefresh: updateScales,
        onUpdate: (self) => {
          const rawProgress = self.progress
          // Normalize progress so 100% completion is reached at 88% scroll depth
          // guaranteeing the pencil reaches and rests right on the 2026 dot before scroll ends
          const progress = Math.min(1, Math.max(0, rawProgress / 0.88))
          const currentLength = progress * totalLength

          // Animate line draw
          const offset = Math.max(0, totalLength - currentLength)
          path.style.strokeDashoffset = `${offset}`
          if (shadowPath) {
            shadowPath.style.strokeDashoffset = `${offset}`
          }

          // Active drawing detection for wobble
          if (progress < 0.99) {
            isScrollingRef.current = true
            startWobble()
            if (scrollTimeoutRef.current) {
              window.clearTimeout(scrollTimeoutRef.current)
            }
            scrollTimeoutRef.current = window.setTimeout(() => {
              isScrollingRef.current = false
              stopWobble()
            }, 100)
          } else {
            stopWobble()
          }

          // Position pencil tip directly at current point on path
          const clampedLen = Math.min(totalLength, currentLength)
          const pt = path.getPointAtLength(clampedLen)
          const ptAhead = path.getPointAtLength(
            Math.min(totalLength, clampedLen + (clampedLen >= totalLength - 2 ? 0 : 3)),
          )

          // Map SVG coordinates to rendered container pixels
          const pixelX = pt.x * scaleX
          const pixelY = pt.y * scaleY

          // Compute tangent angle for natural pencil tilting
          const dx = (ptAhead.x - pt.x) * scaleX
          const dy = (ptAhead.y - pt.y) * scaleY
          const baseAngle =
            dx === 0 && dy === 0 ? 90 : (Math.atan2(dy, dx) * 180) / Math.PI

          // Adjust base angle so pencil points diagonally downward
          const angleOffset = isMobile ? -35 : -32
          const finalAngle = baseAngle + angleOffset

          gsap.set(pencil, {
            x: pixelX,
            y: pixelY,
            rotation: finalAngle,
            opacity: rawProgress > 0.005 ? 1 : 0,
            scale: rawProgress > 0.005 ? 1 : 0.85,
          })

          // Activate dots as the pencil passes them
          dotsRef.current.forEach((dot, idx) => {
            if (!dot) return
            const dotLen = dotLengths[idx] ?? (idx / MILESTONES.length) * totalLength
            if (currentLength >= dotLen - 20) {
              gsap.to(dot, {
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: 'back.out(1.5)',
                overwrite: 'auto',
              })
            } else {
              gsap.to(dot, {
                opacity: 0,
                scale: 0,
                duration: 0.2,
                overwrite: 'auto',
              })
            }
          })

          // Pop milestone cards as pencil reaches them
          cardsRef.current.forEach((card, idx) => {
            if (!card) return
            const dotLen = dotLengths[idx] ?? (idx / MILESTONES.length) * totalLength
            if (currentLength >= dotLen - 50) {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.45,
                ease: 'back.out(1.2)',
                overwrite: 'auto',
              })
            } else {
              gsap.to(card, {
                opacity: 0,
                y: 15,
                scale: 0.85,
                duration: 0.25,
                overwrite: 'auto',
              })
            }
          })
        },
      })

      // Ensure dimensions are settled
      const initialTimer = window.setTimeout(() => {
        updateScales()
        ScrollTrigger.refresh()
      }, 50)

      return () => {
        st.kill()
        window.clearTimeout(initialTimer)
        if (wobbleTween) wobbleTween.kill()
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [isMobile, svgWidth, svgHeight, topPad])

  return (
    <section
      ref={containerRef}
      id="history-timeline"
      className="relative w-full bg-transparent text-cream overflow-hidden pt-0 pb-64 sm:pb-80 select-none"
      aria-label="E-Cell History and Milestones Timeline"
    >
      <PencilDefs />

      {/* 
        Background Pencil Illustrations Scattered Randomly Along Far Margins (Away from Center)
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-steel/25 select-none z-0 overflow-hidden"
      >
        <div className="absolute top-[2%] left-[1%] w-24 md:w-32 opacity-35 -rotate-14">
          <PencilBulb className="w-full" />
        </div>
        <div className="absolute top-[5%] right-[1.5%] w-28 md:w-36 opacity-30 rotate-15">
          <PencilRocket className="w-full" />
        </div>
        <div className="absolute top-[20%] left-[0.8%] w-20 md:w-28 opacity-25 rotate-10">
          <PencilAtom className="w-full" />
        </div>
        <div className="absolute top-[24%] right-[1%] w-24 md:w-32 opacity-30 -rotate-12">
          <PencilNeuralNet className="w-full" />
        </div>
        <div className="absolute top-[42%] left-[1.2%] w-24 md:w-32 opacity-25 -rotate-8">
          <PencilBrainAI className="w-full" />
        </div>
        <div className="absolute top-[48%] right-[1.5%] w-28 md:w-36 opacity-30 rotate-14">
          <PencilCodeTerminal className="w-full" />
        </div>
        <div className="absolute top-[66%] left-[1%] w-24 md:w-30 opacity-30 -rotate-15">
          <PencilPaperPlane className="w-full" />
        </div>
        <div className="absolute top-[70%] right-[1%] w-20 md:w-28 opacity-25 rotate-12">
          <PencilSparkles className="w-full" />
        </div>
        <div className="absolute bottom-[8%] left-[1.5%] w-24 md:w-32 opacity-30 rotate-14">
          <PencilGraduationCap className="w-full" />
        </div>
        <div className="absolute bottom-[4%] right-[2%] w-28 md:w-36 opacity-35 -rotate-10">
          <PencilRocket className="w-full" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* 
          ========================================================================
          INTERACTIVE GRAPHITE CANVAS & TIMELINE SPREAD
          ========================================================================
        */}
        <div
          className="relative w-full mx-auto"
          style={{ height: `${svgHeight}px` }}
        >
          {/* SVG Canvas for Graphite Line & Anchor Dots */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            fill="none"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible z-10"
            preserveAspectRatio="none"
          >
            {/* Filter for realistic graphite texture and tooth */}
            <defs>
              <filter id="graphite-grain" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            {/* Soft Graphite Shadow / Smudge Layer */}
            <path
              ref={shadowPathRef}
              d={pathD}
              stroke="#26292d"
              strokeWidth={isMobile ? 4 : 5.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.4}
              style={{ filter: 'blur(1px)' }}
            />

            {/* Primary Hand-Drawn Graphite Line (Color #4B4E53) */}
            <path
              ref={pathRef}
              d={pathD}
              stroke="#4B4E53"
              strokeWidth={isMobile ? 3 : 3.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#graphite-grain)"
            />

            {/* Hand-Drawn Milestone Dots with Radiating Sketch Ticks (Color #cfd1d9) */}
            {milestonePoints.map((pt, idx) => {
              const isLeft = MILESTONES[idx]?.side === 'left'

              return (
                <g
                  key={`dot-${idx}`}
                  ref={(el) => {
                    dotsRef.current[idx] = el
                  }}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  className="opacity-0"
                  style={{
                    transformOrigin: '0px 0px',
                  }}
                >
                  {/* Hand-Drawn Radiating Sketch Ticks (Color #cfd1d9) */}
                  <g stroke="#cfd1d9" strokeWidth={1.8} strokeLinecap="round" opacity={0.9}>
                    {isLeft || isMobile ? (
                      <>
                        <line x1={-14} y1={-10} x2={-23} y2={-16} />
                        <line x1={-16} y1={0} x2={-26} y2={0} />
                        <line x1={-14} y1={10} x2={-23} y2={16} />
                      </>
                    ) : (
                      <>
                        <line x1={14} y1={-10} x2={23} y2={-16} />
                        <line x1={16} y1={0} x2={26} y2={0} />
                        <line x1={14} y1={10} x2={23} y2={16} />
                      </>
                    )}
                  </g>

                  {/* Outer Graphite Rim */}
                  <circle
                    cx={0}
                    cy={0}
                    r={isMobile ? 9 : 10}
                    fill="#0c1836"
                    stroke="#4B4E53"
                    strokeWidth={2.2}
                  />

                  {/* Dot Color: #cfd1d9 as requested */}
                  <circle
                    cx={0}
                    cy={0}
                    r={isMobile ? 5.5 : 6}
                    fill="#cfd1d9"
                  />
                </g>
              )
            })}
          </svg>

          {/* 
            ======================================================================
            DYNAMIC DRAWING PENCIL COMPONENT
            The graphite lead tip (at 98.35% X, 100% Y) follows the line head and stops at 2026.
            ======================================================================
          */}
          <div
            ref={pencilRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 z-40 will-change-transform opacity-0 select-none"
            style={{
              transformOrigin: '98.35% 100%',
              width: isMobile ? '80px' : '110px',
              height: isMobile ? '155px' : '213px',
              marginLeft: isMobile ? '-78.68px' : '-108.18px',
              marginTop: isMobile ? '-155px' : '-213px',
            }}
          >
            {/* Inner wrapper for micro-vibration while scrolling */}
            <div
              ref={pencilInnerRef}
              className="relative h-full w-full will-change-transform"
              style={{ transformOrigin: '98.35% 100%' }}
            >
              {/* Realistic Pencil Shadow */}
              <div
                className="absolute inset-0 z-0 opacity-45 blur-[2px] translate-x-2.5 translate-y-3.5 -rotate-6 scale-95"
                style={{
                  filter: 'brightness(0) drop-shadow(0 6px 8px rgba(0,0,0,0.6))',
                }}
              >
                <img
                  src={pencilImg}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Clean Transparent Pencil Asset */}
              <img
                src={pencilImg}
                alt="Pencil"
                className="relative z-10 h-full w-full object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* 
            ======================================================================
            MILESTONES PAPER CARDS (Rendered on clean paper-3.png)
            Vertical Paper Cards with realistic depth, shadows, 10-15 deg tilt, and Orange Year text.
            ======================================================================
          */}
          <div
            className="relative z-20"
            style={{ paddingTop: `${topPad}px` }}
          >
            {MILESTONES.map((milestone, idx) => {
              const isLeft = milestone.side === 'left'

              return (
                <div
                  key={milestone.year}
                  ref={(el) => {
                    cardsRef.current[idx] = el
                  }}
                  className={cn(
                    'relative flex w-full items-center opacity-0 transition-all duration-300',
                    isMobile
                      ? 'justify-start pl-16 sm:pl-20 pr-2'
                      : isLeft
                        ? 'justify-start md:pr-[55%] md:pl-2'
                        : 'justify-end md:pl-[55%] md:pr-2',
                  )}
                  style={{
                    height: `${rowHeight}px`,
                  }}
                >
                  {/* 
                    PHYSICAL PAPER CARD CONTAINER WITH REALISTIC DEPTH & SHADOWS
                  */}
                  <div
                    className={cn(
                      'group relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] p-6 sm:p-7 md:p-8 transition-transform duration-300 hover:scale-105',
                      'text-ink overflow-visible',
                    )}
                    style={
                      {
                        transform: `rotate(${isMobile ? (isLeft ? -10 : 10) : milestone.tilt}deg)`,
                        filter:
                          'drop-shadow(0 20px 25px rgba(0,0,0,0.65)) drop-shadow(0 8px 10px rgba(0,0,0,0.4)) drop-shadow(0 1px 2px rgba(0,0,0,0.25))',
                      } as CSSProperties
                    }
                  >
                    {/* Background Physical Paper Texture (Clean transparent paper-3.png) */}
                    <img
                      src={paper3}
                      alt=""
                      className="pointer-events-none absolute inset-0 h-full w-full object-fill z-0 select-none"
                    />

                    {/* Translucent Frosted Tape with subtle border & shadow */}
                    <span
                      aria-hidden="true"
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 h-5.5 w-18 -rotate-2 bg-[#ece4d0]/92 backdrop-blur-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.25)] border-t border-b border-black/15 select-none"
                    />

                    {/* Little radiating sketch marks next to card (matching image) */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        'pointer-events-none absolute top-4 z-10 text-steel/50 select-none font-mono text-xs',
                        isLeft ? '-left-7 -rotate-12' : '-right-7 rotate-12',
                      )}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="16" y1="4" x2="22" y2="2" />
                        <line x1="14" y1="12" x2="22" y2="12" />
                        <line x1="16" y1="20" x2="22" y2="22" />
                      </svg>
                    </div>

                    {/* Card Content (Layered cleanly inside paper boundaries) */}
                    <div className="relative z-10 flex flex-col justify-start space-y-2.5 pt-2">
                      {/* Year Heading in Orange (#ff7a33 / text-signal) */}
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-signal">
                        {milestone.year}
                      </h3>

                      {/* Milestone Description */}
                      <p className="font-body text-xs sm:text-[13px] leading-relaxed text-ink/90 font-medium">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

