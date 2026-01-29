// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://amanatsilver.in/api/v1/amanat';
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;
export const IS_DEV = import.meta.env.MODE !== 'production';

// Hardcoded Homepage Content (not provided by backend)
export const HOMEPAGE_CONTENT = {
  heroTitle: 'Timeless Elegance in Silver',
  heroSubtitle: 'Handcrafted Jewelry & Broches',
  heroImage: '/images/hero-main.jpg',
  brandStoryShort: 'Each piece tells a story of craftsmanship, tradition, and timeless beauty. Our artisans pour their heart into every creation.',
  craftsmanshipTitle: 'Artisan Craftsmanship',
  craftsmanshipDescription: 'Every piece is meticulously handcrafted by skilled artisans using traditional techniques passed down through generations.',
  craftsmanshipImage: '/images/craftsmanship.jpg'
};
