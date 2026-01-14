import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'jain-orange': '#FF9933',
                'jain-yellow': '#FFCC00',
                'jain-red': '#D32F2F',
                'peace-white': '#F9FAFB',
                'stone-gray': '#333333', // Slightly darker for better readability
            },
            fontFamily: {
                sans: ['var(--font-poppins)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                heading: ['var(--font-rozha)', 'serif'],
                poppins: ['var(--font-poppins)', 'sans-serif'],
            },
            lineHeight: {
                'relaxed-tight': '1.3',
            }
        },
    },
    plugins: [],
};
export default config;
