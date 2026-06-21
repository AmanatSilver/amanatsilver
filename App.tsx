import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Broches from './pages/Broches';
import Search from './pages/Search';
import ShopByPrice from './pages/ShopByPrice';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import { Loader } from './components/common/Loader';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import { CartProvider } from './contexts/CartContext';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <CartProvider>
          <Loader onComplete={() => setAppIsReady(true)} />
          <div className={`transition-opacity duration-1000 bg-stone-50 ${appIsReady ? 'opacity-100' : 'opacity-0'}`}>
            {appIsReady && (
              <Routes>
                {/* Admin route - no navbar/footer */}
                <Route path="/admin" element={<Admin />} />
              
                {/* Public routes - with navbar/footer */}
                <Route
                  path="/*"
                  element={
                    <>
                      <Navbar />
                      <div className="bg-stone-50">
                        <main className="min-h-screen">
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/collections" element={<Collections />} />
                            <Route path="/broches" element={<Broches />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/shop-by-price/:range" element={<ShopByPrice />} />
                            <Route path="/product/:slug" element={<ProductDetail />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                          </Routes>
                        </main>
                        <Footer />
                      </div>
                    </>
                  }
                />
              </Routes>
            )}
          </div>
        </CartProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;


