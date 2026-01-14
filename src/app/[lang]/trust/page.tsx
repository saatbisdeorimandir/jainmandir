import { getDictionary, getSiteConfig, getTrustMembers } from '@/lib/api';
import { getTrans } from '@/lib/utils';
import { Lang } from '@/lib/types';
import { TrustCommittee, TrustTable } from '@/components/TrustComponents';

export default async function TrustPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();
    const members = await getTrustMembers();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-jain-orange mb-4">{getTrans(dict, 'trust.title')}</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">{getTrans(dict, 'trust.subtitle')}</p>
            </div>

            <TrustCommittee siteConfig={siteConfig} dict={dict} />

            <div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{getTrans(dict, 'trust.table.title')}</h2>
                <TrustTable members={members} lang={lang as Lang} dict={dict} />
            </div>
        </div>
    );
}
