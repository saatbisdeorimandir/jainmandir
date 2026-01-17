import { getDictionary } from '@/lib/api';
import { Lang } from '@/lib/types';
import HistorySection from '@/components/HistorySection';

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }];
}

export default async function HistoryPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);

    return <HistorySection lang={lang} dict={dict} />;
}
