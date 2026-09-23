/**
 * Team face cutouts for the Strange Family-inspired interactive footer canvas.
 *
 * Slots 1-10 use existing transparent cutout PNGs from `src/assets/team/`.
 * Slots 11-23 use styled SVG cutout stickers as placeholders.
 *
 * To insert a real face cutout:
 * 1. Drop your PNG image into `src/assets/team/`
 * 2. Import it at the top of this file
 * 3. Replace the `image` field in the corresponding item
 */

import secretaryImg from '@/assets/team/secretary.png'
import webDevHeadImg from '@/assets/team/web-dev-head.png'
import cyberHeadImg from '@/assets/team/cyber-head.png'
import devopsCoheadImg from '@/assets/team/devops-cohead.png'
import eventHeadImg from '@/assets/team/event-head.png'
import eventsCohead1Img from '@/assets/team/events-cohead-1.png'
import hospitalityHeadImg from '@/assets/team/hospitality-head.png'
import volunteeringHeadImg from '@/assets/team/volunteering-head.png'
import aimlCoheadImg from '@/assets/team/ai-ml-cohead.png'
import webDevCoheadImg from '@/assets/team/web-dev-cohead.png'

export interface FooterFaceItem {
  readonly id: string
  readonly name: string
  readonly role: string
  readonly image: string
}

/** Helper to generate clean, stylized big sticker SVG cutouts without cheap text badges */
function makeDummyFaceSvg(color: string, expression: number): string {
  // Variations in avatar expressions/features
  const eyes = expression % 2 === 0
    ? '<circle cx="88" cy="95" r="7" fill="#111827"/><circle cx="152" cy="95" r="7" fill="#111827"/>'
    : '<path d="M80 95 Q88 88 96 95" stroke="#111827" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M144 95 Q152 88 160 95" stroke="#111827" stroke-width="4" fill="none" stroke-linecap="round"/>'

  const mouth = expression % 3 === 0
    ? '<path d="M102 128 Q120 144 138 128" stroke="#111827" stroke-width="4" fill="none" stroke-linecap="round"/>'
    : '<path d="M106 130 H134" stroke="#111827" stroke-width="4" stroke-linecap="round"/>'

  const hair = expression % 2 === 0
    ? '<path d="M60 90 C 60 40, 180 40, 180 90 C 190 70, 170 30, 120 30 C 70 30, 50 70, 60 90 Z" fill="#1e293b"/>'
    : '<path d="M55 95 C 55 35, 185 35, 185 95 C 195 50, 175 25, 120 25 C 65 25, 45 50, 55 95 Z" fill="#0f172a"/>'

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
    <g>
      <!-- Big physical cutout sticker border -->
      <circle cx="120" cy="120" r="105" fill="${color}" stroke="#ffffff" stroke-width="6"/>
      ${hair}
      <!-- Face shape -->
      <circle cx="120" cy="112" r="54" fill="#fed7aa"/>
      ${eyes}
      <!-- Cheeks -->
      <circle cx="78" cy="112" r="8" fill="#f43f5e" opacity="0.4"/>
      <circle cx="162" cy="112" r="8" fill="#f43f5e" opacity="0.4"/>
      ${mouth}
      <!-- Shoulders/Collar -->
      <path d="M55 215 C 55 168, 185 168, 185 215 Z" fill="#ffffff" opacity="0.95"/>
      <path d="M104 166 L120 188 L136 166 Z" fill="#1e293b"/>
    </g>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const FOOTER_FACES: readonly FooterFaceItem[] = [
  // 1-10: Existing cutout assets
  {
    id: 'face-1',
    name: 'Secretary',
    role: 'Secretary',
    image: secretaryImg,
  },
  {
    id: 'face-2',
    name: 'Web Dev Head',
    role: 'Web Dev Head',
    image: webDevHeadImg,
  },
  {
    id: 'face-3',
    name: 'Cybersecurity Head',
    role: 'Cyber Head',
    image: cyberHeadImg,
  },
  {
    id: 'face-4',
    name: 'DevOps Co-Head',
    role: 'DevOps Co-Head',
    image: devopsCoheadImg,
  },
  {
    id: 'face-5',
    name: 'Event Head',
    role: 'Event Head',
    image: eventHeadImg,
  },
  {
    id: 'face-6',
    name: 'Events Co-Head',
    role: 'Events Co-Head',
    image: eventsCohead1Img,
  },
  {
    id: 'face-7',
    name: 'Hospitality Head',
    role: 'Hospitality Head',
    image: hospitalityHeadImg,
  },
  {
    id: 'face-8',
    name: 'Volunteering Head',
    role: 'Volunteering Head',
    image: volunteeringHeadImg,
  },
  {
    id: 'face-9',
    name: 'AI/ML Co-Head',
    role: 'AI/ML Co-Head',
    image: aimlCoheadImg,
  },
  {
    id: 'face-10',
    name: 'Web Dev Co-Head',
    role: 'Web Dev Co-Head',
    image: webDevCoheadImg,
  },
  // 11-23: Big dummy cutouts ready for manual replacement
  {
    id: 'face-11',
    name: 'Member 11',
    role: 'Core Member',
    image: makeDummyFaceSvg('#f97316', 1),
  },
  {
    id: 'face-12',
    name: 'Member 12',
    role: 'Core Member',
    image: makeDummyFaceSvg('#3b82f6', 2),
  },
  {
    id: 'face-13',
    name: 'Member 13',
    role: 'Core Member',
    image: makeDummyFaceSvg('#ec4899', 3),
  },
  {
    id: 'face-14',
    name: 'Member 14',
    role: 'Core Member',
    image: makeDummyFaceSvg('#eab308', 4),
  },
  {
    id: 'face-15',
    name: 'Member 15',
    role: 'Core Member',
    image: makeDummyFaceSvg('#8b5cf6', 5),
  },
  {
    id: 'face-16',
    name: 'Member 16',
    role: 'Core Member',
    image: makeDummyFaceSvg('#10b981', 6),
  },
  {
    id: 'face-17',
    name: 'Member 17',
    role: 'Core Member',
    image: makeDummyFaceSvg('#14b8a6', 7),
  },
  {
    id: 'face-18',
    name: 'Member 18',
    role: 'Core Member',
    image: makeDummyFaceSvg('#6366f1', 8),
  },
  {
    id: 'face-19',
    name: 'Member 19',
    role: 'Core Member',
    image: makeDummyFaceSvg('#06b6d4', 9),
  },
  {
    id: 'face-20',
    name: 'Member 20',
    role: 'Core Member',
    image: makeDummyFaceSvg('#f43f5e', 10),
  },
  {
    id: 'face-21',
    name: 'Member 21',
    role: 'Core Member',
    image: makeDummyFaceSvg('#d97706', 11),
  },
  {
    id: 'face-22',
    name: 'Member 22',
    role: 'Core Member',
    image: makeDummyFaceSvg('#2563eb', 12),
  },
  {
    id: 'face-23',
    name: 'Member 23',
    role: 'Core Member',
    image: makeDummyFaceSvg('#059669', 13),
  },
]
