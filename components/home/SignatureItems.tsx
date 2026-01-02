import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface SignatureItemsProps {
  featured: Product[];
}

export const SignatureItems: React.FC<SignatureItemsProps> = ({ featured }) => {
  return (
    <section className="py-32 md:py-48 lg:py-64 container mx-auto px-6 md:px-12" data-scroll-section>
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 md:mb-24 lg:mb-32 border-b border-stone-100 pb-8 md:pb-16">
        <div className="mb-8 md:mb-0">
          <h2 className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-stone-400 mb-4 md:mb-8">Selected Works</h2>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-light serif tracking-tight italic">Key Silhouettes</h3>
        </div>
        <Link to="/collections" className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.5em] line-reveal font-medium">Browse Complete Collection</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 lg:gap-24">
        {featured.map((product, idx) => (
          <Link key={product.id} to={`/product/${product.slug}`} className="group" data-scroll data-scroll-speed={idx * 0.4 + 0.3}>
            <div className="aspect-[4/5] overflow-hidden bg-stone-100 mb-6 md:mb-12 rounded-2xl grayscale-[0.6] group-hover:grayscale-0 transition-all duration-1000 ease-in-out">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-center transition-transform duration-[1.5s] group-hover:scale-108" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-2xl md:text-3xl font-light tracking-wide mb-2 md:mb-3 serif group-hover:italic transition-all duration-700">{product.name}</h4>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-light">925 Recycled Silver</p>
              </div>
              <div className="w-10 h-[1px] bg-stone-200 mt-5 group-hover:w-20 transition-all duration-1000 ease-out"></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
