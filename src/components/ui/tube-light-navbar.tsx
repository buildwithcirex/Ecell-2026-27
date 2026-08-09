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
 * Pill navigation with a tube-light indicator that slides between items.
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
        // `sm:pt-7` is not arbitrary breathing room: the tube's blurs reach
        // about 23px above the pill, and anything less clips the glow against
        // the top of the viewport.
        'fixed bottom-0 left-1/2 z-50 mb-6 h-max -translate-x-1/2 sm:top-0 sm:mb-0 sm:pt-7',
        className,
      )}
    >
      {/* Solid fill, not `backdrop-blur`. The pill has to separate from a ground
          that is nearly the same navy, so it steps one value lighter and carries
          a hairline. */}
      <ul className="flex items-center gap-1 rounded-full border border-white/12 bg-hero-mid p-1 sm:gap-2">
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
                  'relative block cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors duration-instant sm:px-6',
                  'text-cream/70 hover:text-cream',
                  isActive && 'text-cream',
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
                    className="absolute inset-0 -z-10 w-full rounded-full bg-white/8"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {/* The tube itself: a bar on the leading edge with three
                        stacked blurs standing in for its falloff. On the bottom
                        bar it hangs under the pill, on the top bar it caps it. */}
                    <span className="absolute -top-[3px] left-1/2 hidden h-[3px] w-8 -translate-x-1/2 rounded-b-full bg-signal sm:block">
                      <span className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-signal/25 blur-md" />
                      <span className="absolute -top-1 h-6 w-8 rounded-full bg-signal/25 blur-md" />
                      <span className="absolute top-0 left-2 h-4 w-4 rounded-full bg-signal/25 blur-sm" />
                    </span>
                    <span className="absolute -bottom-[3px] left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-t-full bg-signal sm:hidden">
                      <span className="absolute -top-4 -left-2 h-6 w-12 rounded-full bg-signal/25 blur-md" />
                      <span className="absolute -top-3 h-6 w-8 rounded-full bg-signal/25 blur-md" />
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
