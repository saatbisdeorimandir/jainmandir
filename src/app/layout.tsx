import type { Metadata } from 'next';
import { Cormorant_Garamond, Outfit, Mukta, Yatra_One, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    variable: '--font-cormorant',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
});

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

const mukta = Mukta({
    subsets: ['devanagari', 'latin'],
    variable: '--font-mukta',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700', '800'],
});

const yatra = Yatra_One({
    weight: '400',
    subsets: ['devanagari', 'latin'],
    variable: '--font-yatra',
    display: 'swap',
});

const notoDevanagari = Noto_Serif_Devanagari({
    subsets: ['devanagari', 'latin'],
    variable: '--font-noto-devanagari',
    display: 'swap',
    weight: ['400', '600', '700', '800'],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html className={`${cormorant.variable} ${outfit.variable} ${mukta.variable} ${yatra.variable} ${notoDevanagari.variable}`} suppressHydrationWarning translate="no">
            <body className="font-sans antialiased text-exhibit-fg bg-exhibit-bg" suppressHydrationWarning>
                <Suspense fallback={null}>
                    <GoogleAnalytics />
                </Suspense>
                {children}
            </body>
        </html>
    );
}
