import { getDictionary, getSiteConfig } from '@/lib/api';
import { getTrans } from '@/lib/utils';
import { Lang } from '@/lib/types';

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-heading font-bold text-jain-orange mb-8 text-center">{getTrans(dict, 'nav.contact')}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    {/* Main Contacts */}
                    {siteConfig.contact.mainContacts.map((contact, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm space-y-4 mb-6">
                            <div>
                                <p className="font-bold text-sm text-gray-500 uppercase">{getTrans(dict, 'contact.labels.name')}</p>
                                <p className="text-lg font-semibold">{getTrans(dict, contact.nameKey)}</p>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-500 uppercase">{getTrans(dict, 'contact.labels.address')}</p>
                                <p className="text-gray-700">{getTrans(dict, contact.addressKey)}</p>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-500 uppercase">{getTrans(dict, 'contact.labels.phone')}</p>
                                <p className="text-gray-700">{contact.phone}</p>
                            </div>
                        </div>
                    ))}

                    {/* Other Contacts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {siteConfig.contact.otherContacts.map((contact, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-lg text-gray-800">{getTrans(dict, contact.nameKey)}</h3>
                                <p className="text-sm text-gray-500 mb-2">{getTrans(dict, contact.addressKey)}</p>
                                <p className="text-xs font-bold text-gray-400 uppercase">{getTrans(dict, 'contact.labels.phone')}</p>
                                <p className="text-xs">{contact.phone}</p>
                            </div>
                        ))}
                    </div>

                    {/* Info Section */}
                    {siteConfig.contact.information.items.length > 0 && (
                        <div className="mt-8 bg-orange-50 p-6 rounded-xl border border-orange-100">
                            <h3 className="text-lg font-bold text-jain-orange mb-3">{getTrans(dict, siteConfig.contact.information.titleKey)}</h3>
                            <ul className="space-y-2">
                                {siteConfig.contact.information.items.filter(i => i.isActive).map((item, id) => (
                                    <li key={id} className="flex items-start">
                                        <span className="text-jain-orange mr-2">•</span>
                                        <span className="text-gray-700">{getTrans(dict, item.textKey)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Map */}
                <div className="h-96 lg:h-auto bg-gray-200 rounded-xl overflow-hidden shadow-md">
                    <iframe
                        src={siteConfig.contact.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

            {/* Disclaimer Section */}
            {siteConfig.contact.disclaimer && (
                <div className="mt-12 bg-red-50 p-8 rounded-2xl border border-red-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-4 text-jain-red">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <h2 className="text-2xl font-heading font-bold">{getTrans(dict, siteConfig.contact.disclaimer.titleKey)}</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed italic">
                        {getTrans(dict, siteConfig.contact.disclaimer.textKey)}
                    </p>
                </div>
            )}
        </div>
    );
}
