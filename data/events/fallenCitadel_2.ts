/**
 * @file data/events/fallenCitadel_2.ts
 * @description Contains the second batch of events specific to the Fallen Citadel realm.
 * This file is part of Task 7.1 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const fallenCitadelEvents_2: GameEvent[] = [
    {
        id: 'fallen_citadel_06',
        title: "The Silent Throne Room",
        description: "The throne sits empty, but a heavy crown of ghostly light 👻 floats above it. A whisper echoes, 'A king's burden is heavy. Will you share it, or seize it?' 👑",
        emojis: ['👑', '👻', '✨', '🙏'],
        eventType: 'realm_specific',
        realm: "Fallen Citadel",
        options: [
            {
                text: 'Share the burden',
                emoji: '🤝',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "King's Burden", description: "+15% ATK & HP, but -10% Fortune for 3 minutes. 👑", type: 'buff', modifiers: { percent: { attackPower: 0.15, maxHealth: 0.15, luck: -0.10 } } }], duration_ms: 180000 },
                    resultText: "You accept the spectral weight 🤝. You feel powerful and responsible, but the worry dulls your luck. 👑⚖️",
                    outcomeEmoji: '👑'
                }
            },
            {
                text: 'Seize the crown',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'h3', rarity: 'legendary' }, // Crown of Greed
                    resultText: "You snatch the crown from the air 💪. It solidifies into a real, powerful artifact in your hands! 🤩👑",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Kneel in respect',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Royal Favor", description: "Permanently gain +2% Crit Chance. 🙏", type: 'buff', modifiers: { percent: { critChance: 0.02 } } }], duration_ms: Infinity },
                    resultText: "Your show of respect pleases the unseen spirits 🙏. They grant you a permanent boon of tactical insight. 😇🧠",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Polish the throne',
                emoji: '✨',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: "An odd choice, but your dutiful cleaning ✨ reveals a hidden stash of gold in the armrest. 💰🪙",
                    outcomeEmoji: '💰'
                }
            }
        ]
    },
    {
        id: 'fallen_citadel_07',
        title: "The Loyal Gargoyle",
        description: "A stone gargoyle 🗿 animates as you approach. 'I protect this citadel, even in death,' it grinds. 'Prove you are a friend, not a looter.' 🛡️🤝",
        emojis: ['🗿', '🛡️', '💎', '🤝'],
        eventType: 'realm_specific',
        realm: "Fallen Citadel",
        options: [
            {
                text: 'Offer 75 gold for passage.',
                emoji: '💎',
                cost: 75,
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "The gargoyle accepts your offering 💎. 'A token of goodwill. I shall show you the way.' It reveals a secret passage, letting you bypass much of the citadel. 🚀✨",
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Tell it of your noble quest',
                emoji: '🗣️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Stone Resolve", description: "Permanently gain +5% Crit Damage. 🗿", type: 'buff', modifiers: { percent: { critDamage: 0.05 } } }], duration_ms: Infinity },
                    resultText: "It listens intently 🗣️. 'Your cause is just. Take this blessing of stone and steel.' You feel your strikes become more devastating. 💥💪",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Fight it',
                emoji: '⚔️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Bruised Knuckles", description: "-10% Attack Power for 2 minutes. 🤕", type: 'debuff', modifiers: { percent: { attackPower: -0.10 } } }], duration_ms: 120000 },
                    resultText: "Your weapon clangs harmlessly off its stone hide ⚔️. You succeed only in hurting your hand. 🤕😫",
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Try to climb it',
                emoji: '🧗',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 100 },
                    resultText: "You clamber up the gargoyle 🧗, finding a bird's nest 🐦 in its mouth filled with shiny coins. 🪙💰",
                    outcomeEmoji: '🪙'
                }
            }
        ]
    }
];