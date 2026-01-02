import React from 'react';
import { Link } from 'react-router-dom';
import { Collection } from '../../types';

interface CollectionGridProps {
  collections: Collection[];
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({ collections }) => {
  return (
    <section className="pb-32 md:pb-48 lg:pb-64 container mx-auto px-6 md:px-12" data-scroll-section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
        {collections.map((collection, index) => (
          <Link key={collection.id} to="/collections" className="group block" data-scroll data-scroll-speed={index * 0.5 + 0.5}>
            <div className="relative aspect-[3/4.5] overflow-hidden bg-stone-100 rounded-2xl">
              <img src={collection.heroImage} alt={collection.name} className="w-full h-full object-cover object-center transition-transform duration-[2.5s] ease-out group-hover:scale-115" />
              <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 text-white">
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] block mb-2 md:mb-4 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-1000">Explore</span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.1em] md:tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-1000 delay-100">{collection.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
