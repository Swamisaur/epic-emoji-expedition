/**
 * @file data/events/infernoPeak_5.ts
 * @description Contains the fifth batch of events specific to the Inferno Peak realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const infernoPeakEvents_5: GameEvent[] = [
    {
        id: 'inferno_peak_13_runesmith',
        title: "The Runesmith's Ghost",
        description: "A dwarven ghost 👻 hammers on an ethereal anvil. 'My masterpiece...' he groans. 'It needs a final, physical blow, but I am naught but spirit! If only someone could lend me their strength...' ⚒️",
        emojis: ['👻', '⚒️', '💪', '😠'],
        eventType: 'realm_specific',
        realm: 'Inferno Peak',
        options: [
            {
                text: 'Lend him your body. (Requires Power focus)',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Spiritual Exhaustion', description: 'The possession was draining. -15% Max Health for 3 minutes.', type: 'debuff', modifiers: { percent: { maxHealth: -0.15 } } }], duration_ms: 180000 },
                    resultText: "He possesses you, and with a final, mighty blow, forges a legendary weapon! He leaves it for you as thanks, but the spiritual toll is heavy.",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Sing a song of the forge. (Female character)',
                emoji: '🎶',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Forge Song', description: 'Permanently gain +5% Crit Damage.', type: 'buff', modifiers: { percent: { critDamage: 0.05 } } }], duration_ms: Infinity },
                    resultText: "Your song inspires the ghost! He teaches you a secret of finding weak points in metal, granting you a permanent critical advantage.",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Offer him a spectral ale. (Male character)',
                emoji: '🍺',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'm5', rarity: 'rare' }, // Carpenter's Hammer
                    resultText: "'Ah, a fine brew!' He gets distracted and drops his spectral hammer, which solidifies into a real, rare weapon at your feet.",
                    outcomeEmoji: '🔨'
                }
            },
            {
                text: 'Mock his weakness.',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Shoddy Craftsmanship', description: 'He curses your weapon! -15% Accuracy for 2 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.15 } } }], duration_ms: 120000 },
                    resultText: "'Weak?! I'll show you weak!' He touches your weapon, and it suddenly feels poorly balanced and clumsy.",
                    outcomeEmoji: '😖'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_14_geyser',
        title: 'The Magma Geyser',
        description: 'A geyser of pure lava 🌋 erupts from the ground periodically, blocking the path. The heat is immense. 🔥',
        emojis: ['🌋', '🔥', '💨', '💰'],
        eventType: 'realm_specific',
        realm: 'Inferno Peak',
        options: [
            {
                text: 'Time it and leap through. (Requires Speed focus)',
                emoji: '💨',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Heat Wash', description: 'The adrenaline and heat make you faster. +20% Attack Speed for 2 minutes.', type: 'buff', modifiers: { percent: { attackSpeed: 0.20 } } }], duration_ms: 120000 },
                    resultText: "You dash through between eruptions, the heat wash making you feel incredibly swift and energized.",
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Throw 100 gold in.',
                emoji: '💰',
                cost: 100,
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r1', rarity: 'rare' }, // Magic Amber
                    resultText: "The geyser consumes your gold and spits out a beautiful, lava-forged trinket as thanks.",
                    outcomeEmoji: '💍'
                }
            },
            {
                text: 'Try to plug it with a rock.',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "The pressure builds, and the rock is launched with explosive force, knocking you backward.",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Wait for it to stop.',
                emoji: '⏳',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.05 },
                    resultText: "It doesn't stop. You get impatient and try to go around, getting a minor burn for 5% of your max health in the process.",
                    outcomeEmoji: '😫'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_15_phoenix_ash',
        title: "The Phoenix's Ash",
        description: "In a circle of scorched rock, you find a pile of warm, glowing ash ✨. A single, pulsating ember beats like a heart within it. ❤️‍🔥",
        emojis: ['🔥', '✨', '❤️‍🔥', '🎨'],
        eventType: 'realm_specific',
        realm: 'Inferno Peak',
        options: [
            {
                text: 'Swallow the ember. (Requires Health focus)',
                emoji: '😋',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: "The ember fills you with the fire of life itself! You are healed to full health.",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Fan the flames with your life force.',
                emoji: '❤️‍🔥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Phoenix Rebirth", description: "A baby phoenix is born! It grants you a permanent +10% Attack Power.", type: 'buff', modifiers: { percent: { attackPower: 0.10 } } }], duration_ms: Infinity },
                    resultText: "You sacrifice some of your health to the ash. A tiny, perfect phoenix hatches, blesses you with its power, and soars into the sky.",
                    outcomeEmoji: '🐣'
                }
            },
            {
                text: 'Rub the ash on your skin.',
                emoji: '🎨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Ashen Skin', description: 'The ash coats you, granting 5% damage reduction for 3 minutes.', type: 'buff', modifiers: { percent: { damageReduction: 0.05 } } }], duration_ms: 180000 },
                    resultText: "You rub the ash on your skin. It forms a protective, shimmering layer that grants you minor resistance to fire.",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Snuff out the ember.',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Sorrowful Chill', description: 'A sad cry echoes. -15% Fortune for 2 minutes.', type: 'debuff', modifiers: { percent: { luck: -0.15 } } }], duration_ms: 120000 },
                    resultText: "An act of needless cruelty. A sorrowful cry echoes from the ash, cursing you with misfortune.",
                    outcomeEmoji: '😭'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_16_ifrit_game',
        title: "The Ifrit's Gamble",
        description: 'A powerful Ifrit 🧞‍♂️ of smoke and flame offers you a game of chance. "Pick a flame, mortal. One holds a prize, the other... pain." 🔥',
        emojis: ['🧞‍♂️', '🔥', '💰', '🍀'],
        eventType: 'realm_specific',
        realm: 'Inferno Peak',
        options: [
            {
                text: 'Pick a flame. (Requires Luck focus)',
                emoji: '🍀',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 1000 },
                    resultText: "Your luck holds true! You pick the correct flame and are rewarded with a djinni's ransom in gold!",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Flatter the Ifrit. (Female character)',
                emoji: '🥰',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.40 },
                    resultText: "'You think so?' The Ifrit preens. 'For your excellent taste, have a boon.' He heals you for 40% of your max health.",
                    outcomeEmoji: '😊'
                }
            },
            {
                text: 'Challenge his might. (Male character)',
                emoji: '💪',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.15 },
                    resultText: "'Challenge ME?!' The Ifrit scoffs and blasts you with a small fireball, dealing 15% of your max health in damage.",
                    outcomeEmoji: '😠'
                }
            },
            {
                text: 'Walk away.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You refuse to play the djinni's game. He shrugs and vanishes.",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];