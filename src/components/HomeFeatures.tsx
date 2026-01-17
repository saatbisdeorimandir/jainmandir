import { getTrans } from '@/lib/utils';

interface HomeFeaturesProps {
    dict: any;
}

export default function HomeFeatures({ dict }: HomeFeaturesProps) {
    return (
        <section className="py-16 md:py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Darshan Card */}
                <div className="group bg-white rounded-2xl p-8 border border-stone-100 shadow-lg shadow-stone-200/50 hover:shadow-2xl hover:shadow-stone-300/50 transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-jain-yellow/20 to-jain-yellow/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 text-jain-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div className="h-1 flex-grow bg-gradient-to-r from-jain-yellow to-transparent rounded-full"></div>
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-3 text-stone-800 group-hover:text-jain-yellow transition-colors">
                        {getTrans(dict, 'cards.darshan.title')}
                    </h3>
                    <p className="text-stone-600 font-light leading-relaxed text-base text-justify" dangerouslySetInnerHTML={{ __html: getTrans(dict, 'cards.darshan.desc') }} />
                </div>

                {/* Events Card */}
                <div className="group bg-white rounded-2xl p-8 border border-stone-100 shadow-lg shadow-stone-200/50 hover:shadow-2xl hover:shadow-stone-300/50 transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-jain-orange/20 to-jain-orange/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 text-jain-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="h-1 flex-grow bg-gradient-to-r from-jain-orange to-transparent rounded-full"></div>
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-3 text-stone-800 group-hover:text-jain-orange transition-colors">
                        {getTrans(dict, 'cards.events.title')}
                    </h3>
                    <p className="text-stone-600 font-light leading-relaxed text-base text-justify" dangerouslySetInnerHTML={{ __html: getTrans(dict, 'cards.events.desc') }} />
                </div>

                {/* Donation Card */}
                <div className="group bg-white rounded-2xl p-8 border border-stone-100 shadow-lg shadow-stone-200/50 hover:shadow-2xl hover:shadow-stone-300/50 transition-all duration-500 hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-jain-red/20 to-jain-red/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 text-jain-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div className="h-1 flex-grow bg-gradient-to-r from-jain-red to-transparent rounded-full"></div>
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-3 text-stone-800 group-hover:text-jain-red transition-colors">
                        {getTrans(dict, 'cards.donation.title')}
                    </h3>
                    <p className="text-stone-600 font-light leading-relaxed text-base text-justify" dangerouslySetInnerHTML={{ __html: getTrans(dict, 'cards.donation.desc') }} />
                </div>
            </div>
        </section>
    );
}
