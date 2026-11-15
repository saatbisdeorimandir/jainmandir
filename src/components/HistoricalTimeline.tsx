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
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-mewar-crimson via-mewar-brass to-mewar-crimson" />

            {/* Timeline Events */}
            <div className="space-y-8 md:space-y-12">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                            } flex-col md:gap-8`}
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-4 md:left-1/2 w-8 h-8 -ml-4 bg-white dark:bg-[#1E1210] rounded-full border-2 border-mewar-crimson shadow-md z-10 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-mewar-crimson rounded-full" />
                        </div>

                        {/* Content Card */}
                        <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                            <div className="bg-white dark:bg-[#1E1210] p-6 md:p-7 rounded-2xl shadow-sm hover:shadow-md border-2 border-mewar-crimson/20 hover:border-mewar-crimson transition-all duration-300 group">
                                <div className="text-mewar-crimson font-sans font-bold text-sm sm:text-base tracking-wider mb-2">
                                    {event.year}
                                </div>
                                <h3 className="font-heading font-bold text-mewar-crimson text-lg md:text-xl mb-2 group-hover:text-mewar-crimson-deep transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-exhibit-fg/85 text-sm sm:text-base leading-relaxed font-sans">
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
