import { getDictionary, getSiteConfig, getTrustMembers } from '@/lib/api';
import { Lang } from '@/lib/types';
import TrustSection from '@/components/TrustSection';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function TrustPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();
    const members = await getTrustMembers();

    return <TrustSection lang={lang} dict={dict} siteConfig={siteConfig} members={members} />;
}
