/**
 * @file animations/index.ts
 * @description Barrel file to export all animation style strings in one array.
 */
import { CORE_UI_ANIMATIONS } from './core';
import { BACKGROUND_ANIMATIONS } from './background';
import { COMBAT_CHARACTER_ANIMATIONS } from './combat';
import { FLOATING_TEXT_ANIMATIONS } from './floatingText';
import { UPGRADE_ABILITY_CARDS } from './cards';
import { SCREEN_SPECIFIC_ANIMATIONS } from './screens';
import { LORE_ANIMATIONS } from './lore';

export const ALL_ANIMATIONS = [
    CORE_UI_ANIMATIONS,
    BACKGROUND_ANIMATIONS,
    COMBAT_CHARACTER_ANIMATIONS,
    FLOATING_TEXT_ANIMATIONS,
    UPGRADE_ABILITY_CARDS,
    SCREEN_SPECIFIC_ANIMATIONS,
    LORE_ANIMATIONS,
];