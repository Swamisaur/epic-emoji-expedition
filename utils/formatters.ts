/**
 * @file formatters.ts
 * @description This file contains utility functions for formatting data for display in the UI.
 */

import { PlayerStats, FormattedPlayerStats, ItemStat, EquipmentSlot, StatModifier, UnlockCriteria } from '../types';
import { PLAYER_ATTACK_INTERVAL_BASE } from '../constants';

/**
 * Takes a PlayerStats object and returns a FormattedPlayerStats object
 * with values converted to human-readable strings.
 * @param playerStats - The raw player stats object.
 * @returns The formatted player stats object.
 */
export const formatPlayerStats = (playerStats: PlayerStats): FormattedPlayerStats => {
    const { luck, accuracy, damageReduction, ...rest } = playerStats;
    const attacksPerSecond = playerStats.attackSpeed / (PLAYER_ATTACK_INTERVAL_BASE / 1000);
    return {
        ...rest,
        attackSpeed: attacksPerSecond.toFixed(2),
        critChance: `${(playerStats.critChance * 100).toFixed(0)}%`,
        critDamage: `${(playerStats.critDamage * 100).toFixed(0)}%`,
        luck: `+${((luck - 1) * 100).toFixed(0)}%`,
        evolveBonus: `+${(playerStats.evolveBonus * 100).toFixed(2)}%`,
        accuracy: `${(accuracy * 100).toFixed(0)}%`,
        damageReduction: `${(damageReduction * 100).toFixed(0)}%`,
    };
};

const STAT_DISPLAY_NAMES: Record<keyof ItemStat, string> = {
    attackPower: 'Attack',
    maxHealth: 'HP',
    attackSpeed: 'Atk Speed',
    critChance: 'Crit',
    critDamage: 'Crit Dmg',
    luck: 'Fortune',
    accuracy: 'Accuracy',
};

/**
 * Converts an item's calculated stats into an array of human-readable strings for display.
 * @param stats - The scaled ItemStat object.
 * @returns An array of formatted stat strings (e.g., ["+10 Attack", "+5% Crit"]).
 */
export const formatItemStatsForDisplay = (stats: ItemStat): string[] => {
    const formatted: string[] = [];
    // Ensure a consistent order
    const statOrder: (keyof ItemStat)[] = ['attackPower', 'maxHealth', 'attackSpeed', 'critChance', 'critDamage', 'luck', 'accuracy'];

    for (const stat of statOrder) {
        const key = stat as keyof ItemStat;
        const value = stats[key];
        if (value) {
            let displayValue = '';
            if (key === 'critChance' || key === 'critDamage' || key === 'luck' || key === 'accuracy') {
                displayValue = `+${(value * 100).toFixed(0)}%`;
            } else if (key === 'attackSpeed') {
                displayValue = `+${value.toFixed(2)}`;
            } else {
                displayValue = `+${Math.floor(value)}`;
            }
            formatted.push(`${displayValue} ${STAT_DISPLAY_NAMES[key]}`);
        }
    }
    return formatted;
}


/**
 * Converts a camelCase equipment slot ID into a human-readable title case string.
 * e.g., 'mainHand' -> 'Main Hand'
 * @param slot The EquipmentSlot to format.
 * @returns The formatted string.
 */
