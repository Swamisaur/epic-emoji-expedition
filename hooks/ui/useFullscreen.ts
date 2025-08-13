/**
 * @file useFullscreen.ts
 * @description A hook to manage fullscreen state and behavior across different platforms.
 * It uses the native Fullscreen API where supported (Desktop, Android) and a CSS-based
 * fallback for iOS where the native API is unreliable for non-video elements.
 */
import { useState, useCallback, useEffect } from 'react';
import { isIOS } from '../../utils/device';

export const useFullscreen = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const isIosDevice = isIOS();

    // This callback syncs our state with the browser's native fullscreen state.
    const handleFullscreenChange = useCallback(() => {
        setIsFullscreen(!!document.fullscreenElement);
    }, []);

    // We only attach the native event listener on non-iOS devices,
    // as iOS will be handled manually via CSS state.
    useEffect(() => {
        if (isIosDevice) return;

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [handleFullscreenChange, isIosDevice]);

    const toggleFullscreen = useCallback(() => {
        if (isIosDevice) {
            // For iOS, we just toggle our internal state. The parent component
            // will use this state to apply a CSS class for a "full-window" effect.
            setIsFullscreen(prev => !prev);
            return;
        }

        // For Desktop and Android, use the robust native Fullscreen API.
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        // The 'fullscreenchange' event listener will automatically sync the state.
    }, [isIosDevice]);

    return { isFullscreen, toggleFullscreen };
};
