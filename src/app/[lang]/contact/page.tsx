import { getDictionary, getSiteConfig } from '@/lib/api';
import { Lang } from '@/lib/types';
import ContactSection from '@/components/ContactSection';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    if (lang !== 'en' && lang !== 'hi') {
        notFound();
    }
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();

    return <ContactSection dict={dict} siteConfig={siteConfig} lang={lang} />;
}
