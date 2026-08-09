/**
 * Large background line art.
 *
 * These two are too detailed to work as small foreground doodles, so they exist
 * only for the faint layer behind the hero. Everything else in that layer is a
 * foreground doodle reused at a larger size and lower opacity, which keeps the
 * whole section drawn in one hand.
 */

import type { DoodleProps } from './doodles'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export function CircuitBoard({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 164" className={className} {...stroke}>
      {/* Die */}
      <rect x="72" y="58" width="56" height="48" rx="3" />
      <rect x="84" y="70" width="32" height="24" rx="2" opacity="0.6" />

      {/* Pins */}
      <path d="M82 58v-9M94 58v-9M106 58v-9M118 58v-9" />
      <path d="M82 106v9M94 106v9M106 106v9M118 106v9" />
      <path d="M72 68h-9M72 80h-9M72 92h-9" />
      <path d="M128 68h9M128 80h9M128 92h9" />

      {/* Traces, right-angle bends only, the way a board is actually routed */}
      <path d="M137 68h22v-32h26" />
      <path d="M137 80h34v46h22" />
      <path d="M63 80H41V38H17" />
      <path d="M63 92H33v42H9" />
      <path d="M82 49V27H50" />
      <path d="M118 115v22h34" />

      {/* Vias */}
      <circle cx="185" cy="36" r="4" />
      <circle cx="193" cy="126" r="4" />
      <circle cx="17" cy="38" r="4" />
      <circle cx="9" cy="134" r="4" />
      <circle cx="50" cy="27" r="4" />
      <circle cx="152" cy="137" r="4" />
    </svg>
  )
}

export function Rocket({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 96 132" className={className} {...stroke}>
      {/* Body */}
      <path d="M48 4c13 12 20 28 20 46v34H28V50C28 32 35 16 48 4Z" />
      {/* Fins */}
      <path d="M28 58 12 74v26l16-12ZM68 58l16 16v26L68 88Z" />
      {/* Window */}
      <circle cx="48" cy="46" r="10" />
      {/* Exhaust */}
      <path d="M38 92c3 8 6 14 10 22 4-8 7-14 10-22" />
      <path d="M44 96c1 6 2 10 4 15 2-5 3-9 4-15" opacity="0.6" />
    </svg>
  )
}

export function Target({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 116 116" className={className} {...stroke}>
      <circle cx="54" cy="62" r="46" />
      <circle cx="54" cy="62" r="30" />
      <circle cx="54" cy="62" r="14" />
      {/* Arrow struck slightly off centre, because a dead-centre hit reads as
          a logo rather than a drawing. */}
      <path d="M62 54 108 8" />
      <path d="M94 8h14v14" />
      <path d="m62 54-9 3 3-9" />
    </svg>
  )
}

export function GrowthChart({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 140 108" className={className} {...stroke}>
      {/* Axes */}
      <path d="M14 6v92h122" />
      {/* Bars of increasing height */}
      <path d="M34 98V74M60 98V56M86 98V62M112 98V32" />
      {/* Trend line with a node at each bar */}
      <path d="m30 82 26-24 26 8 30-32" opacity="0.75" />
      <circle cx="30" cy="82" r="4" />
      <circle cx="56" cy="58" r="4" />
      <circle cx="82" cy="66" r="4" />
      <circle cx="112" cy="34" r="4" />
    </svg>
  )
}

export function Notebook({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 140 168" className={className} {...stroke}>
      {/* Page */}
      <path d="M14 26h112c3.3 0 6 2.7 6 6v122c0 3.3-2.7 6-6 6H14c-3.3 0-6-2.7-6-6V32c0-3.3 2.7-6 6-6Z" />

      {/* Spiral binding */}
      <path d="M28 30V14M50 30V14M72 30V14M94 30V14M116 30V14" />
      <path d="M24 20a6 5 0 0 1 8 0M46 20a6 5 0 0 1 8 0M68 20a6 5 0 0 1 8 0M90 20a6 5 0 0 1 8 0M112 20a6 5 0 0 1 8 0" />

      {/* Checklist */}
      <rect x="22" y="52" width="14" height="14" rx="2" />
      <path d="M25 59l3.5 3.5L34 55" />
      <path d="M46 59h58" />

      <rect x="22" y="86" width="14" height="14" rx="2" />
      <path d="M25 93l3.5 3.5L34 89" />
      <path d="M46 93h44" />

      <rect x="22" y="120" width="14" height="14" rx="2" />
      <path d="M46 127h52" />
    </svg>
  )
}
