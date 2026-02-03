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

## 3. Adding New Events

To add a new event to the gallery:
1.  Open `src/content/gallery-events.json`.
2.  Add a new entry with a unique `id` (e.g., `"Diwali_2026"`).
3.  Upload photos to Cloudinary and tag them with that same ID (`Diwali_2026`).

## 4. Troubleshooting

-   **Images not appearing?** Double-check that "Resource list" is enabled in Cloudinary Security settings.
-   **Wrong images showing?** Ensure the tags in Cloudinary exactly match the IDs in `gallery-events.json`.
-   **Loading Spinner forever?** Verify your Cloud Name in `cloudinary-utils.ts`.
