'use client';

import React from 'react';
import Link from 'next/link';
import { useExhibition } from '@/context/ExhibitionContext';
import {
    Sun,
    Moon,
    Search,
    Compass,
    Bed,
    Sparkles
} from 'lucide-react';

interface ExhibitionDockProps {
    lang: string;
}

export default function ExhibitionDock({ lang }: ExhibitionDockProps) {
    const {
        theme,
        toggleTheme,
        openCurator
    } = useExhibition();

    const isHi = lang === 'hi';

    return (
        <aside
            aria-label={isHi ? 'प्रदर्शनी नियंत्रण डॉक' : 'Exhibition Controls Dock'}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-fit pointer-events-auto"
        >
            <div className="flex items-center gap-1.5 md:gap-2 px-3.5 py-2 rounded-full bg-exhibit-surface/95 border border-mewar-crimson/30 shadow-2xl shadow-mewar-crimson/10 backdrop-blur-xl text-exhibit-fg transition-all duration-300 hover:border-mewar-crimson">
                {/* Command Palette Trigger */}
                <button
                    onClick={openCurator}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-mewar-crimson/10 text-xs font-sans font-semibold text-exhibit-fg transition-colors group"
                    title={isHi ? 'खोजें एवं प्रदर्शनी मार्गदर्शिका (Ctrl+K)' : 'Search & Exhibition Guide (Cmd+K)'}
                >
                    <Search className="w-3.5 h-3.5 text-mewar-crimson group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline font-sans font-bold tracking-wider uppercase text-mewar-crimson">
                        {isHi ? 'मार्गदर्शिका' : 'EXHIBIT'}
                    </span>
                    <span className="hidden md:inline px-1.5 py-0.2 rounded text-[10px] font-mono border border-mewar-crimson/25 text-mewar-crimson font-bold">
                        ⌘K
                    </span>
                </button>

                <div className="w-[1px] h-4 bg-exhibit-border" />

                {/* Day / Night Exhibition Mode Switcher */}
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-mewar-crimson/10 text-xs transition-colors"
                    title={
                        theme === 'daylight'
                            ? (isHi ? 'रात्रि शांत मोड चालू करें' : 'Switch to Nocturnal Sanctuary')
                            : (isHi ? 'श्वेत संगमरमर मोड चालू करें' : 'Switch to Daylight Marble')
                    }
                >
                    {theme === 'daylight' ? (
                        <>
                            <Sun className="w-3.5 h-3.5 text-amber-600" />
                            <span className="hidden lg:inline text-xs font-sans text-exhibit-muted">
                                {isHi ? 'दिन' : 'Daylight'}
                            </span>
                        </>
                    ) : (
                        <>
                            <Moon className="w-3.5 h-3.5 text-amber-300" />
                            <span className="hidden lg:inline text-xs font-sans text-exhibit-muted">
                                {isHi ? 'रात्रि' : 'Nocturnal'}
                            </span>
                        </>
                    )}
                </button>

                <div className="w-[1px] h-4 bg-exhibit-border" />

                {/* Dharamshala Quick Booking Direct Action */}
                <Link
                    href={`/${lang}/contact#stay`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mewar-crimson text-white hover:bg-mewar-crimson-deep text-xs font-sans font-semibold transition-all shadow-md shadow-mewar-crimson/20"
                >
                    <Bed className="w-3.5 h-3.5 text-mewar-brass-light" />
                    <span>{isHi ? 'आवास' : 'Stay'}</span>
                </Link>
            </div>
        </aside>
    );
}
