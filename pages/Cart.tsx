import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartItemsCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-stone-50 min-h-screen pt-32 pb-48" data-scroll-section>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="text-5xl md:text-7xl font-light mb-8 serif tracking-tight">Your Cart</h1>
            <p className="text-stone-500 font-light text-lg mb-12">Your cart is currently empty.</p>
            <Link 
              to="/collections" 
              className="inline-block bg-stone-900 text-white px-12 py-5 text-xs uppercase tracking-[0.3em] hover:bg-stone-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen pt-32 pb-48" data-scroll-section>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light mb-16 serif tracking-tight">Your Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item) => (
                <div 
                  key={item.product.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-12 gap-6 p-6">
                    {/* Product Image */}
                    <div className="col-span-12 sm:col-span-4">
                      <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="col-span-12 sm:col-span-8 flex flex-col justify-between">
                      <div>
                        <Link 
                          to={`/product/${item.product.slug}`}
                          className="text-2xl font-light serif mb-2 hover:text-stone-600 transition-colors block"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-stone-400 font-light mb-4 line-clamp-2">
                          {item.product.description}
                        </p>
                        <div className="text-xs text-stone-400 uppercase tracking-wider">
                          {item.product.materials[0]}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-6 pt-6 border-t border-stone-100">
                        <div className="flex items-center gap-4">
                          <span className="text-xs uppercase tracking-wider text-stone-400">Quantity</span>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-stone-200 rounded-full hover:bg-stone-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-light">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-stone-200 rounded-full hover:bg-stone-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-xs uppercase tracking-wider text-stone-400 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 sticky top-32 shadow-sm">
                <h3 className="text-2xl font-light serif mb-8">Summary</h3>
                
                <div className="space-y-4 mb-8 pb-8 border-b border-stone-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Items</span>
                    <span className="font-light">{getCartItemsCount()}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-400 font-light mb-8 leading-relaxed">
                  Each piece is crafted upon request. Please proceed to checkout to enquire about availability and final pricing.
                </p>

                <Link
                  to="/checkout"
                  className="block w-full bg-stone-900 text-white text-center py-5 text-xs uppercase tracking-[0.3em] hover:bg-stone-800 transition-colors rounded-lg mb-4"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/collections"
                  className="block w-full border border-stone-200 text-stone-900 text-center py-5 text-xs uppercase tracking-[0.3em] hover:bg-stone-100 transition-colors rounded-lg"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
