/**
 * @file TitleStep.tsx
 * @description The first step of the splash screen, showing the game title and
 * prompting the user to start their journey.
 */
import React, { useState, useEffect } from 'react';
import AnimatedSplashTitle from '../../ui/AnimatedSplashTitle';
import VolumeControl from '../../ui/VolumeControl';

interface TitleStepProps {
    volume: number;
    setVolume: (volume: number) => void;
    onEmbark: () => void;
    isFullscreen: boolean;
    handleToggleFullscreen: () => void;
}

const TitleStep: React.FC<TitleStepProps> = ({ volume, setVolume, onEmbark, isFullscreen, handleToggleFullscreen }) => {
    const [embarkEmoji, setEmbarkEmoji] = useState('🚀');

    useEffect(() => {
        const embarkEmojis = ['⚔️', '🛡️', '💰', '💎', '👑', '👹', '🔥', '✨', '🚀', '🗺️'];
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % embarkEmojis.length;
            setEmbarkEmoji(embarkEmojis[currentIndex]);
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center p-2">
            {/* Wrapper for positioning the title and the card */}
            <div className="relative w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                {/* The main card with new shape, shadow, and adjusted padding */}
                <div className="liquid-glass animate-slide-up-splash splash-card-shape splash-card-shadow w-full flex flex-col items-center px-4 md:px-8 xl:px-16 pt-16 md:pt-24 lg:pt-20 pb-24 md:pb-32 lg:pb-24 shine-effect-card">
                    
                    {/* Subtle inner border embellishments */}
                    <div 
                        className="absolute inset-[8px] border border-white/10 rounded-none splash-card-shape pointer-events-none"
                        aria-hidden="true"
                    />
                    <div 
                        className="absolute inset-[12px] border border-white/5 rounded-none splash-card-shape pointer-events-none"
                        aria-hidden="true"
                    />

                    {/* Title is now inside the card */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-3xl sm:text-4xl" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>
                            <span className="inline-block -rotate-12">🚩</span>
                            <span className="inline-block text-5xl sm:text-6xl mx-1 -translate-y-2">🏰</span>
                            <span className="inline-block rotate-12">⚔️</span>
                        </div>
                        <div 
                            className="w-full z-20"
                            style={{ filter: 'drop-shadow(0 40px 30px rgba(0,0,0,0.6))' }}
                        >
                            <AnimatedSplashTitle />
                        </div>
                    </div>

                    {/* Container for all aligned elements inside the card */}
                    <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg flex flex-col items-center gap-8 mt-8">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
                            ✨ Now with Classes & Secrets 🤫
                        </h2>
                        
                        {/* Buttons container with reduced width */}
                        <div className="w-full max-w-xs lg:max-w-sm mx-auto flex justify-center items-stretch gap-4 mt-4">
                            <button
                                onClick={handleToggleFullscreen}
                                className="flex-1 text-white p-2 text-base rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 flex items-center justify-center gap-2 shadow-lg bg-gray-700 hover:bg-gray-600 focus:ring-gray-400 fullscreen-button"
                                aria-label={isFullscreen ? 'Windowed' : 'Fullscreen'}
                            >
                                <span className="text-xl">{isFullscreen ? '↙️' : '↗️'}</span>
                                <span className="text-[13px] uppercase tracking-wider">{isFullscreen ? 'Windowed' : 'Fullscreen'}</span>
                            </button>
                            <div className="flex-1">
                                <VolumeControl volume={volume} setVolume={setVolume} layout="splash" />
                            </div>
                        </div>

                        <button
                            onClick={onEmbark}
                            className="font-title w-1/2 lg:w-1/3 text-black py-3 px-4 text-2xl sm:py-4 sm:px-8 sm:text-4xl rounded-lg transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-lg flex items-center justify-center animate-embark-pulse hover:scale-105 shine-effect"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                <span className="text-2xl mr-2 w-7 h-7 flex items-center justify-center transition-transform duration-150">{embarkEmoji}</span>
                                Embark
                            </span>
                        </button>

                        <p className="text-base sm:text-lg text-gray-200 mt-2" style={{textShadow: '0px 1px 2px rgba(0,0,0,0.5)'}}>
                            🔊 Best in Fullscreen + sound ON 🔊
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TitleStep;