import type { CSSProperties } from 'react'

import type { FrameShape, HeroPhoto } from '@/content/hero-assets'
import { cn } from '@/lib/utils'

/**
 * Scissor-cut edges.
 *
 * Three points per edge rather than one corner each, so the outline wobbles the
 * way a hand-cut edge does instead of reading as a slightly skewed rectangle.
 * The clip sits on the frame wrapper, not the image, so the white border is cut
 * along with it. Clipping the image alone would leave a machine-straight border
 * around a ragged photo, which is the wrong way round.
 */
const FRAME_CLIPS: Record<FrameShape, string> = {
  a: 'polygon(1% 2%, 34% 0.4%, 68% 2.2%, 99% 0%, 98.4% 33%, 100% 66%, 98% 98%, 66% 99.6%, 33% 98%, 1.4% 100%, 0% 67%, 1.6% 34%)',
  b: 'polygon(0.6% 1%, 33% 2.4%, 67% 0.6%, 98% 1.8%, 100% 34%, 98.2% 67%, 99.4% 99%, 67% 97.6%, 34% 99.4%, 2% 98%, 0% 66%, 1.8% 33%)',
  c: 'polygon(2% 0.8%, 35% 2.6%, 66% 0.8%, 99.4% 2%, 97.8% 35%, 99.6% 68%, 98.4% 99.2%, 65% 97.4%, 32% 99.2%, 0.6% 97.8%, 2.2% 65%, 0.4% 32%)',
  d: 'polygon(1.4% 2.2%, 32% 0.6%, 69% 2.8%, 98.6% 1%, 100% 32%, 97.6% 69%, 99% 98.4%, 68% 99.4%, 31% 97.6%, 1% 99%, 0.4% 68%, 2.4% 31%)',
}

export interface PhotoFrameProps {
  photo: HeroPhoto
  /** Entrance stagger, in ms. */
  delay: number
  className?: string
}

/**
 * One quirky frame in the flank scatter.
 *
 * A `<figure>` rather than a button or a link: it navigates nowhere, so giving
 * it a tab stop would be a keyboard trap that leads to a dead end. The lift is
 * driven by `:hover` and `:focus-within` in `index.css`, so if a focusable child
 * is ever added the frame still responds to the keyboard.
 */
export function PhotoFrame({ photo, delay, className }: PhotoFrameProps) {
  const positionStyle: CSSProperties = {
    top: `${photo.top}%`,
    [photo.side === 'left' ? 'left' : 'right']: `${photo.inset}%`,
    // Consumed by `.hero-frame` in index.css.
    ['--frame-rot' as string]: `${photo.rotate}deg`,
    ['--frame-delay' as string]: `${delay}ms`,
    // The floor drops to 5rem so the tier-0 corner frames stay a modest accent
    // on a phone; the vw term and ceiling are unchanged, so nothing shifts on a
    // desktop.
    width: `calc(${photo.scale} * clamp(5rem, 9.5vw, 12rem))`,
  }

  return (
    <figure
      className={cn(
        'hero-frame absolute m-0 bg-paper p-1.5 shadow-frame',
        className,
      )}
      style={{ ...positionStyle, clipPath: FRAME_CLIPS[photo.shape] }}
    >
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={photo.eager ? 'eager' : 'lazy'}
          decoding="async"
          // Intrinsic dimensions above reserve the box; this renders it.
          className="h-auto w-full object-cover"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        />
      ) : (
        <div
          role="img"
          aria-label={photo.alt}
          className="flex w-full items-center justify-center bg-hero-blue/45"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        >
          <span className="font-body text-micro font-medium tracking-[0.2em] text-cream/55 uppercase">
            Photo
          </span>
        </div>
      )}
    </figure>
  )
}
