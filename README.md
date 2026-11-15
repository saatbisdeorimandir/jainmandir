# Shri Saat Bees Deori Jain Mandir (Chittorgarh Fort) — Official Website

A high-performance, multilingual, SEO-optimized sanctuary website for **Shri Shwetamber Jain Saat Bees Deori Fort Teerth Trust**, Chittorgarh, Rajasthan. Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and integrated with **Sveltia Git CMS** and **Cloudinary**.

- **Production Domain**: [https://www.saatbeesdeorimandir.co.in](https://www.saatbeesdeorimandir.co.in)
- **CMS Admin Portal**: [https://www.saatbeesdeorimandir.co.in/admin/](https://www.saatbeesdeorimandir.co.in/admin/)

---

## 📑 Table of Contents

1. [Architecture & Key Features](#-architecture--key-features)
2. [Managing Static Assets & Images](#-managing-static-assets--images)
3. [Cloudinary Setup & Dynamic Galleries](#-cloudinary-setup--dynamic-galleries)
4. [Google Analytics 4 (GA4) Integration](#-google-analytics-4-ga4-integration)
5. [Google Search Console & Technical SEO](#-google-search-console--technical-seo)
6. [Sveltia Content Management System (CMS)](#-sveltia-content-management-system-cms)
7. [Local Development & Deployment Runbook](#-local-development--deployment-runbook)

---

## 🌟 Architecture & Key Features

- **Static Site Generation (SSG)**: Statically exported via `output: 'export'` for sub-second page loads, zero server overhead, and automatic deployment to GitHub Pages.
- **Bilingual Internationalization (i18n)**: Native sub-path routing (`/en/` and `/hi/`) for Hindi and English, with localized typography:
  - English: *Cormorant Garamond* (headings) & *Outfit* (clean body).
  - Hindi: *Mukta*, *Yatra One*, and *Noto Serif Devanagari*.
- **Git-Based Headless CMS**: Sveltia CMS running at `/admin` commits changes directly to GitHub without requiring a backend database.
- **Dynamic Media Delivery**: Cloudinary CDN integration for high-resolution event albums, full-screen pan/zoom lens, and real-time announcement banners.
- **Schema.org Structured Data**: Pre-configured JSON-LD metadata for `PlaceOfWorship` and `JainTemple` for rich Google search cards.

---

## 📸 Managing Static Assets & Images

All persistent static images, logos, and documents are stored in the [`public/assets/images/`](file:///d:/Project/jainmandir/public/assets/images/) directory.

### Folder Structure
```text
public/assets/images/
├── about/           # Architecture, plinth carvings, mandir courtyard, logo emblem
│   ├── Jain_logo.jpg
│   ├── SathisDeori-Temple.jpg
│   ├── history-ancient.jpg
│   ├── history-architecture.jpg
│   ├── history-ceiling.jpg
│   ├── history-pillars.jpg
│   ├── history-sanctum.jpg
│   ├── history-sculptures.jpg
│   └── mandir_video.mp4
├── gallery/         # Permanent temple gallery photos (1.jpg to 6.jpg)
├── trust/           # Trust plaques & committee board photos (Trustees1.jpeg, Trustees2.jpeg)
└── events/          # Local festival and ceremony cover photos
```

### Steps to Replace or Add Static Images

1. **Optimize Your File First**:
   - Format: WebP or JPG.
   - Dimensions: Max 1920px width (hero/galleries) or 400x400px (emblems/avatars).
   - File Size: Keep under 300 KB for rapid mobile loading.
2. **Place File in Target Folder**:
   - Copy the file to `public/assets/images/<folder>/<filename>.jpg`.
3. **Reference in Code / JSON**:
   - In Next.js pages or components, reference the path starting with `/assets/images/...` using the `assetPath()` helper:
     ```tsx
     import { assetPath } from '@/lib/utils';
     <img src={assetPath('/assets/images/about/new-image.jpg')} alt="Description" />
     ```
   - In content JSON files ([`src/content/site-config.json`](file:///d:/Project/jainmandir/src/content/site-config.json), [`gallery-events.json`](file:///d:/Project/jainmandir/src/content/gallery-events.json)), reference the relative web path:
     ```json
     "coverImage": "/assets/images/events/my-event.jpg"
     ```

---

## ☁️ Cloudinary Setup & Dynamic Galleries

The website uses **Cloudinary** for dynamic image galleries and real-time announcement popups without needing code redeployment.

- **Configuration File**: [`src/lib/cloudinary-utils.ts`](file:///d:/Project/jainmandir/src/lib/cloudinary-utils.ts)
- **Active Cloud Name**: `dx3qrxyew` (Configurable via `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`).

### ⚠️ Mandatory Cloudinary Dashboard Setting
To allow the website to dynamically fetch photos by tag, you must enable resource listing:
1. Log in to [Cloudinary Console](https://console.cloudinary.com/).
2. Navigate to **Settings (⚙️)** › **Security**.
3. Under **Restricted media types**, find **"Resource list"** and **UNCHECK** it (disable the restriction).
4. Click **Save Changes**.

---

### How to Create a New Event Gallery Album

1. **Upload Images to Cloudinary**:
   - In Cloudinary Media Library, upload all photos for the event (e.g., 10 to 50 photos).
2. **Assign a Unique Tag**:
   - Select all uploaded images, click **Tag**, and assign an event tag (e.g. `flag-hosting-2026` or `paryushan-2026`).
3. **Link Event in Website JSON**:
   - Open [`src/content/gallery-events.json`](file:///d:/Project/jainmandir/src/content/gallery-events.json) (or edit via Sveltia CMS at `/admin`):
     ```json
     {
       "id": "flag-hosting-2026",
       "date": "2026-01-20",
       "coverImage": "/assets/images/events/flag-hosting-2026.jpg",
       "nameKey": "gallery.events.flag_hosting.name",
       "descriptionKey": "gallery.events.flag_hosting.description"
     }
     ```
4. **Result**: The website will automatically fetch all images tagged with `flag-hosting-2026`, render the asymmetric responsive gallery, and enable full-screen pinch/zoom inspection.

---

### How to Publish an Announcement Popup Banner

1. Upload the flyer/notice image to Cloudinary.
2. Tag the image with **`announcement`**.
3. Any active visitor loading the website will immediately see the sacred announcement modal. Once closed, visitor choice is saved in `localStorage` so it doesn't repeatedly disturb them.

---

## 📊 Google Analytics 4 (GA4) Integration

- **Component**: [`src/components/GoogleAnalytics.tsx`](file:///d:/Project/jainmandir/src/components/GoogleAnalytics.tsx)
- **Active Measurement ID**: `G-RKDYQ38BCL`

### Configuring GA4 Locally & in Production

1. **Local Development ([`.env.local`](file:///d:/Project/jainmandir/.env.local))**:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-RKDYQ38BCL
   ```
2. **GitHub Actions / Hosting Deployment**:
   - Go to your GitHub Repository › **Settings** › **Secrets and variables** › **Actions** › **Variables**.
   - Ensure `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set to your Measurement ID. The build workflow (`nextjs-app.yml`) injects this during static export.

### What is Tracked Automatically
- Full client-side route transitions (`/en/about`, `/hi/gallery`, etc.) via `usePathname()` and `useSearchParams()`.
- Outbound map links, phone call clicks, and language switches.

---

## 🔍 Google Search Console & Technical SEO

- **Production URL**: `https://www.saatbeesdeorimandir.co.in`
- **Canonical Domain**: Managed via [`CNAME`](file:///d:/Project/jainmandir/CNAME).

### 1. Verification in Google Search Console
To verify domain ownership in [Google Search Console](https://search.google.com/search-console):
- **Option A (DNS - Recommended)**: Add a `TXT` record in your DNS provider (e.g. GoDaddy / Cloudflare).
- **Option B (HTML File)**: If Google provides a file like `google1234567890.html`, place it directly in [`public/`](file:///d:/Project/jainmandir/public/) so it is accessible at `https://www.saatbeesdeorimandir.co.in/google1234567890.html`.

### 2. Submitting the XML Sitemap
The sitemap is dynamically generated at build time via [`src/app/sitemap.ts`](file:///d:/Project/jainmandir/src/app/sitemap.ts) and exported to `/sitemap.xml`.
- In Google Search Console, go to **Sitemaps** (left menu).
- Enter: `sitemap.xml` and click **Submit**.
- The sitemap automatically covers all pages across both English and Hindi:
  - `https://www.saatbeesdeorimandir.co.in/en/`
  - `https://www.saatbeesdeorimandir.co.in/hi/`
  - `.../about`, `.../history`, `.../gallery`, `.../events`, `.../contact`, `.../trust`.

### 3. Robots.txt
Configured via [`src/app/robots.ts`](file:///d:/Project/jainmandir/src/app/robots.ts):
```text
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://www.saatbeesdeorimandir.co.in/sitemap.xml
```

---

## 📝 Sveltia Content Management System (CMS)

The site includes **Sveltia Git CMS** for visual content management without touching code.

- **Admin URL**: `https://www.saatbeesdeorimandir.co.in/admin/` (or `http://localhost:3000/admin/` in development).
- **Configuration**: [`public/admin/config.yml`](file:///d:/Project/jainmandir/public/admin/config.yml)
- **Runner**: [`src/app/admin/page.tsx`](file:///d:/Project/jainmandir/src/app/admin/page.tsx) with [`public/admin-cms.html`](file:///d:/Project/jainmandir/public/admin-cms.html).

### How to Log In to the CMS
1. Navigate to `/admin/` in your browser.
2. Click **"Sign In with Token"** / **"Sign in with a Personal Access Token"**.
3. Paste a **GitHub Personal Access Token (PAT)**:
   - **Classic Token**: Check the `repo` scope (Full control of private repositories).
   - **Fine-grained Token**: Select repository `saatbisdeorimandir/jainmandir` with permissions **Contents: Read & write**.
4. Sveltia CMS will load all collections directly from GitHub.

### Available Collections
| Collection | File Target | What You Can Edit |
|---|---|---|
| **Site Settings & Features** | `src/content/site-config.json` | Contact numbers, temple address, Google Maps embed URL, external booking links, fraud scam warnings. |
| **Trust Committee Members** | `src/content/trust-members.json` | Trustee names, serial numbers, locations (English & Hindi). |
| **Gallery & Events** | `src/content/gallery-events.json` | Event titles, event IDs, cover photos, dates, permanent status. |
| **Content & Translations** | `src/content/en.json` & `hi.json` | Hero titles, subtitles, explore buttons, Darshan timings, donation card info. |
| **Media Library** | `public/assets/images/` | Browse, upload, delete, and inspect all static images. |

---

## 🚀 Local Development & Deployment Runbook

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm (bundled with Node.js)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the main sanctuary website, and [http://localhost:3000/admin/](http://localhost:3000/admin/) for the Content Management System.

### 3. Rapid Typechecking (Zero-Error Verification)
```bash
node .agents/skills/token-efficiency/scripts/check-types.mjs
```

### 4. Build Static Site for Production
```bash
npm run build
```
This generates the standalone static distribution in the `./out/` directory.

### 5. Automated GitHub Pages CI/CD
Whenever commits are pushed to the `main` branch, the GitHub Actions workflow [`.github/workflows/nextjs-app.yml`](file:///d:/Project/jainmandir/.github/workflows/nextjs-app.yml) automatically triggers:
1. Checks out the code.
2. Injects environment variables (`NEXT_PUBLIC_GA_MEASUREMENT_ID`).
3. Installs dependencies and runs `next build`.
4. Deploys the `./out` static build artifacts directly to GitHub Pages at [https://www.saatbeesdeorimandir.co.in](https://www.saatbeesdeorimandir.co.in).

---

## ⚖️ License & Ownership
Copyright © **Shri Jain Shwetambar Saat Bees Deori Fort Teerth Trust**, Chittorgarh Fort, Rajasthan. All rights reserved.
