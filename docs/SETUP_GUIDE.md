# Quick Setup Guide

## 🚀 3 Steps to Get Started

### Step 1: Configure Backend URL

Edit `.env` file and update the PORT:

```env
VITE_API_BASE_URL=http://localhost:YOUR_PORT/api/v1/amanat
```

Replace `YOUR_PORT` with your actual backend port (e.g., 5000, 3000, 8000, etc.)

### Step 2: Start Backend

Make sure your backend server is running:

```bash
# Test if backend is accessible
curl http://localhost:YOUR_PORT/api/v1/amanat/products
```

You should see a JSON response with products.

### Step 3: Start Frontend

```bash
npm run dev
```

Visit `http://localhost:5173` (or your configured port)

## ✅ Verify Integration

1. **Homepage:** Should load products from backend
2. **Collections:** Should display collections from backend
3. **Admin Login:** Go to `/admin` and enter your admin key

## 🔑 Admin Key

Get your admin key from the backend's environment configuration file.

## 🐛 Quick Troubleshooting

| Issue | Fix |
|-------|-----|
| "Connection refused" | Check backend is running |
| CORS error | Enable CORS in backend for localhost:5173 |
| "Login failed" | Verify admin key is correct |
| No data showing | Check browser console for errors |

## 📖 Full Documentation

See [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) for complete documentation.

---

**Need Help?** Check the browser console (F12) for error messages.
