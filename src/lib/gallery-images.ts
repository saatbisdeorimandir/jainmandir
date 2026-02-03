/**
 * Gallery Events Image Configuration
 * 
 * This file is now primarily used for manual image overrides.
 * Most images are now fetched dynamically from Cloudinary using tags.
 */

export const GALLERY_IMAGES: Record<string, string[]> = {
    // Manual overrides go here, for example:
    // 'glimpses': ['https://some-other-source.com/image.jpg'],
};

/**
 * Get image URLs for an event
 * Returns manual overrides if they exist.
 * Cloudinary dynamic fetching is handled in the UI components.
 */
export function getEventImages(eventId: string): string[] {
    return GALLERY_IMAGES[eventId] || [];
}
