/**
 * @file TransformationsSummary.tsx
 * @description Displays the character transformations that occurred during the run.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { ALL_CLASSES, TRANSFORMATION_TEXT } from '../../../constants';
import { PlayerClassId } from '../../../types';

interface TransformationsSummaryProps {
    transformations: string[];
    startAnimation: boolean;
    playerClassId: PlayerClassId;
}

const TransformationsSummary: React.FC<TransformationsSummaryProps> = ({ transformations, startAnimation, playerClassId }) => {
    const [revealed, setRevealed] = useState<{ emoji: string; text: string }[]>([]);

    // Create a memoized map of all transformation emojis for the current class to their thematic text.
    const transformationFlavorText = useMemo(() => {
        const textMap = new Map<string, string>();
        const skinToneAndVariationSelectorRegex = /[\u{1F3FB}-\u{1F3FF}\uFE0F]/gu;

        const playerClass = ALL_CLASSES.find(c => c.id === playerClassId);
        if (!playerClass) return textMap;

        const classTexts = TRANSFORMATION_TEXT[playerClassId];
        if (!classTexts) return textMap;

        for (const transformation of playerClass.transformations) {
            const focus = transformation.focus;
            const text = classTexts[focus];
            if (text) {
                // Map all gender variations of novice and expert emojis to ensure a match
                const allNoviceEmojis = [transformation.novice.neutral, transformation.novice.male, transformation.novice.female];
                const allExpertEmojis = [transformation.expert.neutral, transformation.expert.male, transformation.expert.female];

                for(const emoji of allNoviceEmojis) {
                    const cleanEmoji = emoji.replace(skinToneAndVariationSelectorRegex, '');
                    if (!textMap.has(cleanEmoji)) {
                        textMap.set(cleanEmoji, text);
                    }
                }
                for(const emoji of allExpertEmojis) {
                    const cleanEmoji = emoji.replace(skinToneAndVariationSelectorRegex, '');
                     if (!textMap.has(cleanEmoji)) {
                        textMap.set(cleanEmoji, text);
                    }
                }
            }
        }
        return textMap;
    }, [playerClassId]);

    useEffect(() => {
        if (!startAnimation || transformations.length === 0) return;

        const skinToneAndVariationSelectorRegex = /[\u{1F3FB}-\u{1F3FF}\uFE0F]/gu;
        const timeouts: number[] = [];

        transformations.forEach((emoji, index) => {
            const timeout = window.setTimeout(() => {
                const cleanEmoji = emoji.replace(skinToneAndVariationSelectorRegex, '');
                const text = transformationFlavorText.get(cleanEmoji) || 'Underwent a change';
                setRevealed(prev => [...prev, { emoji, text }]);
            }, index * 250);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [transformations, startAnimation, transformationFlavorText]);

    if (transformations.length === 0) {
        return <p className="text-gray-500 text-sm italic w-full text-center py-4">No transformations occurred.</p>;
    }

    const finalTransformationEmoji = transformations[transformations.length - 1];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-black/20 p-2 rounded-lg min-h-[5rem]">
            {revealed.map(({ emoji, text }, index) => {
                const isFinal = emoji === finalTransformationEmoji && index === revealed.length - 1;
                return (
                    <div
                        key={index}
                        title={text}
                        className={`w-full p-1.5 rounded-lg text-white shadow-md flex flex-col items-center justify-center min-h-[5rem] opacity-0 animate-item-pop-common 
                            ${isFinal 
                                ? 'border-2 border-yellow-400 animate-pulse-border-green bg-green-900/50' 
                                : 'bg-gray-700/50'
                            }`}
                    >
                        <span className="text-4xl">{emoji}</span>
                        <span className="text-[10px] font-bold text-center leading-tight mt-1">{text}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default TransformationsSummary;
