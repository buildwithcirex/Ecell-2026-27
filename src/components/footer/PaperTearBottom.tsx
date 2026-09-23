/**
 * Torn paper bottom edge.
 *
 * Inverts the geometry of `PaperTear.tsx`: the paper sheet (`var(--color-paper)`)
 * fills from above the viewport down to the ragged line, then tears away
 * to reveal the deep blue gradient background underneath.
 *
 * Seamlessly overlaps into the section above with negative margin and vertical bleed
 * to prevent any horizontal subpixel seam line.
 */

const TEAR_BOTTOM_PATH =
  'M0 40L18 31L30 33L52 24L68 28L74 22L96 34L112 29L120 38L142 26L158 30L176 20L190 27L208 25L222 36L244 30L256 23L278 33L292 27L306 39L328 31L340 24L362 29L378 21L396 32L412 27L430 37L452 28L466 22L488 31L502 26L524 35L540 29L556 20L578 28L594 24L612 34L630 27L646 31L668 22L684 30L702 25L720 36L738 29L754 23L776 32L790 26L812 34L828 28L844 21L866 30L882 25L900 33L918 27L934 22L956 31L972 26L994 36L1010 29L1026 23L1048 32L1064 27L1082 20L1100 28L1116 34L1138 26L1154 30L1176 22L1192 29L1210 25L1228 35L1246 28L1262 21L1284 31L1300 26L1318 33L1336 27L1352 23L1374 32L1390 26L1408 35L1424 29L1440 33V-20H0Z'

export function PaperTearBottom() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full pointer-events-none select-none z-10 -mt-1 sm:-mt-2"
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-12 w-full sm:h-16 lg:h-[5.5rem] overflow-visible"
      >
        {/* Shadow/thickness layer showing slightly lower beneath paper edge */}
        <path
          d={TEAR_BOTTOM_PATH}
          transform="translate(0, 5)"
          fill="var(--color-tear-shadow)"
          opacity="0.8"
        />
        {/* Main white paper sheet */}
        <path d={TEAR_BOTTOM_PATH} fill="var(--color-paper)" />
      </svg>
    </div>
  )
}
