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
    driveFolderId: string;
    coverImage: string;
    isPermanent?: boolean;
}

export interface DriveImage {
    id: string;
    name: string;
    thumbnailLink: string;
    webContentLink: string;
}


export interface ContactInfo {
    nameKey: string;
    phone: string;
    email: string;
    addressKey: string;
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
        mapUrl: string;
    };
    trust: {
        committee: {
            nameKey: string;
            roleKey: string;
            image: string;
        }[];
    };
    social: {
        facebook: string;
        instagram: string;
        youtube: string;
        twitter: string;
    };
    events: EventItem[];
    gallery: GalleryItem[];
}

export interface PageConfig {
    navigation: {
        key: string;
        path: string;
    }[];
}
