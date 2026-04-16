'use client';

import { getTrans, assetPath } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';
import siteConfig from '@/content/site-config.json';

interface StaySectionProps {
    dict: any;
}

export default function StaySection({ dict }: StaySectionProps) {
    const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
    const bookingLink = siteConfig.externalLinks.find(l => l.id === 'dharamshala_booking')?.url || '#';

    const features = ['peace', 'amenities', 'dining'];

    return (
        <section 
            ref={ref}
            className="relative py-24 md:py-32 overflow-hidden bg-stone-900 text-white"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={assetPath("/assets/images/about/history-sanctum.jpg")} 
                    alt="Stay Experience" 
                    className="w-full h-full object-cover opacity-40 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className={`reveal ${isInView ? 'in-view' : ''}`}>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-jain-orange/20 border border-jain-orange/30 text-jain-orange text-xs font-bold tracking-[0.2em] uppercase mb-8">
                            {getTrans(dict, 'stay_section.eyebrow')}
                        </span>
                        
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 leading-[1.1] text-white">
                            {getTrans(dict, 'stay_section.title')}
                        </h2>
                        
                        <p className="text-lg md:text-xl text-stone-300 mb-10 font-light leading-relaxed max-w-xl">
                            {getTrans(dict, 'stay_section.subtitle')}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            {features.map((feature, i) => (
                                <div 
                                    key={feature}
                                    className={`flex items-start gap-4 transition-all duration-700 delay-[400ms] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    style={{ transitionDelay: `${400 + (i * 100)}ms` }}
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-jain-orange flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-stone-200 font-medium pt-1.5">{getTrans(dict, `stay_section.features.${feature}`)}</span>
                                </div>
                            ))}
                        </div>

                        <a
                            href={bookingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shimmer-btn inline-flex items-center gap-4 bg-jain-orange text-white hover:bg-jain-red font-bold py-5 px-10 rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 group"
                        >
                            {getTrans(dict, 'stay_section.btn')}
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    {/* Decorative Image Card */}
                    <div className={`hidden lg:block relative reveal-right ${isInView ? 'in-view' : ''} delay-300`}>
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                            <img 
                                src={assetPath("/assets/images/about/history-architecture.jpg")} 
                                alt="Dharamshala Architecture" 
                                className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-12">
                                <div>
                                    <div className="w-16 h-1 bg-jain-orange mb-6 rounded-full"></div>
                                    <p className="text-2xl font-heading font-medium text-white italic">
                                        "{getTrans(dict, 'about_page.quote')?.substring(0, 60)}..."
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative floating elements */}
                        <div className="absolute -top-8 -right-8 w-32 h-32 bg-jain-orange/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-jain-red/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
