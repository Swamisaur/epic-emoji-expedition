/**
 * @file data/realms/whisperingWoods.ts
 * @description Defines the Whispering Woods realm theme.
 */
import { RealmTheme } from '../../types';

export const whisperingWoods: RealmTheme = {
    name: 'Whispering Woods',
    emojis: ['🌲', '🌳', '🌿', '🍄', '🦋'], color: '120, 40%, 55%',
    minions: [
        { name: 'Angry Mushroom', emoji: '🍄', attackEmoji: '💨' },
        { name: 'Cave Bat', emoji: '🦇', attackEmoji: '〰️' },
        { name: 'Giant Spider', emoji: '🕷️', attackEmoji: '🕸️' },
        { name: 'Wild Boar', emoji: '🐗', attackEmoji: '💨' },
        { name: 'Dire Wolf', emoji: '🐺', attackEmoji: '🦷' },
    ],
    boss: {
        name: 'Goblin King',
        epithet: 'The Grimy Tyrant:',
        emoji: '🧌',
        attackEmoji: '🪓',
        specialAttack: { emoji: '🐗', damageMultiplier: 2.5, chargeTime: 1000 },
    },
};
