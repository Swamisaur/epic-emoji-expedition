/**
 * @file data/events/scrapheapMetropolis_2.ts
 * @description Contains the second batch of events specific to the Scrapheap Metropolis realm.
 * This file is part of Task 7.2 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const scrapheapMetropolisEvents_2: GameEvent[] = [
    {
        id: 'scrapheap_metropolis_06',
        title: "The Rogue Cleaner-Bot",
        description: "A small, spherical bot 🤖 zooms up to you, brandishing a polishing cloth ✨. 'Foreign contaminant detected! Commencing sanitation protocol!' 🧼",
        emojis: ['🤖', '✨', '🧼', '💥'],
        eventType: 'realm_specific',
        realm: "Scrapheap Metropolis",
        options: [
            {
                text: 'Let it "clean" your weapon',
                emoji: '✨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Sanitized Blade", description: "The bot polishes your weapon to a mirror sheen! ✨ +15% Crit Chance for 2 minutes.", type: 'buff', modifiers: { percent: { critChance: 0.15 } } }], duration_ms: 120000 },
                    resultText: "The bot buffs your weapon with surprising efficiency ✨. It's so sharp and shiny now, it's easier to find weak spots. 🤩🎯",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Let it "clean" your armor',
                emoji: '🧼',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Over-Sanitized", description: "The cleaning solution was too strong! 🧪 -10% Max Health for 2 minutes.", type: 'debuff', modifiers: { percent: { maxHealth: -0.10 } } }], duration_ms: 120000 },
                    resultText: "The bot sprays you with a powerful solvent 🧼 that starts to dissolve your armor. You feel... drafty. 😖🥶",
                    outcomeEmoji: '😖'
                }
            },
            {
                text: 'Kick the bot',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 125 },
                    resultText: "You punt the bot into a wall 💥. It breaks apart, revealing a collection of valuable screws and bolts it had collected. 🔩💰",
                    outcomeEmoji: '🔩'
                }
            },
            {
                text: 'Run away from the tiny terror',
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You are a mighty hero and you will not be sanitized today. You flee. 💨🏃",
                    outcomeEmoji: '💨'
                }
            }
        ]
    },
    {
        id: 'scrapheap_metropolis_07',
        title: "The Glitched Vending Machine",
        description: "An ancient, flickering vending machine 🤖 stands in a dark corner. Its display flashes random items. It seems to be working, sort of. 🤔",
        emojis: ['🥤', '🥫', '🍫', '🤖'],
        eventType: 'realm_specific',
        realm: "Scrapheap Metropolis",
        options: [
            {
                text: 'Buy "Nuka-Cola Quantum" (50 gold)',
                emoji: '🥤',
                cost: 50,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Quantum Leap", description: "Your attacks feel faster! ⚡️ +15% Attack Speed for 2 minutes.", type: 'buff', modifiers: { percent: { attackSpeed: 0.15 } } }], duration_ms: 120000 },
                    resultText: "The drink is radioactive, but in a good way! 🥤 You feel energized and incredibly fast. ⚡️☢️",
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Buy "Corroded Tin of Beans" (50 gold)',
                emoji: '🥫',
                cost: 50,
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.10 },
                    resultText: "You open the can. A smell from the dawn of time assaults your nostrils 👃. Botulism. 🤢 You take 10% of your max health in damage. A truly terrible choice. 🥫",
                    outcomeEmoji: '🤢'
                }
            },
            {
                text: 'Buy "Chocolate-Covered Bolt" (50 gold)',
                emoji: '🍫',
                cost: 50,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Iron Gut", description: "You feel tougher! 💪 +15% Max Health for 2 minutes.", type: 'buff', modifiers: { percent: { maxHealth: 0.15 } } }], duration_ms: 120000 },
                    resultText: "It's surprisingly tasty 🍫. The sheer iron content makes you feel incredibly tough. 💪🔩",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Smack the machine',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 75 },
                    resultText: "You hit the machine just right 💥, and a handful of coins and a slightly crushed can of something drop out. 💰🥫",
                    outcomeEmoji: '💰'
                }
            }
        ]
    }
];