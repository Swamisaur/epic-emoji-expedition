/**
 * @file data/realms/scrapheapMetropolis.ts
 * @description Defines the Scrapheap Metropolis realm theme.
 */
import { RealmTheme } from '../../types';

export const scrapheapMetropolis: RealmTheme = {
    name: 'Scrapheap Metropolis',
    emojis: ['🤖', '🔩', '⚙️', '🧲', '🔌'],
    color: '210, 20%, 65%',
    minions: [
        { name: 'Scrap Bot', emoji: '🔩', attackEmoji: '⚙️' },
        { name: 'Sentry Drone', emoji: '📹', attackEmoji: '⚡' },
        { name: 'Clockwork Bug', emoji: '🐞', attackEmoji: '⚙️' },
        { name: 'Welding Bot', emoji: '👨‍🏭', attackEmoji: '🔥' },
        { name: 'Crusher Bot', emoji: '🗜️', attackEmoji: '💥' },
    ],
    boss: {
        name: 'The Overlord',
        epithet: 'The Scrap Tyrant:',
        emoji: '🤖',
        attackEmoji: '🔩',
        specialAttack: { emoji: '💥', damageMultiplier: 2.5, chargeTime: 1000 },
    },
};
