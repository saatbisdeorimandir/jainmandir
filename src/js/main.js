document.addEventListener('DOMContentLoaded', async () => {
    // --- State ---
    let currentLang = localStorage.getItem('site_lang') || 'hi';
    let content = {}; // Will hold { en: {...}, hi: {...} }
    let siteConfig = {};
    let pagesConfig = {};

    // --- References ---
    const navbarContainer = document.getElementById('navbar-container');
    const footerContainer = document.getElementById('footer-container');

    // --- Initialization ---
    try {
        await loadData();
        renderLayout();
        updateLanguage(currentLang);
        renderDynamicComponents();
    } catch (error) {
        console.error("Failed to initialize site:", error);
    }

    // --- Core Functions ---

    async function loadData() {
        const [configRes, pagesRes, enRes, hiRes] = await Promise.all([
            fetch('content/site-config.json'),
            fetch('content/pages.json'),
            fetch('content/en.json'),
            fetch('content/hi.json')
        ]);

        siteConfig = await configRes.json();
        pagesConfig = await pagesRes.json();
        content['en'] = await enRes.json();
        content['hi'] = await hiRes.json();
    }

    function renderLayout() {
        renderNavbar();
        renderFooter();
        renderContactInfo();
    }

    function renderNavbar() {
        // Find current page to highlight
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        const navItems = pagesConfig.navigation.map(item => {
            const isActive = item.path === currentPage;
            const activeClass = isActive ? 'text-jain-orange font-bold' : 'text-gray-600 hover:text-jain-orange';
            return `<a href="${item.path}" class="nav-link ${activeClass} transition-colors" data-key="${item.key}">Loading...</a>`;
        }).join('');

        const html = `
        <nav class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="index.html" class="text-2xl font-bold text-jain-orange flex items-center gap-2">
                             <img src="${siteConfig.general.logo}" alt="Logo" class="h-10 w-auto"> <span data-key="site_name">${siteConfig.general.siteName}</span>
                        </a>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        ${navItems}
                        <button id="lang-toggle" class="bg-orange-100 text-jain-orange px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-200 transition">
                            🌐 <span data-key="btn_lang">Lang</span>
                        </button>
                    </div>
                     <!-- Mobile menu button placeholder (simplified) -->
                    <div class="flex items-center md:hidden">
                        <button id="mobile-menu-btn" class="text-gray-500 hover:text-gray-900 focus:outline-none">
                            <svg class="h-6 w-6" fill="none" class="h-6 w-6" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                    ${navItems.replace(/class="nav-link/g, 'class="mobile-nav-link block px-3 py-2 rounded-md text-base font-medium')}
                     <button id="mobile-lang-toggle" class="block w-full text-left px-3 py-2 text-jain-orange font-bold">
                        🌐 <span data-key="btn_lang">Lang</span>
                    </button>
                </div>
            </div>
        </nav>
        `;
        navbarContainer.innerHTML = html;

        // Event Listeners
        document.getElementById('lang-toggle').onclick = toggleLanguage;
        if (document.getElementById('mobile-lang-toggle')) document.getElementById('mobile-lang-toggle').onclick = toggleLanguage;

        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuBtn.onclick = () => {
            mobileMenu.classList.toggle('hidden');
        };
    }

    function renderFooter() {
        const html = `
        <footer class="bg-stone-gray text-white py-12 mt-12">
            <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                     <h3 class="text-xl font-bold mb-4" data-key="site_name">${siteConfig.general.siteName}</h3>
                     <p class="text-gray-300 text-sm" data-key="footer_text">Loading...</p>
                </div>
                <div>
                    <h3 class="text-xl font-bold mb-4" data-key="footer_social">Social</h3>
                    <div class="flex justify-center md:justify-start space-x-4">
                        ${Object.entries(siteConfig.social).map(([key, url]) => {
            const icons = {
                facebook: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>',
                instagram: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.047-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.407-.06 4.123-.06h.08zm3.543.375c-1.041-.05-1.356-.06-3.875-.06s-2.834.01-3.875.06c-1.01.045-1.57.204-1.94.348-.48.192-.818.423-1.152.757-.334.335-.565.674-.757 1.153-.144.37-.303.93-.348 1.94-.05 1.041-.06 1.356-.06 3.875s.01 2.834.06 3.875c.045 1.01.204 1.57.348 1.94.192.48.423.818.757 1.152.335.334.674.565 1.153.757.37.144.93.303 1.94.348 1.04.05 1.355.06 3.875.06s2.834-.01 3.875-.06c1.01-.045 1.57-.204 1.94-.348.48-.192.818-.423 1.152-.757.335-.335.565-.674.757-1.153.144-.37.303-.93.348-1.94.05-1.04.06-1.356.06-3.875s-.01-2.834-.06-3.875c-.045-1.01-.204-1.57-.348-1.94-.192-.48-.423-.818-.757-1.152-.334-.335-.565-.674-1.153-.757-.37-.144-.93-.303-1.94-.348zM12 5.688a6.313 6.313 0 100 12.625 6.313 6.313 0 000-12.625zm0 11.23a4.918 4.918 0 110-9.836 4.918 4.918 0 010 9.836zM17.43 5.48a1.09 1.09 0 11-2.18 0 1.09 1.09 0 012.18 0z" clip-rule="evenodd" /></svg>',
                twitter: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>',
                youtube: '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.254.418-4.813a2.504 2.504 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM15.194 12 10 15V9l5.194 3z" clip-rule="evenodd" /></svg>'
            };
            return `<a href="${url}" target="_blank" class="text-gray-400 hover:text-white transition-colors" aria-label="${key}">
                                ${icons[key.toLowerCase()] || key}
                            </a>`;
        }).join('')}
                    </div>
                </div>
                 <div>
                    <h3 class="text-xl font-bold mb-4" data-key="footer_contact">Contact</h3>
                     <p class="text-gray-300 text-sm mb-2">${siteConfig.contact.email}</p>
                     <p class="text-gray-300 text-sm">${siteConfig.contact.address}</p>
                </div>
            </div>
        </footer>
        `;
        footerContainer.innerHTML = html;
    }

    function renderContactInfo() {
        const addrEl = document.getElementById('contact-address');
        const emailEl = document.getElementById('contact-email');
        const mapFrame = document.getElementById('map-frame');

        if (addrEl) addrEl.textContent = siteConfig.contact.address;
        if (emailEl) {
            emailEl.textContent = siteConfig.contact.email;
            emailEl.href = `mailto:${siteConfig.contact.email}`;
        }
        if (mapFrame) mapFrame.src = siteConfig.contact.mapUrl;
    }

    // --- Dynamic Content Rendering (Pages) ---

    function renderDynamicComponents() {
        // Gallery
        const galleryGrid = document.getElementById('gallery-grid');
        if (galleryGrid) {
            galleryGrid.innerHTML = siteConfig.gallery.map(img => `
                <div class="group relative overflow-hidden rounded-xl shadow-md h-64">
                    <img src="${img.src}" alt="Gallery Image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-end p-4">
                        <p class="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity" data-key="${img.altKey}">Image</p>
                    </div>
                </div>
            `).join('');
        }

        // Events
        const eventsList = document.getElementById('events-list');
        if (eventsList) {
            eventsList.innerHTML = siteConfig.events.map(evt => `
                <div class="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                    <div class="md:w-1/3 h-48 md:h-auto">
                        <img src="${evt.image}" class="w-full h-full object-cover" alt="Event">
                    </div>
                    <div class="p-6 md:w-2/3 flex flex-col justify-center">
                        <div class="text-sm text-jain-orange font-bold uppercase tracking-wide mb-1">
                            <span data-key="event_date_label">Date:</span> ${evt.date}
                        </div>
                        <h2 class="text-2xl font-bold mb-2 text-gray-800" data-key="${evt.titleKey}">Event Title</h2>
                        <p class="text-gray-600" data-key="${evt.descKey}">Description...</p>
                    </div>
                </div>
            `).join('');
        }

        // After rendering dynamic HTML, we must re-run text translation update to fill in the new data-keys
        updateText(currentLang);
    }

    // --- Language Logic ---

    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'hi' : 'en';
        localStorage.setItem('site_lang', currentLang);
        updateLanguage(currentLang);
    }

    function updateLanguage(lang) {
        // Update all elements with data-key
        updateText(lang);
        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    function updateText(lang) {
        const elements = document.querySelectorAll('[data-key]');
        const dict = content[lang];

        if (!dict) return;

        elements.forEach(el => {
            const key = el.getAttribute('data-key');
            if (dict[key]) {
                if (el.tagName === 'META') {
                    el.setAttribute('content', dict[key]);
                } else if (el.tagName === 'IMG') {
                    el.alt = dict[key];
                } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = dict[key];
                } else {
                    if (Array.isArray(dict[key])) {
                        el.innerHTML = dict[key].map(text => `<p class="mb-4">${text}</p>`).join('');
                    } else {
                        el.innerHTML = dict[key];
                    }
                }
            }
        });
    }
});
