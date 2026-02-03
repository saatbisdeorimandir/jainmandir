"""
Google Drive Image Extractor - Enhanced Version

This script extracts all image file IDs from a public Google Drive folder and generates
ready-to-use JSON output for:
1. gallery-images.ts (TypeScript configuration)
2. en.json and hi.json (Translation files)

USAGE:
    python tools/extract_drive_images.py [API_KEY]

If no API key provided, it will show manual instructions.

FOLDER: https://drive.google.com/drive/folders/1vKCCP2s0BJkEFWprnNQ3LFAxUgOceFFU
"""

import sys
import json
from typing import List, Dict, Optional

def extract_folder_id(url: str) -> str:
    """Extract folder ID from Google Drive URL"""
    if 'folders/' in url:
        return url.split('folders/')[1].split('?')[0]
    return url

def fetch_images_from_folder(folder_id: str, api_key: str) -> List[Dict[str, str]]:
    """Fetch all images from a Google Drive folder using API"""
    try:
        from googleapiclient.discovery import build
        
        service = build('drive', 'v3', developerKey=api_key)
        
        # Query for image files in the folder
        query = f"'{folder_id}' in parents and (mimeType contains 'image/')"
        
        results = service.files().list(
            q=query,
            fields="files(id, name, mimeType, webContentLink, thumbnailLink)",
            pageSize=100,
            orderBy='name'  # Sort by name for consistency
        ).execute()
        
        files = results.get('files', [])
        
        return files
    except ImportError:
        print("❌ Error: google-api-python-client not installed")
        print("Install it with: pip install google-api-python-client")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error fetching images: {e}")
        print("\nMake sure:")
        print("1. Your API key is correct")
        print("2. Google Drive API is enabled in your project")
        print("3. The folder is publicly accessible")
        sys.exit(1)

def generate_gallery_images_ts(images: List[Dict[str, str]], event_id: str) -> str:
    """Generate TypeScript code for gallery-images.ts"""
    file_ids = [f"        '{img['id']}'," for img in images]
    file_ids_str = '\n'.join(file_ids)
    
    return f"""    '{event_id}': [
{file_ids_str}
    ],"""

def generate_translations(images: List[Dict[str, str]], event_id: str, event_name_en: str, event_name_hi: str) -> tuple:
    """Generate translation JSON for en.json and hi.json"""
    
    # English translations
    en_translations = {
        "name": event_name_en,
        "description": f"Photos from {event_name_en}"
    }
    
    # Hindi translations
    hi_translations = {
        "name": event_name_hi,
        "description": f"{event_name_hi} की तस्वीरें"
    }
    
    return en_translations, hi_translations

def save_output_files(images: List[Dict[str, str]], event_id: str, event_name_en: str, event_name_hi: str):
    """Save all output files"""
    
    # 1. Generate gallery-images.ts code
    ts_code = generate_gallery_images_ts(images, event_id)
    
    # 2. Generate translations
    en_trans, hi_trans = generate_translations(images, event_id, event_name_en, event_name_hi)
    
    # 3. Save to files
    with open('output_gallery_images.txt', 'w', encoding='utf-8') as f:
        f.write("=" * 70 + "\n")
        f.write("COPY THIS TO: src/lib/gallery-images.ts\n")
        f.write("=" * 70 + "\n\n")
        f.write(ts_code)
        f.write("\n\n")
    
    with open('output_en_json.json', 'w', encoding='utf-8') as f:
        event_key = event_id.replace('-', '_')
        en_output = {
            "gallery": {
                "events": {
                    event_key: en_trans
                }
            }
        }
        json.dump(en_output, f, indent=4, ensure_ascii=False)
    
    with open('output_hi_json.json', 'w', encoding='utf-8') as f:
        event_key = event_id.replace('-', '_')
        hi_output = {
            "gallery": {
                "events": {
                    event_key: hi_trans
                }
            }
        }
        json.dump(hi_output, f, indent=4, ensure_ascii=False)
    
    # 4. Create summary file
    with open('OUTPUT_SUMMARY.txt', 'w', encoding='utf-8') as f:
        f.write("=" * 70 + "\n")
        f.write(f"GOOGLE DRIVE IMAGE EXTRACTION RESULTS\n")
        f.write(f"Event: {event_name_en}\n")
        f.write(f"Total Images: {len(images)}\n")
        f.write("=" * 70 + "\n\n")
        
        f.write("📁 FILES GENERATED:\n")
        f.write("  1. output_gallery_images.txt  → Copy to src/lib/gallery-images.ts\n")
        f.write("  2. output_en_json.json        → Add to src/content/en.json\n")
        f.write("  3. output_hi_json.json        → Add to src/content/hi.json\n\n")
        
        f.write("=" * 70 + "\n")
        f.write("IMAGES FOUND:\n")
        f.write("=" * 70 + "\n\n")
        for i, img in enumerate(images, 1):
            f.write(f"{i:2d}. {img['name']}\n")
            f.write(f"    ID: {img['id']}\n")
            f.write(f"    URL: https://drive.google.com/uc?export=view&id={img['id']}\n\n")

