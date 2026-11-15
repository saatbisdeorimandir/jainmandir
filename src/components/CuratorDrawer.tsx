'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useExhibition } from '@/context/ExhibitionContext';
import {
    Search,
    Sun,
    Moon,
    X,
    Compass,
    Landmark,
    Clock,
    MapPin,
    BookOpen,
    Image,
    Bed,
    ExternalLink,
    ChevronRight,
    Sparkles
} from 'lucide-react';

interface CuratorDrawerProps {
    lang: string;
}

interface SearchEntry {
    id: string;
    chapterNumber?: string;
    titleEn: string;
    titleHi: string;
    categoryEn: string;
    categoryHi: string;
    descEn: string;
    descHi: string;
    href: string;
    icon: React.ElementType;
}

export default function CuratorDrawer({ lang }: CuratorDrawerProps) {
    const {
        theme,
        toggleTheme,
        isCuratorOpen,
        closeCurator
    } = useExhibition();

    const [query, setQuery] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // Auto-focus input when drawer opens
    useEffect(() => {
        if (isCuratorOpen) {
            setTimeout(() => inputRef.current?.focus(), 80);
        } else {
            setQuery('');
        }
    }, [isCuratorOpen]);

    // Live IST time at Chittorgarh
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const istTime = now.toLocaleTimeString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setCurrentTime(istTime);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const entries: SearchEntry[] = [
        {
            id: 'chapter-1',
            chapterNumber: '01',
            titleEn: 'The Genesis (300 BC - Maurya Era)',
            titleHi: 'उत्पत्ति और माध्यमिका का इतिहास (300 ई.पू.)',
            categoryEn: 'Exhibition Chapter',
            categoryHi: 'प्रदर्शनी अध्याय',
            descEn: 'Samprati, Aryarakshit, and ancient roots in Chittorgarh',
            descHi: 'सम्राट संप्रति, आर्य रक्षित और चित्तौड़गढ़ की प्राचीन नींव',
            href: `/${lang}/history#chapter-1`,
            icon: Landmark,
        },
        {
            id: 'chapter-2',
            chapterNumber: '02',
            titleEn: 'The 27 Shrines (Saat Bees Deori)',
            titleHi: '27 जिनालय (सात बीस देवरी वास्तुकला)',
            categoryEn: 'Architecture',
            categoryHi: 'वास्तुकला',
            descEn: 'Architectural breakdown of the 27 sanctums and marble carvings',
            descHi: '27 देवकुलिकाओं और संगमरमर की कलात्मक नक्काशी का विवरण',
            href: `/${lang}/history#chapter-2`,
            icon: Compass,
        },
        {
            id: 'chapter-3',
            chapterNumber: '03',
            titleEn: 'The Living Heritage & Sacred Sanctum',
            titleHi: 'जीवंत विरासत और मुख्य जिनालय',
            categoryEn: 'Spiritual Legacy',
            categoryHi: 'आध्यात्मिक धरोहर',
            descEn: 'Lord Adinath sanctum, rituals, and centuries of devotion',
            descHi: 'भगवान आदिनाथ जी का मूल गर्भगृह और सदियों की भक्ति परंपरा',
            href: `/${lang}/history#chapter-3`,
            icon: BookOpen,
        },
        {
            id: 'fort-map',
            titleEn: 'Fort Pilgrim Route & Parking Guide',
            titleHi: 'किला मार्ग, वाहन पार्किंग और पहुंच मार्गदर्शिका',
            categoryEn: 'Pilgrim Services',
            categoryHi: 'यात्री सुविधाएं',
            descEn: 'Step-by-step navigation through Suraj Pol and parking gates',
            descHi: 'सूरज पोल, राम पोल और मंदिर तक पहुंचने का मानचित्र',
            href: `/${lang}/contact#map`,
            icon: MapPin,
        },
        {
            id: 'dharamshala',
            titleEn: 'Dharamshala & Stay Booking',
            titleHi: 'धर्मशाला एवं आवास व्यवस्था',
            categoryEn: 'Accommodation',
            categoryHi: 'आवास',
            descEn: 'AC and Non-AC guest rooms, Bhojanshala meal timings',
            descHi: 'वातानुकूलित कमरे, भोजनशाला समय और विश्राम व्यवस्था',
            href: `/${lang}/contact#stay`,
            icon: Bed,
        },
        {
            id: 'photo-gallery',
            titleEn: 'Curated Photo Archive & Lightbox',
            titleHi: 'चित्र दीर्घा और ऐतिहासिक अभिलेखागार',
            categoryEn: 'Visual Archives',
            categoryHi: 'चित्र दीर्घा',
            descEn: 'High-resolution architectural photography and stone carvings',
            descHi: 'मंदिर की भव्य नक्काशी और प्रांगण के उच्च-रिज़ॉल्यूशन चित्र',
            href: `/${lang}/gallery`,
            icon: Image,
        },
        {
            id: 'timings',
            titleEn: 'Sanctuary Timings & Daily Darshan',
            titleHi: 'मंदिर समय और दैनिक दर्शन सारणी',
            categoryEn: 'Visiting Info',
            categoryHi: 'दर्शन समय',
            descEn: 'Morning Aarti, evening Bhakti, and entry schedule',
            descHi: 'प्रातः प्रक्षाल, आरती एवं संध्या भक्ति का समय',
            href: `/${lang}/about#timings`,
            icon: Clock,
        },
    ];

    const filtered = entries.filter(item => {
        const q = query.toLowerCase();
        return (
            item.titleEn.toLowerCase().includes(q) ||
            item.titleHi.toLowerCase().includes(q) ||
            item.descEn.toLowerCase().includes(q) ||
            item.descHi.toLowerCase().includes(q) ||
            item.categoryEn.toLowerCase().includes(q)
        );
    });

    const handleSelect = (href: string) => {
        closeCurator();
        router.push(href);
    };

    if (!isCuratorOpen) return null;

    const isHi = lang === 'hi';

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-20 px-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                onClick={closeCurator}
            />

            {/* Modal Dialog */}
            <div className="relative w-full max-w-3xl bg-exhibit-surface border border-royal-gold/30 shadow-2xl shadow-royal-gold/10 rounded-2xl overflow-hidden flex flex-col max-h-[85vh] transition-all duration-300">
                {/* Header: Search and Close */}
                <div className="flex items-center px-5 py-4 border-b border-mewar-crimson/20 bg-white dark:bg-mewar-basalt/60">
                    <Search className="w-5 h-5 text-royal-gold mr-3 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={isHi ? 'मंदिर, इतिहास, दर्शन या धर्मशाला खोजें...' : 'Search exhibitions, shrines, history, or stay...'}
                        className="w-full bg-transparent border-none outline-none text-exhibit-fg placeholder:text-exhibit-muted text-base md:text-lg font-sans"
                    />
                    <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-mono border border-royal-gold/30 text-royal-gold">
                            ESC
                        </span>
                        <button
                            onClick={closeCurator}
                            className="p-1 rounded-lg hover:bg-exhibit-elevated text-exhibit-muted hover:text-exhibit-fg transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Exhibition Controls Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-exhibit-border bg-exhibit-surface text-xs text-exhibit-muted">
                    {/* Theme Switcher */}
                    <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-xs uppercase tracking-wider text-mewar-crimson">{isHi ? 'प्रदर्शनी मोड:' : 'Theme:'}</span>
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-mewar-crimson/30 hover:border-mewar-crimson bg-white text-mewar-crimson font-sans font-semibold text-xs transition-all shadow-sm"
                        >
                            {theme === 'daylight' ? (
                                <>
                                    <Sun className="w-3.5 h-3.5 text-amber-600" />
                                    <span>{isHi ? 'दिन (Daylight)' : 'Daylight Sanctum'}</span>
                                </>
                            ) : (
                                <>
                                    <Moon className="w-3.5 h-3.5 text-amber-300" />
                                    <span>{isHi ? 'रात्रि (Nocturnal)' : 'Nocturnal Sanctum'}</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Language Switch */}
                    <div className="flex items-center gap-1 font-mono text-[11px]">
                        <Link
                            href={lang === 'en' ? '/hi' : '/en'}
                            className="px-2.5 py-1 rounded-full border border-exhibit-hairline hover:border-exhibit-gold text-exhibit-fg transition-colors"
                        >
                            {isHi ? 'Switch to English' : 'हिंदी में देखें'}
                        </Link>
                    </div>
                </div>

                {/* Results List */}
                <div className="overflow-y-auto p-4 space-y-2 flex-grow">
                    <div className="px-2 pb-1 text-[11px] font-editorial-meta text-exhibit-muted">
                        {isHi ? 'प्रमुख अनुभाग एवं सुविधाएं' : 'CURATED EXHIBITIONS & PILGRIM SERVICES'}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-12 text-exhibit-muted">
                            <p className="text-sm font-sans">{isHi ? 'कोई परिणाम नहीं मिला' : 'No matching exhibitions found'}</p>
                            <p className="text-xs mt-1 text-exhibit-muted/70">
                                {isHi ? 'कृपया "इतिहास", "मंदिर" या "धर्मशाला" खोजें' : 'Try searching for "History", "Shrines", "Stay", or "Map"'}
                            </p>
                        </div>
                    ) : (
                        filtered.map(entry => {
                            const IconComponent = entry.icon;
                            return (
                                <button
                                    key={entry.id}
                                    onClick={() => handleSelect(entry.href)}
                                    className="w-full text-left flex items-start gap-3.5 p-3 rounded-xl hover:bg-exhibit-elevated border border-transparent hover:border-exhibit-border transition-all group"
                                >
                                    <div className="p-2.5 rounded-lg bg-exhibit-elevated group-hover:bg-exhibit-gold/15 text-exhibit-muted group-hover:text-exhibit-gold transition-colors flex-shrink-0 mt-0.5">
                                        <IconComponent className="w-4 h-4" />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-center gap-2">
                                            {entry.chapterNumber && (
                                                <span className="font-mono text-[11px] font-bold text-exhibit-gold px-1.5 py-0.5 rounded bg-exhibit-gold/10">
                                                    CH {entry.chapterNumber}
                                                </span>
                                            )}
                                            <span className="text-xs font-editorial-meta text-exhibit-muted">
                                                {isHi ? entry.categoryHi : entry.categoryEn}
                                            </span>
                                        </div>
                                        <h4 className="font-cinzel font-bold text-exhibit-fg text-sm mt-0.5 truncate group-hover:text-royal-gold transition-colors">
                                            {isHi ? entry.titleHi : entry.titleEn}
                                        </h4>
                                        <p className="text-xs text-exhibit-muted mt-0.5 line-clamp-1">
                                            {isHi ? entry.descHi : entry.descEn}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-exhibit-muted/40 group-hover:text-exhibit-gold group-hover:translate-x-0.5 transition-all self-center flex-shrink-0" />
                                </button>
                            );
                        })
                    )}
                </div>

                {/* Footer with Chittorgarh Live Status */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-exhibit-border bg-exhibit-elevated/60 text-xs text-exhibit-muted">
                    <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-sans">
                            {isHi ? 'चित्तौड़गढ़ दुर्ग • गर्भगृह दर्शन चालू है' : 'Chittorgarh Fort • Sanctum Open'}
                        </span>
                    </div>
                    <div className="font-mono text-[11px]">
                        {currentTime ? `IST ${currentTime}` : 'Chittorgarh, India'}
                    </div>
                </div>
            </div>
        </div>
    );
}
