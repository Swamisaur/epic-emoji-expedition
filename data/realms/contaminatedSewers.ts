/**
 * @file data/realms/contaminatedSewers.ts
 * @description Defines the Contaminated Sewers realm theme.
 */
import { RealmTheme } from '../../types';

export const contaminatedSewers: RealmTheme = {
    name: 'Contaminated Sewers',
    emojis: ['🤢', '☣️', '💧', '🐀', '🐊'],
    color: '90, 40%, 40%',
    minions: [
        { name: 'Mutated Rat', emoji: '🐀', attackEmoji: '🦷' },
        { name: 'Giant Cockroach', emoji: '🪳', attackEmoji: '🤢' },
        { name: 'Sewer Gator', emoji: '🐊', attackEmoji: '🦷' },
        { name: 'Gloop', emoji: '🦠', attackEmoji: '💧' },
        { name: 'Albino Spider', emoji: '🕷️', attackEmoji: '🕸️' },
    ],
    boss: {
        name: 'The Sludge Horror',
        epithet: 'The Toxic Terror:',
        emoji: '🧫',
        attackEmoji: '🦠',
        specialAttack: { emoji: '☣️', damageMultiplier: 2.5, chargeTime: 1000 },
    },
};
