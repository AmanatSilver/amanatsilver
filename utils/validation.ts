// Form validation utilities

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 100;
};

export const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10 && message.trim().length <= 2000;
};

export const validatePrice = (price: number): boolean => {
  return price >= 0 && price <= 10000000 && !isNaN(price);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return url.startsWith('/'); // Allow relative URLs
  }
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateProductForm = (data: {
  name?: string;
  description?: string;
  careInstructions?: string;
  price?: number;
  collectionId?: string;
  materials?: string[];
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Product name must be at least 2 characters');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters');
  }

  if (!data.careInstructions || data.careInstructions.trim().length < 5) {
    errors.push('Care instructions must be at least 5 characters');
  }

  if (!data.price || !validatePrice(data.price)) {
    errors.push('Price must be between ₹0 and ₹1,00,00,000');
  }

  if (!data.collectionId) {
    errors.push('Please select a collection');
  }

  if (!data.materials || data.materials.length === 0 || data.materials.every(m => !m.trim())) {
    errors.push('Please add at least one material');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

export const validateCollectionForm = (data: {
  name?: string;
  description?: string;
  heroImage?: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Collection name must be at least 2 characters');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters');
  }

  if (!data.heroImage || !validateUrl(data.heroImage)) {
    errors.push('Please provide a valid hero image URL');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};
