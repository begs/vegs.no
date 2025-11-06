import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!process.env.CLOUDINARY_API_KEY) {
      console.error('Missing CLOUDINARY_API_KEY environment variable');
      return NextResponse.json(
        { error: 'Cloudinary not configured. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    // Fetch all images from keyboards/ directory
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: '',
      max_results: 500,
      resource_type: 'image',
      context: true,
    });

    console.log('Total images fetched from Cloudinary:', result.resources.length);

    // Debug: Show first few resources
    if (result.resources.length > 0) {
      console.log('Sample keyboard images:');
      result.resources.slice(0, 5).forEach((r: any) => {
        console.log({
          public_id: r.public_id,
          asset_folder: r.asset_folder,
        });
      });
    }

    // Group images by keyboard folder
    const keyboardImages: Record<string, any[]> = {};

    result.resources
      .filter((resource: any) => {
        return resource.asset_folder && resource.asset_folder.startsWith('keyboards/');
      })
      .forEach((resource: any) => {
        const assetFolder = resource.asset_folder || '';
        // Extract keyboard name: "keyboards/HHKB Pro 1" -> "HHKB Pro 1"
        const keyboardName = assetFolder.startsWith('keyboards/')
          ? assetFolder.substring(10) // Remove "keyboards/" prefix
          : 'unknown';

        console.log(`Mapping: "${assetFolder}" -> "${keyboardName}"`);

        if (!keyboardImages[keyboardName]) {
          keyboardImages[keyboardName] = [];
        }

        keyboardImages[keyboardName].push({
          src: resource.secure_url,
          alt: resource.context?.custom?.alt || resource.public_id,
          width: resource.width,
          height: resource.height,
          publicId: resource.public_id,
        });
      });

    console.log('Keyboard folders found:', Object.keys(keyboardImages));

    return NextResponse.json({ keyboards: keyboardImages });
  } catch (error) {
    console.error('Error fetching Cloudinary keyboard images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch keyboard images' },
      { status: 500 }
    );
  }
}
