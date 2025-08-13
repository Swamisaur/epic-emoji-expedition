/**
 * @file itemBonuses.ts
 * @description Applies bonuses from equipped items to the player's stats.
 */
import { PlayerStats, EquippedItems } from '../../types';
import { getCombinedItemStats } from '../itemStatCalculations';

/**
 * Adds the combined stats from all equipped items to the player's stats.
 * @param stats - The player's current stats object.
 * @param equippedItems - The player's currently equipped items.
 * @param totalUpgradeLevels - The total number of levels purchased for scaling items.
 * @returns A new PlayerStats object with item bonuses applied.
 */
export const applyItemBonuses = (stats: PlayerStats, equippedItems: EquippedItems, totalUpgradeLevels: number): PlayerStats => {
    const newStats = { ...stats };
    const itemStats = getCombinedItemStats(equippedItems, totalUpgradeLevels);
    
    newStats.attackPower += itemStats.attackPower ?? 0;
    newStats.maxHealth += itemStats.maxHealth ?? 0;
    newStats.attackSpeed += itemStats.attackSpeed ?? 0;
    newStats.critChance += itemStats.critChance ?? 0;
    newStats.critDamage += itemStats.critDamage ?? 0;
    newStats.luck += itemStats.luck ?? 0;
    newStats.accuracy += itemStats.accuracy ?? 0;

    return newStats;
};