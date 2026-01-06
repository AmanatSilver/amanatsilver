
import { Product, Collection, HomepageContent, Review } from '../types';

export const collections: Collection[] = [
  {
    id: 'c1',
    name: 'Lumina',
    slug: 'lumina',
    description: 'Capturing the ethereal glow of moonlight on polished silver.',
    heroImage: '/artifact-1.webp'
  },
  {
    id: 'c2',
    name: 'Architectural',
    slug: 'architectural',
    description: 'Geometric precision meets organic fluidity.',
    heroImage: '/artifact-15.webp'
  },
  {
    id: 'c3',
    name: 'Ethereal',
    slug: 'ethereal',
    description: 'Delicate forms that whisper of timeless elegance.',
    heroImage: '/artifact-30.webp'
  }
];

export const products: Product[] = [
  // Lumina Collection (1-16)
  {
    id: 'p1',
    name: 'Luna Crescent Ring',
    slug: 'luna-crescent-ring',
    collectionId: 'c1',
    description: 'A hand-hammered sterling silver ring featuring a soft satin finish that reflects light like a moonlit path. Designed for stacking or solo elegance.',
    materials: ['925 Sterling Silver', 'Rhodium Plating'],
    careInstructions: 'Clean with a soft polishing cloth. Avoid contact with perfumes and chlorinated water.',
    images: [
      '/artifact-1.webp',
      '/artifact-2.webp'
    ],
    featured: true,
    tags: ['ring', 'crescent', 'moon', 'stacking', 'minimalist'],
    category: 'jewelry',
    price: 2500,
    isNewArrival: true
  },
  {
    id: 'p2',
    name: 'Moonlight Pendant',
    slug: 'moonlight-pendant',
    collectionId: 'c1',
    description: 'Delicate pendant that captures the essence of moonlight with its luminous silver finish and flowing design.',
    materials: ['925 Sterling Silver'],
    careInstructions: 'Store in an airtight pouch when not in use to prevent oxidation.',
    images: [
      '/artifact-3.webp',
      '/artifact-4.webp'
    ],
    featured: true,
    tags: ['pendant', 'necklace', 'moonlight', 'elegant', 'delicate'],
    category: 'jewelry',
    price: 1800,
    isNewArrival: true
  },
  {
    id: 'p3',
    name: 'Radiant Earrings',
    slug: 'radiant-earrings',
    collectionId: 'c1',
    description: 'Sophisticated earrings that shimmer with every movement, embodying the soft glow of twilight.',
    materials: ['925 Sterling Silver', 'Anti-tarnish coating'],
    careInstructions: 'Clean with a soft polishing cloth. Avoid contact with harsh chemicals.',
    images: [
      '/artifact-5.webp',
      '/artifact-6.webp'
    ],
    featured: false,
    tags: ['earrings', 'shimmer', 'elegant', 'sophisticated', 'evening'],
    category: 'jewelry',
    price: 3200
  },
  {
    id: 'p4',
    name: 'Celestial Bracelet',
    slug: 'celestial-bracelet',
    collectionId: 'c1',
    description: 'A graceful bracelet inspired by celestial bodies, featuring intricate details and a polished finish.',
    materials: ['925 Sterling Silver'],
    careInstructions: 'Handle with care. Professional cleaning recommended annually.',
    images: [
      '/artifact-7.webp',
      '/artifact-8.webp'
    ],
    featured: true,
    tags: ['bracelet', 'celestial', 'stars', 'intricate', 'polished'],
    category: 'jewelry',
    price: 4500
  },
  {
    id: 'p5',
    name: 'Stellar Cuff',
    slug: 'stellar-cuff',
    collectionId: 'c1',
    description: 'Bold yet elegant cuff that channels the energy of distant stars with its luminous surface.',
    materials: ['Heavyweight 925 Sterling Silver'],
    careInstructions: 'Avoid impact with hard surfaces. Clean regularly with silver polish.',
    images: [
      '/artifact-9.webp',
      '/artifact-10.webp'
    ],
    featured: false,
    tags: ['cuff', 'bracelet', 'bold', 'statement', 'luminous'],
    category: 'jewelry',
    price: 5800
  },
  {
    id: 'p6',
    name: 'Twilight Ring Set',
    slug: 'twilight-ring-set',
    collectionId: 'c1',
    description: 'A complementary set of rings designed to be worn together or separately, capturing the magic of twilight.',
    materials: ['925 Sterling Silver', 'Rhodium Plating'],
    careInstructions: 'Clean with a soft polishing cloth. Store separately to prevent scratches.',
    images: [
      '/artifact-11.webp',
      '/artifact-12.webp'
    ],
    featured: true,
    tags: ['ring', 'set', 'twilight', 'stacking', 'versatile'],
    category: 'jewelry',
    price: 3800
  },
  {
    id: 'p7',
    name: 'Shimmer Necklace',
    slug: 'shimmer-necklace',
    collectionId: 'c1',
    description: 'Elegant necklace with a cascading design that captures and reflects light beautifully.',
    materials: ['925 Sterling Silver', 'Anti-tarnish coating'],
    careInstructions: 'Store hanging to maintain shape. Clean with silver cloth as needed.',
    images: [
      '/artifact-13.webp',
      '/artifact-14.webp'
    ],
    featured: false,
    tags: ['necklace', 'shimmer', 'cascading', 'elegant', 'light'],
    category: 'jewelry',
    price: 6200
  },
  {
    id: 'p8',
    name: 'Aura Hoops',
    slug: 'aura-hoops',
    collectionId: 'c1',
    description: 'Classic hoops reimagined with a luminous finish that radiates elegance and sophistication.',
    materials: ['925 Sterling Silver'],
    careInstructions: 'Clean regularly to maintain shine. Avoid wearing during physical activities.',
    images: [
      '/artifact-15.webp',
      '/artifact-16.webp'
    ],
    featured: true,
    tags: ['earrings', 'hoops', 'classic', 'luminous', 'elegant'],
    category: 'jewelry',
    price: 2900
  },

  // Architectural Collection (17-33)
  {
    id: 'p9',
    name: 'Structure Statement Ring',
    slug: 'structure-statement-ring',
    collectionId: 'c2',
    description: 'Bold architectural design featuring geometric precision and modern aesthetics.',
    materials: ['Heavyweight 925 Sterling Silver'],
    careInstructions: 'Avoid impact with hard surfaces. Professional polishing recommended once a year.',
    images: [
      '/artifact-17.webp',
      '/artifact-18.webp'
    ],
    featured: true,
    tags: ['ring', 'architectural', 'geometric', 'bold', 'statement'],
    category: 'jewelry',
    price: 7200
  },
  {
    id: 'p10',
    name: 'Geometric Drop Earrings',
    slug: 'geometric-drop-earrings',
    collectionId: 'c2',
    description: 'Contemporary earrings showcasing angular forms and clean lines with remarkable balance.',
    materials: ['925 Sterling Silver'],
    careInstructions: 'Store in an airtight pouch. Clean with soft cloth to maintain mirror finish.',
    images: [
      '/artifact-19.webp',
      '/artifact-20.webp'
    ],
    featured: true,
    tags: ['earrings', 'geometric', 'angular', 'modern', 'drop'],
    category: 'jewelry',
    price: 4800
  },
  {
    id: 'p11',
    name: 'Angular Cuff Bracelet',
    slug: 'angular-cuff-bracelet',
    collectionId: 'c2',
    description: 'A bold statement piece featuring sharp architectural lines and polished surfaces.',
    materials: ['Heavyweight 925 Sterling Silver'],
    careInstructions: 'Avoid impact. Professional cleaning recommended to maintain edges.',
    images: [
      '/artifact-21.webp',
      '/artifact-22.webp'
    ],
    featured: false,
    tags: ['cuff', 'bracelet', 'angular', 'architectural', 'statement'],
    category: 'jewelry',
    price: 8900
  },
  {
    id: 'p12',
    name: 'Linear Pendant',
    slug: 'linear-pendant',
    collectionId: 'c2',
    description: 'Minimalist pendant with clean geometric lines that create a striking visual impact.',
    materials: ['925 Sterling Silver', 'Anti-tarnish coating'],
    careInstructions: 'Clean with soft cloth. Avoid contact with abrasive surfaces.',
    images: [
      '/artifact-23.webp',
      '/artifact-24.webp'
    ],
    featured: true,
    tags: ['pendant', 'necklace', 'geometric', 'minimalist', 'linear'],
    category: 'jewelry',
    price: 3500
  },
  {
    id: 'p13',
    name: 'Prism Ring',
    slug: 'prism-ring',
    collectionId: 'c2',
    description: 'Architectural masterpiece featuring faceted surfaces that play with light and shadow.',
    materials: ['925 Sterling Silver'],
    careInstructions: 'Handle with care. Polish regularly to maintain reflective surfaces.',
    images: [
      '/artifact-25.webp',
      '/artifact-26.webp'
    ],
    featured: false,
    tags: ['ring', 'prism', 'faceted', 'geometric', 'light'],
    category: 'jewelry',
    price: 4200
  },
  {
    id: 'p14',
    name: 'Vertex Studs',
    slug: 'vertex-studs',
    collectionId: 'c2',
    description: 'Modern stud earrings with sharp geometric forms perfect for everyday elegance.',
    materials: ['925 Sterling Silver', 'Rhodium Plating'],
    careInstructions: 'Clean weekly with polishing cloth. Store in separate compartments.',
    images: [
      '/artifact-27.webp',
      '/artifact-28.webp'
    ],
    featured: true,
    tags: ['earrings', 'studs', 'geometric', 'modern', 'minimalist'],
    category: 'jewelry',
    price: 1900
  },
  {
    id: 'p15',
    name: 'Skyline Necklace',
    slug: 'skyline-necklace',
    collectionId: 'c2',
    description: 'Inspired by urban architecture, this necklace features bold geometric patterns.',
    materials: ['925 Sterling Silver'],
    careInstructions: 'Store flat or hanging. Clean with silver polish as needed.',
    images: [
      '/artifact-29.webp',
      '/artifact-30.webp'
    ],
    featured: false,
    tags: ['necklace', 'architectural', 'urban', 'geometric', 'bold'],
    category: 'jewelry',
    price: 9500
  },
  {
    id: 'p16',
    name: 'Facet Bracelet',
    slug: 'facet-bracelet',
    collectionId: 'c2',
    description: 'Contemporary bracelet with multiple faceted elements that create a dynamic visual.',
    materials: ['925 Sterling Silver', 'Anti-tarnish coating'],
    careInstructions: 'Avoid harsh chemicals. Clean with soft cloth regularly.',
    images: [
      '/artifact-31.webp',
      '/artifact-32.webp'
    ],
    featured: true,
    tags: ['bracelet', 'faceted', 'geometric', 'modern', 'dynamic'],
    category: 'jewelry',
    price: 5600
  },
  {
    id: 'p17',
    name: 'Monument Ring',
    slug: 'monument-ring',
    collectionId: 'c2',
    description: 'Commanding presence with architectural inspiration and bold geometric forms.',
    materials: ['Heavyweight 925 Sterling Silver'],
    careInstructions: 'Professional maintenance recommended. Avoid wearing during manual work.',
    images: [
      '/artifact-33.webp',
      '/artifact-17.webp'
    ],
    featured: false,
    tags: ['ring', 'architectural', 'bold', 'statement', 'geometric'],
    category: 'jewelry',
    price: 11200
  },

  // Ethereal Collection (34-49)
  {
    id: 'p18',
    name: 'Whisper Chain Necklace',
    slug: 'whisper-chain-necklace',
    collectionId: 'c3',
    description: 'Ultra-fine links that drape like liquid silver. A testament to delicate craftsmanship.',
    materials: ['925 Sterling Silver', 'Anti-tarnish coating'],
    careInstructions: 'Handle with care. Best stored hanging to avoid tangles.',
    images: [
      '/artifact-34.webp',
      '/artifact-35.webp'
    ],
    featured: true,
    tags: ['necklace', 'chain', 'delicate', 'ethereal', 'fine'],
    category: 'jewelry',
    price: 3700
  },
  {
    id: 'p19',
    name: 'Delicate Bloom Earrings',
    slug: 'delicate-bloom-earrings',
    collectionId: 'c3',
    description: 'Graceful earrings inspired by nature with intricate floral details and ethereal beauty.',
    materials: ['925 Sterling Silver'],
    careInstructions: 'Store carefully to preserve delicate details. Clean gently with soft brush.',
    images: [
      '/artifact-36.webp',
      '/artifact-37.webp'
    ],
    featured: true,
    tags: ['earrings', 'floral', 'nature', 'delicate', 'intricate'],
    category: 'jewelry',
    price: 2800
  },
  {
    id: 'p20',
    name: 'Gossamer Ring',
    slug: 'gossamer-ring',
    collectionId: 'c3',
    description: 'Delicate band with ethereal presence, perfect for layering or wearing alone.',
    materials: ['925 Sterling Silver', 'Rhodium Plating'],
    careInstructions: 'Handle with extreme care. Clean with soft polishing cloth only.',
    images: [
      '/artifact-38.webp',
      '/artifact-39.webp'
    ],
    featured: false,
    tags: ['ring', 'delicate', 'ethereal', 'minimalist', 'stacking'],
    category: 'jewelry',
    price: 1700
  },
  {
    id: 'p21',
    name: 'Feather Pendant',
    slug: 'feather-pendant',
    collectionId: 'c3',
    description: 'Inspired by nature, this pendant captures the lightness and grace of a feather.',
    materials: ['925 Sterling Silver', 'Anti-tarnish coating'],
    careInstructions: 'Store hanging. Clean with gentle silver polish to preserve details.',
    images: [
      '/artifact-40.webp',
      '/artifact-41.webp'
    ],
    featured: true,
    tags: ['pendant', 'necklace', 'feather', 'nature', 'delicate'],
    category: 'jewelry',
    price: 2400
  },
  {
    id: 'p22',
    name: 'Mist Bracelet',
    slug: 'mist-bracelet',
    collectionId: 'c3',
    description: 'Delicate bracelet that seems to float on the wrist with its ethereal design.',
    materials: ['925 Sterling Silver'],
    careInstructions: 'Handle carefully. Avoid pulling or stretching. Clean with soft cloth.',
    images: [
      '/artifact-42.webp',
      '/artifact-43.webp'
    ],
    featured: false,
    tags: ['bracelet', 'delicate', 'ethereal', 'minimalist', 'fine'],
    category: 'jewelry',
    price: 3100
  },
  {
    id: 'p23',
    name: 'Aurora Drops',
    slug: 'aurora-drops',
    collectionId: 'c3',
    description: 'Flowing earrings that capture the ethereal beauty of the northern lights.',
    materials: ['925 Sterling Silver', 'Anti-tarnish coating'],
    careInstructions: 'Store in soft pouch. Clean gently to maintain finish.',
    images: [
      '/artifact-44.webp',
      '/artifact-45.webp'
    ],
    featured: true,
    tags: ['earrings', 'drop', 'ethereal', 'flowing', 'elegant'],
    category: 'jewelry',
    price: 4100
  },
  {
    id: 'p24',
    name: 'Wisp Ring Set',
    slug: 'wisp-ring-set',
    collectionId: 'c3',
    description: 'Collection of delicate rings designed to be layered for an ethereal effect.',
    materials: ['925 Sterling Silver'],
    careInstructions: 'Store separately to prevent tangling. Clean individually with soft cloth.',
    images: [
      '/artifact-46.webp',
      '/artifact-47.webp'
    ],
    featured: false,
    tags: ['ring', 'set', 'delicate', 'stacking', 'ethereal'],
    category: 'jewelry',
    price: 4600
  },
  {
    id: 'p25',
    name: 'Cloud Necklace',
    slug: 'cloud-necklace',
    collectionId: 'c3',
    description: 'Graceful necklace with flowing design that evokes the softness of clouds.',
    materials: ['925 Sterling Silver', 'Rhodium Plating'],
    careInstructions: 'Store hanging to maintain shape. Clean with specialized silver cloth.',
    images: [
      '/artifact-48.webp',
      '/artifact-49.webp'
    ],
    featured: true,
    tags: ['necklace', 'delicate', 'flowing', 'ethereal', 'elegant'],
    category: 'jewelry',
    price: 7800
  },

  // Men's Broches
  {
    id: 'b1',
    name: 'Classic Lapel Pin',
    slug: 'classic-lapel-pin',
    collectionId: 'c2',
    description: 'Timeless silver broche with clean geometric design, perfect for formal occasions.',
    materials: ['925 Sterling Silver', 'Rhodium Plating'],
    careInstructions: 'Clean with soft cloth. Store in provided box to prevent scratches.',
    images: [
      '/artifact-17.webp',
      '/artifact-18.webp'
    ],
    featured: true,
    tags: ['broche', 'lapel', 'formal', 'geometric', 'classic', 'men'],
    category: 'broche',
    price: 2200
  },
  {
    id: 'b2',
    name: 'Shield Broche',
    slug: 'shield-broche',
    collectionId: 'c2',
    description: 'Bold statement broche with heraldic inspiration and modern execution.',
    materials: ['Heavyweight 925 Sterling Silver'],
    careInstructions: 'Avoid impact. Polish regularly to maintain shine.',
    images: [
      '/artifact-21.webp',
      '/artifact-22.webp'
    ],
    featured: true,
    tags: ['broche', 'shield', 'bold', 'statement', 'heraldic', 'men'],
    category: 'broche',
    price: 6500
  },
  {
    id: 'b3',
    name: 'Angular Pin',
    slug: 'angular-pin',
    collectionId: 'c2',
    description: 'Modern broche with sharp architectural lines, ideal for contemporary styling.',
    materials: ['925 Sterling Silver', 'Anti-tarnish coating'],
    careInstructions: 'Clean with soft cloth. Handle sharp edges carefully.',
    images: [
      '/artifact-25.webp',
      '/artifact-26.webp'
    ],
    featured: false,
    tags: ['broche', 'angular', 'modern', 'architectural', 'minimalist', 'men'],
    category: 'broche',
    price: 1850
  },
  {
    id: 'b4',
    name: 'Crest Broche',
    slug: 'crest-broche',
    collectionId: 'c1',
    description: 'Elegant broche featuring intricate detailing with a polished finish.',
    materials: ['925 Sterling Silver'],
    careInstructions: 'Store in soft pouch. Clean gently to preserve details.',
    images: [
      '/artifact-11.webp',
      '/artifact-12.webp'
    ],
    featured: true,
    tags: ['broche', 'crest', 'elegant', 'intricate', 'polished', 'men'],
    category: 'broche',
    price: 3900
  },
  {
    id: 'b5',
    name: 'Minimalist Tie Pin',
    slug: 'minimalist-tie-pin',
    collectionId: 'c2',
    description: 'Sleek and simple broche perfect for everyday sophistication.',
    materials: ['925 Sterling Silver', 'Rhodium Plating'],
    careInstructions: 'Clean weekly. Store separately to avoid scratching.',
    images: [
      '/artifact-29.webp',
      '/artifact-30.webp'
    ],
    featured: false,
    tags: ['broche', 'minimalist', 'tie', 'simple', 'modern', 'men'],
    category: 'broche',
    price: 1600
  },
  {
    id: 'b6',
    name: 'Ornate Lapel Broche',
    slug: 'ornate-lapel-broche',
    collectionId: 'c3',
    description: 'Detailed broche with delicate craftsmanship for special occasions.',
    materials: ['925 Sterling Silver', 'Anti-tarnish coating'],
    careInstructions: 'Handle with care. Professional cleaning recommended.',
    images: [
      '/artifact-36.webp',
      '/artifact-37.webp'
    ],
    featured: true,
    tags: ['broche', 'ornate', 'detailed', 'special', 'delicate', 'men'],
    category: 'broche',
    price: 4700
  }
];

