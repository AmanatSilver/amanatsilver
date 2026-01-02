
import { Product, Collection, Enquiry, HomepageContent } from '../types';
import { products, collections, homepageContent } from './mockData';

// Simulated latency to mimic a real API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  // GET /api/homepage
  async getHomepage(): Promise<HomepageContent> {
    await delay(600);
    return homepageContent;
  },

  // GET /api/collections
  async getCollections(): Promise<Collection[]> {
    await delay(500);
    return collections;
  },

  // GET /api/collections/:slug
  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    await delay(400);
    return collections.find(c => c.slug === slug);
  },

  // GET /api/products
  async getProducts(collectionId?: string): Promise<Product[]> {
    await delay(700);
    if (collectionId) {
      return products.filter(p => p.collectionId === collectionId);
    }
    return products;
  },

  // GET /api/products/:slug
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    await delay(500);
    return products.find(p => p.slug === slug);
  },

  // GET /api/featured-products
  async getFeaturedProducts(): Promise<Product[]> {
    await delay(400);
    // Return one featured product per collection
    const featuredByCollection = new Map<string, Product>();
    products.filter(p => p.featured).forEach(product => {
      if (!featuredByCollection.has(product.collectionId)) {
        featuredByCollection.set(product.collectionId, product);
      }
    });
    return Array.from(featuredByCollection.values());
  },

  // POST /api/enquiry
  async submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt'>): Promise<{ success: boolean }> {
    await delay(1000);
    // In a real Node/Express backend, this would save to a database
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    console.log('Enquiry Received by "Backend":', newEnquiry);
    
    // Simulate persistent storage in localStorage for demo
    const existing = JSON.parse(localStorage.getItem('enquiries') || '[]');
    existing.push(newEnquiry);
    localStorage.setItem('enquiries', JSON.stringify(existing));
    
    return { success: true };
  }
};
