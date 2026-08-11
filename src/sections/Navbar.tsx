import { useState, useEffect } from 'react';
import { Button } from '../components/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg-base/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="font-display font-bold text-2xl tracking-wider">
          E-<span className="text-accent-green">CELL</span>
        </div>
        <div className="hidden md:flex gap-8 items-center text-sm font-semibold tracking-wide uppercase">
          <a href="#about" className="hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green rounded-sm">About</a>
          <a href="#events" className="hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green rounded-sm">Events</a>
          <a href="#team" className="hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green rounded-sm">Team</a>
          <Button className="ml-4 py-2 px-4 text-xs">Join Us</Button>
        </div>
      </div>
    </nav>
  );
};
