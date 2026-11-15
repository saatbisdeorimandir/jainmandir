import { getDictionary, getSiteConfig } from '@/lib/api';
import Hero from '@/components/Hero';
import MultiChapterExhibition from '@/components/MultiChapterExhibition';
import HomeFeatures from '@/components/HomeFeatures';
import InstagramPromotersSection from '@/components/InstagramPromotersSection';
import { Lang } from '@/lib/types';
import { notFound, redirect } from 'next/navigation';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    if (lang !== 'en' && lang !== 'hi') {
        notFound();
    }
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();

    return (
        <>
            <Hero lang={lang} dict={dict} />
            <MultiChapterExhibition lang={lang} />
            <HomeFeatures dict={dict} />
            <InstagramPromotersSection dict={dict} siteConfig={siteConfig} />
        </>
    );
}
