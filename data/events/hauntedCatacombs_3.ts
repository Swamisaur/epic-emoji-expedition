/**
 * @file data/events/hauntedCatacombs_3.ts
 * @description Contains the third batch of events specific to the Haunted Catacombs realm.
 * This file is part of Task 7.1 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const hauntedCatacombsEvents_3: GameEvent[] = [
    {
        id: 'haunted_catacombs_08_apprentice',
        title: "The Necromancer's Apprentice",
        description: "The clumsy ghost of an apprentice necromancer 👻 is trying to reassemble a skeleton. 'I'm missing a special bone!' he wails. 'The final piece for my masterpiece!' 🛠️💀",
        emojis: ['👻', '💀', '🛠️', '❓'],
        eventType: 'realm_specific',
        realm: "Haunted Catacombs",
        options: [
            {
                text: '"I will find your bone."',
                emoji: '🤝',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'bone_key_quest' },
                    resultText: "'You will?! Oh, thank you!' 🤝 The ghost seems immensely relieved. 'It is the most important one! Come back when you have it!' 😇🙏",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Give him a regular bone',
                emoji: '🦴',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "'That's just a tibia!' he whines 🦴. 'That's not it at all!' He seems very disappointed in you. 🤷‍♂️😔",
                    outcomeEmoji: '🤷'
                }
            },
            {
                text: 'Mock his incompetence',
                emoji: '😂',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Apprentice's Jinx", description: "He zaps you with weak magic. -5% Crit Chance for 2 minutes.", type: 'debuff', modifiers: { percent: { critChance: -0.05 } } }], duration_ms: 120000 },
                    resultText: "'I'm trying my best!' he cries 😂, and accidentally zaps you with a minor jinx. 😠✨",
                    outcomeEmoji: '😠'
                }
            },
            {
                text: 'Help him look',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 75 },
                    resultText: "You don't find the special bone 🧐, but you do find some coins the apprentice dropped. 💰🪙",
                    outcomeEmoji: '💰'
                }
            }
        ]
    },
    {
        id: 'haunted_catacombs_09',
        title: "A Coffin with Your Name On It",
        description: "You find a beautifully crafted, empty coffin ⚰️. A silver plaque on the lid has your name perfectly engraved on it. It looks very inviting. ✨😴",
        emojis: ['⚰️', '✨', '😴', '🤔'],
        eventType: 'realm_specific',
        realm: "Haunted Catacombs",
        options: [
            {
                text: 'Get in. It looks comfy.',
                emoji: '😴',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "The lid slams shut! 😴 You manage to push it open, but you're disoriented and find yourself back where you started. 😵‍💫",
                    outcomeEmoji: '😵'
                }
            },
            {
                text: 'Use it for storage',
                emoji: '📦',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r10', rarity: 'legendary' }, // Infinity Stone
                    resultText: "You check inside before getting in. Good thing you did! 📦 A powerful legendary item was left by the coffin's previous, intended occupant. 🤩✨",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Pry off the nameplate',
                emoji: '🔩',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "That's high-quality silver 🔩. You pry off the nameplate and pocket the valuable metal. 🤑💰",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Destroy the cursed thing',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Grave Robber's Curse", description: "You feel unlucky. -10% Fortune for 3 minutes.", type: 'debuff', modifiers: { percent: { luck: -0.10 } } }], duration_ms: 180000 },
                    resultText: "You shatter the coffin 💥. A cold wind blows through the crypt, cursing your luck. 😖👻",
                    outcomeEmoji: '😖'
                }
            }
        ]
    }
];