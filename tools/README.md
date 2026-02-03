# Gallery Image Extraction Tools

This folder contains tools to help extract image file IDs from Google Drive folders.

## Tools

### 1. extract_drive_images.py
Python script that automatically fetches all images from a Google Drive folder and generates ready-to-use configuration files.

**Usage:**
```bash
python tools/extract_drive_images.py YOUR_API_KEY
```

**Generates:**
- `output_gallery_images.txt` - Copy to `src/lib/gallery-images.ts`
- `output_en_json.json` - Add to `src/content/en.json`
- `output_hi_json.json` - Add to `src/content/hi.json`
- `OUTPUT_SUMMARY.txt` - Full list of images with URLs

### 2. drive-extractor.html
Interactive web tool for manually extracting file IDs from Google Drive links.

**Usage:**
1. Double-click to open in browser
2. Paste Google Drive image links (one per line)
3. Click "Extract File IDs"
4. Copy the generated code

## Documentation

See `docs/GALLERY_SETUP.md` for complete setup instructions.
