/**
 * @file data/events/infernoPeak_2.ts
 * @description Contains the second batch of events specific to the Inferno Peak realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const infernoPeakEvents_2: GameEvent[] = [
    {
        id: 'inferno_peak_05',
        title: "Obsidian Mirror",
        description: "You find a large, smooth sheet of obsidian 🪞 that reflects a slightly stronger, more heroic version of yourself. 💪✨",
        emojis: ['🪞', '💪', '✨', '🤔'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Gaze into it',
                emoji: '👀',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Heroic Reflection", description: "Permanently gain +5% Attack and Health.", type: 'buff', modifiers: { percent: { attackPower: 0.05, maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You gaze at your reflection 👀, and its strength seems to flow into you. You feel permanently emboldened. 🤩💪",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Smash the mirror',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "7 Years Bad Luck", description: "-15% Fortune for 3 minutes.", type: 'debuff', modifiers: { percent: { luck: -0.15 } } }], duration_ms: 180000 },
                    resultText: "You shatter the mirror 💥. A wave of bad luck washes over you. What did you expect? 😭🤦",
                    outcomeEmoji: '😭'
                }
            },
            {
                text: 'Make a funny face',
                emoji: '😜',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Your reflection makes an even funnier face back 😜. You share a laugh with yourself and move on. 😂👍",
                    outcomeEmoji: '😂'
                }
            },
            {
                text: 'Ignore the strange mirror',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "This is clearly some kind of magic you don't want to mess with 🧙‍♂️. You walk on by. 👍",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_06',
        title: "The Dwarven Forge",
        description: "You find an abandoned dwarven forge ⚒️. The embers in the hearth still glow with a faint, magical heat. 🔥✨",
        emojis: ['⚒️', '🔥', '⚙️', '💎'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Stoke the flames',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Forge-Fire Heart", description: "+15% Attack Power for 2 minutes.", type: 'buff', modifiers: { percent: { attackPower: 0.15 } } }], duration_ms: 120000 },
                    resultText: "You work the bellows and the forge roars to life 🔥. The intense heat fills you with a burning fighting spirit. 💪❤️‍🔥",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Quench the flames',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'b8', rarity: 'rare' }, // Iron Greaves
                    resultText: "You pour water on the embers 💧. In the violent hiss of steam 💨, a perfectly forged set of greaves is revealed, magically cooled from the fire. 🔩",
                    outcomeEmoji: '🔩'
                }
            },
            {
                text: 'Look for scrap metal',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: "You find a pile of high-quality dwarven steel ingots 🪙, worth a good sum. 💰🤑",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Use the anvil as a table',
                emoji: '🥪',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "It's a fine place to have a snack 🥪. You rest a moment before continuing. 😌👍",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_07',
        title: "A River of Lava",
        description: "A wide river of molten lava blocks your path 🔥. A series of precarious-looking stones offer a potential path across. 🤔🌋",
        emojis: ['🔥', '💧', '🏃', '🤔'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Take a mighty running leap',
                emoji: '🚀',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "A daring leap! 🚀 You clear the river entirely, landing much further ahead than the winding path would have taken you. 😎💨",
                    outcomeEmoji: '😎'
                }
            },
            {
                text: 'Hop across the stones',
                emoji: '👣',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.25 },
                    resultText: "You try to hop from stone to stone, but one gives way! Your foot plunges into the lava 🔥. You scramble to the other side, but are badly burned, losing 25% of your max health. 🤕😫",
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Throw something in',
                emoji: '✨',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: "You toss a rock in ✨. The lava bubbles and spits out a fire-gem, which cools on the bank. 💎💰",
                    outcomeEmoji: '💎'
                }
            },
            {
                text: 'Find another way',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "The heat is too intense 🥵. You have to backtrack to find a safer crossing. 😩🚶",
                    outcomeEmoji: '😩'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_08',
        title: "The Salamander's Game",
        description: "A playful fire salamander 🦎 holds out three glowing fire opals. 'Pick one, pick one!' it chirps. 'A prize in one, a surprise in the others!' 💎🎁",
        emojis: ['🦎', '💎', '❓', '🔥'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Pick the left opal',
                emoji: '👈',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 500 },
                    resultText: "The opal dissolves into a massive pile of gold! ✨ The salamander claps its tiny hands. 🤑💰",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Pick the middle opal',
                emoji: '👆',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Salamander's Curse", description: "The opal explodes with soot! -10% Crit Chance for 2 minutes.", type: 'debuff', modifiers: { percent: { critChance: -0.10 } } }], duration_ms: 120000 },
                    resultText: "The opal bursts in a cloud of soot 💨, getting in your eyes and making it hard to aim. 😖😵",
                    outcomeEmoji: '😖'
                }
            },
            {
                text: 'Pick the right opal',
                emoji: '👉',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r1', rarity: 'legendary' }, // Magic Amber
                    resultText: "The opal transforms into a legendary ring! A fantastic prize! 💍🤩",
                    outcomeEmoji: '💍'
                }
            },
            {
                text: 'Decline to play',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You don't trust lizard-based gem games 🦎. You move on. 👍😌",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];