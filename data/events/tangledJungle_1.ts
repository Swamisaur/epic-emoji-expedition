/**
 * @file data/events/tangledJungle.ts
 * @description Contains the first batch of events specific to the Tangled Jungle realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const tangledJungleEvents_1: GameEvent[] = [
    {
        id: 'tangled_jungle_01',
        title: "The Whispering Orchid",
        description: "You find a luminous, beautiful orchid 🌸 pulsating with a soft light ✨. It seems to whisper promises of untold power on the humid air. 🍃",
        emojis: ['🌸', '✨', '🍃', '👃'],
        eventType: 'realm_specific',
        realm: "Tangled Jungle",
        options: [
            {
                text: 'Inhale its pollen.',
                emoji: '👃',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Orchid Haze", description: "+50% Attack Speed but -15% Attack Power for 60s.", type: 'buff', modifiers: { percent: { attackSpeed: 0.50, attackPower: -0.15 } } }], duration_ms: 60000 },
                    resultText: "You inhale a cloud of glowing pollen 👃. You feel incredibly fast, but your movements become frantic and less precise. 😵‍💫",
                    outcomeEmoji: '😵‍💫'
                }
            },
            {
                text: 'Pick the flower.',
                emoji: '✋',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r7', rarity: 'rare' }, // Magnifying Glass
                    resultText: "You carefully pick the orchid ✋. It transforms in your hand into a lens that reveals hidden weaknesses. 🔎",
                    outcomeEmoji: '🔎'
                }
            },
            {
                text: 'Destroy the tempting plant.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You crush the flower underfoot 💥. The jungle falls silent for a moment, as if judging you, before the noise returns. 😒",
                    outcomeEmoji: '😒'
                }
            },
            {
                text: 'Water it from your canteen.',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Nature's Gratitude", description: "Permanently gain +25 Max Health.", type: 'buff', modifiers: { flat: { maxHealth: 25 } } }], duration_ms: Infinity },
                    resultText: "The orchid glows brightly in thanks 💧, sharing a bit of its vibrant life force with you. ❤️",
                    outcomeEmoji: '❤️'
                }
            }
        ]
    },
    {
        id: 'tangled_jungle_02',
        title: 'Monkey Business',
        description: 'A troop of monkeys 🐒 chatters down from the canopy, offering you a trade. They hold out a rusty key 🔑, a strange idol 🗿, and a half-eaten banana 🍌.',
        emojis: ['🐒', '🍌', '🔑', '🗿'],
        eventType: 'realm_specific',
        realm: "Tangled Jungle",
        options: [
            {
                text: 'Trade 50 gold for the key.',
                emoji: '🔑',
                cost: 50,
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r6', rarity: 'common' }, // Golden Key
                    resultText: "You toss up the coins. A monkey deftly catches them and drops a key into your hand.",
                    outcomeEmoji: '🤝'
                }
            },
            {
                text: 'Trade 50 gold for the idol.',
                emoji: '🗿',
                cost: 50,
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o9', rarity: 'common' }, // Monkey's Paw
                    resultText: "You make the trade. The monkeys seem pleased. The idol feels... unlucky. Or is it lucky?",
                    outcomeEmoji: '🤔'
                }
            },
            {
                text: 'Trade 50 gold for the banana.',
                emoji: '🍌',
                cost: 50,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Potassium Power", description: "+10% Max Health for 90s.", type: 'buff', modifiers: { percent: { maxHealth: 0.10 } } }], duration_ms: 90000 },
                    resultText: "You trade for the banana and eat it. It's surprisingly nourishing!",
                    outcomeEmoji: '😋'
                }
            },
            {
                text: 'Try to scare them away.',
                emoji: '👻',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: -50 },
                    resultText: "They are not scared. They are angry. They steal 50 gold from your pouch and vanish into the leaves.",
                    outcomeEmoji: '😠'
                }
            }
        ]
    },
    {
        id: 'tangled_jungle_03_guide',
        title: "The Jungle Guide",
        description: "A wiry local emerges from the undergrowth. 'This jungle is a maze,' she says, 'For 100 gold, I can show you the way to a place of power.'",
        emojis: ['🧭', '🗺️', '🤝', '💰'],
        eventType: 'realm_specific',
        realm: "Tangled Jungle",
        options: [
            {
                text: 'Hire her for 100 gold.',
                emoji: '🤝',
                cost: 100,
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'jungle_guide_hired' },
                    resultText: "'A wise choice. Follow me, but stay close.' You pay the fee and follow her down a hidden path.",
                    outcomeEmoji: '👍'
                }
            },
            {
                text: '"I make my own path."',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "You scoff and push past her, only to get hopelessly lost in a tangle of vines for hours.",
                    outcomeEmoji: '😫'
                }
            },
            {
                text: 'Try to haggle.',
                emoji: '🤨',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "'My price is my price.' She melts back into the jungle, offended by your offer.",
                    outcomeEmoji: '😒'
                }
            },
            {
                text: 'Ask for a reference.',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "She points to a jaguar lounging on a branch above. The jaguar yawns. You decide not to press the issue and move on.",
                    outcomeEmoji: '😬'
                }

            }
        ]
    },
    {
        id: 'tangled_jungle_04_temple',
        title: "The Sunstone Temple",
        description: "Your guide leads you to a vine-choked ziggurat. 'This is it,' she whispers. 'The Sunstone Temple. Choose your blessing.' Three altars glow before you.",
        emojis: ['🏛️', '☀️', '💪', '💎'],
        eventType: 'realm_specific',
        realm: "Tangled Jungle",
        requiredFlag: 'jungle_guide_hired',
        options: [
            {
                text: 'Pray at the Altar of Strength.',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Sunstone Might", description: "Permanently gain +5% Attack Power.", type: 'buff', modifiers: { percent: { attackPower: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You touch the altar. The power of the jungle sun flows into you, granting you lasting strength.",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Pray at the Altar of Endurance.',
                emoji: '🛡️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Sunstone Vigor", description: "Permanently gain +5% Max Health.", type: 'buff', modifiers: { percent: { maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You touch the altar. The resilience of ancient trees fills you, granting you lasting vitality.",
                    outcomeEmoji: '❤️'
                }
            },
            {
                text: 'Pray at the Altar of Fortune.',
                emoji: '💎',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Sunstone Luck", description: "Permanently gain +5% Fortune.", type: 'buff', modifiers: { percent: { luck: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You touch the altar. The light of a thousand treasures glints in your eyes, granting you lasting fortune.",
                    outcomeEmoji: '🍀'
                }
            },
            {
                text: 'Loot the whole temple.',
                emoji: '🤑',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 500 },
                    resultText: "You ignore the altars and stuff your pockets with golden artifacts. The temple groans in protest, but gold is gold.",
                    outcomeEmoji: '💰'
                }
            }
        ]
    },
    {
        id: 'tangled_jungle_05',
        title: "Piranha River",
        description: "A wide, churning river full of hungry piranhas blocks your way. The water froths menacingly.",
        emojis: ['🐟', '🌊', '😱', '🌉'],
        eventType: 'realm_specific',
        realm: "Tangled Jungle",
        options: [
            {
                text: 'Swing across on a vine.',
                emoji: '🌿',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "You grab a sturdy vine and swing across with a heroic yell! A perfect landing!",
                    outcomeEmoji: '😎'
                }
            },
            {
                text: 'Swim for it.',
                emoji: '🏊',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Piranha Bites", description: "You've been nibbled! -10% Max Health for 2 minutes.", type: 'debuff', modifiers: { percent: { maxHealth: -0.10 } } }], duration_ms: 120000 },
                    resultText: "You make it, but not without a few painful nips from the piranhas.",
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Find a fallen log bridge.',
                emoji: '🌉',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You spend some time searching upstream and find a safe, but slow, way to cross.",
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Throw in some jerky as a distraction.',
                emoji: '🍖',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 100 },
                    resultText: "The piranhas go into a frenzy over the jerky. As they fight over it, one of them spits out a golden amulet it must have swallowed.",
                    outcomeEmoji: '🪙'
                }
            }
        ]
    }
];