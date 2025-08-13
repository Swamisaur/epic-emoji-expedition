/**
 * @file data/events/scrapheapMetropolis.ts
 * @description Contains the first batch of events specific to the Scrapheap Metropolis realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const scrapheapMetropolisEvents_1: GameEvent[] = [
    {
        id: 'scrapheap_metropolis_01',
        title: "The Live Wire",
        description: "A thick power cable 🔌 snakes across the path, spitting angry blue sparks ⚡. It's too dangerous to touch. 😬",
        emojis: ['⚡', '🔌', '🚧', '🤔'],
        eventType: 'realm_specific',
        realm: "Scrapheap Metropolis",
        options: [
            {
                text: 'Try to harness its power.',
                emoji: '🔋',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Overcharged", description: "+20% Attack Speed for 2 minutes.", type: 'buff', modifiers: { percent: { attackSpeed: 0.20 } } }], duration_ms: 120000 },
                    resultText: "You carefully rig a conduit 🛠️. A surge of energy flows through you, making your movements incredibly fast! ⚡️💨",
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Insulate it with junk.',
                emoji: '🧱',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "You pile non-conductive junk 🧱 onto the wire, creating a safe bridge to cross. Your ingenuity saves you time. 👍🧠",
                    outcomeEmoji: '👍'
                }
            },
            {
                text: 'Try to jump it.',
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Static Shock", description: "You get shocked! -10% Attack Power for 60s.", type: 'debuff', modifiers: { percent: { attackPower: -0.10 } } }], duration_ms: 60000 },
                    resultText: "You misjudge the jump 🤸 and get a nasty shock! Your arms tingle, and your swings feel weaker. 😵😫",
                    outcomeEmoji: '😵'
                }
            },
            {
                text: 'Find another way around.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "It's too risky 😬. You spend a long time navigating a maze of scrap to get around it. 😩🕰️",
                    outcomeEmoji: '😩'
                }
            }
        ]
    },
    {
        id: 'scrapheap_metropolis_02',
        title: "The Last Battery",
        description: "A dying robot 🤖 slumps against a wall, its optical sensors dim 💡. It gestures a weak, metallic hand toward a fully charged battery 🔋 just out of its reach. 😥",
        emojis: ['🤖', '🔋', '❤️‍🩹', '❓'],
        eventType: 'realm_specific',
        realm: "Scrapheap Metropolis",
        options: [
            {
                text: 'Give it the battery.',
                emoji: '❤️‍🩹',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r9', rarity: 'rare' }, // Heart Amulet
                    resultText: "The robot powers up 🤖, beeps thankfully 🙏, and opens a chest plate to give you a powerful component it was protecting. ❤️✨",
                    outcomeEmoji: '❤️'
                }
            },
            {
                text: 'Take the battery for yourself.',
                emoji: '😈',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Energy Boost", description: "Permanently gain +5% Attack Speed. ⚡️", type: 'buff', modifiers: { percent: { attackSpeed: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You take the battery 🔋. The robot's light fades completely 💔. You absorb the battery's energy, feeling permanently quicker. ⚡️",
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Use it to charge your weapon.',
                emoji: '⚔️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Charged Strike", description: "+15% Attack Power for 3 minutes. 🔥", type: 'buff', modifiers: { percent: { attackPower: 0.15 } } }], duration_ms: 180000 },
                    resultText: "You drain the battery's power 🔋 into your weapon, which now hums with energy. 🔥💪",
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Put the robot out of its misery.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 50 },
                    resultText: "A merciful end 🙏. You smash the robot 💥 and find a few spare parts you can trade for coin. 🔩💰",
                    outcomeEmoji: '🔩'
                }
            }
        ]
    },
    {
        id: 'scrapheap_metropolis_03',
        title: "The Sentient Toaster",
        description: "A chrome toaster 🤖 with googly eyes 👀 pops up from a pile of junk. 'GREETINGS, FLESH-BEING. INSERT BREAD-SUBSTITUTE FOR OPTIMAL TOASTING.' 🍞",
        emojis: ['🤖', '🍞', '⚙️', '🔥'],
        eventType: 'realm_specific',
        realm: "Scrapheap Metropolis",
        options: [
            {
                text: 'Feed it some scrap metal.',
                emoji: '⚙️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o3', rarity: 'common' }, // Frying Pan
                    resultText: "The toaster happily crunches the metal 😋. It then dispenses a... perfectly seasoned frying pan? 🤔 'COMPLIMENTARY COOKWARE,' it buzzes. 🍳",
                    outcomeEmoji: '🍳'
                }
            },
            {
                text: 'Unplug it.',
                emoji: '🔌',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You unplug the toaster 🔌. Its googly eyes go dim. The silence is profound. 😌🤫",
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Ask it for directions.',
                emoji: '🗺️',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "'THE PATH OF OPTIMAL EFFICIENCY IS... THAT WAY.' 👉 It points a heating element toward a hidden shortcut. 👍🚀",
                    outcomeEmoji: '👍'
                }
            },
            {
                text: 'Change its setting to "Bagel".',
                emoji: '🥯',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Over-Toasted", description: "You are slightly burned 🔥. -5% Max Health for 90s.", type: 'debuff', modifiers: { percent: { maxHealth: -0.05 } } }], duration_ms: 90000 },
                    resultText: "The toaster glows red hot 🔥 and lets out an angry buzz, singeing your eyebrows. 😠😫",
                    outcomeEmoji: '😠'
                }
            }
        ]
    },
    {
        id: 'scrapheap_metropolis_04',
        title: "The Magnetic Crane",
        description: "A giant electromagnet 🧲 pulses ominously overhead, periodically yanking loose scrap into the air 🏗️. It's powerful and unpredictable. 😬",
        emojis: ['🧲', '⚙️', '🏗️', '💥'],
        eventType: 'realm_specific',
        realm: "Scrapheap Metropolis",
        options: [
            {
                text: 'Throw metal at a foe with it.',
                emoji: '🎯',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "You toss a piece of scrap at the perfect moment 🎯. The magnet flings it into the distance, taking out your next enemy from afar! 💥👏",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Try to short it out.',
                emoji: '⚡',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: "You manage to short out the crane ⚡. As it powers down, it drops a massive pile of valuable scrap and coins. 💰🤑",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Ride the magnetic field.',
                emoji: '🏄',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "You grab a large metal plate and ride the magnetic pulse like a wave 🏄, flying far ahead! 😎🚀",
                    outcomeEmoji: '😎'
                }
            },
            {
                text: 'Unequip all metal and sneak by.',
                emoji: '🤫',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You carefully remove any metal items and creep past the crane's field of influence 🤫. Smart. 👍🧠",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'scrapheap_metropolis_05',
        title: "The Forgotten Mainframe",
        description: "You find a dusty, humming computer terminal 💻. Its screen displays a single prompt: [RUN DIAGNOSTIC? Y/N] 🤔",
        emojis: ['💻', '💾', '💡', '❓'],
        eventType: 'realm_specific',
        realm: "Scrapheap Metropolis",
        options: [
            {
                text: 'Input [Y].',
                emoji: '✅',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "System Optimization", description: "+15% Crit Chance for 3 minutes. 🎯", type: 'buff', modifiers: { percent: { critChance: 0.15 } } }], duration_ms: 180000 },
                    resultText: "[RESULT: COMBAT EFFICIENCY INCREASED] ✅. You feel your senses sharpen, able to spot weaknesses everywhere. 🎯🧠",
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: 'Input [N].',
                emoji: '❌',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "[SHUTTING DOWN...] ❌ The terminal goes dark. 😴🔌",
                    outcomeEmoji: '😴'
                }
            },
            {
                text: 'Smash it for components.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 100 },
                    resultText: "You break open the casing 💥 and find some valuable, rare components inside. ⚙️💰",
                    outcomeEmoji: '⚙️'
                }
            },
            {
                text: 'Input [FORMAT C:].',
                emoji: '😈',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "System Corruption", description: "A virus infects your gear! 🦠 -10% Fortune for 3 minutes.", type: 'debuff', modifiers: { percent: { luck: -0.10 } } }], duration_ms: 180000 },
                    resultText: "[FORMATTING...] 😈 A klaxon blares as a virus downloads into your gear. The terminal laughs with a pixelated skull before dying. 💀",
                    outcomeEmoji: '💀'
                }
            }
        ]
    }
];