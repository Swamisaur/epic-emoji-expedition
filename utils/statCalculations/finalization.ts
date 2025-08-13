/**
 * @file finalization.ts
 * @description Performs the final cleanup on player stats.
 */
import { PlayerStats } from '../../types';

/**
 * Cleans up the final stat values, such as flooring numbers and capping percentages.
 * @param stats - The player's stats object after all bonuses have been applied.
 * @returns A new PlayerStats object with finalized values.
 */
export const finalizeStats = (stats: PlayerStats): PlayerStats => {
    const newStats = { ...stats };
    
    newStats.attackPower = Math.floor(newStats.attackPower);
    newStats.maxHealth = Math.floor(newStats.maxHealth);
    newStats.critChance = Math.min(1, newStats.critChance); // Cap crit chance at 100%
    newStats.accuracy = Math.min(1, newStats.accuracy); // Cap accuracy at 100%
    newStats.damageReduction = Math.min(0.9, newStats.damageReduction); // Cap damage reduction at 90%

    return newStats;
};