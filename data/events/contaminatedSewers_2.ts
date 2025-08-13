/**
 * @file data/events/contaminatedSewers_2.ts
 * @description Contains the second batch of events specific to the Contaminated Sewers realm.
 * This file is part of Task 7.3 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const contaminatedSewersEvents_2: GameEvent[] = [
    {
        id: 'contaminated_sewers_06_vat',
        title: 'Vat of Mutagen',
        description: 'You find a huge, bubbling vat of glowing green mutagen ☣️. The air is thick with the smell of possibility and poor life choices. 🧪',
        emojis: ['☣️', '🧪', '💪', '🛡️'],
        eventType: 'realm_specific',
        realm: 'Contaminated Sewers',
        options: [
            {
                text: 'Dip your weapon in it',
                emoji: '⚔️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Mutated Edge', description: '+30% Attack Power, but -15% Crit Chance for 3 minutes.', type: 'buff', modifiers: { percent: { attackPower: 0.3, critChance: -0.15 } } }], duration_ms: 180000 },
                    resultText: 'Your weapon drips with corrosive power 🔥. It hits harder, but the instability makes precise strikes difficult. ⚔️',
                    outcomeEmoji: '🔥',
                },
            },
            {
                text: 'Dip your armor in it',
                emoji: '🛡️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Mutated Hide', description: '+30% Max Health, but -10% Attack Speed for 3 minutes.', type: 'buff', modifiers: { percent: { maxHealth: 0.3, attackSpeed: -0.1 } } }], duration_ms: 180000 },
                    resultText: 'Your armor bonds with the goo 🛡️, becoming a living, protective shell. It\'s heavy and slows you down. 💪',
                    outcomeEmoji: '💪',
                },
            },
            {
                text: 'Dip your head in it',
                emoji: '🤪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Mutated Mind', description: 'Your mind expands! -20% Attack Power, but +25% Fortune for 3 minutes.', type: 'buff', modifiers: { percent: { attackPower: -0.2, luck: 0.25 } } }], duration_ms: 180000 },
                    resultText: 'A terrible, brilliant idea! 🤪 You see all possibilities, including where to find more loot, but combat feels... abstract. 🧠',
                    outcomeEmoji: '🧠',
                },
            },
            {
                text: 'Push a nearby rat in',
                emoji: '🐀',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: 'The rat squeaks, falls in 🐀, and instantly turns into a solid gold statue before dissolving. A pile of gold is left behind. 💰',
                    outcomeEmoji: '💰',
                },
            },
        ],
    },
    {
        id: 'contaminated_sewers_07_ratman',
        title: 'The Rat-Man Scavenger',
        description: 'A hunched figure in a gas mask 🎭, with a long tail, offers you a deal. "Psst. Shiny ✨. For you. Good price." He holds out a gleaming gem 💎 and a dusty, locked box ❓.',
        emojis: ['🐀', '🎭', '💎', '❓'],
        eventType: 'realm_specific',
        realm: 'Contaminated Sewers',
        options: [
            {
                text: 'Trade 200 gold for the gleaming gem',
                emoji: '💎',
                cost: 200,
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r10', rarity: 'legendary' }, // Infinity Stone
                    resultText: 'You trade for the gem 💎. It feels warm and powerful in your hand. It is a legendary artifact! 🤩',
                    outcomeEmoji: '🤩',
                },
            },
            {
                text: 'Trade 200 gold for the locked box',
                emoji: '📦',
                cost: 200,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Sewer Plague', description: 'The box is full of disease! Permanently lose 5% Max Health.', type: 'debuff', modifiers: { percent: { maxHealth: -0.05 } } }], duration_ms: Infinity },
                    resultText: 'You trade for the box 📦. You open it and a cloud of spores erupts in your face, leaving you with a permanent, hacking cough. 🤢',
                    outcomeEmoji: '🤢',
                },
            },
            {
                text: 'Ask for directions instead',
                emoji: '🗺️',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: '"Straight on," he squeaks, pointing to a half-hidden tunnel that serves as a useful shortcut. 👍',
                    outcomeEmoji: '👍',
                },
            },
            {
                text: 'Threaten him',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: 'He throws a smoke pellet at your feet 💨. When the smoke clears, he\'s gone, and you\'re somehow in the previous tunnel. 😠',
                    outcomeEmoji: '💨',
                },
            },
        ],
    },
];