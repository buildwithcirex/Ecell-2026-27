import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import { type TeamMember } from '@/content/team-2026'
import { TeamPlaceholderIllustration } from './TeamPlaceholderIllustration'

gsap.registerPlugin(ScrollTrigger)

interface FlowfestCardProps {
  member: TeamMember
  index: number
  stripIndex: number
  active?: boolean
  defaultTag?: string
  className?: string
}

/**
 * Safely parse HTML strings containing <strong> tags into React elements
 * so keywords render in bold, exactly like FlowFest.
 */
function FormattedBio({ text }: { text: string }) {
  const parts = text.split(/(<strong>.*?<\/strong>)/g)

  return (
    <p
      className={cn(
        'font-quicksand text-center text-[13px] leading-snug sm:text-[13.5px] text-[#121212]',
        '[text-wrap:balance]',
      )}
    >
      {parts.map((part, i) => {
        if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
          const content = part.replace(/<\/?strong>/g, '')
          return (
            <strong key={i} className="font-extrabold text-[#121212]">
              {content}
            </strong>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </p>
  )
}

/**
 * Replicates the exact speaker card design from FlowFest:
 * 1. Top pill tag badge overlapping the image frame
 * 2. 4 corner resize handles on the photo container
 * 3. 2px dark border with solid offset shadow
 * 4. Interactive GSAP sticky multiplayer cursor pill
 * 5. Narrower bio card below with highlighted bold typography
 * 6. Desktop card opening animation: the 4 corner points start joint in the center
 *    and spread out in their diagonal directions to open the card on scroll.
 */
export function FlowfestCard({
  member,
  index,
  defaultTag,
  className,
}: FlowfestCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const imageBoxRef = useRef<HTMLDivElement>(null)
  const cursorPillRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)

  const cornerTLRef = useRef<HTMLDivElement>(null)
  const cornerTRRef = useRef<HTMLDivElement>(null)
  const cornerBLRef = useRef<HTMLDivElement>(null)
  const cornerBRRef = useRef<HTMLDivElement>(null)

  // Card opening animation on scroll (Desktop only)
  useEffect(() => {
    const card = cardRef.current
    const imageWrap = imageWrapRef.current
    const imageBox = imageBoxRef.current
    const tag = tagRef.current
    const bio = bioRef.current
    const cursorPill = cursorPillRef.current
    const tl = cornerTLRef.current
    const tr = cornerTRRef.current
    const bl = cornerBLRef.current
    const br = cornerBRRef.current

    if (!card || !imageWrap || !imageBox || !tl || !tr || !bl || !br) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const isDesktop = window.innerWidth >= 1024 && !prefersReducedMotion

    const ctx = gsap.context(() => {
      if (isDesktop) {
        const w = imageWrap.offsetWidth || 280
        const h = imageWrap.offsetHeight || (w * 9) / 8
        const dx = w / 2 - 9
        const dy = h / 2 - 9

        // Initial state: 4 corner dots touch at the center
        gsap.set(tl, { x: dx, y: dy })
        gsap.set(tr, { x: -dx, y: dy })
        gsap.set(bl, { x: dx, y: -dy })
        gsap.set(br, { x: -dx, y: -dy })

        // Image box clipped to center 18x18 square
        gsap.set(imageBox, {
          clipPath:
            'inset(calc(50% - 9px) calc(50% - 9px) calc(50% - 9px) calc(50% - 9px))',
        })

        if (tag) gsap.set(tag, { opacity: 0, y: 14, scale: 0.85 })
        if (bio) gsap.set(bio, { opacity: 0, y: -16, scaleY: 0.85 })
        if (cursorPill) gsap.set(cursorPill, { opacity: 0, scale: 0.5 })

        // ScrollTrigger timeline that spreads out the 4 corner points
        const animTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
          delay: (index % 4) * 0.08,
          onComplete: () => {
            gsap.set([tl, tr, bl, br], { clearProps: 'transform' })
            gsap.set(imageBox, { clearProps: 'clipPath' })
          },
        })

        animTl
          .to([tl, tr, bl, br], {
            x: 0,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
          })
          .to(
            imageBox,
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.75,
              ease: 'power3.out',
            },
            '<',
          )
          .to(
            tag,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: 'back.out(1.4)',
            },
            '-=0.35',
          )
          .to(
            bio,
            {
              opacity: 1,
              y: 0,
              scaleY: 1,
              duration: 0.45,
              ease: 'power3.out',
            },
            '-=0.35',
          )
          .to(
            cursorPill,
            {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: 'back.out(1.5)',
            },
            '-=0.25',
          )
      } else {
        // Mobile / tablet / reduced motion: clean entrance
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
          },
        )
      }
    }, card)

    return () => ctx.revert()
  }, [index])

  // GSAP Interactive Sticky Cursor (desktop hover tracking)
  useEffect(() => {
    const imageBox = imageBoxRef.current
    const target = cursorPillRef.current
    if (!imageBox || !target) return

    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    if (isTouch || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const offsetXPct = 8
    const offsetYPct = 40

    const onMouseMove = (e: MouseEvent) => {
      const imgRect = imageBox.getBoundingClientRect()
      const tRect = target.getBoundingClientRect()

      const relX = e.clientX - imgRect.left
      const relY = e.clientY - imgRect.top

      const origX =
        tRect.left - imgRect.left - (gsap.getProperty(target, 'x') as number)
      const origY =
        tRect.top - imgRect.top - (gsap.getProperty(target, 'y') as number)

      const targetW = tRect.width
      const targetH = tRect.height

      const offsetX = (offsetXPct / 100) * targetW
      const offsetY = (offsetYPct / 100) * targetH

      let targetX = relX - origX - targetW / 2 + offsetX
      let targetY = relY - origY - targetH / 2 + offsetY

      // Clamp within image bounds
      const minX = -origX + 10
      const maxX = imgRect.width - origX - targetW - 10
      const minY = -origY + 10
      const maxY = imgRect.height - origY - targetH - 10

      targetX = Math.max(minX, Math.min(maxX, targetX))
      targetY = Math.max(minY, Math.min(maxY, targetY))

      gsap.to(target, {
        x: targetX,
        y: targetY,
        duration: 0.38,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    const onMouseLeave = () => {
      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    imageBox.addEventListener('mousemove', onMouseMove)
    imageBox.addEventListener('mouseleave', onMouseLeave)

    return () => {
      imageBox.removeEventListener('mousemove', onMouseMove)
      imageBox.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const hasPhoto = Boolean(member.photo?.src)
  const tagLabel = member.tag || defaultTag || member.role
  const cursorName = member.cursorText || member.name
  const cursorColor = member.cursorColor || '#f97028'

  return (
    <article
      ref={cardRef}
      aria-label={`${member.name}, ${member.role}`}
      className={cn(
        'speaker-card group relative mx-auto flex w-full max-w-[280px] flex-col items-center',
        'will-change-transform',
        className,
      )}
    >
      {/* ------------------------------------------------------------ */}
      {/* 1. Top pill tag badge                                        */}
      {/* ------------------------------------------------------------ */}
      <div
        ref={tagRef}
        className={cn(
          'speaker-card__tag relative z-10 flex h-10 items-center justify-center',
          '-mb-[20px] rounded-lg border-2 border-[#121212] bg-[#fffefb] px-4.5',
          'shadow-[0_2px_0_0_rgba(0,0,0,0.06)]',
        )}
      >
        <span className="font-quicksand text-[13px] font-bold tracking-normal text-[#121212] sm:text-[13.5px]">
          {tagLabel}
        </span>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* 2. Image container with 4 corner resize handles              */}
      {/* ------------------------------------------------------------ */}
      <div ref={imageWrapRef} className="speaker-card__image-wrap relative w-full">
        {/* Four white corner handles with black borders (joint at start on desktop) */}
        <div
          ref={cornerTLRef}
          aria-hidden="true"
          className="image-corner pointer-events-none absolute -top-[9px] -left-[9px] z-20 h-[18px] w-[18px] border-2 border-[#121212] bg-[#fffefb]"
        />
        <div
          ref={cornerTRRef}
          aria-hidden="true"
          className="image-corner is--right-top pointer-events-none absolute -top-[9px] -right-[9px] z-20 h-[18px] w-[18px] border-2 border-[#121212] bg-[#fffefb]"
        />
        <div
          ref={cornerBLRef}
          aria-hidden="true"
          className="image-corner is--left-bottom pointer-events-none absolute -bottom-[9px] -left-[9px] z-20 h-[18px] w-[18px] border-2 border-[#121212] bg-[#fffefb]"
        />
        <div
          ref={cornerBRRef}
          aria-hidden="true"
          className="image-corner is--right-bottom pointer-events-none absolute -bottom-[9px] -right-[9px] z-20 h-[18px] w-[18px] border-2 border-[#121212] bg-[#fffefb]"
        />

        {/* Main Photo Box */}
        <div
          ref={imageBoxRef}
          className={cn(
            'speaker-card__image relative aspect-[8/9] w-full cursor-pointer overflow-hidden',
            'border-2 border-[#121212] bg-[#fffefb]',
            'shadow-[6px_6px_0_0_rgba(0,0,0,0.15)]',
          )}
        >
          {hasPhoto ? (
            <img
              src={member.photo!.src}
              alt={member.photo!.alt || `${member.name}, ${member.role}`}
              width={member.photo!.width}
              height={member.photo!.height}
              loading="lazy"
              decoding="async"
              style={{
                objectPosition: member.photo!.objectPosition,
                ...member.photo!.style,
              }}
              className={cn(
                'absolute inset-0 h-full w-full select-none object-cover pointer-events-none',
                member.photo!.className,
              )}
            />
          ) : (
            <TeamPlaceholderIllustration
              id={member.id}
              seedIndex={index}
              customColor={member.placeholderColor}
            />
          )}

          {/* -------------------------------------------------------- */}
          {/* 3. Multiplayer Cursor Tag                                */}
          {/* -------------------------------------------------------- */}
          <div className="speaker-card__cursor-wrap pointer-events-none absolute inset-3 z-15 flex flex-col items-center justify-end pb-1.5">
            <div
              ref={cursorPillRef}
              data-sticky-cursor-target=""
              style={{ backgroundColor: cursorColor }}
              className={cn(
                'speakers-card__cursor pointer-events-none relative flex h-8.5 items-center justify-center',
                'rounded-full border-2 border-[#121212] px-3.5 text-white select-none',
                'shadow-[2px_2px_0_0_rgba(0,0,0,0.18)]',
              )}
            >
              {/* Cursor Pointer Arrow SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                aria-hidden="true"
                className="speakers-card__cursor-pointer pointer-events-none absolute top-0 left-0 -translate-x-[75%] -translate-y-[75%]"
              >
                <path
                  d="M1.37207 3.99438C0.893838 2.31674 2.63215 0.917659 4.16699 1.65161L19.2695 8.8772L19.415 8.95337C20.8186 9.76057 20.7125 11.8395 19.2295 12.4954L19.0762 12.5559L12.8652 14.7561H12.8643L9.59863 20.4348C8.74532 21.9184 6.5585 21.7032 5.98145 20.1409L5.93066 19.9856L1.37207 3.99438Z"
                  fill={cursorColor}
                  stroke="#121212"
                  strokeWidth="2"
                />
              </svg>
              <span className="font-quicksand text-xs font-bold whitespace-nowrap text-white sm:text-[13px]">
                {cursorName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* 4. Bio box (narrower than image so corner handles stay visible) */}
      {/* ------------------------------------------------------------ */}
      <div
        ref={bioRef}
        className={cn(
          'speaker-card__bio -mt-[2px] w-[calc(100%-2.25rem)]',
          'border-2 border-[#121212] bg-[#fffefb] px-3.5 py-3 sm:px-4 sm:py-3.5',
          'shadow-[4px_4px_0_0_rgba(0,0,0,0.08)]',
        )}
      >
        <FormattedBio text={member.description} />
      </div>
    </article>
  )
}
