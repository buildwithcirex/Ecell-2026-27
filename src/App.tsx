import { useState, useEffect } from 'react'
import { Briefcase, Home, Info, Rocket, Users } from 'lucide-react'
import { Agentation } from 'agentation'

import { SmoothScroll } from '@/components/SmoothScroll'
import { AboutBookHero } from '@/components/about/AboutBookHero'
import { AboutHistoryTimeline } from '@/components/about/AboutHistoryTimeline'
import { StorySoFar } from '@/components/about/StorySoFar'
import { Hero } from '@/components/hero/Hero'
import { TeamPage } from '@/components/team/TeamPage'
import { team2026 } from '@/content/team-2026'
import { Logo } from '@/components/ui/logo'
import { NavBar, type NavItem } from '@/components/ui/navbar'

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

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Which top-level route the URL hash points at. */
type View = 'home' | 'about' | 'team'

/**
 * Map a URL hash to the view it belongs to. Unknown hashes fall back to
 * home so a typo never strands the visitor on a broken page.
 */
function hashToView(hash: string): View {
  if (hash === '#about') return 'about'
  if (hash === '#team') return 'team'
  return 'home'
}

function App() {
  const [currentView, setCurrentView] = useState<View>(() =>
    hashToView(window.location.hash),
  )

  useEffect(() => {
    const handleHash = () => {
      const next = hashToView(window.location.hash)
      setCurrentView(next)
      if (next !== 'home') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      } else if (window.location.hash === '' || window.location.hash === '#top' || window.location.hash === '#home') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 50)
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
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-100 focus-visible:rounded-full focus-visible:bg-paper focus-visible:px-4 focus-visible:py-2 focus-visible:font-body focus-visible:text-sm focus-visible:font-semibold text-ink"
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
        ) : currentView === 'team' ? (
          <TeamPage data={team2026} />
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
