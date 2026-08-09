import { DoodleGraphic } from './DoodleGraphic'
import { FrameCluster } from './FrameCluster'
import { HeroBackground } from './HeroBackground'
import { PaperTear } from './PaperTear'
import {
  CoffeeCup,
  CurvedArrow,
  Headphones,
  Lightbulb,
  Sparkle,
  TagBubble,
} from './graphics/doodles'

/**
 * Landing section.
 *
 * Layers, back to front:
 *   0  ground and faint line art       HeroBackground
 *  10  flank photo scatter             FrameCluster
 *  20  loose doodles                   DoodleGraphic
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

      {/* Loose doodles. Six sit in the gutters between the frames and the copy,
          two of them drifting. Placement is hand-set rather than generated: they
          have to miss the frames and the headline at every breakpoint. */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden text-cream md:block">
        <DoodleGraphic
          top={19}
          left={23}
          rotate={-12}
          delay={320}
          width="clamp(2.5rem, 3.6vw, 3.75rem)"
          className="pointer-events-auto text-signal"
          drift
        >
          <Lightbulb className="w-full" />
        </DoodleGraphic>

        <DoodleGraphic
          top={16}
          right={22}
          rotate={9}
          delay={380}
          width="clamp(3.5rem, 5.5vw, 5.5rem)"
          className="pointer-events-auto"
        >
          <TagBubble label="IDEAS" className="w-full" />
        </DoodleGraphic>

        <DoodleGraphic
          top={72}
          left={21}
          rotate={7}
          delay={440}
          width="clamp(3.5rem, 5.5vw, 5.5rem)"
          className="pointer-events-auto"
        >
          <TagBubble label="BUILD" className="w-full" />
        </DoodleGraphic>

        <DoodleGraphic
          top={69}
          right={20}
          rotate={-8}
          delay={500}
          width="clamp(2.75rem, 4vw, 4.25rem)"
          className="pointer-events-auto"
          drift
        >
          <CoffeeCup className="w-full" />
        </DoodleGraphic>

        <DoodleGraphic
          top={40}
          right={17}
          rotate={11}
          delay={560}
          width="clamp(3rem, 4.5vw, 4.75rem)"
          className="pointer-events-auto"
        >
          <Headphones className="w-full" />
        </DoodleGraphic>

        <DoodleGraphic
          top={44}
          left={18}
          rotate={-14}
          delay={620}
          width="clamp(2.25rem, 3.2vw, 3.25rem)"
          className="pointer-events-auto"
        >
          <CurvedArrow className="w-full" />
        </DoodleGraphic>

        <DoodleGraphic
          top={28}
          left={44}
          rotate={0}
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
