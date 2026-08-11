import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Each drip's horizontal offset, width and resting length, plus how far it
 * stretches on hover. Hand-set rather than generated: evenly spaced drips of
 * equal length read as a decorative border, uneven ones read as paint.
 *
 * They stay inside the middle of the button. A drip out at the very edge would
 * hang off the corner radius and float free of the body.
 */
const DRIPS = [
  { left: '13%', w: '0.8rem', h: '0.9rem', grow: '0.7rem' },
  { left: '29%', w: '1.15rem', h: '1.6rem', grow: '1.15rem' },
  { left: '46%', w: '0.6rem', h: '0.6rem', grow: '0.45rem' },
  { left: '63%', w: '0.95rem', h: '1.25rem', grow: '0.95rem' },
  { left: '82%', w: '0.7rem', h: '1rem', grow: '0.6rem' },
] as const

/**
 * Two drops on different cycles and offsets. One drop on a loop reads as a
 * repeating animation; two out of phase read as paint that keeps running.
 */
const DROPS = [
  { x: '29%', fall: '3.6s', delay: '0s' },
  { x: '63%', fall: '4.9s', delay: '1.6s' },
] as const

export interface WetPaintButtonProps {
  href: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Solid button with wet paint running off its bottom edge.
 *
 * The paint layer is filtered and the label is not, so the text stays crisp
 * while the shapes below it fuse. Everything but the label is decorative:
 * hidden from assistive tech, and inert to the pointer so it never intercepts
 * the click.
 *
 * The drips respond to `:focus-visible` as well as `:hover`, so the effect is
 * not mouse-only.
 */
export function WetPaintButton({
  href,
  children,
  className,
  style,
}: WetPaintButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        'wet-btn h-12 rounded-2xl px-8 font-display text-base font-bold tracking-tight sm:h-14 sm:px-10 sm:text-lg',
        className,
      )}
      style={style}
    >
      {/*
        The gooey filter. `stdDeviation` sets how far apart two shapes can be
        and still fuse; the alpha row of the colour matrix (18, -7) is the
        contrast curve that snaps the blurred edges back to something solid.
        Without that second step this is just a blur.

        The filter region is widened to 200% so a falling drop is not clipped
        at the edge of the default region on its way down.
      */}
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute h-0 w-0"
      >
        <defs>
          <filter
            id="wet-goo"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -7"
            />
          </filter>
        </defs>
      </svg>

      <span className="wet-btn__paint" aria-hidden="true">
        <span className="wet-btn__body" />

        {DRIPS.map((drip) => (
          <span
            key={drip.left}
            className="wet-btn__drip"
            style={
              {
                left: drip.left,
                '--w': drip.w,
                '--h': drip.h,
                '--grow': drip.grow,
              } as CSSProperties
            }
          />
        ))}

        {DROPS.map((drop) => (
          <span
            key={drop.x}
            className="wet-btn__drop"
            style={
              {
                '--drop-x': drop.x,
                '--fall': drop.fall,
                '--fall-delay': drop.delay,
              } as CSSProperties
            }
          />
        ))}
      </span>

      <span className="wet-btn__gloss" aria-hidden="true" />
      <span className="wet-btn__label">{children}</span>
    </a>
  )
}
