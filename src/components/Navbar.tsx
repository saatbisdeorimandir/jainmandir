'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PageConfig, SiteConfig } from '@/lib/types';
import { getTrans, assetPath } from '@/lib/utils';

interface NavbarProps {
    lang: string;
    dict: any;
    pagesConfig: PageConfig;
    siteConfig: SiteConfig;
}

export default function Navbar({ lang, dict, pagesConfig, siteConfig }: NavbarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu on route change
    useEffect(() => { setIsOpen(false); }, [pathname]);

    const toggleLang = () => {
        const newLang = lang === 'en' ? 'hi' : 'en';
        localStorage.setItem('site_lang', newLang);
        const pathParts = pathname.split('/');
        const restPath = pathParts.slice(2).join('/');
        router.push(`/${newLang}/${restPath}`);
    };

    const navItems = pagesConfig.navigation.map((item) => {
        const href = `/${lang}${item.path ? `/${item.path}` : ''}`;
        return { ...item, href };
    });

    const isActive = (href: string) =>
        pathname === href || (href !== `/${lang}` && pathname.startsWith(href));

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'navbar-glass shadow-lg shadow-black/5' : 'navbar-solid'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            href={`/${lang}`}
                            className="text-xl font-bold text-jain-orange flex items-center gap-2 group"
                        >
                            <img
                                src={assetPath(siteConfig.general.logo)}
                                alt="Logo"
                                className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
                            />
                            <span className="hidden sm:inline transition-colors duration-300 group-hover:text-jain-red">
                                {getTrans(dict, 'site_name')}
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item, i) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                style={{ animationDelay: `${i * 60}ms` }}
                                className={`nav-link text-sm font-medium transition-colors duration-300 animate-nav-slide
                                    ${isActive(item.href) ? 'text-jain-orange active' : 'text-gray-600 hover:text-jain-orange'}`}
                            >
                                {getTrans(dict, item.key)}
                            </Link>
                        ))}
                        <button
                            onClick={toggleLang}
                            className="shimmer-btn bg-gradient-to-r from-jain-orange to-red-500 text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-jain-orange/30 hover:scale-105 transition-all duration-300 animate-nav-slide"
                            style={{ animationDelay: `${navItems.length * 60}ms` }}
                        >
                            🌐 {getTrans(dict, 'buttons.lang')}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-500 hover:text-jain-orange focus:outline-none p-2 rounded-lg hover:bg-jain-orange/5 transition-all duration-300"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-5 flex flex-col justify-between overflow-hidden">
                                <span className={`block h-0.5 bg-current rounded transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                                <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : ''}`} />
                                <span className={`block h-0.5 bg-current rounded transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[11px]' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white/95 backdrop-blur-xl border-t border-stone-100 px-4 pt-3 pb-5 space-y-1">
                    {navItems.map((item, i) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                                ${isActive(item.href)
                                    ? 'text-jain-orange bg-jain-orange/8 font-semibold'
                                    : 'text-gray-600 hover:text-jain-orange hover:bg-jain-orange/5'}`}
                            style={{ transitionDelay: isOpen ? `${i * 40}ms` : '0ms' }}
                        >
                            {getTrans(dict, item.key)}
                        </Link>
                    ))}
                    <button
                        onClick={toggleLang}
                        className="w-full mt-2 shimmer-btn bg-gradient-to-r from-jain-orange to-red-500 text-white px-4 py-3 rounded-xl text-sm font-bold text-left"
                    >
                        🌐 {getTrans(dict, 'buttons.lang')}
                    </button>
                </div>
            </div>
        </nav>
    );
}
