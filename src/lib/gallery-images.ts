import { extractFolderId } from './drive-utils';

/**
 * Gallery Events Image Configuration
 * 
 * Add your Google Drive file IDs here for each event.
 * To get file IDs from your folder:
 * 1. Open: https://drive.google.com/drive/folders/1vKCCP2s0BJkEFWprnNQ3LFAxUgOceFFU
 * 2. Right-click each image → Get link
 * 3. Extract file ID from the URL
 */

export const GALLERY_IMAGES: Record<string, string[]> = {
    // Glimpses - Add file IDs from folder: 1vKCCP2s0BJkEFWprnNQ3LFAxUgOceFFU
    'glimpses': [
        // Example: '1abc123def456ghi789',
        // Add your actual file IDs here
        '1QYWTviM4XSsuDlUvpXLNol2N9JprddAW',
        '18vkTQ-ltkQJ-OMmVrwd-9bXmtZvWWz0O',
        '1wm2vBqWdJrrShysE25nk8KDvIuiMCCsf',
        '1aUe5JvwL1RYTispuJWueS0E35TJBHd6a',
        '1DVaPR7dSG8_e1cs_r4zBUb0AN5HCgUVC',
        '1Fhy8IRVevh-44w5A_KfE4bciz9lnwTIB',
    ],

    'Flag_hosting': [
        '16CkO18T65OaxK6dqwViOM1De8_gpiYIt',
        '1Uk5Zlm0A4e-fHBN0oSnjTDtl_vXKVvl2',
        '16RjNE5QIqS8XkHxNvKMMDBl9seM6d8uU',
        '146sXJkIHPqYcn_x2lNv3-1SDxNUZfkq2',
        '1KtYG7MsVysSQIfhWwb6YFgvNInlOhtub',
        '18XWZAGzt3za-6a7ebowGsJkOsUQ2azlT',
        '1xAysFVG6687zwNwYjkmm1oPrAd2_1gBK',
        '1skRjYzzoO12IEBI2QGjy76muMX0Soz5U',
        '1FMP4tjH4HmjOZmFp_DIKGRPS8DTV_sju',
        '1uA7vHBE_66UqNC8hnsBgY23esxXzRm_y',
        '1b8sBgDxGITGQpsAGHXo9aXPqLlsmoYjb',
        '1XBdsUaQYMxK6mpGk5w086R82fFc6JtGi',
        '111kaQ15def-Kk18jTI6ln2shi6aolr-3',
        '1JJtmXig379aAC1vnBsIQyHy8Emn5yTWU',
        '1JFlslPTA3qJBH589-sanOh4Cu4B-mVC_',
        '1vAYlnm7Ne9WSD7AW3KDD4AECVTvQVLsR',
        '11deaIoMt8j_De5FIeszQ09M8yE6l70eU',
        '1s5knbnZuFKtWtKHCkSjQTx9vY_NoJFeA',
        '1HkwlbME7BO8M2NtQ1VP3Iu0rbSKmFeXF',
        '1oNfVKDYwAaPvmSRBKy9ay-x7Ggpzf94w',
        '1p1EXEXHxaz0J_4z2S6jJ2LT5PZLPPhs_',
        '1NCjIRCqHdIOCSB8rGhIGEuroouBN5pxP',
        '1DznlRR6aGH6Vlfkq4oa0JFB16Vv5DMgI',
        '1b91WwawNAcgGjOjhQCOzXVw4OxIeogM4',
        '1GQklK-RvaIWBNncPA4848j97uSkI2pxj',
        '1-SRaLF3zbqfvm3itBAivKn3K3q4RJXBK',
        '1HJRQ4qmOgSUvLv8dhicrmq6O27XG9G_Y',
        '1vm3JsvylBNW4yWnZ1Q5Zb8XneWpWiqAB',
    ],

};

/**
 * Get image URLs for an event
 * Using Google Drive's direct file URL format for publicly shared images
 * 
 * IMPORTANT: Make sure all images in your Google Drive folder are set to:
 * "Anyone with the link can view"
 */
export function getEventImages(eventId: string): string[] {
    const fileIds = GALLERY_IMAGES[eventId] || [];
    // Use the uc?export=download format which works best for direct image embedding
    // This format bypasses the preview page and serves the raw image
    return fileIds.map(id => `https://drive.google.com/uc?export=download&id=${id}`);
}
