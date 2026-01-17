import { getDictionary, getSiteConfig } from '@/lib/api';
import { Lang } from '@/lib/types';
import ContactSection from '@/components/ContactSection';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();

    return <ContactSection dict={dict} siteConfig={siteConfig} />;
}
