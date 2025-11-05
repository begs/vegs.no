# Cloudinary Integration Guide

Your website automatically fetches and organizes photos from Cloudinary using folder names!

## Setup Instructions

### 1. Get Your Cloudinary Credentials

1. Go to https://console.cloudinary.com/
2. Sign up or log in
3. From your dashboard, copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2. Configure Environment Variables

Update the `.env.local` file with your credentials:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

**Important:** Restart your dev server after updating these!

### 3. Organize Photos in Folders

Create folders under `photos/` in Cloudinary with descriptive names that include location and year:

```
photos/
  ├── japan 2023/
  ├── japan 2024/
  ├── japan 2025/
  ├── norway 2024/
  ├── norway 2025/
  ├── landscape 2024/
  ├── landscape 2025/
  └── portrait 2025/
```

**How folder names work:**
- Folder name becomes the filter tag on your website
- Examples: `japan 2023`, `norway 2024`, `landscape 2025`
- Use descriptive names that make sense for organizing
- Spaces in folder names are supported!

### 4. Upload Photos

1. Go to **Media Library** in your Cloudinary dashboard
2. Navigate to or create a folder (e.g., `photos/japan 2025/`)
3. Upload your images
4. Refresh your website - photos appear automatically!

## How It Works

1. **Automatic Fetching**: Website calls `/api/photos` which fetches all images from `photos/` folder
2. **Folder-Based Filtering**: Each subfolder name becomes a filter button
3. **Auto-Sort**: Filter buttons are sorted alphabetically
4. **CDN Delivery**: All images are served via Cloudinary's fast CDN
5. **Auto-Update**: Upload to Cloudinary → refresh website → photos appear!

## Example Workflow

**Scenario**: You have photos from a Japan trip in 2025

1. In Cloudinary, create folder: `photos/japan 2025/`
2. Upload 20 photos to this folder
3. On your website, a filter button "japan 2025" automatically appears
4. Click it to see only those 20 photos
5. Later, add more photos to the same folder - they appear automatically

## Image Optimization

Cloudinary automatically optimizes images for web delivery (WebP format, compression, etc.)

## Troubleshooting

### Photos not showing up?
1. Check that `.env.local` has correct credentials
2. Restart your dev server: `npm run dev`
3. Check browser console for errors
4. Verify images are uploaded to Cloudinary

### Tags not working?
- Add tags in Cloudinary's interface
- Or add them in context metadata under `tags`

### Want to use specific folders?
Modify `/src/app/api/photos/route.ts`:
```typescript
prefix: 'photos/', // Only fetch from 'photos' folder
```

## Next Steps

1. Fill in your Cloudinary credentials in `.env.local`
2. Upload photos to Cloudinary
3. Restart dev server
4. Visit http://localhost:3001/photos
5. Your photos should appear automatically! 🎉
