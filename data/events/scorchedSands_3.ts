/**
 * @file data/events/scorchedSands_3.ts
 * @description Contains the third batch of events specific to the Scorched Sands realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const scorchedSandsEvents_3: GameEvent[] = [
    {
        id: 'scorched_sands_09',
        title: "Vulture's Perch",
        description: "A large vulture 🦅 circles above a sun-bleached skeleton 💀. As you approach, it drops something from its beak. 🎁",
        emojis: ['🦅', '💀', '🦴', '🎁'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Inspect the dropped object',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r8', rarity: 'rare' }, // Broken Compass
                    resultText: "It's not a bone, but a strange trinket! The vulture must have picked it up from a previous traveler. 🧭✨",
                    outcomeEmoji: '🧭'
                }
            },
            {
                text: 'Shoo the vulture away',
                emoji: '👋',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 75 },
                    resultText: "The vulture flies off, startled 👋. You notice a small pouch of gold clutched in the skeleton's hand. 💰💀",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Leave the dead to rest',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You pay your respects from a distance and continue your journey. 🙏😌',
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Throw a rock at the vulture',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'The vulture deftly catches the rock 🪨, glares at you, and flies away. You get the feeling you just angered a powerful entity. 😬😨',
                    outcomeEmoji: '😬'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_10',
        title: "The Whispering Dunes",
        description: "The wind howls 🌬️, carrying strange whispers that seem to tug at the edge of your sanity 🤯. They promise power, for a price. 😈",
        emojis: ['🌬️', '👂', '🤯', '💪'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Listen to the whispers of power.',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Forbidden Knowledge", description: "+25% Crit Damage for 180s.", type: 'buff', modifiers: { percent: { critDamage: 0.25 } } }], duration_ms: 180000 },
                    resultText: 'You focus on the whispers and learn a secret technique 🧠, allowing you to strike with devastating force. 💥💪',
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Listen to the whispers of speed.',
                emoji: '💨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Wind-Torn Speed", description: "+20% Attack Speed for 180s.", type: 'buff', modifiers: { percent: { attackSpeed: 0.20 } } }], duration_ms: 180000 },
                    resultText: 'You let the wind guide your movements 💨, making your attacks unnaturally fast. ⚡️🏃',
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Block your ears and hum loudly.',
                emoji: '🙉',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You refuse to listen to the maddening whispers and escape the dunes with your sanity intact. 😌🎶',
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Whisper back.',
                emoji: '🗣️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Echoing Madness", description: "-10% Attack Power, +10% Fortune for 120s", type: 'debuff', modifiers: { percent: { attackPower: -0.1, luck: 0.1 } } }], duration_ms: 120000 },
                    resultText: 'The whispers are amused by your audacity 🗣️. They grant you strange luck, but your mind is too addled to fight effectively. 🤪🍀',
                    outcomeEmoji: '🤪'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_11',
        title: "The Glass Cactus",
        description: "In the shimmering heat, you find a perfect, beautiful cactus 🌵 made not of flesh, but of shimmering desert glass. ✨💎",
        emojis: ['🌵', '💎', '🏜️', '✨'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Smash it carefully',
                emoji: '🔨',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: "You break the glass cactus 🔨. It shatters into a pile of valuable, gem-like shards. 💰💎",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Use a shard to focus the sun',
                emoji: '☀️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Sunbeam", description: "+15% Crit Chance for 2 minutes.", type: 'buff', modifiers: { percent: { critChance: 0.15 } } }], duration_ms: 120000 },
                    resultText: "You use a broken piece as a lens ☀️. The focused sunlight hones your senses, making it easier to find weak spots. 🎯😎",
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: 'Try to drink from it',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Mouthful of Sand", description: "You feel parched. -5% Attack Speed for 90s.", type: 'debuff', modifiers: { percent: { attackSpeed: -0.05 } } }], duration_ms: 90000 },
                    resultText: "You break off a piece and try to drink 💧. It's full of hot sand. You feel dehydrated and sluggish. 🥵😫",
                    outcomeEmoji: '🥵'
                }
            },
            {
                text: 'Admire its beauty',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "It's a natural wonder 🧐. You take a moment to appreciate it before moving on. 😌🖼️",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_12',
        title: "Buried Pyramid Tip",
        description: "The very top of a massive, buried pyramid 🔺 juts from the sand. An ancient, powerful energy emanates from it. ✨🏛️",
        emojis: ['🔺', '🏛️', '⏳', '✨'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Try to dig out the entrance',
                emoji: '⛏️',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "You can't find the entrance, but your digging ⛏️ uncovers several valuable relics left by other hopeful explorers. 🏺💰",
                    outcomeEmoji: '🏺'
                }
            },
            {
                text: 'Pray to the ancient structure',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Ancient Blessing", description: "Permanently gain +5% Max Health.", type: 'buff', modifiers: { percent: { maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You pray to the forgotten gods of the pyramid 🙏. A feeling of ancient endurance fills you. ❤️‍🔥💪",
                    outcomeEmoji: '❤️‍🔥'
                }
            },
            {
                text: 'Slide down the side of it',
                emoji: '🤸',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "Whee! 🤸 You slide down the smooth stone face of the pyramid, which is a surprisingly effective way to travel. 😂🚀",
                    outcomeEmoji: '😂'
                }
            },
            {
                text: 'Leave it undisturbed',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Some things are best left buried. You walk around the mysterious structure. 👍😌",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];