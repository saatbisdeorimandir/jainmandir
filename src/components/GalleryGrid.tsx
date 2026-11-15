'use client';

import { useState, useEffect } from 'react';
import { GalleryItem } from '@/lib/types';
import { getTrans, assetPath } from '@/lib/utils';

interface GalleryGridProps {
    items: GalleryItem[];
    dict: any;
}

export default function GalleryGrid({ items, dict }: GalleryGridProps) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    // Body scroll lock
    useEffect(() => {
        if (selectedImg) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [selectedImg]);

    // Keyboard ESC to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImg(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((img, idx) => (
                    <div
                        key={idx}
                        className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer aspect-square"
                        onClick={() => setSelectedImg(img.src)}
                    >
                        <img
                            src={assetPath(img.src)}
                            alt={getTrans(dict, img.altKey)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                            <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                {getTrans(dict, img.altKey)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImg && (
                <div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity select-none"
                    onClick={() => setSelectedImg(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/25 transition-all text-2xl leading-none"
                        aria-label="Close fullscreen view"
                    >
                        &times;
                    </button>
                    <img
                        src={assetPath(selectedImg)}
                        alt="Lightbox"
                        className="max-w-[92vw] max-h-[88vh] object-contain rounded-xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
