/**
 * @file data/realms/fallenCitadel.ts
 * @description Defines the Fallen Citadel realm theme.
 */
import { RealmTheme } from '../../types';

export const fallenCitadel: RealmTheme = {
    name: 'Fallen Citadel',
    emojis: ['🏰', '🛡️', '⚔️', '👑', '🧱'], color: '240, 10%, 60%',
    minions: [
        { name: 'Animated Armor', emoji: '🛡️', attackEmoji: '⚔️' },
        { name: 'Guard Dog', emoji: '🐕', attackEmoji: '🦷' },
        { name: 'Skeleton Warrior', emoji: '💀', attackEmoji: '🦴' },
        { name: 'Castle Ogre', emoji: '👹', attackEmoji: '👊' },
        { name: 'Stone Gargoyle', emoji: '🪨', attackEmoji: '🧱' },
    ],
    boss: {
        name: 'The Lich',
        epithet: 'The Undying King:',
        emoji: '🧟',
        attackEmoji: '💀',
        specialAttack: { emoji: '👻', damageMultiplier: 2.5, chargeTime: 1000 },
    },
};
