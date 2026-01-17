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
            className="bg-white rounded-lg border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg md:text-xl font-heading font-bold text-stone-gray flex-1 pr-4">
                        {title}
                    </h3>
                    {period && (
                        <span className="bg-jain-orange/10 text-jain-orange px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                            {period}
                        </span>
                    )}
                </div>

                {/* Summary */}
                <p className="text-stone-600 text-sm leading-relaxed mb-4 text-justify">
                    {summary}
                </p>

                {/* Expandable Details */}
                {details && (
                    <>
                        {isExpanded && (
                            <div className="text-stone-700 text-sm leading-relaxed mb-4 pt-4 border-t border-stone-100 whitespace-pre-line text-justify">
                                {details}
                            </div>
                        )}

                        {/* Toggle Button */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-jain-orange hover:text-amber-600 text-sm font-semibold flex items-center gap-2 transition-colors"
                        >
                            {isExpanded ? '− Read Less' : '+ Read More'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
