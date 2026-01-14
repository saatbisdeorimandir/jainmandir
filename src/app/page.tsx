'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
    const router = useRouter();

    useEffect(() => {
        // Check local storage or browser preference
        const storedLang = localStorage.getItem('site_lang');
        if (storedLang === 'hi') {
            router.replace('/hi');
        } else {
            router.replace('/en');
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );
}
