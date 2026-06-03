import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useLocomotiveScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const LScroll = (LocomotiveScroll as any).default || LocomotiveScroll;

    try {
      scrollRef.current = new LScroll({
        el: containerRef.current,
        smooth: true,
        multiplier: 1.0,
        lerp: 0.1,
        tablet: { smooth: true },
        smartphone: { smooth: false },
        reloadOnContextChange: true,
      });
      // Expose instance on DOM element
      if (containerRef.current) {
        (containerRef.current as any).__locoScroll = scrollRef.current;
      }

      const handleUpdateScroll = () => {
        if (scrollRef.current) {
          scrollRef.current.update();
        }
      };
      window.addEventListener("updateScroll", handleUpdateScroll);

      const handleResize = () => {
        if (scrollRef.current) {
          scrollRef.current.update();
        }
      };
      window.addEventListener("resize", handleResize);

      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.update();
        }
      }, 100);

      scrollRef.current.on("scroll", ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(containerRef.current, {
        scrollTop(value) {
          return arguments.length
            ? scrollRef.current?.scrollTo(value, 0, 0)
            : scrollRef.current?.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: containerRef.current?.style.transform ? "transform" : "fixed",
      });

      ScrollTrigger.addEventListener("refresh", () =>
        scrollRef.current?.update(),
      );
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("updateScroll", handleUpdateScroll);
        window.removeEventListener("resize", handleResize);
        scrollRef.current?.destroy();
        scrollRef.current = null;
        ScrollTrigger.removeEventListener("refresh", () =>
          scrollRef.current?.update(),
        );
      };
    } catch (error) {
      console.error("Locomotive Scroll initialization failed:", error);
    }
  }, []);

  // Fix: destroy and reinitialize on route change instead of just updating
  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    const LScroll = (LocomotiveScroll as any).default || LocomotiveScroll;

    // Destroy old instance
    scrollRef.current.destroy();
    scrollRef.current = null;

    setTimeout(() => {
      if (!containerRef.current) return;

      try {
        // Fresh instance on every route change
        scrollRef.current = new LScroll({
          el: containerRef.current,
          smooth: true,
          multiplier: 1.0,
          lerp: 0.1,
          tablet: { smooth: true },
          smartphone: { smooth: false },
          reloadOnContextChange: true,
        });

        // Expose instance on DOM element
        if (containerRef.current) {
          (containerRef.current as any).__locoScroll = scrollRef.current;
        }

        scrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });

        scrollRef.current.on("scroll", ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(containerRef.current, {
          scrollTop(value) {
            return arguments.length
              ? scrollRef.current?.scrollTo(value, 0, 0)
              : scrollRef.current?.scroll.instance.scroll.y;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: containerRef.current?.style.transform
            ? "transform"
            : "fixed",
        });

        ScrollTrigger.refresh();

        setTimeout(() => scrollRef.current?.update(), 200);
      } catch (error) {
        console.error("Locomotive Scroll reinitialization failed:", error);
      }
    }, 100);
  }, [location]);

  return containerRef;
};
