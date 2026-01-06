import React from 'react';

interface PhilosophySectionProps {
  brandStoryShort: string;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ brandStoryShort }) => {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden" data-scroll-section>
      <div className="container mx-auto px-6 md:px-12">
        {/* Main Quote Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <svg className="w-12 h-12 mx-auto" fill="#c9b27d" viewBox="0 0 24 24">
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
            </svg>
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug serif italic text-stone-800 mb-6">
            {brandStoryShort}
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-[1px]" style={{ backgroundColor: '#9aa89b' }}></div>
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: '#9aa89b' }}>Our Philosophy</span>
            <div className="w-12 h-[1px]" style={{ backgroundColor: '#9aa89b' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};
