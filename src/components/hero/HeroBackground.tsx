import heroOverlay from '@/assets/hero/hero-overlay.png'

/**
 * The hero ground: a blue radial wash with the desk illustration overlay.
 *
 * Both layers are inert. They take no pointer events and are hidden from the
 * accessibility tree, so nothing here competes with the centre column.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Blue gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 75%, #276edc 0%, #174391 38%, #0d2454 72%, #060f24 100%)',
        }}
      />

      {/* Hero desk illustration overlay placed above the paper tear */}
      <div className="absolute inset-x-0 bottom-10 sm:bottom-14 md:bottom-16 lg:bottom-20 flex justify-center pointer-events-none select-none overflow-hidden">
        <img
          src={heroOverlay}
          alt=""
          width={2172}
          height={724}
          className="w-full min-w-[680px] sm:min-w-[900px] lg:min-w-[1400px] max-w-[2172px] h-auto object-contain object-bottom opacity-35 sm:opacity-40"
        />
      </div>
    </div>
  )
}
