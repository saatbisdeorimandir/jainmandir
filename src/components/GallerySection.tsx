import { getTrans } from '@/lib/utils';
import EventGalleryGrid from '@/components/EventGalleryGrid';
import { GalleryEvent } from '@/lib/types';
import { getEventImages } from '@/lib/gallery-images';

interface GallerySectionProps {
    dict: any;
    siteConfig: any;
    galleryEvents: { events: GalleryEvent[] };
}

export default function GallerySection({ dict, siteConfig, galleryEvents }: GallerySectionProps) {
    return (
        <div id="gallery" className="bg-gradient-to-b from-stone-50 via-white to-stone-50 scroll-mt-16">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-jain-orange/10 via-amber-50 to-white">
                <div className="max-w-7xl mx-auto px-6 pt-16 pb-16 md:pt-20 md:pb-14 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-jain-orange"></div>
                            <div className="w-3 h-3 rounded-full bg-jain-orange"></div>
                            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-jain-orange"></div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-stone-gray leading-[1.1] tracking-tight">
                        {getTrans(dict, 'nav.gallery')}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
                <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-stone-100 shadow-xl shadow-stone-200/50">
                    {/* Event-based Gallery Sections */}
                    {galleryEvents.events.map((event) => {
                        // Get images for this event from centralized configuration
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
            </div>
        </div>
    );
}
