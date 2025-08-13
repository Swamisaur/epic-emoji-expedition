/**
 * @file data/events/scorchedSands_2.ts
 * @description Contains the second batch of events specific to the Scorched Sands realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const scorchedSandsEvents_2: GameEvent[] = [
    {
        id: 'scorched_sands_05',
        title: "Cactus Juice",
        description: "You see a lone, flowering cactus 🌵. A friendly-looking snake 🐍 coiled around it beckons you closer. 'Try some juice? It's the quenchiest!' 😉",
        emojis: ['🌵', '🐍', '🥤', '😵'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Drink the juice',
                emoji: '🥤',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Cactus Quench", description: "+15% Attack Speed for 120s.", type: 'buff', modifiers: { percent: { attackSpeed: 0.15 } } }], duration_ms: 120000 },
                    resultText: "It IS the quenchiest! 🥤 You feel incredibly refreshed and quick on your feet. ⚡️🏃",
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Eat the flower',
                emoji: '🌸',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Cactus Confusion", description: "-10% Crit Chance for 90s.", type: 'debuff', modifiers: { percent: { critChance: -0.10 } } }], duration_ms: 90000 },
                    resultText: "You eat the flower 🌸. The world begins to swirl with colors, and you feel dizzy and unfocused. 😵‍💫🌀",
                    outcomeEmoji: '😵‍💫'
                }
            },
            {
                text: 'Attack the snake',
                emoji: '⚔️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "The snake dodges your attack effortlessly 🐍 and slithers away, laughing. You feel foolish. 😅🤦",
                    outcomeEmoji: '😅'
                }
            },
            {
                text: 'Politely refuse',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You learned from a cartoon not to drink cactus juice 🤔. You thank the snake and move on. 👍",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_06',
        title: "The Scorpion's Stash",
        description: "A giant scorpion 🦂 is guarding a glittering pile of what looks like gems 💎 and coins 💰. It snaps its pincers menacingly. 😠",
        emojis: ['🦂', '💎', '💰', '⚔️'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Grab a handful and run',
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 350 },
                    resultText: "You're fast! 🏃 You snatch a huge pile of gold before the scorpion can react. 🤑💰",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Throw a rock to distract it',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r3', rarity: 'rare' }, // Gem of Power
                    resultText: "The scorpion chases the rock 🪨. You quickly snag a particularly shiny gem from the pile. 💎✨",
                    outcomeEmoji: '💎'
                }
            },
            {
                text: 'Try to pet it',
                emoji: '🥰',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.20 },
                    resultText: "It stings you! 🦂 A burning venom courses through your veins 🔥, dealing 20% of your max health in damage, but you manage to get away. That was a very bad idea. ☠️",
                    outcomeEmoji: '☠️'
                }
            },
            {
                text: 'Admire from a distance',
                emoji: '👀',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You're no fool 👀. You leave the giant scorpion and its treasure alone. 😌👍",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_07',
        title: 'Nomad Merchant',
        description: "A weathered nomad 👳 offers you a choice from their meager wares. 'Best prices in all the desert,' they rasp. 🛒",
        emojis: ['👳', '🛒', '📦', '💰'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Buy the "Dust Devil in a Jar" (150 gold).',
                emoji: '🌪️',
                cost: 150,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Desert Haste", description: "+20% Attack Speed for 90s.", type: 'buff', modifiers: { percent: { attackSpeed: 0.20 } } }], duration_ms: 90000 },
                    resultText: "You un-cork the jar 🌪️. A tiny whirlwind envelops you, making you feel incredibly fast. 💨⚡️",
                    outcomeEmoji: '💨'
                }
            },
            {
                text: 'Buy the "Sunstone Shard" (150 gold).',
                emoji: '☀️',
                cost: 150,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Sun's Radiance", description: "+15% Attack Power for 90s.", type: 'buff', modifiers: { percent: { attackPower: 0.15 } } }], duration_ms: 90000 },
                    resultText: "The shard glows with the heat of the sun ☀️, filling you with fiery strength. 🔥💪",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Haggle for a better price',
                emoji: '🤨',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 25 },
                    resultText: 'The nomad is offended by your haggling and throws a handful of sand at you 🤨. You find a few coins in the sand after they leave. 🤔🪙',
                    outcomeEmoji: '🤔'
                }
            },
            {
                text: 'Pass on the offer.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You thank the nomad for the offer 🙏 but decide to save your gold. 👍',
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'scorched_sands_08',
        title: "The Thirsty Ghost",
        description: "The shimmering apparition of a prospector 👻 crawls towards you. 'Water...' it croaks, 'Just a drop...' 💧🥵",
        emojis: ['👻', '💧', '🥵', '🙏'],
        eventType: 'realm_specific',
        realm: "Scorched Sands",
        options: [
            {
                text: 'Offer your waterskin.',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Ghostly Gratitude", description: "Permanently gain +10% Fortune.", type: 'buff', modifiers: { percent: { luck: 0.10 } } }], duration_ms: Infinity },
                    resultText: "The ghost drinks 💧, and its form solidifies for a moment. 'Thank you,' it whispers, and you feel a lasting wave of good fortune. 😇✨",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Pour water on the sand.',
                emoji: '🏜️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'The ghost wails in despair 😭 as the water disappears into the sand. It fades away, leaving you alone. 😔',
                    outcomeEmoji: '😭'
                }
            },
            {
                text: 'Ignore the ghost.',
                emoji: '🤷',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You walk right through the ghost 🤷. It's a strange, cold feeling, but nothing else happens. 🥶👻",
                    outcomeEmoji: '🥶'
                }
            },
            {
                text: 'Ask for payment first.',
                emoji: '🪙',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 5 },
                    resultText: 'The ghost looks at you with disdain 😒, tosses a few spectral coins at your feet, and vanishes in a huff. 😠💨',
                    outcomeEmoji: '😠'
                }
            }
        ]
    }
];