'use client';

import { getTrans } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';

interface HomeFeaturesProps {
    dict: any;
}

const cards = [
    {
        key: 'darshan',
        colorFrom: 'from-jain-yellow/20',
        colorTo: 'to-jain-yellow/10',
        barColor: 'from-jain-yellow',
        iconColor: 'text-jain-yellow',
        hoverText: 'group-hover:text-jain-yellow',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
    {
        key: 'events',
        colorFrom: 'from-jain-orange/20',
        colorTo: 'to-jain-orange/10',
        barColor: 'from-jain-orange',
        iconColor: 'text-jain-orange',
        hoverText: 'group-hover:text-jain-orange',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        key: 'donation',
        colorFrom: 'from-jain-red/20',
        colorTo: 'to-jain-red/10',
        barColor: 'from-jain-red',
        iconColor: 'text-jain-red',
        hoverText: 'group-hover:text-jain-red',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
    },
];

export default function HomeFeatures({ dict }: HomeFeaturesProps) {
    const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

    return (
        <section ref={ref} className="py-20 md:py-28 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {cards.map((card, i) => (
                    <div
                        key={card.key}
                        className={`bento-card-royal group p-8 md:p-9 relative overflow-hidden transition-all duration-300
                            reveal ${isInView ? 'in-view' : ''}`}
                        style={{ transitionDelay: `${i * 120}ms` }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-13 h-13 p-3.5 rounded-2xl bg-white dark:bg-[#1E1210] border-2 border-mewar-crimson/25 text-mewar-crimson group-hover:scale-110 group-hover:border-mewar-crimson group-hover:bg-mewar-crimson group-hover:text-white transition-all duration-300 shadow-sm">
                                {card.icon}
                            </div>
                            <div className="h-px flex-grow bg-gradient-to-r from-mewar-crimson/40 to-transparent" />
                            <span className="font-sans font-bold text-xs text-mewar-brass opacity-80">❖</span>
                        </div>
                        <h3 className="text-xl font-heading font-bold mb-3 text-exhibit-fg group-hover:text-mewar-crimson transition-colors duration-300">
                            {getTrans(dict, `cards.${card.key}.title`)}
                        </h3>
                        <p
                            className="text-exhibit-fg/80 font-sans leading-relaxed text-sm md:text-base font-normal"
                            dangerouslySetInnerHTML={{ __html: getTrans(dict, `cards.${card.key}.desc`) }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
