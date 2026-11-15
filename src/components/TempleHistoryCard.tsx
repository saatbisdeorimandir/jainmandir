'use client';

import { useState } from 'react';

interface TempleHistoryCardProps {
    title: string;
    period?: string;
    summary: string;
    details: string;
    index: number;
}

export default function TempleHistoryCard({ title, period, summary, details, index }: TempleHistoryCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className="bg-white dark:bg-[#1E1210] rounded-2xl border-2 border-mewar-crimson/15 hover:border-mewar-crimson/50 shadow-sm hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="p-6 md:p-7">
                {/* Header */}
                <div className="flex items-start justify-between mb-3 gap-3">
                    <h3 className="text-lg md:text-xl font-heading font-bold text-mewar-crimson flex-1">
                        {title}
                    </h3>
                    {period && (
                        <span className="bg-mewar-crimson/10 text-mewar-crimson border border-mewar-crimson/25 px-3 py-1 rounded-full text-xs font-sans font-bold whitespace-nowrap">
                            {period}
                        </span>
                    )}
                </div>

                {/* Summary */}
                <p className="text-exhibit-fg/85 text-sm sm:text-base leading-relaxed mb-4 font-sans">
                    {summary}
                </p>

                {/* Expandable Details */}
                {details && (
                    <>
                        {isExpanded && (
                            <div className="text-exhibit-fg text-sm sm:text-base leading-relaxed mb-4 pt-4 border-t border-mewar-crimson/20 whitespace-pre-line font-sans">
                                {details}
                            </div>
                        )}

                        {/* Toggle Button */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-mewar-crimson hover:text-mewar-crimson-deep font-sans text-xs md:text-sm font-bold flex items-center gap-1.5 transition-colors"
                        >
                            {isExpanded ? '− विवरण संक्षेप करें / Read Less' : '+ और पढ़ें / Read More'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
