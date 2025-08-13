/**
 * @file data/events/scorchedSands_4.ts
 * @description Contains the fourth batch of events specific to the Scorched Sands realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const scorchedSandsEvents_4: GameEvent[] = [
    {
        id: 'scorched_sands_13',
        title: "The Djinni's Lamp",
        description: "Among the dunes, you find a tarnished brass lamp 🏮. It feels warm. You have a very good/bad feeling about this. 🤔🧞",
        emojis: ['🧞', '🏮', '✨', '🤔'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Wish for UNTOLD POWER',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Djinni's Power", description: "+25% Attack Power, but -10% Max Health, for 3 minutes.", type: 'buff', modifiers: { percent: { attackPower: 0.25, maxHealth: -0.10 } } }], duration_ms: 180000 },
                    resultText: "A Djinni appears! 🧞 'POWER YOU SHALL HAVE... AT A PRICE!' You feel stronger, but the magic taxes your body. 🔥💪",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Wish for FABULOUS WEALTH',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 777 },
                    resultText: "The Djinni snaps its fingers 🫰, and a massive pile of gold appears. 'Your greed is... impressive,' it says before vanishing. 🤑💰",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Wish for INFINITE WISDOM',
                emoji: '🧠',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -2 },
                    resultText: "The Djinni sighs 😮‍💨. 'You know what's wise? NOT being here.' It teleports you far back to a safer location. 😵‍💫",
                    outcomeEmoji: '😵'
                }
            },
            {
                text: 'Wish for a sandwich',
                emoji: '🥪',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: "The Djinni looks baffled 🤨. '...Okay.' It summons a perfect sandwich, which heals you completely. 'Weirdo,' it mutters, disappearing. 😋❤️‍🩹",
                    outcomeEmoji: '😋'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_14',
        title: "Sunstone Altar",
        description: "You find a flat, obsidian altar that is scorching hot from the sun ☀️. Faint engravings on it seem to pulse with heat. 🔥🥵",
        emojis: ['☀️', '🔥', '🥵'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Offer some gold',
                emoji: '🪙',
                cost: 50,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Sun's Fury", description: "+20% Attack Power for 2 minutes.", type: 'buff', modifiers: { percent: { attackPower: 0.20 } } }], duration_ms: 120000 },
                    resultText: "The gold melts instantly 🪙. The altar flares with light, infusing you with the sun's burning power. 🔥💪",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Offer some water',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.33 },
                    resultText: "The water sizzles into steam 💧. The altar seems to sigh in relief, granting you a powerful healing blessing. ❤️‍🩹😌",
                    outcomeEmoji: '❤️‍🩹'
                }
            },
            {
                text: 'Touch the altar',
                emoji: '✋',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.15 },
                    resultText: "YEOUCH! ✋ You burn your hand, taking damage equal to 15% of your max health. 🤕🔥",
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Use it to cook some food',
                emoji: '🍳',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You cook a lovely meal on the superheated rock 🍳. It doesn't give you any powers, but it's delicious. 😋👍",
                    outcomeEmoji: '😋'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_15',
        title: "The Salty Caravan",
        description: "A merchant from a salt caravan 🐪 offers you a taste of two different salts from their collection. 🧂🤔",
        emojis: ['🧂', '🐪', '✨', '🤢'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Taste the sparkling white salt',
                emoji: '✨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Preserving Salt", description: "You feel resilient. +15% Max Health for 3 minutes.", type: 'buff', modifiers: { percent: { maxHealth: 0.15 } } }], duration_ms: 180000 },
                    resultText: "The salt is pure and invigorating ✨. You feel your body strengthened and preserved against the harshness of the world. 💪🛡️",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Taste the dull grey salt',
                emoji: '🤢',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Cursed Salt", description: "The salt was cursed! -10% Fortune for 3 minutes.", type: 'debuff', modifiers: { percent: { luck: -0.10 } } }], duration_ms: 180000 },
                    resultText: "The salt is bitter and foul 🤢. You feel a wave of bad luck wash over you. 😖📉",
                    outcomeEmoji: '😖'
                }
            },
            {
                text: 'Buy a whole bag (100 gold)',
                emoji: '💰',
                cost: 100,
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: "You buy a bag of the white salt 🛍️. Later, you find a buyer who pays a premium for it. A tidy profit! 🤑🤝",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Decline the offer',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You're not thirsty enough to eat salt 🥵. You politely decline. 👍🚶",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];