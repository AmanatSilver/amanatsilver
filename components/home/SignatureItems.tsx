import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface SignatureItemsProps {
  featured: Product[];
}

export const SignatureItems: React.FC<SignatureItemsProps> = ({ featured }) => {
  // Show only first 2 featured items for editorial layout
  const showcaseItems = featured.slice(0, 2);
  
  return (
    <section className="py-20 md:py-32 bg-stone-900 text-stone-100" data-scroll-section>
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <h2 className="text-[9px] sm:text-[10px] uppercase tracking-[0.6em] text-stone-400 mb-6">Curated Selection</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-light serif italic text-stone-100 mb-8">
            This Month's Featured Pieces
          </h3>
          <p className="text-stone-400 text-sm md:text-base font-light leading-relaxed">
            Each month, we spotlight exceptional pieces that embody our commitment to timeless design and masterful craftsmanship.
          </p>
        </div>

        {/* Editorial Layout - Two Featured Items */}
        <div className="space-y-16 md:space-y-24 max-w-7xl mx-auto">
          {showcaseItems.map((product, idx) => (
            <div 
              key={product.id} 
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              {/* Image */}
              <Link 
                to={`/product/${product.slug}`} 
                className={`group relative ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}
              >
                <div className="aspect-[4/5] overflow-hidden bg-stone-800 rounded-2xl">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[2s] ease-out"
                  />
                </div>
                <div className="absolute top-6 right-6 backdrop-blur-sm px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(201, 178, 125, 0.9)' }}>
                  <span className="text-[8px] uppercase tracking-[0.3em] text-white">Featured</span>
                </div>
              </Link>

              {/* Content */}
              <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.5em] text-stone-500 block mb-4">
                    {product.materials[0]}
                  </span>
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-light serif mb-6 text-stone-100">
                    {product.name}
                  </h4>
                  <p className="text-stone-400 text-base md:text-lg font-light leading-relaxed mb-8">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to={`/product/${product.slug}`}
                    className="inline-flex items-center justify-center text-white px-8 py-4 text-xs uppercase tracking-[0.3em] transition-colors group"
                    style={{ backgroundColor: '#c9b27d' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b8a06d'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#c9b27d'}
                  >
                    <span>View Details</span>
                    <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link 
                    to="/collections"
                    className="inline-flex items-center justify-center border text-stone-300 px-8 py-4 text-xs uppercase tracking-[0.3em] transition-colors"
                    style={{ borderColor: '#9aa89b' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c9b27d'; e.currentTarget.style.color = '#c9b27d'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#9aa89b'; e.currentTarget.style.color = '#d6d3d1'; }}
                  >
                    Explore Collection
                  </Link>
                </div>

                <div className="pt-6 border-t border-stone-800">
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Handcrafted with care • Limited availability
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-16 md:mt-24">
          <Link 
            to="/collections"
            className="inline-block text-[10px] uppercase tracking-[0.5em] text-stone-400 transition-colors pb-2 border-b"
            style={{ borderColor: '#9aa89b' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#c9b27d'; e.currentTarget.style.borderColor = '#c9b27d'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#a8a29e'; e.currentTarget.style.borderColor = '#9aa89b'; }}
          >
            View All Pieces
          </Link>
        </div>
      </div>
    </section>
  );
};
