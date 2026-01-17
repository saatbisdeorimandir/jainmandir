import { getDictionary } from '@/lib/api';
import { getTrans, assetPath } from '@/lib/utils';
import { Lang } from '@/lib/types';
import PhotoCard from '@/components/PhotoCard';

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);

    const title = getTrans(dict, 'sections.about.title');
    const desc = getTrans(dict, 'sections.about.desc');

    // Handle array or string description
    const renderDesc = () => {
        if (Array.isArray(desc)) {
            return desc.map((p: string, i: number) => <p key={i} className="mb-4 text-justify">{p}</p>);
        }
        return <p className="mb-4 text-justify">{desc}</p>;
    };

    const heritageLabel = getTrans(dict, 'about_page.heritage_label');
    const quote = getTrans(dict, 'about_page.quote');
    const estLabel = getTrans(dict, 'about_page.established_label');
    const centuryLabel = getTrans(dict, 'about_page.century_label');
    const locLabel = getTrans(dict, 'about_page.location_label');
    const locValue = getTrans(dict, 'about_page.location_value');
    const herTag = getTrans(dict, 'about_page.heritage_tag');
    const herValue = getTrans(dict, 'about_page.heritage_value');

    // History section data
    const historySection = dict?.about_page?.history_section as any;
    const historyTitle = historySection?.title || '';
    const historySubtitle = historySection?.subtitle || '';
    const historyCards = historySection?.cards || [];

    return (
        <div className="bg-white">
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Left Side: Sticky Media (Desktop Only) */}
                <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 order-1 lg:order-1 overflow-hidden bg-stone-950 flex items-center justify-center">
                    <div className="relative w-full h-[400px] md:h-[500px] lg:h-full group">
                        <video
                            src={assetPath("/assets/images/about/mandir_video.mp4")}
                            poster={assetPath("/assets/images/about/SathisDeori-Temple.jpg")}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0 pointer-events-none" />

                        {/* Elegant Floating Badge */}
                        <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-white">
                            <p className="text-xs tracking-[0.3em] uppercase opacity-80 mb-1">{estLabel}</p>
                            <p className="text-xl font-heading font-bold">{centuryLabel}</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Narrative Content */}
                <div className="lg:w-1/2 order-2 lg:order-2 px-6 md:px-10 lg:px-14 py-10 md:py-12 lg:py-16 flex flex-col justify-center">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <header className="mb-8">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-stone-gray mb-4 leading-[1.1] tracking-tight">
                                {title}
                            </h1>
                            <div className="w-14 h-1.5 bg-jain-orange mb-6" />
                        </header>

                        <div className="space-y-6 text-base md:text-lg leading-relaxed text-stone-600 font-light italic border-l-4 border-stone-100 pl-5 mb-8 text-justify">
                            "{quote}"
                        </div>

                        <div className="space-y-4 text-sm md:text-base leading-relaxed text-stone-700 font-light">
                            {renderDesc()}
                        </div>

                        <footer className="mt-12 pt-10 border-t border-stone-100 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-stone-400 text-xs uppercase tracking-widest mb-2">{locLabel}</p>
                                <p className="text-stone-800 font-semibold text-sm">{locValue}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-stone-400 text-xs uppercase tracking-widest mb-2">{herTag}</p>
                                <p className="text-stone-800 font-semibold text-sm">{herValue}</p>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>

            {/* History Section with Photo Cards */}
            {historyCards.length > 0 && (
                <section className="bg-gradient-to-b from-white via-stone-50 to-white py-16 md:py-20 lg:py-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">
                        {/* Section Header */}
                        <div className="text-center mb-12 md:mb-16">
                            <p className="text-jain-orange text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                                {historySubtitle}
                            </p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-stone-gray mb-4">
                                {historyTitle}
                            </h2>
                            <div className="w-20 h-1.5 bg-jain-orange mx-auto" />
                        </div>

                        {/* Photo Cards Grid */}
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
