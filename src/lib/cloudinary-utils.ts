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

export interface CloudinaryResource {
    public_id: string;
    version: number;
    format: string;
    width: number;
    height: number;
    url: string;
    folder?: string;
}

/**
 * Fetch list of resources tagged with a specific tag
 * Returns the full resource info instead of just URLs
 */
export async function fetchCloudinaryResources(tag: string): Promise<CloudinaryResource[]> {
    if (!CLOUDINARY_CLOUD_NAME || CLOUDINARY_CLOUD_NAME === 'YOUR_CLOUD_NAME_HERE') {
        return [];
    }

    try {
        const response = await fetch(
            `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${tag}.json`
        );

        if (!response.ok) {
            return [];
        }

        const data = await response.json();

        return data.resources.map((res: any) => ({
            public_id: res.public_id,
            version: res.version,
            format: res.format,
            width: res.width,
            height: res.height,
            url: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v${res.version}/${res.public_id}.${res.format}`,
            folder: res.asset_folder || (res.public_id.includes('/') ? res.public_id : undefined)
        }));
    } catch (error) {
        console.error('Error fetching resources from Cloudinary:', error);
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

/**
 * Interface for dynamically discovered events
 */
export interface DynamicGalleryEvent {
    id: string;
    name: string; // Default name (English)
    nameHi?: string; // Hindi name
    date?: string;
    images: string[];
}

/**
 * Fetch and discover gallery events dynamically based on tags and folders.
 * 
 * Strategy:
 * 1. Fetch all images with tag 'gallery_event'
 * 2. Group them by their folder path
 * 3. Parse folder name for event details (e.g., '2024-05-20_Holi')
 */
export async function fetchDynamicGalleryEvents(): Promise<DynamicGalleryEvent[]> {
    if (!CLOUDINARY_CLOUD_NAME || CLOUDINARY_CLOUD_NAME === 'YOUR_CLOUD_NAME_HERE') {
        return [];
    }

    try {
        const resources = await fetchCloudinaryResources('gallery_event');
        console.log(`Cloudinary Discovery: Found ${resources.length} images with tag 'gallery_event'`);
        
        if (resources.length === 0) return [];

        const eventGroups: Record<string, DynamicGalleryEvent> = {};

        resources.forEach(res => {
            // Priority: asset_folder field, then folder prefix in public_id
            let folderPath = res.folder || '';
            
            const parts = folderPath.split('/');
            if (parts.length === 0 || !folderPath) return;

            // The event folder is the last part of the folder path
            const folderName = parts[parts.length - 1];
            
            // Skip the main root folder if it's the only one
            if (parts.length === 1 && folderPath === 'jaintemple_webapp') return;

            if (!eventGroups[folderName]) {
                let eventName = folderName.replace(/_/g, ' ');
                let eventNameHi: string | undefined = undefined;
                let eventDate: string | undefined = undefined;

                const dateMatch = folderName.match(/^(\d{4}-\d{2}-\d{2})_(.*)$/);
                let namePart = folderName;
                
                if (dateMatch) {
                    eventDate = dateMatch[1];
                    namePart = dateMatch[2];
                }

                // Check for bilingual separator _HI_
                if (namePart.includes('_HI_')) {
                    const [en, hi] = namePart.split('_HI_');
                    eventName = en.replace(/_/g, ' ');
                    eventNameHi = hi.replace(/_/g, ' ');
                } else {
                    eventName = namePart.replace(/_/g, ' ');
                }

                eventGroups[folderName] = {
                    id: folderName,
                    name: eventName,
                    nameHi: eventNameHi,
                    date: eventDate,
                    images: []
                };
            }

            eventGroups[folderName].images.push(res.url);
        });

        // Convert groups to sorted array (latest date first)
        const result = Object.values(eventGroups).sort((a, b) => {
            if (!a.date) return 1;
            if (!b.date) return -1;
            return b.date.localeCompare(a.date);
        });

        console.log(`Cloudinary Discovery: Grouped into ${result.length} dynamic events:`, result.map(e => e.id));
        return result;
    } catch (error) {
        console.error('Error discovering dynamic events:', error);
        return [];
    }
}
