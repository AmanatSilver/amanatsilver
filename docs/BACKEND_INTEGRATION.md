# Backend Integration - Amanat Frontend

## ✅ Integration Complete

The frontend has been successfully integrated with the backend API. Mock data has been removed and replaced with real API calls.

## 🔧 Configuration

### 1. Environment Setup

A `.env` file has been created with the production backend URL:

```env
# Backend API URL - Production backend
VITE_API_BASE_URL=https://amanatsilver.in/api/v1/amanat

# API Timeout (10 seconds)
VITE_API_TIMEOUT=10000
```

The backend is now configured to use the production server at `https://amanatsilver.in/api/v1/amanat`.

### 2. Backend Server

Ensure your backend is running and accessible at the configured URL.

## 🔐 Authentication

### Admin Login
- **Old:** Username/password (admin/admin123)
- **New:** Admin key authentication

To login:
1. Go to `/admin`
2. Enter your admin key (configured in backend's environment)
3. Token will be stored in localStorage

## 📊 Data Sources

### From Backend API:
✅ **Products** - All CRUD operations
✅ **Collections** - All CRUD operations
✅ **Reviews** - All CRUD operations
✅ **Enquiries** - All CRUD operations

### Hardcoded (Not in Backend):
⚠️ **Homepage Content** - Defined in `config.ts`
   - Hero title, subtitle, image
   - Brand story
   - Craftsmanship section

## 🛣️ API Endpoints Used

### Public Endpoints:
```
GET    /products                          - All products
GET    /products/slug/:slug               - Product by slug
GET    /products/featured                 - Featured products
GET    /products/new-arrivals             - New arrivals
GET    /products/collection/:slug         - Products by collection
GET    /collections                       - All collections
GET    /collections/slug/:slug            - Collection by slug
GET    /reviews                           - All reviews
POST   /reviews                           - Create review
POST   /enquiries                         - Submit enquiry
```

### Admin Endpoints (Require JWT Token):
```
POST   /realSilver/login                  - Admin login
POST   /realSilver/products               - Create product
PATCH  /realSilver/products/:id           - Update product
DELETE /realSilver/products/:id           - Delete product
POST   /realSilver/collections            - Create collection
PATCH  /realSilver/collections/:id        - Update collection
DELETE /realSilver/collections/:id        - Delete collection
GET    /realSilver/enquiries              - Get all enquiries
DELETE /realSilver/enquiries/:id          - Delete enquiry
PATCH  /realSilver/reviews/:id            - Update review
DELETE /realSilver/reviews/:id            - Delete review
```

## 📝 Changes Made

### Files Modified:
1. **`services/api.ts`**
   - Removed all mock data and localStorage logic
   - Implemented real HTTP requests using fetch
   - Added JWT token management
   - Added request timeout handling
   - Updated to match backend response format

2. **`pages/Admin.tsx`**
   - Changed login from username/password to admin key
   - Updated UI to show admin key input

3. **`config.ts`**
   - Added environment variable support
   - Added hardcoded homepage content
   - Updated API base URL

### Files Created:
1. **`vite-env.d.ts`** - TypeScript environment variable definitions
2. **`.env`** - Environment configuration file
3. **`BACKEND_INTEGRATION.md`** - This documentation

### Files Removed:
- Mock data is no longer used (but `mockData.ts` file still exists for reference)

## 🚀 Quick Start

1. **Configure environment:**
   ```bash
   # Edit .env file
   VITE_API_BASE_URL=http://localhost:YOUR_PORT/api/v1/amanat
   ```

2. **Ensure backend is running:**
   ```bash
   # Your backend should be accessible at the configured URL
   curl http://localhost:YOUR_PORT/api/v1/amanat/products
   ```

3. **Start frontend:**
   ```bash
   npm run dev
   ```

4. **Test the integration:**
   - Visit homepage - products should load from backend
   - Go to `/admin` and login with your admin key
   - Try creating/editing products

## 🧪 Testing

### Test Public Endpoints:
```bash
# Get all products
curl http://localhost:PORT/api/v1/amanat/products

# Get collections
curl http://localhost:PORT/api/v1/amanat/collections

# Get reviews
curl http://localhost:PORT/api/v1/amanat/reviews
```

### Test Admin Login:
```bash
curl -X POST http://localhost:PORT/api/v1/amanat/realSilver/login \
  -H "Content-Type: application/json" \
  -d '{"adminKey":"your-admin-key"}'
```

## 🔍 Response Format

All backend responses follow this structure:

```typescript
{
  success: true,
  status: "success",
  data: {
    products: [...],  // or collections, reviews, etc.
  },
  results: 10  // Number of items
}
```

The API service automatically unwraps this to return just the data array.

## ⚠️ Important Notes

1. **Homepage Content:** Since the backend doesn't provide homepage content, it's hardcoded in `config.ts`. To update it, modify the `HOMEPAGE_CONTENT` constant.

2. **New Arrivals:** The backend has a `/products/new-arrivals` endpoint. Products marked as `isNewArrival: true` will appear here.

3. **Featured Products:** Products with `featured: true` will appear in the featured section.

4. **Error Handling:** All API errors are caught and thrown with meaningful messages.

5. **Token Expiry:** JWT tokens expire after 1 hour (configured in backend). Users will need to re-login.

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend has CORS enabled for your frontend URL
- Backend should allow: `http://localhost:5173` (or your dev port)

### Connection Refused
- Check backend is running on the correct port
- Verify `VITE_API_BASE_URL` in `.env`

### Invalid Admin Key
- Ensure admin key matches the backend's configured admin key
- Check backend environment variables

### Products Not Loading
- Check browser console for errors
- Verify backend `/products` endpoint is responding
- Test with curl/Postman

### Token Issues
- Clear localStorage if token is invalid
- Re-login to get a fresh token
- Check backend JWT configuration

## 📚 API Documentation

Full API documentation is available in the backend repository. Key points:

- **Base URL:** `http://localhost:PORT/api/v1/amanat`
- **Admin Routes:** Prefixed with `/realSilver/`
- **Auth:** JWT Bearer token in Authorization header
- **Content-Type:** application/json

## 🔄 Data Flow

```
User Action
    ↓
Frontend Component
    ↓
apiService Method
    ↓
fetch() with JWT token
    ↓
Backend API
    ↓
MongoDB
    ↓
JSON Response
    ↓
Unwrap data
    ↓
Update UI
```

## 📦 Next Steps

1. ✅ Update `.env` with correct backend URL
2. ✅ Test all public pages work
3. ✅ Test admin login
4. ✅ Test CRUD operations
5. ⏳ Deploy backend and frontend
6. ⏳ Update production environment variables

## 🤝 Support

For issues:
1. Check browser console
2. Check backend logs
3. Verify environment variables
4. Test endpoints with curl/Postman

---

**Last Updated:** January 23, 2026  
**Status:** ✅ Ready for Testing
