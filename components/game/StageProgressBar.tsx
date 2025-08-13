/**
 * @file StageProgressBar.tsx
 * @description Displays the player's progress through the current stage using a series of dots.
 */
import React from 'react';
import { ENEMIES_PER_STAGE } from '../../constants';

interface StageProgressBarProps {
    stage: number;
    subStage: number;
    realmThemeColor: string;
    playerSkinToneColor: string;
}

const StageProgressBar: React.FC<StageProgressBarProps> = ({ stage, subStage, realmThemeColor, playerSkinToneColor }) => {
    
    /**
     * Determines the color of a progress dot based on its state.
     * @param index The 1-based index of the dot.
     * @returns A CSS color string.
     */
    const getDotColor = (index: number) => {
        const isBossDot = index === ENEMIES_PER_STAGE + 1;
        const isCurrentDot = index === subStage;
        const isCompletedDot = index < subStage;

        if (isBossDot) {
            return '#ef4444'; // Red for the boss dot, always.
        }
        if (isCurrentDot) {
            return playerSkinToneColor; // Skin tone for the current non-boss dot.
        }
        if (isCompletedDot) {
            return realmThemeColor; // Realm theme for completed dots.
        }
        return '#4B5563'; // Gray for upcoming dots.
    };

    return (
        <div className="max-w-xs" aria-label={`Stage progress: ${subStage} of ${ENEMIES_PER_STAGE + 1}`}>
            <div className="flex justify-start items-center gap-1">
                {[...Array(ENEMIES_PER_STAGE + 1)].map((_, i) => {
                    const dotIndex = i + 1;
                    const dotColor = getDotColor(dotIndex);
                    const hasShadow = dotIndex <= subStage;

                    return (
                        <div 
                            key={i} 
                            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors duration-300 ${dotIndex === subStage ? 'animate-pulse-dot' : ''}`}
                            style={{
                                backgroundColor: dotColor,
                                boxShadow: hasShadow ? `0 0 5px ${dotColor}` : 'none',
                            }}
                            title={`Encounter ${dotIndex} of ${ENEMIES_PER_STAGE + 1}`}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

export default StageProgressBar;