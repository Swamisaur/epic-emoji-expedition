/**
 * @file evolveBonus.ts
 * @description Applies the permanent evolve bonus to the player's stats.
 */
import { PlayerStats } from '../../types';

/**
 * Applies the Evolve bonus to the player's stats. This is the first
 * major bonus applied in the pipeline.
 * @param stats - The player's current stats object.
 * @param evolveBonus - The percentage bonus from evolving (e.g., 0.1 for 10%).
 * @returns A new PlayerStats object with the evolve bonus applied.
 */
export const applyEvolveBonus = (stats: PlayerStats, evolveBonus: number): PlayerStats => {
    const newStats = { ...stats };
    const bonus = evolveBonus || 0;
    
    // Evolve bonus is a multiplier for core base stats
    newStats.attackPower *= (1 + bonus);
    newStats.attackSpeed *= (1 + bonus);
    newStats.maxHealth *= (1 + bonus);
    
    // For percentage-based stats, it's an additive bonus
    newStats.critChance += bonus;
    newStats.critDamage += bonus;
    newStats.luck += bonus;

    newStats.evolveBonus = bonus;
    return newStats;
};