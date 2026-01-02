import React from 'react';
import { Link } from 'react-router-dom';

interface CraftsmanshipSectionProps {
  craftsmanshipImage: string;
  craftsmanshipTitle: string;
  craftsmanshipDescription: string;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({ 
  craftsmanshipImage, 
  craftsmanshipTitle, 
  craftsmanshipDescription 
}) => {
  return (
    <section className="bg-stone-900 text-stone-100 py-32 md:py-48 lg:py-64 overflow-hidden" data-scroll-section>
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-40 items-center">
        <div className="relative" data-scroll data-scroll-speed="1.5">
          <div className="aspect-[4/5] bg-stone-800 overflow-hidden grayscale rounded-2xl">
            <img src={craftsmanshipImage} alt="Craftsmanship" className="w-full h-full object-cover object-center opacity-50 transition-transform duration-[3s] hover:scale-110" />
          </div>
          <div className="absolute -bottom-20 -right-20 w-3/4 aspect-square bg-stone-50 p-20 hidden lg:flex flex-col justify-center" data-scroll data-scroll-speed="0.8">
            <h4 className="text-stone-900 text-4xl serif italic mb-10">Artisan Integrity</h4>
            <p className="text-stone-500 text-base font-light leading-relaxed">Every silhouette is a result of a dialogue between precision and poetic form, born from raw recycled silver and refined by human touch in our London atelier.</p>
          </div>
        </div>
        <div className="max-w-2xl">
          <h2 className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.5em] sm:tracking-[0.8em] text-stone-400 mb-8 md:mb-12">{craftsmanshipTitle}</h2>
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-8 md:mb-12 lg:mb-16 leading-none serif italic tracking-tighter text-stone-100">Permanent <br/>By Design.</h3>
          <p className="text-stone-400 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12 md:mb-16 lg:mb-24 max-w-lg">{craftsmanshipDescription}</p>
          <Link to="/about" className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.5em] line-reveal font-medium pb-3 inline-block">The Journey of Metal</Link>
        </div>
      </div>
    </section>
  );
};
