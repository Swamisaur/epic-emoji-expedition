/**
 * @file data/events/glacialPeak_2.ts
 * @description Contains the second batch of events specific to the Glacial Peak realm.
 * This file is part of Task 7.2 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const glacialPeakEvents_2: GameEvent[] = [
    {
        id: 'glacial_peak_06',
        title: 'Frozen Battlefield',
        description: 'You find a battlefield from an ancient war ⚔️, perfectly preserved in the ice 🧊. Two armies of warriors are frozen mid-swing. 🥶',
        emojis: ['⚔️', '🛡️', '🧊', '💀'],
        eventType: 'realm_specific',
        realm: 'Glacial Peak',
        options: [
            {
                text: 'Loot a warrior\'s sword',
                emoji: '⚔️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'm10', rarity: 'rare' }, // Excalibur
                    resultText: 'You carefully chip a magnificent sword ⚔️ from the ice. It is flawlessly preserved. 🤩',
                    outcomeEmoji: '🤩',
                },
            },
            {
                text: 'Take a commander\'s shield',
                emoji: '🛡️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o8', rarity: 'rare' }, // Kite Shield
                    resultText: 'You free an ornate shield 🛡️ from a fallen captain. It is heavy and powerful. 💪',
                    outcomeEmoji: '💪',
                },
            },
            {
                text: 'Search for gold',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: 'You find a paymaster\'s lockbox 🧰 frozen in the ice, filled with old, valuable coins. 🤑',
                    outcomeEmoji: '🤑',
                },
            },
            {
                text: 'Leave the dead to their war',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'This place is a monument to a forgotten conflict 🙏. You leave it undisturbed. 😌',
                    outcomeEmoji: '😌',
                },
            },
        ],
    },
    {
        id: 'glacial_peak_07',
        title: 'The Whistling Fissure',
        description: 'A deep, narrow fissure in the ice 🧊 emits a strange, melodic whistling 🎶 as the wind blows over it 🌬️. It sounds like a ghostly song. 👻',
        emojis: ['🌬️', '🎶', '👂', '😱'],
        eventType: 'realm_specific',
        realm: 'Glacial Peak',
        options: [
            {
                text: 'Listen closely to the song',
                emoji: '👂',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Wind Song', description: '+15% Crit Chance for 2 minutes.', type: 'buff', modifiers: { percent: { critChance: 0.15 } } }], duration_ms: 120000 },
                    resultText: 'You listen to the wind\'s secrets 👂. The song teaches you to see the unseen, honing your aim. 🎯',
                    outcomeEmoji: '🎯',
                },
            },
            {
                text: 'Try to block the fissure',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Wind\'s Fury', description: 'The trapped wind explodes! -10% Attack Speed for 90s.', type: 'debuff', modifiers: { percent: { attackSpeed: -0.1 } } }], duration_ms: 90000 },
                    resultText: 'You roll a boulder over the fissure 🪨. The trapped wind pressure builds and explodes, knocking you back. 😖',
                    outcomeEmoji: '😖',
                },
            },
            {
                text: 'Use it as a shortcut',
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: 'You carefully shimmy along the edge of the fissure 🏃. It\'s a dangerous but effective shortcut. 👍',
                    outcomeEmoji: '👍',
                },
            },
            {
                text: 'Yell into it',
                emoji: '🗣️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'The fissure whistles your yell back at you in a perfect, haunting echo 🗣️. It\'s a little creepy. 😨',
                    outcomeEmoji: '😨',
                },
            },
        ],
    },
];