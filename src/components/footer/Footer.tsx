import { ArrowUp, Mail, MapPin } from 'lucide-react'
import { heroLogo } from '@/content/hero-assets'
import { FooterFaceCanvas } from './FooterFaceCanvas'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.59 1.59 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const NAV_LINKS = [
  { name: 'Home', href: '#top' },
  { name: 'About Us', href: '#about' },
  { name: 'The Team', href: '#team' },
  { name: 'Programs', href: '#programs' },
  { name: 'Our Work', href: '#work' },
] as const

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/kcecell/',
    icon: LinkedinIcon,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/kcecell_',
    icon: InstagramIcon,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@kc-ecell?si=RWl22N_TGFqc1W1h',
    icon: YoutubeIcon,
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/kcecell?s=20',
    icon: XIcon,
  },
] as const

export interface FooterProps {
  showPaperTear?: boolean
}

export function Footer({ showPaperTear = true }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full text-cream overflow-x-clip overflow-y-visible">
      {/* Deep Blue Gradient Background (gets darker towards bottom) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 90% 45% at 50% 20%, #1e4ea4 0%, #113374 40%, transparent 80%),
            linear-gradient(180deg, #112d62 0%, #0d224d 18%, #091738 45%, #050e23 72%, #020610 100%)
          `,
        }}
      />

      {/* 1. Strange Family-Inspired Interactive Face Pop-Out Canvas (contains paper tear at top) */}
      <div className="relative w-full overflow-visible">
        <FooterFaceCanvas showPaperTear={showPaperTear} />
      </div>

      {/* 2. Seam Line */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="w-full border-t border-white/15" />

        {/* Strange Family Top Bar: Back to Top */}
        <div className="flex items-center justify-end py-4 text-xs font-sans">
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 font-semibold uppercase tracking-widest text-cream/70 transition-colors hover:text-cream cursor-pointer"
            aria-label="Back to top"
          >
            Back to Top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 text-signal" />
          </button>
        </div>

        {/* 3. Main 4-Column Structured Content Grid */}
        <div className="grid grid-cols-1 gap-10 pt-4 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12 lg:pt-6 lg:pb-16 items-start">
          {/* Column 1: Brand & Socials (Span 4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <a
                href="#top"
                onClick={scrollToTop}
                aria-label="E-Cell KCCEMSR Home"
                className="inline-block"
              >
                <img
                  src={heroLogo.src}
                  alt="E-Cell Logo"
                  width={heroLogo.width}
                  height={heroLogo.height}
                  className="h-14 sm:h-16 md:h-18 w-auto object-contain"
                />
              </a>

              <h3 className="mt-4 font-sans text-base sm:text-lg font-bold tracking-tight text-cream">
                The Entrepreneurship Cell, KCCEMSR Thane
              </h3>
            </div>

            {/* Social Links: Plain SVG logos without box container */}
            <div className="flex items-center gap-5 pt-1">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="text-cream/75 transition-all duration-200 hover:text-signal hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Column 2: Singularity 2.0 (Span 3 cols) - Centered in section */}
          <div className="lg:col-span-3 flex flex-col justify-center min-h-[120px] sm:min-h-[140px]">
            <a
              href="https://singularityhack.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block text-left lg:text-center"
            >
              <h4 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-cream transition-colors group-hover:text-signal">
                Singularity 2.0
              </h4>

              <p className="mt-1.5 font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-cream/70">
                A National level hackathon
              </p>
            </a>
          </div>

          {/* Column 3: Navigation Links (Span 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-cream/50">
              Navigation
            </h4>

            <ul className="mt-3.5 space-y-2.5 font-sans text-xs sm:text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-block text-cream/70 transition-all duration-200 hover:text-signal hover:translate-x-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get in Touch (Span 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-cream/50">
              Get in Touch
            </h4>

            <div className="mt-3.5 space-y-4 font-sans text-xs sm:text-sm text-cream/75">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-signal mt-0.5" />
                <p className="leading-relaxed">
                  Mith Bunder Road, Near Sadguru Garden, Kopri, Thane East 400603
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-signal" />
                <a
                  href="mailto:kcecell@kccemsr.edu.in"
                  className="text-cream/90 hover:text-signal transition-colors break-all"
                >
                  kcecell@kccemsr.edu.in
                </a>
              </div>

              {/* College affiliation tag */}
              <div className="pt-1">
                <p className="text-[11px] leading-snug text-cream/45">
                  K. C. College of Engineering & Management Studies & Research, Thane
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Copyright Bar: Centered only */}
        <div className="border-t border-white/10 py-6 text-center text-xs font-sans text-cream/60">
          <p>© 2026 E-Cell KCCEMSR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
