import React, { useState, useEffect } from 'react';
import { Review } from '../../types';

interface ReviewSectionProps {
  reviews: Review[];
  monthlyImage: string;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, monthlyImage }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
        setIsTransitioning(false);
      }, 300); // Fade out duration
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  const currentReview = reviews[currentReviewIndex];

  // Don't render if no reviews available
  if (!reviews || reviews.length === 0 || !currentReview) {
    return null;
  }

  return (
    <section className="bg-stone-900 text-stone-100 py-20 md:py-32 overflow-hidden" data-scroll-section>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 lg:gap-24 items-start">
        
          {/* Left Side - Background Image with Review Overlay */}
          <div className="relative order-2 lg:order-1 flex items-center">
            {/* Main Static Image - Smaller and proportional */}
            <div className="aspect-[3/4] max-w-sm bg-stone-800 overflow-hidden grayscale rounded-2xl mb-8 lg:mb-0">
              <img src="/artifact-25.webp" alt="Craftsmanship" className="w-full h-full object-cover object-center opacity-50" />
            </div>
            
            {/* Review Card Overlay - Desktop Only */}
            <div className="absolute -bottom-8 -right-8 xl:-bottom-10 xl:-right-10 w-11/12 lg:w-[80%] max-w-md bg-stone-50 p-6 xl:p-8 hidden lg:flex flex-col shadow-2xl rounded-xl">
              {/* Auto-scrolling Review */}
              <div className="space-y-4">
                <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                  {/* Review Text */}
                  <p className="text-stone-700 text-sm leading-relaxed mb-4 italic">
                    "{currentReview.text}"
                  </p>
                  
                  {/* Review Author */}
                  <div className="border-t border-stone-300 pt-3 space-y-1">
                    <p className="text-stone-900 font-medium text-sm">{currentReview.name}</p>
                    <p className="text-stone-500 text-xs">{currentReview.location}</p>
                    {currentReview.product && (
                      <p className="text-stone-400 text-xs uppercase tracking-wider">{currentReview.product}</p>
                    )}
                  </div>
                </div>
                
                {/* Progress Indicators */}
                <div className="flex gap-2 pt-2">
                  {reviews.map((_, index) => (
                    <div
                      key={index}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{ backgroundColor: index === currentReviewIndex ? '#c9b27d' : '#d6d3d1' }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Mobile Review Section */}
            <div className="lg:hidden bg-stone-50 p-6 rounded-xl shadow-lg">
              <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                {/* Review Text */}
                <p className="text-stone-700 text-sm leading-relaxed mb-4 italic">
                  "{currentReview.text}"
                </p>
                
                {/* Review Author */}
                <div className="border-t border-stone-300 pt-3 space-y-1">
                  <p className="text-stone-900 font-medium text-sm">{currentReview.name}</p>
                  <p className="text-stone-500 text-xs">{currentReview.location}</p>
                  {currentReview.product && (
                    <p className="text-stone-400 text-xs uppercase tracking-wider">{currentReview.product}</p>
                  )}
                </div>
              </div>
              
              {/* Progress Indicators */}
              <div className="flex gap-2 mt-5">
                {reviews.map((_, index) => (
                  <div
                    key={index}
                    className="h-1 flex-1 rounded-full transition-all duration-300"
                    style={{ backgroundColor: index === currentReviewIndex ? '#c9b27d' : '#d6d3d1' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - About Us */}
          <div className="order-1 lg:order-2 space-y-6 md:space-y-8">
            <div>
              <h2 className="text-[9px] sm:text-[10px] uppercase tracking-[0.6em] text-stone-400 mb-4">About Us</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight serif italic tracking-tighter text-stone-100">
                Where Silver <br/>Tells Stories
              </h3>
            </div>
            
            <div className="space-y-5 text-stone-400 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              <p>
                Amanat was founded in 2024 in India with a singular vision: to create silver jewellery that transcends the ephemeral nature of fashion and becomes a permanent part of your story.
              </p>
              <p>
                Our Indian atelier is where tradition meets innovation. Each piece is handcrafted by master artisans using only recycled 925 sterling silver, ensuring that luxury and sustainability go hand in hand.
              </p>
              <p>
                We believe jewellery is more than adornment—it's a dialogue between the maker and the wearer, a silent language of form and craftsmanship that speaks across generations.
              </p>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
};
