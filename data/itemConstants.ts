/**
 * @file data/itemConstants.ts
 * @description Contains constants related to item drops, rarity, and scaling.
 */

import { Rarity } from '../types';

// --- ITEMS & DROPS ---

/** The factor by which item stats are scaled per total upgrade level. */
export const ITEM_STAT_SCALING_FACTOR = 0.02; // 2% per level

/** The factors by which the luck bonus is multiplied to determine rarity chances. */
export const RARITY_LUCK_FACTORS = {
    rare: 0.5,      // rare_chance = (luck - 1) * 0.5
    legendary: 0.25, // legendary_chance = (luck - 1) * 0.25
};

/** The stat multiplier applied to items based on their rarity. */
export const RARITY_STAT_MULTIPLIERS: Record<Rarity, number> = {
    common: 1.0,
    rare: 1.5,
    legendary: 2.5,
};

/** Tailwind CSS border colors for each item rarity. */
export const RARITY_BORDER_COLORS: Record<Rarity, string> = {
    common: 'border-gray-600',
    rare: 'border-blue-500',
    legendary: 'border-purple-500',
};
