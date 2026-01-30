import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Product, Collection, Review, Enquiry, HomepageContent } from '../types';

// Helper to get MongoDB or frontend ID
const getId = (item: any): string => item._id || item.id;

// Login Component
const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiService.login(adminKey);
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
        
        {/* Info Display */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
          <p className="text-sm text-blue-800 font-semibold mb-1">Backend Authentication</p>
          <p className="text-xs text-blue-700">Enter your admin key to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Key</label>
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter your admin key"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Products Manager
const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsData, collectionsData] = await Promise.all([
        apiService.getProducts(),
        apiService.getCollections(),
      ]);
      setProducts(productsData);
      setCollections(collectionsData);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.collectionId || !formData.description || !formData.careInstructions) {
        alert('Please fill in all required fields (Name, Collection, Description, Care Instructions)');
        return;
      }

      // For new products, check image files; for updates, either files or existing images
      if (!editingProduct && imageFiles.length === 0) {
        alert('Please upload at least one product image');
        return;
      }

      if (!formData.price || formData.price <= 0) {
        alert('Please provide a valid price');
        return;
      }

      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add basic fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('collectionId', formData.collectionId);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('careInstructions', formData.careInstructions);
      formDataToSend.append('featured', (formData.featured || false).toString());
      formDataToSend.append('isNewArrival', (formData.isNewArrival || false).toString());
      formDataToSend.append('category', formData.category || 'jewelry');
      
      // Add arrays
      if (formData.materials && formData.materials.length > 0) {
        formData.materials.filter(m => m.trim() !== '').forEach(material => {
          formDataToSend.append('materials', material);
        });
      }
      
      if (formData.tags && formData.tags.length > 0) {
        formData.tags.filter(t => t.trim() !== '').forEach(tag => {
          formDataToSend.append('tags', tag);
        });
      }
      
      // Add image files
      imageFiles.forEach((file) => {
        formDataToSend.append('images', file);
      });

      if (editingProduct) {
        await apiService.updateProduct(getId(editingProduct), formDataToSend);
      } else {
        await apiService.createProduct(formDataToSend);
      }
      
      setEditingProduct(null);
      setFormData({});
      setImageFiles([]);
      fetchData();
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product: ' + (error as Error).message);
    }
  };

  const handleDelete = async (product: Product) => {
    if (confirm(`Delete ${product.name}?`)) {
      try {
        await apiService.deleteProduct(getId(product));
        fetchData();
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setImageFiles([]);
  };

  const startNew = () => {
    setEditingProduct(null);
    setImageFiles([]);
    setFormData({
      name: '',
      collectionId: '',
      description: '',
      materials: [],
      careInstructions: '',
      images: [],
      featured: false,
      tags: [],
      price: 0,
      isNewArrival: false,
      category: 'jewelry',
    });
  };

  if (loading) return <div className="p-4">Loading products...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={startNew}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Add New Product
        </button>
      </div>

      {(editingProduct !== null || Object.keys(formData).length > 0) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'New Product'}
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Fields marked with * are required. The slug is automatically generated by the backend from the product name.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name *"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 py-2 border rounded-md"
              required
            />
            <select
              value={formData.collectionId || ''}
              onChange={(e) => setFormData({ ...formData, collectionId: e.target.value })}
              className="px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Collection *</option>
              {collections.map((c) => (
                <option key={getId(c)} value={getId(c)}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price *"
              value={formData.price || 0}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="px-3 py-2 border rounded-md"
              required
              min="0"
              step="0.01"
            />
            <select
              value={formData.category || 'jewelry'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as 'jewelry' | 'broche' })}
              className="px-3 py-2 border rounded-md"
              required
            >
              <option value="jewelry">Jewelry</option>
              <option value="broche">Broche</option>
            </select>
            <textarea
              placeholder="Description *"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-3 py-2 border rounded-md col-span-2"
              rows={3}
              required
            />
            <input
              type="text"
              placeholder="Materials (comma separated)"
              value={formData.materials?.join(', ') || ''}
              onChange={(e) =>
                setFormData({ ...formData, materials: e.target.value.split(',').map((s) => s.trim()) })
              }
              className="px-3 py-2 border rounded-md col-span-2"
            />
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images * (Upload multiple images)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  if (e.target.files) {
                    setImageFiles(Array.from(e.target.files));
                  }
                }}
                className="px-3 py-2 border rounded-md w-full"
              />
              {imageFiles.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  {imageFiles.length} file(s) selected: {imageFiles.map(f => f.name).join(', ')}
                </div>
              )}
              {editingProduct && formData.images && formData.images.length > 0 && imageFiles.length === 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  Current images: {formData.images.length} image(s)
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags?.join(', ') || ''}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value.split(',').map((s) => s.trim()) })
              }
              className="px-3 py-2 border rounded-md col-span-2"
            />
            <textarea
              placeholder="Care Instructions *"
              value={formData.careInstructions || ''}
              onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
              className="px-3 py-2 border rounded-md col-span-2"
              rows={2}
              required
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured || false}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <span>Featured</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isNewArrival || false}
                onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                className="rounded"
              />
              <span>New Arrival</span>
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingProduct(null);
                setFormData({});
                setImageFiles([]);
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Collection</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={getId(product)}>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {collections.find((c) => getId(c) === product.collectionId)?.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.featured ? '✓' : ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => startEdit(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Collections Manager
const CollectionsManager: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [formData, setFormData] = useState<Partial<Collection>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await apiService.getCollections();
      setCollections(data);
    } catch (error) {
      console.error('Failed to fetch collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.heroImage) {
        alert('Please fill in all required fields (Name, Description, Hero Image)');
        return;
      }

      // Clean data before sending
      const dataToSave = { ...formData };
      
      // Remove slug - backend auto-generates it from name
      delete dataToSave.slug;
      
      console.log('Data being sent to backend:', JSON.stringify(dataToSave, null, 2));

      if (editingCollection) {
        await apiService.updateCollection(getId(editingCollection), dataToSave);
      } else {
        await apiService.createCollection(dataToSave as Omit<Collection, 'id' | '_id' | 'slug'>);
      }
      setEditingCollection(null);
      setFormData({});
      fetchData();
    } catch (error) {
      console.error('Failed to save collection:', error);
      alert('Failed to save collection: ' + (error as Error).message);
    }
  };

  const handleDelete = async (collection: Collection) => {
    if (confirm(`Delete ${collection.name}?`)) {
      try {
        await apiService.deleteCollection(getId(collection));
        fetchData();
      } catch (error) {
        console.error('Failed to delete collection:', error);
        alert('Failed to delete collection');
      }
    }
  };

  const startEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setFormData(collection);
  };

  const startNew = () => {
    setEditingCollection(null);
    setFormData({
      name: '',
      description: '',
      heroImage: '',
    });
  };

  if (loading) return <div className="p-4">Loading collections...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Collections</h2>
        <button
          onClick={startNew}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Add New Collection
        </button>
      </div>

      {(editingCollection !== null || Object.keys(formData).length > 0) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingCollection ? 'Edit Collection' : 'New Collection'}
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Fields marked with * are required. The slug is automatically generated by the backend from the collection name.
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name *"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            <textarea
              placeholder="Description *"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              required
            />
            <input
              type="text"
              placeholder="Hero Image URL *"
              value={formData.heroImage || ''}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingCollection(null);
                setFormData({});
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {collections.map((collection) => (
          <div key={getId(collection)} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{collection.name}</h3>
              <p className="text-gray-600 text-sm">{collection.slug}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(collection)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(collection)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reviews Manager
const ReviewsManager: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState<Partial<Review>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reviewsData, productsData] = await Promise.all([
        apiService.getReviews(),
        apiService.getProducts(),
      ]);
      setReviews(reviewsData);
      setProducts(productsData);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Remove empty product field before saving
      const dataToSave = { ...formData };
      if (!dataToSave.product || dataToSave.product === '') {
        delete dataToSave.product;
      }
      
      if (editingReview) {
        await apiService.updateReview(getId(editingReview), dataToSave);
      } else {
        await apiService.createReview(dataToSave as Omit<Review, 'id' | '_id'>);
      }
      setEditingReview(null);
      setFormData({});
      fetchData();
    } catch (error) {
      console.error('Failed to save review:', error);
      alert('Failed to save review');
    }
  };

  const handleDelete = async (review: Review) => {
    if (confirm(`Delete review by ${review.name}?`)) {
      try {
        await apiService.deleteReview(getId(review));
        fetchData();
      } catch (error) {
        console.error('Failed to delete review:', error);
        alert('Failed to delete review');
      }
    }
  };

  const startEdit = (review: Review) => {
    setEditingReview(review);
    setFormData(review);
  };

  const startNew = () => {
    setEditingReview(null);
    setFormData({
      name: '',
      location: '',
      rating: 5,
      text: '',
      date: new Date().toISOString(),
    });
  };

  if (loading) return <div className="p-4">Loading reviews...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <button
          onClick={startNew}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Add New Review
        </button>
      </div>

      {(editingReview !== null || Object.keys(formData).length > 0) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingReview ? 'Edit Review' : 'New Review'}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              value={formData.rating || 5}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <textarea
              placeholder="Review Text"
              value={formData.text || ''}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
            />
            <select
              value={formData.product || ''}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">No Product (Optional)</option>
              {products.map((p) => (
                <option key={getId(p)} value={getId(p)}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingReview(null);
                setFormData({});
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={getId(review)} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <p className="text-gray-600 text-sm">{review.location}</p>
                <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => startEdit(review)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enquiries Manager
const EnquiriesManager: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await apiService.getEnquiries();
      setEnquiries(data);
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (enquiry: Enquiry) => {
    if (confirm(`Delete enquiry from ${enquiry.name}?`)) {
      try {
        await apiService.deleteEnquiry(getId(enquiry));
        fetchData();
      } catch (error) {
        console.error('Failed to delete enquiry:', error);
        alert('Failed to delete enquiry');
      }
    }
  };

  if (loading) return <div className="p-4">Loading enquiries...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Enquiries</h2>
      <div className="grid gap-4">
        {enquiries.map((enquiry) => (
          <div key={getId(enquiry)} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold">{enquiry.name}</h3>
                <p className="text-gray-600 text-sm">{enquiry.email}</p>
                <p className="text-gray-500 text-xs">{new Date(enquiry.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleDelete(enquiry)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700">{enquiry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Homepage Manager
const HomepageManager: React.FC = () => {
  const [homepage, setHomepage] = useState<HomepageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<HomepageContent>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await apiService.getHomepage();
      setHomepage(data);
      setFormData(data);
    } catch (error) {
      console.error('Failed to fetch homepage:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Since homepage content is hardcoded in config.ts, store in localStorage for admin preview
      localStorage.setItem('homepage_override', JSON.stringify(formData));
      setHomepage(formData as HomepageContent);
      alert('Homepage content updated in local preview. Note: To permanently change homepage content, update the HOMEPAGE_CONTENT constant in config.ts file.');
    } catch (error) {
      console.error('Failed to update homepage:', error);
      alert('Failed to update homepage');
    }
  };

  if (loading) return <div className="p-4">Loading homepage...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Homepage Content</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
            <input
              type="text"
              value={formData.heroTitle || ''}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
            <input
              type="text"
              value={formData.heroSubtitle || ''}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
            <input
              type="text"
              value={formData.heroImage || ''}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand Story</label>
            <textarea
              value={formData.brandStoryShort || ''}
              onChange={(e) => setFormData({ ...formData, brandStoryShort: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Craftsmanship Title</label>
            <input
              type="text"
              value={formData.craftsmanshipTitle || ''}
              onChange={(e) => setFormData({ ...formData, craftsmanshipTitle: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Craftsmanship Description</label>
            <textarea
              value={formData.craftsmanshipDescription || ''}
              onChange={(e) => setFormData({ ...formData, craftsmanshipDescription: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Craftsmanship Image URL</label>
            <input
              type="text"
              value={formData.craftsmanshipImage || ''}
              onChange={(e) => setFormData({ ...formData, craftsmanshipImage: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Main Admin Component
const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(apiService.isAuthenticated());
  const [activeTab, setActiveTab] = useState<'products' | 'collections' | 'reviews' | 'enquiries' | 'homepage'>('products');

  const handleLogout = () => {
    apiService.logout();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'products'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'collections'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'enquiries'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Enquiries
            </button>
            <button
              onClick={() => setActiveTab('homepage')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'homepage'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Homepage
            </button>
          </div>
        </div>

        {activeTab === 'products' && <ProductsManager />}
        {activeTab === 'collections' && <CollectionsManager />}
        {activeTab === 'reviews' && <ReviewsManager />}
        {activeTab === 'enquiries' && <EnquiriesManager />}
        {activeTab === 'homepage' && <HomepageManager />}
      </div>
    </div>
  );
};

export default Admin;
