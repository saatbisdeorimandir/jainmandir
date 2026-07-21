export type Lang = 'en' | 'hi';

export interface BilingualText {
    en: string;
    hi: string;
}

export interface TrustMember {
    no: number;
    name: BilingualText | string;
    place: BilingualText | string;
}

export interface EventItem {
    id: number;
    image: string;
    titleKey: string;
    descKey: string;
    date: string;
}

export interface GalleryItem {
    src: string;
    altKey: string;
}

export interface GalleryEvent {
    id: string;
    nameKey: string;
    date?: string;
    descriptionKey: string;
    coverImage: string;
    isPermanent?: boolean;
}



export interface ContactInfo {
    nameKey: string;
    phone: string;
    email: string;
    addressKey: string;
}

export interface ExternalLink {
    id: string;
    url: string;
    labelKey: string;
    descKey: string;
    icon: string;
    isActive: boolean;
}

export interface LocationInfo {
    nameKey: string;
    embedUrl: string;
    directionsUrl: string;
    addressKey: string;
}

export interface InstagramPromoter {
    id: string;
    pageName: string;
    handle: string;
    url: string;
    avatar?: string;
    followers?: string;
    badge?: string;
    titleKey?: string;
    descKey?: string;
    postUrl?: string;
    isActive?: boolean;
}

export interface SiteConfig {
    general: {
        siteName: string;
        logoText: string;
        logo: string;
        themeColor: string;
    };
    contact: {
        mainContacts: ContactInfo[];
        otherContacts: ContactInfo[];
        information: {
            titleKey: string;
            items: { textKey: string; isActive: boolean }[];
        };
        disclaimer: {
            titleKey: string;
            textKey: string;
        };
        mapUrl?: string;
        locations: LocationInfo[];
    };
    trust: {
        committee: {
            nameKey: string;
            roleKey: string;
            image: string;
        }[];
    };
    externalLinks?: ExternalLink[];
    social: {
        facebook: string;
        instagram: string;
        youtube: string;
        twitter: string;
    };
    events: EventItem[];
    gallery: GalleryItem[];
    instagramPromoters?: InstagramPromoter[];
}

export interface PageConfig {
    navigation: {
        key: string;
        path: string;
    }[];
}
