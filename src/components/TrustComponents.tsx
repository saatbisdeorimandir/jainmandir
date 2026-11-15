'use client';

import { useState, useEffect } from 'react';
import { TrustMember, SiteConfig, Lang } from '@/lib/types';
import { getTrans, getBilingualAuth, assetPath } from '@/lib/utils';

interface TrustCommitteeProps {
    siteConfig: SiteConfig;
    dict: any;
}

export function TrustCommittee({ siteConfig, dict }: TrustCommitteeProps) {
    if (!siteConfig.trust || !siteConfig.trust.committee) return null;

    return (
        <div className="mb-4">
            <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jain-orange/10 text-jain-orange text-sm font-semibold mb-3">
                    ✨ {getTrans(dict, 'trust.title')}
                </div>
                <p className="text-stone-500 font-light leading-relaxed">
                    {getTrans(dict, 'trust.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {siteConfig.trust.committee.map((member, idx) => {
                    const name = getTrans(dict, member.nameKey);

                    return (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl border border-stone-100 p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                        >
                            {/* Person Avatar Icon */}
                            <div className="relative w-24 h-24 rounded-full mb-6 bg-gradient-to-br from-jain-orange/15 to-amber-100 border-2 border-jain-orange/25 group-hover:border-jain-orange/60 shadow-lg shadow-jain-orange/10 transition-all duration-300 group-hover:scale-110 flex items-center justify-center overflow-hidden">
                                <svg
                                    viewBox="0 0 80 80"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-16 h-16"
                                >
                                    {/* Head */}
                                    <circle cx="40" cy="28" r="14" fill="#f97316" fillOpacity="0.85" />
                                    {/* Body / shoulders */}
                                    <ellipse cx="40" cy="66" rx="24" ry="18" fill="#f97316" fillOpacity="0.75" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-stone-800 mb-2 transition-colors duration-300 group-hover:text-jain-orange leading-snug">
                                {name}
                            </h3>

                            <div className="w-10 h-1 bg-gradient-to-r from-jain-orange to-red-500 my-3 rounded-full" />

                            <p className="text-base text-stone-500 font-medium tracking-wide">
                                {getTrans(dict, member.roleKey)}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

interface TrustGalleryProps {
    dict: any;
}

export function TrustGallery({ dict }: TrustGalleryProps) {
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

    const images = [
        {
            src: assetPath('/assets/images/trust/Trustees1.jpeg'),
            desc: getTrans(dict, 'trust.gallery.img1_desc')
        },
        {
            src: assetPath('/assets/images/trust/Trustees2.jpeg'),
            desc: getTrans(dict, 'trust.gallery.img2_desc')
        }
    ];

    const openLightbox = (index: number) => {
        setActiveImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setActiveImageIndex(null);
        document.body.style.overflow = '';
    };

    const nextImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
    };

    const prevImage = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (activeImageIndex === null) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [activeImageIndex, images.length]);

    return (
        <div className="mb-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-jain-orange/10 text-jain-orange text-sm font-semibold mb-3">
                    📸 {getTrans(dict, 'trust.gallery.title')}
                </div>
                <p className="text-stone-500 font-light leading-relaxed">
                    {getTrans(dict, 'trust.gallery.subtitle')}
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {images.map((image, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => openLightbox(idx)}
                        className="group overflow-hidden rounded-2xl border border-stone-200 bg-stone-50/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-zoom-in"
                    >
                        {/* Image Container with No Crop */}
                        <div className="relative overflow-hidden bg-stone-100 flex items-center justify-center aspect-video p-2 border-b border-stone-150">
                            <img 
                                src={image.src} 
                                alt={image.desc}
                                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-102"
                            />
                            {/* Hover overlay with modern search icon */}
                            <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <span className="text-white text-xs font-semibold tracking-wider uppercase transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                    Click to View Fullscreen
                                </span>
                            </div>
                        </div>
                        {/* Text Caption */}
                        <div className="p-4 bg-white flex-grow flex items-center justify-center">
                            <p className="text-stone-700 font-semibold text-center text-base sm:text-lg">
                                {image.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {activeImageIndex !== null && (
                <div 
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fade-in select-none"
                    onClick={closeLightbox}
                >
                    {/* Close button */}
                    <button 
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-jain-orange"
                        aria-label="Close fullscreen view"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Previous image button */}
                    <button 
                        onClick={prevImage}
                        className="absolute left-4 md:left-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full transition-all duration-300 focus:outline-none"
                        aria-label="Previous image"
                    >
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Image Box */}
                    <div className="relative max-w-[90vw] max-h-[75vh] flex items-center justify-center shadow-2xl rounded-lg overflow-hidden bg-stone-900/50">
                        <img 
                            src={images[activeImageIndex].src} 
                            alt={images[activeImageIndex].desc}
                            className="max-w-full max-h-[75vh] object-contain rounded-md animate-scale-in"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {/* Caption Overlay */}
                    <div className="mt-6 text-center max-w-2xl px-6" onClick={(e) => e.stopPropagation()}>
                        <p className="text-white text-lg md:text-xl font-medium tracking-wide">
                            {images[activeImageIndex].desc}
                        </p>
                        <p className="text-stone-400 text-sm mt-2 font-mono">
                            {activeImageIndex + 1} / {images.length}
                        </p>
                    </div>

                    {/* Next image button */}
                    <button 
                        onClick={nextImage}
                        className="absolute right-4 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full transition-all duration-300 focus:outline-none"
                        aria-label="Next image"
                    >
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

interface TrustTableProps {
    members: TrustMember[];
    lang: Lang;
    dict: any;
}

export function TrustTable({ members, lang, dict }: TrustTableProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMembers = members.filter(member => {
        const nameVal = getBilingualAuth(member.name, lang).toLowerCase();
        const placeVal = getBilingualAuth(member.place, lang).toLowerCase();
        return nameVal.includes(searchTerm.toLowerCase()) || placeVal.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="p-6 md:p-8">
            {/* Search Input bar */}
            <div className="mb-6 max-w-md">
                <div className="relative">
                    <input 
                        type="text"
                        placeholder={lang === 'hi' ? 'सदस्यों को खोजें (नाम या शहर)...' : 'Search members (by name or city)...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-jain-orange/40 focus:border-jain-orange transition-all duration-300 shadow-inner text-stone-700 placeholder-stone-400 text-sm sm:text-base"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 transition-colors duration-150"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Table Content */}
            <div className="rounded-2xl border border-stone-150 shadow-md overflow-hidden overflow-x-auto bg-white">
                {filteredMembers.length > 0 ? (
                    <table className="min-w-full divide-y divide-stone-100">
                        <thead>
                            <tr className="bg-stone-50/50">
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-stone-400 uppercase tracking-wider w-16">
                                    {getTrans(dict, 'trust.table.no')}
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-stone-700 uppercase tracking-wider">
                                    {getTrans(dict, 'trust.table.name')}
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-stone-700 uppercase tracking-wider">
                                    {getTrans(dict, 'trust.table.place')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 bg-white">
                            {filteredMembers.map((member) => (
                                <tr key={member.no} className="hover:bg-amber-50/20 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-400 font-mono">{member.no}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-stone-800">
                                        {getBilingualAuth(member.name, lang)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 font-light">
                                        {getBilingualAuth(member.place, lang)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="py-12 text-center text-stone-400 font-light">
                        {lang === 'hi' ? 'कोई सदस्य नहीं मिला' : 'No members found matching your search'}
                    </div>
                )}
            </div>
        </div>
    );
}
