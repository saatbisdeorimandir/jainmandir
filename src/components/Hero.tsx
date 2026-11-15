'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getTrans, assetPath } from '@/lib/utils';
import { useExhibition } from '@/context/ExhibitionContext';
import { ArrowDown, Compass, Bed, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
    lang: string;
    dict: any;
}

export default function Hero({ lang, dict }: HeroProps) {
    const { theme, openCurator } = useExhibition();
    const heroRef = useRef<HTMLElement>(null);
    const bgImageRef = useRef<HTMLImageElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    const isHi = lang === 'hi';

    useEffect(() => {
        const hero = heroRef.current;
        const bg = bgImageRef.current;
        const title = titleRef.current;
        const badge = badgeRef.current;
        const subtitle = subtitleRef.current;
        const cta = ctaRef.current;

        if (!hero || !bg) return;

        // Entrance animation
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                bg,
                { scale: 1.25, opacity: 0.6 },
                { scale: 1.1, opacity: 1, duration: 1.6 }
            )
            .fromTo(
                badge,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=1.2'
            )
            .fromTo(
                title,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                '-=0.8'
            )
            .fromTo(
                subtitle,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.6'
            )
            .fromTo(
                cta,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.5'
            );

            // Scroll-driven parallax using ScrollTrigger
            gsap.to(bg, {
                yPercent: 25,
                scale: 1.18,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            if (textContainerRef.current) {
                gsap.to(textContainerRef.current, {
                    yPercent: -15,
                    opacity: 0.2,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: hero,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToExhibition = () => {
        const target = document.getElementById('exhibition-chapters');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            ref={heroRef}
            className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-exhibit-bg text-exhibit-fg transition-colors duration-500"
        >
            {/* Atmospheric Background with Architectural Lighting */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <img
                    ref={bgImageRef}
                    src={assetPath('/assets/images/about/SathisDeori-Temple.jpg')}
                    alt="Shri Saat Bees Deori Jain Temple Chittorgarh Fort"
                    className="w-full h-full object-cover object-center will-change-transform"
                />

                {/* Day / Night Exhibition Mode Atmospheric Lighting Masks */}
                {theme === 'daylight' ? (
                    <>
                        {/* Daylight Marble: Sunlit limestone radiance */}
                        <div className="absolute inset-0 bg-stone-900/35" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F4] via-[#F8F7F4]/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-[#F8F7F4]" />
                    </>
                ) : (
                    <>
                        {/* Nocturnal Sanctuary: Deep basalt & warm lantern aura */}
                        <div className="absolute inset-0 bg-black/65" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0F] via-[#0C0D0F]/80 to-transparent" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-[#0C0D0F]/90" />
                    </>
                )}
            </div>

            {/* Architectural Grid Overlay (Subtle Hairline Grid) */}
            <div className="absolute inset-0 z-[1] pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />

            {/* Content Container */}
            <div
                ref={textContainerRef}
                className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-28 text-center flex flex-col items-center justify-center"
            >
                {/* Catalog Metadata Plate */}
                <div
                    ref={badgeRef}
                    className="badge-royal mb-6 shadow-sm"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-mewar-crimson animate-pulse" />
                    <span className="font-sans tracking-widest text-[10px] md:text-xs font-bold uppercase text-mewar-crimson">
                        {isHi
                            ? 'चित्रकूट महातीर्थ • 11वीं शताब्दी यूनेस्को धरोहर'
                            : 'CHITRAKOOT TIRTH • 11TH CENTURY UNESCO HERITAGE'}
                    </span>
                </div>

                {/* Monumental Royal Headline */}
                <h1
                    ref={titleRef}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-exhibit-fg tracking-wide mb-6 max-w-5xl drop-shadow-sm select-none"
                >
                    {isHi ? (
                        <>
                            <span className="font-yatra text-mewar-crimson tracking-normal">श्री सात बीस देवरी</span> <br className="hidden sm:inline" />
                            <span className="gold-gradient-text font-yatra tracking-normal">जैन महातीर्थ</span>
                        </>
                    ) : (
                        <>
                            <span className="font-cormorant font-bold text-mewar-crimson">Shree Saat Bees Deori</span> <br className="hidden sm:inline" />
                            <span className="gold-gradient-text font-cormorant italic font-normal">Sanctuary of 27 Shrines</span>
                        </>
                    )}
                </h1>

                {/* Sacred Motif Divider */}
                <div className="motif-divider mb-6">❖ ❖ ❖</div>

                {/* Subtitle & Curatorial Statement */}
                <p
                    ref={subtitleRef}
                    className="font-sans text-base sm:text-lg md:text-xl text-exhibit-fg/85 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
                >
                    {isHi
                        ? 'चित्तौड़गढ़ दुर्ग के हृदय में स्थित 27 भव्य जिनालयों का वह पावन धाम, जहाँ शांति, अहिंसा और सदियों की संगमरमर कला जीवंत है।'
                        : 'At the heart of majestic Chittorgarh Fort—a serene sanctuary of 27 sacred shrines, timeless peace, and intricate marble carvings preserved across a thousand years.'}
                </p>

                {/* Action Controls */}
                <div
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                >
                    {/* Primary Exhibition Button */}
                    <button
                        onClick={scrollToExhibition}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-mewar-crimson via-mewar-crimson-deep to-[#B8860B] text-white font-sans font-bold text-xs md:text-sm tracking-wider uppercase hover:opacity-95 transition-all shadow-xl shadow-mewar-crimson/30 group border border-mewar-brass/50 hover:scale-[1.02]"
                    >
                        <Compass className="w-4 h-4 text-mewar-brass-light group-hover:rotate-45 transition-transform duration-300" />
                        <span>{isHi ? 'प्रदर्शनी अध्याय देखें' : 'Explore Sacred Chronicles'}</span>
                    </button>

                    {/* Curator Guide / Search Trigger - Non-grey Crisp Button */}
                    <button
                        onClick={openCurator}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full border-2 border-mewar-crimson/35 bg-white text-mewar-crimson font-sans font-bold text-xs md:text-sm tracking-wider uppercase hover:border-mewar-crimson hover:bg-mewar-crimson hover:text-white hover:shadow-lg transition-all shadow-sm group"
                    >
                        <Sparkles className="w-4 h-4 text-mewar-brass group-hover:text-white transition-colors" />
                        <span>{isHi ? 'मार्गदर्शिका खोलें (⌘K)' : 'Curator Guide (Cmd+K)'}</span>
                    </button>

                    {/* Dharamshala Quick Link - Non-grey Crisp Button */}
                    <Link
                        href={`/${lang}/contact#stay`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border-2 border-mewar-brass/50 bg-white text-mewar-crimson hover:bg-mewar-brass hover:text-white font-sans text-xs md:text-sm tracking-wider uppercase transition-all shadow-sm font-bold group"
                    >
                        <Bed className="w-4 h-4 text-mewar-crimson group-hover:text-white transition-colors" />
                        <span>{isHi ? 'धर्मशाला आवास' : 'Dharamshala Stay'}</span>
                    </Link>
                </div>
            </div>

            {/* Bottom Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
                <span className="font-editorial-meta text-[10px] text-exhibit-muted tracking-[0.25em]">
                    {isHi ? 'नीचे स्क्रॉल करें' : 'SCROLL TO EXPLORE'}
                </span>
                <div className="w-4 h-7 rounded-full border border-exhibit-hairline flex items-start justify-center p-1">
                    <span className="w-1 h-2 rounded-full bg-exhibit-gold animate-bounce" />
                </div>
            </div>
        </section>
    );
}
