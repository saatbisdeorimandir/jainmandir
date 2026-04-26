import { useState, useEffect, useCallback } from 'react';
import { fetchCloudinaryResources, CloudinaryResource } from '@/lib/cloudinary-utils';

export function useAnnouncements(tag: string = 'announcement') {
    const [announcements, setAnnouncements] = useState<CloudinaryResource[]>([]);
    const [loading, setLoading] = useState(true);

    const parseExpiryDate = (publicId: string): Date | null => {
        // Pattern: EXP_YYYYMMDD_...
        const match = publicId.match(/EXP_(\d{8})/);
        if (match) {
            const dateStr = match[1];
            const year = parseInt(dateStr.substring(0, 4));
            const month = parseInt(dateStr.substring(4, 6)) - 1; // JS months are 0-indexed
            const day = parseInt(dateStr.substring(6, 8));
            return new Date(year, month, day, 23, 59, 59); // End of the day
        }
        return null;
    };

    const loadAnnouncements = useCallback(async () => {
        try {
            const resources = await fetchCloudinaryResources(tag);
            const now = new Date();

            const activeAnnouncements = resources.filter(res => {
                const expiryDate = parseExpiryDate(res.public_id);
                if (!expiryDate) return true; // No expiry date means always show
                return now <= expiryDate;
            });

            setAnnouncements(activeAnnouncements);
        } catch (error) {
            console.error('Failed to load announcements:', error);
        } finally {
            setLoading(false);
        }
    }, [tag]);

    useEffect(() => {
        loadAnnouncements();
    }, [loadAnnouncements]);

    return { announcements, loading, reload: loadAnnouncements };
}
