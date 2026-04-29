'use client';

import { useState, useEffect } from 'react';
import { GalleryEvent } from '@/lib/types';
import { getTrans } from '@/lib/utils';
import CloudinaryLoader from './CloudinaryLoader';

interface EventGalleryGridProps {
    event: GalleryEvent;
    dict: any;
    images: string[];
    defaultExpanded?: boolean;
}

export default function EventGalleryGrid({ event, dict, images: initialImages, defaultExpanded }: EventGalleryGridProps) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [selectedIdx, setSelectedIdx] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState(event.isPermanent || defaultExpanded || false);
    const [images, setImages] = useState<string[]>(initialImages);
    const [isLoading, setIsLoading] = useState(initialImages.length === 0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                        {event.date && mounted && (
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
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-fadeIn">
                            {images.map((imgSrc, idx) => (
                                <div
                                    key={idx}
                                    className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer aspect-square"
                                    onClick={() => {
                                        setSelectedImg(imgSrc);
                                        setSelectedIdx(idx);
                                    }}
                                >
                                    <img
                                        src={imgSrc}
                                        alt={`${getTrans(dict, event.nameKey)} - Image ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 md:p-5">
                                        <p className="text-white font-medium text-sm md:text-base transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
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
                    <div
                        className="relative max-w-[95vw] max-h-[95vh] w-full h-full flex items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button 
                            onClick={() => setSelectedImg(null)}
                            className="absolute top-0 right-0 md:-top-4 md:-right-4 z-20 text-white/50 hover:text-white transition-colors p-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        {/* Lightbox Navigation */}
                        {images.length > 1 && (
                            <>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newIdx = (selectedIdx - 1 + images.length) % images.length;
                                        setSelectedIdx(newIdx);
                                        setSelectedImg(images[newIdx]);
                                    }}
                                    className="absolute left-4 md:left-10 z-10 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>

                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newIdx = (selectedIdx + 1) % images.length;
                                        setSelectedIdx(newIdx);
                                        setSelectedImg(images[newIdx]);
                                    }}
                                    className="absolute right-4 md:right-10 z-10 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </>
                        )}

                        <img
                            src={selectedImg}
                            alt="Lightbox"
                            className="max-w-full max-h-full object-contain rounded shadow-2xl animate-in zoom-in-95 duration-300"
                        />
                        
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
                            {selectedIdx + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
