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

import { Mail, MapPin } from 'lucide-react'

// ---------------------------------------------------------------------------
// Inline SVGs for brand logos
// ---------------------------------------------------------------------------
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

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
  { label: 'LinkedIn', href: 'https://linkedin.com/company/ecell-kccemsr', icon: LinkedinIcon },
  { label: 'Instagram', href: 'https://instagram.com/ecellkccemsr', icon: InstagramIcon },
  { label: 'YouTube', href: 'https://youtube.com/@ecellkccemsr', icon: YoutubeIcon },
  { label: 'GitHub', href: 'https://github.com/ecell-kccemsr', icon: GithubIcon },
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
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-label uppercase tracking-[0.22em] text-cream/70 hover:text-cream transition-colors duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2"
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="sr-only">{label} (opens in new tab)</span>
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
