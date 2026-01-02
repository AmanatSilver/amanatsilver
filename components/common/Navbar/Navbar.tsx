import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Collections', path: '/collections' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-4 sm:top-6 md:top-8 left-0 right-0 z-50 flex justify-center px-4 sm:px-6">
        <div className={`transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-white/90 backdrop-blur-md shadow-md'} rounded-full px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between gap-4 sm:gap-8 md:gap-12 w-full max-w-5xl`}>
          {/* Logo */}
          <Link to="/" className="text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] font-light hover:opacity-60 transition-opacity text-stone-900 whitespace-nowrap">
            AMANAT SILVER
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-[9px] lg:text-[10px] uppercase tracking-[0.25em] lg:tracking-[0.3em] transition-all text-stone-900 whitespace-nowrap ${pathname === link.path ? 'opacity-100 font-bold' : 'opacity-40 hover:opacity-100'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1 sm:gap-1.5 w-5 sm:w-6 h-5 sm:h-6 justify-center items-center group flex-shrink-0"
            aria-label="Toggle menu"
          >
            <span className={`w-full h-0.5 bg-stone-900 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5 sm:translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-stone-900 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-stone-900 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 sm:-translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-stone-900/95 backdrop-blur-lg z-40 transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 sm:gap-12 px-6">
          <Link to="/" className="text-2xl sm:text-3xl tracking-[0.3em] sm:tracking-[0.5em] font-light text-white mb-4 sm:mb-8">
            AMANAT SILVER
          </Link>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-all text-white ${pathname === link.path ? 'opacity-100 font-bold' : 'opacity-60 hover:opacity-100'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
