/**
 * @file playerStatCalculations.ts
 * @description Contains the core pipeline for calculating the player's final stats
 * by composing a series of modular calculation functions.
 */

import { PlayerStats, Upgrade, EquippedItems, ActiveEffect, PlayerClassId } from '../../types';
import {
    getInitialPlayerStats,
    applyEvolveBonus,
    applyClassModifiers,
    applyUpgradeBonuses,
    applySpecializationBonus,
    applyItemBonuses,
    applyActiveEffects,
    applyWinBonus,
    finalizeStats
} from './statCalculations';


/**
 * Calculates the player's final stats by running them through a multi-stage pipeline.
 * This function orchestrates various modifiers to produce the final values.
 * @param upgrades - The player's current list of upgrades.
 * @param evolveBonus - The player's permanent bonus from the Evolve mechanic.
 * @param equippedItems - The player's currently equipped items.
 * @param totalUpgradeLevels - The total number of levels purchased for scaling items.
 * @param hasWonGame - Whether the player has the Magic Necklace buff.
 * @param activeEffects - Any temporary buffs or debuffs from events.
 * @param playerClassId - The player's current class ID.
 * @returns A new PlayerStats object with the calculated values.
 */
export const calculatePlayerStats = (
    upgrades: Upgrade[],
    evolveBonus: number,
    equippedItems: EquippedItems,
    totalUpgradeLevels: number,
    hasWonGame: boolean,
    activeEffects: ActiveEffect[],
    playerClassId: PlayerClassId
): PlayerStats => {

    // The calculation pipeline:
    // 1. Get base stats for the specific class.
    let stats = getInitialPlayerStats(playerClassId);
    
    // 2. Apply permanent evolve bonus.
    stats = applyEvolveBonus(stats, evolveBonus);
    
    // 3. Apply class modifiers (placeholder for future).
    stats = applyClassModifiers(stats);
    
    // 4. Apply flat and percentage bonuses from upgrades.
    stats = applyUpgradeBonuses(stats, upgrades);
    
    // 5. Apply Novice/Expert specialization bonuses.
    stats = applySpecializationBonus(stats, upgrades, playerClassId);
    
    // 6. Add stats from equipped items.
    stats = applyItemBonuses(stats, equippedItems, totalUpgradeLevels);
    
    // 7. Add stats from temporary event effects.
    stats = applyActiveEffects(stats, activeEffects);

    // 8. Apply final global multipliers like the win bonus.
    stats = applyWinBonus(stats, hasWonGame);
    
    // 9. Clean up and clamp final values.
    stats = finalizeStats(stats);
    
    return stats;
};
