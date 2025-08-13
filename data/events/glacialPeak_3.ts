/**
 * @file data/events/glacialPeak_3.ts
 * @description Contains the third batch of events specific to the Glacial Peak realm.
 * This file is part of Task 7.2 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const glacialPeakEvents_3: GameEvent[] = [
    {
        id: 'glacial_peak_08_elemental',
        title: 'The Dying Ember',
        description: 'You find a small, fading fire elemental 🔥 shivering in a cave 🥶. "So... cold..." it flickers. "If only I could reach the Heart of the Mountain... I could be reborn." 💖',
        emojis: ['🔥', '🥶', '❤️‍🩹', '❓'],
        eventType: 'realm_specific',
        realm: 'Glacial Peak',
        options: [
            {
                text: 'Promise to help it',
                emoji: '🤝',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'fire_elemental_pact' },
                    resultText: '"You... will?" it whispers 🤝. The elemental imparts a tiny spark to you, a locator for the Heart. "Find it... please..." 🙏',
                    outcomeEmoji: '🙏',
                },
            },
            {
                text: 'Extinguish it',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Cold Hearted', description: 'You feel a chill in your soul. -10% Crit Damage for 3 minutes.', type: 'debuff', modifiers: { percent: { critDamage: -0.1 } } }], duration_ms: 180000 },
                    resultText: 'You put the elemental out of its misery 💧. A profound coldness fills the cave, and a bit of it seeps into you. 😠',
                    outcomeEmoji: '😠',
                },
            },
            {
                text: 'Use it to warm your hands',
                emoji: '✋',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.1 },
                    resultText: 'You warm your hands over the tiny flame ✋. It\'s not much, but it restores a bit of your health. The elemental seems to fade a little faster. 😌',
                    outcomeEmoji: '😌',
                },
            },
            {
                text: 'Leave it to its fate',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'The cold is relentless 🥶. You leave the dying creature and press on. 😔',
                    outcomeEmoji: '😔',
                },
            },
        ],
    },
    {
        id: 'glacial_peak_09',
        title: 'The Ice Sculptor',
        description: 'You find a cave filled with breathtakingly beautiful, lifelike ice sculptures 🗿. A lonely looking Yeti 👹 is carefully carving another one. 🎨',
        emojis: ['🗿', '🎨', '🧊', '👹'],
        eventType: 'realm_specific',
        realm: 'Glacial Peak',
        options: [
            {
                text: 'Commission a sculpture of yourself',
                emoji: '🤩',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Ice Effigy', description: 'Seeing your heroic self inspires you. +10% to all core stats for 90s.', type: 'buff', modifiers: { percent: { attackPower: 0.1, maxHealth: 0.1, attackSpeed: 0.1 } } }], duration_ms: 90000 },
                    resultText: 'The Yeti masterfully carves your likeness 🤩. Seeing yourself as a perfect hero fills you with immense confidence. 😎',
                    outcomeEmoji: '😎',
                },
            },
            {
                text: 'Help it carve',
                emoji: '🤝',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: 'Your help is clumsy 🤝, but the Yeti appreciates the company. It gives you a handful of ice-gems as thanks. 💎',
                    outcomeEmoji: '💎',
                },
            },
            {
                text: 'Smash a sculpture',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: 'The Yeti roars in fury 😡 and throws a massive block of ice at you, sending you tumbling back down the path. 💥',
                    outcomeEmoji: '😡',
                },
            },
            {
                text: 'Applaud its work',
                emoji: '👏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'The Yeti blushes 😊 and gives you a shy wave. You leave the artist to their work. 👏',
                    outcomeEmoji: '😊',
                },
            },
        ],
    },
];