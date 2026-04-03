'use client';

import Link from 'next/link';
import { getTrans, assetPath } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface HeroProps {
    lang: string;
    dict: any;
}

export default function Hero({ lang, dict }: HeroProps) {
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);
    const bgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const parallaxOffset = scrollY * 0.35;

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-32 bg-stone-50">
            {/* Background with parallax */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    ref={bgRef}
                    src={assetPath("/assets/images/about/SathisDeori-Temple.jpg")}
                    className="w-full h-full object-cover opacity-100 scale-110"
                    style={{ transform: `scale(1.1) translateY(${parallaxOffset}px)`, willChange: 'transform' }}
                    alt="Jain Temple Background"
                />
                <div className="absolute inset-0 bg-stone-50/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/40 to-stone-50"></div>
            </div>

            {/* Floating decorative orbs */}
            {mounted && (
                <>
                    <div
                        className="orb w-72 h-72 bg-jain-orange top-16 -left-16"
                        style={{ animationDelay: '0s', animationDuration: '7s' }}
                    />
                    <div
                        className="orb w-56 h-56 bg-jain-red bottom-24 -right-12"
                        style={{ animationDelay: '2s', animationDuration: '9s' }}
                    />
                    <div
                        className="orb w-40 h-40 bg-amber-300 top-1/2 right-1/4"
                        style={{ animationDelay: '1s', animationDuration: '6s' }}
                    />
                </>
            )}

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                {/* Decorative rule */}
                <div
                    className={`flex justify-center mb-8 ${mounted ? 'animate-fade-down' : 'opacity-0'}`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-jain-orange rounded-full" />
                        <div className="w-2.5 h-2.5 rounded-full bg-jain-orange animate-glow-pulse" />
                        <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-jain-orange rounded-full" />
                    </div>
                </div>

                {/* Heading */}
                <h1
                    className={`text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-10 text-stone-gray leading-[1.05] tracking-tight
                        ${mounted ? 'animate-fade-up delay-150' : 'opacity-0'}`}
                >
                    {getTrans(dict, 'hero.title')}
                </h1>

                {/* Subtitle 1 */}
                <p
                    className={`text-xl md:text-xl lg:text-2xl text-stone-500 mb-4 max-w-3xl mx-auto font-light leading-relaxed italic border-l-4 border-jain-orange/20 pl-8 inline-block text-left
                        ${mounted ? 'animate-fade-up delay-300' : 'opacity-0'}`}
                >
                    {getTrans(dict, 'hero.subtitle0')}
                </p>

                {/* Subtitle 2 */}
                <p
                    className={`text-xl md:text-2xl lg:text-3xl text-stone-500 mb-14 max-w-3xl mx-auto font-light leading-relaxed italic border-l-4 border-jain-orange/20 pl-8 inline-block text-left
                        ${mounted ? 'animate-fade-up delay-400' : 'opacity-0'}`}
                >
                    {getTrans(dict, 'hero.subtitle')}
                </p>

                {/* CTA */}
                <div className={mounted ? 'animate-scale-in delay-600' : 'opacity-0'}>
                    <Link
                        href={`/${lang}/about`}
                        className="shimmer-btn inline-flex items-center gap-3 bg-stone-900 border border-stone-800 text-stone-50 hover:bg-stone-800 font-medium py-5 px-12 rounded-full shadow-2xl tracking-[0.1em] uppercase text-sm hover:scale-105 hover:shadow-jain-orange/20"
                    >
                        {getTrans(dict, 'hero.btn')}
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Scroll indicator - Centered Wrapper */}
            {mounted && (
                <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none z-20">
                    <div className={`animate-fade-up delay-800 flex flex-col items-center gap-2 pointer-events-auto`}>
                        <span className="text-xs text-stone-400 uppercase tracking-widest font-medium">
                            {getTrans(dict, 'about_page.scroll_label') || 'Scroll'}
                        </span>
                        <div className="w-5 h-8 border-2 border-stone-300/50 rounded-full flex justify-center pt-1.5">
                            <div className="w-1 h-2 bg-jain-orange rounded-full animate-bounce" />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
