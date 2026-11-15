'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetPath } from '@/lib/utils';
import {
    Landmark,
    Compass,
    BookOpen,
    ArrowRight,
    ArrowLeft,
    ChevronRight,
    ExternalLink,
    Eye,
    X,
    Maximize2
} from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface MultiChapterExhibitionProps {
    lang: string;
}

interface TimelineItem {
    year: string;
    titleEn: string;
    titleHi: string;
    descEn: string;
    descHi: string;
}

interface ChapterPlate {
    tagEn: string;
    tagHi: string;
    image: string;
    captionEn: string;
    captionHi: string;
}

interface ChapterData {
    number: string;
    periodEn: string;
    periodHi: string;
    titleEn: string;
    titleHi: string;
    subtitleEn: string;
    subtitleHi: string;
    narrativeEn: string;
    narrativeHi: string;
    quoteEn: string;
    quoteHi: string;
    quoteAuthorEn: string;
    quoteAuthorHi: string;
    plates: ChapterPlate[];
    milestones: TimelineItem[];
    accentColor: string;
}

const chapters: ChapterData[] = [
    {
        number: '01',
        periodEn: '300 BC — 972 AD // FOUNDATIONAL HERITAGE',
        periodHi: '300 ई.पू. — 972 ईस्वी // प्राचीन नींव और पावन इतिहास',
        titleEn: 'The Sacred Roots of Chitrakoot Tirth',
        titleHi: 'चित्रकूट महातीर्थ का उद्गम और पावन इतिहास',
        subtitleEn: 'Ancient Fort Heritage, Emperor Samprati, and the 5 Sacred Fort Temples',
        subtitleHi: 'सम्राट संप्रति का युग, प्राचीन नगरी और दुर्ग के 5 प्रमुख जिनालय',
        narrativeEn:
            'Long before Chittorgarh became famous for its heroic fortresses, this high rocky plateau was known as Chitrakoot—a serene oasis of peace and meditation. During the reign of Emperor Samprati (grandson of Emperor Ashoka), the nearby ancient city of Madhyamika (Nagari) became a thriving center of Jain spirituality. By 972 AD, revered Jain saint Acharya Yashobhadra Suri guided the auspicious consecration of five magnificent Jain temples atop the fort hill, laying the eternal spiritual foundation of this sacred tirth.',
        narrativeHi:
            'वीरता और गौरव के इतिहास से भी पहले, चित्तौड़गढ़ का यह विशाल दुर्ग ‘चित्रकूट महातीर्थ’ के रूप में ध्यान और अहिंसा का पावन केंद्र रहा है। मौर्य सम्राट अशोक के पौत्र धर्मप्रेमी सम्राट संप्रति के समय से ही इस क्षेत्र में जैन धर्म का व्यापक प्रभाव रहा। 972 ईस्वी में पूज्य आचार्य यशोभद्र सूरि के पावन सानिध्य में चित्तौड़गढ़ दुर्ग पर 5 प्रमुख जिनालयों (पंचतीर्थ) की भव्य प्रतिष्ठा हुई, जिससे इस दुर्ग की आध्यात्मिक पहचान अमर हो गई।',
        quoteEn:
            '“On this sanctified plateau, truth and non-violence were carved not merely onto parchment, but directly into the eternal granite of Chittorgarh.”',
        quoteHi:
            '“इस पावन धरा पर अहिंसा, सत्य और करुणा के संदेश केवल ग्रंथों में नहीं, बल्कि चित्तौड़गढ़ के अमर पत्थरों पर हमेशा के लिए तराशे गए हैं।”',
        quoteAuthorEn: '— Ancient Inscriptions of Chitrakoot Fort',
        quoteAuthorHi: '— चित्तौड़ दुर्ग के प्राचीन ऐतिहासिक शिलालेख',
        accentColor: '#C59B27',
        plates: [
            {
                tagEn: 'HISTORIC FOUNDATION',
                tagHi: 'प्राचीन आधारशिला',
                image: '/assets/images/about/history-ancient.jpg',
                captionEn: '11th-century carved sandstone base bearing ancient Devanagari inscriptions of royal patrons.',
                captionHi: '11वीं शताब्दी की प्राचीन पाषाण वेदी और देवनागरी में लिखे ऐतिहासिक शिलालेख।',
            },
            {
                tagEn: 'MAJESTIC SPIRES',
                tagHi: 'भव्य मंदिर शिखर',
                image: '/assets/images/about/history-architecture.jpg',
                captionEn: 'The sacred temple spires rising gracefully above the stone ramparts of the fort.',
                captionHi: 'चित्तौड़गढ़ दुर्ग की ऊँचाई पर स्थापित मंदिर का नयनाभिराम शिखर स्थापत्य।',
            },
        ],
        milestones: [
            {
                year: '300 ई.पू. / 300 BC',
                titleEn: 'Emperor Samprati Era',
                titleHi: 'सम्राट संप्रति का पावन युग',
                descEn: 'Ancient Nagari (Madhyamika) blossoms as a major center for Jain culture and pilgrimage.',
                descHi: 'प्राचीन नगरी (माध्यमिका) जैन संस्कृति, धर्म और तीर्थयात्रा का प्रमुख केंद्र बनी।',
            },
            {
                year: '947 ईस्वी / 947 AD',
                titleEn: 'Golden Merchant Era',
                titleHi: 'व्यापारिक समृद्धि व मंदिर निर्माण',
                descEn: 'Devout merchant Simandar Shah and patrons build splendid sanctuaries on the hill.',
                descHi: 'श्रेष्ठी सीमंदर शाह और दानवीरों के सहयोग से दुर्ग पर सुंदर जिनालयों का निर्माण हुआ।',
            },
            {
                year: '972 ईस्वी / 972 AD',
                titleEn: 'The 5 Fort Temples Consecrated',
                titleHi: 'पंचतीर्थ की ऐतिहासिक प्रतिष्ठा',
                descEn: 'Acharya Yashobhadra Suri leads the landmark consecration of Chittorgarh’s 5 tirths.',
                descHi: 'पूज्य आचार्य यशोभद्र सूरि के मार्गदर्शन में दुर्ग के 5 प्रसिद्ध जिनालयों की प्रतिष्ठा सम्पन्न हुई।',
            },
        ],
    },
    {
        number: '02',
        periodEn: '11TH — 15TH CENTURY // THE 27 SHRINES',
        periodHi: '11वीं — 15वीं शताब्दी // 27 जिनालयों का अद्भुत वैभव',
        titleEn: 'Saat Bees Deori: The Wonder of 27 Shrines',
        titleHi: 'सात बीस देवरी: 27 पवित्र मंदिरों की अद्भुत रचना',
        subtitleEn: 'The Sacred Formula: 7 + 20 = 27 Shrines (26 Corridor Shrines + 1 Central Sanctum)',
        subtitleHi: 'अनूठी बनावट: 7 + 20 = 27 मंदिर (26 परिक्रमा मंदिर और 1 विशाल मुख्य गर्भगृह)',
        narrativeEn:
            'The name ‘Saat Bees Deori’ translates directly to Seven (7) + Twenty (20) = 27 Shrines. At the heart of the complex rises the magnificent central sanctum of Lord Adinath (Bhagwan Rishabhdev), the first Jain Tirthankara. Surrounding this central shrine like a protective garland is a sunlit marble courtyard lined with twenty-six individual shrines (Devkulikas). Every pillar, archway, and domed ceiling is a masterpiece of Maru-Gurjara art, featuring exquisitely carved lotus medallions, dancing celestial guardians, and harmonious sacred geometry.',
        narrativeHi:
            '‘सात बीस देवरी’ नाम इसकी अनूठी संरचना को दर्शाता है: 7 और 20 यानी कुल 27 मंदिर। परिसर के बीच में प्रथम तीर्थंकर भगवान आदिनाथ (ऋषभदेव जी) का भव्य मुख्य मंदिर स्थित है। इस मुख्य मंदिर के चारों ओर परिक्रमा मार्ग में 26 सुंदर छोटे मंदिर (देवकुलिकाएं) एक रक्षा-कवच और पुष्पमाला की तरह सजे हैं। मंदिर का हर खंभा, तोरण द्वार और छत पर तराशे गए संगमरमर के कमल के फूल भारतीय मूर्तिकला के बेजोड़ उदाहरण हैं।',
        quoteEn:
            '“Every chisel stroke in the marble ceiling is devotion turned to stone; a quiet geometry where peace feels tangible.”',
        quoteHi:
            '“मंदिर की छत पर संगमरमर का हर नक्काशीदार कमल कारीगरों की सच्ची भक्ति का प्रतीक है, जहाँ कदम रखते ही मन को असीम शांति मिलती है।”',
        quoteAuthorEn: '— Architectural Survey & Heritage Documentation',
        quoteAuthorHi: '— स्थापत्य समीक्षा एवं धरोहर अध्ययन',
        accentColor: '#D4AF37',
        plates: [
            {
                tagEn: 'CARVED MARBLE PILLARS',
                tagHi: 'नक्काशीदार संगमरमर के खंभे',
                image: '/assets/images/about/history-pillars.jpg',
                captionEn: 'Masterfully sculpted columns portraying celestial musicians and sacred floral motifs.',
                captionHi: 'संगमरमर के खंभों पर उकेरी गई सुंदर देव आकृतियाँ और नक्काशीदार लता-पत्ते।',
            },
            {
                tagEn: 'LOTUS CEILING MANDALAS',
                tagHi: 'नक्काशीदार कमल छत्र (छत)',
                image: '/assets/images/about/history-ceiling.jpg',
                captionEn: 'Concentric petals of blooming lotuses chiseled into the vaulted stone domes.',
                captionHi: 'मंदिर की गुंबदनुमा छत पर पत्थर में खिले हुए बहुस्तरीय कमल के फूलों की भव्य नक्काशी।',
            },
        ],
        milestones: [
            {
                year: '1175 ईस्वी / 1175 AD',
                titleEn: 'Shantinath Temple Built',
                titleHi: 'शांतिनाथ भगवान मंदिर निर्माण',
                descEn: 'A magnificent shrine dedicated to the 16th Tirthankara Shantinath is built near Ratneshwar Lake.',
                descHi: 'रत्नेश्वर तालाब के पास 16वें तीर्थंकर भगवान शांतिनाथ जी का कलात्मक मंदिर बनाया गया।',
            },
            {
                year: '1448 ईस्वी / 1448 AD',
                titleEn: 'Parshwanath Temple Addition',
                titleHi: 'भगवान पाश्र्वनाथ मंदिर का निर्माण',
                descEn: 'Patron Bhandari Vela erects the stunning northern shrine dedicated to Lord Parshwanath.',
                descHi: 'भंडारी श्रेष्ठी वेला द्वारा उत्तर दिशा में भगवान पाश्र्वनाथ जी का कलात्मक मंदिर बनवाया गया।',
            },
        ],
    },
    {
        number: '03',
        periodEn: '1530 AD — PRESENT // LIVING FAITH & PILGRIM HOSPITALITY',
        periodHi: '1530 ईस्वी — वर्तमान // जीवंत भक्ति और तीर्थयात्री सेवा',
        titleEn: 'Living Sanctuary & Modern Pilgrim Welcome',
        titleHi: 'जीवंत आस्था: दैनिक पूजा, शांति और तीर्थयात्री सुविधा',
        subtitleEn: 'The Devotion of Karmashah Doshi, Daily Aarti, and Trust Dharamshala',
        subtitleHi: 'दानवीर कर्माशाह दोशी का जीर्णोद्धार, नियमित आरती और आधुनिक धर्मशाला व्यवस्था',
        narrativeEn:
            'In 1530 AD, noble minister Karmashah Doshi led extensive restorations of the fort temples, ensuring their survival for generations to come. Today, Shri Saat Bees Deori Temple is not merely a monument of the past, but an active, vibrant center of daily faith. The air fills with the soothing bells of morning and evening Aarti, pilgrims meditate in the quiet courtyards, and the Temple Trust welcomes visitors from all over the world with comfortable Dharamshala lodging and pure, hygienic Jain Bhojanshala meals.',
        narrativeHi:
            '1530 ईस्वी में चित्तौड़गढ़ के दानवीर मंत्री कर्माशाह दोशी ने दुर्ग के जिनालयों का भव्य जीर्णोद्धार करवाकर इस धरोहर को नया जीवन दिया। आज सात बीस देवरी केवल देखने योग्य ऐतिहासिक स्थल नहीं, बल्कि एक जाग्रत और शांत तीर्थ है। यहाँ प्रतिदिन प्रातः और संध्या समय मंगल आरती होती है। देश-विदेश से आने वाले यात्रियों की सुविधा के लिए मंदिर ट्रस्ट द्वारा स्वच्छ धर्मशाला और सात्विक भोजनशाला की उत्तम व्यवस्था निरंतर उपलब्ध है।',
        quoteEn:
            '“A thousand years later, the lamp of peace lit by our ancestors still glows brightly in the sanctum of Chittorgarh.”',
        quoteHi:
            '“एक हज़ार वर्ष पूर्व पूर्वजों द्वारा जलाई गई शांति और भक्ति की यह पावन ज्योति आज भी चित्तौड़गढ़ के गर्भगृह में निरंतर जल रही है।”',
        quoteAuthorEn: '— Shri Saat Bees Deori Temple Trust',
        quoteAuthorHi: '— श्री सात बीस देवरी जैन मंदिर ट्रस्ट',
        accentColor: '#B8860B',
        plates: [
            {
                tagEn: 'SACRED ADINATH SANCTUM',
                tagHi: 'भगवान आदिनाथ गर्भगृह',
                image: '/assets/images/about/history-sanctum.jpg',
                captionEn: 'The serene central idol of Bhagwan Adinath, inspiring peace, forgiveness, and reflection.',
                captionHi: 'मूलनायक भगवान आदिनाथ जी की शांत व ध्यानमग्न पद्मासन प्रतिमा के दिव्य दर्शन।',
            },
            {
                tagEn: 'INTRICATE CORRIDOR ALCOVES',
                tagHi: 'परिक्रमा के कलात्मक आले व झरोखे',
                image: '/assets/images/about/history-sculptures.jpg',
                captionEn: 'Detailed stone carvings and sacred niches lining the 26 outer shrines.',
                captionHi: '26 परिक्रमा मंदिरों के आलों में स्थापित मनमोहक तीर्थंकर प्रतिमाएं व नक्काशी।',
            },
        ],
        milestones: [
            {
                year: '1530 ईस्वी / 1530 AD',
                titleEn: 'Karmashah Doshi Restoration',
                titleHi: 'दानवीर कर्माशाह दोशी का युग',
                descEn: 'Minister Karmashah revitalizes the fort temples with massive repairs and gold-leaf endowments.',
                descHi: 'दानवीर कर्माशाह दोशी ने चित्तौड़गढ़ के जिनालयों का विशाल जीर्णोद्धार कराकर धर्म की प्रभावना बढ़ाई।',
            },
            {
                year: 'आज / Present Day',
                titleEn: 'Modern Pilgrim Care',
                titleHi: 'आधुनिक धर्मशाला व भोजनशाला',
                descEn: 'Comfortable guest rooms, pure vegetarian dining, and daily peaceful darshan for all visitors.',
                descHi: 'ट्रस्ट द्वारा संचालित स्वच्छ एसी/नॉन-एसी कमरे, सात्विक भोजन और दैनिक सुलभ दर्शन व्यवस्था।',
            },
        ],
    },
];

