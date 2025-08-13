/**
 * @file playerVisuals.ts
 * @description Contains logic related to the player's visual appearance, such as transformations.
 */

import { Upgrade, PlayerInfo, TransformationEmojis, ClassTransformations, PlayerClassId, StatFocus, PlayerEmojiBase } from '../types';
import { ALL_CLASSES, NOVICE_TRANSFORMATION_THRESHOLD, EXPERT_TRANSFORMATION_THRESHOLD, PLAYER_EMOJI_CATEGORIES } from '../constants';
import { applySkinTone } from './formatters';

export const getPlayerStatFocus = (upgrades: Upgrade[], playerClassId: PlayerClassId): StatFocus | null => {
    const playerClass = ALL_CLASSES.find(c => c.id === playerClassId);
    if (!playerClass || !playerClass.transformations) {
        return null;
    }

    const coreUpgradeTemplates = playerClass.upgrades.filter(u => u.category === 'core');

    const coreLevels = coreUpgradeTemplates.map(tpl => {
        const upgradeInstance = upgrades.find(u => u.id === tpl.id);
        const levelsPurchased = upgradeInstance ? upgradeInstance.level - 1 : 0;
        const transform = playerClass.transformations.find(t => t.upgradeId === tpl.id);
        return { levels: levelsPurchased, transform };
    }).filter(item => item.transform !== undefined) as { levels: number, transform: ClassTransformations }[];

    if (coreLevels.length === 0) {
        return null;
    }
    
    coreLevels.sort((a, b) => b.levels - a.levels);

    const highest = coreLevels[0];
    const secondHighestLevel = coreLevels.length > 1 ? coreLevels[1].levels : 0;

    // A focus is defined if the highest stat is strictly higher than the second highest.
    if (highest.levels > secondHighestLevel) {
        return highest.transform.focus;
    }

    return null;
};

/**
 * Determines a player's gender category based on their base emoji.
 * @param baseEmoji The player's base emoji string.
 * @returns 'male', 'female', or 'neutral'.
 */
export const getPlayerGender = (baseEmoji: string): 'male' | 'female' | 'neutral' => {
    if (PLAYER_EMOJI_CATEGORIES.male.includes(baseEmoji as PlayerEmojiBase)) {
        return 'male';
    }
    if (PLAYER_EMOJI_CATEGORIES.female.includes(baseEmoji as PlayerEmojiBase)) {
        return 'female';
    }
    return 'neutral';
};


/**
 * Determines the player's current emoji based on the level difference between their
 * highest and second-highest core stat upgrades.
 * @param upgrades - The player's current list of upgrades.
 * @param playerInfo - The player's core info, including class, base emoji, and skin tone.
 * @returns The transformed emoji string or the base emoji string if no transformation is met.
 */
export const determinePlayerTransformation = (upgrades: Upgrade[], playerInfo: PlayerInfo | null): string => {
    if (!playerInfo) {
        return '🧑'; // Default emoji if no player info
    }

    const { playerClassId, baseEmoji, skinTone } = playerInfo;
    const defaultEmoji = applySkinTone(baseEmoji, skinTone);

    const playerClass = ALL_CLASSES.find(c => c.id === playerClassId);
    if (!playerClass || !playerClass.transformations) {
        return defaultEmoji;
    }

    const coreUpgradeTemplates = playerClass.upgrades.filter(u => u.category === 'core');
    
    // Calculate levels for all core stats
    const coreLevels = coreUpgradeTemplates.map(tpl => {
        const upgradeInstance = upgrades.find(u => u.id === tpl.id);
        const levelsPurchased = upgradeInstance ? upgradeInstance.level - 1 : 0;
        const transform = playerClass.transformations.find(t => t.upgradeId === tpl.id);
        return { levels: levelsPurchased, transform };
    }).filter(item => item.transform !== undefined) as { levels: number, transform: ClassTransformations }[];

    // Sort by level to easily find the highest and second highest
    coreLevels.sort((a, b) => b.levels - a.levels);

    if (coreLevels.length === 0) {
        return defaultEmoji;
    }

    const highest = coreLevels[0];
    const secondHighestLevel = coreLevels.length > 1 ? coreLevels[1].levels : 0;

    const levelDifference = highest.levels - secondHighestLevel;
    
    // If the level difference doesn't meet the first threshold, no transformation occurs
    if (levelDifference < NOVICE_TRANSFORMATION_THRESHOLD) {
        return defaultEmoji;
    }
    
    // Determine the tier (Novice or Expert) based on the level difference
    let transformationEmojis: TransformationEmojis | null = null;
    if (levelDifference >= EXPERT_TRANSFORMATION_THRESHOLD) {
        transformationEmojis = highest.transform.expert;
    } else { // It's >= NOVICE_TRANSFORMATION_THRESHOLD here
        transformationEmojis = highest.transform.novice;
    }
    
    if (!transformationEmojis) {
        return defaultEmoji;
    }
    
    let baseTransformEmoji: string;
    const playerGender = getPlayerGender(baseEmoji);
    
    // Select gendered emoji based on the player's base character choice
    switch (playerGender) {
        case 'female':
            baseTransformEmoji = transformationEmojis.female;
            break;
        case 'male':
            baseTransformEmoji = transformationEmojis.male;
            break;
        default: // 'neutral' and any other fallbacks
            baseTransformEmoji = transformationEmojis.neutral;
            break;
    }
    
    return applySkinTone(baseTransformEmoji, skinTone);
};
