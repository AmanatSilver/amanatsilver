
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader } from './components/common/Loader';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { useLocomotiveScroll } from './hooks';
import { CartProvider } from './contexts/CartContext';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LocomotiveScrollWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useLocomotiveScroll();

  return (
    <div data-scroll-container ref={containerRef} className="bg-stone-50">
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  return (
    <Router>
      <CartProvider>
        <Loader onComplete={() => setAppIsReady(true)} />
        <div className={`transition-opacity duration-1000 bg-stone-50 ${appIsReady ? 'opacity-100' : 'opacity-0'}`}>
          {appIsReady && (
            <>
              <Navbar />
              <LocomotiveScrollWrapper>
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
              </LocomotiveScrollWrapper>
            </>
          )}
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;

