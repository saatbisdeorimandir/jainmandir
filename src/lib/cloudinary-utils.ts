/**
 * Cloudinary Utility for dynamic image fetching
 */

// Replace this with your actual Cloudinary Cloud Name
// You can also move this to an environment variable later
export const CLOUDINARY_CLOUD_NAME: string = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dx3qrxyew';

/**
 * Fetch list of images tagged with a specific event ID
 * Requires "Resource list" to be enabled in Cloudinary Settings -> Security
 */
export async function fetchCloudinaryImages(tag: string): Promise<string[]> {
    if (!CLOUDINARY_CLOUD_NAME || CLOUDINARY_CLOUD_NAME === 'YOUR_CLOUD_NAME_HERE') {
        console.warn('Cloudinary Cloud Name not configured. Please update src/lib/cloudinary-utils.ts or set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
        return [];
    }

    try {
        // Cloudinary client-side resource list API
        // Format: https://res.cloudinary.com/<cloud_name>/image/list/<tag>.json
        // Note: The file extension .json is required.
        // Also, the "Resource list" setting must be enabled in Cloudinary Dashboard.
        const response = await fetch(
            `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${tag}.json`
        );

        if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            console.error(`Cloudinary Error Details: Status ${response.status} (${response.statusText})`, errorText);

            if (response.status === 404) {
                console.warn(`No images found for tag: ${tag}. Check if the tag exists and 'Resource list' is unchecked in Cloudinary Security settings.`);
                return [];
            }
            throw new Error(`Cloudinary request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Construct full URLs for each image
        // We use the 'v' (version) to avoid aggressive caching issues
        return data.resources.map((res: any) =>
            `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v${res.version}/${res.public_id}.${res.format}`
        );
    } catch (error) {
        console.error('Error fetching images from Cloudinary:', error);
        return [];
    }
}

/**
 * Get a single image URL with transformations
 */
export function getCloudinaryUrl(publicId: string, options: { width?: number; height?: number; crop?: string } = {}) {
    const { width, height, crop = 'scale' } = options;
    const transformations = [];

    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (transformations.length > 0) transformations.push(`c_${crop}`);

    const transformationString = transformations.length > 0 ? transformations.join(',') + '/' : '';

    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformationString}${publicId}`;
}
