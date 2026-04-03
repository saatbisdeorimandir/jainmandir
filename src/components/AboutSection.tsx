'use client';

import { getTrans, assetPath } from '@/lib/utils';
import PhotoCard from '@/components/PhotoCard';
import { useState, useEffect, useRef } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useInView } from '@/hooks/useInView';

interface AboutSectionProps {
    dict: any;
}

// --- Stat badge component ---
function StatBadge({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
    const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
    return (
        <div
            ref={ref}
            className={`text-center reveal ${isInView ? 'in-view' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-white/60 uppercase tracking-[0.18em] font-medium">{label}</div>
        </div>
    );
}

// --- Principal text block ---
function PrincipleTag({ text, icon }: { text: string; icon: string }) {
    return (
        <span className="inline-flex items-center gap-2 bg-jain-orange/10 border border-jain-orange/20 text-jain-orange text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
            <span>{icon}</span> {text}
        </span>
    );
}

export default function AboutSection({ dict }: AboutSectionProps) {
    const title = getTrans(dict, 'sections.about.title');
    const desc = getTrans(dict, 'sections.about.desc');
    const quote = getTrans(dict, 'about_page.quote');
    const locLabel = getTrans(dict, 'about_page.location_label');
    const locValue = getTrans(dict, 'about_page.location_value');
    const herTag = getTrans(dict, 'about_page.heritage_tag');
    const herValue = getTrans(dict, 'about_page.heritage_value');
    const historySection = dict?.about_page?.history_section as any;
    const historyTitle = historySection?.title || '';
    const historySubtitle = historySection?.subtitle || '';
    const historyCards = historySection?.cards || [];

    const descArr: string[] = Array.isArray(desc) ? desc : [desc];

    const unescoBadge = getTrans(dict, 'about_page.unesco_badge');
    const stats = dict?.about_page?.stats || {};
    const videoSec = dict?.about_page?.video_section || {};
    const philosophySec = dict?.about_page?.philosophy_section || {};
    const principlesDict = philosophySec.principles || {};

    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Section refs for animated reveals
    const { ref: heroTextRef, isInView: heroTextVisible } = useInView<HTMLDivElement>({ threshold: 0.15 });
    const { ref: statsRef, isInView: statsVisible } = useInView<HTMLDivElement>({ threshold: 0.2 });
    const { ref: splitRef, isInView: splitVisible } = useInView<HTMLDivElement>({ threshold: 0.1 });
    const { ref: principlesRef, isInView: principlesVisible } = useInView<HTMLDivElement>({ threshold: 0.15 });

    return (
        <div id="about" className="bg-white overflow-hidden">

            {/* ═══════════════════════════════════════════
                SECTION 1 — CINEMATIC HERO
            ═══════════════════════════════════════════ */}
            <section className="relative min-h-[75vh] flex items-end overflow-hidden">
                {/* Background image with parallax */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={assetPath("/assets/images/about/SathisDeori-Temple.jpg")}
                        alt="Saat Bees Deori Temple"
                        className="w-full h-full object-cover"
                        style={{
                            transform: `scale(1.08) translateY(${mounted ? scrollY * 0.25 : 0}px)`,
                            willChange: 'transform',
                        }}
                    />
                    {/* Rich gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-800/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-transparent to-transparent" />
                </div>

                {/* Floating orbs */}
                {mounted && (
                    <>
                        <div className="orb w-64 h-64 bg-jain-orange top-16 -right-20" style={{ animationDuration: '8s' }} />
                        <div className="orb w-48 h-48 bg-amber-400 -top-12 left-1/3" style={{ animationDelay: '2s', animationDuration: '11s' }} />
                    </>
                )}

                {/* Hero text content */}
                <div
                    ref={heroTextRef}
                    className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-20"
                >
                    {/* Badge */}
                    <div className={`mb-5 reveal ${heroTextVisible ? 'in-view' : ''}`}>
                        <span className="inline-flex items-center gap-2 bg-jain-orange/20 backdrop-blur-sm border border-jain-orange/30 text-jain-orange text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-jain-orange animate-pulse inline-block" />
                            {unescoBadge}
                        </span>
                    </div>

                    {/* Main heading */}
                    <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-[1.05] tracking-tight max-w-3xl reveal ${heroTextVisible ? 'in-view' : ''}`}
                        style={{ transitionDelay: '120ms' }}>
                        {title}
                    </h1>

                    {/* Quote */}
                    <p className={`text-lg md:text-xl text-white/70 font-light italic max-w-2xl leading-relaxed border-l-4 border-jain-orange/50 pl-5 reveal ${heroTextVisible ? 'in-view' : ''}`}
                        style={{ transitionDelay: '240ms' }}>
                        "{quote}"
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                SECTION 2 — DARK STATS STRIP
            ═══════════════════════════════════════════ */}
            <div ref={statsRef} className="bg-stone-950 py-10 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
                    <StatBadge value={stats.century_value || "11th"} label={stats.century_label || "Century CE"} delay={0} />
                    <StatBadge value={stats.temples_value || "27"} label={stats.temples_label || "Temples"} delay={100} />
                    <StatBadge value={stats.unesco_value || "UNESCO"} label={stats.unesco_label || "World Heritage"} delay={200} />
                    <StatBadge value={stats.years_value || "900+"} label={stats.years_label || "Years of History"} delay={300} />
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                SECTION 3 — CINEMATIC VIDEO HIGHLIGHT
            ═══════════════════════════════════════════ */}
            <section className="bg-gradient-to-br from-stone-50 via-white to-amber-50/20 py-20 md:py-28">
                <div ref={splitRef} className="max-w-7xl mx-auto px-6 md:px-12">
                    {/* Centered Text Content */}
                    <div className={`text-center max-w-4xl mx-auto mb-16 reveal ${splitVisible ? 'in-view' : ''}`}>
                        <p className="text-jain-orange text-xs font-bold tracking-[0.25em] uppercase mb-4 flex items-center justify-center gap-2">
                            <span className="w-6 h-[2px] bg-jain-orange rounded-full inline-block" />
                            {videoSec.eyebrow || "Our Heritage"}
                            <span className="w-6 h-[2px] bg-jain-orange rounded-full inline-block" />
                        </p>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-stone-900 mb-8 leading-tight">
                            {videoSec.title || "A Sacred Journey Through"}<br />
                            <span className="text-gradient">{videoSec.subtitle || "Eleven Centuries"}</span>
                        </h2>

                        <div className="space-y-6 text-stone-600 font-light leading-relaxed text-lg md:text-xl max-w-3xl mx-auto">
                            {descArr.slice(0, 2).map((p, i) => (
                                <p key={i} className="text-justify md:text-center">{p}</p>
                            ))}
                        </div>

                        {/* Meta chips centered */}
                        <div className="mt-10 pt-8 border-t border-stone-100 flex flex-wrap justify-center gap-8 md:gap-12">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">{locLabel}</span>
                                <span className="text-stone-800 font-semibold text-base">{locValue}</span>
                            </div>
                            <div className="w-px bg-stone-200 h-10 hidden sm:block" />
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">{herTag}</span>
                                <span className="text-stone-800 font-semibold text-base">{herValue}</span>
                            </div>
                        </div>
                    </div>

                    {/* Immersive Video Player */}
                    <div className={`relative group rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-stone-950 aspect-video md:aspect-[21/9] reveal-scale ${splitVisible ? 'in-view' : ''}`}
                        style={{ transitionDelay: '300ms' }}>
                        {isVideoLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-stone-900 z-10 transition-opacity duration-500">
                                <LoadingSpinner />
                            </div>
                        )}
                        <video
                            src={assetPath("/assets/images/about/mandir_video.mp4")}
                            poster={assetPath("/assets/images/about/SathisDeori-Temple.jpg")}
                            autoPlay muted loop playsInline
                            onLoadedData={() => setIsVideoLoading(false)}
                            className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-[1.02] ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
                        />
                        
                        {/* Dramatic Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/20 pointer-events-none" />
                        
                        {/* Floating Status Badge */}
                        <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-2">
                            <span className="flex h-2.5 w-2.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jain-orange opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-jain-orange"></span>
                            </span>
                            {videoSec.live_badge || "LIVE TEMPLE ATMOSPHERE"}
                        </div>

                        {/* Interactive Play/Sound Hint (Optional visual cue) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                             <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                                <svg className="w-8 h-8 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                SECTION 4 — DARK IMMERSIVE QUOTE BAND
            ═══════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 overflow-hidden bg-stone-950">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src={assetPath("/assets/images/about/history-architecture.jpg")}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-stone-950/70" />
                </div>
                {/* Glowing orb accent */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-jain-orange/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <div className="w-12 h-[2px] bg-jain-orange mx-auto mb-8" />
                    <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-white/90 leading-relaxed italic">
                        "{descArr[2] || quote}"
                    </p>
                    <div className="w-12 h-[2px] bg-jain-orange mx-auto mt-8" />
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                SECTION 5 — PRINCIPLES (AHIMSA, ETC.)
            ═══════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-white to-stone-50">
                <div ref={principlesRef} className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Text side */}
                        <div className={`space-y-6 reveal-left ${principlesVisible ? 'in-view' : ''}`}>
                            <p className="text-jain-orange text-xs font-bold tracking-[0.25em] uppercase flex items-center gap-2">
                                <span className="w-6 h-[2px] bg-jain-orange rounded-full" />
                                {philosophySec.eyebrow || "Jain Philosophy"}
                            </p>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-stone-900 leading-tight">
                                {philosophySec.title || "Principles That"}<br />
                                {philosophySec.subtitle || "Guide the Faithful"}
                            </h2>
                            <div className="space-y-4 text-stone-600 font-light leading-relaxed text-sm md:text-base">
                                {descArr.slice(3).map((p, i) => (
                                    <p key={i} className="text-justify">{p}</p>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-3 pt-2">
                                <PrincipleTag icon="🕊️" text={principlesDict.ahimsa || "Ahimsa"} />
                                <PrincipleTag icon="✨" text={principlesDict.saatya || "Saatya"} />
                                <PrincipleTag icon="🌿" text={principlesDict.vairagya || "Vairagya"} />
                            </div>
                        </div>

                        {/* Image side — masonry style */}
                        <div className={`grid grid-cols-2 gap-4 reveal-right ${principlesVisible ? 'in-view' : ''}`}
                            style={{ transitionDelay: '120ms' }}>
                            <div className="space-y-4">
                                <div className="group overflow-hidden rounded-2xl shadow-lg aspect-[3/4]">
                                    <img
                                        src={assetPath("/assets/images/about/history-pillars.jpg")}
                                        alt="Ornate Pillars"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="group overflow-hidden rounded-2xl shadow-lg aspect-square">
                                    <img
                                        src={assetPath("/assets/images/about/history-ceiling.jpg")}
                                        alt="Celestial Ceilings"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-8">
                                <div className="group overflow-hidden rounded-2xl shadow-lg aspect-square">
                                    <img
                                        src={assetPath("/assets/images/about/history-ancient.jpg")}
                                        alt="Ancient Origins"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="group overflow-hidden rounded-2xl shadow-lg aspect-[3/4]">
                                    <img
                                        src={assetPath("/assets/images/about/history-sanctum.jpg")}
                                        alt="Divine Sanctum"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                SECTION 6 — HISTORY PHOTO CARDS GRID
            ═══════════════════════════════════════════ */}
            {historyCards.length > 0 && (
                <section className="bg-gradient-to-b from-stone-50 via-white to-stone-50 py-16 md:py-24 lg:py-28">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
                        <div className="text-center mb-14 md:mb-18">
                            <p className="text-jain-orange text-xs font-bold tracking-[0.25em] uppercase mb-3 flex items-center justify-center gap-2">
                                <span className="w-6 h-[1px] bg-jain-orange" />
                                {historySubtitle}
                                <span className="w-6 h-[1px] bg-jain-orange" />
                            </p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-stone-gray mb-4">
                                {historyTitle}
                            </h2>
                            <div className="w-20 h-1.5 bg-gradient-to-r from-jain-orange to-jain-red mx-auto rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {historyCards.map((card: any, index: number) => (
                                <PhotoCard
                                    key={index}
                                    image={card.image}
                                    title={card.title}
                                    period={card.period}
                                    description={card.description}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