export const formatSlotName = (slot: EquipmentSlot): string => {
    const spaced = slot.replace(/([A-Z])/g, ' $1');
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

/**
 * Converts an ascension count into a letter suffix (A, B, ..., Z, AA, AB, ...).
 * @param count - The ascension count (e.g., 1, 2, 27).
 * @returns An empty string for 0 or less, otherwise the corresponding letter.
 */
export const getAscensionLetter = (count: number): string => {
    if (count <= 0) return '';
    let letter = '';
    let tempCount = count;
    while (tempCount > 0) {
        const remainder = (tempCount - 1) % 26;
        letter = String.fromCharCode(97 + remainder) + letter;
        tempCount = Math.floor((tempCount - 1) / 26);
    }
    return letter.toUpperCase();
};

/**
 * Converts an integer to its Roman numeral representation.
 * @param num - The number to convert. Must be a positive integer.
 * @returns The Roman numeral as a string.
 */
export const numberToRoman = (num: number): string => {
    if (num <= 0) return '';

    const romanMap: { [key: string]: number } = {
        M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
    };

    let result = '';
    for (const key in romanMap) {
        while (num >= romanMap[key]) {
            result += key;
            num -= romanMap[key];
        }
    }
    return result;
};

// --- Effect Formatting ---

/** A map of stat keys to their display-friendly names for event effects. */
const EFFECT_STAT_DISPLAY_NAMES: Partial<Record<keyof PlayerStats, string>> = {
    attackPower: 'Attack Power',
    maxHealth: 'Max Health',
    attackSpeed: 'Attack Speed',
    critChance: 'Crit Chance',
    critDamage: 'Crit Damage',
    luck: 'Fortune',
    accuracy: 'Accuracy',
    damageReduction: 'Damage Reduction',
};

const EFFECT_STAT_EMOJIS: Partial<Record<keyof PlayerStats, string>> = {
    attackPower: '🔥',
    maxHealth: '❤️',
    attackSpeed: '⚡️',
    critChance: '🎯',
    critDamage: '💥',
    luck: '🍀',
    accuracy: '🏹',
    damageReduction: '🛡️',
};

export interface FormattedEffectModifier {
    emoji: string;
    line: string;
    type: 'buff' | 'debuff' | 'info';
}


/**
 * Converts a StatModifier object from an event consequence into an array of
 * detailed, structured objects for rich display.
 * @param modifiers The StatModifier object.
 * @returns An array of FormattedEffectModifier objects.
 */
export const formatEffectModifiers = (modifiers: StatModifier): FormattedEffectModifier[] => {
    const lines: FormattedEffectModifier[] = [];
    const processModifiers = (mods: Partial<Record<keyof PlayerStats, number>>, isPercent: boolean) => {
        for (const [key, value] of Object.entries(mods)) {
            if (value === undefined) continue;
            const statKey = key as keyof PlayerStats;
            const emoji = EFFECT_STAT_EMOJIS[statKey] || '✨';
            const prefix = value > 0 ? '+' : '';
            const name = EFFECT_STAT_DISPLAY_NAMES[statKey] || key;
            const formattedValue = isPercent ? `${(value * 100).toFixed(0)}%` : value.toLocaleString();
            
            lines.push({
                emoji,
                line: `${prefix}${formattedValue} ${name}`,
                type: value > 0 ? 'buff' : 'debuff',
            });
        }
    };

    if (modifiers.flat) processModifiers(modifiers.flat, false);
    if (modifiers.percent) processModifiers(modifiers.percent, true);

    return lines;
};

/**
 * Converts an UnlockCriteria object into an array of human-readable strings.
 * @param criteria - The UnlockCriteria object to format.
 * @returns An array of formatted requirement strings (e.g., ["Requires 10 total levels"]).
 */
export const formatUnlockCriteria = (criteria?: UnlockCriteria): string[] => {
    if (!criteria) {
        return [];
    }
    const requirements: string[] = [];
    if (criteria.requiredTotalLevels) {
        const levelText = criteria.requiredTotalLevels > 1 ? 'levels' : 'level';
        requirements.push(`Requires ${criteria.requiredTotalLevels} total ${levelText}`);
    }
    if (criteria.requiredCoreUpgradeVariety) {
        const upgradeText = criteria.requiredCoreUpgradeVariety > 1 ? 'upgrades' : 'upgrade';
        requirements.push(`Requires ${criteria.requiredCoreUpgradeVariety} core ${upgradeText}`);
    }
    return requirements;
};

/**
 * Correctly applies a Unicode skin tone modifier to a base emoji,
 * handling simple emojis and complex Zero-Width Joiner (ZWJ) sequences.
 * This function is designed to be robust and prevent the creation of invalid,
 * multi-character emoji strings.
 * @param baseEmoji The base emoji string (e.g., '👨‍🦰' or '👍').
 * @param skinToneModifier The Unicode string for the skin tone (e.g., '\u{1F3FB}').
 * @returns The combined emoji string with the skin tone correctly applied.
 */
export const applySkinTone = (baseEmoji: string, skinToneModifier: string): string => {
    if (!skinToneModifier) {
        return baseEmoji;
    }

    const ZWJ = '\u200D';
    
    // This regex finds and removes any existing skin tone modifier.
    const skinToneRegex = /[\u{1F3FB}-\u{1F3FF}]/u;
    const cleanEmoji = baseEmoji.replace(skinToneRegex, '');
    
    // Emojis can be single characters (👍) or complex sequences joined by ZWJ (👩‍🚒).
    // In a sequence, only the first component (the person) should get the skin tone.
    const parts = cleanEmoji.split(ZWJ);
    
    // TRUNCATION: This ensures we only apply the skin tone to the very first "character"
    // of a component. This prevents issues with complex emojis composed of multiple characters
    // or selectors, ensuring a single, valid emoji is always produced.
    const baseComponent = Array.from(parts[0])[0];
    
    // The skin tone modifier itself usually ensures emoji presentation, simplifying the logic.
    const tonedBaseComponent = baseComponent + skinToneModifier;

    // Re-join the toned base with the rest of the sequence (if any).
    parts[0] = tonedBaseComponent;
    return parts.join(ZWJ);
};
