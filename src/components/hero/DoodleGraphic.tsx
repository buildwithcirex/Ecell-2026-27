import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

export interface DoodleGraphicProps {
  children: ReactNode
  /** Percent of section height to the graphic's top edge. */
  top: number
  /** Percent of section width. Set exactly one of `left` or `right`. */
  left?: number
  right?: number
  /** Rest rotation in degrees. */
  rotate?: number
  /** Entrance stagger, in ms. */
  delay?: number
  /** Fluid width, as a `clamp()` or any other CSS length. */
  width: string
  /** Give this one a slow idle float. Reserved for two graphics in the section. */
  drift?: boolean
  className?: string
}

/**
 * Positions one loose doodle and owns its motion.
 *
 * The graphics are decorative and carry no information the copy does not already
 * state, so the wrapper is `aria-hidden` and takes no tab stop. That is also why
 * the micro-interaction is hover-only: nothing here needs keyboard access.
 *
 * Rotation and scale live on this element; the optional drift lives on the inner
 * wrapper. Splitting them keeps two animations off one transform property, which
 * is what would otherwise stop the hover bounce from rendering.
 */
export function DoodleGraphic({
  children,
  top,
  left,
  right,
  rotate = 0,
  delay = 0,
  width,
  drift = false,
  className,
}: DoodleGraphicProps) {
  const style: CSSProperties = {
    top: `${top}%`,
    width,
    ['--graphic-rot' as string]: `${rotate}deg`,
    ['--graphic-delay' as string]: `${delay}ms`,
  }

  if (left !== undefined) style.left = `${left}%`
  if (right !== undefined) style.right = `${right}%`

  return (
    <div
      aria-hidden="true"
      className={cn('hero-graphic absolute', className)}
      style={style}
    >
      <div className={drift ? 'hero-drift' : undefined}>{children}</div>
    </div>
  )
}
