
export interface Product {
  id?: string;
  _id?: string; // MongoDB ID
  name: string;
  slug: string;
  collectionId: string;
  description: string;
  materials: string[];
  careInstructions: string;
  images: string[];
  featured: boolean;
  tags: string[];
  category?: 'jewelry' | 'broche';
  price: number;
  isNewArrival?: boolean;
}

export interface Collection {
  id?: string;
  _id?: string; // MongoDB ID
  name: string;
  slug: string;
  description: string;
  heroImage: string;
}

export interface Enquiry {
  id?: string;
  _id?: string; // MongoDB ID
  name: string;
  email: string;
  message: string;
  productId?: string;
  createdAt: string;
}

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  brandStoryShort: string;
  craftsmanshipTitle: string;
  craftsmanshipDescription: string;
  craftsmanshipImage: string;
}

export interface Review {
  id?: string;
  _id?: string; // MongoDB ID
  name: string;
  location: string;
  rating: number;
  text: string;
  product?: string;
  date: string;
}
