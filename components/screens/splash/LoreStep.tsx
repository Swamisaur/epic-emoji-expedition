/**
 * @file LoreStep.tsx
 * @description The second step of the splash screen, which now manages a multi-step
 * animated guide to the game's lore, mechanics, and goals.
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import GuideStep1_Lore from './GuideStep1_Lore';
import GuideStep2_HowToPlay from './GuideStep2_HowToPlay';
import GuideStep3_Goal from './GuideStep3_Goal';
import WavyText from '../../ui/WavyText';

interface LoreStepProps {
    onContinue: () => void;
}

const LoreStep: React.FC<LoreStepProps> = ({ onContinue }) => {
    const [guideStep, setGuideStep] = useState(1);
    const [cardAnimationStep, setCardAnimationStep] = useState(0);
    const totalSteps = 3;

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Reset card animation when we move to a new guide step
        setCardAnimationStep(0);
        cardRefs.current = []; // Reset refs for new set of cards
    
        // Start card animation sequence if we are on a step that has cards
        if (guideStep === 2 || guideStep === 3) {
            const totalCards = guideStep === 2 ? 4 : 6; // GuideStep2 has 4, GuideStep3 has 6
            const timeouts: number[] = [];
            
            for (let i = 0; i < totalCards; i++) {
                // Stagger the appearance of each card
                const timeout = window.setTimeout(() => {
                    setCardAnimationStep(prev => prev + 1);
                }, i * 1500);
                timeouts.push(timeout);
            }
            return () => timeouts.forEach(clearTimeout);
        }
    }, [guideStep]);

    // Autoscroll effect
    useEffect(() => {
        const cardIndex = cardAnimationStep - 1;
        if (cardIndex < 0) return;

        const cardToScrollTo = cardRefs.current[cardIndex];
        const container = scrollContainerRef.current;

        if (cardToScrollTo && container) {
            // Delay scrolling slightly to allow card to render and animate in
            const timeoutId = setTimeout(() => {
                cardToScrollTo.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                });
            }, 150);

            return () => clearTimeout(timeoutId);
        }
    }, [cardAnimationStep]);

    const handleNext = () => {
        if (guideStep < totalSteps) {
            setGuideStep(s => s + 1);
        } else {
            onContinue();
        }
    };

    const renderGuideStep = () => {
        switch (guideStep) {
            case 1: return <GuideStep1_Lore onFinished={handleNext} />;
            case 2: return <GuideStep2_HowToPlay cardAnimationStep={cardAnimationStep} cardRefs={cardRefs} />;
            case 3: return <GuideStep3_Goal cardAnimationStep={cardAnimationStep} cardRefs={cardRefs} />;
            default: return null;
        }
    };

    const titleText = guideStep === 1 ? "Once upon a time" : "Learn The Basics";

    return (
        <div onClick={handleNext} className="relative z-10 w-full max-w-4xl lg:max-w-6xl liquid-glass rounded-2xl shadow-2xl p-4 md:p-8 flex flex-col gap-4 max-h-[85vh] animate-slide-up-splash cursor-pointer">
            <div className="flex-shrink-0">
                <WavyText 
                    text={titleText}
                    className="text-4xl sm:text-5xl text-yellow-300 text-center font-title"
                    style={{ textShadow: '2px 2px 0 #92400e, 4px 4px 0 #78350f, 6px 6px 0 #451a03, 8px 8px 10px rgba(0,0,0,0.5)' }}
                />
            </div>
            
            <div ref={scrollContainerRef} className="flex-grow flex items-start justify-center overflow-y-auto no-scrollbar py-4 min-h-0">
                <div key={guideStep} className="w-full">
                    {renderGuideStep()}
                </div>
            </div>

            <div className="flex flex-col items-center gap-3 flex-shrink-0">
                {/* Progress Dots */}
                <div className="flex gap-2">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                guideStep === index + 1 ? 'bg-yellow-400' : 'bg-gray-600 border border-black'
                            }`}
                        />
                    ))}
                </div>
                <div className="text-2xl text-gray-200 tracking-widest animate-pulse font-bold flex items-center gap-2" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                    <span className="text-3xl">👆</span> Tap to Skip
                </div>
            </div>
        </div>
    );
};

export default LoreStep;