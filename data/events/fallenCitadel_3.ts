/**
 * @file data/events/fallenCitadel_3.ts
 * @description Contains the third batch of events specific to the Fallen Citadel realm.
 * This file is part of Task 7.1 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const fallenCitadelEvents_3: GameEvent[] = [
    {
        id: 'fallen_citadel_08_journal',
        title: "The Captain's Journal",
        description: "You find the tattered journal 📖 of the Citadel's last Captain of the Guard. The final entry speaks of a hidden emergency protocol: 'The Last Stand.' 🛡️⚔️",
        emojis: ['📖', '🛡️', '🔑', '🔥'],
        eventType: 'realm_specific',
        realm: "Fallen Citadel",
        options: [
            {
                text: 'Read about the protocol',
                emoji: '🔑',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'citadel_protocol_known' },
                    resultText: "You learn the location of a secret chamber and how to activate the citadel's final, devastating defense 🔑. This could be useful. 🤫✍️",
                    outcomeEmoji: '🤫'
                }
            },
            {
                text: 'Read about his family',
                emoji: '❤️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Captain's Love", description: "You feel inspired by his devotion. +10% Max Health for 3 minutes. ❤️", type: 'buff', modifiers: { percent: { maxHealth: 0.10 } } }], duration_ms: 180000 },
                    resultText: "Reading of his devotion to his family fills you with a profound sense of purpose and the will to protect what's important ❤️. Your vitality surges. ❤️‍🩹",
                    outcomeEmoji: '❤️‍🩹'
                }
            },
            {
                text: 'Use the pages as kindling',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You try to light the journal 🔥, but the pages are enchanted and will not burn. A ghostly sigh of disapproval echoes around you. 😒👻",
                    outcomeEmoji: '😒'
                }
            },
            {
                text: 'Leave the diary in peace',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "A captain's final thoughts should be his own 🙏. You close the book and leave it. 😌📖",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'fallen_citadel_09',
        title: "The Portrait Gallery",
        description: "A long hall is lined with portraits 🖼️ of stern-faced kings and queens 👑. One portrait's eyes seem to follow you. 👀",
        emojis: ['🖼️', '👀', '👑', '🎨'],
        eventType: 'realm_specific',
        realm: "Fallen Citadel",
        options: [
            {
                text: 'Stare back',
                emoji: '👀',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: "The portrait winks 😉, and a bag of gold magically tumbles out from behind the frame. 💰✨",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Adjust the crooked frame',
                emoji: '🔧',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "As you straighten the painting 🔧, a section of the wall clicks open, revealing a hidden passage. 🚀🤫",
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Draw a mustache on it',
                emoji: '🥸',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Royal Displeasure", description: "You feel clumsy. -10% Attack Speed for 2 minutes. 😠", type: 'debuff', modifiers: { percent: { attackSpeed: -0.10 } } }], duration_ms: 120000 },
                    resultText: "A ghostly voice booms 'HOW DARE YOU!' 🗣️ and a curse of clumsiness befalls you. 😠😫",
                    outcomeEmoji: '😠'
                }
            },
            {
                text: 'Compliment the artist',
                emoji: '🎨',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r7', rarity: 'rare' }, // Magnifying Glass
                    resultText: "The ghost of the artist appears, flattered 🎨. 'An eye for quality! Take this, it will help you appreciate the finer details.' 🔎✨",
                    outcomeEmoji: '🔎'
                }
            }
        ]
    }
];