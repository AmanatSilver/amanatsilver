import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  const containerClass = fullScreen 
    ? 'min-h-screen flex flex-col items-center justify-center bg-stone-50' 
    : 'flex flex-col items-center justify-center min-h-[400px]';

  return (
    <div className={containerClass}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900"></div>
      <p className="mt-6 text-stone-600 text-sm uppercase tracking-[0.3em]">{message}</p>
    </div>
  );
};

export const ProductCardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-stone-200 aspect-[3/4] mb-6 rounded-2xl"></div>
    <div className="h-4 bg-stone-200 rounded w-3/4 mb-3"></div>
    <div className="h-3 bg-stone-200 rounded w-1/2 mb-2"></div>
    <div className="flex gap-2 mt-3">
      <div className="h-5 bg-stone-200 rounded w-16"></div>
      <div className="h-5 bg-stone-200 rounded w-20"></div>
    </div>
  </div>
);

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
