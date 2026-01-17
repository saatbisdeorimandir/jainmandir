import { getDictionary } from '@/lib/api';
import { Lang } from '@/lib/types';
import AboutSection from '@/components/AboutSection';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);

    return <AboutSection dict={dict} />;
}
