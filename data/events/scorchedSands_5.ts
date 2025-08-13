/**
 * @file data/events/scorchedSands_5.ts
 * @description Contains the fifth batch of events specific to the Scorched Sands realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const scorchedSandsEvents_5: GameEvent[] = [
    {
        id: 'scorched_sands_16_djinn',
        title: 'The Thirsty Djinni',
        description: "A lazy djinni 🧞‍♂️ lounges on a silken pillow by a completely dry oasis. 'So... thirsty...' he groans. 'A wish for a drink?'",
        emojis: ['🧞‍♂️', '💧', '🥵', '🙏'],
        eventType: 'realm_specific',
        realm: 'Scorched Sands',
        options: [
            {
                text: 'Share your waterskin. (Requires Health focus)',
                emoji: '💧',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: "The djinni drains your waterskin. 'Ah, much better! As thanks, be restored!' He snaps his fingers, and you are healed to full health.",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Bribe him to make it rain. (Requires Luck focus)',
                emoji: '💰',
                cost: 150,
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Rain Check', description: 'The djinni owes you one. Greatly increased luck for your next treasure find.', type: 'buff', modifiers: { percent: { luck: 0.50 } } }], duration_ms: 300000 },
                    resultText: "'Making it rain... with coins! I like your style!' The djinni promises your next treasure find will be a big one.",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Persuade him it IS raining. (Female character)',
                emoji: '🗣️',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Clever Girl', description: 'Your wit is rewarded. +15% Attack Speed for 2 minutes.', type: 'buff', modifiers: { percent: { attackSpeed: 0.15 } } }], duration_ms: 120000 },
                    resultText: "You convince him he's just not feeling the rain. 'Oh! You are right! How refreshing!' He rewards your cleverness with a boon of speed.",
                    outcomeEmoji: '💨'
                }
            },
            {
                text: 'Persuade him it IS raining. (Male character)',
                emoji: '🗣️',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Sand in Your Eye', description: 'He is not convinced. -15% Accuracy for 2 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.15 } } }], duration_ms: 120000 },
                    resultText: "'Do I look like an idiot?' he bellows, flicking a handful of sand directly into your eyes. It stings.",
                    outcomeEmoji: '😠'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_17_pyramid',
        title: 'The Sunken Pyramid',
        description: 'Only the very top of a great pyramid 🔺 juts from the endless sand. A heavy stone door, sealed for millennia, is visible.',
        emojis: ['🔺', '🏛️', '💪', '💨'],
        eventType: 'realm_specific',
        realm: 'Scorched Sands',
        options: [
            {
                text: 'Force the door open. (Requires Power focus)',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'h3', rarity: 'legendary' }, // Crown of Greed
                    resultText: "With a tremendous effort, you shove the stone door aside, revealing the tomb of a forgotten king and his legendary crown!",
                    outcomeEmoji: '👑'
                }
            },
            {
                text: 'Scale the side to scout. (Requires Speed focus)',
                emoji: '💨',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "You quickly climb the pyramid's face, spotting a clear path forward that bypasses several dangers.",
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Kick it.',
                emoji: '🦶',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Stubbed Toe', description: 'Ouch! -10% Accuracy for 90s.', type: 'debuff', modifiers: { percent: { accuracy: -0.10 } } }], duration_ms: 90000 },
                    resultText: "You kick the ancient stone. It does not move. Your toe, however, is now throbbing, making you walk funny.",
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Search the area.',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "You find the remains of a less-successful tomb raider, along with the gold they dropped.",
                    outcomeEmoji: '💰'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_18_scorpion_game',
        title: "The Scorpion's Shell Game",
        description: "A giant scorpion 🦂 clicks its pincers and arranges three sun-bleached skulls 💀. It hides a lucky locust under one and shuffles them with blinding speed.",
        emojis: ['🦂', '💀', '🦗', '🍀'],
        eventType: 'realm_specific',
        realm: 'Scorched Sands',
        options: [
            {
                text: 'Follow the locust. (Requires Luck focus)',
                emoji: '🍀',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 777 },
                    resultText: "Your eyes are sharp! You easily follow the shuffling skulls and point to the correct one. The scorpion clicks approvingly and reveals a massive pile of gold.",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Compliment its beautiful carapace. (Female character)',
                emoji: '🥰',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: "The scorpion seems to puff up with pride. It stops the game and nudges a small pile of coins toward you as thanks.",
                    outcomeEmoji: '😊'
                }
            },
            {
                text: 'Compliment its beautiful carapace. (Male character)',
                emoji: '🥰',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.05 },
                    resultText: "The scorpion takes your compliment as a sign of weakness and gives you a painful pinch, dealing 5% of your max health in damage.",
                    outcomeEmoji: '🤏'
                }
            },
            {
                text: 'Walk away.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You are not playing games with a giant, intelligent scorpion. You leave.",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_19_oasis_illusion',
        title: 'Oasis of Illusions',
        description: 'A perfect, beautiful oasis 🌴 shimmers before you. It could be life-saving water, or a deadly mirage. 💧🤔',
        emojis: ['🌴', '💧', '🤔', '🎨'],
        eventType: 'realm_specific',
        realm: 'Scorched Sands',
        options: [
            {
                text: 'Risk it and drink deeply.',
                emoji: '💧',
                randomConsequences: [
                    {
                        weight: 50,
                        consequence: {
                            type: EventConsequenceType.HEAL,
                            payload: { healType: 'full', amount: 1 },
                            resultText: "It's real! The cool, clear water restores you completely.",
                            outcomeEmoji: '🤩'
                        }
                    },
                    {
                        weight: 50,
                        consequence: {
                            type: EventConsequenceType.HEAL,
                            payload: { healType: 'percent_max', amount: -0.20 },
                            resultText: "A mirage! You get a mouthful of sand and the exertion damages you for 20% of your max health.",
                            outcomeEmoji: '😫'
                        }
                    }
                ]
            },
            {
                text: 'Wash your face.',
                emoji: '🎨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'A New Hue', description: 'The water was magical! Your skin tone has changed for the rest of this life!', type: 'buff', modifiers: {} }], duration_ms: Infinity },
                    resultText: "You splash the water on your face. It's not a mirage, but it IS magical! Your skin tone has been permanently altered for this run!",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Rest in the shade.',
                emoji: '😴',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_missing', amount: 0.25 },
                    resultText: "Whether the oasis is real or not, the shade is. You rest for a moment, healing 25% of your missing health.",
                    outcomeEmoji: '😌'
                }
            },
            {
                text: "Don't trust it.",
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You know better than to trust your eyes in the desert. You press on.",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];