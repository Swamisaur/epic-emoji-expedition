/**
 * @file itemStatCalculations.ts
 * @description Contains logic for calculating item stats, including scaling based on player level and rarity.
 */
import { ItemStat, Item, EquippedItems, Rarity } from '../types';
import { ITEM_STAT_SCALING_FACTOR, RARITY_STAT_MULTIPLIERS } from '../constants';


/**
 * Calculates the scaled stats for a single item based on its base stats and the player's level.
 * @param item - The item to calculate stats for.
 * @param totalUpgradeLevels - The total number of upgrade levels purchased by the player.
 * @returns An ItemStat object containing the scaled bonuses for that single item.
 */
export const getScaledItemStatsForItem = (item: Item, totalUpgradeLevels: number): ItemStat => {
    const scaledStats: ItemStat = {};
    const levelScalingMultiplier = 1 + totalUpgradeLevels * ITEM_STAT_SCALING_FACTOR;
    const rarityMultiplier = RARITY_STAT_MULTIPLIERS[item.rarity];

    for (const stat in item.baseStats) {
        const key = stat as keyof ItemStat;
        const baseValue = item.baseStats[key] ?? 0;
        
        // Percentage stats and attack speed are flat bonuses from items and do not scale with level, but they DO scale with rarity.
        const isDirectStat = key === 'critChance' || key === 'luck' || key === 'critDamage' || key === 'attackSpeed' || key === 'accuracy';
        
        let scaledValue: number;
        if (isDirectStat) {
            scaledValue = baseValue * rarityMultiplier;
        } else {
            scaledValue = baseValue * levelScalingMultiplier * rarityMultiplier;
        }
        
        scaledStats[key] = scaledValue;
    }
    return scaledStats;
};


/**
 * Calculates the total bonus stats from all equipped items, scaled by the player's level.
 * @param equippedItems - The items the player has equipped.
 * @param totalUpgradeLevels - The total number of upgrade levels purchased by the player.
 * @returns An ItemStat object containing the sum of all item bonuses.
 */
export const getCombinedItemStats = (equippedItems: EquippedItems, totalUpgradeLevels: number): ItemStat => {
    const totalItemStats: ItemStat = {
        attackPower: 0,
        maxHealth: 0,
        attackSpeed: 0,
        critChance: 0,
        critDamage: 0,
        luck: 0,
        accuracy: 0,
    };

    for (const slot in equippedItems) {
        const item = equippedItems[slot as keyof EquippedItems];
        if (item) {
            const scaledStats = getScaledItemStatsForItem(item, totalUpgradeLevels);
            for (const stat in scaledStats) {
                const key = stat as keyof ItemStat;
                totalItemStats[key] = (totalItemStats[key] ?? 0) + (scaledStats[key] ?? 0);
            }
        }
    }
    return totalItemStats;
};