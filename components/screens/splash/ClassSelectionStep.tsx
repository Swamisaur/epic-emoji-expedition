/**
 * @file ClassSelectionStep.tsx
 * @description The final step of the splash screen, where the user selects their class.
 */
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import StartButton from './StartButton';
import ClassCard from '../../ui/ClassCard';
import { ALL_CLASSES } from '../../../constants';
import type { PlayerEmojiBase, PlayerClassId } from '../../../types';
import WavyText from '../../ui/WavyText';

interface CreatedCharacter {
    name: string;
    baseEmoji: PlayerEmojiBase;
    skinTone: { name: string; color: string; modifier: string; };
    finalEmoji: string;
}

interface ClassSelectionStepProps {
    character: CreatedCharacter;
    onStartGame: (classId: PlayerClassId) => void;
    unlockedAdvancedClasses: Set<PlayerClassId>;
    newlyUnlockedClass: PlayerClassId | null;
}

const ClassSelectionStep: React.FC<ClassSelectionStepProps> = ({ character, onStartGame, unlockedAdvancedClasses, newlyUnlockedClass }) => {
    const [selectedClassId, setSelectedClassId] = useState<PlayerClassId>(newlyUnlockedClass || 'ninja');
    const [embarkEmoji, setEmbarkEmoji] = useState('🚀');

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const embarkEmojis = ['⚔️', '🛡️', '💰', '💎', '👑', '👹', '🔥', '✨', '🚀', '🗺️'];
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % embarkEmojis.length;
            setEmbarkEmoji(embarkEmojis[currentIndex]);
        }, 500);

        return () => clearInterval(intervalId);
    }, []);

    const allClassOptions = useMemo(() => {
        return [...ALL_CLASSES].sort((a, b) => {
            const isALocked = a.tier === 'advanced' && !unlockedAdvancedClasses.has(a.id);
            const isBLocked = b.tier === 'advanced' && !unlockedAdvancedClasses.has(b.id);
            if (isALocked === isBLocked) return 0;
            return isALocked ? 1 : -1;
        });
    }, [unlockedAdvancedClasses]);
    
    const selectedClassIndex = useMemo(() => allClassOptions.findIndex(c => c.id === selectedClassId), [allClassOptions, selectedClassId]);

    const handleClassSelect = useCallback((classId: PlayerClassId) => {
        setSelectedClassId(classId);
        const index = allClassOptions.findIndex(c => c.id === classId);
        if (index !== -1) {
            cardRefs.current[index]?.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }, [allClassOptions]);
    
    const handlePrevClass = useCallback(() => {
        let newIndex = selectedClassIndex - 1;
        while (newIndex >= 0) {
            const isLocked = allClassOptions[newIndex].tier === 'advanced' && !unlockedAdvancedClasses.has(allClassOptions[newIndex].id);
            if (!isLocked) {
                handleClassSelect(allClassOptions[newIndex].id);
                return;
            }
            newIndex--;
        }
    }, [selectedClassIndex, allClassOptions, unlockedAdvancedClasses, handleClassSelect]);

    const handleNextClass = useCallback(() => {
        let newIndex = selectedClassIndex + 1;
        while (newIndex < allClassOptions.length) {
            const isLocked = allClassOptions[newIndex].tier === 'advanced' && !unlockedAdvancedClasses.has(allClassOptions[newIndex].id);
            if (!isLocked) {
                handleClassSelect(allClassOptions[newIndex].id);
                return;
            }
            newIndex++;
        }
    }, [selectedClassIndex, allClassOptions, unlockedAdvancedClasses, handleClassSelect]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                handleNextClass();
            } else if (event.key === 'ArrowLeft') {
                handlePrevClass();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleNextClass, handlePrevClass]);
    
    const isPrevDisabled = useMemo(() => {
        const prevSelectableIndex = allClassOptions.slice(0, selectedClassIndex).reverse().findIndex(c => c.tier !== 'advanced' || unlockedAdvancedClasses.has(c.id));
        return prevSelectableIndex === -1;
    }, [selectedClassIndex, allClassOptions, unlockedAdvancedClasses]);
    
    const isNextDisabled = useMemo(() => {
        const nextSelectableIndex = allClassOptions.findIndex((c, i) => i > selectedClassIndex && (c.tier !== 'advanced' || unlockedAdvancedClasses.has(c.id)));
        return nextSelectableIndex === -1;
    }, [selectedClassIndex, allClassOptions, unlockedAdvancedClasses]);


    const isSelectedClassLocked = useMemo(() => {
        const selectedClass = allClassOptions.find(c => c.id === selectedClassId);
        return selectedClass?.tier === 'advanced' && !unlockedAdvancedClasses.has(selectedClass.id);
    }, [selectedClassId, allClassOptions, unlockedAdvancedClasses]);

    const buttonText = isSelectedClassLocked 
        ? "Choose Another Class"
        : (
            <span className="flex items-center justify-center gap-2">
                <span className="text-3xl w-8 h-8 flex items-center justify-center transition-transform duration-150">{embarkEmoji}</span>
                Begin The Expedition!
            </span>
        );


    return (
        <div 
            className="relative z-10 w-full max-w-4xl liquid-glass rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col gap-4 max-h-[95vh] animate-slide-up-splash no-scrollbar"
        >
            <div className="w-full max-w-xl mx-auto flex flex-col gap-4 items-center">
                <WavyText 
                    text="Choose Your Class"
                    className="text-5xl sm:text-6xl font-extrabold text-yellow-300 text-center"
                    style={{ textShadow: '2px 2px 0 #92400e, 4px 4px 0 #78350f, 6px 6px 0 #451a03, 8px 8px 10px rgba(0,0,0,0.5)' }}
                />

                <div className="flex items-center justify-center gap-4 bg-gray-900/40 p-3 rounded-xl my-2">
                    <span className="text-6xl flex-shrink-0">{character.finalEmoji}</span>
                    <h2 className="text-xl font-bold leading-tight max-w-[250px] text-left">{character.name}</h2>
                </div>
                
                <div className="w-full relative">
                    <button
                        onClick={handlePrevClass}
                        disabled={isPrevDisabled}
                        className="absolute top-1/2 left-0 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-700/90 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-0 transition-opacity z-10 text-white text-2xl"
                        aria-label="Previous class"
                    >
                        ⬅️
                    </button>
                    <div className="carousel-faded-edges -mx-4 sm:-mx-6">
                        <div 
                            ref={scrollContainerRef} 
                            className="flex items-center gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-[35vw] sm:px-[40vw] py-8"
                        >
                            {allClassOptions.map((pc, index) => {
                                const isLocked = pc.tier === 'advanced' && !unlockedAdvancedClasses.has(pc.id);
                                return (
                                    <div 
                                        key={pc.id} 
                                        ref={el => { if (el) cardRefs.current[index] = el; }} 
                                        className="flex-shrink-0 w-48 snap-center"
                                    >
                                        <ClassCard 
                                            playerClass={pc}
                                            isSelected={selectedClassId === pc.id}
                                            onSelect={() => handleClassSelect(pc.id)}
                                            isLocked={isLocked}
                                            unlockDescription={pc.unlockDescription}
                                            isNew={pc.id === newlyUnlockedClass}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                     <button
                        onClick={handleNextClass}
                        disabled={isNextDisabled}
                        className="absolute top-1/2 right-0 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-700/90 rounded-full w-10 h-10 flex items-center justify-center disabled:opacity-0 transition-opacity z-10 text-white text-2xl"
                        aria-label="Next class"
                    >
                        ➡️
                    </button>
                </div>

                <StartButton 
                    onClick={() => onStartGame(selectedClassId)}
                    disabled={isSelectedClassLocked}
                    text={buttonText}
                />
            </div>
        </div>
    );
};

export default ClassSelectionStep;