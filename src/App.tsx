import { Briefcase, Home, Rocket, Users } from 'lucide-react'

import { SmoothScroll } from '@/components/SmoothScroll'
import { AboutPage } from '@/components/about/AboutPage'
import { StorySoFar } from '@/components/about/StorySoFar'
import { Hero } from '@/components/hero/Hero'
import { Footer } from '@/components/layout/Footer'
import { Logo } from '@/components/ui/logo'
import { NavBar, type NavItem } from '@/components/ui/tube-light-navbar'

/**
 * Nav destinations.
 *
 * These are in-page anchors for now: the routes they will eventually point at do
 * not exist yet, and linking to a 404 is worse than linking to nothing.
 */
const navItems: NavItem[] = [
  { name: 'Home', url: '#top', icon: Home },
  { name: 'About Us', url: '#about-page', icon: Users },
  { name: 'Programs', url: '#programs', icon: Rocket },
  { name: 'Work', url: '#work', icon: Briefcase },
  { name: 'Team', url: '#team', icon: Users },
]

function App() {
  return (
    <>
      <SmoothScroll />

      <a
        href="#hero-heading"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-100 focus-visible:rounded-full focus-visible:bg-paper focus-visible:px-4 focus-visible:py-2 focus-visible:font-body focus-visible:text-sm focus-visible:font-semibold focus-visible:text-ink"
      >
        Skip to content
      </a>

      <Logo />
      <NavBar items={navItems} />

      <main id="top">
        <Hero />
        <StorySoFar />
        <AboutPage />
      </main>

      <Footer />
    </>
  )
}

export default App
