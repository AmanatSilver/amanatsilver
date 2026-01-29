
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-stone-50" data-scroll-section>
      <section className="pt-48 pb-32 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center" data-scroll data-scroll-speed="0.5">
          <h1 className="text-sm uppercase tracking-[0.6em] text-stone-400 mb-12">Our Story</h1>
          <h2 className="text-6xl md:text-8xl font-light mb-16 serif italic tracking-tighter">
            Where Silence meets <br/>Structure.
          </h2>
        </div>
      </section>

      <section className="pb-48">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12" data-scroll data-scroll-speed="-0.3">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
