import { getTrans } from '@/lib/utils';

interface HomeFeaturesProps {
    dict: any;
}

export default function HomeFeatures({ dict }: HomeFeaturesProps) {
    return (
        <section className="py-16 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-jain-yellow text-center">
                <div className="text-4xl mb-4">🕉️</div>
                <h3 className="text-xl font-bold mb-2">{getTrans(dict, 'cards.darshan.title')}</h3>
                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: getTrans(dict, 'cards.darshan.desc') }} />
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-jain-orange text-center">
                <div className="text-4xl mb-4">📅</div>
                <h3 className="text-xl font-bold mb-2">{getTrans(dict, 'cards.events.title')}</h3>
                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: getTrans(dict, 'cards.events.desc') }} />
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-jain-red text-center">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-xl font-bold mb-2">{getTrans(dict, 'cards.donation.title')}</h3>
                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: getTrans(dict, 'cards.donation.desc') }} />
            </div>
        </section>
    );
}
