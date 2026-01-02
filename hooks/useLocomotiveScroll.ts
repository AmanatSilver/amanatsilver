import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useLocomotiveScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Handle potential LocomotiveScroll export variations from esm.sh
    const LScroll = (LocomotiveScroll as any).default || LocomotiveScroll;
    
    try {
      scrollRef.current = new LScroll({
        el: containerRef.current,
        smooth: true,
        multiplier: 1.0,
        lerp: 0.08,
        tablet: { smooth: true },
        smartphone: { smooth: true },
      });

      // Listen for custom scroll update event
      const handleUpdateScroll = () => {
        if (scrollRef.current) {
          scrollRef.current.update();
        }
      };
      window.addEventListener('updateScroll', handleUpdateScroll);

      // Sync with GSAP ScrollTrigger
      scrollRef.current.on('scroll', ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(containerRef.current, {
        scrollTop(value) {
          return arguments.length
            ? scrollRef.current?.scrollTo(value, 0, 0)
            : scrollRef.current?.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: containerRef.current?.style.transform ? 'transform' : 'fixed',
      });

      ScrollTrigger.addEventListener('refresh', () => scrollRef.current?.update());
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener('updateScroll', handleUpdateScroll);
        scrollRef.current?.destroy();
        ScrollTrigger.removeEventListener('refresh', () => scrollRef.current?.update());
      };
    } catch (error) {
      console.error('Locomotive Scroll initialization failed:', error);
    }
  }, []);

  // Update scroll on route change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.update();
      scrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
      ScrollTrigger.refresh();
    }
  }, [location]);

  return containerRef;
};
