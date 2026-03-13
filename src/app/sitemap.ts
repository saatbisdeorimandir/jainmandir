import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.saatbeesdeorimandir.co.in';
    const languages = ['en', 'hi'];
    const routes = ['', '/about', '/history', '/gallery', '/events', '/contact', '/trust'];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    languages.forEach((lang) => {
        routes.forEach((route) => {
            sitemapEntries.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
