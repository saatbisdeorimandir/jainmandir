import fs from 'fs';
import path from 'path';
import { SiteConfig, PageConfig, TrustMember, Lang } from './types';

const contentDir = path.join(process.cwd(), 'src/content');

export async function getSiteConfig(): Promise<SiteConfig> {
    const filePath = path.join(contentDir, 'site-config.json');
    const file = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(file);
}

export async function getPagesConfig(): Promise<PageConfig> {
    const filePath = path.join(contentDir, 'pages.json');
    const file = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(file);
}

export async function getTrustMembers(): Promise<TrustMember[]> {
    const filePath = path.join(contentDir, 'trust-members.json');
    const file = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(file);
}

export async function getDictionary(lang: Lang) {
    const filePath = path.join(contentDir, `${lang}.json`);
    const file = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(file);
}
