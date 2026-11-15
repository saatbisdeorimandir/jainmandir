'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PageConfig, SiteConfig } from '@/lib/types';
import { getTrans, assetPath } from '@/lib/utils';
import { useExhibition } from '@/context/ExhibitionContext';
import { Search } from 'lucide-react';

interface NavbarProps {
    lang: string;
    dict: any;
    pagesConfig: PageConfig;
    siteConfig: SiteConfig;
}

export default function Navbar({ lang, dict, pagesConfig, siteConfig }: NavbarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { openCurator } = useExhibition();
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
        <nav className={`sticky top-0 z-50 transition-all duration-500 border-b ${scrolled ? 'navbar-glass border-mewar-crimson/20 shadow-md shadow-black/5' : 'navbar-solid border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            href={`/${lang}`}
                            className="text-base sm:text-lg font-heading font-bold text-exhibit-fg flex items-center gap-2.5 group"
                        >
                            <img
                                src={assetPath(siteConfig.general.logo)}
                                alt="Logo"
                                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="hidden sm:inline transition-colors duration-300 group-hover:text-mewar-crimson tracking-wide">
                                {getTrans(dict, 'site_name')}
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-5">
                        {navItems.map((item, i) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                style={{ animationDelay: `${i * 60}ms` }}
                                className={`nav-link text-xs lg:text-sm font-sans font-semibold transition-colors duration-300 animate-nav-slide tracking-wider uppercase
                                    ${isActive(item.href) ? 'text-mewar-crimson font-bold active' : 'text-exhibit-fg/80 hover:text-mewar-crimson'}`}
                            >
                                {getTrans(dict, item.key)}
                            </Link>
                        ))}

                        {/* Search / Curator trigger */}
                        <button
                            onClick={openCurator}
                            className="p-2 rounded-full border border-mewar-brass/40 hover:border-mewar-crimson text-exhibit-fg bg-white dark:bg-mewar-basalt/60 transition-all flex items-center gap-1.5 shadow-sm"
                            title="Open Exhibition Guide (Cmd+K)"
                            aria-label="Open Exhibition Guide"
                        >
                            <Search className="w-3.5 h-3.5 text-mewar-brass" />
                            <span className="text-[10px] font-mono font-bold text-mewar-crimson hidden lg:inline">⌘K</span>
                        </button>

                        <button
                            onClick={toggleLang}
                            className="border-2 border-mewar-crimson/40 hover:border-mewar-crimson text-mewar-crimson bg-white dark:bg-mewar-basalt/80 px-4 py-1.5 rounded-full text-xs font-sans font-bold hover:shadow-md transition-all duration-300 tracking-wider"
                        >
                            🌐 {getTrans(dict, 'buttons.lang')}
                        </button>
                    </div>

                    {/* Mobile controls */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={openCurator}
                            className="p-2 rounded-lg border border-exhibit-hairline text-exhibit-muted hover:text-exhibit-fg"
                            aria-label="Search"
                        >
                            <Search className="w-4 h-4 text-exhibit-gold" />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-exhibit-muted hover:text-exhibit-fg focus:outline-none p-2 rounded-lg hover:bg-exhibit-elevated transition-all duration-300"
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
                <div className="bg-exhibit-surface/98 backdrop-blur-xl border-t border-royal-gold/20 px-4 pt-3 pb-5 space-y-1">
                    {navItems.map((item, i) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-sm font-cinzel font-semibold transition-all duration-300 tracking-wide
                                ${isActive(item.href)
                                    ? 'text-mewar-crimson bg-mewar-crimson/10 font-bold'
                                    : 'text-exhibit-fg/80 hover:text-mewar-crimson hover:bg-mewar-crimson/5'}`}
                            style={{ transitionDelay: isOpen ? `${i * 40}ms` : '0ms' }}
                        >
                            {getTrans(dict, item.key)}
                        </Link>
                    ))}
                    <button
                        onClick={toggleLang}
                        className="w-full mt-2 border-2 border-mewar-crimson/30 text-mewar-crimson bg-white dark:bg-mewar-basalt/80 px-4 py-3 rounded-xl text-sm font-sans font-bold text-left hover:border-mewar-crimson transition-colors tracking-wide"
                    >
                        🌐 {getTrans(dict, 'buttons.lang')}
                    </button>
                </div>
            </div>
        </nav>
    );
}
