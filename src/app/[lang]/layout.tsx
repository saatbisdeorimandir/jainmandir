import { getDictionary, getPagesConfig, getSiteConfig } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Lang } from '@/lib/types';
import { Metadata } from 'next';
import { getTrans } from '@/lib/utils';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);

    return {
        title: getTrans(dict, 'site_name'),
        description: getTrans(dict, 'hero.subtitle'),
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
    const dict = await getDictionary(lang as Lang);
    const pagesConfig = await getPagesConfig();
    const siteConfig = await getSiteConfig();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar lang={lang} dict={dict} pagesConfig={pagesConfig} siteConfig={siteConfig} />
            <main className="flex-grow">{children}</main>
            <Footer dict={dict} siteConfig={siteConfig} />
        </div>
    );
}
