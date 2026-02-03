/**
 * Utility to extract file IDs from a public Google Drive folder
 * 
 * This script helps you get all image file IDs from a Google Drive folder.
 * Since we can't directly access Google Drive API without authentication,
 * this provides instructions for getting the file IDs.
 */

/**
 * Extract folder ID from Google Drive share link
 */
export function extractFolderId(shareLink: string): string {
    const match = shareLink.match(/folders\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
}

/**
 * Convert Google Drive file ID to direct image URL
 */
export function getDriveImageUrl(fileId: string): string {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Get thumbnail URL for Google Drive file
 */
export function getDriveThumbnailUrl(fileId: string, size: number = 400): string {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

/**
 * INSTRUCTIONS TO GET FILE IDs FROM YOUR GOOGLE DRIVE FOLDER:
 * 
 * Method 1: Manual (Quick for few images)
 * ----------------------------------------
 * 1. Open your folder: https://drive.google.com/drive/folders/1vKCCP2s0BJkEFWprnNQ3LFAxUgOceFFU
 * 2. For each image:
 *    - Right-click → Get link
 *    - Extract file ID from URL: https://drive.google.com/file/d/FILE_ID/view
 * 3. Add file IDs to the array below
 * 
 * Method 2: Using Google Drive API (For many images)
 * ---------------------------------------------------
 * 1. Go to: https://console.cloud.google.com/
 * 2. Create a new project or select existing
 * 3. Enable Google Drive API
 * 4. Create API Key (Credentials → Create Credentials → API Key)
 * 5. Use the API key with the function below
 */

/**
 * Fetch images from Google Drive folder using API
 * NOTE: Requires Google Drive API key
 */
export async function fetchDriveImages(folderId: string, apiKey?: string): Promise<string[]> {
    if (!apiKey) {
        console.warn('Google Drive API key not provided. Please add file IDs manually.');
        return [];
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType)`
        );

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        const imageFiles = data.files.filter((file: any) =>
            file.mimeType.startsWith('image/')
        );

        return imageFiles.map((file: any) => getDriveImageUrl(file.id));
    } catch (error) {
        console.error('Error fetching images from Google Drive:', error);
        return [];
    }
}

/**
 * TEMPORARY SOLUTION: Manually add your file IDs here
 * 
 * To get file IDs:
 * 1. Open folder: https://drive.google.com/drive/folders/1vKCCP2s0BJkEFWprnNQ3LFAxUgOceFFU
 * 2. Right-click each image → Get link
 * 3. Extract ID from URL and add below
 */
export const GLIMPSES_IMAGE_IDS: string[] = [
    // Add your file IDs here, for example:
    // '1abc123def456',
    // '1xyz789ghi012',
];

// Convert file IDs to image URLs
export const GLIMPSES_IMAGES = GLIMPSES_IMAGE_IDS.map(getDriveImageUrl);
