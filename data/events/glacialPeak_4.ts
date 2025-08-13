/**
 * @file data/events/glacialPeak_4.ts
 * @description Contains the fourth batch of events specific to the Glacial Peak realm.
 * This file is part of Task 7.2 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const glacialPeakEvents_4: GameEvent[] = [
    {
        id: 'glacial_peak_10_elemental',
        title: 'The Heart of the Mountain',
        description: 'Following the elemental\'s spark 🔥, you find a volcanic vent deep within the ice 🧊. A single, eternally warm stone rests in the center ❤️‍🔥. This is the Heart of the Mountain.',
        emojis: ['❤️‍🔥', '🔥', '💎', '🧊'],
        eventType: 'realm_specific',
        realm: 'Glacial Peak',
        requiredFlag: 'fire_elemental_pact',
        options: [
            {
                text: 'Bring the Heart to the elemental',
                emoji: '❤️‍🩹',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Phoenix Soul', description: 'Permanently gain +10% Attack Power and +5% Max Health.', type: 'buff', modifiers: { percent: { attackPower: 0.1, maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: 'You bring the stone to the elemental ❤️‍🩹. It consumes the Heart and erupts into a majestic firebird! 🐦‍🔥 It grants you a powerful, permanent blessing before flying into the sky. 😇',
                    outcomeEmoji: '😇',
                },
            },
            {
                text: 'Take the Heart for yourself',
                emoji: '😈',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Heart of Fire', description: 'Permanently gain +15% Max Health.', type: 'buff', modifiers: { percent: { maxHealth: 0.15 } } }], duration_ms: Infinity },
                    resultText: 'You absorb the Heart\'s warmth into yourself 😈. You feel a permanent, deep well of vitality, but the spark you carried fades to nothing. 💪',
                    outcomeEmoji: '💪',
                },
            },
            {
                text: 'Use it to forge an item',
                emoji: '⚒️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'm10', rarity: 'legendary' }, // Excalibur
                    resultText: 'You use the volcanic heat and a nearby icicle to forge a magnificent weapon ⚒️ of steam and steel. ⚔️',
                    outcomeEmoji: '⚔️',
                },
            },
            {
                text: 'Leave it. It keeps the peak stable.',
                emoji: '🤔',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'Removing this seems like a bad idea for the local geology 🤔. You leave it in peace. 😌',
                    outcomeEmoji: '😌',
                },
            },
        ],
    },
    {
        id: 'glacial_peak_11',
        title: 'The Precarious Ice Bridge',
        description: 'A shimmering, narrow bridge of ice 🌉 spans a bottomless crevasse 😱. It looks like the only way forward, but it groans under its own weight. 😬',
        emojis: ['🌉', '🧊', '😱', '🏃'],
        eventType: 'realm_specific',
        realm: 'Glacial Peak',
        options: [
            {
                text: 'Carefully sprint across!',
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: 'You run as fast as you can! 🏃 The bridge cracks behind you but you make it, taking a huge shortcut! 🚀',
                    outcomeEmoji: '🚀',
                },
            },
            {
                text: 'Recklessly leap across!',
                emoji: '🤸',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -2 },
                    resultText: 'The bridge shatters beneath your feet! 🤸 You manage to grab the ledge, but you\'ve been set back a long way. 😭',
                    outcomeEmoji: '😭',
                },
            },
            {
                text: 'Crawl across slowly',
                emoji: '👣',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: 'Slow and steady wins the race. You carefully cross the bridge 👣, saving some time. 👍',
                    outcomeEmoji: '👍',
                },
            },
            {
                text: 'Reinforce it with more ice',
                emoji: '🛠️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You spend a long time packing snow and ice onto the bridge 🛠️. It feels sturdier, but you didn\'t save any time. 🤷',
                    outcomeEmoji: '🤷',
                },
            },
        ],
    },
];