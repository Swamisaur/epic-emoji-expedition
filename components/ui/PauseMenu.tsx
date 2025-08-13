/**
 * @file PauseMenu.tsx
 * @description A UI overlay component that appears when the game is paused.
 * It provides options to resume or restart the game.
 */
import React, { useState, useEffect } from 'react';
import VolumeControl from './VolumeControl';

interface PauseMenuProps {
    onResume: () => void;
    onRestart: () => void;
    volume: number;
    setVolume: (volume: number) => void;
    isFullscreen: boolean;
    handleToggleFullscreen: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ 
    onResume, 
    onRestart, 
    volume, 
    setVolume, 
    isFullscreen, 
    handleToggleFullscreen,
}) => {
    const [confirmRestart, setConfirmRestart] = useState(false);

    // Effect to reset the confirmation state if the component is unmounted (e.g., resumed via button).
    useEffect(() => {
        return () => {
            setConfirmRestart(false);
        };
    }, []);
    
    const handleRestartClick = () => {
        if (confirmRestart) {
            onRestart();
        } else {
            setConfirmRestart(true);
            // After 3 seconds, reset the confirmation state to prevent accidental clicks later.
            setTimeout(() => setConfirmRestart(false), 3000);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50 animate-fade-in p-4">
            <div className="liquid-glass p-8 rounded-xl shadow-2xl flex flex-col gap-6 w-full max-w-sm text-center">
                <h2 className="text-4xl font-bold text-yellow-400">Game Paused</h2>
                <div className="flex flex-col gap-4">
                    <button
                        onClick={onResume}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                    >
                        Resume Game
                    </button>
                    
                    <VolumeControl volume={volume} setVolume={setVolume} layout="full-width" />

                    <button
                        onClick={handleToggleFullscreen}
                        className="w-full bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg flex items-center justify-center gap-2 fullscreen-button"
                        aria-label={isFullscreen ? 'Windowed' : 'Fullscreen'}
                    >
                        <span className="text-xl">{isFullscreen ? '↙️' : '↗️'}</span>
                        {isFullscreen ? 'Windowed' : 'Fullscreen'}
                    </button>
                    <button
                        onClick={handleRestartClick}
                        className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 text-lg ${
                            confirmRestart 
                            ? 'bg-red-700 hover:bg-red-600 focus:ring-red-500' 
                            : 'bg-red-500 hover:bg-red-400 focus:ring-red-400'
                        }`}
                    >
                        {confirmRestart ? 'Are you sure?' : 'Start New Game'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PauseMenu;
