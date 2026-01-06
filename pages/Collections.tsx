
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Product, Collection } from '../types';

const Collections: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, c] = await Promise.all([
          apiService.getProducts(),
          apiService.getCollections()
        ]);
        // Filter to show only jewelry products (not broches)
        const jewelryProducts = p.filter(product => product.category === 'jewelry');
        setProducts(jewelryProducts);
        setCollections(c);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        // Trigger scroll update after data loads
        setTimeout(() => {
          const event = new CustomEvent('updateScroll');
          window.dispatchEvent(event);
        }, 200);
      }
    };
    fetchData();
  }, []);

  // Update scroll when filter changes
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        const event = new CustomEvent('updateScroll');
        window.dispatchEvent(event);
      }, 100);
    }
  }, [activeFilter, loading]);

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.collectionId === activeFilter);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-stone-50">
        <div className="text-[10px] uppercase tracking-[0.4em] animate-pulse">Refining...</div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32 bg-stone-50 min-h-screen" data-scroll-section>
      <div className="container mx-auto px-6">
        <header className="mb-24 text-center max-w-2xl mx-auto" data-scroll data-scroll-speed="0.5">
          <h1 className="text-6xl font-light mb-8 serif gsap-fade-up">Pure Silver</h1>
          <p className="text-stone-500 font-light leading-relaxed mb-12 gsap-fade-up">
            A comprehensive collection of our handcrafted silver jewelry. Explore by series or browse the full silhouette library.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 border-y border-stone-200 py-6 gsap-fade-up">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`text-[10px] uppercase tracking-[0.3em] line-reveal ${activeFilter === 'all' ? 'opacity-100 font-bold' : 'opacity-40'}`}
            >
              All Works
            </button>
            {collections.map(c => (
              <button 
                key={c.id}
                onClick={() => setActiveFilter(c.id)}
                className={`text-[10px] uppercase tracking-[0.3em] line-reveal ${activeFilter === c.id ? 'opacity-100 font-bold' : 'opacity-40'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20" data-scroll data-scroll-speed="0.3">
          {filteredProducts.map((product, idx) => (
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
              <div className="text-center px-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-2">
                  {collections.find(c => c.id === product.collectionId)?.name} Collection
                </p>
                <h3 className="text-2xl font-light tracking-wide mb-3 serif">{product.name}</h3>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {product.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[8px] uppercase tracking-wider px-2 py-1 bg-stone-100 text-stone-500 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="w-12 h-[1px] bg-stone-300 mx-auto group-hover:w-24 luxury-transition"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
