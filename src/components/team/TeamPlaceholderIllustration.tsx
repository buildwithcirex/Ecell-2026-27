import { useId } from 'react'

interface PlaceholderProps {
  id: string
  name?: string
  role?: string
  seedIndex?: number
  customColor?: string
}

/**
 * Vibrant background palette inspired by FlowFest's warm pop colors.
 */
const VIBRANT_PALETTES = [
  { bg: '#f0bb0d', shadow: '#c49704', accent: '#ffe066' }, // FlowFest Golden Yellow
  { bg: '#ea5283', shadow: '#b9325e', accent: '#ff8fb4' }, // FlowFest Hot Pink
  { bg: '#f97028', shadow: '#c94f10', accent: '#ffaa75' }, // FlowFest Bright Orange
  { bg: '#38bdf8', shadow: '#0284c7', accent: '#bae6fd' }, // Sky Cyan
  { bg: '#a855f7', shadow: '#7e22ce', accent: '#e9d5ff' }, // Electric Purple
  { bg: '#34d399', shadow: '#059669', accent: '#a7f3d0' }, // Mint Green
  { bg: '#fb7185', shadow: '#e11d48', accent: '#fecdd3' }, // Coral Red
  { bg: '#818cf8', shadow: '#4f46e5', accent: '#c7d2fe' }, // Indigo
] as const

/**
 * Stable color picker so each member gets a consistent palette across renders.
 */
function getPalette(id: string, index = 0) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 37 + id.charCodeAt(i)) >>> 0
  return VIBRANT_PALETTES[(hash + index) % VIBRANT_PALETTES.length]
}

/**
 * 4 distinct avatar silhouettes with hand-drawn comic/sticker contour
 * outlines matching the exact FlowFest speaker graphic style.
 */
