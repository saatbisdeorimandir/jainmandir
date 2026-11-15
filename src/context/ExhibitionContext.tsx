'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ExhibitionTheme = 'daylight' | 'nocturnal';

interface ExhibitionContextType {
    theme: ExhibitionTheme;
    toggleTheme: () => void;
    setTheme: (theme: ExhibitionTheme) => void;
    isCuratorOpen: boolean;
    openCurator: () => void;
    closeCurator: () => void;
    toggleCurator: () => void;
}

const ExhibitionContext = createContext<ExhibitionContextType | undefined>(undefined);

export function ExhibitionProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ExhibitionTheme>('daylight');
    const [isCuratorOpen, setIsCuratorOpen] = useState<boolean>(false);

    // Synchronize theme with localStorage and document element attribute
    useEffect(() => {
        try {
            const saved = localStorage.getItem('exhibit-theme') as ExhibitionTheme | null;
            if (saved === 'daylight' || saved === 'nocturnal') {
                setThemeState(saved);
                document.documentElement.setAttribute('data-exhibit-theme', saved);
            } else {
                document.documentElement.setAttribute('data-exhibit-theme', 'daylight');
            }
        } catch {
            // LocalStorage fallback for SSR/sandboxed mode
        }
    }, []);

    const setTheme = useCallback((newTheme: ExhibitionTheme) => {
        setThemeState(newTheme);
        try {
            localStorage.setItem('exhibit-theme', newTheme);
            document.documentElement.setAttribute('data-exhibit-theme', newTheme);
        } catch {
            // Safe fallback
        }
    }, []);

    const toggleTheme = useCallback(() => {
        const next = theme === 'daylight' ? 'nocturnal' : 'daylight';
        setTheme(next);
    }, [theme, setTheme]);

    // Keyboard shortcut Cmd+K / Ctrl+K and Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsCuratorOpen(prev => !prev);
            } else if (e.key === 'Escape') {
                setIsCuratorOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <ExhibitionContext.Provider
            value={{
                theme,
                toggleTheme,
                setTheme,
                isCuratorOpen,
                openCurator: () => setIsCuratorOpen(true),
                closeCurator: () => setIsCuratorOpen(false),
                toggleCurator: () => setIsCuratorOpen(prev => !prev),
            }}
        >
            {children}
        </ExhibitionContext.Provider>
    );
}

export function useExhibition() {
    const context = useContext(ExhibitionContext);
    if (!context) {
        throw new Error('useExhibition must be used within an ExhibitionProvider');
    }
    return context;
}
