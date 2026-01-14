import { getDictionary, getSiteConfig } from '@/lib/api';
import { getTrans } from '@/lib/utils';
import { Lang } from '@/lib/types';

export default async function EventsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);
    const siteConfig = await getSiteConfig();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-jain-orange mb-8 text-center">{getTrans(dict, 'nav.events')}</h1>

            <div className="space-y-8" id="events-list">
                {siteConfig.events.map((evt) => (
                    <div key={evt.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                        <div className="md:w-1/3 h-48 md:h-auto">
                            <img src={evt.image} className="w-full h-full object-cover" alt="Event" />
                        </div>
                        <div className="p-6 md:w-2/3 flex flex-col justify-center">
                            <div className="text-sm text-jain-orange font-bold uppercase tracking-wide mb-1">
                                <span>{getTrans(dict, 'events.date_label')}</span> {evt.date}
                            </div>
                            <h2 className="text-2xl font-bold mb-2 text-gray-800">{getTrans(dict, evt.titleKey)}</h2>
                            <p className="text-gray-600">{getTrans(dict, evt.descKey)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
