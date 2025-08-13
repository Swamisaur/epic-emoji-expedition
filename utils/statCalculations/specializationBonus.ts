/**
 * @file specializationBonus.ts
 * @description Applies Novice/Expert specialization bonuses based on upgrade levels.
 */
import { PlayerStats, Upgrade, PlayerClassId, StatModifier } from '../../types';
import { ALL_CLASSES, NOVICE_TRANSFORMATION_THRESHOLD, EXPERT_TRANSFORMATION_THRESHOLD } from '../../constants';

const applyModifiers = (stats: PlayerStats, modifiers: StatModifier): PlayerStats => {
    const newStats = { ...stats };
    if (modifiers.percent) {
        for (const [key, value] of Object.entries(modifiers.percent)) {
            const statKey = key as keyof PlayerStats;
            if (typeof newStats[statKey] === 'number' && value !== undefined) {
                // Check if the stat is a percentage/multiplier type that receives additive bonuses
                if (['critChance', 'critDamage', 'luck', 'accuracy', 'damageReduction'].includes(statKey)) {
                    (newStats[statKey] as number) += (value || 0);
                } else {
                    // Otherwise, it's a base stat that receives a multiplicative bonus
                    (newStats[statKey] as number) *= (1 + (value || 0));
                }
            }
        }
    }
    return newStats;
};

export const applySpecializationBonus = (stats: PlayerStats, upgrades: Upgrade[], playerClassId: PlayerClassId): PlayerStats => {
    const playerClass = ALL_CLASSES.find(c => c.id === playerClassId);
    if (!playerClass) return stats;

    const classStatUpgrade = upgrades.find(u => u.id === playerClass.classStatId);
    if (!classStatUpgrade) return stats;

    const classStatLevels = classStatUpgrade.level - 1;
    const coreUpgradeTemplates = playerClass.upgrades.filter(u => u.category === 'core');

    let nextHighestStatLevels = 0;
    coreUpgradeTemplates.forEach(coreUpgradeTpl => {
        if (coreUpgradeTpl.id !== playerClass.classStatId) {
            const upgradeInstance = upgrades.find(u => u.id === coreUpgradeTpl.id);
            const levelsPurchased = upgradeInstance ? upgradeInstance.level - 1 : 0;
            if (levelsPurchased > nextHighestStatLevels) {
                nextHighestStatLevels = levelsPurchased;
            }
        }
    });
    
    const levelDifference = classStatLevels - nextHighestStatLevels;

    if (levelDifference >= EXPERT_TRANSFORMATION_THRESHOLD) {
        return applyModifiers(stats, playerClass.specializationBonuses.expert);
    } else if (levelDifference >= NOVICE_TRANSFORMATION_THRESHOLD) {
        return applyModifiers(stats, playerClass.specializationBonuses.novice);
    }

    return stats;
};
