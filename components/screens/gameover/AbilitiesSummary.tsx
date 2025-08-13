

/**
 * @file AbilitiesSummary.tsx
 * @description Displays the special abilities used during the run with a sequential animation.
 */
import React, { useState, useEffect, useMemo } from 'react';
import { SpecialAbility } from '../../../types';
import { ALL_CLASSES } from '../../../constants';
import MiniAbilityCard from './MiniAbilityCard';

interface AbilitiesSummaryProps {
    abilityUses: Record<string, number>;
    startAnimation: boolean;
}

const AbilitiesSummary: React.FC<AbilitiesSummaryProps> = ({ abilityUses, startAnimation }) => {
    const [revealedAbilities, setRevealedAbilities] = useState<SpecialAbility[]>([]);

    const usedAbilities = useMemo(() => {
        const SPECIAL_ABILITIES = ALL_CLASSES.flatMap(c => c.skills);
        return SPECIAL_ABILITIES.filter(ability => (abilityUses[ability.id] ?? 0) > 0);
    }, [abilityUses]);
    
    useEffect(() => {
        if (!startAnimation || usedAbilities.length === 0) return;

        const timeouts: number[] = [];
        usedAbilities.forEach((ability, index) => {
            const timeout = window.setTimeout(() => {
                setRevealedAbilities(prev => [...prev, ability]);
            }, index * 200); // 200ms delay between each ability card appearing
            timeouts.push(timeout);
        });
        
        return () => timeouts.forEach(clearTimeout);
    }, [usedAbilities, startAnimation]);

    if (usedAbilities.length === 0) {
        return <p className="text-gray-500 text-sm italic w-full text-center py-4">No special abilities were used.</p>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-black/20 p-2 rounded-lg">
            {revealedAbilities.map(ability => (
                <div key={ability.id} className="animate-vanquished-enemy">
                     <MiniAbilityCard 
                        ability={ability}
                        useCount={abilityUses[ability.id]}
                     />
                </div>
            ))}
        </div>
    );
};

export default AbilitiesSummary;