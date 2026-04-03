'use client';

import Image from 'next/image';
import { assetPath } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';

interface PhotoCardProps {
    image: string;
    title: string;
    period: string;
    description: string;
    index: number;
}

export default function PhotoCard({ image, title, period, description, index }: PhotoCardProps) {
    const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`tilt-card group relative bg-white rounded-xl overflow-hidden shadow-md
                reveal ${isInView ? 'in-view' : ''}`}
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-stone-100">
                <Image
                    src={assetPath(image)}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 0.8s ease forwards',
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Period Badge */}
                <div className="absolute top-4 right-4 bg-jain-orange/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 group-hover:bg-jain-orange group-hover:shadow-lg group-hover:shadow-jain-orange/30">
                    {period}
                </div>

                {/* Hover Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white/90 text-xs font-light leading-relaxed line-clamp-2">{description}</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-stone-gray mb-3 group-hover:text-jain-orange transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light text-justify line-clamp-3">
                    {description}
                </p>
            </div>

            {/* Animated bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-jain-orange via-amber-400 to-jain-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
    );
}
