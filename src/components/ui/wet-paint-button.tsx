import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Each drip's horizontal offset, width and resting length, plus how far it
 * stretches on hover. Hand-set rather than generated: evenly spaced drips of
 * equal length read as a decorative border, and uneven ones read as paint.
 *
 * They stay inside the middle of the button. A drip out at the very edge would
 * hang off the button's corner radius and float free of it.
 */
const DRIPS = [
  { left: '14%', w: '0.7rem', h: '0.75rem', grow: '0.5rem' },
  { left: '31%', w: '1rem', h: '1.4rem', grow: '0.85rem' },
  { left: '52%', w: '0.55rem', h: '0.55rem', grow: '0.35rem' },
  { left: '68%', w: '0.85rem', h: '1.1rem', grow: '0.7rem' },
  { left: '84%', w: '0.6rem', h: '0.85rem', grow: '0.45rem' },
] as const

export interface WetPaintButtonProps {
  href: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Solid button with paint dripping off its bottom edge.
 *
 * The drips and the falling drop are decorative, so they are hidden from
 * assistive tech and take no pointer events; only the label is the link.
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
        'wet-btn h-12 rounded-2xl px-8 font-body text-sm font-bold sm:h-13 sm:text-base',
        className,
      )}
      style={style}
    >
      {children}

      <span className="wet-btn__drips" aria-hidden="true">
        {DRIPS.map((drip) => (
          <i
            key={drip.left}
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
      </span>

      <span
        className="wet-btn__drop"
        aria-hidden="true"
        style={{ '--drop-x': '33%' } as CSSProperties}
      />
    </a>
  )
}
