# Jain Temple Website - Gallery System

## Project Structure

```
jainmandir/
├── src/
│   ├── lib/
│   │   ├── gallery-images.ts      # Image file IDs configuration
│   │   ├── drive-utils.ts         # Google Drive helper functions
│   │   └── api.ts                 # API functions
│   ├── content/
│   │   ├── gallery-events.json    # Event definitions
│   │   ├── en.json                # English translations
│   │   └── hi.json                # Hindi translations
│   └── components/
│       ├── GallerySection.tsx     # Main gallery component
│       ├── EventGalleryGrid.tsx   # Individual event display
│       └── GoogleDriveLoader.tsx  # Drive image loader utility
├── tools/
│   ├── extract_drive_images.py    # Python script for image extraction
│   ├── drive-extractor.html       # HTML tool for manual extraction
│   └── README.md                  # Tools documentation
└── docs/
    └── GALLERY_SETUP.md           # Complete setup guide
```

## Gallery System

The gallery displays images organized by temple events (e.g., Glimpses, Flag Hosting Ceremony 2026). Images are loaded directly from Google Drive in users' browsers.

### Quick Setup

1. **Extract image file IDs** from your Google Drive folder
   - Use `tools/extract_drive_images.py` (automatic with API key)
   - Or use `tools/drive-extractor.html` (manual)

2. **Add file IDs** to `src/lib/gallery-images.ts`

3. **Add translations** to `src/content/en.json` and `src/content/hi.json`

4. **Build and deploy**
   ```bash
   npm run build
   git push
   ```

See `docs/GALLERY_SETUP.md` for detailed instructions.

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
```

## Deployment

The site is deployed to GitHub Pages. Push to the main branch to trigger automatic deployment.

---

For more information, see the documentation in the `docs/` folder.
