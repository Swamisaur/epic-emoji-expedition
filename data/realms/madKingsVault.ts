/**
 * @file data/realms/madKingsVault.ts
 * @description Defines The Mad King's Vault realm theme.
 */
import { RealmTheme } from '../../types';

export const madKingsVault: RealmTheme = {
    name: "The Mad King's Vault",
    emojis: ['👑', '💎', '💰', '🔒', '💂'],
    color: '45, 80%, 55%',
    minions: [
        { name: 'Royal Guard', emoji: '💂', attackEmoji: '⚔️' },
        { name: 'Animated Treasure', emoji: '🏆', attackEmoji: '💰' },
        { name: 'Cursed Urn', emoji: '🏺', attackEmoji: '👻' },
        { name: 'Greed Imp', emoji: '😈', attackEmoji: '🔥' },
        { name: 'Cursed Chest', emoji: '🎁', attackEmoji: '🦷' },
    ],
    boss: {
        name: 'The Mad King',
        epithet: 'The Final Tyrant:',
        emoji: '🤴',
        attackEmoji: '👑',
        specialAttack: { emoji: '💎', damageMultiplier: 2.5, chargeTime: 1000 },
    },
};
