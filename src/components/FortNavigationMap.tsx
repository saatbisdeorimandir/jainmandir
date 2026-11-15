'use client';

import React, { useState } from 'react';
import {
    MapPin,
    Navigation,
    Car,
    Compass,
    CheckCircle2,
    Clock,
    Shield,
    Info,
    ExternalLink,
    ChevronRight,
    ParkingCircle
} from 'lucide-react';

interface FortNavigationMapProps {
    lang: string;
    mapEmbedUrl?: string;
    directionsUrl?: string;
}

interface Checkpoint {
    id: string;
    stepNumber: string;
    nameEn: string;
    nameHi: string;
    descEn: string;
    descHi: string;
    type: 'gate' | 'parking' | 'sanctuary' | 'stay';
    highlight?: boolean;
}

const checkpoints: Checkpoint[] = [
    {
        id: 'padan-pol',
        stepNumber: '01',
        nameEn: 'Padan Pol & Bhairon Pol',
        nameHi: 'पाडन पोल एवं भैरव पोल',
        descEn: 'Lower gates of Chittorgarh Fort. Entry checkpoint for four-wheelers and buses.',
        descHi: 'चित्तौड़ दुर्ग का प्रथम मुख्य द्वार। चार पहिया वाहनों एवं बसों का प्रवेश बिंदु।',
        type: 'gate',
    },
    {
        id: 'ram-pol',
        stepNumber: '02',
        nameEn: 'Ram Pol (Main Entry Gate)',
        nameHi: 'राम पोल (मुख्य दुर्ग द्वार)',
        descEn: 'Seventh and grandest historical gate entering the main Chittorgarh Fort plateau.',
        descHi: 'सातवां एवं सबसे विशाल ऐतिहासिक द्वार जहाँ से मुख्य दुर्ग पठार प्रारंभ होता है।',
        type: 'gate',
    },
    {
        id: 'parking',
        stepNumber: '03',
        nameEn: 'Designated Pilgrim Parking',
        nameHi: 'तीर्थयात्री वाहन पार्किंग',
        descEn: 'Spacious dedicated parking near Fateh Prakash Palace, only 150m from Saat Bees Deori.',
        descHi: 'फतेह प्रकाश महल के समीप सुरक्षित पार्किंग स्थल, सात बीस देवरी से मात्र 150 मीटर।',
        type: 'parking',
        highlight: true,
    },
    {
        id: 'temple-sanctum',
        stepNumber: '04',
        nameEn: 'Shri Saat Bees Deori Temple',
        nameHi: 'श्री सात बीस देवरी जैन मंदिर',
        descEn: 'Ancient 11th-century complex of 27 shrines and the central Moolnayak Adinath sanctum.',
        descHi: '11वीं शताब्दी का 27 जिनालयों का भव्य परिसर एवं मूलनायक आदिनाथ प्रभु गर्भगृह।',
        type: 'sanctuary',
        highlight: true,
    },
    {
        id: 'dharamshala',
        stepNumber: '05',
        nameEn: 'Dharamshala & Bhojanshala Desk',
        nameHi: 'धर्मशाला आवास एवं भोजनशाला कार्यालय',
        descEn: 'Sanctuary guest house check-in desk, pure satvik Jain meals, and visitor assistance.',
        descHi: 'यात्री विश्राम गृह पंजीयन, शुद्ध सात्विक भोजनशाला एवं दर्शनार्थी सेवा केंद्र।',
        type: 'stay',
    },
];

