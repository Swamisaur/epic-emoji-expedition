/**
 * @file data/events/glacialPeak_1.ts
 * @description Contains the first batch of events specific to the Glacial Peak realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const glacialPeakEvents_1: GameEvent[] = [
    {
        id: 'glacial_peak_01',
        title: "An Echo in the Ice",
        description: "You find a cave of impossibly smooth, blue ice 🧊. Your voice carries with an unnatural resonance 🗣️. The cave seems to be listening, waiting to echo your deepest desire. ✨",
        emojis: ['🧊', '🗣️', '✨', '🤫'],
        eventType: 'realm_specific',
        realm: "Glacial Peak",
        options: [
            {
                text: 'Shout for POWER!',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Echo of Power", description: "+15% Attack Power for 3 minutes. 🔥", type: 'buff', modifiers: { percent: { attackPower: 0.15 } } }], duration_ms: 180000 },
                    resultText: "The cave roars 'POWER' back at you 💪, the force of it infusing you with chilling strength. 🔥",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Wish for FORTUNE!',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Echo of Fortune", description: "+20% Fortune for 3 minutes. 🍀", type: 'buff', modifiers: { percent: { luck: 0.20 } } }], duration_ms: 180000 },
                    resultText: "A jingle of countless coins echoes back 💰. You feel the world bend to your luck. 🍀",
                    outcomeEmoji: '🍀'
                }
            },
            {
                text: 'Whisper a secret.',
                emoji: '🤫',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Echo of Focus", description: "+15% Crit Chance for 3 minutes. 🎯", type: 'buff', modifiers: { percent: { critChance: 0.15 } } }], duration_ms: 180000 },
                    resultText: "Your secret returns as a whisper of insight 🤫, showing you the fatal flaws in everything. 🎯",
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: 'Stay silent.',
                emoji: '🤐',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You listen to the silence 🤐. The cave offers nothing, but asks for nothing in return. 😌",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'glacial_peak_02',
        title: "The Frozen Mammoth",
        description: "You come across a breathtaking sight: a colossal mammoth 🐘, perfectly preserved in a wall of glacial ice 🧊. Its tusks are enormous. ✨",
        emojis: ['🐘', '🧊', '🦴', '✨'],
        eventType: 'realm_specific',
        realm: "Glacial Peak",
        options: [
            {
                text: 'Harvest the Ivory Tusks.',
                emoji: '🦷',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r10', rarity: 'legendary' }, // Infinity Stone
                    resultText: "It takes all your strength, but you pry a tusk free 🦷. It is an artifact of immense, primal power. 🤩",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Take a patch of fur.',
                emoji: '✂️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 't7', rarity: 'rare' }, // Scarf of Warmth
                    resultText: "You cut away a patch of the thick fur ✂️. It will make a wonderfully warm and resilient garment. 🧣",
                    outcomeEmoji: '🧣'
                }
            },
            {
                text: 'Try to thaw it out.',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "Your fire melts the surface 🔥, causing a massive crack. The whole glacier shifts, forcing you to retreat. 😫",
                    outcomeEmoji: '😫'
                }
            },
            {
                text: 'Pay respects to the ancient beast.',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Ancient Vigor", description: "Permanently gain +5% Max Health. ❤️", type: 'buff', modifiers: { percent: { maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You honor the magnificent creature 🙏. Its ancient spirit grants you a sliver of its endless endurance. ❤️",
                    outcomeEmoji: '❤️'
                }
            }
        ]
    },
    {
        id: 'glacial_peak_03',
        title: 'Avalanche!',
        description: "A deep rumble echoes from the peak above 🏔️. The snow beneath your feet begins to shift and slide. An avalanche is coming! ❄️",
        emojis: ['🏔️', '❄️', '🏃', '💥'],
        eventType: 'realm_specific',
        realm: "Glacial Peak",
        options: [
            {
                text: 'Try to outrun it!',
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Adrenaline Rush", description: "+20% Attack Speed for 2 minutes. ⚡️", type: 'buff', modifiers: { percent: { attackSpeed: 0.20 } } }], duration_ms: 120000 },
                    resultText: "You run for your life! 🏃 The adrenaline surge from the near-death experience makes you incredibly fast. ⚡️",
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Find cover in an ice cave.',
                emoji: '🧊',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: "You duck into a cave just as the snow roars past 🧊. In the back, you find the frozen remains of a less fortunate adventurer... and their gold. 💰",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Use your shield to surf it.',
                emoji: '🏄',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "A stroke of genius! You ride the wave of snow and ice 🏄, landing far down the mountain path, well ahead of schedule. 😎",
                    outcomeEmoji: '😎'
                }
            },
            {
                text: 'Brace for impact.',
                emoji: '🥶',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "The snow buries you 🥶. You dig yourself out, but you are disoriented and have been pushed back. 😵",
                    outcomeEmoji: '😵'
                }
            }
        ]
    },
    {
        id: 'glacial_peak_04',
        title: "The Northern Lights",
        description: "The night sky erupts in a silent, dancing curtain of green and violet light 🌌. The beauty of the aurora is breathtaking and deeply magical. ✨",
        emojis: ['🌌', '✨', '💚', '💜'],
        eventType: 'realm_specific',
        realm: "Glacial Peak",
        options: [
            {
                text: 'Meditate beneath the lights.',
                emoji: '🧘',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Aurora's Insight", description: "Permanently gain +2% Crit Chance. 🎯", type: 'buff', modifiers: { percent: { critChance: 0.02 } } }], duration_ms: Infinity },
                    resultText: "You meditate on the cosmic dance 🧘. A flash of insight grants you a permanent, deeper understanding of your own capabilities. 🎯",
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: 'Follow the green ribbon.',
                emoji: '💚',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r9', rarity: 'rare' }, // Heart Amulet
                    resultText: "You follow the light to a hidden shrine 💚 where a beautiful, heart-shaped amulet rests on a pedestal of ice. ❤️",
                    outcomeEmoji: '❤️'
                }
            },
            {
                text: 'Follow the violet ribbon.',
                emoji: '💜',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'm4', rarity: 'rare' }, // Magic Wand
                    resultText: "The light guides you to a frozen mage's staff 💜, which you snap down to a manageable wand size. 🪄",
                    outcomeEmoji: '🪄'
                }
            },
            {
                text: 'Simply enjoy the view.',
                emoji: '😌',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You take a moment to appreciate the profound beauty of the world 😌. The memory itself is a reward. 😊",
                    outcomeEmoji: '😊'
                }
            }
        ]
    },
    {
        id: 'glacial_peak_05',
        title: "The Ice Hermit's Stew",
        description: "You find a small igloo 🛖. A grizzled hermit invites you in, gesturing to three steaming pots. 'Hungry?' he grunts. 'Pick one.' 🤔",
        emojis: ['🥣', '🍲', '🥘', '❓'],
        eventType: 'realm_specific',
        realm: "Glacial Peak",
        options: [
            {
                text: 'Eat the red, hearty stew.',
                emoji: '🥘',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Hearty Stew", description: "+20% Max Health for 3 minutes. 💪", type: 'buff', modifiers: { percent: { maxHealth: 0.20 } } }], duration_ms: 180000 },
                    resultText: "It's a rich, meaty stew 🥘 that warms you to the core. You feel incredibly robust. 💪",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Eat the green, chunky stew.',
                emoji: '🍲',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "The chunks aren't vegetables... they're gold nuggets! 💰 The hermit cackles. 'Good for the digestion!' 😂",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Eat the grey, lumpy stew.',
                emoji: '🥣',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Lumpy Stew", description: "-10% Attack Speed for 2 minutes. 🤢", type: 'debuff', modifiers: { percent: { attackSpeed: -0.10 } } }], duration_ms: 120000 },
                    resultText: "It tastes like wet rocks 🥣. The heavy meal sits in your stomach, making you feel slow and sluggish. 🤢",
                    outcomeEmoji: '🤢'
                }
            },
            {
                text: 'Politely decline.',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You thank the hermit but decline 🙏. He just shrugs and continues stirring his pots. 👍",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];