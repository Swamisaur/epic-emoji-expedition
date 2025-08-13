/**
 * @file data/realms/scorchedSands.ts
 * @description Defines the Scorched Sands realm theme.
 */
import { RealmTheme } from '../../types';

export const scorchedSands: RealmTheme = {
    name: 'Scorched Sands',
    emojis: ['🌵', '🏜️', '🐍', '🦂', '🗿'], color: '45, 40%, 60%',
    minions: [
        { name: 'Cactus Creeper', emoji: '🌵', attackEmoji: '📍' },
        { name: 'Sand Viper', emoji: '🐍', attackEmoji: '🦷' },
        { name: 'Desert Vulture', emoji: '🦅', attackEmoji: '💨' },
        { name: 'Giant Scorpion', emoji: '🦂', attackEmoji: '💉' },
        { name: 'Dust Devil', emoji: '🌪️', attackEmoji: '💨' },
    ],
    boss: {
        name: 'Living Monolith',
        epithet: 'The Desert Sentinel:',
        emoji: '🗿',
        attackEmoji: '🪨',
        specialAttack: { emoji: '🧱', damageMultiplier: 2.5, chargeTime: 1000 },
    },
};
