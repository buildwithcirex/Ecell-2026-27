import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Site-wide smooth scroll.
 *
 * Mounted once. Renders nothing.
 *
 * Two things worth being explicit about:
 *
 *   1. Under `prefers-reduced-motion` Lenis is never constructed at all. Hijacked
 *      scrolling is exactly what that setting exists to opt out of, so disabling
 *      it after the fact is not good enough.
 *   2. The rAF handle is captured in a local and cancelled on cleanup. An
 *      uncancelled loop survives unmount and, under StrictMode's double-invoke in
 *      development, you end up with two loops driving one destroyed instance.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) return

    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}
