/**
 * @file RunSummary.tsx
 * @description A component to display the summary of a completed run,
 * such as the list of defeated enemies, with an engaging animation.
 */
import React, { useState, useEffect } from 'react';
import { Enemy } from '../../../types';

interface RunSummaryProps {
    defeatedEnemies: Enemy[];
    startAnimation: boolean;
}

/** Helper to get the CSS animation class for an archetype's glow effect. */
const getGlowClass = (archetype: Enemy['archetype'] | undefined): string => {
    if (!archetype || archetype === 'standard') return '';
    switch (archetype) {
        case 'swift': return 'animate-glow-swift';
        case 'heavy': return 'animate-glow-heavy';
        case 'arcane': return 'animate-glow-arcane';
        case 'vampiric': return 'animate-glow-vampiric';
        case 'juggernaut': return 'animate-glow-juggernaut';
        default: return '';
    }
};

const RunSummary: React.FC<RunSummaryProps> = ({ defeatedEnemies, startAnimation }) => {
    const [displayedEnemies, setDisplayedEnemies] = useState<Enemy[]>([]);

    useEffect(() => {
        if (!startAnimation || defeatedEnemies.length === 0 || displayedEnemies.length > 0) {
            return;
        }

        const timeouts: number[] = [];

        // Stagger the appearance of each defeated enemy emoji for a more dynamic effect.
        const staggerDelay = 80; // ms

        defeatedEnemies.forEach((enemy, index) => {
            const timeout = setTimeout(() => {
                setDisplayedEnemies(prev => [...prev, enemy]);
            }, index * staggerDelay);
            timeouts.push(timeout);
        });
        
        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [defeatedEnemies, startAnimation]);

    return (
        <div className="relative bg-black/20 rounded-lg">
            <div className="p-2">
                <div className="flex flex-wrap justify-start items-center gap-2 min-h-[3rem]">
                    {displayedEnemies.map((enemy, index) => {
                        const glowClass = getGlowClass(enemy.archetype);
                        return (
                             <span 
                                key={`${enemy.id}-${index}`} 
                                className="text-4xl animate-vanquished-enemy"
                                title={enemy.name}
                            >
                                <span className={glowClass}>
                                    {enemy.emoji}
                                </span>
                            </span>
                        );
                    })}
                    {startAnimation && defeatedEnemies.length === 0 && <p className="text-gray-500 text-sm italic w-full text-center">None were vanquished this time.</p>}
                </div>
            </div>
        </div>
    );
};

export default RunSummary;