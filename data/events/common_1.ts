/**
 * @file data/events/common_1.ts
 * @description Contains the first batch of common events that can appear in any realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const commonEvents_1: GameEvent[] = [
    {
        id: 'common_01',
        title: 'A Philosophical Slime 🦠🤔❓',
        description: 'A contemplative slime 🦠 blocks your path 🚧. It gurgles, "If a hero defeats a monster 👹 and no one is around to see it, are they truly a hero?" 🤔',
        emojis: ['🤔', '🦠', '❓', '✨'],
        eventType: 'common',
        options: [
            {
                text: 'Action defines heroism, not audience.',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Righteous", 
                            description: "+10% Attack for 60s", 
                            type: 'buff', 
                            modifiers: { percent: { attackPower: 0.1 } }
                        }],
                        duration_ms: 60000
                    },
                    resultText: 'The slime seems to nod in approval 👍. You feel a surge of righteous confidence! 💪✅🤩',
                    outcomeEmoji: '✅'
                }
            },
            {
                text: 'A hero needs a saga.',
                emoji: '📜',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 75 },
                    resultText: 'The slime spits out some gold 🪙. "An honest answer deserves a reward," it gurgles. 💰✨',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Out of my way, gelatinous pest!',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'The slime jiggles indignantly 😠 but lets you pass 🚶. You feel a bit rude. 😒😑',
                    outcomeEmoji: '😒'
                }
            },
            {
                text: "I... I don't know.",
                emoji: '🤷',
                consequence: {
                     type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Slime's Comfort", 
                            description: "Temporarily gain +50 max health.", 
                            type: 'buff', 
                            modifiers: { flat: { maxHealth: 50 } }
                        }],
                        duration_ms: 60000
                    },
                    resultText: "The slime pats you with a pseudopod ❤️‍🩹. 'It's okay. Neither do I.' You feel strangely comforted. 🙏😌",
                    outcomeEmoji: '❤️‍🩹'
                }
            }
        ]
    },
    {
        id: 'common_02',
        title: 'The Mysterious Peddler 🕵️🧪🤫',
        description: 'A cloaked figure 🕵️ in a dusty corner offers you a choice of unlabeled potions 🧪. "Care for a sip, traveler? On the house." 😉',
        emojis: ['🧑‍🔬', '🧪', '🔴', '🔵'],
        eventType: 'common',
        options: [
            {
                text: 'Drink the swirling red potion.',
                emoji: '🔴',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Vigor Potion", 
                            description: "Your max health is temporarily increased by 25%.", 
                            type: 'buff', 
                            modifiers: { percent: { maxHealth: 0.25 } }
                        }],
                        duration_ms: 180000
                    },
                    resultText: 'A warmth spreads through you 🔥. You feel more robust and full of life! 💪🏋️💯',
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Drink the murky blue potion.',
                emoji: '🔵',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Nausea Potion", 
                            description: "Your max health is temporarily decreased by 25%.", 
                            type: 'debuff', 
                            modifiers: { percent: { maxHealth: -0.25 } }
                        }],
                        duration_ms: 180000
                    },
                    resultText: 'A bitter taste fills your mouth 😝. You feel weakened and unwell. 🤢😵',
                    outcomeEmoji: '🤢'
                }
            },
            {
                text: 'Drink the fizzy green potion.',
                emoji: '🟢',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'h1', rarity: 'common' }, // Baseball Cap
                    resultText: 'It tastes like lime and... a hat? 🧢 You find a common item in your bag! 🎒🥳',
                    outcomeEmoji: '🧢'
                }
            },
            {
                text: 'Politely decline the offer.',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'The peddler shrugs and melts back into the shadows 💨. Spooky! 👻😨',
                    outcomeEmoji: '💨'
                }
            }
        ]
    },
    {
        id: 'common_03',
        title: 'A Wishing Well 💧✨🙏',
        description: 'You find an old, mossy well 💧. A faint shimmer ✨ emanates from its depths. A small sign reads: "Toss a coin, make a wish." 🙏🪙',
        emojis: ['🪙', '💧', '✨', '🙏'],
        eventType: 'common',
        options: [
            {
                text: 'Toss in 10 gold',
                emoji: '🪙',
                cost: 10,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Well's Blessing", 
                            description: "+10% Fortune for 3 minutes.", 
                            type: 'buff', 
                            modifiers: { percent: { luck: 0.1 } }
                        }],
                        duration_ms: 180000
                    },
                    resultText: 'Your coin vanishes with a splash 💧. A gentle light envelops you, and you feel luckier. 🍀✨',
                    outcomeEmoji: '🍀'
                }
            },
            {
                text: 'Drink from the well',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Stomach Cramps", 
                            description: "-5% Attack Power for 2 minutes.", 
                            type: 'debuff', 
                            modifiers: { percent: { attackPower: -0.05 } }
                        }],
                        duration_ms: 120000
                    },
                    resultText: 'The water tastes stale and slightly magical 🤢. You get a stomach ache. 😖😫',
                    outcomeEmoji: '🤢'
                }
            },
            {
                text: 'Fish out the coins',
                emoji: '🎣',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 75 },
                    resultText: "You manage to fish out a handful of someone else's wishes 🎣. Shame on you. 😉🤑",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Make a silent wish and leave.',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You make a wish for a brighter future 🌅 and continue on your path. 😌🚶',
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'common_04',
        title: 'A Traveling Bard 👨‍🎤🎶🎸',
        description: 'A cheerful bard 👨‍🎤 with a lute 🎸 blocks your path. "Greetings, hero! Care for a tune to lighten your journey?" 🎶',
        emojis: ['🎶', '👨‍🎤', '📜', '💃'],
        eventType: 'common',
        options: [
            {
                text: 'Listen to an inspiring ballad.',
                emoji: '🎶',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Uplifting Melody", 
                            description: "+10% Attack Speed for 90s.", 
                            type: 'buff', 
                            modifiers: { percent: { attackSpeed: 0.1 } }
                        }],
                        duration_ms: 90000
                    },
                    resultText: 'The song is rousing! 🎵 Your heart beats faster, and you feel ready for battle! ⚡️⚔️',
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Commission a saga of your deeds.',
                emoji: '📜',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'bard_knows_hero' },
                    resultText: '"A saga! 📜 An excellent choice! 🤩 I shall observe your mighty deeds and compose a masterpiece fit for a king! 👑" The bard winks 😉 and dashes off. ✍️💨',
                    outcomeEmoji: '✍️'
                }
            },
            {
                text: 'Demand they get out of the way.',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'The bard looks hurt 😔 but steps aside 🚶. The silence that follows is a little awkward. 😬',
                    outcomeEmoji: '😒'
                }
            },
            {
                text: 'Dance!',
                emoji: '💃',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "You and the bard dance a lively jig 🕺💃. The dance is so invigorating you feel like you've skipped a whole encounter. 🥳🚀",
                    outcomeEmoji: '🥳'
                }
            }
        ]
    },
    {
        id: 'common_05',
        title: 'A Fork in the Road 🛣️🍴❓',
        description: 'You come to a fork in the road 🛣️. In the middle of the path, there is a literal, shiny metal fork. 🍴✨',
        emojis: ['🍴', '🛣️', '❓', '👈'],
        eventType: 'common',
        options: [
            {
                text: 'Take the fork.',
                emoji: '🍴',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'm6', rarity: 'common' }, // Trident of the Depths
                    resultText: "You pick up the fork 🍴. It feels surprisingly hefty and well-balanced. It's more of a trident, really! 🔱💪🤩",
                    outcomeEmoji: '🔱'
                }
            },
            {
                text: 'Go left.',
                emoji: '👈',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "The left path loops back on itself 🔄. You've lost some precious time. 😩🕰️",
                    outcomeEmoji: '😩'
                }
            },
            {
                text: 'Go right.',
                emoji: '👉',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: 'The right path is a fortunate shortcut! 🚀🗺️ You make great time! 🥳',
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Go straight ahead.',
                emoji: '👆',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You ignore the paths and blaze your own trail through the bushes 🌿. It takes about the same amount of time. 🤷‍♂️⏰',
                    outcomeEmoji: '🤷'
                }
            }
        ]
    },
    {
        id: 'common_06',
        title: 'A Suspicious Chest 🎁🤔👀',
        description: 'A treasure chest 🎁 sits in the middle of the path, completely unguarded. It looks too good to be true... 👀🤔',
        emojis: ['🎁', '👀', '🤔', '👅'],
        eventType: 'common',
        options: [
            {
                text: 'Open it greedily.',
                emoji: '🤑',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Mimic's Bite", 
                            description: "-10% Max Health for 3 minutes.", 
                            type: 'debuff', 
                            modifiers: { percent: { maxHealth: -0.1 } }
                        }],
                        duration_ms: 180000
                    },
                    resultText: "It's a Mimic! 👅 It bites your hand 🩸 before scurrying away, leaving you feeling frail. 😵🤕",
                    outcomeEmoji: '😵'
                }
            },
            {
                text: 'Smash it from a distance.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 25 },
                    resultText: "You smash the chest 💥. It splinters, revealing a few coins 🪙. Was it a mimic? You'll never know. 🤷‍♂️",
                    outcomeEmoji: '🪙'
                }
            },
            {
                text: 'Lick it.',
                emoji: '👅',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'It tastes of old wood and disappointment 🤢. The chest does not react. 🤷‍♂️📦',
                    outcomeEmoji: '🤢'
                }
            },
            {
                text: 'Leave it be.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'Your adventurer senses are tingling ✨. You wisely give the suspicious chest a wide berth. 👍😌🚶',
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'common_07',
        title: 'An Impish Deal 😈🔥🤝',
        description: "A tiny imp 😈 with a big smile appears in a puff of smoke 💨. 'Psst, hero! Want a taste of REAL power? I've got just the thing, for a small price...' 😉",
        emojis: ['😈', '🔥', '❤️‍🔥', '✨'],
        eventType: 'common',
        options: [
            {
                text: 'A deal for ultimate power',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Imp's Bargain", 
                            description: "+20% Attack Power permanently, but lose 10% Max Health.", 
                            type: 'buff', 
                            modifiers: { percent: { attackPower: 0.2, maxHealth: -0.1 } }
                        }],
                        duration_ms: Infinity
                    },
                    resultText: '"A wise choice!" The imp touches you, and you feel immense power, though a bit of your life force drains away. 💪🔥✨',
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'A deal for endless fortune',
                emoji: '������',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Gilded Curse", 
                            description: "+20% Fortune permanently, but you feel more fragile.", 
                            type: 'buff', 
                            modifiers: { percent: { luck: 0.2, maxHealth: -0.1 } }
                        }],
                        duration_ms: Infinity
                    },
                    resultText: '"Excellent!" The imp blows golden dust on you ✨. You feel luckier, but a bit more brittle. 🤑💔',
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: '"Begone, foul creature!"',
                emoji: '✝️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: '"Your loss!" The imp vanishes in a puff of brimstone. 💨👋😒',
                    outcomeEmoji: '💨'
                }
            },
            {
                text: 'Ask for a sandwich.',
                emoji: '🥪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Infernal Sandwich", 
                            description: "+50 Max Health for 5 minutes.", 
                            type: 'buff', 
                            modifiers: { flat: { maxHealth: 50 } }
                        }],
                        duration_ms: 300000
                    },
                    resultText: "The imp looks confused 🤨, then snaps his fingers. A slightly spicy sandwich appears. It's surprisingly nourishing. 😋🥪",
                    outcomeEmoji: '😋'
                }
            }
        ]
    },
    {
        id: 'common_11',
        title: 'One-Armed Bandit 🎰💰😈',
        description: 'You find a strange, single-armed slot machine 🎰 in a dark corner. It looks ancient and cursed, but the coin slot is gleaming. ✨😈',
        emojis: ['🎰', '💰', '💥', '❓'],
        eventType: 'common',
        options: [
            {
                text: 'Pull the lever (Cost: 77 gold)',
                emoji: '🎰',
                cost: 77,
                randomConsequences: [
                    {
                        weight: 15, // 15% chance
                        consequence: {
                            type: EventConsequenceType.RESOURCE,
                            payload: { amount: 777 },
                            resultText: 'The reels spin... 🍒🍒🍒 JACKPOT! A torrent of coins pours out of the machine! 🤑🎉💰',
                            outcomeEmoji: '🤑'
                        }
                    },
                    {
                        weight: 85, // 85% chance
                        consequence: {
                            type: EventConsequenceType.NOTHING,
                            resultText: 'The reels spin... 🍋🍋🍋 You lose. The machine mockingly flashes lemons at you as it eats your gold. 😭💸',
                            outcomeEmoji: '😭'
                        }
                    }
                ]
            },
            {
                text: 'Nudge it gently (Cost: 10 gold)',
                emoji: '👉',
                cost: 10,
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'h1', rarity: 'common' },
                    resultText: 'You give it a little nudge 👉. It whirs and dispenses a single, slightly dusty common item. 🧢👍',
                    outcomeEmoji: '🧢'
                }
            },
            {
                text: 'Smash it',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Cursed Luck",
                            description: "You feel unlucky. -10% Fortune for 2 minutes.",
                            type: 'debuff',
                            modifiers: { percent: { luck: -0.1 } }
                        }],
                        duration_ms: 120000
                    },
                    resultText: 'You smash the machine! 💥 It sparks and sputters, cursing your luck before it dies. 😠📉',
                    outcomeEmoji: '😠'
                }
            },
            {
                text: "Don't gamble",
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You know when to walk away 🚶. You leave the cursed machine behind. 👍😌",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];
