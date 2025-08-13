/**
 * @file data/realms/glacialPeak.ts
 * @description Defines the Glacial Peak realm theme.
 */
import { RealmTheme } from '../../types';

export const glacialPeak: RealmTheme = {
    name: 'Glacial Peak',
    emojis: ['🏔️', '❄️', '🧊', '🌬️', '🐻‍❄️'],
    color: '195, 50%, 70%',
    minions: [
        { name: 'Snow Leopard', emoji: '🐆', attackEmoji: '🐾' },
        { name: 'Arctic Fox', emoji: '🦊', attackEmoji: '🦷' },
        { name: 'Polar Bear', emoji: '🐻‍❄️', attackEmoji: '🐾' },
        { name: 'Mountain Ram', emoji: '🐏', attackEmoji: '💥' },
        { name: 'Puffin', emoji: '🐧', attackEmoji: '🐟' },
    ],
    boss: {
        name: 'The Yeti',
        epithet: 'Mountain Terror:',
        emoji: '👹',
        attackEmoji: '❄️',
        specialAttack: { emoji: '🧊', damageMultiplier: 2.5, chargeTime: 1000 },
    },
};
