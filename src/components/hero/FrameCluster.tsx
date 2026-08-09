import { heroPhotos, type FrameTier } from '@/content/hero-assets'
import { PhotoFrame } from './PhotoFrame'

/**
 * Tailwind classes that gate a frame by tier.
 *
 * Written out in full because Tailwind scans source text for class names: a
 * template literal like `hidden ${bp}:block` produces nothing at build time.
 *
 * Tier 0 survives to the narrowest viewport. Those four sit in the corners,
 * above and below the copy rather than beside it, so a phone keeps the scatter
 * without the headline being crowded. Everything else waits for room.
 */
const TIER_VISIBILITY: Record<FrameTier, string> = {
  0: 'block',
  1: 'hidden md:block',
  2: 'hidden lg:block',
  3: 'hidden xl:block',
}

/** Entrance stagger between frames. Short and mechanical, not a cascade. */
const STAGGER_MS = 55

/**
 * The full flank scatter, both sides.
 *
 * Absolutely positioned against the hero section, driven entirely by the
 * manifest. Adding or moving a frame is a data edit, never a layout edit.
 */
export function FrameCluster() {
  // The container ignores the pointer so it never sits over the centre column;
  // each frame opts back in so its own hover still fires.
  return (
    <div className="pointer-events-none absolute inset-0">
      {heroPhotos.map((photo, index) => (
        <PhotoFrame
          key={photo.id}
          photo={photo}
          delay={index * STAGGER_MS}
          className={`pointer-events-auto ${TIER_VISIBILITY[photo.tier]}`}
        />
      ))}
    </div>
  )
}
