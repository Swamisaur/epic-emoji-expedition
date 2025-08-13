/**
 * @file data/events/madKingsVault_3.ts
 * @description Contains the third batch of events specific to The Mad King's Vault realm.
 * This file is part of Task 7.4 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const madKingsVaultEvents_3: GameEvent[] = [
    {
        id: 'mad_kings_vault_08_scales',
        title: "The Scales of Judgment",
        description: "You enter the treasury and find a colossal golden scale ⚖️. On one side is a single, perfect feather 🪶. On the other, a ghostly image of your heart ❤️‍🔥. An inscription reads: 'Balance the scales to prove your worth.' 🧐",
        emojis: ['⚖️', '🪶', '❤️‍🔥', '💰'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'Place Gold on the scale (Cost: 500)',
                emoji: '💰',
                cost: 500,
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 1000 },
                    resultText: "You place a hefty sum of your gold on the scale 💰. It balances. 'Your greed is tempered by sacrifice.' The scale rewards your wager, returning your 500 gold along with a prize of 500 more! 🍀",
                    outcomeEmoji: '🍀'
                }
            },
            {
                text: 'Place your power on the scale',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Tempered Power", description: "+25% Attack Power, but -10% Attack Speed for 3 minutes. 🔥", type: 'buff', modifiers: { percent: { attackPower: 0.25, attackSpeed: -0.10 } } }], duration_ms: 180000 },
                    resultText: "You offer a fraction of your power 💪. The scale balances. 'Your power is tempered by control.' You feel a surge of raw, focused energy. 🔥",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Place your vitality on the scale',
                emoji: '❤️‍🔥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Tempered Vitality", description: "+25% Max Health, but -10% Crit Chance for 3 minutes. 🛡️", type: 'buff', modifiers: { percent: { maxHealth: 0.25, critChance: -0.10 } } }], duration_ms: 180000 },
                    resultText: "You offer a bit of your life force ❤️‍🔥. The scale balances. 'Your vitality is tempered by wisdom.' You feel incredibly resilient, but more cautious. 🛡️",
                    outcomeEmoji: '🛡️'
                }
            },
            {
                text: 'Take the feather',
                emoji: '🪶',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Imbalance", description: "The scales tip violently! Permanently lose 5% of all core stats. 😠", type: 'debuff', modifiers: { percent: { attackPower: -0.05, maxHealth: -0.05, attackSpeed: -0.05 } } }], duration_ms: Infinity },
                    resultText: "You snatch the feather 🪶. The scales slam down, and a powerful curse of imbalance strikes you, permanently weakening your essence. 😠",
                    outcomeEmoji: '😠'
                }
            }
        ]
    },
    {
        id: 'mad_kings_vault_09_menagerie',
        title: "The Mad King's Menagerie",
        description: "You find a wing of the vault filled with magical cages ⛓️. Most are just bones 💀, but three cages still hold living, impossible creatures. 🐉🦄🐙",
        emojis: ['🐉', '🦄', '🐙', '⛓️'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'Free the Golden Goose',
                emoji: '🐔',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 800 },
                    resultText: "You free the goose 🐔. It honks gratefully 🙏 and lays a single, massive golden egg 🥚 at your feet before flying away through a spectral wall. 🤑",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Free the Phase-Spider',
                emoji: '🕷️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Phase Venom", description: "Permanently +5% Crit Chance, but -2% Attack Speed. 🎯", type: 'buff', modifiers: { percent: { critChance: 0.05, attackSpeed: -0.02 } } }], duration_ms: Infinity },
                    resultText: "You open the cage. The spider 🕷️ nips you gently before vanishing. Its venom leaves you feeling strangely out of sync, yet more precise. 🎯",
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: 'Free the Miniature Hydra',
                emoji: '🐲',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Hydra's Gift", description: "Permanently -5% Max Health, but +10 flat Attack Power. 🔥", type: 'buff', modifiers: { percent: { maxHealth: -0.05 }, flat: { attackPower: 10 } } }], duration_ms: Infinity },
                    resultText: "It's cute! 🥰 It bites off your finger, which quickly regrows stronger than before. A fair, if painful, trade. 🔥",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Free them all!',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -2 },
                    resultText: "Chaos! 💥 The creatures run rampant. You are trampled in the stampede and wake up dazed in a corridor two rooms back. 😵",
                    outcomeEmoji: '😵'
                }
            }
        ]
    }
];