import React from 'react';
import { Link } from 'react-router-dom';
import { Collection } from '../../types';

interface CollectionGridProps {
  collections: Collection[];
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({ collections }) => {
  return (
    <section className="py-20 md:py-32 container mx-auto px-6 md:px-12" data-scroll-section>
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-[9px] sm:text-[10px] uppercase tracking-[0.6em] text-stone-400 mb-4">Our Collections</h2>
        <p className="text-3xl md:text-4xl lg:text-5xl font-light serif italic text-stone-800">Three Distinct Stories</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {collections.map((collection, index) => (
          <Link key={collection.id} to="/collections" className="group block">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.1em] md:tracking-[0.2em] serif mb-6 md:mb-8 text-stone-900 group-hover:transition-colors group-hover:duration-500" style={{ color: 'inherit' }} onMouseEnter={(e) => e.currentTarget.style.color = '#c9b27d'} onMouseLeave={(e) => e.currentTarget.style.color = '#292524'}>{collection.name}</h3>
            <div className="aspect-[3/4.5] overflow-hidden bg-stone-100 rounded-2xl">
              <img src={collection.heroImage} alt={collection.name} className="w-full h-full object-cover object-center" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
