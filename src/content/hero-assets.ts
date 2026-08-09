/**
 * Hero asset manifest.
 *
 * Single source of truth for every image in the landing section. Components read
 * from here and never hardcode a path, a size or a caption.
 *
 * The files imported below are the web-ready derivatives in `src/assets/hero/`,
 * produced by `scripts/process-hero-assets.py` from the originals in
 * `src/assets/`. Do not point a slot at an original: they are 1-2MB PNGs and
 * render at under 250px.
 *
 * ---------------------------------------------------------------------------
 * ADDING OR REPLACING A PHOTO
 *
 *   1. Drop the original into `src/assets/team/`.
 *   2. Add it to the `PHOTOS` list in `scripts/process-hero-assets.py`.
 *   3. Run `python3 scripts/process-hero-assets.py`.
 *   4. Import the generated `.webp` here, set it as a slot's `src`, and update
 *      `width` / `height` to the generated file's dimensions (the script prints
 *      them) plus real `alt` text.
 * ---------------------------------------------------------------------------
 *
 * `width` and `height` are the derivative's intrinsic pixel dimensions and are
 * mandatory: they reserve the correct box before the image loads, which is what
 * holds cumulative layout shift at zero. They are not the rendered size, which
 * is fluid and derived from `scale`.
 */

import ecellLogo from '@/assets/hero/ecell-logo.webp'
import landingEnd from '@/assets/hero/landing-end.webp'
import team1 from '@/assets/hero/team-1.webp'
import team2 from '@/assets/hero/team-2.webp'
import team3 from '@/assets/hero/team-3.webp'
import team4 from '@/assets/hero/team-4.webp'
import team5 from '@/assets/hero/team-5.webp'
import team6 from '@/assets/hero/team-6.webp'
import team7 from '@/assets/hero/team-7.webp'
import team8 from '@/assets/hero/team-8.webp'
import team9 from '@/assets/hero/team-9.webp'
import team10 from '@/assets/hero/team-10.webp'

/** Cut-edge variants for the frames. Kept as a union so a typo fails the build. */
export type FrameShape = 'a' | 'b' | 'c' | 'd'

/**
 * Visibility tier, which controls how the scatter sheds on narrow viewports.
 *
 *   0  every width, including a 375px phone
 *   1  from `md` (768) upward
 *   2  from `lg` (1024) upward
 *   3  from `xl` (1280) upward
 *
 * Tier 0 is reserved for the four corner frames. They sit well clear of the
 * centre band, so a phone keeps the character of the scatter without the copy
 * being crowded. Everything else waits for room.
 */
export type FrameTier = 0 | 1 | 2 | 3

export interface HeroPhoto {
  /** Stable React key. Never reused across slots. */
  readonly id: string
  /** Imported asset URL, or `null` to render the placeholder frame. */
  readonly src: string | null
  /** Non-empty always. Describes the photo, not the layout. */
  readonly alt: string
  /** Intrinsic pixel width of the derivative in `src/assets/hero/`. */
  readonly width: number
  /** Intrinsic pixel height of the derivative in `src/assets/hero/`. */
  readonly height: number
  readonly side: 'left' | 'right'
  /** Vertical placement, percent of section height to the frame's top edge. */
  readonly top: number
  /**
   * Horizontal placement, percent of section width measured in from the frame's
   * own flank. Negative values bleed the frame off the edge, which is what stops
   * the scatter reading as a tidy column.
   */
  readonly inset: number
  /** Rest rotation in degrees. Hover straightens this to zero. */
  readonly rotate: number
  /** Relative visual size. Multiplies the responsive base width. */
  readonly scale: number
  readonly shape: FrameShape
  readonly tier: FrameTier
  /**
   * Load eagerly. Reserved for the two frames highest in the viewport; every
   * other frame is lazy.
   */
  readonly eager?: boolean
}

