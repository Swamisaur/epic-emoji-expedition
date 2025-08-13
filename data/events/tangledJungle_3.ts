/**
 * @file data/events/tangledJungle_3.ts
 * @description Contains the third batch of events specific to the Tangled Jungle realm.
 * This file is part of Task 7.3 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const tangledJungleEvents_3: GameEvent[] = [
    {
        id: 'tangled_jungle_08_chameleon',
        title: 'The Shifting Chameleon',
        description: 'A massive chameleon 🦎, the size of a wolf, shifts colors before you 🎨. It seems to be offering a boon, asking what quality you value most. 🤔',
        emojis: ['🦎', '🎨', '💪', '🧠'],
        eventType: 'realm_specific',
        realm: 'Tangled Jungle',
        options: [
            {
                text: 'Offer your Strength',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Aspect of the Jaguar', description: 'You are infused with predatory power! +20% Attack Power for 3 minutes.', type: 'buff', modifiers: { percent: { attackPower: 0.2 } } }], duration_ms: 180000 },
                    resultText: 'The chameleon shifts to a jaguar pattern 🐆. It touches you, and you feel the power of a great hunter. 🔥',
                    outcomeEmoji: '🔥',
                },
            },
            {
                text: 'Offer your Speed',
                emoji: '💨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Aspect of the Monkey', description: 'You are infused with primate agility! +30% Attack Speed for 3 minutes.', type: 'buff', modifiers: { percent: { attackSpeed: 0.3 } } }], duration_ms: 180000 },
                    resultText: 'The chameleon shifts to a monkey pattern 🐒. It touches you, and you feel the agility of a jungle acrobat. ⚡️',
                    outcomeEmoji: '⚡️',
                },
            },
            {
                text: 'Offer your Endurance',
                emoji: '🛡️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Aspect of the Tortoise', description: 'You are infused with ancient resilience! +25% Max Health for 3 minutes.', type: 'buff', modifiers: { percent: { maxHealth: 0.25 } } }], duration_ms: 180000 },
                    resultText: 'The chameleon shifts to a tortoise shell pattern 🐢. It touches you, and you feel the resilience of an ancient creature. ❤️',
                    outcomeEmoji: '❤️',
                },
            },
            {
                text: 'Offer your Wit',
                emoji: '🧠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Aspect of the Serpent', description: 'You are infused with cunning insight! +20% Crit Chance & Damage for 3 minutes.', type: 'buff', modifiers: { percent: { critChance: 0.2, critDamage: 0.2 } } }], duration_ms: 180000 },
                    resultText: 'The chameleon shifts to a snake skin pattern 🐍. It touches you, and your mind becomes as sharp as a serpent\'s fang. 🎯',
                    outcomeEmoji: '🎯',
                },
            },
        ],
    },
    {
        id: 'tangled_jungle_09_seed',
        title: 'The Pulsating Seed',
        description: 'You find a smooth, obsidian seed 🌱 half-buried in the earth. It pulses with a faint, warm light ✨ and hums with untold potential. 🤔',
        emojis: ['🌱', '✨', '🌍', '🤔'],
        eventType: 'realm_specific',
        realm: 'Tangled Jungle',
        options: [
            {
                text: 'Plant it in fertile soil',
                emoji: '🌱',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'world_seed_planted' },
                    resultText: 'You plant the seed 🌱. The ground trembles as it instantly takes root. You feel you have started something profound. 🌳',
                    outcomeEmoji: '🌳',
                },
            },
            {
                text: 'Crack it open',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 500 },
                    resultText: 'You break the seed open 💥. Its potential energy is released as a shower of pure gold! 🤑',
                    outcomeEmoji: '🤑',
                },
            },
            {
                text: 'Eat it',
                emoji: '😋',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Cosmic Indigestion', description: 'Permanently +5% to all core stats, but -5% Fortune.', type: 'buff', modifiers: { percent: { attackPower: 0.05, maxHealth: 0.05, attackSpeed: 0.05, luck: -0.05 } } }], duration_ms: Infinity },
                    resultText: 'You swallow the seed 😋. You feel a surge of cosmic power, but your luck seems to curdle slightly. 🤢',
                    outcomeEmoji: '🤢',
                },
            },
            {
                text: 'Throw it away',
                emoji: '🗑️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'It\'s just a weird seed. You toss it into the undergrowth and move on. 🤷',
                    outcomeEmoji: '🤷',
                },
            },
        ],
    },
];