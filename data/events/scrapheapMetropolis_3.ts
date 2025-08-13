/**
 * @file data/events/scrapheapMetropolis_3.ts
 * @description Contains the third batch of events specific to the Scrapheap Metropolis realm.
 * This file is part of Task 7.2 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const scrapheapMetropolisEvents_3: GameEvent[] = [
    {
        id: 'scrapheap_metropolis_08_aicore',
        title: 'The Sentinel Core',
        description: 'You find a dormant, spherical AI core 🤖 humming with latent energy. A holographic face flickers to life. "System integrity... critical. Power source... depleted. Requesting... assistance." 💡',
        emojis: ['🤖', '💡', '❓', '🤝'],
        eventType: 'realm_specific',
        realm: 'Scrapheap Metropolis',
        options: [
            {
                text: 'Promise to find a power source',
                emoji: '🤝',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'ai_core_quest_active' },
                    resultText: '"Affirmative. I will await your return." ✅ The AI\'s face fades, leaving a faint marker on your internal compass. 🧭👍',
                    outcomeEmoji: '👍',
                },
            },
            {
                text: 'Salvage it for parts',
                emoji: '🔧',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r10', rarity: 'rare' }, // Infinity Stone
                    resultText: 'You dismantle the core 🔧, finding a powerful and complex component within. The light in the core dies. 💔🤖',
                    outcomeEmoji: '🌌',
                },
            },
            {
                text: 'Try to reboot it',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Power Surge', description: 'It shorts out, zapping you! ⚡️ -10% Attack Speed for 90s.', type: 'debuff', modifiers: { percent: { attackSpeed: -0.1 } } }], duration_ms: 90000 },
                    resultText: 'You hit the emergency reboot 💥. A power surge zaps you, and the core goes dark permanently. 😖😵‍💫',
                    outcomeEmoji: '😖',
                },
            },
            {
                text: 'Leave it alone',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'This seems complicated 🤔. You decide to leave the AI to its fate. 🤷‍♂️🚶',
                    outcomeEmoji: '🤷',
                },
            },
        ],
    },
    {
        id: 'scrapheap_metropolis_09',
        title: 'High-Voltage Pylon',
        description: 'A massive electrical pylon 🗼 buzzes with raw power. A loose cable whips around, arcing electricity dangerously ⚡️. It looks like you could harness it, but it would be risky. 😬',
        emojis: ['⚡️', '🗼', '💥', '😬'],
        eventType: 'realm_specific',
        realm: 'Scrapheap Metropolis',
        options: [
            {
                text: 'Carefully absorb some energy',
                emoji: '🔋',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Overclocked', description: 'Permanently gain +5% Attack Speed and +5% Crit Chance. ⚡️', type: 'buff', modifiers: { percent: { attackSpeed: 0.05, critChance: 0.05 } } }], duration_ms: Infinity },
                    resultText: 'The shock is immense, but you channel it! 🔋 The energy rewires your reflexes, making you permanently faster and more precise. 🤩🧠',
                    outcomeEmoji: '🤩',
                },
            },
            {
                text: 'Recklessly absorb ALL the energy',
                emoji: '🤯',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.25 },
                    resultText: 'The shock is too much! 🤯 It fries your systems, dealing 25% of your max health in damage. 🤕🔥',
                    outcomeEmoji: '🤕',
                },
            },
            {
                text: 'Ground the cable',
                emoji: '⛓️',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: 'You safely ground the cable ⛓️. The resulting power surge blows open a nearby maintenance hatch, revealing a stash of valuable components. 💰🔩',
                    outcomeEmoji: '💰',
                },
            },
            {
                text: 'Give it a wide berth',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You are not messing with that 😬. You find a much longer, but safer, way around. 😌👍',
                    outcomeEmoji: '😌',
                },
            },
        ],
    },
];