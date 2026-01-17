import { getDictionary, getSiteConfig } from '@/lib/api';
import { Lang } from '@/lib/types';
import EventsSection from '@/components/EventsSection';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function EventsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();

    return <EventsSection dict={dict} siteConfig={siteConfig} />;
}
