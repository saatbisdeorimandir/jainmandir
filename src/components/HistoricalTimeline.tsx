interface TimelineEvent {
    year: string;
    title: string;
    description: string;
}

interface HistoricalTimelineProps {
    events: TimelineEvent[];
}

export default function HistoricalTimeline({ events }: HistoricalTimelineProps) {
    return (
        <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-jain-orange via-amber-400 to-jain-orange" />

            {/* Timeline Events */}
            <div className="space-y-8 md:space-y-12">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                            } flex-col md:gap-8`}
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-4 md:left-1/2 w-8 h-8 -ml-4 bg-jain-orange rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>

                        {/* Content Card */}
                        <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                            <div className="bg-white p-6 rounded-lg shadow-md border border-stone-100 hover:shadow-xl transition-shadow duration-300">
                                <div className="text-jain-orange font-bold text-lg mb-2">
                                    {event.year}
                                </div>
                                <h3 className="font-heading font-bold text-stone-gray text-xl mb-2">
                                    {event.title}
                                </h3>
                                <p className="text-stone-600 text-sm leading-relaxed">
                                    {event.description}
                                </p>
                            </div>
                        </div>

                        {/* Spacer for alternating layout */}
                        <div className="hidden md:block w-5/12" />
                    </div>
                ))}
            </div>
        </div>
    );
}
