/**
 * @file data/events/whisperingWoods_2.ts
 * @description Contains the second batch of events specific to the Whispering Woods realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const whisperingWoodsEvents_2: GameEvent[] = [
    {
        id: 'whispering_woods_05',
        title: "The Faerie Ring",
        description: "You find a perfect circle of vibrant, otherworldly mushrooms 🍄. Faint music seems to drift from its center. 🎶",
        emojis: ['🍄', '🧚', '🎶', '💫'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Step into the circle',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "You step in and are instantly disoriented, finding yourself a short distance behind where you were. The fae are tricky. 😵‍💫",
                    outcomeEmoji: '😵‍💫'
                }
            },
            {
                text: 'Eat a mushroom',
                emoji: '😋',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Faerie Food", description: "+20% Crit Damage for 120s", type: 'buff', modifiers: { percent: { critDamage: 0.20 } } }], duration_ms: 120000 },
                    resultText: "The mushroom tastes like starlight ✨ and sharpens your senses. You feel you can strike with pinpoint accuracy. 💥",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Stomp on the mushrooms',
                emoji: '👞',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Fae Curse", description: "-10% Attack Speed for 90s", type: 'debuff', modifiers: { percent: { attackSpeed: -0.10 } } }], duration_ms: 90000 },
                    resultText: "Angry buzzing fills the air as you crush the ring 😠. You feel sluggish, as if invisible hands are holding you back. 😫",
                    outcomeEmoji: '😠'
                }
            },
            {
                text: 'Leave a shiny coin as an offering',
                emoji: '🪙',
                cost: 1,
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 100 },
                    resultText: "You place a coin in the center 🪙. It vanishes, and a small pouch of gold appears in its place. The fae appreciate the gesture. ✨",
                    outcomeEmoji: '✨'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_06',
        title: "The Alchemist's Satchel",
        description: "You find a leather satchel 🎒 abandoned on the path. Inside are several corked vials of swirling liquids. 🧪",
        emojis: ['🧪', '🎒', '🔴', '🔵'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Drink the Red Vial (Strength)',
                emoji: '🔴',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Potion of Strength", description: "+15% Attack Power for 180s", type: 'buff', modifiers: { percent: { attackPower: 0.15 } } }], duration_ms: 180000 },
                    resultText: "You down the red liquid 🔴. It tastes of cinnamon and raw power. You feel much stronger! 🔥",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Drink the Blue Vial (Toughness)',
                emoji: '🔵',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Potion of Toughness", description: "+20% Max Health for 180s", type: 'buff', modifiers: { percent: { maxHealth: 0.20 } } }], duration_ms: 180000 },
                    resultText: "The blue potion 🔵 is cool and soothing. Your skin feels tough as bark. 🛡️",
                    outcomeEmoji: '🛡️'
                }
            },
            {
                text: 'Drink the Yellow Vial (Fortune)',
                emoji: '🟡',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Potion of Fortune", description: "+25% Fortune for 180s", type: 'buff', modifiers: { percent: { luck: 0.25 } } }], duration_ms: 180000 },
                    resultText: "The yellow potion 🟡 sparkles on your tongue. The world seems brighter, full of opportunity. 🍀",
                    outcomeEmoji: '🍀'
                }
            },
            {
                text: 'Leave the satchel',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You decide against drinking mysterious liquids found in the woods. A wise choice. 👍",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_07',
        title: "Grumpy Beekeeper",
        description: "A portly man in a strange netted hat 👨‍🌾 swats at you. 'You're scaring my bees! 🐝 Go on, shoo!' 😠",
        emojis: ['🐝', '👨‍🌾', '🍯', '😠'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Apologize and offer 25 gold',
                emoji: '🙏',
                cost: 25,
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "He grumbles, takes your money 💰, and shoos you away. At least he's not angry anymore. 😒",
                    outcomeEmoji: '😒'
                }
            },
            {
                text: 'Steal a honeycomb',
                emoji: '🍯',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Rich Honey", description: "+100 Max Health for 120s.", type: 'buff', modifiers: { flat: { maxHealth: 100 } } }], duration_ms: 120000 },
                    resultText: "You snatch a honeycomb 🍯. The rich honey invigorates you, making you feel hale and hearty. 😋",
                    outcomeEmoji: '😋'
                }
            },
            {
                text: 'Challenge him',
                emoji: '⚔️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "He brandishes his bee smoker at you 🔥. You decide it's not worth the trouble and back away. 😅",
                    outcomeEmoji: '😅'
                }
            },
            {
                text: 'Talk to the bees',
                emoji: '🗣️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'bee_whisperer' },
                    resultText: "You ignore the man and buzz gently at the bees 🐝. They seem to calm down, dancing in the air around you. The beekeeper is stunned. 🤯",
                    outcomeEmoji: '🤯'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_08_swarm',
        title: "A Swarm's Gratitude",
        description: "As you battle a fearsome monster 👹, a swarm of bees 🐝 descends! They recognize you as the one who calmed them. 🙏",
        emojis: ['🐝', '⚔️', '✨', '🎯'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        requiredFlag: 'bee_whisperer',
        options: [
            {
                text: 'Accept their help (Attack)',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Swarm's Fury", description: "+20% Attack Power for 120s", type: 'buff', modifiers: { percent: { attackPower: 0.20 } } }], duration_ms: 120000 },
                    resultText: "The bees swarm your foe, stinging and distracting them 🐝. Their buzzing fills you with a strange battle fury. 💪",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Accept their help (Defense)',
                emoji: '🛡️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Confusing Cloud", description: "+20% Crit Chance for 120s", type: 'buff', modifiers: { percent: { critChance: 0.20 } } }], duration_ms: 120000 },
                    resultText: "The bees form a confusing cloud around your enemy, creating openings for your attacks 🎯. You find it easier to strike vital points. 💥",
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: 'Accept their help (Fortune)',
                emoji: '🍀',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Golden Trail", description: "+20% Fortune for 120s", type: 'buff', modifiers: { percent: { luck: 0.20 } } }], duration_ms: 120000 },
                    resultText: "The bees buzz around you in a lucky pattern, revealing unseen opportunities and faint glimmers of gold on your foe. ✨",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: '"Thanks, but I got this."',
                emoji: '😎',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You wave the bees off 👋, confident in your own abilities. They buzz away, a bit disappointed. 👍",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];