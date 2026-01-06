import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Product } from '../types';
import { Loader } from '../components/common/Loader';

const ShopByPrice: React.FC = () => {
  const { range } = useParams<{ range: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await apiService.getProducts();
        
        // Filter products based on price range
        let filtered: Product[] = [];
        switch (range) {
          case 'under-2000':
            filtered = allProducts.filter(p => p.price < 2000);
            break;
          case 'under-5000':
            filtered = allProducts.filter(p => p.price < 5000);
            break;
          case 'under-10000':
            filtered = allProducts.filter(p => p.price < 10000);
            break;
          default:
            filtered = allProducts;
        }
        
        setProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [range]);

  const getRangeTitle = () => {
    switch (range) {
      case 'under-2000':
        return 'Under ₹2,000';
      case 'under-5000':
        return 'Under ₹5,000';
      case 'under-10000':
        return 'Under ₹10,000';
      default:
        return 'All Products';
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#f8f6f3] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-gray-800 mb-4">
            {getRangeTitle()}
          </h1>
          <p className="font-['Montserrat'] text-gray-600 text-lg">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'} available
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-['Montserrat'] text-gray-500 text-lg">
              No products found in this price range.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-gray-800 mb-2 group-hover:text-[#c9b27d] transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-['Montserrat'] text-sm text-gray-500 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {product.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-['Montserrat'] rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopByPrice;
