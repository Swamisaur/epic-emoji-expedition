/**
 * @file GuideStep1_Lore.tsx
 * @description The first step of the hero's guide, displaying the game's lore.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import LoreAnimation from './LoreAnimation';

interface GuideStep1_LoreProps {
    onFinished: () => void;
}

const LORE_TEXTS = [
    "🏰 Once there was a Joint 💎\n✨ where Villagers Vibed 😎🎉", 
    "👹 Baddys burst in!😨\n💥Chaos  Everywhere 🔥",
    "😱 Chests burst open 😧\n💎Treasure snatched quick 👋🏻",
    "🤴 Hero Slid deep 🔍\n✨Found Hidden Secrets 🎁",
    "🗡️ Baddy's Booty Spanked 🏆\n👹 It moaned in Pain 😵",
    "👑 Streets chant GLORY 🎉\n 🗣️ Hero giggles to himself 🤪"
];

const GuideStep1_Lore: React.FC<GuideStep1_LoreProps> = ({ onFinished }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const timerRef = useRef<number | null>(null);

    const handleTap = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (currentStep < LORE_TEXTS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            onFinished();
        }
    }, [currentStep, onFinished]);

    useEffect(() => {
        const timedAdvance = () => {
             if (currentStep < LORE_TEXTS.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                onFinished();
            }
        };

        // Faster timers for the first two, shorter lore cards.
        const duration = (currentStep === 0 || currentStep === 1) ? 6000 : 7000;
        
        timerRef.current = window.setTimeout(timedAdvance, duration);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [currentStep, onFinished]);

    const animationDuration = `${(currentStep === 0 || currentStep === 1) ? 6 : 7}s`;

    return (
        <div onClick={handleTap} className="bg-gray-900/50 p-4 rounded-lg w-full flex flex-col lg:flex-row items-center justify-center gap-8 animate-fade-in cursor-pointer">
            <div className="w-full lg:w-1/2 flex-shrink-0">
                <LoreAnimation step={currentStep} />
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col items-center gap-4">
                {/* Lore Counter Chip - Centered above text */}
                <div 
                    key={`chip-${currentStep}`}
                    className="relative bg-black/50 rounded-full px-4 py-0.33 text-sm text-gray-300 font-mono flex items-center gap-3 overflow-hidden border border-yellow-400"
                >
                    <div className="absolute top-0 left-0 h-full bg-white/20" style={{ animation: `lore-chip-progress ${animationDuration} linear forwards` }}/>
                    <span className="relative font-semibold tracking-wider">CHAPTER</span>
                    <span className="relative font-bold text-base">{currentStep + 1}/{LORE_TEXTS.length}</span>
                </div>

                <div className="bg-black/20 p-4 rounded-lg text-center min-h-[6rem] flex items-center justify-center w-full">
                    <p 
                        key={currentStep} 
                        className="font-title text-2xl md:text-3xl text-amber-200 leading-snug animate-lore-text-fade-in max-w-sm mx-auto lore-description-text"
                        style={{ whiteSpace: 'pre-line' }}
                    >
                        {LORE_TEXTS[currentStep]}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GuideStep1_Lore;