export const homepageContent: HomepageContent = {
  heroTitle: 'Amanat',
  heroSubtitle: 'Your Silver Atelier',
  heroImage: '/artifact-1.webp',
  brandStoryShort: 'Founded in 2024 on the principle that jewellery is a silent dialogue between the artist and the wearer, Amanat creates timeless silver pieces that transcend seasons.',
  craftsmanshipTitle: 'The Art of the Forge',
  craftsmanshipDescription: 'Every piece begins in our Indian atelier as a raw silver ingot. Through heat, pressure, and meticulous hand-tooling, we bring form to the void.',
  craftsmanshipImage: '/artifact-25.webp'
};

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Charlotte Hayes',
    location: 'Mumbai, India',
    rating: 5,
    text: 'The Luna Crescent Ring is absolutely stunning. The craftsmanship is impeccable, and it feels like wearing art. I receive compliments every time I wear it.',
    product: 'Luna Crescent Ring',
    date: '2025-12-15'
  },
  {
    id: 'r2',
    name: 'Sophie Laurent',
    location: 'Paris, France',
    rating: 5,
    text: 'Exquisite attention to detail. The silver has such a beautiful finish and weight. This is luxury jewellery that will last a lifetime.',
    product: 'Whisper Chain Necklace',
    date: '2025-12-08'
  },
  {
    id: 'r3',
    name: 'Emma Richardson',
    location: 'New York, USA',
    rating: 5,
    text: 'I visited the atelier in India and was blown away by the craftsmanship. Each piece tells a story. The service was exceptional and very personal.',
    date: '2025-11-22'
  },
  {
    id: 'r4',
    name: 'Isabella Martinez',
    location: 'Barcelona, Spain',
    rating: 5,
    text: 'The Geometric Drop Earrings are architectural masterpieces. They are surprisingly lightweight yet substantial. Truly unique design.',
    product: 'Geometric Drop Earrings',
    date: '2025-11-30'
  },
  {
    id: 'r5',
    name: 'Amelia Thompson',
    location: 'Melbourne, Australia',
    rating: 5,
    text: 'Outstanding quality and elegance. The packaging alone shows the care and attention to detail. This is jewellery that transcends trends.',
    product: 'Celestial Bracelet',
    date: '2025-12-01'
  }
];
