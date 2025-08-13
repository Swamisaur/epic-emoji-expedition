/**
 * @file VolumeControl.tsx
 * @description A reusable component for controlling game volume, featuring multiple layouts.
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface VolumeControlProps {
    volume: number;
    setVolume: (volume: number) => void;
    layout?: 'icon-only' | 'full-width' | 'splash';
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, setVolume, layout = 'icon-only' }) => {
    const [showSlider, setShowSlider] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sliderTimeoutRef = useRef<number | null>(null);

    const resetSliderTimeout = useCallback(() => {
        if (sliderTimeoutRef.current) {
            clearTimeout(sliderTimeoutRef.current);
        }
        sliderTimeoutRef.current = window.setTimeout(() => {
            setShowSlider(false);
        }, 3000);
    }, []);

    // Effect for auto-dissolving slider
    useEffect(() => {
        if ((layout === 'icon-only' || layout === 'splash') && showSlider) {
            resetSliderTimeout();
        }
        // Cleanup function to clear the timer when slider is hidden or component unmounts
        return () => {
            if (sliderTimeoutRef.current) {
                clearTimeout(sliderTimeoutRef.current);
            }
        };
    }, [showSlider, layout, resetSliderTimeout]);

    // Effect to close pop-up sliders when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSlider(false);
            }
        }
        if (layout === 'icon-only' || layout === 'splash') {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            if (layout === 'icon-only' || layout === 'splash') {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        };
    }, [wrapperRef, layout]);
    
    const getVolumeEmoji = () => {
        if (volume === 0) return '🔇';
        if (volume <= 0.5) return '🔉';
        return '🔊';
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(e.target.value));
        if (layout === 'icon-only' || layout === 'splash') {
            resetSliderTimeout();
        }
    };

    const handleIconClick = () => {
        const isMuted = volume === 0;

        if (showSlider) {
            // If the slider is open, tapping the icon always mutes and closes it.
            setVolume(0);
            setShowSlider(false);
        } else {
            // If the slider is closed...
            if (isMuted) {
                // ...and we are currently muted, unmute to the default volume.
                setVolume(0.4);
            } else {
                // ...and we are not muted, simply show the slider for adjustment.
                setShowSlider(true);
            }
        }
    };
    
    const percentage = (volume * 100).toFixed(0);

    // --- Full-width layout for Pause Menu ---
    if (layout === 'full-width') {
        return (
            <div className="w-full bg-gray-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-4">
                <span className="text-xl">{getVolumeEmoji()}</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    aria-label="Volume slider"
                />
                <span className="text-sm font-bold w-12 text-right">{percentage}%</span>
            </div>
        );
    }
    
    // --- Splash screen layout ---
    if (layout === 'splash') {
        const isMuted = volume === 0;
        return (
            <div ref={wrapperRef} className="relative flex-1">
                <button
                    onClick={handleIconClick}
                    className={`w-full text-white font-bold p-2 text-base rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 flex items-center justify-center gap-2 shadow-lg ${
                        isMuted 
                            ? 'bg-red-700 hover:bg-red-600 focus:ring-red-400' 
                            : 'bg-blue-600 hover:bg-blue-500 focus:ring-blue-400'
                    }`}
                    aria-label="Adjust volume"
                >
                    <span className="text-xl">{getVolumeEmoji()}</span>
                    <span className="text-[13px] uppercase tracking-wider">{isMuted ? 'Muted' : 'Sound'}</span>
                </button>
                {showSlider && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-3 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center gap-3 z-30 animate-fade-in">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            aria-label="Volume slider"
                        />
                        <span className="text-sm font-bold w-10 text-right">{percentage}%</span>
                    </div>
                )}
            </div>
        );
    }

    // --- Default icon-only layout ---
    return (
        <div ref={wrapperRef} className="relative">
            <button 
                onClick={handleIconClick}
                className="text-xl p-2 rounded-full bg-gray-900/50 hover:bg-gray-700/70 transition-colors"
                aria-label="Toggle volume slider"
            >
                {getVolumeEmoji()}
            </button>
            {showSlider && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg flex items-center gap-2 z-30 animate-fade-in">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        aria-label="Volume slider"
                    />
                    <span className="text-xs font-bold w-8 text-right">{percentage}%</span>
                </div>
            )}
        </div>
    );
};

export default VolumeControl;