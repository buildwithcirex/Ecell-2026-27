import { heroStickers } from '@/content/hero-graphics'
import { DoodleGraphic } from './DoodleGraphic'
import { FrameCluster } from './FrameCluster'
import { HeroBackground } from './HeroBackground'
import { PaperTear } from './PaperTear'
import { Sparkle } from './graphics/doodles'

/**
 * Landing section.
 *
 * Layers, back to front:
 *   0  ground and faint line art       HeroBackground
 *  10  flank photo scatter             FrameCluster
 *  20  loose stickers                  DoodleGraphic
 *  20  centre column                   headline, description, CTA
 *  30  torn paper edge                 PaperTear
 *
 * `min-h-svh` rather than `min-h-screen`: on mobile Safari and Chrome, `100vh`
 * is the viewport with the URL bar hidden, so a `100vh` section is taller than
 * what is on screen and the torn edge starts below the fold.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-24 sm:px-8 sm:pb-32 lg:pb-40"
    >
      <HeroBackground />
      <FrameCluster />

      {/* Six stickers plus one drawn accent. Hidden below `md` for the same
          reason the inner frames are: a 375px viewport has no gutter to put
          them in without crowding the headline. */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
        {heroStickers.map((sticker) => (
          <DoodleGraphic
            key={sticker.id}
            top={sticker.top}
            left={sticker.left}
            right={sticker.right}
            rotate={sticker.rotate}
            delay={sticker.delay}
            width={sticker.width_css}
            drift={sticker.drift}
            className="pointer-events-auto"
          >
            <img
              src={sticker.src}
              alt=""
              width={sticker.width}
              height={sticker.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </DoodleGraphic>
        ))}

        {/* The one element in the section that is Signal, and the only drawn
            mark left in the foreground. It ties the stickers to the CTA. */}
        <DoodleGraphic
          top={27}
          left={44}
          delay={680}
          width="clamp(0.9rem, 1.3vw, 1.4rem)"
          className="pointer-events-auto text-signal"
        >
          <Sparkle className="w-full" />
        </DoodleGraphic>
      </div>

      {/* Centre column */}
      <div className="relative z-20 flex w-full max-w-3xl flex-col items-center text-center">
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

        <p className="hero-rise mt-6 max-w-[46ch] font-body text-base leading-relaxed text-steel sm:mt-7 sm:text-lg">
          We help students move from intent to execution through ventures,
          hackathons, mentorship, and visible outcomes.
        </p>

        <a
          href="#work"
          className="hero-rise mt-8 inline-flex h-12 items-center justify-center rounded-full bg-signal px-8 font-body text-sm font-semibold text-ink transition-transform duration-instant ease-mech hover:-translate-y-0.5 sm:mt-10 sm:h-13 sm:text-base"
          style={{ ['--rise-delay' as string]: '160ms' }}
        >
          Explore our Work
        </a>
      </div>

      <PaperTear />
    </section>
  )
}
