'use client';

interface LoadingSpinnerProps {
    className?: string;
}

export default function LoadingSpinner({ className = "h-12 w-12" }: LoadingSpinnerProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="relative">
                {/* Outer Ring */}
                <div className="w-12 h-12 rounded-full border-4 border-jain-orange/20"></div>
                {/* Spinning Ring */}
                <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-t-jain-orange animate-spin"></div>
                {/* Inner Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-jain-orange rounded-full animate-pulse"></div>
            </div>
        </div>
    );
}
