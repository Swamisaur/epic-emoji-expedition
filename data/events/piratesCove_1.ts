/**
 * @file data/events/piratesCove_1.ts
 * @description Contains the first batch of events specific to the Pirate's Cove realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const piratesCoveEvents_1: GameEvent[] = [
    {
        id: 'pirate_cove_01',
        title: 'The Glimmering Grotto',
        description: 'You find a hidden grotto shimmering with an eerie light ✨. A single, barnacle-encrusted chest sits in the center, humming with a strange energy. 💎🎁',
        emojis: ['✨', '💎', '💧', '☠️'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Pry it open!',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: 'Treasure! 💰 You find a hefty bag of gold inside the chest. 🤑✨',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Touch the strange water',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{ 
                            name: "Grotto's Blessing", 
                            description: "+10% Crit Chance for 60s", 
                            type: 'buff',
                            modifiers: { percent: { critChance: 0.1 } }
                        }],
                        duration_ms: 60000
                    },
                    resultText: "A cool energy flows through you 🌊. You feel unusually sharp. 🎯✨",
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: 'Smash the glowing crystals',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "The crystals shatter 💥, and reality bends around you! 🌀 You're propelled forward. 🚀",
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Leave it alone',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Better safe than sorry 🙏. You leave the grotto untouched. 👍😌",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'pirate_cove_02_map',
        title: 'A Message in a Bottle',
        description: 'Among the debris on the beach 🏖️, you spot a corked bottle 🍾 with something inside. You uncork it to find a weathered piece of parchment. 📜',
        emojis: ['🍾', '📜', '🗺️', '❓'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Follow the map',
                emoji: '🗺️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'pirate_treasure_map_found' },
                    resultText: "It's a treasure map! 🗺️ You pocket it, hoping to find the 'X' later in your journey. ✅🧭",
                    outcomeEmoji: '✅'
                }
            },
            {
                text: 'Sell the map',
                emoji: '🤝',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 50 },
                    resultText: 'A passing merchant gives you a few coins for the interesting curiosity. 🪙🤝',
                    outcomeEmoji: '🪙'
                }
            },
            {
                text: 'Ignore it',
                emoji: '🗑️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "It's probably just a child's drawing 🎨. You toss it aside. 🤷‍♂️",
                    outcomeEmoji: '🤷'
                }
            },
            {
                text: 'Use the bottle for target practice',
                emoji: '🎯',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You shatter the bottle 💥, but the wet parchment inside makes a sad 'thwump' sound as it hits the sand 💦. You feel... disappointed in yourself. 💔😥",
                    outcomeEmoji: '💔'
                }
            }
        ]
    },
    {
        id: 'pirate_cove_03_treasure',
        title: 'The Buried Treasure',
        description: "The ❌ on your map leads you to a gnarled palm tree 🌴. After a bit of digging, your shovel hits something solid: a large, iron-banded chest! 💰🎁",
        emojis: ['❌', '🌴', '💰', '💎'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        requiredFlag: 'pirate_treasure_map_found',
        options: [
            {
                text: 'Open the chest!',
                emoji: '🔓',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 't10', rarity: 'rare' }, // Golden Fleece
                    resultText: "You heave the lid open to find a truly magnificent item! 🏆🤩✨",
                    outcomeEmoji: '🏆'
                }
            },
            {
                text: "It's probably a trap. Leave it.",
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You can't shake the feeling of being watched 👀. You back away slowly. 🏃‍♂️💨",
                    outcomeEmoji: '👀'
                }
            },
            {
                text: 'Sell the chest unopened',
                emoji: '🤝',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: "It's too risky 🤔. You find a collector who pays a handsome price for the unopened mystery. 💰🤝",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Re-bury it for someone else',
                emoji: '😇',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You're a good samaritan 😇. You bury the chest again, hoping another adventurer finds it. 👍🙏",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'pirate_cove_04',
        title: "Ghost Pirate's Riddle",
        description: "A ghostly pirate 👻 blocks your way. 'Answer me riddle, or walk the plank! What has an eye, but cannot see?' 🤔❓",
        emojis: ['👻', '❓', '💀', '🤔'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: '"A needle."',
                emoji: '🪡',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: "'Arrr, ye be a sharp one!' 🧠 The ghost laughs and tosses you a bag of spectral coins before fading away. 💰👻",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: '"A storm."',
                emoji: '⛈️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Riddle's Curse", description: "You feel foolish. -5% Crit Chance for 90s.", type: 'debuff', modifiers: { percent: { critChance: -0.05 } } }], duration_ms: 90000 },
                    resultText: "'Wrong!' ❌ The ghost howls with laughter as a wave of self-doubt washes over you. 😖😂",
                    outcomeEmoji: '😖'
                }
            },
            {
                text: '"A potato."',
                emoji: '🥔',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Riddle's Curse", description: "You feel foolish. -5% Crit Chance for 90s.", type: 'debuff', modifiers: { percent: { critChance: -0.05 } } }], duration_ms: 90000 },
                    resultText: "'Wrong! And now I'm hungry!' 😋 The ghost howls with laughter as a wave of self-doubt washes over you. 😖😂",
                    outcomeEmoji: '😖'
                }
            },
            {
                text: '"A Cyclops with an eye patch."',
                emoji: '👁️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "'...that's... technically... just get out of here.' 🤨 The ghost seems confused and lets you pass. 🤔🚶",
                    outcomeEmoji: '🤔'
                }
            }
        ]
    }
];