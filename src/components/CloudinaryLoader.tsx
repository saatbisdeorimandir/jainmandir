'use client';

import { useState, useEffect } from 'react';
import { fetchCloudinaryImages } from '@/lib/cloudinary-utils';

interface CloudinaryLoaderProps {
    tag: string;
    onImagesLoaded: (images: string[]) => void;
    onError?: (error: string) => void;
}

/**
 * Utility component to load images from Cloudinary based on a tag
 */
export default function CloudinaryLoader({ tag, onImagesLoaded, onError }: CloudinaryLoaderProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!tag) {
            setLoading(false);
            return;
        }

        const loadImages = async () => {
            try {
                const imageUrls = await fetchCloudinaryImages(tag);
                onImagesLoaded(imageUrls);
                setLoading(false);
            } catch (error: any) {
                console.error('Error loading images from Cloudinary:', error);
                if (onError) {
                    onError(error.message || 'Failed to load images from Cloudinary');
                }
                setLoading(false);
            }
        };

        loadImages();
    }, [tag, onImagesLoaded, onError]);

    return null; // Utility component, no UI
}
