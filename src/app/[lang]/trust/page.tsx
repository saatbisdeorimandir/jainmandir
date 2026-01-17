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
        <div className="bg-gradient-to-b from-stone-50 via-white to-stone-50">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-jain-orange/10 via-amber-50 to-white">
                <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-24 md:pb-14 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-jain-orange"></div>
                        <div className="w-3 h-3 rounded-full bg-jain-orange"></div>
                        <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-jain-orange"></div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-stone-gray mb-4 leading-[1.1] tracking-tight">
                        {getTrans(dict, 'trust.title')}
                    </h1>
                    <div className="w-16 h-1.5 bg-jain-orange mb-6 mx-auto" />
                    <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed max-w-3xl mx-auto">
                        {getTrans(dict, 'trust.subtitle')}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
                <div className="space-y-16">
                    {/* Trust Committee */}
                    <div className="bg-white rounded-[2.5rem] p-6 md:p-12 border border-stone-100 shadow-xl shadow-stone-200/50">
                        <TrustCommittee siteConfig={siteConfig} dict={dict} />
                    </div>

                    {/* Trust Members Table */}
                    <div>
                        <div className="flex items-center gap-4 mb-8 justify-center">
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-stone-200" />
                            <h2 className="text-2xl md:text-3xl font-heading font-bold text-stone-800 px-4">
                                {getTrans(dict, 'trust.table.title')}
                            </h2>
                            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-stone-200" />
                        </div>
                        <div className="overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-xl shadow-stone-200/50">
                            <TrustTable members={members} lang={lang as Lang} dict={dict} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
