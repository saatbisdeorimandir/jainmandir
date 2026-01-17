import { getDictionary, getSiteConfig } from '@/lib/api';
import { getTrans } from '@/lib/utils';
import { Lang } from '@/lib/types';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();

    const mainContact = siteConfig.contact.mainContacts[0];

    return (
        <div className="bg-gradient-to-b from-stone-50 via-white to-stone-50">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-jain-orange/10 via-amber-50 to-white">
                <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 md:pt-24 md:pb-14 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-jain-orange"></div>
                            <div className="w-3 h-3 rounded-full bg-jain-orange"></div>
                            <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-jain-orange"></div>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-stone-gray mb-4 leading-[1.1] tracking-tight">
                        {getTrans(dict, 'nav.contact')}
                    </h1>
                    <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
                        {getTrans(dict, 'contact.intro')}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
                {/* Main Grid: Contact Info (Left) + Map (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Left Column: Contact Information */}
                    <div className="space-y-8">
                        {/* Featured Contact Card */}
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-stone-300/30 border border-stone-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                            <div className="bg-gradient-to-br from-jain-orange/5 via-transparent to-transparent p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-1 h-8 bg-gradient-to-b from-jain-orange to-jain-red rounded-full"></div>
                                    <h2 className="text-xl md:text-2xl font-heading font-bold text-stone-800">
                                        {getTrans(dict, mainContact.nameKey)}
                                    </h2>
                                </div>

                                <div className="space-y-5">
                                    {/* Address */}
                                    <div className="group">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-jain-orange to-jain-red flex items-center justify-center shadow-lg shadow-jain-orange/30 group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-stone-400 text-xs uppercase tracking-[0.2em] mb-1.5 font-bold">{getTrans(dict, 'contact.labels.address')}</p>
                                                <p className="text-stone-700 text-base font-light leading-relaxed text-justify">{getTrans(dict, mainContact.addressKey)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="group">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center shadow-lg shadow-stone-700/30 group-hover:scale-110 transition-transform duration-300">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-stone-400 text-xs uppercase tracking-[0.2em] mb-1.5 font-bold">{getTrans(dict, 'contact.labels.phone')}</p>
                                                <a href={`tel:${mainContact.phone}`} className="text-stone-800 text-lg font-bold hover:text-jain-orange transition-colors">
                                                    {mainContact.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Contacts */}
                        {siteConfig.contact.otherContacts.length > 0 && (
                            <div>
                                <h3 className="text-lg md:text-xl font-heading font-bold text-stone-800 mb-4 flex items-center gap-3">
                                    <span className="w-6 h-[2px] bg-jain-orange"></span>
                                    {getTrans(dict, 'contact.labels.name')}
                                </h3>
                                <div className="space-y-4">
                                    {siteConfig.contact.otherContacts.map((contact, idx) => (
                                        <div key={idx} className="group bg-white rounded-xl p-5 border border-stone-100 shadow-md shadow-stone-200/50 hover:shadow-xl hover:shadow-stone-300/50 transition-all duration-500 hover:-translate-y-1">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-jain-orange/10 to-jain-red/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <svg className="w-4 h-4 text-jain-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-base font-bold text-stone-800 mb-1 group-hover:text-jain-orange transition-colors">
                                                        {getTrans(dict, contact.nameKey)}
                                                    </h4>
                                                    <p className="text-sm text-stone-500 font-light leading-relaxed text-justify">
                                                        {getTrans(dict, contact.addressKey)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
                                                <svg className="w-4 h-4 text-jain-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <a href={`tel:${contact.phone}`} className="text-sm font-semibold text-stone-700 hover:text-jain-orange transition-colors">
                                                    {contact.phone}
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Map with Info Overlay */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-400/30 border border-stone-200 relative h-[450px] lg:h-[600px]">
                            <iframe
                                src={siteConfig.contact.mapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                            ></iframe>

                            {/* Floating Info Card */}
                            {siteConfig.contact.information.items.length > 0 && (
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-white/50">
                                        <h3 className="text-base font-heading font-bold text-stone-800 mb-3 flex items-center gap-2">
                                            <div className="w-1 h-5 bg-gradient-to-b from-jain-orange to-jain-red rounded-full"></div>
                                            {getTrans(dict, siteConfig.contact.information.titleKey)}
                                        </h3>
                                        <ul className="space-y-2">
                                            {siteConfig.contact.information.items.filter(i => i.isActive).map((item, id) => (
                                                <li key={id} className="flex items-start gap-2 text-sm leading-relaxed text-stone-600 hover:text-stone-800 transition-colors">
                                                    <span className="text-jain-orange mt-0.5 flex-shrink-0">✦</span>
                                                    <span className="font-light text-justify">{getTrans(dict, item.textKey)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Disclaimer Section */}
                {siteConfig.contact.disclaimer && (
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-[2rem] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50/30 to-red-50/50"></div>
                            <div className="relative p-6 md:p-8 border border-red-100/50">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-jain-orange/10 to-jain-red/10 rounded-full blur-3xl"></div>
                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-jain-red to-red-600 flex items-center justify-center shadow-lg shadow-jain-red/30">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-heading font-bold text-jain-red">
                                            {getTrans(dict, siteConfig.contact.disclaimer.titleKey)}
                                        </h2>
                                    </div>
                                    <p className="text-stone-700 leading-relaxed text-base font-light pl-13 text-justify">
                                        "{getTrans(dict, siteConfig.contact.disclaimer.textKey)}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
