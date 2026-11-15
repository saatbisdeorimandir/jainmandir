import { getDictionary, getSiteConfig, getGalleryEvents } from '@/lib/api';
import { Lang } from '@/lib/types';
import GallerySection from '@/components/GallerySection';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    if (lang !== 'en' && lang !== 'hi') {
        notFound();
    }
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();
    const galleryEvents = await getGalleryEvents();

    return <GallerySection dict={dict} siteConfig={siteConfig} galleryEvents={galleryEvents} lang={lang} />;
}
