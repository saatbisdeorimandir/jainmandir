'use client';

import { useState, useEffect } from 'react';
import { GalleryEvent } from '@/lib/types';
import { getTrans } from '@/lib/utils';
import CloudinaryLoader from './CloudinaryLoader';

interface EventGalleryGridProps {
    event: GalleryEvent;
    dict: any;
    images: string[];
}

export default function EventGalleryGrid({ event, dict, images: initialImages }: EventGalleryGridProps) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(event.isPermanent || false);
    const [images, setImages] = useState<string[]>(initialImages);
    const [isLoading, setIsLoading] = useState(initialImages.length === 0);

    // If initial images are empty, we might want to fetch from Cloudinary
    const shouldFetchDynamic = initialImages.length === 0;

    // Use event.id as the Cloudinary tag
    const cloudinaryTag = event.id;

    if (images.length === 0 && !shouldFetchDynamic) {
        return (
            <div className="text-center py-8 text-stone-500">
                <p>{getTrans(dict, 'gallery.no_images') || 'No images available yet'}</p>
            </div>
        );
    }

    return (
        <div className="mb-12 last:mb-0">
            {/* Event Header */}
            <div
                className="flex items-center justify-between mb-6 cursor-pointer group"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex-1">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-stone-gray">
                            {getTrans(dict, event.nameKey)}
                        </h2>
                        {event.date && (
                            <span className="text-sm text-stone-500 font-medium">
                                {new Date(event.date).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        )}
                    </div>
                    <p className="text-stone-600 mt-2">
                        {getTrans(dict, event.descriptionKey)}
                    </p>
                </div>
                <button
                    className="ml-4 text-jain-orange transition-transform duration-300"
                    style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Dynamic Loader */}
            {shouldFetchDynamic && (
                <CloudinaryLoader
                    tag={cloudinaryTag}
                    onImagesLoaded={(newImages) => {
                        setImages(newImages);
                        setIsLoading(false);
                    }}
                    onError={() => setIsLoading(false)}
                />
            )}

            {/* Image Grid */}
            {isExpanded && (
                <>
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jain-orange"></div>
                        </div>
                    ) : images.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
                            {images.map((imgSrc, idx) => (
                                <div
                                    key={idx}
                                    className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer aspect-square"
                                    onClick={() => setSelectedImg(imgSrc)}
                                >
                                    <img
                                        src={imgSrc}
                                        alt={`${getTrans(dict, event.nameKey)} - Image ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                                        <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            {getTrans(dict, event.nameKey)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-stone-500">
                            <p>{getTrans(dict, 'gallery.no_images') || 'No images found for this event.'}</p>
                            <p className="text-sm mt-2">Make sure images are tagged with '{cloudinaryTag}' in Cloudinary.</p>
                        </div>
                    )}
                </>
            )}

            {/* Lightbox Modal */}
            {selectedImg && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 transition-opacity"
                    onClick={() => setSelectedImg(null)}
                >
                    <button className="absolute top-4 right-4 text-white text-4xl hover:text-jain-orange transition-colors">
                        &times;
                    </button>
                    <img
                        src={selectedImg}
                        alt="Lightbox"
                        className="max-w-[90vw] max-h-[90vh] rounded shadow-lg transform scale-100 transition-transform"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
