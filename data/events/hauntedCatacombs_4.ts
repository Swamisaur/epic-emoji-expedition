/**
 * @file data/events/hauntedCatacombs_4.ts
 * @description Contains the fourth batch of events specific to the Haunted Catacombs realm.
 * This file is part of Task 7.1 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const hauntedCatacombsEvents_4: GameEvent[] = [
    {
        id: 'haunted_catacombs_10_ritual',
        title: "The Apprentice's Ritual",
        description: "You find the ghostly apprentice again, standing before a summoning circle ✨. 'You've returned!' he exclaims. 'Your promise inspired me, and I found the final bone myself! But I still need a spark of life to power the ritual!' 👻",
        emojis: ['👻', '💀', '✨', '🔑'],
        eventType: 'realm_specific',
        realm: "Haunted Catacombs",
        requiredFlag: 'bone_key_quest',
        options: [
            {
                text: 'Lend him your life force',
                emoji: '❤️‍🔥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Necromantic Power", description: "Permanently gain +10% Attack Power and +5% Crit Chance.", type: 'buff', modifiers: { percent: { attackPower: 0.10, critChance: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You offer your energy ❤️‍🔥. The ritual is a success! A powerful, permanent blessing washes over you as thanks. 🤩✨",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Offer gold as a catalyst',
                emoji: '💰',
                cost: 150,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Soul Coins", description: "+15% Fortune for 3 minutes.", type: 'buff', modifiers: { percent: { luck: 0.15 } } }], duration_ms: 180000 },
                    resultText: "He uses your gold to power the ritual 💰. It works! As a reward, he blesses your future earnings. 🍀😇",
                    outcomeEmoji: '🍀'
                }
            },
            {
                text: 'Sabotage the ritual',
                emoji: '😈',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Ritual Backlash", description: "The ritual explodes! -10% to all core stats for 2 minutes.", type: 'debuff', modifiers: { percent: { attackPower: -0.1, maxHealth: -0.1, attackSpeed: -0.1 } } }], duration_ms: 120000 },
                    resultText: "You disrupt the circle 😈. The magic implodes, weakening you significantly. 💥😫",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: '"Nope. Not my problem."',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You refuse to get involved in amateur necromancy 🚶. The ghost looks dejected as you walk away. 😒👻",
                    outcomeEmoji: '😒'
                }
            }
        ]
    },
    {
        id: 'haunted_catacombs_11',
        title: "Chain Gang Ghosts",
        description: "A line of ghosts chained together ⛓️ shuffles past, their moans echoing 👻. One holds out a spectral lockpick. 'Free us...' it whispers. 🙏",
        emojis: ['⛓️', '👻', '🔑', '🙏'],
        eventType: 'realm_specific',
        realm: "Haunted Catacombs",
        options: [
            {
                text: 'Attempt to pick the locks',
                emoji: '🔑',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r6', rarity: 'legendary' }, // Golden Key
                    resultText: "Your nimble fingers work the ancient lock 🔑. The chains fall away! In gratitude, the spirits gift you a legendary key that can open any lock. 🤩✨",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Shatter the chains',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.10 },
                    resultText: "You break the chains with a mighty blow 💥, but a piece of spectral shrapnel hits you, dealing 10% of your max health in damage. 🤕😫",
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Join the chain gang',
                emoji: '🔗',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "You inexplicably link into the chain 🔗. The ghosts drag you backward down the hall before you manage to break free. 😫😵‍💫",
                    outcomeEmoji: '😫'
                }
            },
            {
                text: 'Ignore their plight',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You have your own chains to bear 🚶. You let the ghostly procession pass. 😌😑",
                    outcomeEmoji: '😌'
                }
            }
        ]
    }
];