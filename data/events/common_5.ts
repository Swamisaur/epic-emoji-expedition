/**
 * @file data/events/common_5.ts
 * @description Contains the fifth batch of common events that can appear in any realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const commonEvents_5: GameEvent[] = [
    {
        id: 'common_16_reflecting_pool',
        title: 'The Reflecting Pool',
        description: 'You find a perfectly still pool of crystal-clear water 💧. Your reflection stares back, looking unusually heroic and resolute. 💪✨',
        emojis: ['💧', '✨', '💪', '🤔'],
        eventType: 'common',
        options: [
            {
                text: 'Admire your reflection.',
                emoji: '🤩',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Hero's Visage",
                            description: "Inspired by your own heroic look, you gain a permanent +2% Crit Damage.",
                            type: 'buff',
                            modifiers: { percent: { critDamage: 0.02 } }
                        }],
                        duration_ms: Infinity
                    },
                    resultText: 'You look good! Seeing your heroic visage fills you with confidence, sharpening your killer instinct.',
                    outcomeEmoji: '😎'
                }
            },
            {
                text: 'Drink from the pool.',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_missing', amount: 0.50 },
                    resultText: 'The water is pure and revitalizing. You heal for 50% of your missing health.',
                    outcomeEmoji: '❤️‍🩹'
                }
            },
            {
                text: 'Splash around.',
                emoji: '💦',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You splash in the water for a bit. It's fun, but the heroic reflection is gone. Worth it.",
                    outcomeEmoji: '😂'
                }
            },
            {
                text: 'Look for treasure.',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 120 },
                    resultText: 'You find a small, waterlogged pouch at the bottom of the pool containing some coins.',
                    outcomeEmoji: '💰'
                }
            }
        ]
    },
    {
        id: 'common_17_grumpy_oracle',
        title: 'The Grumpy Oracle',
        description: 'An old oracle 👳 sits in a cave, looking utterly bored. "Oh, another hero," he sighs. "Fine. Ask your question. Make it quick. I have naps to attend to." 😴',
        emojis: ['👳', '🔮', '😴', '😠'],
        eventType: 'common',
        options: [
            {
                text: 'Ask for a prophecy of your next fight.',
                emoji: '🔮',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Cryptic Prophecy",
                            description: "The prophecy is confusing! -10% Accuracy for 2 minutes.",
                            type: 'debuff',
                            modifiers: { percent: { accuracy: -0.10 } }
                        }],
                        duration_ms: 120000
                    },
                    resultText: '"You will face... a thing. And you will hit it... probably." His vague prophecy rattles your confidence, making your aim unsteady.',
                    outcomeEmoji: '😵'
                }
            },
            {
                text: '"How are you doing today?"',
                emoji: '❤️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Oracle's Favor",
                            description: "Your kindness is rewarded. +15% Fortune for 3 minutes.",
                            type: 'buff',
                            modifiers: { percent: { luck: 0.15 } }
                        }],
                        duration_ms: 180000
                    },
                    resultText: 'The oracle blinks. "...No one ever asks that." He seems touched and grants you a powerful blessing of good fortune.',
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Give him your trail rations.',
                emoji: '🥪',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.30 },
                    resultText: '"Food! Finally!" He scarfs down the rations and, in a rare moment of generosity, casts a powerful healing spell on you.',
                    outcomeEmoji: '😋'
                }
            },
            {
                text: 'Insult his oracular abilities.',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.05 },
                    resultText: '"Insolent whelp!" He zaps you with a weak but annoying curse, dealing 5% of your max health in damage.',
                    outcomeEmoji: '⚡️'
                }
            }
        ]
    },
    {
        id: 'common_18_crossroads_demon',
        title: 'The Crossroads Demon',
        description: "At a desolate crossroads, a smiling demon 😈 offers you a deal. 'A fraction of your soul for a lifetime of power in a chosen discipline. What'll it be, hero?'",
        emojis: ['😈', '🔥', '💪', '🤝'],
        eventType: 'common',
        options: [
            {
                text: 'Deal for raw power.',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Demonic Strength",
                            description: "Permanently +10% Attack Power, but -5% Max Health.",
                            type: 'buff',
                            modifiers: { percent: { attackPower: 0.10, maxHealth: -0.05 } }
                        }],
                        duration_ms: Infinity
                    },
                    resultText: "The demon grins, and you feel a surge of raw, destructive power, but a sliver of your vitality is torn away.",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Deal for uncanny speed.',
                emoji: '💨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Demonic Speed",
                            description: "Permanently +10% Attack Speed, but -5% Attack Power.",
                            type: 'buff',
                            modifiers: { percent: { attackSpeed: 0.10, attackPower: -0.05 } }
                        }],
                        duration_ms: Infinity
                    },
                    resultText: "Your movements become a blur, but your strikes lose some of their brutal force.",
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Deal for unholy resilience.',
                emoji: '🛡️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Demonic Resilience",
                            description: "Permanently +15% Max Health, but -5% Attack Speed.",
                            type: 'buff',
                            modifiers: { percent: { maxHealth: 0.15, attackSpeed: -0.05 } }
                        }],
                        duration_ms: Infinity
                    },
                    resultText: "Your flesh hardens like stone, but the unnatural toughness makes you more sluggish.",
                    outcomeEmoji: '❤️‍🔥'
                }
            },
            {
                text: 'Refuse the deal.',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "'Your loss,' the demon shrugs, vanishing in a puff of sulfur. 'There are always more heroes.'",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'common_19_mimic_trainer',
        title: 'The Mimic Trainer',
        description: 'You find a dojo run by a surprisingly articulate Mimic 👅. "Other mimics give us a bad name," it says. "I teach. What style do you wish to learn? Quick, Strong, or Lucky?"',
        emojis: ['👅', '🥋', '💪', '🍀'],
        eventType: 'common',
        options: [
            {
                text: 'Learn the Way of the Striking Cobra.',
                emoji: '🐍',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Cobra Style", description: "+20% Crit Damage for 2 minutes.", type: 'buff', modifiers: { percent: { critDamage: 0.20 } } }], duration_ms: 120000 },
                    resultText: "The mimic teaches you to strike with venomous precision. Your critical hits become much more potent.",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Learn the Way of the Enduring Mountain.',
                emoji: '🏔️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Mountain Style", description: "+20% Max Health for 2 minutes.", type: 'buff', modifiers: { percent: { maxHealth: 0.20 } } }], duration_ms: 120000 },
                    resultText: "You learn to stand firm like a mountain. Your resilience is greatly increased.",
                    outcomeEmoji: '🛡️'
                }
            },
            {
                text: 'Learn the Way of the Leaping Rabbit.',
                emoji: '🐇',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Rabbit Style", description: "+20% Fortune for 2 minutes.", type: 'buff', modifiers: { percent: { luck: 0.20 } } }], duration_ms: 120000 },
                    resultText: "The mimic teaches you to be unpredictable and quick. You feel much luckier.",
                    outcomeEmoji: '🍀'
                }
            },
            {
                text: 'Ask if he has any treasure.',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: '"That is a hurtful stereotype," the mimic says, offended. He refuses to teach you anything.',
                    outcomeEmoji: '😒'
                }
            }
        ]
    }
];