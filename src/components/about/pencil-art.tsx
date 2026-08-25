/**
 * Graphite illustrations for the paper section.
 *
 * All of it is line art on `currentColor`, so a parent sets the graphite value.
 * Nothing here is filled except the pin, which has to read as an object sitting
 * on top of the paper rather than a drawing on it.
 *
 * `PencilDefs` must be mounted once inside the section. It carries the filter
 * that gives every stroke its hand-drawn wobble: a fractal noise field pushed
 * through a displacement map, which nudges each point of the path by a pixel or
 * two. That single filter is what separates "pencil" from "vector icon", and it
 * is cheaper than drawing the irregularity into the path data by hand.
 *
 * The filter is applied to the SVGs, never to their animated wrapper. A filter
 * on a moving element re-rasterises every frame; on a static child it is
 * computed once and the wrapper just transforms the cached result.
 */

export interface ArtProps {
  className?: string
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** Mount once per section. Renders nothing visible. */
export function PencilDefs() {
  return (
    <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0">
      <defs>
        <filter id="paper-pencil" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.045"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}

const pencil = { filter: 'url(#paper-pencil)' } as const

/* ------------------------------------------------------------------ */
/* Background marks, scattered across the paper                        */
/* ------------------------------------------------------------------ */

export function PencilBulb({ className }: ArtProps) {
  return (
    <svg viewBox="-4 -6 64 76" className={className} style={pencil} {...stroke}>
      <path d="M28 4C16.4 4 7 12.9 7 23.9c0 6.9 3.4 11.6 7 15.8 2.8 3.2 4.5 5.5 4.9 8.8h18.2c.4-3.3 2.1-5.6 4.9-8.8 3.6-4.2 7-8.9 7-15.8C49 12.9 39.6 4 28 4Z" />
      <path d="M20 54h16M22 61h12" />
      {/* Filament */}
      <path d="M22 26c2-3 4 3 6 0s4-3 6 0" />
      <path d="M22 26v-3M34 26v-3" />
      {/* Rays */}
      <path d="M52 8 58 2M4 8-2 2M28 0v-6" opacity="0.7" />
    </svg>
  )
}

export function PencilChart({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 88 72" className={className} style={pencil} {...stroke}>
      <path d="M8 4v60h76" />
      <path d="M22 64V44M38 64V30M54 64V38M70 64V16" />
      <path d="m20 40 16-14 16 8 18-22" opacity="0.8" />
      <path d="M62 12h12v12" opacity="0.8" />
    </svg>
  )
}

export function PencilChip({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={pencil} {...stroke}>
      <rect x="20" y="20" width="40" height="40" rx="3" />
      <rect x="31" y="31" width="18" height="18" rx="2" opacity="0.7" />
      <path d="M28 20v-9M40 20v-9M52 20v-9M28 60v9M40 60v9M52 60v9" />
      <path d="M20 28h-9M20 40h-9M20 52h-9M60 28h9M60 40h9M60 52h9" />
    </svg>
  )
}

export function PencilNeuralNet({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 96 80" className={className} style={pencil} {...stroke}>
      {/* Edges first so the nodes sit over them */}
      <path
        d="M18 18 48 12M18 18 48 40M18 18 48 66M18 62 48 12M18 62 48 40M18 62 48 66M48 12 82 40M48 40 82 40M48 66 82 40"
        opacity="0.6"
      />
      <circle cx="18" cy="18" r="6" />
      <circle cx="18" cy="62" r="6" />
      <circle cx="48" cy="12" r="6" />
      <circle cx="48" cy="40" r="6" />
      <circle cx="48" cy="66" r="6" />
      <circle cx="82" cy="40" r="6" />
    </svg>
  )
}

export function PencilGear({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 76 76" className={className} style={pencil} {...stroke}>
      {/* Teeth are drawn thicker than the body, which is what stops the
          silhouette reading as a sun. */}
      <path
        d="M58 38h7M52.1 52.1l5 5M38 58v7M23.9 52.1l-5 5M18 38h-7M23.9 23.9l-5-5M38 18v-7M52.1 23.9l5-5"
        strokeWidth={4.5}
      />
      <circle cx="38" cy="38" r="20" />
      <circle cx="38" cy="38" r="8" opacity="0.7" />
    </svg>
  )
}

export function PencilPaperPlane({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 84 68" className={className} style={pencil} {...stroke}>
      <path d="M4 34 78 6 56 62 40 44Z" />
      <path d="M4 34 40 44M40 44l-1 16 10-12" opacity="0.8" />
      {/* Trail */}
      <path d="M2 52c8 2 14 2 20 0M8 62c6 1 10 1 14 0" opacity="0.5" />
    </svg>
  )
}

export function PencilFlask({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 64 76" className={className} style={pencil} {...stroke}>
      <path d="M25 6v24L8 62c-2 4 1 8 5 8h38c4 0 7-4 5-8L39 30V6" />
      <path d="M21 6h22" />
      <path d="M17 46h30" opacity="0.7" />
      <circle cx="27" cy="56" r="3" opacity="0.7" />
      <circle cx="38" cy="61" r="2" opacity="0.7" />
    </svg>
  )
}

export function PencilScribbleArrow({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 90 54" className={className} style={pencil} {...stroke}>
      <path d="M4 44C16 12 44 2 82 12" />
      <path d="M68 4l16 8-10 14" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* The pin                                                             */
/* ------------------------------------------------------------------ */

/**
 * Push pin, seen slightly from the side.
 *
 * Filled rather than drawn, and deliberately not run through the pencil filter:
 * it is a real object resting on the paper, not something sketched onto it.
 * The graphite shadow underneath is what puts it above the surface.
 */
export function PushPin({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 44 52" className={className} fill="none">
      {/* Contact shadow on the paper */}
      <ellipse cx="22" cy="47" rx="11" ry="3.2" fill="rgb(15 20 30 / 0.22)" />
      {/* Needle */}
      <path
        d="M21.2 30h1.6l-.8 17z"
        fill="var(--color-graphite)"
      />
      {/* Collar */}
      <rect
        x="13"
        y="24"
        width="18"
        height="7"
        rx="3.5"
        fill="var(--color-signal)"
      />
      {/* Head */}
      <ellipse cx="22" cy="16" rx="14" ry="12" fill="var(--color-signal)" />
      {/* Highlight, so it reads as domed plastic */}
      <ellipse cx="17" cy="11" rx="5" ry="3.6" fill="rgb(255 255 255 / 0.5)" />
    </svg>
  )
}

/**
 * Impact marks that flick outward the instant the pin lands.
 *
 * Six short strokes, uneven lengths. Even lengths at even angles read as a
 * loading spinner rather than an impact.
 */
export function PinImpact({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} {...stroke} strokeWidth={2.5}>
      <path d="M30 16V4M44 22l8-8M16 22l-8-8M48 34h9M12 34H4M40 44l6 7" />
    </svg>
  )
}

export function PencilRocket({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 60 84" className={className} style={pencil} {...stroke}>
      <path d="M30 3c9 9 14 20 14 32v22H16V35C16 23 21 12 30 3Z" />
      <path d="M16 40 5 51v18l11-8ZM44 40l11 11v18l-11-8Z" />
      <circle cx="30" cy="31" r="7" />
      <path d="M23 63c2 6 4 11 7 17 3-6 5-11 7-17" opacity="0.8" />
    </svg>
  )
}

export function PencilAtom({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 84 84" className={className} style={pencil} {...stroke}>
      <circle cx="42" cy="42" r="6" />
      <ellipse cx="42" cy="42" rx="38" ry="15" />
      <ellipse cx="42" cy="42" rx="38" ry="15" transform="rotate(60 42 42)" />
      <ellipse cx="42" cy="42" rx="38" ry="15" transform="rotate(120 42 42)" />
    </svg>
  )
}

export function PencilTrophy({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 64 76" className={className} style={pencil} {...stroke}>
      <path d="M16 6h32v22c0 9-7 16-16 16s-16-7-16-16Z" />
      <path d="M16 12H6v6c0 7 5 11 10 11M48 12h10v6c0 7-5 11-10 11" />
      <path d="M32 44v14M20 70h24l-3-12H23Z" />
    </svg>
  )
}

export function PencilMagnifier({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 72 72" className={className} style={pencil} {...stroke}>
      <circle cx="29" cy="29" r="22" />
      <path d="m45 45 22 22" strokeWidth={4} />
      <path d="M21 22a11 11 0 0 1 9-4" opacity="0.7" />
    </svg>
  )
}

export function PencilStopwatch({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 64 76" className={className} style={pencil} {...stroke}>
      <circle cx="32" cy="44" r="26" />
      <path d="M32 44V28M32 44l12 8" />
      <path d="M24 6h16M32 6v12" />
      <path d="m52 20 6-6" opacity="0.8" />
    </svg>
  )
}

export function PencilPlug({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 60 76" className={className} style={pencil} {...stroke}>
      <path d="M18 4v20M42 4v20" />
      <path d="M10 24h40v10c0 11-9 20-20 20s-20-9-20-20Z" />
      <path d="M30 54v18" />
    </svg>
  )
}

export function PencilCoin({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 72 72" className={className} style={pencil} {...stroke}>
      <circle cx="36" cy="36" r="28" />
      <circle cx="36" cy="36" r="21" opacity="0.6" />
      <path d="M28 26h16M28 34h16M40 26c0 8-6 8-12 8l14 14" />
    </svg>
  )
}

export function PencilStickyNote({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 68 68" className={className} style={pencil} {...stroke}>
      <path d="M6 6h56v40L44 62H6Z" />
      <path d="M62 46H44v16" />
      <path d="M16 20h34M16 30h34M16 40h20" opacity="0.7" />
    </svg>
  )
}

export function PencilBrainAI({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={pencil} {...stroke}>
      <path d="M40 12c-8 0-14 5-14 12 0 2 .4 4 1.2 5.8C22 31 18 36 18 42c0 6 4 11 9.5 13C27 58 30 64 38 64h4c8 0 11-6 10.5-9C58 53 62 48 62 42c0-6-4-11-9.2-12.2.8-1.8 1.2-3.8 1.2-5.8 0-7-6-12-14-12Z" />
      <path d="M40 12v52" strokeDasharray="3 3" opacity="0.6" />
      <path d="M28 28c4 3 8 3 12 0M40 40c4 4 8 4 12 0M26 48c4 2 8 2 14 0" opacity="0.7" />
    </svg>
  )
}

export function PencilCodeTerminal({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 80 64" className={className} style={pencil} {...stroke}>
      <rect x="6" y="6" width="68" height="52" rx="4" />
      <path d="M6 18h68" />
      <circle cx="14" cy="12" r="2" fill="currentColor" />
      <circle cx="22" cy="12" r="2" fill="currentColor" />
      <circle cx="30" cy="12" r="2" fill="currentColor" />
      <path d="m18 30 8 7-8 7M32 44h16" strokeWidth={2.5} />
    </svg>
  )
}

export function PencilGraduationCap({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 84 68" className={className} style={pencil} {...stroke}>
      <path d="M42 8 6 26l36 18 36-18Z" />
      <path d="M18 33v18c0 6 11 11 24 11s24-5 24-11V33" />
      <path d="M70 27v24" strokeWidth={2.5} />
      <circle cx="70" cy="53" r="3" />
    </svg>
  )
}

export function PencilCoffeeMug({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 72 72" className={className} style={pencil} {...stroke}>
      <path d="M14 20h38v32c0 8-6 14-14 14h-10c-8 0-14-6-14-14V20Z" />
      <path d="M52 26h8c4 0 7 3 7 7v4c0 4-3 7-7 7h-8" />
      {/* Steam */}
      <path d="M24 12c1-3-1-5 0-8M33 12c1-3-1-5 0-8M42 12c1-3-1-5 0-8" opacity="0.6" />
    </svg>
  )
}

export function PencilSparkles({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={pencil} {...stroke}>
      <path d="M32 6c1 11 7 17 18 18-11 1-17 7-18 18-1-11-7-17-18-18 11-1 17-7 18-18Z" fill="currentColor" opacity="0.15" />
      <path d="M32 6c1 11 7 17 18 18-11 1-17 7-18 18-1-11-7-17-18-18 11-1 17-7 18-18Z" />
      <path d="M12 8c.5 4 2.5 6 6.5 6.5-4 .5-6 2.5-6.5 6.5C11.5 17 9.5 15 5.5 14.5 9.5 14 11.5 12 12 8Z" opacity="0.8" />
      <path d="M50 42c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5Z" opacity="0.7" />
    </svg>
  )
}

