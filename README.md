# Shri Jain Temple - Static Website

A peaceful, multilingual (English + Hindi), and fully static website for your Jain Temple.

## 🌟 Features
- **Multilingual**: Configurable English and Hindi content.
- **Dynamic Content**: Update Events, Gallery, and Text just by editing JSON files.
- **Responsive Design**: Looks beautiful on Mobile, Tablet, and Desktop.
- **SEO Ready**: Configurable metadata.
- **Fast & Free**: Ready for GitHub Pages (no database or backend required).

## 📁 Project Structure
```
/
├── index.html          # Home Page
├── about.html          # About Page
├── events.html         # Events Listing
├── gallery.html        # Photo Gallery
├── contact.html        # Contact Info
├── content/            # -> EDIT THESE FILES TO UPDATE SITE
│   ├── site-config.json  # Global settings (Socials, Contact, Gallery Images, Event List)
│   ├── pages.json        # Menu items
│   ├── en.json           # English text content
│   └── hi.json           # Hindi text content
├── src/
│   └── js/main.js      # Core Logic (Do not edit unless you know coding)
└── assets/images/      # Place your local images here
```

## 🚀 How to Deploy on GitHub Pages (Free)

1. **Upload Code to GitHub**:
   - Create a new Repository on GitHub (e.g., `jaintemple-website`).
   - Upload all these files to the repository.

2. **Enable GitHub Pages**:
   - Go to your Repository **Settings** > **Pages**.
   - Under "Build and deployment", select **Source** as `Deploy from a branch`.
   - Select Branch: `main` (or `master`) and Folder: `/ (root)`.
   - Click **Save**.

3. **Visit Your Site**:
   - In a few minutes, your site will be live at `https://yourusername.github.io/jaintemple-website/`.

## 📝 How to Update Content

### Adding an Event
1. Open `content/site-config.json`.
2. Find the `"events"` list.
3. Add a new block:
   ```json
   {
     "id": 3,
     "image": "url_to_image.jpg",
     "titleKey": "event_3_title",
     "descKey": "event_3_desc",
     "date": "2024-10-01"
   }
   ```
4. Open `content/en.json` and add:
   ```json
   "event_3_title": "New Event Name",
   "event_3_desc": "Description of the event..."
   ```
5. Do the same for `content/hi.json`.

### Adding Photos to Gallery
1. Open `content/site-config.json`.
2. Add to `"gallery"` list:
   ```json
   { "src": "image_url.jpg", "altKey": "gallery_new_alt" }
   ```

### Changing Contact Info
- Edit `content/site-config.json` under the `"contact"` section.

## 🛠️ Customization
 - **Theme Colors**: Edit `tailwind.config` inside the `<script>` tag in every HTML file's `<head>`.
 - **Fonts**: Change the Google Fonts link in HTML files.

## 📱 Tech Stack
- **HTML5**
- **Tailwind CSS (CDN)**
- **Vanilla JavaScript**
