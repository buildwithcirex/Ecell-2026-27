/**
 * The loose sticker graphics scattered around the centre column.
 *
 * These are the E-Cell stickers from `src/assets/`, cut out of the flat white or
 * black grounds they were exported on by `scripts/process-hero-assets.py`.
 *
 * Kept separate from `hero-assets.ts` because they behave differently: they are
 * decorative, they sit in the gutters rather than the flanks, and they get a
 * hover micro-interaction rather than a lift.
 */

import build1111 from '@/assets/hero/graphic-1111.webp'
import boo from '@/assets/hero/graphic-boo.webp'
import buildIt from '@/assets/hero/graphic-build-it.webp'
import ecellAgain from '@/assets/hero/graphic-ecell-again.webp'
import emailFindsYou from '@/assets/hero/graphic-email-finds-you.webp'
import robot from '@/assets/hero/graphic-robot.webp'

export interface HeroSticker {
  readonly id: string
  readonly src: string
  readonly width: number
  readonly height: number
  /** Percent of section height to the sticker's top edge. */
  readonly top: number
  /** Percent of section width. Exactly one of `left` or `right`. */
  readonly left?: number
  readonly right?: number
  readonly rotate: number
  /** Entrance stagger, in ms. */
  readonly delay: number
  /** Fluid width as a CSS length. */
  readonly width_css: string
  /** Slow idle float. Deliberately true for only two stickers. */
  readonly drift?: boolean
  /** Optional custom CSS classes for the image (e.g. mix-blend-screen) */
  readonly className?: string
  /**
   * Placement for the narrow layout, under `lg`.
   *
   * Only a couple of stickers carry one. Below `lg` the copy column spans
   * almost the full width, so the only clear ground is the horizontal band
   * above the headline and the one between the CTA and the torn edge. These
   * percentages sit in those bands and hold from 375px through 1024px.
   */
  readonly narrow?: {
    readonly top: number
    readonly left?: number
    readonly right?: number
    readonly width_css: string
  }
}

/**
 * Placement is hand-set, not generated: each sticker has to clear the photo
 * frames on its flank and the copy in the middle at every breakpoint.
 *
 * The two largest sit lowest, where the ground is brightest and there is room
 * between the CTA and the torn edge.
 */
export const heroStickers: readonly HeroSticker[] = [
  {
    id: 'build-it',
    src: buildIt,
    width: 420,
    height: 143,
    top: 17,
    left: 20,
    rotate: -11,
    delay: 320,
    width_css: 'clamp(5rem, 8vw, 8.5rem)',
    drift: true,
    narrow: { top: 11, left: 21, width_css: 'clamp(4.5rem, 17vw, 8rem)' },
  },
  {
    id: 'ecell-again',
    src: ecellAgain,
    width: 420,
    height: 304,
    top: 14,
    right: 19,
    rotate: 8,
    delay: 380,
    width_css: 'clamp(4.5rem, 7.5vw, 8rem)',
  },
  {
    id: 'robot',
    src: robot,
    width: 271,
    height: 360,
    top: 43,
    right: 21,
    rotate: 6,
    delay: 440,
    width_css: 'clamp(3rem, 5vw, 5.5rem)',
    drift: true,
  },
  {
    id: '1111',
    src: build1111,
    width: 360,
    height: 194,
    top: 69,
    left: 19,
    rotate: -9,
    delay: 500,
    width_css: 'clamp(3.5rem, 6vw, 6.5rem)',
  },
  {
    id: 'boo',
    src: boo,
    width: 317,
    height: 360,
    top: 42,
    left: 16,
    rotate: 10,
    delay: 560,
    width_css: 'clamp(3.25rem, 5.5vw, 6rem)',
    narrow: { top: 76, right: 24, width_css: 'clamp(3.25rem, 13vw, 6rem)' },
  },
  {
    id: 'email-finds-you',
    src: emailFindsYou,
    width: 301,
    height: 360,
    top: 73,
    right: 30,
    rotate: -7,
    delay: 620,
    width_css: 'clamp(3.25rem, 5.5vw, 6rem)',
  },
]
