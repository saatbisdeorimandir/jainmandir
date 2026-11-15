import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ['class', '[data-exhibit-theme="nocturnal"]'],
    theme: {
        extend: {
            colors: {
                'jain-orange': '#FF9933',
                'jain-yellow': '#FFCC00',
                'jain-red': '#D32F2F',
                'peace-white': '#F9FAFB',
                'stone-gray': '#333333',
                exhibit: {
                    bg: 'var(--exhibit-bg)',
                    surface: 'var(--exhibit-surface)',
                    elevated: 'var(--exhibit-surface-elevated)',
                    fg: 'var(--exhibit-fg)',
                    muted: 'var(--exhibit-muted)',
                    gold: 'var(--exhibit-gold)',
                    'gold-glow': 'var(--exhibit-gold-glow)',
                    border: 'var(--exhibit-border)',
                    hairline: 'var(--exhibit-hairline)',
                    terracotta: 'var(--exhibit-terracotta)',
                    overlay: 'var(--exhibit-overlay)',
                },
                mewar: {
                    crimson: '#8B1E14',
                    'crimson-deep': '#6A130C',
                    'crimson-light': '#B91C1C',
                    sandstone: '#F5EDE4',
                    'sandstone-elevated': '#EFE4D6',
                    'sandstone-dark': '#E5D7C5',
                    brass: '#C5921E',
                    'brass-light': '#E8C55E',
                    'brass-deep': '#9A7012',
                    basalt: '#150C0A',
                    charcoal: '#1F1614',
                },
                royal: {
                    gold: '#C5921E',
                    'gold-light': '#E8C55E',
                    'gold-deep': '#9A7012',
                    ivory: '#FFFDF9',
                    marble: '#FFFFFF',
                    sandstone: '#F5EDE4',
                    basalt: '#150C0A',
                    saffron: '#D97706',
                    crimson: '#8B1E14',
                }
            },
            fontFamily: {
                sans: ['var(--font-outfit)', 'var(--font-mukta)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                heading: ['var(--font-cormorant)', 'var(--font-yatra)', 'var(--font-noto-devanagari)', 'serif'],
                cormorant: ['var(--font-cormorant)', 'serif'],
                outfit: ['var(--font-outfit)', 'sans-serif'],
                mukta: ['var(--font-mukta)', 'sans-serif'],
                yatra: ['var(--font-yatra)', 'cursive', 'serif'],
                notoDevanagari: ['var(--font-noto-devanagari)', 'serif'],
                tiro: ['var(--font-yatra)', 'var(--font-noto-devanagari)', 'serif'],
                cinzel: ['var(--font-cormorant)', 'serif'],
                jakarta: ['var(--font-outfit)', 'var(--font-mukta)', 'sans-serif'],
                poppins: ['var(--font-outfit)', 'var(--font-mukta)', 'sans-serif'],
                grotesque: ['var(--font-cormorant)', 'var(--font-yatra)', 'serif'],
                serifEditorial: ['var(--font-cormorant)', 'var(--font-yatra)', 'var(--font-noto-devanagari)', 'Georgia', 'serif'],
            },
            letterSpacing: {
                'monumental': '-0.04em',
                'editorial': '0.18em',
                'widest-editorial': '0.28em',
            },
            lineHeight: {
                'monumental': '0.88',
                'tight-editorial': '1.05',
                'relaxed-tight': '1.3',
            },
            borderWidth: {
                'hairline': '0.5px',
            }
        },
    },
    plugins: [],
};
export default config;
