# Shri Saat Bees Deori Jain Temple Website

A modern, fast, and SEO-optimized multilingual website for the **Shri Saat Bees Deori Jain Temple** in Chittorgarh Fort. Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## 🌟 Features

- **🚀 Performance**: Static Site Generation (SSG) for instant page loads and zero layout shifts.
- **🌐 Multilingual Support**: Seamlessly switch between **English** and **Hindi**.
- **🔍 SEO Optimized**: Server-side rendered content ensuring all text is indexable by search engines.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **🎨 Premium Aesthetics**: Custom typography (Rozha One & Poppins), smooth gradients, and elegant transitions.
- **📄 Content-Driven**: All site data (text, events, members) is managed via simple JSON files.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v3.4](https://tailwindcss.com/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Rozha One, Poppins, Inter)
- **Deployment**: [GitHub Pages](https://pages.github.com/) (Static Export)

---

## 📥 Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.17 or later)
- npm (comes with Node.js)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/jainmandir.git
cd jainmandir
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## � Project Structure

```text
jainmandir/
├── public/                 # Static assets
│   ├── assets/             # Images, logos, and icons
│   └── robots.txt          # SEO configuration
├── src/
│   ├── app/                # Next.js App Router (Pages & Layouts)
│   │   ├── [lang]/         # Dynamic language routes (en/hi)
│   │   ├── globals.css     # Global styles & Tailwind directives
│   │   └── layout.tsx      # Root HTML wrapper (Fonts initialization)
│   ├── components/         # Reusable UI components (Navbar, Hero, etc.)
│   ├── content/            # Site data in JSON format (The "Database")
│   │   ├── en.json         # English translations
│   │   ├── hi.json         # Hindi translations
│   │   ├── site-config.json # Global site settings (Contacts, Socials)
│   │   └── trust-members.json # List of all trust members
│   ├── lib/                # Utility functions and type definitions
│   └── middleware.ts       # Language detection and redirection
├── tailwind.config.ts      # Tailwind CSS theme configuration
└── next.config.mjs         # Next.js export configuration
```

---

## ✍️ Content Management

To update the website content, you don't need to touch the code. Just edit the JSON files in `src/content/`:

1. **Text & Translations**: Update `en.json` (English) and `hi.json` (Hindi).
2. **Contact Info & Socials**: Update `site-config.json`.
3. **Trust Members**: Add or remove members in `trust-members.json`.
4. **Gallery Images**: Add your images to `public/assets/images/gallery/` and then reference their names in `site-config.json`.

---

## 🚀 Deployment (GitHub Pages)

The project is configured for **Static Site Generation (SSG)**.

### 1. Build the project
```bash
npm run build
```
This command creates an `out/` folder containing the entire static website.

### 2. Manual Deployment
- Upload the contents of the `out/` folder to your hosting provider.
- For **GitHub Pages**, you can push the `out` directory to a `gh-pages` branch or configure a GitHub Action.

### 3. Automated Deployment (Recommended)
You can use a GitHub Action to automatically build and deploy the site whenever you push changes to the `main` branch. 
> [!TIP]
> Ensure your GitHub Pages settings are set to **"GitHub Actions"** as the source.

---

## ⚖️ License
This project is for the **Shri Saat Bees Deori Jain Temple Trust**. All rights reserved.
