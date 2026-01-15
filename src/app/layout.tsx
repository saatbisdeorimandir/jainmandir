import type { Metadata } from 'next';
import { Inter, Poppins, Rozha_One } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['devanagari', 'latin'],
    variable: '--font-poppins',
    display: 'swap',
});

const rozha = Rozha_One({
    weight: ['400'],
    subsets: ['devanagari', 'latin'],
    variable: '--font-rozha',
    display: 'swap',
});



export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html className={`${inter.variable} ${poppins.variable} ${rozha.variable}`} suppressHydrationWarning>
            <body className="font-sans antialiased text-stone-gray" suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
