import Link from 'next/link';
import { SiteConfig } from '@/lib/types';
import { getTrans } from '@/lib/utils';

// Icons as components for cleaner usage
const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
);
const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.047-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 4.123-.06h.08zm3.543.375c-1.041-.05-1.356-.06-3.875-.06s-2.834.01-3.875.06c-1.01.045-1.57.204-1.94.348-.48.192-.818.423-1.152.757-.334.335-.565.674-.757 1.153-.144.37-.303.93-.348 1.94-.05 1.041-.06 1.356-.06 3.875s.01 2.834.06 3.875c.045 1.01.204 1.57.348 1.94.192.48.423.818.757 1.152.335.334.674.565 1.153.757.37.144.93.303 1.94.348 1.04.05 1.355.06 3.875.06s2.834-.01 3.875-.06c1.01-.045 1.57-.204 1.94-.348.48-.192.818-.423 1.152-.757.335-.335.565-.674.757-1.153.144-.37.303-.93.348-1.94.05-1.04.06-1.356.06-3.875s-.01-2.834-.06-3.875c-.045-1.01-.204-1.57-.348-1.94-.192-.48-.423-.818-.757-1.152-.334-.335-.565-.674-1.153-.757-.37-.144-.93-.303-1.94-.348zM12 5.688a6.313 6.313 0 100 12.625 6.313 6.313 0 000-12.625zm0 11.23a4.918 4.918 0 110-9.836 4.918 4.918 0 010 9.836zM17.43 5.48a1.09 1.09 0 11-2.18 0 1.09 1.09 0 012.18 0z" clipRule="evenodd" /></svg>
);
const TwitterIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
);
const YoutubeIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.254.418-4.813a2.504 2.504 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM15.194 12 10 15V9l5.194 3z" clipRule="evenodd" /></svg>
);

interface FooterProps {
    dict: any;
    siteConfig: SiteConfig;
}

export default function Footer({ dict, siteConfig }: FooterProps) {
    const getIcon = (key: string) => {
        const k = key.toLowerCase();
        if (k === 'facebook') return <FacebookIcon />;
        if (k === 'instagram') return <InstagramIcon />;
        if (k === 'twitter') return <TwitterIcon />;
        if (k === 'youtube') return <YoutubeIcon />;
        return key;
    };

    return (
        <footer className="bg-stone-gray text-white py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
                        {getTrans(dict, 'site_name')}
                    </h3>
                    <p className="text-gray-300 text-sm">{getTrans(dict, 'footer.text')}</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">{getTrans(dict, 'footer.social')}</h3>
                    <div className="flex justify-center md:justify-start space-x-4">
                        {Object.entries(siteConfig.social).map(([key, url]) => (
                            <a
                                key={key}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label={key}
                            >
                                {getIcon(key)}
                            </a>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">{getTrans(dict, 'footer.contact')}</h3>
                    {siteConfig.contact.mainContacts.length > 0 && (
                        <>
                            <p className="text-gray-300 text-sm mb-2">{siteConfig.contact.mainContacts[0].phone}</p>
                            <p className="text-gray-300 text-sm">{getTrans(dict, siteConfig.contact.mainContacts[0].addressKey)}</p>
                        </>
                    )}
                </div>
            </div>
        </footer>
    );
}
