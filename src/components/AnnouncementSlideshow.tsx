'use client';

import { useState, useEffect } from 'react';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import Image from 'next/image';
import { getTrans } from '@/lib/utils';

interface AnnouncementSlideshowProps {
    dict?: any;
}

export default function AnnouncementSlideshow({ dict }: AnnouncementSlideshowProps) {
    const { announcements, loading } = useAnnouncements();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    useEffect(() => {
        if (announcements.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % announcements.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [announcements.length]);

    if (loading || announcements.length === 0) return null;

    return (
        <div className="w-full max-w-7xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-jain-orange/10 flex items-center justify-center text-jain-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8Z"/><path d="M10 12h.01"/><path d="M16 16h.01"/><path d="M22 8v8"/></svg>
                </div>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-stone-gray">
                    {getTrans(dict, 'nav.announcements') || 'Announcements'}
                </h2>
            </div>

            <div className="relative aspect-[16/10] md:aspect-[21/7] w-full overflow-hidden rounded-[2.5rem] shadow-lg bg-stone-50 border border-stone-100 group">
                {announcements.map((announcement, index) => (
                    <div
                        key={announcement.public_id}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out transform cursor-zoom-in p-2 md:p-4 ${
                            index === currentIndex 
                                ? "opacity-100 scale-100 translate-x-0" 
                                : "opacity-0 scale-105 translate-x-full"
                        }`}
                        onClick={() => setSelectedImg(announcement.url)}
                    >
                        <div className="relative w-full h-full flex items-center justify-center p-2 md:p-4">
                            <img
                                src={announcement.url}
                                alt="Announcement"
                                className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-sm"
                            />
                        </div>
                    </div>
                ))}
                
                {/* ... existing controls ... */}
                {/* Navigation Dots */}
                {announcements.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {announcements.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    index === currentIndex 
                                        ? "w-8 bg-jain-orange shadow-sm" 
                                        : "w-2 bg-white/50 hover:bg-white/80"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Left/Right Controls (Optional) */}
                {announcements.length > 1 && (
                    <>
                        <button 
                            onClick={() => setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button 
                            onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImg && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-95 transition-opacity animate-in fade-in duration-200"
                    onClick={() => setSelectedImg(null)}
                >
                    <button className="absolute top-6 right-6 text-white hover:text-jain-orange transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div className="relative max-w-[95vw] max-h-[95vh] w-full h-full flex items-center justify-center p-4">
                        {/* Lightbox Navigation */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
                                setSelectedImg(announcements[(currentIndex - 1 + announcements.length) % announcements.length].url);
                            }}
                            className="absolute left-4 md:left-10 z-10 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>

                        <img
                            src={selectedImg}
                            alt="Announcement Full View"
                            className="max-w-full max-h-full object-contain rounded shadow-2xl animate-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex((prev) => (prev + 1) % announcements.length);
                                setSelectedImg(announcements[(currentIndex + 1) % announcements.length].url);
                            }}
                            className="absolute right-4 md:right-10 z-10 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-md transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
