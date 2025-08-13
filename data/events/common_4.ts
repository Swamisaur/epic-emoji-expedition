/**
 * @file data/events/common_4.ts
 * @description Contains the fourth batch of common events that can appear in any realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const commonEvents_4: GameEvent[] = [
    {
        id: 'common_12',
        title: 'The Dramatic Blacksmith',
        description: 'A blacksmith 👨‍🏭 with a flair for the dramatic 💅 offers to re-forge an item. “Behold! 💥 with the fire of a dying star ☀️ and the soul of a forgotten God,🙏 I shall grant you gear NEW LIFE… 🌿or, you know it might melt.”☠️',
        emojis: ['👨‍🏭', '🔥', '✨', '🎭'],
        eventType: 'common',
        options: [
            {
                text: 'Reforge my main hand!',
                emoji: '⚔️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Perfectly Honed",
                            description: "+25% Crit Damage for 3 minutes.",
                            type: 'buff',
                            modifiers: { percent: { critDamage: 0.25 } }
                        }],
                        duration_ms: 180000
                    },
                    resultText: '"IT IS A MASTERPIECE!" he bellows 🗣️. Your weapon feels incredibly sharp. 🤩✨',
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Reforge my headwear!',
                emoji: '👑',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Singed Scalp",
                            description: "-10% Max Health for 2 minutes.",
                            type: 'debuff',
                            modifiers: { percent: { maxHealth: -0.1 } }
                        }],
                        duration_ms: 120000
                    },
                    resultText: '"ALAS, A TRAGEDY!" he weeps dramatically 😭. The helmet is now a smoldering wreck ♨️ and has slightly singed your hair. 🤕',
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Ask for an autograph instead.',
                emoji: '✍️',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 50 },
                    resultText: '"A patron of the arts!" 🎨 He scribbles his name on a piece of scrap metal, and gives you some coin for your good taste. 🪙👍',
                    outcomeEmoji: '🪙'
                }
            },
            {
                text: 'Just... back away slowly.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "He's a little too intense for you 🎭. You make a quiet exit. 😬🚶‍♀️",
                    outcomeEmoji: '😬'
                }
            }
        ]
    },
    {
        id: 'common_13',
        title: 'A Portal to... the Chicken Realm?',
        description: 'A swirling, clucking portal 🌀 opens before you. It smells faintly of fried chicken 🍗 and cosmic dread. 😱🐔',
        emojis: ['🌀', '🐔', '🍗', '🥚'],
        eventType: 'common',
        options: [
            {
                text: 'Jump in!',
                emoji: '🚀',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 500 },
                    resultText: "You leap through and land in a world ruled by chickens 🐔. Their king, a majestic rooster 🐓, rewards your bravery with golden corn... which is actual gold. 🤑🌽",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Throw a rock in.',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o3', rarity: 'rare' }, // Frying Pan
                    resultText: 'The rock is immediately fried and flung back out 🍗. It has been transmuted into a high-quality frying pan. 🍳✨',
                    outcomeEmoji: '🍳'
                }
            },
            {
                text: 'Reach in carefully.',
                emoji: '✋',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Pecked",
                            description: "A thousand chickens peck your hand. -5% Attack Power for 90s.",
                            type: 'debuff',
                            modifiers: { percent: { attackPower: -0.05 } }
                        }],
                        duration_ms: 90000
                    },
                    resultText: 'A wave of angry chickens 🐔 swarms your hand, pecking furiously before you can pull it back. 😖🤕',
                    outcomeEmoji: '😖'
                }
            },
            {
                text: 'Close the portal.',
                emoji: '❌',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You manage to unravel the portal's magic 🌀. The world is safe from the chicken dimension... for now. 😌👍",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'common_14',
        title: 'The Tax Collector',
        description: 'A goblin in a tiny suit 🧑‍💼, holding a tiny abacus 🧾, blocks your path. "Ahem! Per section 3, subsection B, all adventurers must pay a 15% hero tax." ⚖️',
        emojis: ['🧾', '🧑‍💼', '💰', '⚖️'],
        eventType: 'common',
        options: [
            {
                text: 'Pay the tax (15% of gold).',
                emoji: '💸',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: -1 }, // Special value handled by useEventActions
                    resultText: '"A model citizen!" 👍 The goblin stamps your hand with an invisible ink of compliance and lets you pass. ✅',
                    outcomeEmoji: '✅'
                }
            },
            {
                text: '"You\'ll have to take it from me!"',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Audit Penalty",
                            description: "He puts a lien on your luck! -10% Fortune for 3 mins.",
                            type: 'debuff',
                            modifiers: { percent: { luck: -0.1 } }
                        }],
                        duration_ms: 180000
                    },
                    resultText: '"So be it!" He makes a series of rapid calculations 🧾 and curses your future earnings before scurrying away. 📉😠',
                    outcomeEmoji: '📉'
                }
            },
            {
                text: '"I am a non-profit organization."',
                emoji: '😇',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 100 },
                    resultText: '"Oh! A tax write-off!" 📝 He is so excited he gives you a small grant from the government before running off to file the paperwork. 💰😂',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Create a diversion.',
                emoji: '✨',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You point and shout "Look, untaxed income!" 👉 The goblin shrieks and runs off in that direction. You slip by. 😂💨',
                    outcomeEmoji: '😂'
                }
            }
        ]
    },
    {
        id: 'common_15',
        title: 'The Sleeping Giant',
        description: 'The path is blocked by a slumbering giant 😴, whose snores shake the very ground. 🧍💤',
        emojis: ['😴', '🧍', '🤫', '👣'],
        eventType: 'common',
        options: [
            {
                text: 'Try to sneak past.',
                emoji: '🤫',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: 'You hold your breath and creep past the giant 🤫. You succeed! 😌👍',
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Steal from his pouch.',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 400 },
                    resultText: 'A risky move, but it pays off! 🤑 You find a hefty bag of gold. 💰✨',
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Poke him with a stick.',
                emoji: '👈',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -2 },
                    resultText: 'The giant awakens, annoyed 😠. With a lazy flick of his finger, he sends you flying backwards. 🤕💨',
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Wait for him to wake up.',
                emoji: '⏳',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You wait for hours ⏳. He does not wake up. You eventually find a way to climb over him. 🤷🧗',
                    outcomeEmoji: '🤷'
                }
            }
        ]
    }
];