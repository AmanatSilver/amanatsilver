
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-stone-50" data-scroll-section>
      <section className="pt-48 pb-32 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center" data-scroll data-scroll-speed="2">
          <h1 className="text-sm uppercase tracking-[0.6em] text-stone-400 mb-12">Our Story</h1>
          <h2 className="text-6xl md:text-8xl font-light mb-16 serif italic tracking-tighter">
            Where Silence meets <br/>Structure.
          </h2>
        </div>
      </section>

      <section className="pb-48">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="aspect-[3/4] overflow-hidden" data-scroll data-scroll-speed="1">
              <img 
                src="https://images.unsplash.com/photo-1590548784585-645d893c392b?auto=format&fit=crop&q=80&w=1200" 
                alt="Workshop" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-12" data-scroll data-scroll-speed="-1">
              <h3 className="text-3xl font-light serif leading-snug">
                Amanat was born in 2024 in India from a desire to reclaim the slow, deliberate art of metalwork.
              </h3>
              <p className="text-stone-500 font-light leading-relaxed text-lg">
                In a world of mass production, we choose the path of resistance. Each piece we create is an investigation into the properties of 925 sterling silver—its weight, its warmth, and its remarkable ability to hold a story.
              </p>
              <p className="text-stone-500 font-light leading-relaxed text-lg">
                Our Indian atelier is a sanctuary of focus. We sculpt interfaces between the body and the environment.
              </p>
              <div className="pt-12">
                <div className="w-16 h-[1px] bg-stone-900 mb-8"></div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-medium">Elena Voss, Founder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-100 py-48">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-sm uppercase tracking-[0.6em] text-stone-400 mb-12" data-scroll data-scroll-speed="0.5">The Atelier</h2>
          <h3 className="text-5xl font-light mb-12 serif italic" data-scroll data-scroll-speed="0.7">Responsible Luxury</h3>
          <p className="text-stone-500 font-light leading-loose text-lg mb-16">
            We work exclusively with recycled 925 sterling silver sourced from ethical refiners in the UK and Germany.
          </p>
          <div className="overflow-hidden" data-scroll data-scroll-speed="1.2">
            <img 
              src="https://images.unsplash.com/photo-1610492497673-1961474d2899?auto=format&fit=crop&q=80&w=1600" 
              alt="Materials" 
              className="w-full aspect-video object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