def print_manual_instructions():
    """Print manual extraction instructions"""
    print("=" * 70)
    print("MANUAL METHOD (No API Key Required)")
    print("=" * 70)
    print()
    print("1. Open the folder in your browser:")
    print("   https://drive.google.com/drive/folders/1vKCCP2s0BJkEFWprnNQ3LFAxUgOceFFU")
    print()
    print("2. For each image:")
    print("   - Right-click → Get link")
    print("   - Extract file ID from URL: https://drive.google.com/file/d/FILE_ID/view")
    print()
    print("3. Add file IDs to src/lib/gallery-images.ts:")
    print()
    print("   'glimpses': [")
    print("       'FILE_ID_1',")
    print("       'FILE_ID_2',")
    print("   ],")
    print()
    print("=" * 70)
    print("AUTOMATIC METHOD (Requires API Key)")
    print("=" * 70)
    print()
    print("Get API Key:")
    print("  1. Go to: https://console.cloud.google.com/")
    print("  2. Create project → Enable Google Drive API")
    print("  3. Create Credentials → API Key")
    print()
    print("Run:")
    print("  python tools/extract_drive_images.py YOUR_API_KEY")
    print()

def main():
    key="AIzaSyDhcDupF7q3m_k-pk2JojdWfRbqVRKmQAk-"
    # Configuration
    folder_url = "https://drive.google.com/drive/folders/1I79vPrCydBNHrjz36XbGbWBdH4cUkqlf"
    folder_id = extract_folder_id(folder_url)
    event_id = "Flag_hosting"
    event_name_en = "Flag Hosting Ceremony 2026"
    event_name_hi = "ध्वजा समारोह 2026"
    
    print("=" * 70)
    print("🖼️  GOOGLE DRIVE IMAGE EXTRACTOR")
    print("=" * 70)
    print(f"\nFolder ID: {folder_id}")
    print(f"Event: {event_name_en} / {event_name_hi}\n")
    
    # Check for API key
    if len(sys.argv) < 2:
        print_manual_instructions()
        return
    
    api_key = sys.argv[1]
    
    print("🔄 Fetching images from Google Drive...")
    images = fetch_images_from_folder(folder_id, api_key)
    
    if not images:
        print("❌ No images found in the folder.")
        print("\nMake sure:")
        print("  1. The folder contains images")
        print("  2. The folder is publicly accessible")
        return
    
    print(f"✅ Found {len(images)} images!\n")
    
    # Generate and save outputs
    print("📝 Generating output files...")
    save_output_files(images, event_id, event_name_en, event_name_hi)
    
    print("\n" + "=" * 70)
    print("✅ SUCCESS! Files generated:")
    print("=" * 70)
    print("\n📄 output_gallery_images.txt")
    print("   → Copy this to src/lib/gallery-images.ts\n")
    print("📄 output_en_json.json")
    print("   → Add this to src/content/en.json under gallery.events\n")
    print("📄 output_hi_json.json")
    print("   → Add this to src/content/hi.json under gallery.events\n")
    print("📄 OUTPUT_SUMMARY.txt")
    print("   → Full list of all images with URLs\n")
    
    # Print preview
    print("=" * 70)
    print("PREVIEW - gallery-images.ts:")
    print("=" * 70)
    print(generate_gallery_images_ts(images, event_id))
    print("\n" + "=" * 70)
    print("NEXT STEPS:")
    print("=" * 70)
    print("1. Copy content from output_gallery_images.txt to src/lib/gallery-images.ts")
    print("2. Add translations from output_en_json.json to src/content/en.json")
    print("3. Add translations from output_hi_json.json to src/content/hi.json")
    print("4. Run: npm run build")
    print("5. Deploy to GitHub Pages")
    print("=" * 70)

if __name__ == "__main__":
    main()
