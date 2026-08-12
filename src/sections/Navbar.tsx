import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info, Calendar, Users, Briefcase } from 'lucide-react';

const navItems = [
  { name: 'About', url: '#about', icon: Info },
  { name: 'Events', url: '#events', icon: Calendar },
  { name: 'Team', url: '#team', icon: Users },
  { name: 'Join Us', url: '#join', icon: Briefcase },
];

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState(navItems[0].name);

  // Update active tab based on hash for a better UX
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const matchingItem = navItems.find(item => item.url === hash);
      if (matchingItem) setActiveTab(matchingItem.name);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-1/2 z-50 mb-5 h-max -translate-x-1/2 sm:top-0 sm:mb-0 sm:pt-9"
    >
      <ul className="flex items-center gap-1 rounded-[16px] border border-white/10 bg-ink p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <li key={item.name}>
              <a
                href={item.url}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setActiveTab(item.name)}
                className={`relative block cursor-pointer rounded-[12px] px-3.5 py-2.5 font-display text-[0.95rem] font-bold tracking-tight transition-colors duration-[120ms] sm:px-7 sm:text-base ${isActive ? 'text-paper' : 'text-paper/55 hover:text-paper/85'
                  }`}
              >
                <span className="hidden md:inline uppercase">{item.name}</span>
                <span className="inline-flex md:hidden">
                  <Icon size={18} strokeWidth={2.5} aria-hidden="true" />
                  <span className="sr-only">{item.name}</span>
                </span>

                {isActive && (
                  <motion.span
                    layoutId="navbar-tube"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-[12px] bg-white/10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <span className="absolute -top-[11px] left-1/2 hidden h-[3.5px] w-14 -translate-x-1/2 rounded-full bg-paper sm:block">
                      <span className="absolute -top-3 left-1/2 h-8 w-24 -translate-x-1/2 rounded-full bg-paper/20 blur-lg" />
                      <span className="absolute -top-1.5 left-1/2 h-6 w-20 -translate-x-1/2 rounded-full bg-paper/30 blur-md" />
                      <span className="absolute top-0 left-1/2 h-5 w-14 -translate-x-1/2 rounded-full bg-paper/45 blur-md" />
                      <span className="absolute top-0 left-1/2 h-2.5 w-9 -translate-x-1/2 rounded-full bg-paper/60 blur-sm" />
                    </span>
                    <span className="absolute -bottom-[11px] left-1/2 h-[3.5px] w-12 -translate-x-1/2 rounded-full bg-paper sm:hidden">
                      <span className="absolute -bottom-3 left-1/2 h-8 w-20 -translate-x-1/2 rounded-full bg-paper/20 blur-lg" />
                      <span className="absolute bottom-0 left-1/2 h-5 w-14 -translate-x-1/2 rounded-full bg-paper/40 blur-md" />
                    </span>
                  </motion.span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
