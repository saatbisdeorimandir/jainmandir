'use client';

import { useState, useEffect } from 'react';
import { fetchDynamicGalleryEvents, DynamicGalleryEvent } from '@/lib/cloudinary-utils';
import EventGalleryGrid from './EventGalleryGrid';
import { GalleryEvent } from '@/lib/types';
import LoadingSpinner from './LoadingSpinner';
import { getTrans } from '@/lib/utils';

interface DynamicGalleryProps {
    dict: any;
    lang: string;
}

export default function DynamicGallery({ dict, lang }: DynamicGalleryProps) {
    const [events, setEvents] = useState<DynamicGalleryEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDynamicEvents() {
            try {
                const dynamicEvents = await fetchDynamicGalleryEvents();
                setEvents(dynamicEvents);
            } catch (error) {
                console.error('Failed to load dynamic gallery events:', error);
            } finally {
                setLoading(false);
            }
        }

        loadDynamicEvents();
    }, []);

    if (loading) {
        return (
            <div className="py-12 flex flex-col items-center justify-center">
                <LoadingSpinner />
                <p className="mt-4 text-stone-500 animate-pulse">Discovering new gallery events...</p>
            </div>
        );
    }

    if (events.length === 0) {
        return null;
    }

    return (
        <div className="mt-4">

            {events.map((dynamicEvent, index) => {
                // Priority: 
                // 1. Explicit Hindi name from folder (_HI_ separator)
                // 2. Dictionary translation (hi.json/en.json)
                // 3. Raw English name from folder

                let finalName = dynamicEvent.name;

                if (lang === 'hi' && dynamicEvent.nameHi) {
                    finalName = dynamicEvent.nameHi;
                } else {
                    const exactMatch = getTrans(dict, `gallery.events.${dynamicEvent.id}.name`);
                    const nameMatch = getTrans(dict, `gallery.events.${dynamicEvent.name}.name`);
                    const rootMatch = getTrans(dict, dynamicEvent.name);

                    if (exactMatch !== `gallery.events.${dynamicEvent.id}.name`) {
                        finalName = exactMatch;
                    } else if (nameMatch !== `gallery.events.${dynamicEvent.name}.name`) {
                        finalName = nameMatch;
                    } else if (rootMatch !== dynamicEvent.name) {
                        finalName = rootMatch;
                    }
                }

                const galleryEvent: GalleryEvent = {
                    id: dynamicEvent.id,
                    nameKey: finalName, 
                    date: dynamicEvent.date,
                    descriptionKey: '', 
                    coverImage: dynamicEvent.images[0] || ''
                };

                return (
                    <EventGalleryGrid
                        key={dynamicEvent.id}
                        event={galleryEvent}
                        dict={dict}
                        images={dynamicEvent.images}
                        defaultExpanded={index === 0}
                    />
                );
            })}
        </div>
    );
}
