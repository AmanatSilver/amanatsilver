import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Product } from '../types';

const Broches: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await apiService.getProducts();
        const brocheProducts = allProducts.filter(p => p.category === 'broche');
        setProducts(brocheProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setTimeout(() => {
          const event = new CustomEvent('updateScroll');
          window.dispatchEvent(event);
        }, 200);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-stone-50">
        <div className="text-[10px] uppercase tracking-[0.4em] animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32 bg-stone-50 min-h-screen" data-scroll-section>
      <div className="container mx-auto px-6">
        <header className="mb-24 text-center max-w-2xl mx-auto" data-scroll data-scroll-speed="0.5">
          <h1 className="text-6xl font-light mb-8 serif gsap-fade-up">Men's Broches</h1>
          <p className="text-stone-500 font-light leading-relaxed mb-12 gsap-fade-up">
            Sophisticated silver brooches crafted for the modern gentleman. Each piece combines traditional craftsmanship with contemporary design.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-12 md:gap-y-20" data-scroll data-scroll-speed="0.3">
          {products.map((product, idx) => (
            <Link 
              key={product.id} 
              to={`/product/${product.slug}`} 
              className="group block gsap-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative aspect-[3/4] bg-stone-200 overflow-hidden mb-8 rounded-2xl">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center luxury-transition group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h2 className="text-2xl font-light serif mb-3">{product.name}</h2>
              <p className="text-stone-400 text-sm font-light italic mb-2">{product.description.slice(0, 80)}...</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {product.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-[9px] uppercase tracking-wider px-2 py-1 bg-stone-100 text-stone-500 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-stone-400">No broches available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Broches;
