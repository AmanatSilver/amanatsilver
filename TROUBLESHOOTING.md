# Troubleshooting Guide

## 413 Request Entity Too Large Error

### Frontend Changes (Completed)
✅ Reduced image compression limit from 800KB to 300KB per image
✅ Reduced max image width from 1920px to 1200px
✅ Increased API timeout from 10s to 60s

### Backend Changes Required
The backend server needs to increase the request size limit. Add this to your backend configuration:

#### For Express.js:
```javascript
const express = require('express');
const app = express();

// Increase body-parser limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
```

#### For Multer (file uploads):
```javascript
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 10 // Maximum 10 files
  }
});
```

#### For NGINX (if used as reverse proxy):
```nginx
http {
    client_max_body_size 50M;
}
```

---

## CORS Policy Error

### Backend Changes Required
The backend needs to allow requests from your frontend origin. Add CORS middleware:

#### For Express.js:
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://amanatsilver.in',
    'https://yourdomain.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Testing Locally
To test if the backend is working correctly, you can:

1. Install and run the CORS proxy extension in your browser (temporary solution)
2. Use a proxy in your Vite development config:

Create/update `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://amanatsilver.in',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
```

Then update `config.ts` to use the proxy:
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'development' ? '/api/v1/amanat' : 'https://amanatsilver.in/api/v1/amanat');
```

---

## Image Upload Best Practices

### Current Settings
- Max image size: 300KB per image
- Max width: 1200px
- Image format: JPEG
- Quality: Dynamic (0.3-0.8)
- Timeout: 60 seconds

### Recommendations
1. Upload maximum 5 images per product
2. Use high-quality source images (will be compressed automatically)
3. Total payload should not exceed 5MB
4. If upload fails, try uploading fewer images at once

### If Images Are Still Too Large
You can further reduce the compression limit in [Admin.tsx](Admin.tsx#L184):
```typescript
imageFiles.map(file => compressImage(file, 0.2)) // Reduce to 200KB
```

Or reduce image dimensions in [Admin.tsx](Admin.tsx#L22):
```typescript
const MAX_WIDTH = 800; // Reduce to 800px
```
