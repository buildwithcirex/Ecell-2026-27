import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

export interface NavBarProps {
  items: NavItem[]
  className?: string
  /** Labels the landmark for assistive tech. */
  ariaLabel?: string
}

/**
 * Rounded bar with a tube light over the active item.
 *
 * Sits as a bottom bar under `sm` and a top bar above it, so the thumb reaches
 * it on a phone and it reads as a masthead on a desktop.
 *
 * The sliding indicator is the one thing here that genuinely needs a JS
 * animation library: `layoutId` animates a single element between two different
 * DOM positions, which CSS transitions cannot express.
 */
export function NavBar({ items, className, ariaLabel = 'Primary' }: NavBarProps) {
  // Synchronize initial active tab with URL hash on reload/mount
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window === 'undefined') return items[0]?.name ?? ''
    const hash = window.location.hash.toLowerCase()
    const found = items.find((item) => item.url.toLowerCase() === hash)
    if (found) return found.name
    if (hash === '#about') return 'About'
    return items[0]?.name ?? 'Home'
  })

  // Sync active tab state whenever the URL hash or navigation changes
  useEffect(() => {
    const syncTabWithUrl = () => {
      const hash = window.location.hash.toLowerCase()
      const found = items.find((item) => item.url.toLowerCase() === hash)
      if (found) {
        setActiveTab(found.name)
      } else if (hash === '#about') {
        setActiveTab('About')
      } else if (!hash || hash === '#top' || hash === '#home') {
        setActiveTab('Home')
      }
    }

    syncTabWithUrl()
    window.addEventListener('hashchange', syncTabWithUrl)
    window.addEventListener('popstate', syncTabWithUrl)
    return () => {
      window.removeEventListener('hashchange', syncTabWithUrl)
      window.removeEventListener('popstate', syncTabWithUrl)
    }
  }, [items])

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        // The tube's glow reaches roughly 26px above the bar, so the padding
        // above it has to clear that or the halo clips against the viewport.
        'fixed bottom-0 left-1/2 z-50 mb-7 h-max -translate-x-1/2 sm:top-0 sm:mb-0 sm:pt-9',
        className,
      )}
    >
      {/* Solid fill, not `backdrop-blur`. The bar has to separate from a ground
          that is nearly the same navy, so it carries a hairline. */}
      <ul className="flex items-center justify-center gap-1 sm:gap-0.5 rounded-4xl border border-white/10 bg-hero-deep p-1.5 sm:p-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <li key={item.name} className="flex items-center justify-center">
              <a
                href={item.url}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  'relative flex items-center justify-center cursor-pointer rounded-xl px-3.5 py-1.5 sm:px-5 sm:py-2 font-display text-[0.95rem] font-bold tracking-tight transition-colors duration-instant sm:text-base',
                  isActive ? 'text-cream' : 'text-cream/55 hover:text-cream/85',
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="flex items-center justify-center md:hidden">
                  <Icon size={19} strokeWidth={2.2} aria-hidden="true" />
                  {/* The label still reaches assistive tech on the icon-only
                      bar, so the nav reads the same at every width. */}
                  <span className="sr-only">{item.name}</span>
                </span>

                {isActive && (
                  <motion.span
                    layoutId="navbar-tube"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-xl bg-white/18"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {/* The tube light: bright bar on top leading edge on all screen sizes */}
                    <span className="absolute -top-[10px] left-1/2 h-[3.5px] w-10 sm:w-14 -translate-x-1/2 rounded-full bg-cream">
                      {/* Halo above the tube, then falloff onto the bar below it */}
                      <span className="absolute -top-3 left-1/2 h-8 w-20 sm:w-24 -translate-x-1/2 rounded-full bg-cream/20 blur-lg" />
                      <span className="absolute -top-1.5 left-1/2 h-6 w-16 sm:w-20 -translate-x-1/2 rounded-full bg-cream/30 blur-md" />
                      <span className="absolute top-0 left-1/2 h-4 sm:h-5 w-12 sm:w-14 -translate-x-1/2 rounded-full bg-cream/45 blur-md" />
                      <span className="absolute top-0 left-1/2 h-2.5 w-8 sm:w-9 -translate-x-1/2 rounded-full bg-cream/60 blur-sm" />
                    </span>
                  </motion.span>
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
