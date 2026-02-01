// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://amanatsilver.in/api/v1/amanat';
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 60000;
export const IS_DEV = import.meta.env.MODE !== 'production';

// Hardcoded Homepage Content (not provided by backend)
export const HOMEPAGE_CONTENT = {
  heroTitle: 'Amanat',
  heroSubtitle: 'Your Silver Atelier',
  heroImage: '/images/hero-main.jpg',
  brandStoryShort: 'Founded in 2024 on the principle that jewellery is a silent dialogue between the artist and the wearer, Amanat creates timeless silver pieces that transcend seasons.',
  craftsmanshipTitle: 'Where Silver Tells Stories',
  craftsmanshipDescription: "Amanat was founded in 2024 in India with a singular vision: to create silver jewellery that transcends the ephemeral nature of fashion and becomes a permanent part of your story.\nOur Indian atelier is where tradition meets innovation. Each piece is handcrafted by master artisans using only recycled 925 sterling silver, ensuring that luxury and sustainability go hand in hand.\n We believe jewellery is more than adornment—it's a dialogue between the maker and the wearer, a silent language of form and craftsmanship that speaks across generations.",
  craftsmanshipImage: '/images/craftsmanship.jpg'
};
