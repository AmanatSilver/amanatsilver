import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useGSAPAnimation = (loading: boolean, data: any) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && data) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".gsap-fade-up", 
          { y: 80, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 2, 
            stagger: 0.2, 
            ease: "expo.out",
            delay: 0.4
          }
        );
      }, heroRef);
      return () => ctx.revert();
    }
  }, [loading, data]);

  return heroRef;
};
