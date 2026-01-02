import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanding(true);
      setTimeout(() => {
        setShouldHide(true);
        onComplete();
      }, 800);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (shouldHide) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${isExpanding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center">
        {/* Animated Ring SVG */}
        <svg width="140" height="140" viewBox="0 0 120 120" className={`mb-12 transition-all duration-700 ${isExpanding ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}`}>
          {/* Outer ring with drawing animation */}
          <circle
            cx="60"
            cy="60"
            r="35"
            fill="none"
            stroke="url(#silverGradient)"
            strokeWidth="1.5"
            strokeDasharray="220"
            strokeDashoffset="220"
            className="animate-draw-ring"
          />
          {/* Inner accent ring */}
          <circle
            cx="60"
            cy="60"
            r="28"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
            strokeDasharray="176"
            strokeDashoffset="176"
            className="animate-draw-ring-delayed"
          />
          {/* Shimmer effect */}
          <circle
            cx="60"
            cy="60"
            r="35"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            strokeDasharray="4 216"
            strokeDashoffset="0"
            className="animate-shimmer-rotate"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e5e5e5" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#c0c0c0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Brand name with shimmer */}
        <div className={`relative overflow-hidden transition-opacity duration-700 ${isExpanding ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-[10px] uppercase tracking-[0.6em] text-stone-300 font-light">
            AMANAT SILVER
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40" 
               style={{ transform: 'translateX(-100%)' }}></div>
        </div>
      </div>

      <style>{`
        @keyframes draw-ring {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes shimmer-rotate {
          0% {
            stroke-dashoffset: 0;
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -220;
            opacity: 0.6;
          }
        }
        @keyframes shimmer-slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-draw-ring {
          animation: draw-ring 2s ease-out forwards;
        }
        .animate-draw-ring-delayed {
          animation: draw-ring 2s ease-out 0.3s forwards;
        }
        .animate-shimmer-rotate {
          animation: shimmer-rotate 2.5s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-shimmer-slide {
          animation: shimmer-slide 2s ease-in-out infinite;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
