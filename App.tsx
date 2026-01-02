
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader } from './components/common/Loader';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { useLocomotiveScroll } from './hooks';

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
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </LocomotiveScrollWrapper>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;

