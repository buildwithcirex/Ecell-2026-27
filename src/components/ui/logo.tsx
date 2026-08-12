import { heroLogo } from '@/content/hero-assets'
import { cn } from '@/lib/utils'

export interface LogoProps {
  className?: string
}

/**
 * E-Cell mark, fixed to the top-left corner.
 *
 * The link carries the accessible name, so the image itself is `alt=""`. Giving
 * both a name would make a screen reader announce "E-Cell" twice.
 */
export function Logo({ className }: LogoProps) {
  return (
    <a
      href="/"
      aria-label="E-Cell, home"
      className={cn(
        'fixed top-4 left-8 z-50 inline-flex items-center sm:top-5 sm:left-12',
        className,
      )}
    >
      <img
        src={heroLogo.src}
        alt=""
        width={heroLogo.width}
        height={heroLogo.height}
        className="h-9 w-auto sm:h-11"
      />
    </a>
  )
}
