# Cloudinary Setup & Image Management

This guide explains how to set up Cloudinary and manage gallery images for the website. By using Cloudinary, images are fetched dynamically, allowing for updates without changing the website's code.

## 1. Cloudinary Account Setup

1.  **Create an Account**: If you haven't already, sign up for a free account at [cloudinary.com](https://cloudinary.com/).
2.  **Get your Cloud Name**: Find your "Cloud Name" on the Dashboard.
3.  **Configure the Website**: Open `src/lib/cloudinary-utils.ts` and update the `CLOUDINARY_CLOUD_NAME` constant:
    ```typescript
    export const CLOUDINARY_CLOUD_NAME = 'your_cloud_name_here';
    ```
4.  **Enable Resource Lists (CRITICAL)**:
    - Go to **Settings** (gear icon) in the Cloudinary Dashboard.
    - Navigate to **Security**.
    - Scroll down to the **"Restricted media types"** section.
    - Find **"Resource list"** and ensure it is **UNCHECKED (Disabled)**. 
    - *Note: If this box is checked, it restricts access to signed requests only, which causes a 401 error.*
    - Click **Save** at the bottom.

## 2. Uploading & Tagging Photos

The gallery displays images based on **Tags**. When you upload a photo, you must add a tag that matches the event's ID.

### Current Event Tags:
| Event Name | Tag to use in Cloudinary |
| :--- | :--- |
| Glimpses | `glimpses` |
| Flag Hosting Ceremony 2026 | `Flag_hosting` |

### Steps to Upload:
1.  Go to the **Media Library** in Cloudinary.
2.  Click **Upload**.
3.  After uploading (or during), select the image(s).
4.  Add the appropriate tag (e.g., `glimpses`) in the **Tags** field.
5.  Save changes. The images will appear on the website instantly.

## 3. Dynamic Gallery (FULLY AUTOMATIC)

You can now add new events without editing any JSON files. The website will automatically discover new events based on Cloudinary folders.

### Steps to add a dynamic event:
1.  **Create a Folder** in Cloudinary (e.g., inside your main folder).
2.  **Naming Convention**: Name the folder starting with the date in `YYYY-MM-DD_` format.
    - Example: `2024-05-15_Pratishtha_Mahotsav`
    - Example: `2024-08-10_Shivir_Glimpses`
3.  **Bilingual Support (Optional)**: You can provide both English and Hindi names in the folder name using `_HI_` as a separator.
    - Example: `2024-05-15_Pratishtha Mahotsav_HI_प्रतिष्ठा महोत्सव`
    - The website will automatically show the correct language based on the user's selection.
4.  **Upload** your photos into that folder.
5.  **Tag all images** in that folder with the tag: `gallery_event`
6.  The website will automatically:
    - Create a new section in the Gallery.
    - Extract the date (e.g., 15 May 2024).
    - Use the correct name for English or Hindi (e.g., "Pratishtha Mahotsav" or "प्रतिष्ठा महोत्सव").

## 4. Manual Events (Legacy Way)

To add a manual event to the gallery (where you want custom descriptions or specific IDs):
1.  Open `src/content/gallery-events.json`.
2.  Add a new entry with a unique `id` (e.g., `"Diwali_2026"`).
3.  Upload photos to Cloudinary and tag them with that same ID (`Diwali_2026`).

## 5. Troubleshooting

-   **Images not appearing?** Double-check that "Resource list" is enabled in Cloudinary Security settings.
-   **Wrong images showing?** Ensure the tags in Cloudinary exactly match the IDs in `gallery-events.json`.
-   **Loading Spinner forever?** Verify your Cloud Name in `cloudinary-utils.ts`.
