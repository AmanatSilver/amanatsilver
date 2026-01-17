import React from 'react';
import { Link } from 'react-router-dom';

const navigationLinks = [
  { name: 'Collections', path: '/collections' },
  { name: 'The Brand', path: '/about' },
  { name: 'Enquiry', path: '/contact' },
];

const socialLinks = [
  { name: 'Instagram', href: '#' },
];


export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] text-stone-100 py-20 md:py-32 lg:py-40" data-scroll-section>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 lg:gap-24 border-b border-stone-800 pb-16 md:pb-24 lg:pb-32">
          <div className="sm:col-span-2">
            <h3 className="text-2xl md:text-3xl font-light mb-8 md:mb-12 tracking-[0.3em] md:tracking-[0.4em]">AMANAT</h3>
            <p className="text-xs tracking-[0.2em] text-stone-400 -mt-6 mb-8">YOUR SILVER ATELIER</p>
            <p className="text-stone-400 max-w-sm font-light leading-relaxed text-sm md:text-base">
              Articulated in silver, defined by movement. 
              Our creations are timeless investigations into form and sculptural ergonomics.
            </p>
          </div>
          <div>
            <h4 className="text-[9px] md:text-[10px] lg:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-12 font-medium text-stone-400">Navigation</h4>
            <ul className="space-y-4 md:space-y-6 text-stone-400 font-light text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em]">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[9px] md:text-[10px] lg:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-12 font-medium text-stone-400">Connection</h4>
            <ul className="space-y-4 md:space-y-6 text-stone-400 font-light text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em]">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="transition-colors border-b border-stone-800 pb-1" onMouseEnter={(e) => e.currentTarget.style.color = '#c9b27d'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-12 md:pt-16 lg:pt-20 flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-stone-500 gap-6 md:gap-0">
          <p>© 2024 Amanat - Your Silver Atelier</p>
        </div>
      </div>
    </footer>
  );
};
