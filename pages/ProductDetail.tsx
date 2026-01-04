import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Product, Collection } from '../types';
import { useCart } from '../contexts/CartContext';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const { addToCart } = useCart();
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        const p = await apiService.getProductBySlug(slug);
        if (p) {
          setProduct(p);
          const c = await apiService.getCollectionBySlug(
            (await apiService.getCollections()).find(x => x.id === p.collectionId)?.slug || ''
          );
          if (c) setCollection(c);
        }
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
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 3000);
    }
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-32 pb-48" data-scroll-section>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Image Gallery */}
          <div className="lg:col-span-7 space-y-12" data-scroll data-scroll-speed="0.5">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-[4/5] bg-stone-200 overflow-hidden rounded-2xl gsap-fade-up">
                <img src={img} alt={product.name} className="w-full h-full object-cover object-center" />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5" data-scroll data-scroll-speed="0.3">
            <div className="sticky top-40">
              <nav className="mb-12 flex items-center space-x-4 text-[10px] uppercase tracking-[0.2em] text-stone-400">
                <Link to="/collections" className="hover:text-stone-800">Catalogue</Link>
                <span>/</span>
                <span className="text-stone-800">{product.name}</span>
              </nav>

              <h1 className="text-5xl md:text-7xl font-light mb-8 serif tracking-tight">{product.name}</h1>
              <p className="text-stone-500 font-light leading-relaxed text-lg mb-12">
                {product.description}
              </p>

              <div className="space-y-10 border-y border-stone-200 py-12 mb-12">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] mb-4 text-stone-400">Materials</h4>
                  <ul className="text-sm space-y-2 font-light">
                    {product.materials.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] mb-4 text-stone-400">Care</h4>
                  <p className="text-sm font-light leading-relaxed">{product.careInstructions}</p>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <button 
                  onClick={handleAddToCart}
                  className="bg-stone-900 text-white text-center py-5 text-xs uppercase tracking-[0.3em] hover:bg-stone-800 transition-colors relative"
                >
                  {showAddedMessage ? 'Added to Cart!' : 'Add to Cart'}
                </button>
                <Link 
                  to="/contact" 
                  state={{ productName: product.name }}
                  className="border border-stone-200 text-stone-900 text-center py-5 text-xs uppercase tracking-[0.3em] hover:bg-stone-100 transition-colors"
                >
                  Enquire About This Piece
                </Link>
                <Link 
                  to="/contact"
                  className="border border-stone-200 text-stone-900 text-center py-5 text-xs uppercase tracking-[0.3em] hover:bg-stone-100 transition-colors"
                >
                  Visit Our London Atelier
                </Link>
              </div>

              {collection && (
                <div className="mt-20 pt-12 border-t border-stone-100">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 block mb-4">From the series</span>
                  <h3 className="text-2xl font-light serif mb-4">{collection.name}</h3>
                  <p className="text-sm text-stone-400 font-light italic mb-6 leading-relaxed">
                    {collection.description}
                  </p>
                  <Link to="/collections" className="text-[10px] uppercase tracking-[0.2em] line-reveal">View collection</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
