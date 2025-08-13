/**
 * @file winBonus.ts
 * @description Applies the "Magic Necklace" bonus for having won the game.
 */
import { PlayerStats } from '../../types';

/**
 * Applies the permanent win bonus (doubling stats) if the player has won the game.
 * @param stats - The player's current stats object.
 * @param hasWonGame - A boolean indicating if the player has won.
 * @returns A new PlayerStats object with the win bonus applied if applicable.
 */
export const applyWinBonus = (stats: PlayerStats, hasWonGame: boolean): PlayerStats => {
    if (!hasWonGame) {
        return stats;
    }

    const newStats = { ...stats };
    newStats.attackPower *= 2;
    newStats.maxHealth *= 2;
    newStats.attackSpeed *= 2;
    newStats.critChance *= 2;
    newStats.critDamage *= 2;
    newStats.luck *= 2;
    newStats.accuracy *= 2;

    return newStats;
};