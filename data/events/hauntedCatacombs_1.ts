/**
 * @file data/events/hauntedCatacombs.ts
 * @description Contains the first batch of events specific to the Haunted Catacombs realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const hauntedCatacombsEvents_1: GameEvent[] = [
    {
        id: 'haunted_catacombs_01',
        title: "The Chattering Skull",
        description: "A skull 💀, perched on a pile of bones, chatters its teeth as you approach. 'A secret for a story?' it rasps in a dusty voice. 🗣️📖",
        emojis: ['💀', '🗣️', '📖', '🤫'],
        eventType: 'realm_specific',
        realm: "Haunted Catacombs",
        options: [
            {
                text: 'Tell it a grand tale of your deeds.',
                emoji: '📖',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Ancient Secret", description: "+15% Crit Damage for 3 minutes.", type: 'buff', modifiers: { percent: { critDamage: 0.15 } } }], duration_ms: 180000 },
                    resultText: "The skull listens intently 📖. 'A fine tale! Here is your secret: strike where their essence is weakest!' You learn a new way to land devastating blows. 💥🧠",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Tell it a joke.',
                emoji: '😂',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: "The skull rattles with dry laughter 😂, dislodging a few forgotten gold coins from its perch. 💰🪙",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Smash the skull.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Grave Curse", description: "You are cursed! -10% Fortune for 2 minutes.", type: 'debuff', modifiers: { percent: { luck: -0.10 } } }], duration_ms: 120000 },
                    resultText: "You shatter the skull 💥. A cold wind blows through the crypt, and you feel a wave of misfortune. 😠👻",
                    outcomeEmoji: '😠'
                }
            },
            {
                text: 'Ignore it.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You have no time for talking skulls 💀. You continue on your way. 👍🚶",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'haunted_catacombs_02',
        title: "The Empty Sarcophagus",
        description: "You find a grand, stone sarcophagus ⚰️ with its lid slightly ajar. It is completely empty, save for a single, withered rose. 🌹",
        emojis: ['⚰️', '🌹', '❓', '👻'],
        eventType: 'realm_specific',
        realm: "Haunted Catacombs",
        options: [
            {
                text: 'Look for a hidden switch.',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "You find a loose stone inside! 🧐 It triggers a secret passage, letting you bypass a large section of the crypt. 🚀✨",
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Take the rose.',
                emoji: '🌹',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Faded Love", description: "Permanently gain +50 Max Health.", type: 'buff', modifiers: { flat: { maxHealth: 50 } } }], duration_ms: Infinity },
                    resultText: "You gently pick up the rose 🌹. It crumbles to dust, but a warm, protective energy surrounds you. ❤️💪",
                    outcomeEmoji: '❤️'
                }
            },
            {
                text: 'Close the lid.',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You close the sarcophagus 🙏, giving the occupant their privacy, even in undeath. A ghostly sigh of thanks echoes in the hall. 😌👻",
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Take a nap inside.',
                emoji: '😴',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Grave Chill", description: "-10% Attack Speed for 90s.", type: 'debuff', modifiers: { percent: { attackSpeed: -0.10 } } }], duration_ms: 90000 },
                    resultText: "It's surprisingly uncomfortable 😴. You wake up with a chill that has settled deep in your bones, making you feel sluggish. 🥶😫",
                    outcomeEmoji: '🥶'
                }
            }
        ]
    },
    {
        id: 'haunted_catacombs_03',
        title: "The Rat King's Gift",
        description: "A tide of rats 🐀 swarms around you, but they do not attack. They part to reveal a massive Rat King 👑, who nudges a shiny object towards you with its nose. 🎁",
        emojis: ['🐀', '👑', '🎁', '✨'],
        eventType: 'realm_specific',
        realm: "Haunted Catacombs",
        options: [
            {
                text: 'Accept the shiny object.',
                emoji: '✨',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r6', rarity: 'rare' }, // Golden Key
                    resultText: "You cautiously take the object ✨. It's a rare key, humming with potential. The rats squeak approvingly and disperse. 🔑👍",
                    outcomeEmoji: '🔑'
                }
            },
            {
                text: 'Offer them some food.',
                emoji: '🧀',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "You offer a bit of your rations 🧀. The Rat King is so pleased it reveals a hidden stash of coins in gratitude. 💰😊",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Attack the Rat King!',
                emoji: '⚔️',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "A terrible decision ⚔️. The swarm descends, biting and clawing. You manage to fight them off, but they drive you back. 😫🤕",
                    outcomeEmoji: '😫'
                }
            },
            {
                text: 'Scream and run.',
                emoji: '😱',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "It's too many rats! 😱 You flee, and the swarm does not pursue. 🏃💨",
                    outcomeEmoji: '🏃'
                }
            }
        ]
    },
    {
        id: 'haunted_catacombs_04',
        title: "A Ghostly Procession",
        description: "A silent, slow-moving procession of ghostly figures 👻 drifts down the hallway, phasing through walls and obstacles. 🕯️🚶",
        emojis: ['👻', '🚶', '🙏', '🕯️'],
        eventType: 'realm_specific',
        realm: "Haunted Catacombs",
        options: [
            {
                text: 'Join the procession.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "You fall in line 🚶. The ghosts don't seem to notice. Their path is a strange shortcut, and you find yourself further along than before. 🌀✨",
                    outcomeEmoji: '🌀'
                }
            },
            {
                text: 'Bow your head in respect.',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Spirit's Favor", description: "+10% Fortune for 2 minutes.", type: 'buff', modifiers: { percent: { luck: 0.10 } } }], duration_ms: 120000 },
                    resultText: "You wait for the procession to pass 🙏. The last ghost in line seems to nod at you, bestowing a brief blessing of good fortune. 😇🍀",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Try to disrupt them.',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Haunting Chill", description: "You feel an unnatural cold. -10% Attack Power for 90s.", type: 'debuff', modifiers: { percent: { attackPower: -0.10 } } }], duration_ms: 90000 },
                    resultText: "You wave your arms through them 😠. A collective wave of sorrow and anger washes over you, weakening your spirit. 🥶😫",
                    outcomeEmoji: '🥶'
                }
            },
            {
                text: 'Hide until they pass.',
                emoji: '🤫',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You duck into an alcove and wait 🤫. The ghostly parade drifts by, unaware of your presence. 👍😌",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'haunted_catacombs_05',
        title: "The Altar of Bone",
        description: "You find a crude altar made of piled skulls and bones 💀. A single, black candle burns with a flame that casts no heat. 🕯️🔥",
        emojis: ['💀', '🕯️', '🩸', '✨'],
        eventType: 'realm_specific',
        realm: "Haunted Catacombs",
        options: [
            {
                text: 'Make an offering of blood.',
                emoji: '🩸',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Blood Pact", description: "Permanently gain +5% Attack, but lose -5% Max Health.", type: 'buff', modifiers: { percent: { attackPower: 0.05, maxHealth: -0.05 } } }], duration_ms: Infinity },
                    resultText: "You offer a drop of blood 🩸. The flame flares, granting you greater power at the cost of some of your vitality. 😈💪",
                    outcomeEmoji: '😈'
                }
            },
            {
                text: 'Extinguish the flame.',
                emoji: '💨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Soul's Peace", description: "Permanently gain +5% Max Health.", type: 'buff', modifiers: { percent: { maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You snuff out the unnatural flame 💨. A chorus of relieved whispers echoes as trapped spirits are freed. Their gratitude strengthens you. 😇❤️",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Take the candle.',
                emoji: '🕯️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o5', rarity: 'rare' }, // Book of Secrets
                    resultText: "You take the candle 🕯️. It melts away, revealing a strange, secret-filled book in its place. 📖✨",
                    outcomeEmoji: '📖'
                }
            },
            {
                text: 'Topple the altar.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 50 },
                    resultText: "You kick the altar over 💥. The bones scatter, revealing a few coins that were hidden inside. 💰🪙",
                    outcomeEmoji: '💰'
                }
            }
        ]
    }
];