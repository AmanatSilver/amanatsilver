import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
}

const heroImages = [
  '/artifact-1.webp',
  '/artifact-2.webp',
  '/artifact-3.webp',
  '/artifact-4.webp',
  '/artifact-5.webp',
  '/artifact-6.webp',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ heroImage, heroTitle, heroSubtitle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-zinc-900 overflow-hidden" data-scroll-section>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(201, 178, 125, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse" style={{ background: 'radial-gradient(circle, #c9b27d 0%, transparent 70%)' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 animate-pulse" style={{ background: 'radial-gradient(circle, #9aa89b 0%, transparent 70%)', animationDelay: '1s' }}></div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between z-10 relative">
        {/* Left Side - Text Content */}
        <div className="text-white max-w-2xl text-center md:text-left order-2 md:order-1">
          <h1 className="text-white text-5xl sm:text-6xl md:text-8xl lg:text-[11rem] font-light tracking-tight mb-6 md:mb-8 gsap-fade-up leading-[0.85]">
            {heroTitle}
          </h1>
          <p className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.5em] sm:tracking-[0.8em] font-light mb-12 md:mb-20 text-stone-300 gsap-fade-up">
            {heroSubtitle}
          </p>
          <div className="gsap-fade-up">
            <Link to="/collections" className="group relative inline-block border px-8 sm:px-12 md:px-16 py-4 md:py-6 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.5em] overflow-hidden transition-all duration-1000" style={{ borderColor: 'rgba(201, 178, 125, 0.3)' }}>
              <span className="relative z-10 text-white transition-colors duration-1000 group-hover:text-stone-900">Explore Collection</span>
              <div className="absolute inset-0 translate-y-full transition-transform duration-1000 cubic-bezier(0.19, 1, 0.22, 1) group-hover:translate-y-0" style={{ backgroundColor: '#c9b27d' }}></div>
            </Link>
          </div>
        </div>

        {/* Right Side - Interactive Image Showcase */}
        <div className="hidden lg:flex flex-1 justify-center items-center order-1 md:order-2 relative h-[600px] w-full max-w-xl">
          {/* Main Rotating Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="relative group cursor-pointer">
                {/* Main Image */}
                <div className="w-72 h-96 rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-700">
                  <img 
                    src={heroImages[currentImageIndex]} 
                    alt="Featured Jewelry" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Decorative Frame */}
                <div className="absolute -inset-4 border border-stone-600/30 rounded-3xl group-hover:border-[#c9b27d]/50 transition-colors duration-700"></div>
                
                {/* Floating Accent Elements */}
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full border border-[#c9b27d]/30 group-hover:border-[#c9b27d]/60 transition-all duration-700 group-hover:scale-110"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full border border-[#9aa89b]/30 group-hover:border-[#9aa89b]/60 transition-all duration-700 group-hover:scale-110"></div>
              </div>
            </div>

            {/* Background Floating Images */}
            <div className="absolute -top-12 -left-12 w-40 h-52 rounded-xl overflow-hidden shadow-xl opacity-40 rotate-12 hover:opacity-60 transition-all duration-500 hover:rotate-6">
              <img src={heroImages[(currentImageIndex + 1) % heroImages.length]} alt="" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="absolute -bottom-16 -right-16 w-36 h-48 rounded-xl overflow-hidden shadow-xl opacity-40 -rotate-12 hover:opacity-60 transition-all duration-500 hover:-rotate-6">
              <img src={heroImages[(currentImageIndex + 2) % heroImages.length]} alt="" className="w-full h-full object-cover grayscale" />
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentImageIndex(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className="group"
              >
                <div 
                  className="h-1 w-8 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: index === currentImageIndex ? '#c9b27d' : 'rgba(255, 255, 255, 0.3)',
                    width: index === currentImageIndex ? '2rem' : '1.5rem'
                  }}
                ></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
