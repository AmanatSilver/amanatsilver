import { Product, Collection, Enquiry, HomepageContent, Review } from '../types';
import { API_BASE_URL, API_TIMEOUT, HOMEPAGE_CONTENT } from '../config';

// API Response wrapper
interface ApiResponse<T> {
  success: boolean;
  status?: string;
  data?: T;
  results?: number;
  message?: string;
}

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: any; timestamp: number }>();

const getCachedData = <T>(key: string): T | null => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  cache.delete(key);
  return null;
};

const setCachedData = <T>(key: string, data: T): void => {
  cache.set(key, { data, timestamp: Date.now() });
};

const clearCache = (pattern?: string): void => {
  if (pattern) {
    Array.from(cache.keys()).forEach(key => {
      if (key.includes(pattern)) cache.delete(key);
    });
  } else {
    cache.clear();
  }
};

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const fetchWithRetry = async (
  url: string, 
  options: RequestInit = {}, 
  retries = MAX_RETRIES
): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    
    // Retry on server errors (5xx) if retries remaining
    if (!response.ok && retries > 0 && response.status >= 500) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    
    return response;
  } catch (error) {
    // Retry on network errors if retries remaining
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

// Helper to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('adminToken');
};

// Helper to make API requests
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  // Don't set Content-Type for FormData - browser will set it with boundary
  const isFormData = options.body instanceof FormData;
  const headers: HeadersInit = isFormData 
    ? { ...options.headers }
    : {
        'Content-Type': 'application/json',
        ...options.headers,
      };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetchWithRetry(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type');
    const hasJsonContent = contentType && contentType.includes('application/json');
    
    // For successful responses with no content (like DELETE), return empty object
    if (response.ok && response.status === 204) {
      return {} as T;
    }
    
    // Try to parse JSON only if content-type indicates JSON or there's content
    const data = hasJsonContent || response.headers.get('content-length') !== '0' 
      ? await response.json() 
      : {};

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return data;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};


