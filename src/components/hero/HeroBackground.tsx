import {
  CircuitBoard,
  GrowthChart,
  Notebook,
  Rocket,
  Target,
} from './graphics/backdrop'
import {
  CodeBrackets,
  CoffeeCup,
  CurvedArrow,
  Lightbulb,
  Sparkle,
} from './graphics/doodles'

/**
 * The hero ground: a blue radial wash with faint line art drawn over it.
 *
 * Both layers are inert. They take no pointer events and are hidden from the
 * accessibility tree, so nothing here competes with the centre column.
 *
 * The wash is a single `radial-gradient` rather than a stack: one paint, no
 * blend modes, and the whole thing composites on the GPU as one layer.
 */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 95% 75% at 50% 82%, var(--color-hero-bright) 0%, var(--color-hero-blue) 38%, var(--color-hero-mid) 72%, var(--color-hero-deep) 100%)',
        }}
      />

      {/* Line art. Positioned in percentages so it tracks the viewport instead
          of jumping at each breakpoint, and kept faint enough that it never
          competes with the headline sitting on top of it. */}
      <div className="absolute inset-0 text-cream">
        <CircuitBoard className="absolute top-[36%] left-[52%] w-[34vw] opacity-9" />
        <Notebook className="absolute top-[46%] left-[24%] w-[13vw] opacity-10" />
        <CoffeeCup className="absolute top-[52%] left-[41%] w-[9vw] opacity-11" />
        <Lightbulb className="absolute top-[30%] left-[36%] hidden w-[6vw] opacity-9 md:block" />
        <CurvedArrow className="absolute top-[24%] left-[27%] hidden w-[7vw] opacity-10 md:block" />
        <CurvedArrow className="absolute top-[64%] left-[63%] hidden w-[6vw] -scale-x-100 opacity-10 md:block" />
        <CodeBrackets className="absolute top-[14%] left-[19%] hidden w-[7vw] opacity-9 lg:block" />
        <Sparkle className="absolute top-[20%] left-[68%] hidden w-[2.4vw] opacity-12 md:block" />
        <Sparkle className="absolute top-[70%] left-[31%] hidden w-[1.8vw] opacity-12 lg:block" />

        {/* Three more marks so the ground is not empty between the flanks and
            the copy. Each is anchored to a band the frames do not reach. */}
        <Rocket className="absolute top-[58%] left-[59%] hidden w-[7vw] opacity-10 md:block" />
        <Target className="absolute top-[16%] left-[45%] hidden w-[9vw] opacity-8 lg:block" />
        <GrowthChart className="absolute top-[74%] left-[44%] hidden w-[11vw] opacity-9 md:block" />
      </div>
    </div>
  )
}
