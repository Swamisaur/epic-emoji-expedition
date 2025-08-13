/**
 * @file data/realms/hauntedCatacombs.ts
 * @description Defines the Haunted Catacombs realm theme.
 */
import { RealmTheme } from '../../types';

export const hauntedCatacombs: RealmTheme = {
    name: 'Haunted Catacombs',
    emojis: ['👻', '💀', '🦇', '🐀', '🕸️'],
    color: '270, 25%, 60%',
    minions: [
        { name: 'Will-o\'-Wisp', emoji: '🕯️', attackEmoji: '🔥' },
        { name: 'Shackled Spirit', emoji: '⛓️', attackEmoji: '👻' },
        { name: 'Rat Swarm', emoji: '🐀', attackEmoji: '🦷' },
        { name: 'Wandering Spirit', emoji: '👻', attackEmoji: '😱' },
        { name: 'Risen Dead', emoji: '⚰️', attackEmoji: '✋' },
    ],
    boss: {
        name: 'Vampire Lord',
        epithet: 'The Crimson Count:',
        emoji: '🧛',
        attackEmoji: '🩸',
        specialAttack: { emoji: '🦇', damageMultiplier: 2.5, chargeTime: 1000 },
    },
};
