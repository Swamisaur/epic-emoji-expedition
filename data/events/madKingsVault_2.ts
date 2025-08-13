/**
 * @file data/events/madKingsVault_2.ts
 * @description Contains the second batch of events specific to The Mad King's Vault realm.
 * This file is part of Task 7.4 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const madKingsVaultEvents_2: GameEvent[] = [
    {
        id: 'mad_kings_vault_06_investor',
        title: "The Gilded Ledger",
        description: "The ghost of the Royal Accountant 👻 appears again, holding a shimmering, golden ledger 🧾. 'The King's private investments! Risky, but the returns could be... astronomical. Care to invest?' 📈",
        emojis: ['👻', '📈', '📉', '💰'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'Invest in "Dragon Egg Futures"',
                emoji: '🥚',
                cost: 200,
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 1000 },
                    resultText: "Incredible! 🤩 The dragon eggs hatched into golden geese! 🐔 Your investment pays off handsomely! 🤑",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Invest in "Tulip Bulb NFTs"',
                emoji: '🌷',
                cost: 200,
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Disaster! 📉 The bubble popped. Your investment is worthless. 😭",
                    outcomeEmoji: '😭'
                }
            },
            {
                text: 'Invest vitality in "Golem Construction"',
                emoji: '🗿',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Stone-Solid Investment", description: "You feel tougher, but the market is slow. Permanently +10% Max Health, but -2% Attack Speed. 🛡️", type: 'buff', modifiers: { percent: { maxHealth: 0.10, attackSpeed: -0.02 } } }], duration_ms: Infinity },
                    resultText: "You invest your vitality into the syndicate ❤️‍🔥. The return is slow but steady, making you permanently tougher but slightly more deliberate. 🛡️",
                    outcomeEmoji: '🛡️'
                }
            },
            {
                text: 'Invest in "Imp-Corp Pyramid Scheme"',
                emoji: '🔺',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Pyramid Scheme", description: "Get rich quick, but curse your future. You gain a massive immediate boost to Fortune, but permanently lose Attack Power. 😈", type: 'buff', modifiers: { percent: { luck: 0.50, attackPower: -0.05 } } }], duration_ms: Infinity },
                    resultText: "You get in early and make a killing! 🤑 The influx of easy money makes you lucky, but you grow lazy and weak. 😈",
                    outcomeEmoji: '😈'
                }
            }
        ]
    },
    {
        id: 'mad_kings_vault_07_jester',
        title: "The Jester's Encore",
        description: "The ghostly jester 🤡 reappears, juggling shimmering, magical orbs ✨. 'Another game, hero? Pick an orb, any orb! No riddles this time, I promise. Just... fun.' 😂",
        emojis: ['🤡', '✨', '💨', '💔'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'Accept the Orb of Hysterical Speed',
                emoji: '💨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Hysterical Speed", description: "+50% Attack Speed, but -15% Accuracy for 2 minutes. 🤪", type: 'buff', modifiers: { percent: { attackSpeed: 0.50, accuracy: -0.15 } } }], duration_ms: 120000 },
                    resultText: "The orb shatters, filling you with manic energy 🤪. You're lightning fast, but your attacks are wild and imprecise. ⚡️",
                    outcomeEmoji: '🤪'
                }
            },
            {
                text: 'Accept the Orb of Gilded Sloth',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Gilded Sloth", description: "You feel heavy, but lucky. +40% Fortune, but -15% Attack Speed for 3 minutes. 🤑", type: 'buff', modifiers: { percent: { luck: 0.40, attackSpeed: -0.15 } } }], duration_ms: 180000 },
                    resultText: "The orb covers you in liquid gold 💰. You're much slower, but everything you touch seems to turn to profit. 🤑",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Accept the Orb of Sorrowful Strength',
                emoji: '💔',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Sorrowful Strength", description: "A tragic trade. Permanently gain +10% Attack Power, but lose 5% Max Health. 💪", type: 'buff', modifiers: { percent: { attackPower: 0.10, maxHealth: -0.05 } } }], duration_ms: Infinity },
                    resultText: "The orb shows you a vision of a past failure 💔. The memory grants you strength born of sorrow, but weakens your spirit. 💪",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: '"I\'m not playing your games."',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "'NO FUN!' 😠 the jester shrieks, and with a wave of his hand, you find yourself in the previous room. 😫",
                    outcomeEmoji: '😠'
                }
            }
        ]
    }
];
