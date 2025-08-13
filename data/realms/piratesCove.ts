/**
 * @file data/realms/piratesCove.ts
 * @description Defines the Pirate's Cove realm theme.
 */
import { RealmTheme } from '../../types';

export const piratesCove: RealmTheme = {
    name: "Pirate's Cove",
    emojis: ['🌴', '🥥', '🏖️', '🐚', '🌺', '🌊'],
    color: '185, 75%, 50%', // Vibrant cyan
    minions: [
        { name: 'Scuttling Crab', emoji: '🦀', attackEmoji: '🤏' },
        { name: 'Mischievous Monkey', emoji: '🐒', attackEmoji: '🍌' },
        { name: 'Puffed-up Pufferfish', emoji: '🐡', attackEmoji: '💧' },
        { name: 'Darting Clownfish', emoji: '🐠', attackEmoji: '🫧' },
        { name: 'Pinching Lobster', emoji: '🦞', attackEmoji: '🤏' },
    ],
    boss: {
        name: 'Captain Squawk',
        epithet: 'Feathered Fiend:',
        emoji: '🦜',
        attackEmoji: '⚔️',
        specialAttack: { emoji: '💣', damageMultiplier: 2.5, chargeTime: 1000 },
    },
};
