import Link from 'next/link';
import { getTrans } from '@/lib/utils';

interface HeroProps {
    lang: string;
    dict: any;
}

export default function Hero({ lang, dict }: HeroProps) {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-24">
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/images/about/SathisDeori-Temple.jpg"
                    className="w-full h-full object-cover opacity-30"
                    alt="Jain Temple Background"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20"></div>
            </div>
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 text-gradient leading-[1.2] pb-2">
                    {getTrans(dict, 'hero.title')}
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto font-medium">
                    {getTrans(dict, 'hero.subtitle')}
                </p>
                <Link
                    href={`/${lang}/about`}
                    className="inline-block bg-gradient-to-r from-jain-orange to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-10 rounded-full transition-all shadow-xl transform hover:scale-105 active:scale-95"
                >
                    {getTrans(dict, 'hero.btn')}
                </Link>
            </div>
        </section>
    );
}
