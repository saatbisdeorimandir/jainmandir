import { getTrans } from '@/lib/utils';
import EventGalleryGrid from '@/components/EventGalleryGrid';
import { GalleryEvent } from '@/lib/types';
import { getEventImages } from '@/lib/gallery-images';
import AnnouncementSlideshow from '@/components/AnnouncementSlideshow';
import DynamicGallery from '@/components/DynamicGallery';

interface GallerySectionProps {
    dict: any;
    siteConfig: any;
    galleryEvents: { events: GalleryEvent[] };
    lang: string;
}

export default function GallerySection({ dict, siteConfig, galleryEvents, lang }: GallerySectionProps) {
    const isHi = lang === 'hi';

    return (
        <div id="gallery" className="bg-exhibit-bg text-exhibit-fg min-h-screen scroll-mt-16 transition-colors duration-500">
            {/* Museum Exhibition Header */}
            <div className="border-b border-exhibit-hairline bg-exhibit-surface/60 py-16 md:py-24 text-center">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="badge-royal mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal-gold animate-pulse" />
                        <span className="font-cinzel text-xs tracking-widest">
                            {isHi ? 'छायाचित्र अभिलेखागार' : 'ARCHITECTURAL PHOTO ARCHIVES'}
                        </span>
                    </div>
                    <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-exhibit-fg tracking-wide mb-4">
                        {getTrans(dict, 'nav.gallery')}
                    </h1>
                    <p className="text-base sm:text-lg text-exhibit-muted max-w-2xl mx-auto font-sans leading-relaxed">
                        {isHi
                            ? 'सात बीस देवरी के 27 जिनालयों, भव्य वितान, कलात्मक स्तंभों एवं विशेष आयोजनों का सचित्र संकलन।'
                            : 'A curated visual monograph capturing the 27 shrines, domed marble vaults, and living celebrations.'}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="mb-14">
                    <AnnouncementSlideshow dict={dict} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Permanent Collections Column */}
                    <div className="bg-exhibit-surface rounded-3xl p-6 md:p-8 border border-exhibit-hairline shadow-2xl h-fit">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-exhibit-hairline">
                            <span className="w-2 h-2 rounded-full bg-exhibit-gold" />
                            <h2 className="font-sans font-bold text-xl md:text-2xl text-exhibit-fg tracking-tight">
                                {getTrans(dict, 'gallery.permanent_collections') || (isHi ? 'मूल संग्रह' : 'Main Collections')}
                            </h2>
                        </div>

                        {galleryEvents.events.map((event) => {
                            const images = getEventImages(event.id);
                            return (
                                <EventGalleryGrid
                                    key={event.id}
                                    event={event}
                                    dict={dict}
                                    images={images}
                                />
                            );
                        })}
                    </div>

                    {/* Dynamic / Latest Updates Column */}
                    <div className="bg-exhibit-surface rounded-3xl p-6 md:p-8 border border-exhibit-hairline shadow-2xl h-fit">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-exhibit-hairline">
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <h2 className="font-sans font-bold text-xl md:text-2xl text-exhibit-fg tracking-tight">
                                {getTrans(dict, 'gallery.latest_updates') || (isHi ? 'नवीनतम गतिविधियाँ' : 'Latest Updates')}
                            </h2>
                        </div>
                        <DynamicGallery dict={dict} lang={lang} />
                    </div>
                </div>
            </div>
        </div>
    );
}
