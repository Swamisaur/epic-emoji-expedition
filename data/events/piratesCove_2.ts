/**
 * @file data/events/piratesCove_2.ts
 * @description Contains the second batch of events specific to the Pirate's Cove realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const piratesCoveEvents_2: GameEvent[] = [
    {
        id: 'pirate_cove_05',
        title: "Shipwrecked Merchant",
        description: "A merchant is stranded by his wrecked ship ⛵. 'Help me repair me vessel, and I'll reward ye handsomely!' 🛠️🙏",
        emojis: ['🧑‍🔧', '⛵', '🛠️', '💰'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Help him repair the ship',
                emoji: '🛠️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r5', rarity: 'rare' }, // Lucky Horseshoe
                    resultText: "'She's seaworthy again! ⛵ Take this lucky charm for your troubles.' 🧲✨",
                    outcomeEmoji: '🧲'
                }
            },
            {
                text: 'Loot his cargo',
                emoji: '😈',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: "You ignore his pleas and rifle through his cargo 😈, finding a hefty sum of gold. 🤑💰",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Give him a pep talk',
                emoji: '🗣️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Inspired", description: "You feel inspired by your own words. +10% Attack Power for 2 minutes.", type: 'buff', modifiers: { percent: { attackPower: 0.10 } } }], duration_ms: 120000 },
                    resultText: "Your rousing speech seems to lift his spirits... and your own! 💪🗣️✨",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Leave him to his fate',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You haven't the time for other people's problems ⏳. You continue on your way. 🤷‍♂️",
                    outcomeEmoji: '🤷'
                }
            }
        ]
    },
    {
        id: 'pirate_cove_06',
        title: "Kraken's Tentacle",
        description: "A massive tentacle 🐙, torn from some great beast, lies on the beach. It's clutching a glowing pearl. ⚪✨",
        emojis: ['🐙', '⚪', '💪', '🔥'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Pry open its grip',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Ocean's Might", description: "Permanently gain +5% Attack Power.", type: 'buff', modifiers: { percent: { attackPower: 0.05 } } }], duration_ms: Infinity },
                    resultText: "With all your might, you pry the tentacle open 💪 and claim the pearl. Its power flows into you, granting lasting strength. 🤩🌊",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Cook some calamari',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.50 },
                    resultText: "You cook up a piece of the tentacle 🔥. It's delicious and incredibly restorative, healing 50% of your max health. 😋❤️‍🩹",
                    outcomeEmoji: '😋'
                }
            },
            {
                text: 'Poke it',
                emoji: '👉',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "It's still alive! 🐙 The tentacle whips around and sends you flying backward down the beach. 🤕💨",
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Leave it alone',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You decide not to mess with the remains of a kraken. Wise. 👍🧠",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'pirate_cove_07',
        title: "Captain's Parrot",
        description: "A parrot with an eyepatch 🦜 squawks at you. 'Pieces of eight! 🪙 Shortcut ahead, past the angry crabs! 🦀 Squawk!' 🗺️",
        emojis: ['🦜', '🗺️', '🦀', '🪙'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Follow its advice',
                emoji: '🗺️',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "The parrot was telling the truth! ✅ You find a hidden path and get way ahead. 🚀💨",
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Give it a cracker (10 gold)',
                emoji: '🪙',
                cost: 10,
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 50 },
                    resultText: "The parrot happily eats the cracker 😋, then digs up a small bag of gold for you. Good bird! 💰🦜",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Ignore the bird',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You don't trust talking birds 🦜. You stick to the main path. 🤷‍♂️🚶",
                    outcomeEmoji: '🤷'
                }
            },
            {
                text: 'Teach it a swear word',
                emoji: '🤬',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "The parrot learns the word instantly 🦜 and begins shouting it at you as you walk away. You feel proud and a little ashamed. 😂😅",
                    outcomeEmoji: '😂'
                }
            }
        ]
    },
    {
        id: 'pirate_cove_08',
        title: "The Singing Clam",
        description: "A giant, pearlescent clam 🦪 sits half-open. It offers to sing you a song of the sea 🌊, for a price. 🎶",
        emojis: ['🦪', '🎶', '🎤', '🤔'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Request a sea shanty (50 gold)',
                emoji: '🤠',
                cost: 50,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Siren's Song", description: "+15% Attack Speed for 2 minutes.", type: 'buff', modifiers: { percent: { attackSpeed: 0.15 } } }], duration_ms: 120000 },
                    resultText: "The clam sings a beautiful, invigorating shanty 🎶 that quickens your heart and your hands. ⚡️🤠",
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Request a sad dirge (50 gold)',
                emoji: '😭',
                cost: 50,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Doleful Dirge", description: "-10% Attack Power for 2 minutes.", type: 'debuff', modifiers: { percent: { attackPower: -0.10 } } }], duration_ms: 120000 },
                    resultText: "The clam sings a terribly sad song 😭. It's so depressing it saps your will to fight. 💔😔",
                    outcomeEmoji: '💔'
                }
            },
            {
                text: 'Eat the clam',
                emoji: '😋',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_missing', amount: 0.50 },
                    resultText: "You decide dinner is a better option 🍴. The clam is delicious and heals 50% of your missing health. ❤️‍🩹😋",
                    outcomeEmoji: '❤️‍🩹'
                }
            },
            {
                text: 'Ask for its pearl',
                emoji: '⚪',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: "The clam is insulted you didn't want a song 😠, but it spits out a valuable pearl anyway and slams shut. 🤑💎",
                    outcomeEmoji: '🤑'
                }
            }
        ]
    }
];