export const heroPhotos: readonly HeroPhoto[] = [
  // Left flank, top to bottom.
  {
    id: 'l1',
    src: team1,
    alt: 'Students standing in a circle during a workshop activity in the college hall',
    width: 630,
    height: 1120,
    side: 'left',
    top: 8,
    inset: -7,
    rotate: -11,
    scale: 1.15,
    shape: 'a',
    tier: 0,
    eager: true,
  },
  {
    id: 'l2',
    src: team2,
    alt: 'A large group of E-Cell members packed together for a group photo, arms raised',
    width: 680,
    height: 382,
    side: 'left',
    top: 27,
    inset: -1,
    rotate: 9,
    scale: 1.25,
    shape: 'c',
    tier: 2,
  },
  {
    id: 'l3',
    src: team6,
    alt: 'The E-Cell team lined up across the front of a classroom',
    width: 850,
    height: 478,
    side: 'left',
    top: 45,
    inset: -9,
    rotate: -8,
    scale: 1.55,
    shape: 'b',
    tier: 1,
  },
  {
    id: 'l4',
    src: team3,
    alt: 'Students seated in the auditorium listening to a speaker at the front',
    width: 520,
    height: 520,
    side: 'left',
    top: 66,
    inset: 2,
    rotate: 14,
    scale: 0.95,
    shape: 'd',
    tier: 3,
  },
  {
    id: 'l5',
    src: team8,
    alt: 'A student holding a boom microphone over classmates taking notes during a recording',
    width: 596,
    height: 1060,
    side: 'left',
    top: 78,
    inset: -6,
    rotate: -13,
    scale: 1.1,
    shape: 'a',
    tier: 0,
  },

  // Right flank, top to bottom.
  {
    id: 'r1',
    src: team5,
    alt: 'Members seated on stools in a circle for a panel discussion',
    width: 820,
    height: 615,
    side: 'right',
    top: 10,
    inset: -8,
    rotate: 10,
    scale: 1.5,
    shape: 'b',
    tier: 0,
    eager: true,
  },
  {
    id: 'r2',
    src: team7,
    alt: 'Two students laughing together in the auditorium seating',
    width: 518,
    height: 920,
    side: 'right',
    top: 30,
    inset: 1,
    rotate: -10,
    scale: 0.95,
    shape: 'd',
    tier: 2,
  },
  {
    id: 'r3',
    src: team10,
    alt: 'A cluster of members crowding into frame for a selfie after an event',
    width: 709,
    height: 1260,
    side: 'right',
    top: 46,
    inset: -10,
    rotate: 12,
    scale: 1.3,
    shape: 'a',
    // Not tier 0: at 46% down the section this sits level with the description,
    // and on a phone there is no gutter for it to occupy.
    tier: 1,
  },
  {
    id: 'r4',
    src: team4,
    alt: 'Two members mid-conversation during an event',
    width: 414,
    height: 308,
    side: 'right',
    top: 67,
    inset: 3,
    rotate: -12,
    scale: 1.3,
    shape: 'c',
    tier: 3,
  },
  {
    id: 'r5',
    src: team9,
    alt: 'A member seated in the auditorium while another films with a camera rig behind',
    width: 630,
    height: 1120,
    side: 'right',
    top: 80,
    inset: -7,
    rotate: 8,
    scale: 1.15,
    shape: 'b',
    tier: 0,
  },
]

/** E-Cell logo, top-left. */
export interface HeroLogo {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

export const heroLogo: HeroLogo = {
  src: ecellLogo,
  alt: 'E-Cell',
  width: 160,
  height: 133,
}

/**
 * The character that peeks over the torn paper edge.
 *
 * Decorative: it repeats nothing the copy says, so `alt` is intentionally empty
 * and the wrapper is hidden from assistive tech.
 */
export interface HeroLandingEnd {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

export const heroLandingEnd: HeroLandingEnd = {
  src: landingEnd,
  alt: '',
  width: 800,
  height: 469,
}