export default function FortNavigationMap({
    lang,
    mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3637.2809628205244!2d74.64415847605917!3d24.88147897791484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968a049755b3879%3A0xe54955f058097bfa!2sSaat%20Bees%20Deori%20Temple!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
    directionsUrl = 'https://maps.google.com/?q=Saat+Bees+Deori+Temple+Chittorgarh+Fort',
}: FortNavigationMapProps) {
    const [viewMode, setViewMode] = useState<'schematic' | 'satellite'>('schematic');
    const [activeCheckpoint, setActiveCheckpoint] = useState<string>('temple-sanctum');

    const isHi = lang === 'hi';

    return (
        <section
            id="map"
            className="py-16 md:py-24 bg-exhibit-bg text-exhibit-fg border-t border-exhibit-hairline transition-colors duration-500"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="badge-royal mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold animate-pulse" />
                            <span className="font-cinzel text-xs tracking-widest">
                                {isHi ? 'मार्गदर्शिका एवं पहुंच' : 'FORT ACCESS & PILGRIM NAVIGATION'}
                            </span>
                        </div>
                        <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-exhibit-fg tracking-wide">
                            {isHi ? 'किला मार्ग एवं सुगम दर्शन' : 'FORT ROUTE & ACCESS MAP'}
                        </h2>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2 p-1.5 rounded-full bg-white dark:bg-mewar-basalt border-2 border-mewar-crimson/25 shadow-sm">
                        <button
                            onClick={() => setViewMode('schematic')}
                            className={`px-4 py-2 rounded-full text-xs font-sans font-bold tracking-wider transition-all ${
                                viewMode === 'schematic'
                                    ? 'bg-mewar-crimson text-white shadow-md'
                                    : 'text-mewar-crimson/80 hover:text-mewar-crimson hover:bg-mewar-crimson/5'
                            }`}
                        >
                            {isHi ? 'अभिलेखागार मार्ग' : 'Fort Waypoints'}
                        </button>
                        <button
                            onClick={() => setViewMode('satellite')}
                            className={`px-4 py-2 rounded-full text-xs font-sans font-bold tracking-wider transition-all ${
                                viewMode === 'satellite'
                                    ? 'bg-mewar-crimson text-white shadow-md'
                                    : 'text-mewar-crimson/80 hover:text-mewar-crimson hover:bg-mewar-crimson/5'
                            }`}
                        >
                            {isHi ? 'गूगल मानचित्र (GPS)' : 'Satellite GPS'}
                        </button>
                    </div>
                </div>

                {/* Main Interactive Map Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Interactive Visual Display (7 cols) */}
                    <div className="lg:col-span-7 bg-exhibit-surface border border-exhibit-hairline rounded-3xl overflow-hidden shadow-2xl">
                        {viewMode === 'satellite' ? (
                            <div className="relative w-full h-[520px] bg-stone-900">
                                <iframe
                                    src={mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Location of Saat Bees Deori"
                                />
                            </div>
                        ) : (
                            <div className="p-6 md:p-8 flex flex-col justify-between min-h-[520px] bg-gradient-to-br from-exhibit-surface via-exhibit-elevated/30 to-exhibit-surface">
                                {/* Schematic Header */}
                                <div className="flex items-center justify-between pb-6 border-b border-exhibit-hairline">
                                    <div className="flex items-center gap-2.5">
                                        <Compass className="w-5 h-5 text-exhibit-gold" />
                                        <span className="font-editorial-meta text-xs tracking-widest text-exhibit-fg">
                                            {isHi ? 'चित्तौड़गढ़ दुर्ग मार्गदर्शिका' : 'CHITTORGARH FORT ROUTING'}
                                        </span>
                                    </div>
                                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-exhibit-gold/15 text-exhibit-gold border border-exhibit-gold/30">
                                        508m Elev.
                                    </span>
                                </div>

                                {/* Schematic Waypoints Flow */}
                                <div className="py-8 space-y-4">
                                    {checkpoints.map(cp => {
                                        const isSelected = activeCheckpoint === cp.id;
                                        return (
                                            <div
                                                key={cp.id}
                                                onClick={() => setActiveCheckpoint(cp.id)}
                                                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                                                    isSelected
                                                        ? 'bg-exhibit-elevated border-exhibit-gold shadow-md'
                                                        : 'border-exhibit-hairline hover:border-exhibit-gold/40 bg-exhibit-surface/60'
                                                }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                                                            isSelected
                                                                ? 'bg-exhibit-gold text-stone-900'
                                                                : 'bg-exhibit-elevated text-exhibit-muted'
                                                        }`}
                                                    >
                                                        {cp.stepNumber}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-sans font-bold text-sm md:text-base text-exhibit-fg">
                                                            {isHi ? cp.nameHi : cp.nameEn}
                                                        </h4>
                                                        <p className="text-xs text-exhibit-muted font-sans line-clamp-1">
                                                            {isHi ? cp.descHi : cp.descEn}
                                                        </p>
                                                    </div>
                                                </div>

                                                {cp.highlight && (
                                                    <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                                        {isHi ? 'महत्वपूर्ण' : 'Key Point'}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Bottom Quick Metric Bar */}
                                <div className="pt-6 border-t border-exhibit-hairline flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-exhibit-muted">
                                    <div className="flex items-center gap-2">
                                        <Car className="w-4 h-4 text-exhibit-gold" />
                                        <span>{isHi ? 'रेलवे स्टेशन से 6 किमी' : '6 km from Chittorgarh Station'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ParkingCircle className="w-4 h-4 text-emerald-500" />
                                        <span>{isHi ? 'मंदिर के पास निःशुल्क पार्किंग' : 'Free Parking Available'}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Direction Cards & Pilgrim Instructions (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Selected Checkpoint Highlight Card */}
                        {(() => {
                            const current = checkpoints.find(c => c.id === activeCheckpoint) || checkpoints[3];
                            return (
                                <div className="p-6 md:p-8 rounded-3xl bg-exhibit-surface border border-exhibit-hairline shadow-xl">
                                    <div className="flex items-center gap-2 text-xs font-mono text-exhibit-gold font-bold mb-2">
                                        <span>POINT {current.stepNumber}</span>
                                        <span>•</span>
                                        <span>{isHi ? 'स्थान विवरण' : 'LOCATION DETAILS'}</span>
                                    </div>
                                    <h3 className="font-sans font-bold text-xl md:text-2xl text-exhibit-fg mb-3">
                                        {isHi ? current.nameHi : current.nameEn}
                                    </h3>
                                    <p className="font-sans text-sm text-exhibit-muted leading-relaxed mb-6">
                                        {isHi ? current.descHi : current.descEn}
                                    </p>

                                    <a
                                        href={directionsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-mewar-crimson via-mewar-crimson-deep to-[#B8860B] text-white font-sans font-bold text-xs tracking-wider uppercase hover:shadow-lg hover:shadow-mewar-crimson/25 transition-all shadow-md group border border-mewar-brass/50"
                                    >
                                        <Navigation className="w-4 h-4 text-mewar-brass-light group-hover:translate-x-0.5 transition-transform" />
                                        <span>{isHi ? 'गूगल मैप्स नेविगेशन प्रारंभ करें' : 'Start Turn-by-Turn GPS'}</span>
                                        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                                    </a>
                                </div>
                            );
                        })()}

                        {/* Practical Fort Transit Guidelines */}
                        <div className="p-6 md:p-8 rounded-3xl bg-exhibit-elevated/50 border border-exhibit-hairline space-y-4">
                            <h4 className="font-editorial-meta text-xs text-exhibit-muted tracking-[0.2em]">
                                {isHi ? 'यात्रियों के लिए आवश्यक निर्देश' : 'PILGRIM TRANSIT ADVISORY'}
                            </h4>
                            <div className="space-y-3 text-xs md:text-sm text-exhibit-muted font-sans leading-relaxed">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span>
                                        {isHi
                                            ? 'कार एवं बसें राम पोल से होते हुए सीधे सात बीस देवरी के निकट पार्किंग तक जा सकती हैं।'
                                            : 'Private cars and buses can drive up through Ram Pol directly to the parking area near Saat Bees Deori.'}
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span>
                                        {isHi
                                            ? 'वरिष्ठ नागरिकों हेतु मंदिर परिसर के द्वार तक वाहन ले जाने की विशेष अनुमति उपलब्ध है।'
                                            : 'Senior citizens can be dropped directly at the temple entrance gate before parking.'}
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span>
                                        {isHi
                                            ? 'धर्मशाला में आवास हेतु आगमन से पूर्व अग्रिम सूचना देना सुविधाजनक रहेगा।'
                                            : 'Advance intimation is recommended for Dharamshala room booking during festivals and holidays.'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
