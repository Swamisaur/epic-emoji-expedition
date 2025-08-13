/**
 * @file data/events/glacialPeak_5.ts
 * @description Contains the fifth batch of events specific to the Glacial Peak realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const glacialPeakEvents_5: GameEvent[] = [
    {
        id: 'glacial_peak_12_frost_giant',
        title: "The Frost Giant's Snooze",
        description: "A massive Frost Giant 😴 is sleeping, his snores causing mini-avalanches. He's blocking a clear shortcut. His breath freezes the air around him. 🥶",
        emojis: ['😴', '🥶', '🤫', '🍀'],
        eventType: 'realm_specific',
        realm: 'Glacial Peak',
        options: [
            {
                text: 'Endure his icy breath.',
                emoji: '🥶',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Ice in your Veins', description: 'Permanently gain +5% Max Health.', type: 'buff', modifiers: { percent: { maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You withstand the freezing cold with your incredible endurance. The experience hardens you, permanently boosting your health.",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Steal the rune on his necklace.',
                emoji: '🍀',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r10', rarity: 'legendary' }, // Infinity Stone
                    resultText: "Incredible luck! You manage to lift the giant, pulsating rune from his neck without waking him. It's a legendary artifact!",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Sing a lullaby.',
                emoji: '🎶',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Soothing Slumber', description: 'Permanently gain +5% Max Health.', type: 'buff', modifiers: { percent: { maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "Your gentle song makes the giant's snores soften. His peaceful aura grants you a permanent boon of health.",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Warm his toe with a torch.',
                emoji: '🔥',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -2 },
                    resultText: "He twitches in his sleep and kicks violently, sending you flying backward down the mountain.",
                    outcomeEmoji: '😵'
                }
            }
        ]
    },
    {
        id: 'glacial_peak_13_aurora',
        title: 'The Aurora Borealis',
        description: "The sky is lit by a beautiful, magical aurora 🌌. The shimmering lights seem to whisper ancient secrets on the wind. ✨",
        emojis: ['🌌', '✨', '💪', '🎨'],
        eventType: 'realm_specific',
        realm: 'Glacial Peak',
        options: [
            {
                text: 'Interpret the lights as a battle map.',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Celestial Combat', description: 'Permanently gain +5% Attack Power.', type: 'buff', modifiers: { percent: { attackPower: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You see the patterns of an ancient celestial battle in the lights, learning a powerful new combat form.",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Bathe in the healing glow.',
                emoji: '❤️',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: "The magical light washes over you, mending all your wounds and restoring your spirit.",
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Try to "catch" the light.',
                emoji: '🎨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Aurora\'s Touch', description: 'Your skin tone has been magically altered!', type: 'buff', modifiers: {} }], duration_ms: Infinity },
                    resultText: "You reach out and the light seems to cling to you, magically altering your skin tone for this run!",
                    outcomeEmoji: '🌈'
                }
            },
            {
                text: 'Yell at the sky.',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Blinded by the Light', description: '-15% Accuracy for 2 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.15 } } }], duration_ms: 120000 },
                    resultText: "The lights flare angrily in response to your challenge, searing your eyes and making it hard to focus.",
                    outcomeEmoji: '😵'
                }
            }
        ]
    },
    {
        id: 'glacial_peak_14_frozen_heart',
        title: 'The Frozen Heart',
        description: 'You find a heart, perfectly preserved in a block of clear ice ❤️‍🩹. Impossibly, it is still beating with a faint, slow rhythm.',
        emojis: ['❤️‍🩹', '🧊', '💪', '😋'],
        eventType: 'realm_specific',
        realm: 'Glacial Peak',
        options: [
            {
                text: 'Warm it with your hands. (Female character)',
                emoji: '🥰',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Heart of a Hero', description: 'Permanently gain +10% Max Health.', type: 'buff', modifiers: { percent: { maxHealth: 0.10 } } }], duration_ms: Infinity },
                    resultText: "You hold the frozen heart to your chest. It melts and merges with your own, granting you a permanent boost to your vitality.",
                    outcomeEmoji: '💖'
                }
            },
            {
                text: 'Restart it with a jolt. (Male character)',
                emoji: '⚡️',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Restarted Heart', description: '+20% Attack Speed for 2 minutes.', type: 'buff', modifiers: { percent: { attackSpeed: 0.20 } } }], duration_ms: 120000 },
                    resultText: "You give it a firm thump! The heart beats once with a mighty pulse, sending a shockwave of energy through you that quickens your movements.",
                    outcomeEmoji: '💨'
                }
            },
            {
                text: 'Sell it to a wizard.',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 600 },
                    resultText: "A spectral wizard appears, offering a handsome price for the rare magical component. You make the trade.",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Eat it.',
                emoji: '😋',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'BRAIN FREEZE', description: '-20% Accuracy for 90s.', type: 'debuff', modifiers: { percent: { accuracy: -0.20 } } }], duration_ms: 90000 },
                    resultText: "It's frozen solid and gives you the worst brain freeze of your life. Your vision swims.",
                    outcomeEmoji: '🥶'
                }
            }
        ]
    },
    {
        id: 'glacial_peak_15_yeti_chef',
        title: 'The Yeti Chef',
        description: "A friendly Yeti 👹 wearing a tall chef's hat 🧑‍🍳 offers you a bowl of its signature 'Glacier Goulash.' It's a vibrant blue color and smells faintly of mint.",
        emojis: ['👹', '🧑‍🍳', '🥣', '🍀'],
        eventType: 'realm_specific',
        realm: 'Glacial Peak',
        options: [
            {
                text: 'Eat the goulash.',
                emoji: '😋',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Glacier Goulash', description: '+30% Max Health for 3 minutes.', type: 'buff', modifiers: { percent: { maxHealth: 0.30 } } }], duration_ms: 180000 },
                    resultText: "It's cold, but surprisingly nourishing! You feel a surge of chilly, robust health.",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Season it with lucky salt.',
                emoji: '🍀',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'm3', rarity: 'rare' }, // Lumberjack Axe
                    resultText: "The Yeti is astounded by your culinary prowess! 'You have unlocked the flavor!' it roars, gifting you its favorite meat cleaver (which is basically a rare axe).",
                    outcomeEmoji: '🪓'
                }
            },
            {
                text: 'Ask for the recipe.',
                emoji: '📜',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: "The Yeti can't write, so it just gives you a bag of its rare, valuable ingredients instead.",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Criticize the plating.',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Goulash to the Face', description: '-15% Accuracy for 2 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.15 } } }], duration_ms: 120000 },
                    resultText: "The Yeti is a sensitive artist. It growls and throws the cold, viscous soup right in your face.",
                    outcomeEmoji: '😵'
                }
            }
        ]
    }
];
