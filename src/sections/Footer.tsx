export const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-[#0a0a0b] border-t border-white/10 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="font-display font-bold text-2xl tracking-wider mb-4">
            E-<span className="text-accent-green">CELL</span>
          </div>
          <p className="text-gray-400 max-w-sm">
            Empowering student entrepreneurs to build, scale, and innovate without limits.
          </p>
        </div>
        
        <div>
          <h4 className="font-display font-bold uppercase mb-4 text-white">Programs</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green">Incubation</a></li>
            <li><a href="#" className="hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green">E-Summit</a></li>
            <li><a href="#" className="hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green">Startup Bootcamp</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold uppercase mb-4 text-white">Connect</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green">Contact Us</a></li>
            <li><a href="#" className="hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green">Twitter</a></li>
            <li><a href="#" className="hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green">LinkedIn</a></li>
            <li><a href="#" className="hover:text-accent-green transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green">Instagram</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} E-Cell. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-green">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