export const apiService = {
  // ============ Authentication ============
  async login(adminKey: string): Promise<{ token: string }> {
    const response = await apiRequest<ApiResponse<{ token: string }>>('/realSilver/login', {
      method: 'POST',
      body: JSON.stringify({ adminKey }),
    });
    
    if (response.data?.token) {
      localStorage.setItem('adminToken', response.data.token);
      return { token: response.data.token };
    }
    throw new Error('Login failed');
  },

  logout() {
    localStorage.removeItem('adminToken');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('adminToken');
  },

  // ============ Homepage (Hardcoded - not from backend) ============
  async getHomepage(): Promise<HomepageContent> {
    // Check if admin has overridden homepage content
    const override = localStorage.getItem('homepage_override');
    if (override) {
      try {
        return Promise.resolve(JSON.parse(override));
      } catch (e) {
        // If parsing fails, return default
        return Promise.resolve(HOMEPAGE_CONTENT);
      }
    }
    // Homepage content is hardcoded since backend doesn't provide it
    return Promise.resolve(HOMEPAGE_CONTENT);
  },

  async updateHomepage(data: Partial<HomepageContent>): Promise<HomepageContent> {
    // Store in localStorage for admin preview
    const updated = { ...HOMEPAGE_CONTENT, ...data };
    localStorage.setItem('homepage_override', JSON.stringify(updated));
    return Promise.resolve(updated);
  },

  // ============ Collections ============
  async getCollections(): Promise<Collection[]> {
    const cacheKey = 'collections';
    const cached = getCachedData<Collection[]>(cacheKey);
    if (cached) return cached;

    const response = await apiRequest<ApiResponse<{ collections: Collection[] }>>('/collections');
    const data = response.data?.collections || [];
    setCachedData(cacheKey, data);
    return data;
  },

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    try {
      const response = await apiRequest<ApiResponse<{ collection: Collection }>>(`/collections/slug/${slug}`);
      return response.data?.collection;
    } catch (error) {
      return undefined;
    }
  },

  async createCollection(data: Omit<Collection, 'id' | '_id' | 'slug'>): Promise<Collection> {
    console.log('API createCollection called with:', JSON.stringify(data, null, 2));
    const response = await apiRequest<ApiResponse<{ collection: Collection }>>('/realSilver/collections', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.data?.collection) {
      throw new Error('Failed to create collection');
    }
    clearCache('collections');
    return response.data.collection;
  },

  async updateCollection(id: string, data: Partial<Collection>): Promise<Collection> {
    const response = await apiRequest<ApiResponse<{ collection: Collection }>>(`/realSilver/collections/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    
    if (!response.data?.collection) {
      throw new Error('Failed to update collection');
    }
    clearCache('collections');
    return response.data.collection;
  },

  async deleteCollection(id: string): Promise<void> {
    await apiRequest(`/realSilver/collections/${id}`, {
      method: 'DELETE',
    });
    clearCache('collections');
  },

  // ============ Products ============
  async getProducts(collectionId?: string): Promise<Product[]> {
    const cacheKey = collectionId ? `products_${collectionId}` : 'products';
    const cached = getCachedData<Product[]>(cacheKey);
    if (cached) return cached;

    const response = await apiRequest<ApiResponse<{ products: Product[] }>>('/products');
    const products = response.data?.products || [];
    
    const result = collectionId 
      ? products.filter((p: Product) => p.collectionId === collectionId)
      : products;
    
    setCachedData(cacheKey, result);
    return result;
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
      const response = await apiRequest<ApiResponse<{ product: Product }>>(`/products/slug/${slug}`);
      return response.data?.product;
    } catch (error) {
      return undefined;
    }
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await apiRequest<ApiResponse<{ products: Product[] }>>('/products/featured');
    return response.data?.products || [];
  },

  async getNewArrivals(): Promise<Product[]> {
    try {
      const response = await apiRequest<ApiResponse<{ products: Product[] }>>('/products/new-arrivals');
      return response.data?.products || [];
    } catch (error) {
      return [];
    }
  },

  async createProduct(data: FormData | Omit<Product, 'id' | '_id' | 'slug'>): Promise<Product> {
    const isFormData = data instanceof FormData;
    
    const response = await apiRequest<ApiResponse<{ product: Product }>>('/realSilver/products', {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    });
    
    if (!response.data?.product) {
      throw new Error('Failed to create product');
    }
    clearCache('products');
    return response.data.product;
  },

  async updateProduct(id: string, data: FormData | Partial<Product>): Promise<Product> {
    const isFormData = data instanceof FormData;
    
    const response = await apiRequest<ApiResponse<{ product: Product }>>(`/realSilver/products/${id}`, {
      method: 'PATCH',
      body: isFormData ? data : JSON.stringify(data),
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    });
    
    if (!response.data?.product) {
      throw new Error('Failed to update product');
    }
    clearCache('products');
    return response.data.product;
  },

  async deleteProduct(id: string): Promise<void> {
    await apiRequest(`/realSilver/products/${id}`, {
      method: 'DELETE',
    });
    clearCache('products');
  },

  // ============ Reviews ============
  async getReviews(): Promise<Review[]> {
    const response = await apiRequest<ApiResponse<{ reviews: Review[] }>>('/reviews');
    return response.data?.reviews || [];
  },

  async createReview(data: Omit<Review, 'id' | '_id'>): Promise<Review> {
    const response = await apiRequest<ApiResponse<{ review: Review }>>('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.data?.review) {
      throw new Error('Failed to create review');
    }
    return response.data.review;
  },

  async updateReview(id: string, data: Partial<Review>): Promise<Review> {
    const response = await apiRequest<ApiResponse<{ review: Review }>>(`/realSilver/reviews/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    
    if (!response.data?.review) {
      throw new Error('Failed to update review');
    }
    return response.data.review;
  },

  async deleteReview(id: string): Promise<void> {
    await apiRequest(`/realSilver/reviews/${id}`, {
      method: 'DELETE',
    });
  },

  // ============ Enquiries ============
  async getEnquiries(): Promise<Enquiry[]> {
    const response = await apiRequest<ApiResponse<{ enquiries: Enquiry[] }>>('/realSilver/enquiries');
    return response.data?.enquiries || [];
  },

  async submitEnquiry(enquiry: Omit<Enquiry, 'id' | '_id' | 'createdAt'>): Promise<{ success: boolean }> {
    const response = await apiRequest<ApiResponse<{ enquiry: Enquiry }>>('/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiry),
    });
    
    return { success: !!response.success };
  },

  async deleteEnquiry(id: string): Promise<void> {
    await apiRequest(`/realSilver/enquiries/${id}`, {
      method: 'DELETE',
    });
  },
};
