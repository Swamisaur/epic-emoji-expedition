/**
 * @file baseStats.ts
 * @description Provides the initial base stats for the player.
 */
import { PlayerStats, PlayerClassId } from '../../types';
import { ALL_CLASSES } from '../../constants';

/**
 * Returns a fresh copy of the initial player stats for a given class.
 * @param playerClassId The ID of the player's class.
 * @returns A PlayerStats object.
 */
export const getInitialPlayerStats = (playerClassId: PlayerClassId): PlayerStats => {
    const playerClass = ALL_CLASSES.find(c => c.id === playerClassId);
    if (!playerClass) {
        console.error(`Class with id ${playerClassId} not found. Falling back to the first available class.`);
        const fallbackClass = ALL_CLASSES[0];
        return { ...fallbackClass.baseStats, evolveBonus: 0, damageReduction: 0 };
    }
    return { ...playerClass.baseStats, evolveBonus: 0, damageReduction: 0 };
};