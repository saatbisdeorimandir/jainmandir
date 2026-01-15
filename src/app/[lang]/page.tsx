import { getDictionary } from '@/lib/api';
import Hero from '@/components/Hero';
import HomeFeatures from '@/components/HomeFeatures';
import { Lang } from '@/lib/types';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);

    return (
        <>
            <Hero lang={lang} dict={dict} />
            <HomeFeatures dict={dict} />
        </>
    );
}
