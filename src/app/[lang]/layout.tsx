import { getDictionary, getPagesConfig, getSiteConfig } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lang } from '@/lib/types';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getTrans } from '@/lib/utils';
import StructuredData from '@/components/StructuredData';
import AnnouncementPopup from '@/components/AnnouncementPopup';
import { ExhibitionProvider } from '@/context/ExhibitionContext';
import CuratorDrawer from '@/components/CuratorDrawer';
import ExhibitionDock from '@/components/ExhibitionDock';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    if (lang !== 'en' && lang !== 'hi') {
        return {};
    }
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();
    
    const baseUrl = 'https://www.saatbeesdeorimandir.co.in';
    const title = getTrans(dict, 'site_name');
    const description = getTrans(dict, 'hero.subtitle');
    const keywords = ((dict as any).keywords || []).map((keyword: string) => keyword.toLowerCase());
    const ogImage = siteConfig.general.logo ? `${baseUrl}${siteConfig.general.logo}` : '';

    return {
        title: {
            default: title,
            template: `%s | ${title}`,
        },
        description: description,
        keywords: keywords,
        authors: [{ name: title }],
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: `/${lang}`,
            languages: {
                'en': '/en',
                'hi': '/hi',
            },
        },
        openGraph: {
            title: title,
            description: description,
            url: `${baseUrl}/${lang}`,
            siteName: title,
            images: ogImage ? [{ url: ogImage }] : [],
            locale: lang === 'hi' ? 'hi_IN' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: ogImage ? [ogImage] : [],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        other: {
            google: 'notranslate',
        },
    };
}

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    if (lang !== 'en' && lang !== 'hi') {
        notFound();
    }
    const dict = await getDictionary(lang as Lang);
    const pagesConfig = await getPagesConfig();
    const siteConfig = await getSiteConfig();

    return (
        <ExhibitionProvider>
            <div className="flex flex-col min-h-screen bg-exhibit-bg text-exhibit-fg transition-colors duration-300">
                <StructuredData dict={dict} siteConfig={siteConfig} lang={lang} />
                <AnnouncementPopup dict={dict} />
                <CuratorDrawer lang={lang} />
                <Navbar lang={lang} dict={dict} pagesConfig={pagesConfig} siteConfig={siteConfig} />
                <main className="flex-grow">{children}</main>
                <Footer dict={dict} siteConfig={siteConfig} />
                <ExhibitionDock lang={lang} />
            </div>
        </ExhibitionProvider>
    );
}
