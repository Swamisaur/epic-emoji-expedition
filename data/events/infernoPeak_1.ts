/**
 * @file data/events/infernoPeak_1.ts
 * @description Contains the first batch of events specific to the Inferno Peak realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const infernoPeakEvents_1: GameEvent[] = [
    {
        id: 'inferno_peak_01',
        title: "The Geyser of Doubt",
        description: "A powerful geyser of superheated steam 🌋 erupts from the ground, blocking your path. The air shimmers with heat. 🥵💨",
        emojis: ['🌋', '💨', '🥵', '❓'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Try to time it and jump over',
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "Incredible agility! 🏃 You leap over the geyser at the perfect moment, landing far ahead. 🤩💨",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Go the long way around',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "You take the safe route 🚶, but the winding path costs you precious time. 😩🕰️",
                    outcomeEmoji: '😩'
                }
            },
            {
                text: 'Throw a rock in',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: "The rock is launched high into the air 🚀, dislodging a cluster of cooled magma-gems that fall at your feet. 💎💰",
                    outcomeEmoji: '💎'
                }
            },
            {
                text: 'Bask in the steam',
                emoji: '🧖',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Heated Vigor", description: "+10% Max Health for 90s", type: 'buff', modifiers: { percent: { maxHealth: 0.10 } } }], duration_ms: 90000 },
                    resultText: "The intense heat is invigorating, like a volcanic sauna 🧖. You feel tougher. 💪😌",
                    outcomeEmoji: '💪'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_02',
        title: "The Soot-Stained Idol",
        description: "You find a small idol in a niche, completely covered in black soot 🗿. It feels warm to the touch. 🔥🤔",
        emojis: ['🗿', '🔥', '🙏', '✨'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Clean the soot off',
                emoji: '✨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Idol's Blessing", description: "Permanently gain +10% Attack Power.", type: 'buff', modifiers: { percent: { attackPower: 0.10 } } }], duration_ms: Infinity },
                    resultText: "Under the soot is a smiling, fiery face ✨. It blesses you with a permanent surge of strength. 😇💪",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Pray to it as is',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Smoky Veil", description: "-10% Crit Chance for 120s", type: 'debuff', modifiers: { percent: { critChance: -0.10 } } }], duration_ms: 120000 },
                    resultText: "You pray, and a thick cloud of soot puffs out, getting in your eyes 🙏. It's hard to focus. 😖😵‍💫",
                    outcomeEmoji: '😖'
                }
            },
            {
                text: 'Take it with you',
                emoji: '🎒',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r2', rarity: 'rare' }, // Medal of Honor
                    resultText: "It might be valuable 🤔. You pocket the idol, which feels more like a heavy medal. 🎖️✨",
                    outcomeEmoji: '🎖️'
                }
            },
            {
                text: 'Smash it',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You smash the idol 💥. It crumbles to dust. Nothing happens, but it felt good. 😈🤷",
                    outcomeEmoji: '😈'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_03',
        title: "A Dragon's Snack",
        description: "You stumble upon a small, secluded hoard of treasure 💰. A massive dragon 🐉 is sleeping nearby, a thin trail of smoke curling from its nostril. 😴💨",
        emojis: ['🐉', '😴', '💰', '💎'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Snatch the biggest gem',
                emoji: '💎',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r3', rarity: 'legendary' }, // Gem of Power
                    resultText: "Heart pounding, you pluck a flawless, legendary gem from the pile and escape unnoticed. 🤩💎✨",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Grab a handful of coins',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 500 },
                    resultText: "You quickly scoop up a massive handful of gold and slip away into the shadows. 🤑💰🤫",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Try to ride the dragon',
                emoji: '🤠',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -2 },
                    resultText: "The dragon wakes up 😠, snorts, and flicks you away with its tail 🤠. You land hard, far behind where you started. 🤕",
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: "Don't wake the dragon",
                emoji: '🤫',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You are brave, not stupid 🧠. You back away slowly and quietly. 👍😌",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_04',
        title: "The Fire Imp's Game",
        description: "A tiny fire imp 😈 offers you a game. 'Pick a hand!' it squeaks, holding out two closed fists ✊. 'One has a prize, one has a burn!' 🔥",
        emojis: ['😈', '🔥', '🎁', '❓'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Pick the left hand',
                emoji: '👈',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "The imp opens its hand to reveal a pile of smoldering hot coins! 🔥 You scoop them up carefully. 💰",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Pick the right hand',
                emoji: '👉',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Impish Burn", description: "Your hands are singed! -5% Attack Power for 60s.", type: 'debuff', modifiers: { percent: { attackPower: -0.05 }} }], duration_ms: 60000 },
                    resultText: "The imp opens its hand and a tiny flame singes you 🔥. 'Heh heh,' it giggles before vanishing. 😈",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Tickle the imp',
                emoji: '😂',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "The imp erupts in giggles 😂, dropping both a coin and a flame. It vanishes in a puff of smoke before you can grab either. 😜💨",
                    outcomeEmoji: '😜'
                }
            },
            {
                text: 'Refuse to play',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You decline the game 🙅. The imp shrugs and disappears. 😌👍",
                    outcomeEmoji: '😌'
                }
            }
        ]
    }
];