export function TeamPlaceholderIllustration({
  id,
  seedIndex = 0,
  customColor,
}: PlaceholderProps) {
  const uniqueId = useId()
  const palette = customColor
    ? { bg: customColor, shadow: 'rgba(0,0,0,0.22)', accent: '#ffffff' }
    : getPalette(id, seedIndex)

  // Pick variant 0..3 based on id hash
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 17 + id.charCodeAt(i)) >>> 0
  const variant = (hash + seedIndex) % 4


  return (
    <div
      className="relative h-full w-full select-none overflow-hidden"
      style={{ backgroundColor: palette.bg }}
    >
      <svg
        viewBox="0 0 400 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full object-cover"
      >
        <defs>
          <clipPath id={`clip-${uniqueId}`}>
            <rect width="400" height="450" />
          </clipPath>
        </defs>

        <g clipPath={`url(#clip-${uniqueId})`}>
          {/* Outer silhouette shadow (offset right/bottom) */}
          <path
            d="M200 45 C150 45 110 85 105 155 C90 190 75 220 50 260 C30 295 20 345 20 450 L380 450 C380 345 370 295 350 260 C325 220 310 190 295 155 C290 85 250 45 200 45 Z"
            fill={palette.shadow}
            transform="translate(14, 14)"
          />

          {/* Outer hand-drawn silhouette contour stroke (FlowFest comic sticker outline) */}
          <path
            d="M200 45 C150 45 110 85 105 155 C90 190 75 220 50 260 C30 295 20 345 20 450 L380 450 C380 345 370 295 350 260 C325 220 310 190 295 155 C290 85 250 45 200 45 Z"
            fill="none"
            stroke="#121212"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Torso & shoulders */}
          <path
            d="M75 450 C75 350 115 290 150 280 L250 280 C285 290 325 350 325 450 Z"
            fill="#121212"
          />

          {/* Collar detail */}
          <path
            d="M170 280 C170 305 230 305 230 280"
            stroke="#fffefb"
            strokeWidth="3"
            fill="none"
          />

          {/* Neck */}
          <rect x="175" y="220" width="50" height="65" fill="#f8d3b8" />
          <path
            d="M175 220 L175 285 L225 285 L225 220 Z"
            stroke="#121212"
            strokeWidth="3"
            fill="none"
          />

          {/* Variant 0: Stylish developer with glasses and slight smirk */}
          {variant === 0 && (
            <g>
              {/* Head */}
              <ellipse cx="200" cy="170" rx="60" ry="70" fill="#f8d3b8" />
              {/* Hair */}
              <path
                d="M135 155 C135 100 160 85 200 85 C240 85 265 100 265 155 C255 125 240 110 200 110 C160 110 145 125 135 155 Z"
                fill="#121212"
              />
              {/* Glasses frame */}
              <rect
                x="152"
                y="145"
                width="38"
                height="28"
                rx="6"
                fill="rgba(255,255,255,0.4)"
                stroke="#121212"
                strokeWidth="3.5"
              />
              <rect
                x="210"
                y="145"
                width="38"
                height="28"
                rx="6"
                fill="rgba(255,255,255,0.4)"
                stroke="#121212"
                strokeWidth="3.5"
              />
              <line x1="190" y1="156" x2="210" y2="156" stroke="#121212" strokeWidth="3.5" />
              {/* Eyes */}
              <circle cx="171" cy="159" r="3.5" fill="#121212" />
              <circle cx="229" cy="159" r="3.5" fill="#121212" />
              {/* Smile */}
              <path
                d="M185 195 Q200 208 215 195"
                stroke="#121212"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* Variant 1: Creator with headphones */}
          {variant === 1 && (
            <g>
              {/* Head */}
              <ellipse cx="200" cy="170" rx="58" ry="68" fill="#fad7bd" />
              {/* Messy curly hair */}
              <path
                d="M136 150 C130 95 165 80 200 80 C235 80 270 95 264 150 C250 115 235 105 200 105 C165 105 150 115 136 150 Z"
                fill="#2c2825"
              />
              {/* Headphones band */}
              <path
                d="M130 170 C130 95 270 95 270 170"
                stroke="#121212"
                strokeWidth="8"
                fill="none"
              />
              {/* Ear cups */}
              <rect
                x="124"
                y="150"
                width="14"
                height="38"
                rx="7"
                fill="#f97028"
                stroke="#121212"
                strokeWidth="2.5"
              />
              <rect
                x="262"
                y="150"
                width="14"
                height="38"
                rx="7"
                fill="#f97028"
                stroke="#121212"
                strokeWidth="2.5"
              />
              {/* Eyes */}
              <ellipse cx="175" cy="162" rx="3.5" ry="4" fill="#121212" />
              <ellipse cx="225" cy="162" rx="3.5" ry="4" fill="#121212" />
              {/* Smile */}
              <path
                d="M188 195 Q200 205 212 195"
                stroke="#121212"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* Variant 2: Cool shades & cap */}
          {variant === 2 && (
            <g>
              {/* Head */}
              <ellipse cx="200" cy="175" rx="58" ry="66" fill="#f0cbb0" />
              {/* Cap base & visor */}
              <path
                d="M140 135 C140 95 260 95 260 135 Z"
                fill="#121212"
              />
              <path
                d="M130 135 C170 130 230 130 270 135 L260 148 C220 142 180 142 140 148 Z"
                fill="#2b2b2b"
              />
              {/* Sunglasses */}
              <path
                d="M150 152 L192 152 L186 176 L156 176 Z"
                fill="#121212"
              />
              <path
                d="M208 152 L250 152 L244 176 L214 176 Z"
                fill="#121212"
              />
              <line x1="192" y1="156" x2="208" y2="156" stroke="#121212" strokeWidth="3" />
              {/* Smile */}
              <path
                d="M186 198 Q200 210 214 198"
                stroke="#121212"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* Variant 3: Long hair & friendly expression */}
          {variant === 3 && (
            <g>
              {/* Back hair */}
              <path
                d="M125 150 C110 240 115 310 135 340 L160 340 C145 280 140 220 145 150 Z"
                fill="#1f1b18"
              />
              <path
                d="M275 150 C290 240 285 310 265 340 L240 340 C255 280 260 220 255 150 Z"
                fill="#1f1b18"
              />
              {/* Head */}
              <ellipse cx="200" cy="170" rx="56" ry="68" fill="#f8d4bb" />
              {/* Hair top & bangs */}
              <path
                d="M135 155 C135 90 170 75 200 75 C230 75 265 90 265 155 C245 115 225 110 200 115 C175 110 155 115 135 155 Z"
                fill="#1f1b18"
              />
              {/* Round wire glasses */}
              <circle
                cx="173"
                cy="162"
                r="16"
                fill="rgba(255,255,255,0.4)"
                stroke="#121212"
                strokeWidth="2.5"
              />
              <circle
                cx="227"
                cy="162"
                r="16"
                fill="rgba(255,255,255,0.4)"
                stroke="#121212"
                strokeWidth="2.5"
              />
              <line x1="189" y1="162" x2="211" y2="162" stroke="#121212" strokeWidth="2.5" />
              {/* Eyes */}
              <circle cx="173" cy="162" r="3" fill="#121212" />
              <circle cx="227" cy="162" r="3" fill="#121212" />
              {/* Smile */}
              <path
                d="M188 198 Q200 208 212 198"
                stroke="#121212"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* Collar / neckline accent */}
          <path
            d="M175 285 C185 305 215 305 225 285"
            stroke="#fffefb"
            strokeWidth="2.5"
            fill="none"
          />
        </g>
      </svg>
    </div>
  )
}
