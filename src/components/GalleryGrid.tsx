'use client';

import { useState } from 'react';
import { GalleryItem } from '@/lib/types';
import { getTrans, assetPath } from '@/lib/utils';

interface GalleryGridProps {
    items: GalleryItem[];
    dict: any;
}

export default function GalleryGrid({ items, dict }: GalleryGridProps) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity"
                    onClick={() => setSelectedImg(null)}
                >
                    <button className="absolute top-4 right-4 text-white text-4xl">&times;</button>
                    <img
                        src={assetPath(selectedImg)}
                        alt="Lightbox"
                        className="max-w-[90vw] max-h-[90vh] rounded shadow-lg transform scale-100 transition-transform"
                        onClick={(e) => e.stopPropagation()} // Click image shouldn't close it? typically yes or no.
                    />
                </div>
            )}
        </>
    );
}
