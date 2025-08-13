/**
 * @file data/realms/infernoPeak.ts
 * @description Defines the Inferno Peak realm theme.
 */
import { RealmTheme } from '../../types';

export const infernoPeak: RealmTheme = {
    name: 'Inferno Peak',
    emojis: ['🌋', '🔥', '☄️', '👹', '🧱'], color: '15, 60%, 50%',
    minions: [
        { name: 'Volcanic Hatchling', emoji: '🐣', attackEmoji: '🔥' },
        { name: 'Lava Blob', emoji: '❤️‍🔥', attackEmoji: '☄️' },
        { name: 'Flame Hound', emoji: '🐕', attackEmoji: '🔥' },
        { name: 'Fire Imp', emoji: '👿', attackEmoji: '🔥' },
        { name: 'Living Ember', emoji: '☄️', attackEmoji: '💥' },
    ],
    boss: {
        name: 'Lava Dragon',
        epithet: 'Volcanic Fury:',
        emoji: '🐉',
        attackEmoji: '🔥',
        specialAttack: { emoji: '☄️', damageMultiplier: 2.5, chargeTime: 1000 },
    },
};