export default function MultiChapterExhibition({ lang }: MultiChapterExhibitionProps) {
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const [selectedPlate, setSelectedPlate] = useState<{ image: string; tag: string; caption: string } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const chapterContentRef = useRef<HTMLDivElement>(null);

    const isHi = lang === 'hi';
    const active = chapters[activeIdx];

    // Lock body scroll when plate is inspected full screen
    useEffect(() => {
        if (selectedPlate) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [selectedPlate]);

    // Keyboard ESC to close full screen plate view
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedPlate(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const switchChapter = (newIdx: number) => {
        if (newIdx === activeIdx || newIdx < 0 || newIdx >= chapters.length) return;

        if (chapterContentRef.current) {
            gsap.to(chapterContentRef.current, {
                opacity: 0,
                y: 12,
                duration: 0.25,
                ease: 'power2.in',
                onComplete: () => {
                    setActiveIdx(newIdx);
                    gsap.fromTo(
                        chapterContentRef.current,
                        { opacity: 0, y: -16 },
                        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
                    );
                },
            });
        } else {
            setActiveIdx(newIdx);
        }
    };

    return (
        <section
            id="exhibition-chapters"
            ref={containerRef}
            className="py-24 md:py-32 bg-exhibit-bg text-exhibit-fg transition-colors duration-500 border-t border-exhibit-hairline"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Exhibition Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-exhibit-hairline">
                    <div>
                        <div className="badge-royal mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-mewar-crimson animate-pulse" />
                            <span className="text-mewar-crimson font-sans font-bold">{isHi ? 'श्री सात बीस देवरी महाप्रदर्शनी' : 'ROYAL ARCHITECTURAL EXHIBITION'}</span>
                        </div>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-exhibit-fg tracking-wide">
                            {isHi ? 'तीन पावन ऐतिहासिक अध्याय' : 'The Three Sacred Chronicles'}
                        </h2>
                    </div>

                    <div className="max-w-md">
                        <div className="motif-divider mb-3">❖</div>
                        <p className="text-exhibit-muted text-sm md:text-base font-sans leading-relaxed">
                            {isHi
                                ? 'प्राचीन चित्रकूट महातीर्थ की नींव, 27 जिनालयों की अद्भुत संगमरमर रचना और वर्तमान जीवंत भक्ति का सुंदर परिचय।'
                                : 'A journey through a thousand years of faith, architectural wonder, and living sanctuary atop the Chittorgarh Fort plateau.'}
                        </p>
                    </div>
                </div>

                {/* Chapter Pagination Tabs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 my-10">
                    {chapters.map((ch, idx) => {
                        const isCurrent = idx === activeIdx;
                        return (
                            <button
                                key={ch.number}
                                onClick={() => switchChapter(idx)}
                                className={`text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                                    isCurrent
                                        ? 'bg-exhibit-surface border-mewar-crimson shadow-lg shadow-mewar-crimson/15 -translate-y-1'
                                        : 'bg-exhibit-surface/60 hover:bg-exhibit-surface border-exhibit-hairline hover:border-mewar-crimson/40'
                                }`}
                            >
                                {isCurrent && (
                                    <div
                                        className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-mewar-crimson via-mewar-brass to-mewar-crimson"
                                    />
                                )}
                                <div className="flex items-center justify-between mb-2">
                                    <span
                                        className={`font-sans text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                            isCurrent
                                                ? 'bg-mewar-crimson/15 text-mewar-crimson border border-mewar-crimson/30'
                                                : 'bg-exhibit-elevated text-exhibit-muted group-hover:text-exhibit-fg'
                                        }`}
                                    >
                                        CH {ch.number}
                                    </span>
                                    <span className="text-[10px] font-sans font-bold text-exhibit-muted tracking-widest uppercase">
                                        {isHi ? (idx === 0 ? 'पावन नींव' : idx === 1 ? '27 मंदिर' : 'जीवंत आस्था') : (idx === 0 ? 'GENESIS' : idx === 1 ? '27 SHRINES' : 'LIVING FAITH')}
                                    </span>
                                </div>
                                <h3 className={`font-heading font-semibold text-base md:text-lg transition-colors ${
                                    isCurrent ? 'text-mewar-crimson font-bold' : 'text-exhibit-fg group-hover:text-mewar-crimson'
                                }`}>
                                    {isHi ? ch.titleHi : ch.titleEn}
                                </h3>
                                <div className="mt-2 text-[11px] font-sans text-exhibit-muted/80 truncate">
                                    {isHi ? ch.periodHi : ch.periodEn}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Active Chapter Content Container */}
                <div
                    ref={chapterContentRef}
                    className="bento-card-royal p-6 md:p-12 transition-all duration-300"
                >
                    {/* Chapter Header Banner */}
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-10 border-b border-exhibit-hairline">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm text-mewar-crimson font-bold tracking-widest uppercase mb-3">
                                <span>❖</span>
                                <span>{isHi ? active.periodHi : active.periodEn}</span>
                            </div>
                            <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-mewar-crimson tracking-wide mb-3">
                                {isHi ? active.titleHi : active.titleEn}
                            </h3>
                            <p className={`text-base sm:text-xl font-medium mb-5 text-mewar-brass ${isHi ? 'font-mukta' : 'font-heading italic'}`}>
                                {isHi ? active.subtitleHi : active.subtitleEn}
                            </p>
                            <p className={`text-base sm:text-lg text-exhibit-fg leading-relaxed font-normal ${isHi ? 'font-mukta' : 'font-sans'}`}>
                                {isHi ? active.narrativeHi : active.narrativeEn}
                            </p>
                        </div>

                        {/* Historical Epigraphic Quote Callout */}
                        <div className="lg:w-80 p-6 md:p-7 rounded-2xl bg-white dark:bg-[#1E1210] border-l-4 border-mewar-crimson border-y border-r border-mewar-crimson/20 flex flex-col justify-between shadow-md">
                            <div className="text-4xl sm:text-5xl font-serif text-mewar-crimson leading-none select-none mb-3">“</div>
                            <p className={`${isHi ? 'font-mukta not-italic text-base sm:text-lg text-exhibit-fg font-medium' : 'font-cormorant italic text-lg sm:text-xl text-exhibit-fg'} leading-relaxed`}>
                                {isHi ? active.quoteHi : active.quoteEn}
                            </p>
                            <div className="mt-5 pt-4 border-t border-mewar-crimson/20 font-sans text-xs sm:text-sm text-mewar-crimson font-bold tracking-wider uppercase">
                                {isHi ? active.quoteAuthorHi : active.quoteAuthorEn}
                            </div>
                        </div>
                    </div>

                    {/* Architectural Gallery Grid */}
                    <div className="my-12">
                        <div className="text-xs sm:text-sm font-heading text-mewar-crimson font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                            <span className="text-mewar-brass">✦</span>
                            <span>{isHi ? 'ऐतिहासिक छायाचित्र धरोहर' : 'ARCHITECTURAL GALLERY & HERITAGE'}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {active.plates.map((plate, pIdx) => (
                                <div
                                    key={pIdx}
                                    onClick={() => setSelectedPlate({
                                        image: plate.image,
                                        tag: isHi ? plate.tagHi : plate.tagEn,
                                        caption: isHi ? plate.captionHi : plate.captionEn,
                                    })}
                                    className="group overflow-hidden rounded-2xl border-2 border-mewar-crimson/20 hover:border-mewar-crimson bg-white dark:bg-[#1E1210] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                                        <img
                                            src={assetPath(plate.image)}
                                            alt={isHi ? plate.captionHi : plate.captionEn}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-xs font-sans font-bold text-amber-300 tracking-wider border border-amber-400/40">
                                            {isHi ? plate.tagHi : plate.tagEn}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                                            <span className="text-white text-xs font-sans font-bold flex items-center gap-1.5">
                                                <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                                                <span>{isHi ? 'पूर्ण आकार में देखें' : 'View Fullscreen'}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 md:p-5">
                                        <p className={`text-sm sm:text-base text-exhibit-fg leading-relaxed ${isHi ? 'font-mukta' : 'font-sans'}`}>
                                            {isHi ? plate.captionHi : plate.captionEn}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Key Historical Milestones */}
                    <div className="pt-8 border-t border-exhibit-hairline">
                        <div className="text-xs sm:text-sm font-heading text-mewar-crimson font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                            <span className="text-mewar-brass">✦</span>
                            <span>{isHi ? 'प्रमुख ऐतिहासिक कालखंड' : 'KEY HISTORICAL MILESTONES'}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {active.milestones.map((ms, mIdx) => (
                                <div
                                    key={mIdx}
                                    className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1E1210] border-2 border-mewar-crimson/20 hover:border-mewar-crimson shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="font-sans text-xs sm:text-sm font-bold text-mewar-crimson mb-2 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-mewar-crimson" />
                                            <span>{ms.year}</span>
                                        </div>
                                        <h4 className={`font-bold text-base sm:text-lg text-exhibit-fg mb-2 ${isHi ? 'font-mukta' : 'font-heading'}`}>
                                            {isHi ? ms.titleHi : ms.titleEn}
                                        </h4>
                                        <p className={`text-sm sm:text-base text-exhibit-fg/85 leading-relaxed ${isHi ? 'font-mukta' : 'font-sans'}`}>
                                            {isHi ? ms.descHi : ms.descEn}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chapter Bottom Navigation Controls */}
                    <div className="flex items-center justify-between pt-10 mt-10 border-t border-exhibit-hairline">
                        <button
                            onClick={() => switchChapter(activeIdx - 1)}
                            disabled={activeIdx === 0}
                            className={`flex items-center gap-2 px-7 py-3 rounded-full border-2 text-sm sm:text-base font-sans font-bold transition-all ${
                                activeIdx === 0
                                    ? 'opacity-30 cursor-not-allowed border-exhibit-hairline text-exhibit-muted bg-transparent'
                                    : 'border-mewar-crimson/35 hover:border-mewar-crimson text-mewar-crimson bg-white hover:bg-mewar-crimson/10 dark:bg-[#1E1210] shadow-sm'
                            }`}
                        >
                            <ArrowLeft className="w-4 h-4 text-mewar-crimson" />
                            <span>{isHi ? 'पिछला अध्याय' : 'Previous Chapter'}</span>
                        </button>

                        <div className="font-sans text-sm sm:text-base text-mewar-crimson font-bold tracking-widest hidden sm:inline">
                            {activeIdx + 1} / {chapters.length}
                        </div>

                        <button
                            onClick={() => switchChapter(activeIdx + 1)}
                            disabled={activeIdx === chapters.length - 1}
                            className={`flex items-center gap-2 px-7 py-3 rounded-full border-2 text-sm sm:text-base font-sans font-bold transition-all ${
                                activeIdx === chapters.length - 1
                                    ? 'opacity-30 cursor-not-allowed border-exhibit-hairline text-exhibit-muted bg-transparent'
                                    : 'border-mewar-crimson bg-mewar-crimson hover:bg-mewar-crimson-deep text-white shadow-md hover:shadow-lg'
                            }`}
                        >
                            <span>{isHi ? 'अगला अध्याय' : 'Next Chapter'}</span>
                            <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Fullscreen Plate Lightbox Modal */}
            {selectedPlate && (
                <div
                    className="fixed inset-0 z-[99999] flex flex-col justify-between bg-black/95 backdrop-blur-xl p-4 md:p-6 transition-opacity animate-fadeIn select-none"
                    onClick={() => setSelectedPlate(null)}
                >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/15 bg-black/50 backdrop-blur-md rounded-xl text-white z-20">
                        <div>
                            <span className="font-mono text-xs text-amber-300 font-bold tracking-widest uppercase">
                                {selectedPlate.tag}
                            </span>
                            <p className="text-xs sm:text-sm text-white/80 font-sans mt-0.5 line-clamp-1">
                                {selectedPlate.caption}
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectedPlate(null)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors text-xs font-mono font-bold"
                            aria-label="Close fullscreen view"
                        >
                            <span>ESC</span>
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div
                        className="flex-1 w-full flex items-center justify-center p-2 md:p-6 overflow-hidden"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setSelectedPlate(null);
                        }}
                    >
                        <img
                            src={assetPath(selectedPlate.image)}
                            alt={selectedPlate.caption}
                            className="max-w-[92vw] max-h-[78vh] object-contain rounded-xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    <div className="px-4 py-2 border-t border-white/15 bg-black/50 backdrop-blur-md rounded-xl text-center text-xs text-white/60 font-sans">
                        {isHi ? 'बंद करने के लिए कहीं भी बाहर क्लिक करें या ESC दबाएँ' : 'Click outside or press ESC to close'}
                    </div>
                </div>
            )}
        </section>
    );
}
