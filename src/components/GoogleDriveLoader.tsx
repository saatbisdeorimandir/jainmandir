'use client';

import { useState, useEffect } from 'react';
import { DriveImage } from '@/lib/types';

interface GoogleDriveLoaderProps {
    folderId: string;
    onImagesLoaded: (images: string[]) => void;
    onError?: (error: string) => void;
}

/**
 * Utility component to load images from a public Google Drive folder
 * 
 * To use this component:
 * 1. Make your Google Drive folder public (Anyone with the link can view)
 * 2. Get the folder ID from the share link
 * 3. Pass the folder ID to this component
 * 
 * Note: This uses the Google Drive API v3 without authentication for public folders
 */
export default function GoogleDriveLoader({ folderId, onImagesLoaded, onError }: GoogleDriveLoaderProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!folderId) {
            setLoading(false);
            return;
        }

        const loadImages = async () => {
            try {
                // For public Google Drive folders, we can use the Drive API
                // Format: https://drive.google.com/uc?export=view&id=FILE_ID

                // Note: To properly fetch files from a folder, you would need:
                // 1. Google Drive API key
                // 2. Make API call to list files in folder
                // 3. Convert file IDs to direct image URLs

                // For now, we'll provide a placeholder that shows how to structure
                // the direct image URLs once you have the file IDs

                // Example of how to construct direct image URLs:
                // const imageUrls = fileIds.map(id => 
                //     `https://drive.google.com/uc?export=view&id=${id}`
                // );

                // Placeholder: Return empty array if no folder ID
                onImagesLoaded([]);
                setLoading(false);
            } catch (error) {
                console.error('Error loading images from Google Drive:', error);
                if (onError) {
                    onError('Failed to load images from Google Drive');
                }
                setLoading(false);
            }
        };

        loadImages();
    }, [folderId, onImagesLoaded, onError]);

    return null; // This is a utility component, no UI
}

/**
 * Helper function to convert Google Drive file ID to direct image URL
 */
export function getDriveImageUrl(fileId: string): string {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Helper function to convert Google Drive folder share link to folder ID
 */
export function extractFolderId(shareLink: string): string {
    const match = shareLink.match(/folders\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
}
