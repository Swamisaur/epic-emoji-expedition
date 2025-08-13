/**
 * @file SpecialAbilitiesTab.tsx
 * @description Renders the grid of special ability buttons.
 */
import React from 'react';
import { PlayerClassId, SpecialAbilityId } from '../../../types';
import { ALL_CLASSES } from '../../../constants';
import { isUnlocked } from '../../../utils/unlockLogic';
import AbilityButton from '../AbilityButton';

interface SpecialAbilitiesTabProps {
    playerClassId: PlayerClassId;
    stage: number;
    coins: number;
    cooldowns: Record<string, number>;
    abilityUses: Record<string, number>;
    onUseSpecialAbility: (id: SpecialAbilityId) => void;
    totalUpgradeLevels: number;
    coreUpgradeVariety: number;
}

const SpecialAbilitiesTab: React.FC<SpecialAbilitiesTabProps> = ({ playerClassId, stage, coins, cooldowns, abilityUses, onUseSpecialAbility, totalUpgradeLevels, coreUpgradeVariety }) => {
    const playerClass = ALL_CLASSES.find(c => c.id === playerClassId);
    const abilities = playerClass?.skills || [];
    const playerProgress = { totalUpgradeLevels, coreUpgradeVariety };
    
    return (
        <div className="w-full grid grid-cols-2 gap-3 items-stretch" role="tabpanel">
            {abilities.map(ability => (
                <div key={ability.id}>
                    <AbilityButton 
                        ability={ability} 
                        stage={stage}
                        coins={coins}
                        cooldown={cooldowns[ability.id] ?? 0}
                        abilityUses={abilityUses}
                        onUse={onUseSpecialAbility}
                        isLocked={!isUnlocked(ability, playerProgress)}
                    />
                </div>
            ))}
        </div>
    );
};

export default SpecialAbilitiesTab;
