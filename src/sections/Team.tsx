import { motion } from 'framer-motion';

export const Team = () => {
  const teamData = [
    {
      name: "Vivek Pawar",
      role: "President",
      department: "Leadership",
      linkedin_profile_url: "https://www.linkedin.com/in/vivekapawar",
      github_url: "https://github.com/GDVivekPawarr",
      imagePath: "/team/members/lead/vivek-pawar.jpg",
    },
    {
      name: "Samrath Singh",
      role: "Vice President",
      department: "Leadership",
      linkedin_profile_url: "https://www.linkedin.com/in/samrath-singh-hayer-4aa643318",
      github_url: "https://github.com/shadowcodesinjava",
      imagePath: "/team/members/lead/samrath-singh.jpg",
    },
    {
      name: "Daman Randhawa",
      role: "Secretary",
      department: "Leadership",
      linkedin_profile_url: "https://www.linkedin.com/in/damandeep-randhawa",
      imagePath: "/team/members/lead/daman-randhawa.jpg",
    },
    {
      name: "Vinay Vishwakarma",
      role: "Finance Secretary",
      department: "PR & Finance",
      linkedin_profile_url: "https://www.linkedin.com/in/vinay-vishwakarma",
      imagePath: "/team/members/pr-finance/vinay-vishwakarma.jpg",
    },
    {
      name: "Aryan Yadav",
      role: "Head",
      department: "Game Development",
      linkedin_profile_url: "https://www.linkedin.com/in/aryan-yadav-4082ba298",
      github_url: "https://github.com/aryanyadavpro",
      imagePath: "/team/members/gamedev/aryan-yadav.jpg",
    },
    {
      name: "Dhwani Tiwari",
      role: "Blogger",
      department: "Blogging",
      linkedin_profile_url: "http://www.linkedin.com/in/dhwani-tiwari",
      imagePath: "/team/members/blogging/dhwani-tiwari.jpg",
    },
    {
      name: "Medhali Bangera",
      role: "Head",
      department: "Events",
      linkedin_profile_url: "https://www.linkedin.com/in/medhali-bangera-5a8001297",
      imagePath: "/team/members/events/medhali-bangera.jpg",
    },
    {
      name: "Aayush Kashid",
      role: "Head",
      department: "IoT & Hardware",
      linkedin_profile_url: "https://www.linkedin.com/in/aayush-kashid-471790230",
      github_url: "https://github.com/aayush-kc28",
      imagePath: "/team/members/iot/aayush-kashid.jpg",
    },
    {
      name: "Om Telgade",
      role: "Head",
      department: "Social Media",
      linkedin_profile_url: "https://www.linkedin.com/in/om-telgade-1100a025b",
      github_url: "https://github.com/omtelgade14",
      imagePath: "/team/members/social/om-telgade.jpg",
    },
    {
      name: "Aryan Wesavkar",
      role: "Co-head",
      department: "Game Development",
      linkedin_profile_url: "http://linkedin.com/in/aryan-w",
      github_url: "https://github.com/25-THEBEaST-25",
      imagePath: "/team/members/gamedev/aryan-wesavkar.jpg",
    },
    {
      name: "Shubham Gupta",
      role: "Co-head",
      department: "Social Media",
      linkedin_profile_url: "https://www.linkedin.com/in/shubham-gupta-4b274b299",
      imagePath: "/team/members/social/shubham-gupta.jpg",
    },
    {
      name: "Raaj Patkar",
      role: "Head",
      department: "Web Development",
      linkedin_profile_url: "https://www.linkedin.com/in/raaj-patkar",
      github_url: "https://github.com/iraajp",
      imagePath: "/team/members/webdev/raaj-patkar.jpg",
    },
    {
      name: "Krishna Mundhara",
      role: "Co-head",
      department: "Web Development",
      linkedin_profile_url: "https://www.linkedin.com/in/krishna-mundhara-b6074933a/",
      github_url: "https://github.com/krishnamundhara",
      imagePath: "/team/members/webdev/krishna-mundhara.jpg",
    },
    {
      name: "Daivik Pawar",
      role: "PR Head",
      department: "PR & Finance",
      linkedin_profile_url: "https://www.linkedin.com/in/daivik-pawar-6146892a8/",
      imagePath: "/team/members/pr-finance/daivik-pawar.jpg",
    },
    {
      name: "Prathmesh Ghude",
      role: "Co-head",
      department: "IoT & Hardware",
      linkedin_profile_url: "https://www.linkedin.com/in/prathmesh-ghude-341b372b0/",
      github_url: "https://github.com/prathmeshghude",
      imagePath: "/team/members/iot/prathmesh-ghude.jpg",
    },
    {
      name: "Srishti Kotian",
      role: "Co-head",
      department: "Events",
      linkedin_profile_url: "https://www.linkedin.com/in/srishti-kotian-3a9b9130b",
      imagePath: "/team/members/events/srishti-kotian.jpg",
    },
    {
      name: "Devanshi Thakur",
      role: "Overall Coordinator",
      department: "Coordination",
      imagePath: "/team/members/coordination/devanshi-thakur.jpg",
    },
    {
      name: "Tanushree Karwatkar",
      role: "Deputy Overall Coordinator",
      department: "Coordination",
      linkedin_profile_url: "https://www.linkedin.com/in/tanushree-karwatkar-8341382a3",
      github_url: "https://github.com/tanushreekarwatkar",
      imagePath: "/team/members/coordination/tanushree-karwatkar.jpg",
    },
  ];

  const rotations = ['-rotate-[4deg]', 'rotate-[5deg]', '-rotate-[6deg]', 'rotate-[4deg]'];
  const variants = ['olive', 'mid', 'olive', 'mid'];

  return (
    <section id="team" className="py-32 px-6 bg-[#0a0a0b] min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="max-w-[1200px] mx-auto w-full relative">
        
        {/* Eyebrow */}
        <div className="absolute top-0 left-4 md:left-8 flex items-center gap-3">
          <div className="flex gap-[2px]">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-[4px] h-[8px] bg-[#39FF14] skew-x-[-20deg]" />
            ))}
          </div>
          <span className="text-[#555] font-display text-[11px] uppercase tracking-[0.25em] font-bold">
            OUR TEAM
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mt-12 mb-20 md:mb-28">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase text-[#666] leading-[1.05] tracking-wide">
            <span className="block">MEET THE</span>
            <span className="block">CORE</span>
          </h2>
        </div>

        {/* Cards Grid: Force exactly 4 columns on large screens with grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-x-6 justify-items-center px-4 pt-10">
          {teamData.map((member, i) => {
            const variant = variants[i % 4];
            const rotation = rotations[i % 4];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, zIndex: 10, rotate: 0 }}
                className={`group relative w-[260px] h-[360px] rounded-[30px] rounded-b-[20px] bg-[#18181b] p-2 flex flex-col shadow-2xl ${rotation} transition-all duration-300`}
              >
                {/* Colored Top Area */}
                <div className={`relative flex-1 ${variant === 'olive' ? 'bg-[#9fb51e]' : 'bg-[#409b66]'} rounded-t-[24px] rounded-b-[10px] overflow-visible`}>
                  {/* Image (Overlapping bottom) */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-[120%] flex items-end justify-center pointer-events-none">
                    <img 
                      src={member.imagePath} 
                      alt={member.name} 
                      onError={(e) => {
                        // Fallback to transparent dicebear avatar if image is missing
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/9.x/micah/svg?seed=${member.name}&backgroundColor=transparent`;
                      }}
                      className="w-full h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300"
                      style={{ filter: 'drop-shadow(0px 20px 10px rgba(0,0,0,0.4))' }}
                    />
                  </div>
                </div>
                
                {/* Dark Bottom Strip */}
                <div className="relative h-[7.5rem] bg-[#18181b] rounded-b-[16px] flex flex-col items-center justify-end pb-5 z-20">
                  {/* Social Icons positioned on the border */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                    {member.github_url && (
                      <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#2a2a2c] border border-white/5 rounded-[6px] flex items-center justify-center hover:bg-[#3a3a3c] hover:border-[#39FF14]/50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39FF14]">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-400"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                      </a>
                    )}
                    {member.linkedin_profile_url && (
                      <a href={member.linkedin_profile_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-[#2a2a2c] border border-white/5 rounded-[6px] flex items-center justify-center hover:bg-[#3a3a3c] hover:border-[#39FF14]/50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39FF14]">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-gray-400"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                  
                  <h3 className="font-display font-bold uppercase text-gray-200 tracking-[0.15em] text-sm mb-0.5 mt-3 text-center px-2 truncate w-full">
                    {member.name}
                  </h3>
                  <span className="text-[9px] font-display font-bold text-[#39FF14] uppercase tracking-[0.2em] text-center px-2 truncate w-full">
                    {member.role}
                  </span>
                  <span className="text-[8px] font-sans font-medium text-gray-500 uppercase tracking-widest text-center px-2 truncate w-full mt-0.5">
                    {member.department}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
