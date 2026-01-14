import { Lang } from './types';

// Helper to resolve nested keys like "hero.title"
export function getTrans(dict: any, key: string): string {
    if (!dict) return key;
    return key.split('.').reduce((acc, part) => acc && acc[part], dict) || key;
}

export function getBilingualAuth(obj: any, lang: Lang): string {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['en'] || '';
}

export function assetPath(path: string): string {
    const isProd = process.env.NODE_ENV === 'production';
    const basePath = isProd ? '/jainmandir' : '';
    if (!path.startsWith('/')) return path;
    // Prevent double slash if basePath ends with / or path starts with /
    return `${basePath}${path}`;
}
