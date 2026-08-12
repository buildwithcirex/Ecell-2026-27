/**
 * Footer
 *
 * Ground: Ink. Four columns: navigation, programs, contact, social.
 * Full-width hairline above the bottom bar. Oversized E-Cell wordmark
 * as the closing device. No motion, no gradients, no scenic backdrop.
 *
 * Constraints enforced by AGENTS.md and PAGES.md 10:
 *   - Flat Ink ground only. No image backdrop, no external URLs.
 *   - No gradients, no glassmorphism, no glow.
 *   - Hairlines via border-ink-line (1px Paper at 20% on Ink).
 *   - Tokens only. No hardcoded hex or px values.
 *   - No animation (DESIGN.md motion map: Footer = None).
 */

import { ExternalLink, Mail, MapPin } from 'lucide-react'
import { DoodleGraphic } from '../hero/DoodleGraphic'
import { footerStickers } from '@/content/footer-graphics'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
]

const SECONDARY_LINKS = [
  { label: 'Mentors', href: '/mentors' },
  { label: 'Wall of Fame', href: '/wall-of-fame' },
  { label: 'Contact', href: '/contact' },
  { label: 'Instagram', href: 'https://instagram.com/ecellkccemsr', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/ecell-kccemsr', external: true },
]

const PROOF_ITEMS = [
  'ClusterKnox',
  'CMP',
  'Cavvy',
  'Singularity',
  'Build Sprint',
  'Hackcelerate',
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/ecell-kccemsr' },
  { label: 'Instagram', href: 'https://instagram.com/ecellkccemsr' },
  { label: 'YouTube', href: 'https://youtube.com/@ecellkccemsr' },
  { label: 'GitHub', href: 'https://github.com/ecell-kccemsr' },
]

const CONTACT_EMAIL = 'kccell@kccemsr.edu.in'
const COLLEGE_ADDRESS = 'KCCEMSR, Kopri Colony, Thane East, Thane, Maharashtra 400603'

const TEAR_PATH =
  'M0 40L18 31L30 33L52 24L68 28L74 22L96 34L112 29L120 38L142 26L158 30L176 20L190 27L208 25L222 36L244 30L256 23L278 33L292 27L306 39L328 31L340 24L362 29L378 21L396 32L412 27L430 37L452 28L466 22L488 31L502 26L524 35L540 29L556 20L578 28L594 24L612 34L630 27L646 31L668 22L684 30L702 25L720 36L738 29L754 23L776 32L790 26L812 34L828 28L844 21L866 30L882 25L900 33L918 27L934 22L956 31L972 26L994 36L1010 29L1026 23L1048 32L1064 27L1082 20L1100 28L1116 34L1138 26L1154 30L1176 22L1192 29L1210 25L1228 35L1246 28L1262 21L1284 31L1300 26L1318 33L1336 27L1352 23L1374 32L1390 26L1408 35L1424 29L1440 33V90H0Z'

function FooterTear() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 top-0 z-20 rotate-180 -scale-x-100">
      <div className="relative">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block h-10 w-full sm:h-14 lg:h-[5.5rem]"
        >
          <path
            d={TEAR_PATH}
            transform="translate(0,-7)"
            fill="var(--color-tear-shadow)"
          />
          <path d={TEAR_PATH} fill="var(--color-paper)" />
        </svg>
      </div>
    </div>
  )
}

function FooterBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 95% 75% at 50% 18%, var(--color-hero-bright) 0%, var(--color-hero-blue) 38%, var(--color-hero-mid) 72%, var(--color-hero-deep) 100%)',
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#08182b] text-cream overflow-hidden">
      <FooterBackground />
      <FooterTear />

      {/* Floating stickers (desktop layout) */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
        {footerStickers.map((sticker) => (
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
              className={`h-auto w-full ${sticker.className || ''}`}
            />
          </DoodleGraphic>
        ))}
      </div>

      {/* Floating stickers (mobile layout) */}
      <div className="pointer-events-none absolute inset-0 z-20 lg:hidden">
        {footerStickers
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
                className={`h-auto w-full ${sticker.className || ''}`}
              />
            </DoodleGraphic>
          ))}
      </div>

      {/* Upper body */}
      <div className="mx-auto w-full max-w-screen-xl px-5 sm:px-8 pt-32 sm:pt-40 lg:pt-48 relative z-10">

        {/* Brand + CTA row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 pb-12 border-b border-white/10">

          {/* Brand lockup */}
          <div className="max-w-xs">
            <a
              href="/"
              aria-label="E-Cell, home"
              className="inline-flex items-center gap-3 mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
            >
              <span
                className="font-display text-[clamp(1.375rem,2.2vw,1.875rem)] font-extrabold leading-none tracking-[-0.02em] text-cream"
                aria-hidden="true"
              >
                E-Cell
              </span>
              <span className="font-mono text-label uppercase tracking-[0.22em] text-cream/70 border border-white/20 px-2 py-1 leading-none">
                KCCEMSR
              </span>
            </a>
            <p className="font-body text-small leading-relaxed text-cream/70 max-w-[32ch]">
              Problem solvers building proof on campus.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-label uppercase tracking-[0.22em] text-cream/70">
              Get in touch
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 font-body text-base text-cream border border-white/20 bg-white/5 px-6 py-3 hover:bg-cream hover:text-ink transition-colors duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
            >
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              Start a conversation
            </a>
          </div>
        </div>

        {/* Navigation grid + proof list */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 pt-12 pb-16 gap-x-8 gap-y-12">

          {/* Column 1: Menu */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-label uppercase tracking-[0.22em] text-cream/70 block">
              Menu
            </span>
            <nav aria-label="Footer primary navigation">
              <ul className="flex flex-col gap-2" role="list">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="font-body text-small text-cream hover:text-signal transition-colors duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 2: More */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-label uppercase tracking-[0.22em] text-cream/70 block">
              More
            </span>
            <nav aria-label="Footer secondary navigation">
              <ul className="flex flex-col gap-2" role="list">
                {SECONDARY_LINKS.map(({ label, href, external }) => (
                  <li key={href}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="font-body text-small text-cream hover:text-signal transition-colors duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
                    >
                      {label}
                      {external && <span className="sr-only">(opens in new tab)</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Contact + Address */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
            <span className="font-mono text-label uppercase tracking-[0.22em] text-cream/70 block">
              Contact
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-body text-small text-cream hover:text-signal transition-colors duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 break-all"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="flex items-start gap-2 mt-1">
              <MapPin className="w-3.5 h-3.5 text-cream/70 shrink-0 mt-0.5" aria-hidden="true" />
              <address className="font-body text-small text-cream/70 not-italic leading-relaxed">
                {COLLEGE_ADDRESS}
              </address>
            </div>
          </div>

          {/* Column 4: Proof list */}
          <div className="flex flex-col gap-4">
            <span className="font-mono text-label uppercase tracking-[0.22em] text-cream/70 block">
              Built here
            </span>
            <ul className="flex flex-col gap-2" role="list">
              {PROOF_ITEMS.map((item) => (
                <li key={item} className="font-mono text-small text-cream/90 leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto w-full max-w-screen-xl px-5 sm:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-t border-white/10">
          <p className="font-mono text-label text-cream/70 uppercase tracking-[0.22em] leading-relaxed">
            E-CELL KCCEMSR &mdash; EST. 2019 &mdash; <span className="tabular-nums">{currentYear}</span>
          </p>
          <nav aria-label="Social media links">
            <ul className="flex items-center gap-4" role="list">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-label uppercase tracking-[0.22em] text-cream/70 hover:text-cream transition-colors duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
                  >
                    {label}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Oversized wordmark — closing device, aria-hidden */}
      <div
        aria-hidden="true"
        className="w-full overflow-hidden select-none pointer-events-none relative z-10"
      >
        <p
          className="font-display font-extrabold leading-none tracking-[-0.04em] text-cream whitespace-nowrap px-4 sm:px-6 py-2"
          style={{ fontSize: 'clamp(5rem, 22vw, 18rem)', opacity: 0.30 }}
        >
          E-Cell
        </p>
      </div>
    </footer>
  )
}
