/**
 * @file data/realms/tangledJungle.ts
 * @description Defines the Tangled Jungle realm theme.
 */
import { RealmTheme } from '../../types';

export const tangledJungle: RealmTheme = {
    name: 'Tangled Jungle',
    emojis: ['🐒', '🌿', '🐍', '🐅', '🌺'],
    color: '140, 50%, 45%',
    minions: [
        { name: 'Constrictor Snake', emoji: '🐍', attackEmoji: '〰️' },
        { name: 'Howler Monkey', emoji: '🐒', attackEmoji: '🍌' },
        { name: 'Jungle Tiger', emoji: '🐅', attackEmoji: '🐾' },
        { name: 'Poison Dart Frog', emoji: '🐸', attackEmoji: '💧' },
        { name: 'Capybara', emoji: '🦦', attackEmoji: '🍊' },
    ],
    boss: {
        name: 'Piranha Swarm',
        epithet: 'The River\'s Maw:',
        emoji: '🐟',
        attackEmoji: '💧',
        specialAttack: { emoji: '🌊', damageMultiplier: 2.5, chargeTime: 1000 },
    },
};
