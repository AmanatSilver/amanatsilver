import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import { apiService } from '../../../services/api';
import { Product } from '../../../types';

const navLinks = [
  { name: 'Pure Silver', path: '/collections' },
  { name: 'Broches', path: '/broches' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const priceRanges = [
  { name: 'Under ₹2,000', path: '/shop-by-price/under-2000' },
  { name: 'Under ₹5,000', path: '/shop-by-price/under-5000' },
  { name: 'Under ₹10,000', path: '/shop-by-price/under-10000' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowDropdown(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setIsSearching(true);
      try {
        const allProducts = await apiService.getProducts();
        const searchTerm = searchQuery.toLowerCase();
        
        const filtered = allProducts
          .filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          )
          .slice(0, 5); // Show max 5 results
        
        setSearchResults(filtered);
        setShowDropdown(filtered.length > 0);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target as Node)) {
        setShowPriceDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      setIsScrolled(currentScrollY > 50);
      
      // Determine scroll direction and visibility
      if (currentScrollY < 10) {
        // Always show at top of page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`fixed top-4 sm:top-6 md:top-8 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-32'}`}>
        <div className={`transition-all duration-500 ${isScrolled ? 'bg-white/70' : 'bg-white/60'} backdrop-blur-2xl border border-white/20 shadow-2xl rounded-full px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between gap-3 sm:gap-4 md:gap-6 w-full max-w-6xl`} style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
          {/* Logo */}
          <Link to="/" className="text-sm sm:text-base md:text-lg tracking-[0.2em] sm:tracking-[0.3em] font-semibold hover:opacity-60 transition-opacity text-stone-900 whitespace-nowrap">
            AMANAT
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md relative group" ref={searchRef}>
            <div className="relative w-full">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                placeholder="Search exquisite pieces..."
                className="w-full bg-gradient-to-r from-stone-50/80 to-stone-100/60 border border-stone-300/30 rounded-full px-5 py-2 pr-10 text-xs font-light tracking-wide focus:outline-none focus:border-[#c9b27d]/50 focus:shadow-lg focus:shadow-[#c9b27d]/10 placeholder:text-stone-400/70 placeholder:italic placeholder:font-light transition-all duration-500 hover:border-[#c9b27d]/30 hover:shadow-md hover:shadow-[#c9b27d]/5"
                style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#c9b27d] transition-all duration-300 group-hover:scale-110">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Search Dropdown */}
              {showDropdown && (
                <div className="absolute top-full mt-3 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-stone-200/50 overflow-hidden z-50 max-h-96 overflow-y-auto" style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}>
                  {isSearching ? (
                    <div className="p-6 text-center">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-light animate-pulse">Searching...</div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((product, idx) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.slug}`}
                          onClick={() => {
                            setSearchQuery('');
                            setShowDropdown(false);
                          }}
                          className="flex items-center gap-4 px-5 py-4 hover:bg-gradient-to-r hover:from-[#c9b27d]/5 hover:to-transparent transition-all duration-300 border-b border-stone-100/50 last:border-b-0 group"
                          style={{ animationDelay: `${idx * 50}ms` }}
                        >
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-light serif text-stone-900 truncate mb-1 group-hover:text-[#c9b27d] transition-colors">{product.name}</p>
                            <p className="text-[10px] text-stone-500 truncate font-light leading-relaxed">{product.description.slice(0, 50)}...</p>
                            <div className="flex gap-1.5 mt-2">
                              {product.tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className="text-[8px] uppercase tracking-wider px-2 py-0.5 bg-stone-50 text-stone-500 rounded-md font-medium border border-stone-200/30">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Link>
                      ))}
                      {searchResults.length >= 5 && (
                        <button
                          onClick={() => {
                            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                            setSearchQuery('');
                            setShowDropdown(false);
                          }}
                          className="w-full px-5 py-4 text-[10px] uppercase tracking-[0.25em] text-center font-medium text-[#c9b27d] hover:bg-[#c9b27d]/5 border-t border-stone-200/50 transition-all duration-300"
                        >
                          View all results →
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-[9px] lg:text-[10px] uppercase tracking-[0.25em] lg:tracking-[0.3em] transition-all whitespace-nowrap font-semibold ${pathname === link.path ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                style={{ color: pathname === link.path ? '#c9b27d' : '#292524' }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Shop by Price Dropdown */}
            <div className="relative" ref={priceDropdownRef}>
              <button 
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                onMouseEnter={() => setShowPriceDropdown(true)}
                className={`text-[9px] lg:text-[10px] uppercase tracking-[0.25em] lg:tracking-[0.3em] transition-all whitespace-nowrap font-semibold ${pathname.includes('/shop-by-price') ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                style={{ color: pathname.includes('/shop-by-price') ? '#c9b27d' : '#292524' }}
              >
                Shop by Price
              </button>
              
              {showPriceDropdown && (
                <div 
                  className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden z-50 min-w-[180px]"
                  onMouseLeave={() => setShowPriceDropdown(false)}
                >
                  {priceRanges.map((range) => (
                    <Link
                      key={range.path}
                      to={range.path}
                      onClick={() => setShowPriceDropdown(false)}
                      className="block px-4 py-3 text-[10px] uppercase tracking-[0.25em] font-medium text-stone-700 hover:bg-[#c9b27d]/10 hover:text-[#c9b27d] transition-colors whitespace-nowrap"
                    >
                      {range.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              to="/cart"
              className="relative opacity-40 hover:opacity-100 transition-all"
              aria-label="Shopping Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-medium" style={{ backgroundColor: '#c9b27d' }}>
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Cart and Hamburger */}
          <div className="md:hidden flex items-center gap-3 sm:gap-4">
            <Link 
              to="/cart"
              className="relative opacity-40 hover:opacity-100 transition-all"
              aria-label="Shopping Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-medium" style={{ backgroundColor: '#c9b27d' }}>
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col gap-1 sm:gap-1.5 w-5 sm:w-6 h-5 sm:h-6 justify-center items-center group flex-shrink-0"
              aria-label="Toggle menu"
            >
              <span className={`w-full h-0.5 bg-stone-900 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5 sm:translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-stone-900 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-stone-900 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 sm:-translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} style={{ backgroundColor: 'rgba(28, 25, 23, 0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div className="flex flex-col items-center justify-center h-full gap-6 sm:gap-8 px-6 overflow-y-auto py-20">
          <Link to="/" className="text-2xl sm:text-3xl tracking-[0.3em] sm:tracking-[0.5em] font-semibold text-white mb-2 sm:mb-4">
            AMANAT
          </Link>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] transition-all text-white font-semibold ${pathname === link.path ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              style={{ color: pathname === link.path ? '#c9b27d' : 'white' }}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Shop by Price in Mobile */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/40 font-semibold">Shop by Price</p>
            {priceRanges.map((range) => (
              <Link 
                key={range.path} 
                to={range.path}
                className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white/100 transition-all font-medium"
              >
                {range.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
