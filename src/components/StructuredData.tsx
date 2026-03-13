'use client';

import { getTrans } from '@/lib/utils';

interface StructuredDataProps {
    dict: any;
    siteConfig: any;
    lang: string;
}

export default function StructuredData({ dict, siteConfig, lang }: StructuredDataProps) {
    const baseUrl = 'https://www.saatbeesdeorimandir.co.in';
    const siteName = getTrans(dict, 'site_name');
    const description = getTrans(dict, 'hero.subtitle');
    const address = getTrans(dict, 'contact.main.address');
    const phone = siteConfig.contact.mainContacts[0].phone;
    
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ReligiousOrganization",
        "name": siteName,
        "description": description,
        "url": `${baseUrl}/${lang}`,
        "logo": `${baseUrl}${siteConfig.general.logo}`,
        "image": `${baseUrl}${siteConfig.general.logo}`,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": address,
            "addressLocality": "Chittorgarh",
            "addressRegion": "Rajasthan",
            "addressCountry": "IN"
        },
        "telephone": phone,
        "openingHours": "Mo-Su 05:00-22:00",
        "sameAs": [
            siteConfig.social.facebook,
            siteConfig.social.instagram,
            siteConfig.social.youtube,
            siteConfig.social.twitter
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
