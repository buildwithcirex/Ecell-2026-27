import { heroLandingEnd } from '@/content/hero-assets'
import { LandingEndCharacter } from './graphics/landing-end'

/**
 * A single hand-authored torn edge across a wide viewBox.
 *
 * Deliberately not a repeating tile: a tile shows its seam at the repeat, and a
 * tear that repeats every few hundred pixels stops reading as torn. One long
 * irregular run of points has no repeat to spot.
 *
 * Rendered with `preserveAspectRatio="none"`, so on an ultrawide viewport the
 * edge stretches horizontally. On a ragged line that is invisible, which is why
 * this approach survives widths the path was never drawn for.
 */
const TEAR_PATH =
  'M0 40L18 31L30 33L52 24L68 28L74 22L96 34L112 29L120 38L142 26L158 30L176 20L190 27L208 25L222 36L244 30L256 23L278 33L292 27L306 39L328 31L340 24L362 29L378 21L396 32L412 27L430 37L452 28L466 22L488 31L502 26L524 35L540 29L556 20L578 28L594 24L612 34L630 27L646 31L668 22L684 30L702 25L720 36L738 29L754 23L776 32L790 26L812 34L828 28L844 21L866 30L882 25L900 33L918 27L934 22L956 31L972 26L994 36L1010 29L1026 23L1048 32L1064 27L1082 20L1100 28L1116 34L1138 26L1154 30L1176 22L1192 29L1210 25L1228 35L1246 28L1262 21L1284 31L1300 26L1318 33L1336 27L1352 23L1374 32L1390 26L1408 35L1424 29L1440 33V90H0Z'

/**
 * Closes the landing section with a torn paper edge.
 *
 * Purely decorative, so the whole thing is `aria-hidden`. The character peeking
 * over the tear sits above it in the stacking order.
 */
export function PaperTear() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-30">
      <div className="relative">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block h-10 w-full sm:h-14 lg:h-[5.5rem]"
        >
          {/* Back sheet, the same edge nudged up so it shows as paper thickness
              rather than as a drawn outline. */}
          <path
            d={TEAR_PATH}
            transform="translate(0,-7)"
            fill="var(--color-tear-shadow)"
          />
          <path d={TEAR_PATH} fill="var(--color-paper)" />
        </svg>

        {/* The tear only covers the bottom strip; this fills everything below it
            so the section ends on solid paper rather than a sliver. */}
        <div className="h-4 w-full bg-paper sm:h-6" />

        <div className="absolute right-[6%] bottom-2 w-16 sm:right-[9%] sm:bottom-3 sm:w-24 lg:w-28">
          {heroLandingEnd.src ? (
            <img
              src={heroLandingEnd.src}
              alt={heroLandingEnd.alt}
              width={heroLandingEnd.width}
              height={heroLandingEnd.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          ) : (
            <LandingEndCharacter className="w-full text-hero-mid" />
          )}
        </div>
      </div>
    </div>
  )
}
