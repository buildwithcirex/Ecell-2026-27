import { useEffect, useRef, useState } from 'react'
import { Activity, Lightbulb, Rocket, Shield, Target, Zap } from 'lucide-react'
import { WetPaintButton } from '@/components/ui/wet-paint-button'
import { cn } from '@/lib/utils'

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

export function AboutPage() {
  const { ref: heroRef, inView: heroInView } = useInView<HTMLElement>()
  const { ref: missionRef, inView: missionInView } = useInView<HTMLElement>()
  const { ref: valuesRef, inView: valuesInView } = useInView<HTMLElement>()
  
  return (
    <div className="flex flex-col w-full">
      {/* 01. HERO SECTION (Signal Ground) */}
      <section 
        ref={heroRef}
        id="about-page"
        className={cn(
          "bg-signal text-signal-ink py-24 sm:py-32 px-5 sm:px-8 border-b border-ink transition-opacity duration-700",
          heroInView ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-label uppercase tracking-widest mb-6 border-b border-ink/20 pb-4 inline-block">
            E-CELL KCCEMSR • ABOUT US
          </p>
          <h1 className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold leading-[0.94] tracking-[-0.025em] max-w-5xl">
            Empowering the next generation of founders and <span className="text-paper bg-ink px-3 inline-block transform -rotate-1 mt-2 lg:mt-0">problem solvers.</span>
          </h1>
          <p className="font-body text-[clamp(1.125rem,1.6vw,1.375rem)] mt-10 max-w-[50ch] leading-relaxed">
            We bridge the gap between ideation and execution by providing student entrepreneurs with mentorship, resources, and real-world proof on campus.
          </p>
        </div>
      </section>

      {/* 02. MISSION & VISION (Paper Ground) */}
      <section 
        ref={missionRef}
        className={cn(
          "bg-paper text-ink py-24 sm:py-32 px-5 sm:px-8 border-b border-chalk transition-opacity duration-700",
          missionInView ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-chalk p-8 sm:p-12 flex flex-col justify-between h-full bg-paper">
             <div className="mb-12">
               <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold mb-4 leading-none">Our Mission</h2>
               <p className="font-body text-base text-steel max-w-[40ch] leading-relaxed">
                 Focus on fostering an entrepreneurial mindset, supporting early-stage ventures, and creating industry connections.
               </p>
             </div>
             <div className="aspect-[4/3] w-full bg-chalk/30 border border-chalk/50 flex flex-col items-center justify-center p-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/img.png')] bg-cover bg-center opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"></div>
                <span className="font-mono text-label text-steel uppercase relative z-10 bg-paper px-3 py-1 border border-chalk/50">PLATE 01 / MISSION</span>
             </div>
          </div>
          
          <div className="border border-chalk p-8 sm:p-12 flex flex-col justify-between h-full bg-paper">
             <div className="mb-12">
               <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold mb-4 leading-none">Our Vision</h2>
               <p className="font-body text-base text-steel max-w-[40ch] leading-relaxed">
                 To build a leading college startup ecosystem that transforms student ideas into viable products and scalable ventures.
               </p>
             </div>
             <div className="aspect-[4/3] w-full bg-chalk/30 border border-chalk/50 flex flex-col items-center justify-center p-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('/img12.jpg')] bg-cover bg-center opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"></div>
                <span className="font-mono text-label text-steel uppercase relative z-10 bg-paper px-3 py-1 border border-chalk/50">PLATE 02 / VISION</span>
             </div>
          </div>
        </div>
      </section>

      {/* 03. CORE PILLARS (Ink Ground) */}
      <section 
        ref={valuesRef}
        className={cn(
          "bg-ink text-paper py-24 sm:py-32 px-5 sm:px-8 border-b border-ink-line transition-opacity duration-700",
          valuesInView ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-none">Core Values</h2>
            <span className="font-mono text-label text-steel hidden sm:block">06 PRINCIPLES</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-ink-line">
             {[
               { title: 'Innovation', icon: Lightbulb, desc: 'Thinking beyond boundaries to solve real-world problems.' },
               { title: 'Collaboration', icon: Target, desc: 'Building together with diverse skill sets and perspectives.' },
               { title: 'Execution', icon: Zap, desc: 'Ideas are cheap. We focus on shipping and proving them.' },
               { title: 'Impact', icon: Activity, desc: 'Creating measurable value for the campus and beyond.' },
               { title: 'Resilience', icon: Shield, desc: 'Learning from failure and iterating continuously.' },
               { title: 'Growth', icon: Rocket, desc: 'Personal and professional development at every step.' },
             ].map((pillar, i) => (
               <div key={i} className="border-r border-b border-ink-line p-8 sm:p-10 hover:bg-paper hover:text-ink transition-colors duration-150 group">
                 <pillar.icon className="w-8 h-8 mb-8 text-signal" />
                 <h3 className="font-display text-[clamp(1.375rem,2.2vw,1.875rem)] font-bold mb-3 leading-tight">{pillar.title}</h3>
                 <p className="font-body text-[0.875rem] leading-relaxed text-steel group-hover:text-ink/75">
                   {pillar.desc}
                 </p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 04. STATS STRIP (Paper Ground) */}
      <section className="bg-paper text-ink pt-16 pb-24 sm:pt-20 sm:pb-32 px-5 sm:px-8 border-b border-chalk">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 border-l border-t border-chalk">
            {[
              { value: '500', label: 'Active Members' },
              { value: '50', label: 'Events & Workshops' },
              { value: '100', label: 'Startups Mentored' },
              { value: '20', label: 'Industry Partners' },
            ].map((stat, i) => (
              <div key={i} className="border-r border-b border-chalk p-8 sm:p-12 text-center flex flex-col items-center justify-center hover:bg-chalk/20 transition-colors">
                <p className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] leading-none font-extrabold text-ink tabular-nums tracking-tighter">
                  {stat.value}<span className="text-signal">+</span>
                </p>
                <p className="font-mono text-label text-steel mt-4 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05. WHAT WE OFFER (Paper Ground) */}
      <section className="bg-paper text-ink pb-24 sm:pb-32 px-5 sm:px-8 border-b border-chalk">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 border-b border-chalk pb-6 flex items-end justify-between">
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-none">What We Offer</h2>
            <span className="font-mono text-label text-steel hidden sm:block">PRE-INCUBATION</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-chalk">
             {[
               { title: 'Pre-Incubation & Hackathons', desc: 'Structured programs to validate ideas and build initial prototypes.' },
               { title: '1-on-1 Mentor Clinics', desc: 'Direct guidance from industry experts and successful founders.' },
               { title: 'Funding & Investor Pitching', desc: 'Opportunities to secure grants and pitch to angel networks.' },
             ].map((offer, i) => (
               <div key={i} className={cn("p-8 sm:p-10 relative group hover:bg-ink hover:text-paper transition-colors duration-150", i !== 2 && "border-b md:border-b-0 md:border-r border-chalk")}>
                 <div className="absolute top-0 right-0 p-5 font-mono text-[0.6875rem] text-steel group-hover:text-signal transition-colors">0{i + 1}</div>
                 <h3 className="font-display text-[clamp(1.375rem,2.2vw,1.875rem)] font-bold mb-4 pr-8 leading-tight">{offer.title}</h3>
                 <p className="font-body text-base text-steel group-hover:text-paper/70 leading-relaxed">{offer.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 06. CTA BANNER (Signal Ground) */}
      <section className="bg-signal text-signal-ink py-24 sm:py-32 px-5 sm:px-8">
        <div className="mx-auto w-full max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
           <div className="max-w-2xl">
             <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-tight">
               Have an idea or want to collaborate with us?
             </h2>
           </div>
           <div className="shrink-0">
             <WetPaintButton href="mailto:kccell@kccemsr.edu.in">Get in Touch</WetPaintButton>
           </div>
        </div>
      </section>
    </div>
  )
}
