// Image optimization utilities

export const getOptimizedImageUrl = (url: string, width?: number): string => {
  if (!url) return '';
  
  // If it's a local/development image, return as is
  if (url.startsWith('/') || url.includes('localhost')) {
    return url;
  }

  // Add image optimization query params (works with most CDNs)
  const separator = url.includes('?') ? '&' : '?';
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  params.append('q', '80'); // Quality
  params.append('auto', 'format'); // Auto format (webp if supported)
  
  return `${url}${separator}${params.toString()}`;
};

// Preload critical images
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
};

// Lazy load image with IntersectionObserver
export const useLazyImage = (src: string): [string, boolean] => {
  const [imageSrc, setImageSrc] = React.useState<string>('');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [src]);

  React.useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = imageSrc;
  }, [imageSrc]);

  return [imageSrc, isLoaded];
};

import React from 'react';
