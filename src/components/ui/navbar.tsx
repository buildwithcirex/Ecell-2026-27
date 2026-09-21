import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

export interface NavBarProps {
  items: NavItem[]
  activeTab?: string
  onTabChange?: (name: string) => void
  className?: string
  ariaLabel?: string
}

/**
 * Single, self-contained responsive navbar:
 * - Desktop (>= md): Liquid Underline Navbar with
 *   container background: linear-gradient(to right, #0b1120 0%, #0b1120 100%)
 *   and hover/tap underline: linear-gradient(to right, #fe7932 0%, #fe7932 100%).
 * - Mobile (< md): Dark Mode Mobile Navbar with tooltips and active indicator.
 */
export function NavBar({
  items,
  activeTab: controlledActiveTab,
  onTabChange,
  className,
  ariaLabel = 'Primary Navigation',
}: NavBarProps) {
  // Shared active tab state
  const [internalActiveTab, setInternalActiveTab] = useState(() => {
    if (typeof window === 'undefined') return items[0]?.name ?? ''
    const hash = window.location.hash.toLowerCase()
    const found = items.find((item) => item.url.toLowerCase() === hash)
    if (found) return found.name
    if (hash === '#about') return 'About'
    if (hash === '#team') return 'Team'
    return items[0]?.name ?? 'Home'
  })

  // Desktop hover state
  const [desktopHoveredIndex, setDesktopHoveredIndex] = useState<number | null>(null)

  // Mobile hover state
  const [mobileHovered, setMobileHovered] = useState<string | null>(null)

  const activeTab = controlledActiveTab ?? internalActiveTab

  // Synchronize active tab with URL hash and browser navigation
  useEffect(() => {
    const syncTabWithUrl = () => {
      const hash = window.location.hash.toLowerCase()
      const found = items.find((item) => item.url.toLowerCase() === hash)
      if (found) {
        setInternalActiveTab(found.name)
      } else if (hash === '#about') {
        setInternalActiveTab('About')
      } else if (hash === '#team') {
        setInternalActiveTab('Team')
      } else if (!hash || hash === '#top' || hash === '#home') {
        setInternalActiveTab('Home')
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

  const handleTabClick = (name: string) => {
    setInternalActiveTab(name)
    onTabChange?.(name)
  }

  return (
    <>
      {/* -------------------------------------------------------------
          DESKTOP NAVBAR (>= md)
          - Background: linear-gradient(to right, #0b1120 0%, #0b1120 100%)
          - Underline: linear-gradient(to right, #fe7932 0%, #fe7932 100%)
          ------------------------------------------------------------- */}
      <div
        className={cn(
          'fixed top-0 left-1/2 z-50 hidden -translate-x-1/2 pt-6 sm:pt-8 md:flex select-none',
          className,
        )}
      >
        <nav
          aria-label={`${ariaLabel} Desktop`}
          style={{ background: 'linear-gradient(to right, #0b1120 0%, #0b1120 100%)' }}
          className="relative flex items-center justify-center gap-7 sm:gap-9 rounded-full border border-white/10 px-7 py-2 sm:px-9 sm:py-2.5 shadow-[0_14px_34px_-8px_rgba(0,0,0,0.7)]"
        >
          {items.map((item, index) => {
            const isHovered = desktopHoveredIndex === index
            const isActive = activeTab.toLowerCase() === item.name.toLowerCase()
            const showUnderline = isHovered || isActive

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={() => handleTabClick(item.name)}
                onMouseEnter={() => setDesktopHoveredIndex(index)}
                onMouseLeave={() => setDesktopHoveredIndex(null)}
                aria-current={isActive ? 'page' : undefined}
                className="group relative flex cursor-pointer flex-col items-center py-1.5 focus-visible:outline-none"
              >
                <span
                  className={cn(
                    'font-display text-[15px] font-bold tracking-tight transition-colors duration-200 sm:text-base',
                    isActive
                      ? 'text-cream'
                      : isHovered
                        ? 'text-cream'
                        : 'text-cream/55 hover:text-cream/85',
                  )}
                >
                  {item.name}
                </span>

                {/* Animated SVG liquid line with #fe7932 gradient on hover & tap */}
                <div className="pointer-events-none absolute -bottom-1.5 h-2 w-full">
                  <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                    className="overflow-visible"
                  >
                    <defs>
                      <linearGradient
                        id={`liquid-line-grad-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#fe7932" />
                        <stop offset="100%" stopColor="#fe7932" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M 0,5 Q 25,0 50,5 T 100,5"
                      fill="none"
                      stroke={`url(#liquid-line-grad-${index})`}
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: showUnderline ? 1 : 0,
                        opacity: showUnderline ? 1 : 0,
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                  </motion.svg>
                </div>
              </a>
            )
          })}
        </nav>
      </div>

      {/* -------------------------------------------------------------
          MOBILE NAVBAR (< md)
          - Fixed at bottom
          - Dark mode styling with tooltips and active indicator
          ------------------------------------------------------------- */}
      <div
        className={cn(
          'fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 select-none md:hidden',
          className,
        )}
      >
        <nav
          aria-label={`${ariaLabel} Mobile`}
          style={{ background: 'linear-gradient(to right, #0b1120 0%, #0b1120 100%)' }}
          className="relative inline-flex items-center gap-1.5 rounded-full border border-white/12 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
          onMouseLeave={() => setMobileHovered(null)}
        >
          {items.map((item) => {
            const isActive = activeTab.toLowerCase() === item.name.toLowerCase()
            const isHovered = mobileHovered === item.name
            const Icon = item.icon

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={() => handleTabClick(item.name)}
                onMouseEnter={() => setMobileHovered(item.name)}
                className="relative flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none"
                aria-label={item.name}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, y: 6, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.85 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                      className="absolute -top-10 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#0c1c3f] px-2.5 py-1 font-body text-[11px] font-semibold text-cream shadow-lg pointer-events-none"
                    >
                      {item.name}
                      <span className="absolute left-1/2 top-full -mt-[3px] h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-white/10 bg-[#0c1c3f]" />
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Hover indicator */}
                {!isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.7 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Active indicator */}
                {isActive && (
                  <motion.span
                    layoutId="dark-mobile-nav-active"
                    className="absolute inset-0 rounded-full bg-[#fe7932]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}

                <Icon
                  size={20}
                  strokeWidth={2.2}
                  className={cn(
                    'relative z-10 transition-colors duration-200',
                    isActive ? 'text-white' : 'text-cream/55 hover:text-cream',
                  )}
                  aria-hidden="true"
                />
              </a>
            )
          })}
        </nav>
      </div>
    </>
  )
}
