import { getDictionary } from '@/lib/api';
import { Lang } from '@/lib/types';
import AboutSection from '@/components/AboutSection';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    if (lang !== 'en' && lang !== 'hi') {
        notFound();
    }
    const dict = await getDictionary(lang as Lang);

    return <AboutSection dict={dict} />;
}
