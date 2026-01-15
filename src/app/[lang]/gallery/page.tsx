import { getDictionary, getSiteConfig } from '@/lib/api';
import { getTrans } from '@/lib/utils';
import GalleryGrid from '@/components/GalleryGrid';
import { Lang } from '@/lib/types';

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();

    return (
        <div className="bg-gradient-to-b from-stone-50 via-white to-stone-50">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-stone-100 via-white to-stone-50 border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-24 md:pb-14 text-center">
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
                    <GalleryGrid items={siteConfig.gallery} dict={dict} />
                </div>
            </div>
        </div>
    );
}
