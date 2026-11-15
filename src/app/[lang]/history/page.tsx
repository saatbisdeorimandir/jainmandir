import { getDictionary } from '@/lib/api';
import { Lang } from '@/lib/types';
import HistorySection from '@/components/HistorySection';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function HistoryPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    if (lang !== 'en' && lang !== 'hi') {
        notFound();
    }
    const dict = await getDictionary(lang as Lang);

    return <HistorySection lang={lang} dict={dict} />;
}
