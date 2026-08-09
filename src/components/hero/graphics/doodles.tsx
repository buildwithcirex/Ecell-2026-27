/**
 * Hand-drawn foreground doodles.
 *
 * All line art, no fills except the sparkle, drawn on `currentColor` so a parent
 * sets the colour. Each takes a `className` for sizing and nothing else:
 * position, rotation and animation belong to `DoodleGraphic`.
 *
 * Every one is decorative, so the wrapper marks them `aria-hidden`. They carry
 * no `title` and contribute nothing to the accessibility tree.
 */

export interface DoodleProps {
  className?: string
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

// The viewBox opens above and beside the origin so the rays are not clipped.
export function Lightbulb({ className }: DoodleProps) {
  return (
    <svg viewBox="-2 -4 52 62" className={className} {...stroke}>
      <path d="M24 4c-8.4 0-15 6.3-15 14.2 0 5 2.4 8.4 5 11.4 2 2.3 3.2 4 3.5 6.4h13c.3-2.4 1.5-4.1 3.5-6.4 2.6-3 5-6.4 5-11.4C39 10.3 32.4 4 24 4Z" />
      <path d="M17.5 42.5h13M19 48.5h10" />
      <path d="M24 22v14" />
      <path d="M24 22l-4-4M24 22l4-4" />
      <path d="M43.5 8.5 47 5M4.5 8.5 1 5M24 1V-2" opacity="0.75" />
    </svg>
  )
}

// Same here: the steam curls above the lid, so the viewBox starts at -4.
export function CoffeeCup({ className }: DoodleProps) {
  return (
    <svg viewBox="0 -4 44 62" className={className} {...stroke}>
      {/* Lid */}
      <path d="M5 14.5 6.5 9c.3-1.2 1.4-2 2.7-2h25.6c1.3 0 2.4.8 2.7 2l1.5 5.5c.2.9-.4 1.7-1.3 1.7H6.3c-.9 0-1.5-.8-1.3-1.7Z" />
      {/* Body, tapering */}
      <path d="M7.5 16.5 11 52c.2 1.7 1.6 3 3.3 3h15.4c1.7 0 3.1-1.3 3.3-3l3.5-35.5" />
      {/* Sleeve */}
      <path d="M9.2 27h25.6M10.6 40h22.8" />
      {/* Steam */}
      <path
        d="M17 2.5c-1.6-2 .4-3.6 0-5M22.5 1.5c-1.6-2 .4-3.6 0-5M28 2.5c-1.6-2 .4-3.6 0-5"
        opacity="0.7"
      />
    </svg>
  )
}

export function Headphones({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 48" className={className} {...stroke}>
      {/* Headband */}
      <path d="M7 33V25C7 12.3 17.3 2 30 2s23 10.3 23 23v8" />
      {/* Ear cups */}
      <path d="M7 27h4.5c1.9 0 3.5 1.6 3.5 3.5v10c0 1.9-1.6 3.5-3.5 3.5H7c-2.8 0-5-2.2-5-5v-7c0-2.8 2.2-5 5-5Z" />
      <path d="M53 27h-4.5c-1.9 0-3.5 1.6-3.5 3.5v10c0 1.9 1.6 3.5 3.5 3.5H53c2.8 0 5-2.2 5-5v-7c0-2.8-2.2-5-5-5Z" />
    </svg>
  )
}

export function Sparkle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0.5c.7 6.2 4.8 10.4 11 11.1-6.2.7-10.3 4.9-11 11.1-.7-6.2-4.8-10.4-11-11.1 6.2-.7 10.3-4.9 11-11.1Z" />
    </svg>
  )
}

export function CurvedArrow({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 44 32" className={className} {...stroke}>
      <path d="M2 29C4.5 14 14 5 33 3.5" />
      <path d="M25.5 1 34 3.4 30 11" />
    </svg>
  )
}

export function CodeBrackets({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 52 32" className={className} {...stroke}>
      <path d="M15 5 3 16l12 11" />
      <path d="M37 5l12 11-12 11" />
      <path d="M30 3 22 29" />
    </svg>
  )
}

export interface TagBubbleProps extends DoodleProps {
  /** Short, uppercase. Long strings will overflow the bubble. */
  label: string
}

/**
 * Hand-drawn speech bubble with a word in it.
 *
 * The text is SVG `<text>` rather than an HTML overlay so it scales with the
 * bubble instead of needing a matching font-size at every breakpoint.
 */
export function TagBubble({ label, className }: TagBubbleProps) {
  return (
    <svg viewBox="0 0 124 50" className={className}>
      <path
        d="M6 13c0-6 4.6-9.4 11-9.4l84.5.8c6.4 0 11.5 3.7 11.5 9.6l-.4 15.6c0 6-4.7 9.5-11 9.5l-56.8-.4-11.6 7.6 3.2-7.6-11.4-.4c-6.4 0-11.4-3.6-11.4-9.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <text
        x="61"
        y="22"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        fontFamily="var(--font-display)"
        fontSize="17"
        fontWeight="700"
        letterSpacing="0.06em"
      >
        {label}
      </text>
    </svg>
  )
}
