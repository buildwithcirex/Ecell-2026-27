import { useState, useEffect } from 'react'
import { Briefcase, Home, Info, Rocket, Users } from 'lucide-react'
import { Agentation } from 'agentation'

import { SmoothScroll } from '@/components/SmoothScroll'
import { AboutBookHero } from '@/components/about/AboutBookHero'
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
          <AboutBookHero />
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
