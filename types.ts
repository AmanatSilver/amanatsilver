
export interface Product {
  id: string;
  name: string;
  slug: string;
  collectionId: string;
  description: string;
  materials: string[];
  careInstructions: string;
  images: string[];
  featured: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: string;
}

export interface Enquiry {
  id: string;
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
