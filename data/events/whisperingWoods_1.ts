/**
 * @file data/events/whisperingWoods_1.ts
 * @description Contains the first batch of events specific to the Whispering Woods realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const whisperingWoodsEvents_1: GameEvent[] = [
    {
        id: 'whispering_woods_01',
        title: "The Elderwood's Counsel",
        description: "An ancient, moss-covered tree 🌳 seems to whisper to you on the wind 🌬️. Its leaves rustle with arcane energy. ✨",
        emojis: ['🌳', '🍃', '🗣️', '✨'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Listen to its wisdom',
                emoji: '👂',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Arboreal Fortune", description: "+15% Fortune for 90s", type: 'buff', modifiers: { percent: { luck: 0.15 } } }], duration_ms: 90000 },
                    resultText: 'The leaves 🍃 impart secrets of fortune upon you. You feel luckier. 🍀',
                    outcomeEmoji: '🍀'
                }
            },
            {
                text: 'Eat one of its fruits',
                emoji: '🍎',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Zesty Fruit", description: "+10% Attack Speed for 60s", type: 'buff', modifiers: { percent: { attackSpeed: 0.1 } } }], duration_ms: 60000 },
                    resultText: 'The fruit 🍎 is surprisingly zesty! You feel quick and nimble. ⚡️',
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Take a branch as a souvenir',
                emoji: '🌿',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o1', rarity: 'common' }, // Wooden Shield
                    resultText: "You snap off a sturdy branch 🌿. It might make a decent shield. 🛡️",
                    outcomeEmoji: '🛡️'
                }
            },
            {
                text: 'Carve your initials into it',
                emoji: '🔪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Nature's Scorn", description: "-10% Fortune for 60s", type: 'debuff', modifiers: { percent: { luck: -0.1 } } }], duration_ms: 60000 },
                    resultText: "The tree groans in pain 🌳💔, and a dark aura of misfortune washes over you 🌊. That was rude. 😠",
                    outcomeEmoji: '😠'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_02',
        title: "Goblin Tollbooth",
        description: "A particularly grime-covered goblin 🧌 blocks the path with a makeshift tollbooth. 'Gold to pass!' he squeaks. 💰",
        emojis: ['🧌', '💰', '⚔️', '🚧'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Pay the 50 gold toll',
                emoji: '🪙',
                cost: 50,
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You toss him the coins 🪙. He counts them greedily and lets you pass. 👍",
                    outcomeEmoji: '👍'
                }
            },
            {
                text: 'Shove him aside',
                emoji: '✋',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "You shove the goblin aside 👋 and hurry onward, leaving him squealing in the dust. 💨",
                    outcomeEmoji: '💨'
                }
            },
            {
                text: "'Look, a dragon!'",
                emoji: '🐉',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "The goblin looks. There's no dragon 🐉. He turns back and glares at you, unimpressed. You walk past during the awkward silence. 😒",
                    outcomeEmoji: '😒'
                }
            },
            {
                text: 'Offer him a shiny rock',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 10 },
                    resultText: "The goblin is fascinated by your worthless rock 🪨, trading you a few coins he had for it. Goblins are dumb. 😂",
                    outcomeEmoji: '😂'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_03',
        title: "The Lost Fawn",
        description: "A small, trembling fawn 🦌 looks at you with wide, tearful eyes. It seems to have lost its mother. 😢",
        emojis: ['🦌', '😢', '🌳', '❤️'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Gently guide it back',
                emoji: '❤️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'fawn_helped' },
                    resultText: "You lead the fawn back to a clearing where its mother waits. She dips her head in gratitude before they vanish into the trees. 🙏",
                    outcomeEmoji: '🙏'
                }
            },
            {
                text: "It's the circle of life",
                emoji: '🤷',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You steel your heart and continue on. The forest is a harsh place. 😔",
                    outcomeEmoji: '😔'
                }
            },
            {
                text: 'Scare it away for fun',
                emoji: '👻',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Pang of Guilt", description: "-5% Attack Power for 90s", type: 'debuff', modifiers: { percent: { attackPower: -0.05 } } }], duration_ms: 90000 },
                    resultText: "You shout and wave your arms 👋. The fawn scrambles away in terror 😨. You feel a pang of guilt that weakens your resolve. 😞",
                    outcomeEmoji: '😞'
                }
            },
            {
                text: 'Use it as bait',
                emoji: '🍖',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "You herd the fawn into a clearing, attracting a large predator 🐺. While it's distracted, you sneak past, advancing much farther than you would have otherwise. 😈",
                    outcomeEmoji: '😈'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_04_stag',
        title: "The Forest Guardian",
        description: "A magnificent stag 🦌 with antlers like polished silver ✨ steps into your path. It recognizes you as the one who helped its child. 🙏",
        emojis: ['🦌', '✨', '👑', '🙏'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        requiredFlag: 'fawn_helped',
        options: [
            {
                text: 'Accept its blessing',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Guardian's Vigor", description: "+5% Max Health permanently.", type: 'buff', modifiers: { percent: { maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "The stag touches its antler to your forehead. A feeling of vitality flows through you, making you permanently healthier. ❤️‍🔥",
                    outcomeEmoji: '❤️‍🔥'
                }
            },
            {
                text: 'Ask for riches instead',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: "The stag seems disappointed 😔, but paws at the ground, unearthing a stash of forgotten gold for you. 🤑",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Ask for a weapon',
                emoji: '🏹',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o2', rarity: 'rare' }, // Elvan Bow
                    resultText: "The stag dips its head, and a beautifully crafted bow appears at your feet, a gift from the forest itself. 🤩",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: '"No reward necessary."',
                emoji: '😇',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You humbly decline. The stag seems to respect your decision and vanishes, leaving you with a sense of peace. 😌",
                    outcomeEmoji: '😌'
                }
            }
        ]
    }
];