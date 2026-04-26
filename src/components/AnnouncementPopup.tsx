'use client';

import { useState, useEffect } from 'react';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import Image from 'next/image';
import { getTrans } from '@/lib/utils';

const SESSION_KEY = 'announcement-popup-shown';

interface AnnouncementPopupProps {
    dict?: any;
}

export default function AnnouncementPopup({ dict }: AnnouncementPopupProps) {
    const { announcements, loading } = useAnnouncements();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && announcements.length > 0) {
            // Check if already shown in this session
            const alreadyShown = sessionStorage.getItem(SESSION_KEY);
            if (!alreadyShown) {
                setIsVisible(true);
            }
        }
    }, [loading, announcements]);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem(SESSION_KEY, 'true');
    };

    if (loading || !isVisible || announcements.length === 0) return null;

    return (
        <>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                <div 
                    className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-all border border-white/20 group"
                        aria-label="Close Announcement"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <div className="max-h-[85vh] overflow-y-auto custom-scrollbar p-6">
                        {announcements.map((announcement, index) => (
                            <div key={announcement.public_id} className={index > 0 ? "mt-8" : ""}>
                                <div 
                                    className="relative w-full aspect-[4/5] sm:aspect-video bg-gray-50 cursor-zoom-in rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                                    onClick={() => setSelectedImg(announcement.url)}
                                >
                                    <Image
                                        src={announcement.url}
                                        alt="Announcement"
                                        fill
                                        className="object-contain p-2"
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        priority
                                        unoptimized
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="p-4 bg-stone-50 text-center">
                        <button 
                            onClick={handleClose}
                            className="px-8 py-2.5 bg-rozha-gold hover:bg-gold-dark text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95"
                            style={{ backgroundColor: '#B8860B' }} /* Using a fallback gold if variable not defined */
                        >
                            {getTrans(dict, 'buttons.got_it') || 'Got it'}
                        </button>
                    </div>
                </div>
                
                {/* Background click to close */}
                <div className="absolute inset-0 -z-10" onClick={handleClose} />
            </div>

            {/* Lightbox Modal */}
            {selectedImg && (
                <div
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-95 transition-opacity animate-in fade-in duration-200"
                    onClick={() => setSelectedImg(null)}
                >
                    <button className="absolute top-6 right-6 text-white hover:text-jain-orange transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div className="relative max-w-[95vw] max-h-[95vh] w-full h-full flex items-center justify-center p-4">
                        <img
                            src={selectedImg}
                            alt="Announcement Full View"
                            className="max-w-full max-h-full object-contain rounded shadow-2xl animate-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
