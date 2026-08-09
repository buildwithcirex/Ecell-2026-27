import type { DoodleProps } from './doodles'

/**
 * Stand-in for the `landing-end` graphic: a character peeking over the torn
 * paper edge, in the spirit of the reference.
 *
 * There is no `landing-end` file in this repository or its git history, so this
 * is deliberately simple and generic rather than an attempt to guess at the real
 * artwork. It is drawn in the same line weight as the rest of the doodles so it
 * does not look imported from somewhere else.
 *
 * `currentColor` fills the body; `--color-paper` picks out the face so it reads
 * against the paper it sits on.
 */
export function LandingEndCharacter({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 92" className={className} fill="none">
      {/* Ears */}
      <path
        d="M33 54c-8-9-8-18-2-21 6-3 13 2 16 10ZM87 54c8-9 8-18 2-21-6-3-13 2-16 10Z"
        fill="currentColor"
      />

      {/* Head */}
      <path
        d="M60 40c-21 0-34 15-34 34v18h68V74c0-19-13-34-34-34Z"
        fill="currentColor"
      />

      {/* Face patch */}
      <path
        d="M60 56c-11 0-19 7-19 15 0 6 4 10 10 11h18c6-1 10-5 10-11 0-8-8-15-19-15Z"
        fill="var(--color-paper)"
      />

      {/* Eyes */}
      <circle cx="51" cy="69" r="4" fill="currentColor" />
      <circle cx="69" cy="69" r="4" fill="currentColor" />

      {/* Snout */}
      <path
        d="M60 76c-3 0-5 1.6-5 3.5S57 83 60 83s5-1.6 5-3.5S63 76 60 76Z"
        fill="currentColor"
      />

      {/* Paws gripping the tear */}
      <path
        d="M20 78c-5 0-9 3.4-9 7.6V92h20v-6.4c0-4.2-4-7.6-9-7.6ZM100 78c5 0 9 3.4 9 7.6V92H89v-6.4c0-4.2 4-7.6 9-7.6Z"
        fill="currentColor"
      />
    </svg>
  )
}
