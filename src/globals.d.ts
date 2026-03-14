// Type declarations for Google Analytics gtag
interface Window {
    gtag: (
        command: 'config' | 'event' | 'js' | 'set',
        targetId: string | Date,
        config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
}
