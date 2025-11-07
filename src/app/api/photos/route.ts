import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Configure Cloudinary inside the route handler to ensure env vars are loaded
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Debug: Check if environment variables are loaded
    if (!process.env.CLOUDINARY_API_KEY) {
      console.error('Missing CLOUDINARY_API_KEY environment variable');
      return NextResponse.json(
        { error: 'Cloudinary not configured. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    // Fetch ALL images and filter by asset_folder instead of using prefix
    // This is more reliable as prefix doesn't always work with asset_folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: '',  // Get all images
      max_results: 500,
      resource_type: 'image',
      context: true,
      tags: false,
    });

    console.log('Total images fetched from Cloudinary:', result.resources.length);

    // Transform Cloudinary resources into our photo format
    const photos = result.resources
      .filter((resource: any) => {
        // Only include images that are in the photos/ folder
        return resource.asset_folder && resource.asset_folder.startsWith('photos/');
      })
      .map((resource: any, index: number) => {
        // Use asset_folder to get the full folder path
        // Example: asset_folder = "photos/japan 2024" -> extract "japan 2024"
        const assetFolder = resource.asset_folder || '';
        
        // Get the folder name (everything after "photos/")
        const folderName = assetFolder.startsWith('photos/') 
          ? assetFolder.substring(7) // Remove "photos/" prefix
          : 'uncategorized';
        
        console.log('Processing:', resource.public_id, '-> asset_folder:', assetFolder, '-> folder:', folderName);

        // Get alt text from context or filename
        const alt = resource.context?.custom?.alt || resource.public_id;

        // Generate optimized thumbnail URL for grid view (400x300, quality auto)
        const thumbnailUrl = resource.secure_url.replace('/upload/', '/upload/w_400,h_300,c_fill,q_auto,f_auto/');

        return {
          id: index + 1,
          src: resource.secure_url, // Full size for lightbox
          thumbnail: thumbnailUrl, // Optimized for grid
          alt: alt,
          tags: [folderName], // Single folder name as the only tag
          width: resource.width,
          height: resource.height,
          publicId: resource.public_id,
          folder: folderName,
        };
      });

    console.log('Total photos after filtering:', photos.length);

    return NextResponse.json({ photos, total: photos.length });
  } catch (error) {
    console.error('Error fetching Cloudinary photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}
