import Link from 'next/link';
import { getTrans, assetPath } from '@/lib/utils';

interface HeroProps {
    lang: string;
    dict: any;
}

export default function Hero({ lang, dict }: HeroProps) {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-32 bg-stone-50">
            <div className="absolute inset-0 z-0">
                <img
                    src={assetPath("/assets/images/about/SathisDeori-Temple.jpg")}
                    className="w-full h-full object-cover opacity-100 scale-105"
                    alt="Jain Temple Background"
                />
                <div className="absolute inset-0 bg-stone-50/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/40 to-stone-50"></div>
            </div>
            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-[2px] bg-jain-orange" />
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-10 text-stone-gray leading-[1.05] tracking-tight">
                    {getTrans(dict, 'hero.title')}
                </h1>
                <p className="text-xl md:text-xl lg:text-2xl text-stone-500 mb-4 max-w-3xl mx-auto font-light leading-relaxed italic border-l-4 border-jain-orange/20 pl-8 inline-block text-left">
                    {getTrans(dict, 'hero.subtitle0')}
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl text-stone-500 mb-14 max-w-3xl mx-auto font-light leading-relaxed italic border-l-4 border-jain-orange/20 pl-8 inline-block text-left">
                    {getTrans(dict, 'hero.subtitle')}
                </p>
                <div>
                    <Link
                        href={`/${lang}/about`}
                        className="inline-flex items-center gap-3 bg-stone-900 border border-stone-800 text-stone-50 hover:bg-stone-800 font-medium py-5 px-12 rounded-full transition-all shadow-2xl tracking-[0.1em] uppercase text-sm"
                    >
                        {getTrans(dict, 'hero.btn')}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
