# Jain Mandir Codebase Architecture & Token Footprint Map

This document maps all routes, UI components, content dictionaries, and their approximate token weights so agents can navigate directly to the required file without broad scans.

## 1. High-Density Components (Caution: Heavy Token Reads)

These components contain embedded datasets (timelines, quotes, bilingual content). **Never read the entire file if modifying one section.** Run `node .agents/skills/token-efficiency/scripts/scan-component.mjs <file>` first.

| Component | Path | Lines | Size (KB) | Key Sections |
| :--- | :--- | :--- | :--- | :--- |
| **MultiChapterExhibition** | `src/components/MultiChapterExhibition.tsx` | ~400 | ~18.5 | • The 3 Chronicles (Genesis, 27 Shrines, Living Heritage)<br>• GSAP transitions & architectural plates |
| **CuratorDrawer** | `src/components/CuratorDrawer.tsx` | ~280 | ~11.2 | • Command Palette (`Cmd+K`) & quick fuzzy search<br>• Theme switcher & sacred audio controls |
| **ExhibitionDock** | `src/components/ExhibitionDock.tsx` | ~130 | ~5.2 | • Floating exhibition status pill & quick shortcuts |
| **FortNavigationMap** | `src/components/FortNavigationMap.tsx` | ~270 | ~11.8 | • Interactive fort waypoints & pilgrim GPS navigation<br>• Ram Pol, Padan Pol, parking & Dharamshala desk |
| **HistorySection** | `src/components/HistorySection.tsx` | ~390 | ~33.5 | • L17-L88: Hindi timeline data<br>• L91-L162: English timeline data<br>• L164-L265: Temples & monument records<br>• L266-L390: JSX layout & sections |
| **ContactSection** | `src/components/ContactSection.tsx` | ~307 | ~23.8 | • Form controls & validation<br>• Temple address & trust office contacts<br>• Bank account & donation details |
| **AboutSection** | `src/components/AboutSection.tsx` | ~321 | ~21.6 | • Significance of 27 Deoris (temples)<br>• Historical context and architectural descriptions |
| **InstagramPromoters** | `src/components/InstagramPromotersSection.tsx` | ~192 | ~19.5 | • Embedded creator profiles, handles, quotes, and video links |
| **TrustComponents** | `src/components/TrustComponents.tsx` | ~273 | ~15.8 | • Board member card layouts & role mappings |
| **EventGalleryGrid** | `src/components/EventGalleryGrid.tsx` | ~176 | ~9.9 | • Cloudinary/Google Drive image grids & lightbox |

---

## 2. Multilingual Content Dictionaries (`src/content/`)

All static UI copy is centralized here. Use `node .agents/skills/token-efficiency/scripts/json-tool.mjs get <file> <key>` instead of dumping the file.

| File | Size (KB) | Devanagari Token Multiplier | Purpose |
| :--- | :--- | :--- | :--- |
| `src/content/en.json` | 16.0 KB | 1.0x (~4k tokens) | English UI strings for navbar, hero, sections, footer |
| `src/content/hi.json` | 28.2 KB | 2.5x-3x (~14k-18k tokens) | Hindi UI strings (UTF-8 multi-byte Devanagari) |
| `src/content/site-config.json` | 5.5 KB | 1.0x (~1.2k tokens) | Social links, phone numbers, email, analytics IDs |
| `src/content/trust-members.json`| 4.2 KB | 1.2x (~1k tokens) | Trust committee members list |
| `src/content/gallery-events.json`| 0.6 KB | 1.0x (<200 tokens) | Event categories for photo galleries |

---

## 3. Route Structure (App Router)

All pages are located under `src/app/[lang]/` where `[lang]` is dynamically resolved (`en` or `hi`):

- `src/app/[lang]/page.tsx`: Home page (mounts `Hero`, `HomeFeatures`, `AnnouncementSlideshow`, etc.)
- `src/app/[lang]/about/page.tsx`: About page (mounts `AboutSection`)
- `src/app/[lang]/history/page.tsx`: History page (mounts `HistorySection`)
- `src/app/[lang]/events/page.tsx`: Events page (mounts `EventsSection`)
- `src/app/[lang]/gallery/page.tsx`: Gallery page (mounts `GallerySection`, `DynamicGallery`)
- `src/app/[lang]/trust/page.tsx`: Trust & Committee page (mounts `TrustSection`)
- `src/app/[lang]/contact/page.tsx`: Contact & Stay booking page (mounts `ContactSection`, `StaySection`)

---

## 4. Blacklisted Directories (Never Recursively Scan)

Do not run directory-wide searches or list operations without excluding these folders:
- `.next/`: Next.js build cache and transpiled bundles
- `out/`: Static site export output (contains duplicate inline HTML)
- `node_modules/`: Package dependencies
- `public/`: 100+ MB of static media/images
- `tsconfig.tsbuildinfo`: Monolithic TypeScript cache file

