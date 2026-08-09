/**
 * Hero asset manifest.
 *
 * Single source of truth for every image in the landing section. Components read
 * from here and never hardcode a path, a size or a caption.
 *
 * ---------------------------------------------------------------------------
 * HOW TO ADD A REAL PHOTO
 *
 *   1. Drop the file into `src/assets/hero/`.
 *   2. Import it at the top of this file:
 *        import demoDay from '@/assets/hero/demo-day.jpg'
 *   3. Set it as the `src` on the slot you want, and correct `width` / `height`
 *      to the file's real intrinsic pixel dimensions.
 *   4. Replace the `COPY-PENDING` alt text with what the photo actually shows.
 *
 * Nothing else changes. Layout, rotation, hover and spacing are already real.
 * ---------------------------------------------------------------------------
 *
 * `width` and `height` are the intrinsic pixel dimensions and are mandatory:
 * they are what reserves the correct box before the image loads, which is what
 * holds cumulative layout shift at zero. They are not the rendered size, which
 * is fluid and derived from `scale`.
 *
 * COPY-PENDING: every `alt` below describes a placeholder, not a real
 * photograph. Each must be rewritten when the real file lands.
 */

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
  /** Intrinsic pixel width of the source file. */
  readonly width: number
  /** Intrinsic pixel height of the source file. */
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
    src: null,
    alt: 'COPY-PENDING: E-Cell members at a build night on campus',
    width: 800,
    height: 1000,
    side: 'left',
    top: 8,
    inset: -3,
    rotate: -7,
    scale: 1.0,
    shape: 'a',
    tier: 0,
    eager: true,
  },
  {
    id: 'l2',
    src: null,
    alt: 'COPY-PENDING: Student team presenting at a pitch review',
    width: 1000,
    height: 750,
    side: 'left',
    top: 27,
    inset: 4,
    rotate: 5,
    scale: 0.82,
    shape: 'c',
    tier: 2,
  },
  {
    id: 'l3',
    src: null,
    alt: 'COPY-PENDING: Full hall during the annual entrepreneurship summit',
    width: 1200,
    height: 800,
    side: 'left',
    top: 45,
    inset: -5,
    rotate: -4,
    scale: 1.25,
    shape: 'b',
    tier: 1,
  },
  {
    id: 'l4',
    src: null,
    alt: 'COPY-PENDING: Mentor working through a problem with two students',
    width: 800,
    height: 800,
    side: 'left',
    top: 66,
    inset: 6,
    rotate: 9,
    scale: 0.78,
    shape: 'd',
    tier: 3,
  },
  {
    id: 'l5',
    src: null,
    alt: 'COPY-PENDING: Workshop attendees taking notes',
    width: 900,
    height: 1100,
    side: 'left',
    top: 78,
    inset: -2,
    rotate: -9,
    scale: 0.95,
    shape: 'a',
    tier: 0,
  },

  // Right flank, top to bottom.
  {
    id: 'r1',
    src: null,
    alt: 'COPY-PENDING: Participants at a hackathon table with laptops open',
    width: 1200,
    height: 800,
    side: 'right',
    top: 10,
    inset: -4,
    rotate: 6,
    scale: 1.15,
    shape: 'b',
    tier: 0,
    eager: true,
  },
  {
    id: 'r2',
    src: null,
    alt: 'COPY-PENDING: Speaker taking questions from the floor',
    width: 800,
    height: 1000,
    side: 'right',
    top: 30,
    inset: 5,
    rotate: -6,
    scale: 0.8,
    shape: 'd',
    tier: 2,
  },
  {
    id: 'r3',
    src: null,
    alt: 'COPY-PENDING: Team celebrating after a demo day result',
    width: 1000,
    height: 1250,
    side: 'right',
    top: 46,
    inset: -6,
    rotate: 8,
    scale: 1.2,
    shape: 'a',
    tier: 1,
  },
  {
    id: 'r4',
    src: null,
    alt: 'COPY-PENDING: Close-up of a prototype being demonstrated',
    width: 900,
    height: 700,
    side: 'right',
    top: 67,
    inset: 7,
    rotate: -8,
    scale: 0.76,
    shape: 'c',
    tier: 3,
  },
  {
    id: 'r5',
    src: null,
    alt: 'COPY-PENDING: Volunteers setting up the venue before an event',
    width: 1100,
    height: 850,
    side: 'right',
    top: 80,
    inset: -3,
    rotate: 4,
    scale: 1.0,
    shape: 'b',
    tier: 0,
  },
]

/**
 * E-Cell logo.
 *
 * `src: null` renders a typographic wordmark in the display face. There is no
 * logo file in this repository and none in its git history, so the mark below is
 * a stand-in and not the real identity.
 */
export interface HeroLogo {
  readonly src: string | null
  readonly alt: string
  readonly width: number
  readonly height: number
  /** Shown when `src` is null. */
  readonly wordmark: string
}

export const heroLogo: HeroLogo = {
  src: null,
  alt: 'E-Cell',
  width: 120,
  height: 40,
  wordmark: 'E-CELL',
}

/**
 * The character that peeks over the torn paper edge, referred to as
 * `landing-end` in the brief.
 *
 * `src: null` renders a hand-drawn stand-in. No `landing-end` file exists in the
 * repository or its history, so this is deliberately generic.
 */
export interface HeroLandingEnd {
  readonly src: string | null
  readonly alt: string
  readonly width: number
  readonly height: number
}

export const heroLandingEnd: HeroLandingEnd = {
  src: null,
  alt: '',
  width: 240,
  height: 180,
}
