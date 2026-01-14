import { getDictionary } from '@/lib/api';
import { getTrans, assetPath } from '@/lib/utils';
import { Lang } from '@/lib/types';

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Lang);

    const title = getTrans(dict, 'sections.about.title');
    const desc = getTrans(dict, 'sections.about.desc');

    // Handle array or string description
    const renderDesc = () => {
        if (Array.isArray(desc)) {
            return desc.map((p: string, i: number) => <p key={i} className="mb-4">{p}</p>);
        }
        return <p className="mb-4">{desc}</p>;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-heading font-bold text-jain-orange mb-8 text-center">{title}</h1>
            <div className="bg-white p-8 rounded-2xl shadow-sm mb-8">
                <img
                    src={assetPath("/assets/images/about/SathisDeori-Temple.jpg")}
                    alt="Jain Temple Details"
                    className="w-full h-80 object-cover rounded-xl mb-6"
                />
                <div className="text-lg leading-relaxed mb-4 space-y-4 text-gray-700">
                    {renderDesc()}
                </div>
            </div>
        </div>
    );
}
