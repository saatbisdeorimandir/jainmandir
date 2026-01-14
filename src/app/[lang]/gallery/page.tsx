import { getDictionary, getSiteConfig } from '@/lib/api';
import { getTrans } from '@/lib/utils';
import GalleryGrid from '@/components/GalleryGrid';
import { Lang } from '@/lib/types';

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-jain-orange mb-8 text-center">{getTrans(dict, 'nav.gallery')}</h1>
            <GalleryGrid items={siteConfig.gallery} dict={dict} />
        </div>
    );
}
