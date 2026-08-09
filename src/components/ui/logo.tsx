import { heroLogo } from '@/content/hero-assets'
import { cn } from '@/lib/utils'

export interface LogoProps {
  className?: string
}

/**
 * E-Cell mark, fixed to the top-left corner.
 *
 * Falls back to a typographic wordmark while `heroLogo.src` is null. Replacing
 * the placeholder is a one-line edit in the manifest.
 */
export function Logo({ className }: LogoProps) {
  return (
    <a
      href="/"
      aria-label="E-Cell, home"
      className={cn(
        'fixed top-4 left-4 z-50 inline-flex items-center sm:top-5 sm:left-6',
        className,
      )}
    >
      {heroLogo.src ? (
        <img
          src={heroLogo.src}
          alt={heroLogo.alt}
          width={heroLogo.width}
          height={heroLogo.height}
          className="h-8 w-auto sm:h-9"
        />
      ) : (
        <span className="font-display text-lg font-extrabold tracking-tight text-cream sm:text-xl">
          {heroLogo.wordmark}
          <span className="text-signal">.</span>
        </span>
      )}
    </a>
  )
}
