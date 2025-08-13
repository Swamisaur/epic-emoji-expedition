/**
 * @file data/events/common_2.ts
 * @description Contains the second batch of common events that can appear in any realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const commonEvents_2: GameEvent[] = [
    {
        id: 'common_weeping_statue_01',
        title: 'The Weeping Statue',
        description: 'You find a masterfully carved statue of an ancient hero 🗿. Strangely, it seems to be weeping real tears 😭 into a small basin. 💧',
        emojis: ['🗿', '😭', '💧', '🙏'],
        eventType: 'common',
        options: [
            {
                text: 'Drink the tears',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Hero's Sorrow", 
                            description: "+15% Crit Chance for 2 minutes.", 
                            type: 'buff', 
                            modifiers: { percent: { critChance: 0.15 } }
                        }],
                        duration_ms: 120000
                    },
                    resultText: "The tears taste of salt and forgotten valor ⚔️. You feel a deep, sorrowful focus. 🎯🧐",
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: 'Wipe the tears away',
                emoji: '✋',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.25 },
                    resultText: 'You gently wipe the tears from the stone face ✋. A wave of gratitude washes over you, mending some of your wounds. 🙏❤️‍🩹',
                    outcomeEmoji: '❤️‍🩹'
                }
            },
            {
                text: 'Collect the tears',
                emoji: '🧪',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: 'The tears crystallize into valuable salt gems in your pouch 💎. Morbid, but profitable. 💰🤑',
                    outcomeEmoji: '💎'
                }
            },
            {
                text: 'Offer a comforting word',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You offer condolences to the statue 🙏. It continues to weep. Well, you tried. 😌🤷',
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'common_sword_in_stone_01',
        title: 'The Sword in the Stone',
        description: 'A magnificent sword ⚔️ is embedded to the hilt in a solid block of granite 🪨. An inscription reads: "Only the truly worthy may claim me." ✨📜',
        emojis: ['⚔️', '🪨', '💪', '✨'],
        eventType: 'common',
        options: [
            {
                text: 'Try with brute force',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Strained Back", 
                            description: "-10% Attack Power for 90s.", 
                            type: 'debuff', 
                            modifiers: { percent: { attackPower: -0.10 } }
                        }],
                        duration_ms: 90000
                    },
                    resultText: 'You pull and strain with all your might 💪, but the sword does not budge. You throw your back out in the process. 🤕😖',
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Try with finesse and wit',
                emoji: '🧠',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'm10', rarity: 'legendary' }, // Excalibur
                    resultText: 'You notice the sword is not stuck, but held by magic 🧙‍♂️. With a clever twist, it slides free! It thrums with power. You are worthy! 🤩👑',
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Chip away at the stone',
                emoji: '⛏️',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: "It's too much work to free the sword ⛏️, but you manage to chip off some valuable, magically-infused granite. 💰💎",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Leave it for the next hero',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You recognize that this is probably not your story 📖. You leave the legendary sword for someone else. 👍🚶',
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'common_lost_pet_01',
        title: 'The Lost Pet',
        description: 'A small child is crying 😭 by the side of the path. "Have you seen my pet, Rocky?" they sniffle, holding up a drawing of a very ordinary-looking rock. 🪨🎨',
        emojis: ['😭', '🪨', '❤️', '❓'],
        eventType: 'common',
        options: [
            {
                text: 'Help look for Rocky',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Good Karma", 
                            description: "+10% Fortune for 2 minutes.", 
                            type: 'buff', 
                            modifiers: { percent: { luck: 0.10 } }
                        }],
                        duration_ms: 120000
                    },
                    resultText: 'You find a rock that looks exactly like the drawing 🧐. The child is overjoyed 🥰. The universe seems to smile upon you. 😇✨',
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Give the child a different rock',
                emoji: '✋',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.15 },
                    resultText: '"This can be Rocky II!" you suggest ✋. The child brightens up instantly. Their happiness is a healing balm to your weary soul. ❤️‍🩹😊',
                    outcomeEmoji: '❤️‍🩹'
                }
            },
            {
                text: '"It\'s just a rock."',
                emoji: '🙄',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Heartless", 
                            description: "You feel a pang of guilt. -5% Crit Chance for 90s.", 
                            type: 'debuff', 
                            modifiers: { percent: { critChance: -0.05 } }
                        }],
                        duration_ms: 90000
                    },
                    resultText: 'The child wails louder 😭. You feel like a monster and are distracted by your own cruelty. 😞💔',
                    outcomeEmoji: '😞'
                }
            },
            {
                text: 'Walk away slowly',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You are not equipped to handle this level of emotional distress 😬. You pretend you didn't see anything. 🚶‍♀️💨",
                    outcomeEmoji: '😬'
                }
            }
        ]
    }
];