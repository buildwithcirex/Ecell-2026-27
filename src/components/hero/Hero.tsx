import { heroStickers } from '@/content/hero-graphics'
import { WetPaintButton } from '@/components/ui/wet-paint-button'
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
 *  10  torn paper edge                 PaperTear
 *  20  flank photo scatter             FrameCluster
 *  30  loose stickers                  DoodleGraphic
 *  40  centre column                   headline, description, CTA
 *
 * The tear paints under the frames so the bottom photos lie over the paper
 * rather than being cut off by it. The centre column stays on top of
 * everything: a frame growing on hover must never cover the copy. That holds
 * even though a hovered frame raises its own `z-index`, because FrameCluster's
 * own `z-20` boxes that in to a local stacking context.
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

      {/* Six stickers plus one drawn accent.

          Held back until `lg`, not `md`. The copy column is capped at 46ch, so
          on a 768px tablet it spans almost the full width and the side gutters
          are narrower than a sticker: every placement measured as an overlap on
          the headline or the description. At 1024 the gutters are wide enough
          for them to sit clear. */}
      <div className="pointer-events-none absolute inset-0 z-30 hidden lg:block">
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
          top={16}
          left={40}
          delay={680}
          width="clamp(0.9rem, 1.3vw, 1.4rem)"
          className="pointer-events-auto text-signal"
        >
          <Sparkle className="w-full" />
        </DoodleGraphic>
      </div>

      {/* The narrow layout keeps two of the stickers, placed in the bands above
          the headline and below the CTA. Under `lg` those are the only strips
          of ground the copy leaves clear, so this is a separate layer rather
          than the same one repositioned. */}
      <div className="pointer-events-none absolute inset-0 z-30 lg:hidden">
        {heroStickers
          .filter((sticker) => sticker.narrow)
          .map((sticker) => (
            <DoodleGraphic
              key={sticker.id}
              top={sticker.narrow!.top}
              left={sticker.narrow!.left}
              right={sticker.narrow!.right}
              rotate={sticker.rotate}
              delay={sticker.delay}
              width={sticker.narrow!.width_css}
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
      </div>

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

        <p className="hero-rise mt-6 max-w-[46ch] font-body text-base leading-relaxed text-steel sm:mt-7 sm:text-lg">
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
