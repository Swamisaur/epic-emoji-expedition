/**
 * @file data/events/scorchedSands_1.ts
 * @description Contains the first batch of events specific to the Scorched Sands realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const scorchedSandsEvents_1: GameEvent[] = [
    {
        id: 'scorched_sands_01',
        title: "Mirage Oasis",
        description: "Shimmering in the distance, you see a lush oasis 🌴. Is it real, or a trick of the heat? 🥵 The water looks incredibly refreshing. 💧",
        emojis: ['🌴', '💧', '🥵', '❓'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Sip cautiously first',
                emoji: '🤔',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Oasis Vigor", description: "Temporarily gain +150 max health.", type: 'buff', modifiers: { flat: { maxHealth: 150 } } }], duration_ms: 120000 },
                    resultText: "The water is real and cool! 💧 Your caution pays off. You feel refreshed and revitalized. 🤩💪",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Drink deeply without hesitation',
                emoji: '🤪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Dehydration", description: "-10% Max Health for 90s.", type: 'debuff', modifiers: { percent: { maxHealth: -0.10 } } }], duration_ms: 90000 },
                    resultText: "It was a mirage! 😫 Your reckless gulp ends with a mouthful of sand. You feel weaker than before. 😖😵",
                    outcomeEmoji: '😫'
                }
            },
            {
                text: "Don't trust it. Move on.",
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You wisely ignore the potential mirage 🏜️ and press onward through the heat. 👍🚶",
                    outcomeEmoji: '👍'
                }
            },
            {
                text: 'Rest in the shade',
                emoji: '😴',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "Whether real or not, the thought of shade is enough 😴. You find a real rock to rest behind, regaining your strength and bypassing the next foe. 😌👍",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_02',
        title: "The Sandstorm",
        description: "A colossal sandstorm 🌪️ whips across the dunes, threatening to flay you alive. You must find shelter, fast! 🏃💨",
        emojis: ['🌪️', '🏜️', '🏃', '🪨'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Hunker behind a dune',
                emoji: '👇',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "You wait out the storm, but the shifting sands have pushed you back. You've lost ground. 😩⏳",
                    outcomeEmoji: '😩'
                }
            },
            {
                text: 'Push through the storm',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Sand-blasted", description: "-10% Attack Power for 120s.", type: 'debuff', modifiers: { percent: { attackPower: -0.10 } } }], duration_ms: 120000 },
                    resultText: "You grit your teeth and march on 💪. You make it through, but the stinging sand has weakened your resolve. 😖😫",
                    outcomeEmoji: '😖'
                }
            },
            {
                text: 'Find a nearby cave',
                emoji: '🔦',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'h7', rarity: 'common' }, // Hard Hat
                    resultText: "You dive into a small cave 🔦, finding shelter and a dusty, forgotten piece of gear. 👷👍",
                    outcomeEmoji: '👷'
                }
            },
            {
                text: 'Use your shield to surf the winds',
                emoji: '🏄',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "It's a crazy idea, but it works! 🏄 You ride the winds and land far ahead of your previous position. 😎🚀",
                    outcomeEmoji: '😎'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_03_map',
        title: "Sun-bleached Tablet",
        description: "Half-buried in the sand is a clay tablet 📜 covered in strange, angular symbols and a crude map. 🗺️🤔",
        emojis: ['📜', '🏺', '🗺️', '🤔'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Decipher the map',
                emoji: '🗺️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'found_tomb_map' },
                    resultText: "The symbols point to a location deeper in the desert 🏜️. You pocket the tablet, curious about what it leads to. ✅🧭",
                    outcomeEmoji: '✅'
                }
            },
            {
                text: 'Use it as a frisbee',
                emoji: '🥏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "The tablet flies surprisingly far before shattering against a rock 💥. It was probably worthless anyway. 🤷‍♂️",
                    outcomeEmoji: '🤷'
                }
            },
            {
                text: 'Sell it to a nomad',
                emoji: '🤝',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 100 },
                    resultText: "You find a wandering trader who seems to recognize the symbols and pays you well for the tablet. 💰🤝",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Grind it to dust',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You crush the ancient tablet under your heel 🦶. Why? Because you can. 😈",
                    outcomeEmoji: '😈'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_04_tomb',
        title: "The Sunken Tomb",
        description: "The map on your tablet leads you to a set of stone doors 🏛️ almost completely swallowed by the sand. This is it. 💀🏜️",
        emojis: ['🏛️', '🚪', '💀', '💎'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        requiredFlag: 'found_tomb_map',
        options: [
            {
                text: 'Enter the tomb',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r2', rarity: 'legendary' }, // Medal of Honor
                    resultText: "You enter the darkness and find the sarcophagus of a long-forgotten hero ⚰️. You take their medal as your prize. 🎖️✨",
                    outcomeEmoji: '🎖️'
                }
            },
            {
                text: 'Loot the entrance',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "Too risky to go inside 😨. You find some valuables carelessly left near the entrance. 🪙💰",
                    outcomeEmoji: '🪙'
                }
            },
            {
                text: 'Seal the tomb forever',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Guardian's Peace", description: "Permanently gain +5% Max Health.", type: 'buff', modifiers: { percent: { maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You seal the entrance, ensuring no one disturbs the dead 🙏. A ghostly whisper thanks you, and you feel a sense of peace and vitality. 😌❤️",
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Run away',
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "A cold draft emanates from the tomb 😨. You decide you're not ready to face what's inside and flee. 🏃💨",
                    outcomeEmoji: '😨'
                }
            }
        ]
    }
];