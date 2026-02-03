import { getDictionary, getSiteConfig, getGalleryEvents } from '@/lib/api';
import { Lang } from '@/lib/types';
import GallerySection from '@/components/GallerySection';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();
    const galleryEvents = await getGalleryEvents();

    return <GallerySection dict={dict} siteConfig={siteConfig} galleryEvents={galleryEvents} />;
}
