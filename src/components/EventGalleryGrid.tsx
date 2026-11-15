'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GalleryEvent } from '@/lib/types';
import { getTrans, assetPath } from '@/lib/utils';
import CloudinaryLoader from './CloudinaryLoader';
import {
    X,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    Maximize2,
    Calendar,
    Sparkles
} from 'lucide-react';

interface EventGalleryGridProps {
    event: GalleryEvent;
    dict: any;
    images: string[];
    defaultExpanded?: boolean;
}

export default function EventGalleryGrid({
    event,
    dict,
    images: initialImages,
    defaultExpanded,
}: EventGalleryGridProps) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [selectedIdx, setSelectedIdx] = useState<number>(0);
    const [isExpanded, setIsExpanded] = useState(event.isPermanent || defaultExpanded || false);
    const [images, setImages] = useState<string[]>(initialImages);
    const [isLoading, setIsLoading] = useState(initialImages.length === 0);
    const [mounted, setMounted] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const lightboxRef = useRef<HTMLDivElement>(null);

    // Touch swipe gesture references
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock background body scroll when fullscreen lightbox is active
    useEffect(() => {
        if (selectedImg) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [selectedImg]);

    const closeLightbox = useCallback(() => {
        if (typeof document !== 'undefined' && document.fullscreenElement) {
            try {
                document.exitFullscreen().catch(() => {});
            } catch {}
        }
        setSelectedImg(null);
        setIsZoomed(false);
    }, []);

    const showNext = useCallback(() => {
        if (images.length <= 1) return;
        const nextIdx = (selectedIdx + 1) % images.length;
        setSelectedIdx(nextIdx);
        setSelectedImg(images[nextIdx]);
        setIsZoomed(false);
    }, [selectedIdx, images]);

    const showPrev = useCallback(() => {
        if (images.length <= 1) return;
        const prevIdx = (selectedIdx - 1 + images.length) % images.length;
        setSelectedIdx(prevIdx);
        setSelectedImg(images[prevIdx]);
        setIsZoomed(false);
    }, [selectedIdx, images]);

    // Keyboard navigation for Lightbox
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!selectedImg) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            }
        },
        [selectedImg, closeLightbox, showNext, showPrev]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || touchStartY.current === null) return;
        const diffX = touchStartX.current - e.changedTouches[0].clientX;
        const diffY = touchStartY.current - e.changedTouches[0].clientY;

        // If horizontal swipe is distinct and greater than 40px
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 0) {
                showNext();
            } else {
                showPrev();
            }
        }
        touchStartX.current = null;
        touchStartY.current = null;
    };

    const toggleNativeFullscreen = () => {
        if (!document.fullscreenElement) {
            if (lightboxRef.current?.requestFullscreen) {
                lightboxRef.current.requestFullscreen().catch(() => {});
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            }
        }
    };

    const shouldFetchDynamic = initialImages.length === 0;
    const cloudinaryTag = event.id;

    if (images.length === 0 && !shouldFetchDynamic) {
        return (
            <div className="text-center py-8 text-exhibit-muted">
                <p>{getTrans(dict, 'gallery.no_images') || 'No images available in this collection.'}</p>
            </div>
        );
    }

    const openLightbox = (imgSrc: string, idx: number) => {
        setSelectedImg(imgSrc);
        setSelectedIdx(idx);
        setIsZoomed(false);
    };

    return (
        <div className="mb-14 last:mb-0">
            {/* Collection Header */}
            <div
                className="flex items-center justify-between p-5 rounded-2xl bg-exhibit-elevated/40 border border-exhibit-hairline hover:border-exhibit-gold/40 transition-all cursor-pointer group mb-6"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal-gold" />
                        <h3 className="text-xl md:text-2xl font-cinzel font-bold text-exhibit-fg group-hover:text-royal-gold transition-colors">
                            {getTrans(dict, event.nameKey)}
                        </h3>
                    </div>
                    {event.date && mounted && (
                        <div className="flex items-center gap-1.5 text-xs text-exhibit-muted mt-1 font-mono">
                            <Calendar className="w-3.5 h-3.5 text-exhibit-gold" />
                            <span>
                                {new Date(event.date).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-exhibit-surface border border-exhibit-hairline text-exhibit-muted">
                        {images.length} {images.length === 1 ? 'Photo' : 'Photos'}
                    </span>
                    <span className="text-xs font-mono text-exhibit-gold px-2 py-1 rounded-full border border-exhibit-gold/30">
                        {isExpanded ? '− Collapse' : '+ Expand'}
                    </span>
                </div>
            </div>

            {/* Cloudinary dynamic fetch if needed */}
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

            {/* Asymmetric Architectural Gallery Grid */}
            {isExpanded && (
                <>
                    {isLoading ? (
                        <div className="flex justify-center py-16">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-exhibit-gold" />
                        </div>
                    ) : images.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                            {images.map((imgSrc, idx) => {
                                // Variable aspect ratios for architectural cadence
                                const isWide = idx % 5 === 0;
                                const isTall = idx % 5 === 1;

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => openLightbox(imgSrc, idx)}
                                        className={`group relative overflow-hidden rounded-2xl border border-exhibit-hairline shadow-md cursor-pointer bg-stone-900 transition-all duration-500 hover:shadow-2xl hover:border-exhibit-gold/60 ${
                                            isWide
                                                ? 'sm:col-span-2 aspect-[16/10]'
                                                : isTall
                                                ? 'aspect-[3/4]'
                                                : 'aspect-square'
                                        }`}
                                    >
                                        <img
                                            src={assetPath(imgSrc)}
                                            alt={`${getTrans(dict, event.nameKey)} - ${idx + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />

                                        {/* Hover Lens Reveal Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 md:p-5">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/15 text-white backdrop-blur-md border border-white/20">
                                                    {String(idx + 1).padStart(2, '0')} / {images.length}
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                                    <Maximize2 className="w-4 h-4" />
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-white font-sans font-bold text-sm line-clamp-1">
                                                    {getTrans(dict, event.nameKey)}
                                                </p>
                                                <p className="text-[11px] font-mono text-white/70 mt-0.5">
                                                    Click to inspect details
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-exhibit-muted">
                            <p>{getTrans(dict, 'gallery.no_images') || 'No images found for this event.'}</p>
                        </div>
                    )}
                </>
            )}

            {/* Fullscreen Museum Lens Lightbox */}
            {selectedImg && (
                <div
                    ref={lightboxRef}
                    className="fixed inset-0 z-[99999] flex flex-col justify-between bg-black/95 backdrop-blur-2xl transition-opacity animate-fadeIn select-none"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            closeLightbox();
                        }
                    }}
                >
                    {/* Lightbox Top Header */}
                    <div className="flex items-center justify-between px-4 md:px-8 py-3.5 border-b border-white/15 bg-black/50 backdrop-blur-md text-white z-20">
                        <div className="flex-1 min-w-0 mr-4">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-amber-300 font-bold tracking-widest">
                                    {selectedIdx + 1} / {images.length}
                                </span>
                                <span className="hidden sm:inline text-xs text-white/50">•</span>
                                <span className="hidden sm:inline text-xs text-white/70 font-sans">
                                    {isZoomed ? 'विस्तृत दृश्य (Zoomed View)' : 'सामान्य दृश्य (Fit to Screen)'}
                                </span>
                            </div>
                            <h4 className="font-sans font-bold text-sm md:text-base text-white truncate mt-0.5">
                                {getTrans(dict, event.nameKey)}
                            </h4>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3">
                            {/* Native Fullscreen Toggle */}
                            <button
                                onClick={toggleNativeFullscreen}
                                className="p-2 md:p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white/90 hover:text-white transition-colors"
                                title="Toggle Fullscreen"
                                aria-label="Toggle Fullscreen"
                            >
                                <Maximize2 className="w-4 h-4" />
                            </button>

                            {/* Lens Zoom Toggle */}
                            <button
                                onClick={() => setIsZoomed(!isZoomed)}
                                className={`p-2 md:p-2.5 rounded-full transition-colors ${
                                    isZoomed 
                                        ? 'bg-amber-400 text-black font-bold' 
                                        : 'bg-white/10 hover:bg-white/25 text-white/90 hover:text-white'
                                }`}
                                title={isZoomed ? 'Reset zoom' : 'Inspect close-up'}
                                aria-label={isZoomed ? 'Reset zoom' : 'Inspect close-up'}
                            >
                                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={closeLightbox}
                                className="flex items-center gap-1 px-3 py-1.5 md:py-2 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors text-xs font-mono font-bold"
                                aria-label="Close fullscreen view"
                            >
                                <span className="hidden sm:inline">ESC</span>
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Central Inspection Area */}
                    <div
                        className={`relative flex-1 w-full flex items-center justify-center ${
                            isZoomed ? 'overflow-auto cursor-zoom-out' : 'overflow-hidden cursor-default'
                        } p-2 md:p-4`}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                closeLightbox();
                            }
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {/* Navigation Left */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showPrev();
                                }}
                                className="absolute left-2 md:left-6 z-30 p-2.5 md:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/25 hover:border-white/60 transition-all shadow-2xl group"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                        )}

                        {/* Image Container */}
                        <div
                            className={`flex items-center justify-center transition-all duration-300 ${
                                isZoomed
                                    ? 'min-w-full min-h-full items-start justify-center p-4'
                                    : 'max-w-full max-h-[75vh] md:max-h-[80vh]'
                            }`}
                            onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                    closeLightbox();
                                }
                            }}
                        >
                            <img
                                src={assetPath(selectedImg)}
                                alt={`${getTrans(dict, event.nameKey)} - ${selectedIdx + 1}`}
                                className={`object-contain rounded-xl shadow-2xl transition-transform duration-300 ${
                                    isZoomed
                                        ? 'min-w-[125%] sm:min-w-[150%] max-w-none h-auto cursor-zoom-out'
                                        : 'max-w-[92vw] max-h-[74vh] md:max-h-[78vh] cursor-zoom-in'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsZoomed(!isZoomed);
                                }}
                            />
                        </div>

                        {/* Navigation Right */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showNext();
                                }}
                                className="absolute right-2 md:right-6 z-30 p-2.5 md:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/25 hover:border-white/60 transition-all shadow-2xl group"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        )}
                    </div>

                    {/* Lightbox Footer Bar */}
                    <div className="flex items-center justify-between px-4 md:px-8 py-2.5 border-t border-white/15 bg-black/50 backdrop-blur-md text-xs font-mono text-white/70 z-20">
                        <div className="flex items-center gap-2 truncate">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="truncate">Shri Saat Bees Deori Jain Sanctuary • Chittorgarh Fort</span>
                        </div>
                        <div className="hidden md:flex items-center gap-3 text-white/60">
                            <span>← / → to browse</span>
                            <span>•</span>
                            <span>Swipe on mobile</span>
                            <span>•</span>
                            <span>Click image to zoom</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
