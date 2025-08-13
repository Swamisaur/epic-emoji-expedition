/**
 * @file data/events/whisperingWoods_3.ts
 * @description Contains the third batch of events specific to the Whispering Woods realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const whisperingWoodsEvents_3: GameEvent[] = [
    {
        id: 'whispering_woods_09',
        title: "The Spider's Web",
        description: "A colossal spiderweb 🕸️ blocks the path, shimmering with dew. In the center is a cocooned bundle. 🎁",
        emojis: ['🕸️', '🕷️', '🎁', '🔥'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Cut the bundle down',
                emoji: '✂️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r10', rarity: 'legendary' }, // Infinity Stone
                    resultText: "You carefully cut the bundle free and unwrap it to find an item of incredible power! 🤩",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Burn the whole web',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "You set the web ablaze 🔥. The path is cleared, and you hurry through the smoke, making great time. 🚀",
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Try to sneak around',
                emoji: '🤫',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Sticky Webbing", description: "-10% Attack Speed for 90s", type: 'debuff', modifiers: { percent: { attackSpeed: -0.10 } } }], duration_ms: 90000 },
                    resultText: "You get tangled in sticky strands trying to go around 😫. You eventually break free, but you're covered in webbing and feel slow. 😥",
                    outcomeEmoji: '😫'
                }
            },
            {
                text: 'Throw a rock at it',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "The rock just sticks to the web 🪨. A giant spider 🕷️ peeks out from a high branch, then retreats. You decide to find another path. 😬",
                    outcomeEmoji: '😬'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_10',
        title: "The Moonlit Glade",
        description: "You enter a clearing where ethereal moonlight 🌕 pools on the ground, even though it's daytime. The air is calm and cool. ✨",
        emojis: ['🌕', '💧', '✨', '😴'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Bathe in the moonlight',
                emoji: '🧘',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Moon's Focus", description: "+15% Crit Chance & Damage for 120s", type: 'buff', modifiers: { percent: { critChance: 0.15, critDamage: 0.15 } } }], duration_ms: 120000 },
                    resultText: "The moonlight seeps into your skin, sharpening your senses and honing your killer instincts. 💥",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Drink from the pool of light',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: "You scoop up the light ✨, and it solidifies into cool, smooth coins in your hand. 🪙",
                    outcomeEmoji: '🪙'
                }
            },
            {
                text: 'Rest in the glade',
                emoji: '😴',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "You rest for a moment 😴, the unnatural peace restoring your stamina. You feel able to skip the next encounter. 😌",
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Fear the unnatural light',
                emoji: '😨',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "This light isn't natural 😨. You hurry out of the glade before something finds you. 🏃",
                    outcomeEmoji: '🏃'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_11',
        title: "Glimmering Moss",
        description: "You see two types of glowing moss on a cave wall. One glows with a healthy green light 🟢, the other with a sickly purple hue 🟣.",
        emojis: ['🌿', '🟢', '🟣', '✨'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Touch the green moss',
                emoji: '🟢',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.20 },
                    resultText: "A warm, healing energy flows into you, mending 20% of your max health. ❤️‍🩹",
                    outcomeEmoji: '❤️‍🩹'
                }
            },
            {
                text: 'Touch the purple moss',
                emoji: '🟣',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Leeching Moss", description: "You feel weak. -10% Max Health for 2 minutes.", type: 'debuff', modifiers: { percent: { maxHealth: -0.10 } } }], duration_ms: 120000 },
                    resultText: "A cold shock jolts you! The moss drains some of your vitality. 🤢",
                    outcomeEmoji: '🤢'
                }
            },
            {
                text: 'Scrape some of both for later',
                emoji: '🧪',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You scrape some moss into a pouch 🧪. The moment they're mixed, they neutralize each other into a useless grey sludge. 🤷",
                    outcomeEmoji: '🤷'
                }
            },
            {
                text: 'Leave the moss alone',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You're not touching strange glowing flora. You proceed with caution. 👍",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_12',
        title: "Dryad's Lament",
        description: "A beautiful tree spirit 🌳 weeps, her form flickering. 'My grove... it withers...' she cries. 'A sickness in the soil...' 💔",
        emojis: ['🌳', '😭', '💧', '💔'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Offer your waterskin',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Dryad's Blessing", description: "Permanently gain +5% Max Health.", type: 'buff', modifiers: { percent: { maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "Your water seems to revitalize the grove 💧. 'A kindness I shall not forget,' the dryad whispers, granting you a sliver of her resilience. 😇",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Offer some gold',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'b3', rarity: 'common' }, // Leaf Drawers
                    resultText: "The dryad looks at the gold 💰, confused. 'This is no use to me... but take this, perhaps it will serve you better.' She gives you a garment woven from living leaves. 🍃",
                    outcomeEmoji: '🍃'
                }
            },
            {
                text: 'Chop down her tree',
                emoji: '🪓',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Nature's Wrath", description: "-15% Attack Power for 3 minutes.", type: 'debuff', modifiers: { percent: { attackPower: -0.15 } } }], duration_ms: 180000 },
                    resultText: "A monstrous act! 😠 The dryad shrieks as you strike her tree, and the entire forest seems to turn against you, sapping your strength. 😖",
                    outcomeEmoji: '😠'
                }
            },
            {
                text: 'Offer a comforting word',
                emoji: '🗣️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Your words don't heal the grove, but the dryad seems to appreciate the gesture. She nods sadly and fades into the bark. 😔",
                    outcomeEmoji: '😔'
                }
            }
        ]
    }
];