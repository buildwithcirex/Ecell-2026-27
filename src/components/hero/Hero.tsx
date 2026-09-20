import { WetPaintButton } from '@/components/ui/wet-paint-button'
import { FrameCluster } from './FrameCluster'
import { HeroBackground } from './HeroBackground'
import { PaperTear } from './PaperTear'

/**
 * Landing section.
 *
 * Layers, back to front:
 *   0  ground and illustration overlay  HeroBackground
 *  10  torn paper edge                  PaperTear
 *  20  flank photo scatter              FrameCluster
 *  40  centre column                    headline, description, CTA
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-24 sm:px-8 sm:pb-32 lg:pb-40"
    >
      <HeroBackground />
      <FrameCluster />

      {/* Centre column */}
      <div className="relative z-40 flex w-full max-w-3xl flex-col items-center text-center">
        <h1
          id="hero-heading"
          // The 3.25rem floor is the largest that still fits "Build That" on one
          // line inside a 375px viewport. Anything larger wraps mid-line and the
          // authored break stops meaning anything.
          className="font-display text-[clamp(3.25rem,9vw,7.5rem)] leading-[0.9] font-extrabold tracking-[-0.03em] text-cream"
        >
          {/* Authored line break. At 9vw the browser's own wrap point lands in
              the wrong place, and this headline is only ever three words. */}
          Build That
          <br />
          Shit
        </h1>

        <p className="hero-rise mt-6 max-w-[48ch] font-sans text-base font-semibold leading-relaxed text-cream sm:mt-7 sm:text-xl sm:font-medium sm:leading-relaxed tracking-[-0.01em] [text-shadow:_0_2px_10px_rgba(3,8,20,0.7)]">
          We help students move from intent to execution through ventures,
          hackathons, mentorship, and visible outcomes.
        </p>

        <WetPaintButton
          href="#work"
          className="hero-rise mt-8 sm:mt-10"
          style={{ ['--rise-delay' as string]: '160ms' }}
        >
          Explore our Work
        </WetPaintButton>
      </div>

      <PaperTear />
    </section>
  )
}
