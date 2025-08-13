/**
 * @file data/events/piratesCove_3.ts
 * @description Contains the third batch of events specific to the Pirate's Cove realm.
 * This file is part of Task 6 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const piratesCoveEvents_3: GameEvent[] = [
    {
        id: 'pirate_cove_09',
        title: "Tidal Pool Treasures",
        description: "You find a large, serene tidal pool teeming with colorful life 🐠. Strange objects glitter at the bottom. 💎✨",
        emojis: ['🐠', '🐚', '💎', '🦀'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Reach for the glittering pearl.',
                emoji: '⚪',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r3', rarity: 'rare' }, // Gem of Power
                    resultText: "You snatch the pearl ⚪. It pulses with a soft light, imbuing you with power. ✨💪",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Reach for the oddly shaped shell.',
                emoji: '🐚',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'found_conch_shell' },
                    resultText: "The shell is a conch 🐚 that hums with a deep, resonant magic. It feels important. You keep it. 🎶✨",
                    outcomeEmoji: '🎶'
                }
            },
            {
                text: 'Try to catch a fish.',
                emoji: '🎣',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.15 },
                    resultText: "You catch a small, silvery fish 🎣 and eat it. It's surprisingly restorative! 😋❤️‍🩹",
                    outcomeEmoji: '😋'
                }
            },
            {
                text: 'Poke the grumpy-looking crab.',
                emoji: '🦀',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.10 },
                    resultText: "The crab pinches your finger HARD 🦀, dealing 10% of your max health in damage. You deserved that. 🤕😂",
                    outcomeEmoji: '🤕'
                }
            }
        ]
    },
    {
        id: 'pirate_cove_10',
        title: "A Ship in a Bottle",
        description: "You find a miraculously intact ship in a bottle 🍾 half-buried in the sand. It seems impossible, as the ship inside is far too detailed and large. ⛵✨",
        emojis: ['🍾', '⛵', '✨', '💥'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Break the bottle.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: "You smash the bottle 💥. The ship expands to full size for a moment before crumbling into a pile of enchanted, valuable wood. 💰🪵",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Keep it as a trinket.',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r8', rarity: 'rare' }, // Broken Compass
                    resultText: "You decide to keep the fascinating object 🧐. It feels strangely significant. 🧭✨",
                    outcomeEmoji: '🧭'
                }
            },
            {
                text: 'Uncork it.',
                emoji: '😮',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "You uncork the bottle 🍾 and a tiny, magical gale sucks you in and spits you out far down the beach! What a ride! 💨😎",
                    outcomeEmoji: '💨'
                }
            },
            {
                text: 'Leave the curiosity alone.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "This is some kind of weird magic 🧙‍♂️. You decide to leave it be. 👍😌",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];