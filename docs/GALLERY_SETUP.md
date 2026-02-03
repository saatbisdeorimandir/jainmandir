# Gallery Setup Guide

Complete guide for setting up the event-based gallery with Google Drive images.

## Quick Start

1. **Extract Image IDs** using one of the tools in `tools/` folder
2. **Add to configuration** in `src/lib/gallery-images.ts`
3. **Add translations** in `src/content/en.json` and `src/content/hi.json`
4. **Build and deploy**: `npm run build` → push to GitHub

## Method 1: Python Script (Automatic)

### Requirements
- Python 3.x
- Google Drive API key

### Steps

1. **Get API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create project → Enable Google Drive API
   - Create Credentials → API Key

2. **Install Package**
   ```bash
   pip install google-api-python-client
   ```

3. **Run Script**
   ```bash
   python tools/extract_drive_images.py YOUR_API_KEY
   ```

4. **Use Generated Files**
   - Copy `output_gallery_images.txt` to `src/lib/gallery-images.ts`
   - Add `output_en_json.json` to `src/content/en.json`
   - Add `output_hi_json.json` to `src/content/hi.json`

## Method 2: HTML Tool (Manual)

1. **Open Tool**
   - Double-click `tools/drive-extractor.html`

2. **Get Image Links**
   - Open your Google Drive folder
   - Right-click each image → Get link
   - Paste all links in the tool

3. **Extract & Copy**
   - Click "Extract File IDs"
   - Copy the generated code
   - Paste into `src/lib/gallery-images.ts`

## File Structure

```
src/
├── lib/
│   └── gallery-images.ts       # Image file IDs configuration
├── content/
│   ├── gallery-events.json     # Event definitions
│   ├── en.json                 # English translations
│   └── hi.json                 # Hindi translations
└── components/
    ├── GallerySection.tsx      # Main gallery component
    └── EventGalleryGrid.tsx    # Individual event display
```

## Adding New Events

1. **Add to gallery-events.json**
   ```json
   {
     "id": "new-event-2026",
     "nameKey": "gallery.events.new_event_2026.name",
     "date": "2026-03-15",
     "descriptionKey": "gallery.events.new_event_2026.description",
     "driveFolderId": "FOLDER_ID",
     "coverImage": "/assets/images/events/cover.jpg"
   }
   ```

2. **Add translations** in `en.json` and `hi.json`

3. **Extract images** using tools

4. **Add file IDs** to `gallery-images.ts`

## Deployment

```bash
npm run build
git add .
git commit -m "Add gallery images"
git push
```

GitHub Pages will automatically deploy your changes.

## How It Works

1. **Development**: Extract file IDs and add to configuration
2. **Build**: File IDs are compiled into static JavaScript
3. **Production**: User's browser loads images directly from Google Drive using the embedded file IDs

No server needed - works perfectly with GitHub Pages! 🎉
