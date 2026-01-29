import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface NewArrivalsProps {
  products: Product[];
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Products are already filtered from backend's /products/new-arrivals endpoint
  // But keep the filter as a safety check
  const newArrivals = products.filter(p => p.isNewArrival !== false);
  
  // Ensure component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (newArrivals.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newArrivals.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [newArrivals.length]);
  
  if (newArrivals.length === 0 || !mounted) return null;
  
  const currentProduct = newArrivals[currentIndex];
  
  if (!currentProduct) return null;
  
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-[#f8f6f3]" data-scroll-section>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16" data-scroll>
          <p className="font-['Montserrat'] text-xs uppercase tracking-[0.3em] text-[#c9b27d] mb-4">
            Latest Additions
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl font-light text-gray-800">
            New Arrivals
          </h2>
        </div>
        
        {/* Product Showcase */}
        <div key={currentProduct.id} className="grid md:grid-cols-2 gap-12 items-center" data-scroll>
          {/* Image */}
          <Link 
            to={`/product/${currentProduct.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-xl will-change-transform"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={currentProduct.images[0]} 
                alt={currentProduct.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="eager"
              />
            </div>
            
            {/* New Badge */}
            <div className="absolute top-6 right-6 bg-[#c9b27d] text-white px-4 py-2 rounded-full">
              <p className="font-['Montserrat'] text-xs uppercase tracking-wider font-medium">
                New
              </p>
            </div>
          </Link>
          
          {/* Content */}
          <div className="space-y-6 min-h-[400px] flex flex-col justify-center">
            <div>
              <h3 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light text-gray-800 mb-4">
                {currentProduct.name}
              </h3>
              <p className="font-['Montserrat'] text-gray-600 leading-relaxed text-base md:text-lg">
                {currentProduct.description}
              </p>
            </div>
            
            {/* Tags */}
            {currentProduct.tags && currentProduct.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentProduct.tags.slice(0, 4).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-['Montserrat'] rounded-full uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Materials */}
            <div className="space-y-2">
              <p className="font-['Montserrat'] text-xs uppercase tracking-[0.2em] text-gray-500">
                Materials
              </p>
              <div className="flex flex-wrap gap-2">
                {currentProduct.materials.map((material, index) => (
                  <span 
                    key={index}
                    className="font-['Montserrat'] text-sm text-gray-700"
                  >
                    {material}{index < currentProduct.materials.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <Link 
              to={`/product/${currentProduct.slug}`}
              className="inline-block bg-gray-900 hover:bg-[#c9b27d] text-white px-8 py-4 rounded-full font-['Montserrat'] text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Discover More
            </Link>
            
            {/* Indicators */}
            {newArrivals.length > 1 && (
              <div className="flex gap-2 pt-4">
                {newArrivals.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-12 bg-[#c9b27d]' 
                        : 'w-6 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`View product ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
