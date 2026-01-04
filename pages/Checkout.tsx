import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Checkout: React.FC = () => {
  const { cart, getCartItemsCount, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your order! We will contact you shortly to discuss your bespoke pieces and finalize the details.');
    clearCart();
    window.location.href = '#/';
  };

  if (cart.length === 0) {
    return (
      <div className="bg-stone-50 min-h-screen pt-32 pb-48" data-scroll-section>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center py-20">
            <h1 className="text-5xl md:text-7xl font-light mb-8 serif tracking-tight">Checkout</h1>
            <p className="text-stone-500 font-light text-lg mb-12">Your cart is empty.</p>
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light mb-16 serif tracking-tight">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Contact Information */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-light serif mb-8">Contact Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-3">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-3">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors font-light"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-3">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors font-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-light serif mb-8">Shipping Address</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-3">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors font-light"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-400 mb-3">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors font-light"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-stone-400 mb-3">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors font-light"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-3">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors font-light"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white py-6 text-xs uppercase tracking-[0.3em] hover:bg-stone-800 transition-colors rounded-lg shadow-sm"
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 sticky top-32 shadow-sm">
                <h2 className="text-2xl font-light serif mb-8">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-6 mb-8 pb-8 border-b border-stone-100">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-light text-sm mb-1 truncate">{item.product.name}</h4>
                        <p className="text-xs text-stone-400">Qty: {item.quantity}</p>
                        <p className="text-xs text-stone-400 mt-1">{item.product.materials[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Details */}
                <div className="space-y-4 mb-8 pb-8 border-b border-stone-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">Total Items</span>
                    <span className="font-light">{getCartItemsCount()}</span>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-lg p-6">
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    Each piece at Amanat Silver is crafted to order. Upon placing your order, our artisans will begin handcrafting your bespoke pieces. We will contact you shortly to discuss final pricing, customization options, and estimated completion time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
