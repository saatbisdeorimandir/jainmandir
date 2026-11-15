import { getTrans } from '@/lib/utils';
import { Lang } from '@/lib/types';
import { TrustCommittee, TrustTable, TrustGallery } from '@/components/TrustComponents';

interface TrustSectionProps {
    lang: string;
    dict: any;
    siteConfig: any;
    members: any[];
}

export default function TrustSection({ lang, dict, siteConfig, members }: TrustSectionProps) {
    const isHi = lang === 'hi';

    return (
        <div id="trust" className="bg-exhibit-bg text-exhibit-fg min-h-screen scroll-mt-16 transition-colors duration-500">
            {/* Museum Exhibition Header */}
            <div className="border-b border-exhibit-hairline bg-exhibit-surface/60 py-16 md:py-24 text-center">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="badge-royal mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-royal-gold animate-pulse" />
                        <span className="font-cinzel text-xs tracking-widest">
                            {isHi ? 'प्रबंधन एवं न्यास मंडल' : 'GOVERNANCE & TRUST MANAGEMENT'}
                        </span>
                    </div>
                    <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-exhibit-fg tracking-wide mb-4">
                        {getTrans(dict, 'trust.title')}
                    </h1>
                    <p className="text-base sm:text-lg text-exhibit-muted font-sans max-w-3xl mx-auto leading-relaxed">
                        {getTrans(dict, 'trust.subtitle')}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="space-y-16">
                    {/* Trustee Galleries */}
                    <div className="bento-card-royal p-6 md:p-12">
                        <TrustGallery dict={dict} />
                    </div>

                    {/* Trust Committee */}
                    <div className="bento-card-royal p-6 md:p-12">
                        <TrustCommittee siteConfig={siteConfig} dict={dict} />
                    </div>

                    {/* Trust Members Table */}
                    <div>
                        <div className="flex items-center gap-4 mb-8 justify-center">
                            <div className="h-[0.5px] flex-grow bg-royal-gold/30" />
                            <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-exhibit-fg tracking-wide px-4">
                                {getTrans(dict, 'trust.table.title')}
                            </h2>
                            <div className="h-[0.5px] flex-grow bg-royal-gold/30" />
                        </div>
                        <div className="overflow-hidden rounded-3xl border border-royal-gold/25 bg-exhibit-surface shadow-2xl">
                            <TrustTable members={members} lang={lang as Lang} dict={dict} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
