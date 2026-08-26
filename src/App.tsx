import { useState, useEffect } from 'react'
import { Briefcase, Home, Info, Rocket, Users } from 'lucide-react'
import { Agentation } from 'agentation'

import { SmoothScroll } from '@/components/SmoothScroll'
import { AboutBookHero } from '@/components/about/AboutBookHero'
import { AboutHistoryTimeline } from '@/components/about/AboutHistoryTimeline'
import { StorySoFar } from '@/components/about/StorySoFar'
import { Hero } from '@/components/hero/Hero'
import { Logo } from '@/components/ui/logo'
import { NavBar, type NavItem } from '@/components/ui/tube-light-navbar'

/**
 * Nav destinations.
 */
const navItems: NavItem[] = [
  { name: 'Home', url: '#top', icon: Home },
  { name: 'About', url: '#about', icon: Info },
  { name: 'Programs', url: '#programs', icon: Rocket },
  { name: 'Work', url: '#work', icon: Briefcase },
  { name: 'Team', url: '#team', icon: Users },
]

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home')

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash === '#about') {
        setCurrentView('about')
        // Always land cleanly at the top of the page when opening About
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      } else if (hash === '#home' || hash === '#top' || !hash) {
        setCurrentView('home')
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  return (
    <>
      <SmoothScroll />

      {/* Agentation dev toolbar */}
      {import.meta.env.DEV && <Agentation />}

      <a
        href="#hero-heading"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-100 focus-visible:rounded-full focus-visible:bg-paper focus-visible:px-4 focus-visible:py-2 focus-visible:font-body focus-visible:text-sm focus-visible:font-semibold focus-visible:text-ink"
      >
        Skip to content
      </a>

      <Logo />
      <NavBar items={navItems} />

      <main id="top">
        {currentView === 'about' ? (
          <div className="relative w-full min-h-screen bg-hero-deep text-cream overflow-hidden">
            {/* Seamless continuous ambient wash that naturally lightens down the timeline */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 select-none"
              style={{
                background: `
                  radial-gradient(ellipse 95% 38% at 50% 14%, #2468cc 0%, #16408a 38%, transparent 75%),
                  radial-gradient(ellipse 90% 55% at 50% 60%, #1c4fa2 0%, #123777 45%, transparent 80%),
                  linear-gradient(180deg, #060c1c 0%, #0c1c3f 8%, #153a7b 20%, #1b4f9e 42%, #18448f 66%, #0e2652 86%, #060c1c 100%)
                `,
              }}
            />
            <AboutBookHero />
            <AboutHistoryTimeline />
          </div>
        ) : (
          <>
            <Hero />
            <StorySoFar />
          </>
        )}
      </main>
    </>
  )
}

export default App
