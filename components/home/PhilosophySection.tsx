import React from 'react';

interface PhilosophySectionProps {
  brandStoryShort: string;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ brandStoryShort }) => {
  return (
    <section className="py-32 md:py-48 lg:py-64 xl:py-80 container mx-auto px-6 md:px-12 max-w-6xl text-center" data-scroll-section>
      <div data-scroll data-scroll-speed="1.2">
        <h2 className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.5em] sm:tracking-[0.8em] text-stone-400 mb-12 md:mb-20">The Ethos</h2>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight serif italic text-stone-800 tracking-tighter">
          "{brandStoryShort}"
        </p>
        <div className="w-24 h-[1px] bg-stone-200 mx-auto mt-16 md:mt-24"></div>
      </div>
    </section>
  );
};
