'use client';

import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { SiteConfig } from '@/lib/types';
import { getTrans } from '@/lib/utils';
import fallbackSiteConfig from '@/content/site-config.json';

interface InstagramPromotersSectionProps {
    dict: any;
    siteConfig?: SiteConfig;
}

export default function InstagramPromotersSection({ dict, siteConfig }: InstagramPromotersSectionProps) {
    const { ref, isInView: rawIsInView } = useInView<HTMLElement>({ threshold: 0.05 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isInView = rawIsInView || mounted;

    // Smart translation resolver with fallback
    const tr = (key: string, fallback: string): string => {
        if (!dict) return fallback;
        let val = getTrans(dict, key);
        if (val === key || !val) {
            val = getTrans(dict, `sections.${key}`);
        }
        if (val === `sections.${key}` || !val) {
            return fallback;
        }
        return val;
    };

    const configToUse = (siteConfig?.instagramPromoters?.length) ? siteConfig : (fallbackSiteConfig as unknown as SiteConfig);
    const rawPromoters = configToUse?.instagramPromoters || [];
    const promoters = rawPromoters.filter(p => p.isActive !== false);
    const instagramUrl = configToUse?.social?.instagram || 'https://instagram.com';

    if (promoters.length === 0) {
        return null;
    }

    return (
        <section ref={ref} id="instagram-promoters" className="py-16 md:py-24 bg-stone-50/60 border-t border-stone-200/60 relative overflow-hidden w-full max-w-full">
            {/* Background Decorative Blur Gradients */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 -right-20 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full overflow-hidden">
                {/* Header */}
                <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 ${isInView ? 'animate-fade-up' : 'opacity-100'}`}>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-rose-500/10 to-amber-500/10 border border-rose-200/80 text-rose-700 text-xs font-bold tracking-[0.12em] uppercase mb-4 shadow-sm max-w-full truncate">
                        {/* Instagram Icon */}
                        <svg className="w-4 h-4 text-rose-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        <span className="truncate">{tr('instagram_promoters.eyebrow', 'Social Media Highlights')}</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-stone-900 mb-4 sm:mb-6 tracking-tight break-words">
                        {tr('instagram_promoters.title', 'Promoted on Instagram')}
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg text-stone-600 font-light leading-relaxed max-w-2xl mx-auto break-words">
                        {tr('instagram_promoters.subtitle', 'Explore social media pages and travel vloggers showcasing the divine architecture and rich heritage of Shri Shwetamber Jain Mandir.')}
                    </p>
                </div>

                {/* Cards Grid */}
                <div className={`grid grid-cols-1 ${promoters.length === 1 ? 'max-w-xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 sm:gap-8 mb-12 sm:mb-16 w-full max-w-full`}>
                    {promoters.map((promoter, i) => {
                        const itemTitle = promoter.titleKey ? tr(promoter.titleKey, promoter.pageName) : promoter.pageName;
                        const itemDesc = promoter.descKey ? tr(promoter.descKey, '') : '';

                        return (
                            <div
                                key={promoter.id || i}
                                className="group bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-md hover:shadow-xl hover:border-rose-300 transition-all duration-500 flex flex-col justify-between w-full max-w-full overflow-hidden"
                            >
                                <div className="w-full max-w-full overflow-hidden">
                                    {/* Top Profile Bar */}
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 w-full overflow-hidden">
                                        {/* Avatar or Instagram Icon Badge */}
                                        {promoter.avatar ? (
                                            <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                                <img
                                                    src={promoter.avatar}
                                                    alt={promoter.pageName}
                                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                                <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                </svg>
                                            </div>
                                        )}

                                        <div className="flex-grow min-w-0 overflow-hidden">
                                            <div className="flex items-center gap-1.5 max-w-full">
                                                <h3 className="font-heading font-bold text-stone-900 text-base sm:text-lg truncate group-hover:text-rose-600 transition-colors">
                                                    {promoter.pageName}
                                                </h3>
                                                {/* Verified Badge */}
                                                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className="text-xs text-stone-500 font-medium truncate">
                                                {promoter.handle}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Badges Row */}
                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3.5 sm:mb-4">
                                        {promoter.badge && (
                                            <span className="bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-semibold px-2.5 py-0.5 rounded-full truncate max-w-full">
                                                {promoter.badge}
                                            </span>
                                        )}
                                        {promoter.followers && (
                                            <span className="bg-stone-100 text-stone-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 truncate max-w-full">
                                                <svg className="w-3 h-3 text-stone-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <span className="truncate">{promoter.followers}</span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Promotion Content */}
                                    <h4 className="font-semibold text-stone-800 text-sm sm:text-base mb-2 group-hover:text-jain-orange transition-colors break-words">
                                        {itemTitle}
                                    </h4>

                                    {itemDesc && (
                                        <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed mb-5 sm:mb-6 line-clamp-3 break-words">
                                            {itemDesc}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons - Stack on small screens to prevent overflow */}
                                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mt-auto w-full max-w-full">
                                    <a
                                        href={promoter.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold text-stone-800 hover:text-rose-600 transition-colors py-2 px-3 rounded-lg bg-stone-100/80 hover:bg-stone-200/80 sm:bg-transparent min-w-0"
                                    >
                                        <svg className="w-4 h-4 text-rose-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                        <span className="truncate">{tr('instagram_promoters.visit_page', 'Visit Page')}</span>
                                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>

                                    {promoter.postUrl && (
                                        <a
                                            href={promoter.postUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors min-w-0"
                                        >
                                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="truncate">{tr('instagram_promoters.watch_reel', 'Watch Reel')}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Call to Action Card */}
                <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden w-full max-w-full">
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-rose-500/10 to-transparent pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left w-full">
                        <div className="max-w-2xl w-full">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-2 sm:mb-3 text-white break-words">
                                {tr('instagram_promoters.tag_us_title', 'Did you feature our Mandir on Instagram?')}
                            </h3>
                            <p className="text-stone-300 font-light text-xs sm:text-sm md:text-base leading-relaxed break-words">
                                {tr('instagram_promoters.tag_us_desc', 'Tag our official page or share your reels & posts with us to get featured right here on our website!')}
                            </p>
                        </div>

                        <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white hover:opacity-95 font-bold py-3.5 px-6 sm:py-4 sm:px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex-shrink-0 text-xs sm:text-sm md:text-base"
                        >
                            <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            <span className="truncate">{tr('instagram_promoters.tag_us_btn', 'Tag Us on Instagram')}</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
