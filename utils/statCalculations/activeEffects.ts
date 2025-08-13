/**
 * @file activeEffects.ts
 * @description Applies bonuses from active event effects (buffs/debuffs) to the player's stats.
 */
import { PlayerStats, ActiveEffect, StatModifier } from '../../types';

/**
 * Applies all stat modifiers from the player's active effects (buffs/debuffs).
 * @param stats - The player's current stats object.
 * @param activeEffects - The list of active effects from events.
 * @returns A new PlayerStats object with the temporary effect bonuses applied.
 */
export const applyActiveEffects = (stats: PlayerStats, activeEffects: ActiveEffect[]): PlayerStats => {
    if (activeEffects.length === 0) {
        return stats;
    }

    const newStats = { ...stats };
    
    // First, aggregate all flat and percent modifiers from all active effects.
    const totalModifiers: StatModifier = activeEffects.reduce((acc, effect) => {
        // Aggregate flat modifiers
        if (effect.modifiers.flat) {
            for (const key in effect.modifiers.flat) {
                const statKey = key as keyof typeof effect.modifiers.flat;
                acc.flat = acc.flat || {};
                acc.flat[statKey] = (acc.flat[statKey] || 0) + (effect.modifiers.flat[statKey] || 0);
            }
        }
        // Aggregate percent modifiers
        if (effect.modifiers.percent) {
            for (const key in effect.modifiers.percent) {
                const statKey = key as keyof typeof effect.modifiers.percent;
                acc.percent = acc.percent || {};
                acc.percent[statKey] = (acc.percent[statKey] || 0) + (effect.modifiers.percent[statKey] || 0);
            }
        }
        return acc;
    }, { flat: {}, percent: {} });

    // Apply aggregated flat bonuses
    if (totalModifiers.flat) {
        newStats.attackPower += totalModifiers.flat.attackPower ?? 0;
        newStats.maxHealth += totalModifiers.flat.maxHealth ?? 0;
        newStats.attackSpeed += totalModifiers.flat.attackSpeed ?? 0;
    }

    // Apply aggregated percent bonuses
    if (totalModifiers.percent) {
        newStats.attackPower *= (1 + (totalModifiers.percent.attackPower ?? 0));
        newStats.maxHealth *= (1 + (totalModifiers.percent.maxHealth ?? 0));
        newStats.attackSpeed *= (1 + (totalModifiers.percent.attackSpeed ?? 0));
        newStats.critChance += totalModifiers.percent.critChance ?? 0;
        newStats.critDamage += totalModifiers.percent.critDamage ?? 0;
        newStats.luck += totalModifiers.percent.luck ?? 0;
        newStats.accuracy += totalModifiers.percent.accuracy ?? 0;
    }

    return newStats;
};