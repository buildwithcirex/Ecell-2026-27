import type { HeroSticker } from './hero-graphics'

import amongus from '@/assets/footer/amongus-cut.webp'
import blackhole from '@/assets/footer/blackhole.png'
import totem from '@/assets/footer/totem.png'
import computer from '@/assets/footer/computer-cut.webp'

export const footerStickers: readonly HeroSticker[] = [
  {
    id: 'footer-amongus',
    src: amongus,
    width: 360,
    height: 360,
    top: 55,
    left: 2,
    rotate: -10,
    delay: 200,
    width_css: 'clamp(5rem, 8vw, 8.5rem)',
    drift: true,
    narrow: { top: 15, left: 5, width_css: 'clamp(4.5rem, 12vw, 6rem)' },
  },
  {
    id: 'footer-totem',
    src: totem,
    width: 360,
    height: 360,
    top: 45,
    right: 5,
    rotate: 15,
    delay: 350,
    width_css: 'clamp(4.5rem, 7.5vw, 8rem)',
  },
  {
    id: 'footer-computer',
    src: computer,
    width: 360,
    height: 360,
    top: 15,
    right: 35,
    rotate: 5,
    delay: 500,
    width_css: 'clamp(4.5rem, 7vw, 7.5rem)',
    drift: true,
    narrow: { top: 25, right: 15, width_css: 'clamp(4rem, 10vw, 5rem)' },
  },
  {
    id: 'footer-blackhole',
    src: blackhole,
    width: 360,
    height: 360,
    top: 20,
    right: 2,
    rotate: -5,
    delay: 450,
    width_css: 'clamp(5.5rem, 9vw, 9.5rem)',
  },
]
