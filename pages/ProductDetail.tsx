import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Product, Collection } from '../types';
import { useCart } from '../contexts/CartContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const { addToCart } = useCart();
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 6 seconds
  useEffect(() => {
    if (!product) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [product]);

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

          // Find similar products based on matching tags
          const allProducts = await apiService.getProducts();
          
          // Ensure tags is always an array
          const currentTags = Array.isArray(p.tags) ? p.tags : [];
          
          const similar = allProducts
            .filter(prod => {
              // Compare both id and _id to handle MongoDB documents
              const currentProductId = p.id || p._id;
              const prodId = prod.id || prod._id;
              return prodId !== currentProductId;
            })
            .map(prod => {
              const prodTags = Array.isArray(prod.tags) ? prod.tags : [];
              const matchCount = prodTags.filter(tag => currentTags.includes(tag)).length;
              return {
                product: prod,
                matchCount,
                prodTags
              };
            })
            .filter(({ matchCount }) => matchCount > 0) // Only products with at least 1 matching tag
            .sort((a, b) => b.matchCount - a.matchCount) // Sort by most matches first
            .slice(0, 3) // Get top 3
            .map(({ product }) => product);
          
          setSimilarProducts(similar);
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
    return <LoadingSpinner fullScreen message="Loading product..." />;
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32">
        <EmptyState 
          title="Product Not Found"
          message="The product you're looking for doesn't exist or has been removed."
          actionLabel="View All Products"
          onAction={() => window.location.href = '#/collections'}
        />
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-32 pb-48" data-scroll-section>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Image Gallery - Amazon Style */}
          <div className="lg:col-span-7" data-scroll data-scroll-speed="0.5">
            <div className="flex gap-4">
              {/* Thumbnail Column */}
              <div className="flex flex-col gap-3 w-20">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`aspect-square bg-stone-200 overflow-hidden rounded-lg border-2 transition-all ${
                      currentImageIndex === i ? 'border-stone-400' : 'border-transparent hover:border-stone-300'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 aspect-[4/5] max-w-lg bg-stone-200 overflow-hidden rounded-2xl">
                <img 
                  src={product.images[currentImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center transition-opacity duration-500" 
                />
              </div>
            </div>
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
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="container mx-auto px-6 mt-32 pb-20">
            <div className="border-t border-stone-200 pt-20">
              <h2 className="text-3xl md:text-4xl font-light serif mb-12 text-center">See Similar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {similarProducts.map((similarProduct) => (
                  <Link 
                    key={similarProduct.id} 
                    to={`/product/${similarProduct.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[3/4] bg-stone-200 overflow-hidden mb-6 rounded-2xl">
                      <img 
                        src={similarProduct.images[0]} 
                        alt={similarProduct.name}
                        className="w-full h-full object-cover object-center luxury-transition group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h3 className="text-xl font-light serif mb-2">{similarProduct.name}</h3>
                    <p className="text-stone-400 text-sm font-light mb-3">{similarProduct.description.slice(0, 60)}...</p>
                    <div className="flex flex-wrap gap-2">
                      {similarProduct.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[8px] uppercase tracking-wider px-2 py-1 bg-stone-100 text-stone-500 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
