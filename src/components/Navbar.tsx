'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PageConfig, SiteConfig } from '@/lib/types';
import { getTrans } from '@/lib/utils';

interface NavbarProps {
    lang: string;
    dict: any;
    pagesConfig: PageConfig;
    siteConfig: SiteConfig;
}

export default function Navbar({ lang, dict, pagesConfig, siteConfig }: NavbarProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleLang = () => {
        const newLang = lang === 'en' ? 'hi' : 'en';
        localStorage.setItem('site_lang', newLang);
        // Get current path without lang prefix
        const pathParts = window.location.pathname.split('/');
        // pathParts[0] is empty, [1] is 'en' or 'hi', [2...] is rest
        const restPath = pathParts.slice(2).join('/');
        router.push(`/${newLang}/${restPath}`);
    };

    const navItems = pagesConfig.navigation.map((item) => {
        // Convert 'index.html' -> '', 'about.html' -> 'about'
        const route = item.path === 'index.html' ? '' : item.path.replace('.html', '');
        const href = `/${lang}/${route}`;
        return { ...item, href };
    });

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href={`/${lang}`} className="text-2xl font-bold text-jain-orange flex items-center gap-2">
                            {/* Note: In real app, optimize image with Next/Image */}
                            <img src={`${siteConfig.general.logo}`} alt="Logo" className="h-10 w-auto" />
                            <span>{getTrans(dict, 'site_name')}</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className="text-gray-600 hover:text-jain-orange transition-colors"
                            >
                                {getTrans(dict, item.key)}
                            </Link>
                        ))}
                        <button
                            onClick={toggleLang}
                            className="bg-gradient-to-r from-jain-orange to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            🌐 {getTrans(dict, 'buttons.lang')}
                        </button>
                    </div>
                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-500 hover:text-gray-900 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                        {navItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-jain-orange"
                            >
                                {getTrans(dict, item.key)}
                            </Link>
                        ))}
                        <button
                            onClick={toggleLang}
                            className="block w-full text-left px-3 py-2 text-jain-orange font-bold"
                        >
                            🌐 {getTrans(dict, 'buttons.lang')}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
