import { useState } from 'react'
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
  // Optional chaining matters: an empty `items` array would otherwise throw on
  // first render rather than degrading to an empty bar.
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? '')

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        // The tube's glow reaches roughly 26px above the bar, so the padding
        // above it has to clear that or the halo clips against the viewport.
        'fixed bottom-0 left-1/2 z-50 mb-5 h-max -translate-x-1/2 sm:top-0 sm:mb-0 sm:pt-9',
        className,
      )}
    >
      {/* Solid fill, not `backdrop-blur`. The bar has to separate from a ground
          that is nearly the same navy, so it carries a hairline. */}
      <ul className="flex items-center gap-1 rounded-2xl border border-white/10 bg-hero-deep p-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <li key={item.name}>
              <a
                href={item.url}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  'relative block cursor-pointer rounded-xl px-3.5 py-2.5 font-display text-[0.95rem] font-bold tracking-tight transition-colors duration-instant sm:px-7 sm:text-base',
                  isActive ? 'text-cream' : 'text-cream/55 hover:text-cream/85',
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="inline-flex md:hidden">
                  <Icon size={18} strokeWidth={2.5} aria-hidden="true" />
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
                    {/* The tube: a bright bar on the leading edge with three
                        stacked blurs standing in for its falloff.

                        The glow spills *inward*, away from the edge, which is
                        both how a real tube throws light onto the surface below
                        it and what keeps the halo from clipping against the top
                        of the viewport. */}
                    <span className="absolute -top-[11px] left-1/2 hidden h-[3.5px] w-14 -translate-x-1/2 rounded-full bg-cream sm:block">
                      {/* Halo above the tube, then falloff onto the bar below
                          it. Both directions are bounded by the nav's top
                          padding, so neither clips against the viewport. */}
                      <span className="absolute -top-3 left-1/2 h-8 w-24 -translate-x-1/2 rounded-full bg-cream/20 blur-lg" />
                      <span className="absolute -top-1.5 left-1/2 h-6 w-20 -translate-x-1/2 rounded-full bg-cream/30 blur-md" />
                      <span className="absolute top-0 left-1/2 h-5 w-14 -translate-x-1/2 rounded-full bg-cream/45 blur-md" />
                      <span className="absolute top-0 left-1/2 h-2.5 w-9 -translate-x-1/2 rounded-full bg-cream/60 blur-sm" />
                    </span>
                    <span className="absolute -bottom-[11px] left-1/2 h-[3.5px] w-12 -translate-x-1/2 rounded-full bg-cream sm:hidden">
                      <span className="absolute -bottom-3 left-1/2 h-8 w-20 -translate-x-1/2 rounded-full bg-cream/20 blur-lg" />
                      <span className="absolute bottom-0 left-1/2 h-5 w-14 -translate-x-1/2 rounded-full bg-cream/40 blur-md" />
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
