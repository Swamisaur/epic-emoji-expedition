/**
 * @file data/events/infernoPeak_3.ts
 * @description Contains the third batch of events specific to the Inferno Peak realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const infernoPeakEvents_3: GameEvent[] = [
    {
        id: 'inferno_peak_09',
        title: "Brimstone Egg",
        description: "You find a large, warm egg 🥚 that smells faintly of sulfur, resting in a nest of cooled lava rock. 🤔🔥",
        emojis: ['🥚', '🔥', '🐣', '🍳'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Try to hatch it',
                emoji: '🐣',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Phoenix's Gift", description: "A baby phoenix hatches and blesses you! 🐣 Permanently gain +5% Attack and +5% Max Health.", type: 'buff', modifiers: { percent: { attackPower: 0.05, maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You warm the egg 🔥. A tiny phoenix 🐣 hatches, nuzzles your cheek, and flies away, leaving you with a powerful, permanent blessing. 😇✨",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Cook it',
                emoji: '🍳',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: "It makes a surprisingly delicious, if spicy, omelette 🍳. You are healed to full health! 😋❤️‍🩹",
                    outcomeEmoji: '😋'
                }
            },
            {
                text: 'Smash it',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Mother's Fury", description: "An unseen creature roars in fury! 😠 -15% Attack Power for 2 minutes.", type: 'debuff', modifiers: { percent: { attackPower: -0.15 } } }], duration_ms: 120000 },
                    resultText: "You smash the egg 💥. A furious roar echoes from the peak, and you are struck by a wave of parental rage that weakens you. 😠😫",
                    outcomeEmoji: '😠'
                }
            },
            {
                text: 'Leave it in the nest',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You leave the egg to its fate 🐣. It's not your business. 😌👍",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_10',
        title: "The Charred Library",
        description: "You discover the ruins of a library 📚 where every book has been turned to ash... except for one, which rests untouched on a pedestal. 🔥📖",
        emojis: ['📚', '🔥', '📖', '🤔'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Read the surviving book',
                emoji: '📖',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Tome of Fire", description: "+20% Crit Damage for 3 minutes. 🔥", type: 'buff', modifiers: { percent: { critDamage: 0.20 } } }], duration_ms: 180000 },
                    resultText: "It's a tome on pyromancy 📖. You learn a few tricks for maximizing the impact of your blows. 💥🔥",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Use it as kindling',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "It's fireproof 🔥. The book refuses to burn. You give up and move on. 🤷‍♂️🚶",
                    outcomeEmoji: '🤷'
                }
            },
            {
                text: 'Look for a secret passage',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: "You pull the book 📖, and the pedestal slides aside, revealing a small cache of hidden gold. 💰🤑",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Leave the book in peace',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "This book survived for a reason 🤔. You leave it for someone who might truly need its knowledge. 🙏😌",
                    outcomeEmoji: '😌'
                }
            }
        ]
    }
];