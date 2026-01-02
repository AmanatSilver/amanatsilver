import React from 'react';
import { Link } from 'react-router-dom';
import { SilverRing3D } from './SilverRing3D';

interface HeroSectionProps {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroImage, heroTitle, heroSubtitle }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-zinc-900" data-scroll-section>

      
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between z-10">
        <div className="text-white max-w-2xl text-center md:text-left order-2 md:order-1">
          <h1 className="text-white text-5xl sm:text-6xl md:text-8xl lg:text-[11rem] font-light tracking-tight mb-6 md:mb-8 gsap-fade-up leading-[0.85]">
            {heroTitle}
          </h1>
          <p className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.5em] sm:tracking-[0.8em] font-light mb-12 md:mb-20 text-stone-300 gsap-fade-up">
            {heroSubtitle}
          </p>
          <div className="gsap-fade-up">
            <Link to="/collections" className="group relative inline-block border border-white/10 px-8 sm:px-12 md:px-16 py-4 md:py-6 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.5em] overflow-hidden transition-all duration-1000 hover:border-white">
              <span className="relative z-10 text-white transition-colors duration-1000 group-hover:text-stone-900">Explore Collection</span>
              <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-1000 cubic-bezier(0.19, 1, 0.22, 1) group-hover:translate-y-0"></div>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 justify-center order-1 md:order-2 py-24 md:py-0" data-scroll data-scroll-speed="4">
          <SilverRing3D />
        </div>
      </div>
    </section>
  );
};
