import Image from 'next/image';
import { assetPath } from '@/lib/utils';

interface PhotoCardProps {
    image: string;
    title: string;
    period: string;
    description: string;
    index: number;
}

export default function PhotoCard({ image, title, period, description, index }: PhotoCardProps) {
    return (
        <div
            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            style={{ animationDelay: `${index * 100}ms` }}
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
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Period Badge */}
                <div className="absolute top-4 right-4 bg-jain-orange/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                    {period}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-stone-gray mb-3 group-hover:text-jain-orange transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light text-justify">
                    {description}
                </p>
            </div>

            {/* Decorative Border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-jain-orange via-amber-500 to-jain-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>
    );
}
