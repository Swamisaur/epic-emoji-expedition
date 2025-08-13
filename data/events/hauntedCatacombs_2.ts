/**
 * @file data/events/hauntedCatacombs_2.ts
 * @description Contains the second batch of events specific to the Haunted Catacombs realm.
 * This file is part of Task 7.1 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const hauntedCatacombsEvents_2: GameEvent[] = [
    {
        id: 'haunted_catacombs_06',
        title: "The Bone Organ",
        description: "You enter a vast chamber dominated by a massive, grotesque organ made of bones and skulls 🎶. A ghostly tune hangs in the air. 🎼👻",
        emojis: ['🎶', '🦴', '💀', '🎼'],
        eventType: 'realm_specific',
        realm: "Haunted Catacombs",
        options: [
            {
                text: 'Play a jaunty tune',
                emoji: '😂',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "The spirits are so amused by your cheerful tune 😂 that they shower you with spectral coins. 💰👻",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Play a sorrowful dirge',
                emoji: '😭',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.25 },
                    resultText: "You play a mournful song 😭. The spirits weep ectoplasmic tears, which have a powerful healing effect on you. ❤️‍🩹💧",
                    outcomeEmoji: '❤️‍🩹'
                }
            },
            {
                text: 'Smash the keys',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Deafening Cacophony", description: "The spirits shriek in anger! -10% Attack Speed for 2 minutes.", type: 'debuff', modifiers: { percent: { attackSpeed: -0.10 } } }], duration_ms: 120000 },
                    resultText: "A horrible noise echoes through the crypt 💥. The resident spirits are enraged and curse you with clumsiness. 😠😫",
                    outcomeEmoji: '😠'
                }
            },
            {
                text: 'Look for sheet music',
                emoji: '🎼',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o5', rarity: 'rare' }, // Book of Secrets
                    resultText: "You find a 'Requiem for the Damned' tucked inside the organ bench 🎼. It's a powerful magical artifact. 📖✨",
                    outcomeEmoji: '📖'
                }
            }
        ]
    },
    {
        id: 'haunted_catacombs_07',
        title: "The Vampire's Wine Cellar",
        description: "You find a cellar filled with dusty bottles of dark red 'wine.' 🍷 The labels are fastidious, listing blood types and vintages. 🧛🩸",
        emojis: ['🍷', '🩸', '🧛', '🍾'],
        eventType: 'realm_specific',
        realm: "Haunted Catacombs",
        options: [
            {
                text: 'Drink "A-Positive Vintage"',
                emoji: '🅰️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Robust Vintage", description: "+15% Max Health for 3 minutes.", type: 'buff', modifiers: { percent: { maxHealth: 0.15 } } }], duration_ms: 180000 },
                    resultText: "It has a robust, iron-rich flavor 🅰️. You feel a surge of vitality. 💪❤️‍🔥",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Drink "O-Negative Reserve"',
                emoji: '🅾️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Potent Reserve", description: "+15% Attack Power for 3 minutes.", type: 'buff', modifiers: { percent: { attackPower: 0.15 } } }], duration_ms: 180000 },
                    resultText: "A universal donor! 🅾️ This vintage is potent and fills you with a primal strength. 🔥💪",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Smash the bottles',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Owner's Wrath", description: "You feel a dark presence's anger. -15% Fortune for 2 minutes.", type: 'debuff', modifiers: { percent: { luck: -0.15 } } }], duration_ms: 120000 },
                    resultText: "You smash the collection 💥. An enraged shriek echoes from deeper in the crypt, and you feel a wave of terrible luck. 🧛😠",
                    outcomeEmoji: '🧛'
                }
            },
            {
                text: 'Sell a bottle to a passing ghoul',
                emoji: '🤝',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: "A discerning ghoul pays a high price for a rare vintage 🤝. Excellent business. 💰🤑",
                    outcomeEmoji: '💰'
                }
            }
        ]
    }
];