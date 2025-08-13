/**
 * @file data/events/piratesCove_5.ts
 * @description Contains the fifth batch of events specific to the Pirate's Cove realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const piratesCoveEvents_5: GameEvent[] = [
    {
        id: 'pirate_cove_13_grog',
        title: "The Captain's Grog",
        description: "In a rowdy pirate tavern 🍻, the captain slides a frothing tankard of his infamous grog towards you. 'A drink for the fearsome adventurer!' he bellows. 'On the house!' 🏴‍☠️",
        emojis: ['🍻', '🏴‍☠️', '💪', '😵'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Down it in one go!',
                emoji: '💪',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.50 },
                    resultText: "You drain the tankard without flinching. The captain roars with laughter. 'A true sailor's stomach!' The potent brew heals 50% of your max health.",
                    outcomeEmoji: '😎'
                }
            },
            {
                text: 'Just a small sip...',
                emoji: '🤔',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.10 },
                    resultText: "You take a cautious sip. It's strong, but you manage. You feel a small bit of warmth and restoration, healing 10% of your max health.",
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Start a bar brawl!',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "You flip the table! In the ensuing chaos, you slip out the back door, getting a head start on your journey.",
                    outcomeEmoji: '💨'
                }
            },
            {
                text: 'Spill the drink.',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Captain's Ire", description: "The captain is insulted! -10% Accuracy for 2 minutes.", type: 'debuff', modifiers: { percent: { accuracy: -0.10 } } }], duration_ms: 120000 },
                    resultText: "You knock the tankard over. The tavern goes silent. The captain glares at you, and you feel his angry gaze will make you miss your next shots.",
                    outcomeEmoji: '😤'
                }
            }
        ]
    },
    {
        id: 'pirate_cove_14_kraken_prize',
        title: "The Kraken's Prize",
        description: "A colossal, dead Kraken tentacle 🐙 lies on the beach, its suction cups still clutching a treasure chest. 🎁",
        emojis: ['🐙', '🎁', '💪', '😋'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Pry it open with brute force!',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r10', rarity: 'legendary' }, // Infinity Stone
                    resultText: "With a mighty heave, you wrench the chest free from the tentacle's grasp. Inside is a legendary treasure!",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Tickle the tentacle with a feather.',
                emoji: '🪶',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r10', rarity: 'rare' }, // Infinity Stone (rare version)
                    resultText: "A strange tactic... but it works! The tentacle spasms, releasing the chest. Inside is a rare treasure!",
                    outcomeEmoji: '😂'
                }
            },
            {
                text: 'Cook some calamari.',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: "A rare delicacy! You cook up a slice of the tentacle and eat it. You are healed to full health!",
                    outcomeEmoji: '😋'
                }
            },
            {
                text: 'Leave it alone.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Who knows where the rest of that thing is. You wisely decide to leave it be.",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'pirate_cove_15_mermaid',
        title: "The Mermaid's Song",
        description: "A beautiful mermaid 🧜‍♀️ sings a sorrowful song on a rock. She looks at you with tear-filled eyes. 'My pearl... stolen by that fiend, Captain Squawk...' 😭",
        emojis: ['🧜‍♀️', '😭', '💖', '🍀'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Comfort her',
                emoji: '💖',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_missing', amount: 0.50 },
                    resultText: "Your comforting words seem to ease her sorrow. She gifts you a magical kiss that heals 50% of your missing health.",
                    outcomeEmoji: '🥰'
                },
                genderedConsequence: {
                    male: {
                        type: EventConsequenceType.STAT_MODIFIER,
                        payload: { effects: [{ name: "Mermaid's Favor", description: "She is charmed by you. Permanently gain +2% Fortune.", type: 'buff', modifiers: { percent: { luck: 0.02 } } }], duration_ms: Infinity },
                        resultText: "She is charmed by your rugged compassion. 'A true hero of the sea,' she whispers, granting you a permanent blessing of good fortune.",
                        outcomeEmoji: '😊'
                    },
                    female: {
                        type: EventConsequenceType.ITEM_REWARD,
                        payload: { itemId: 'r9', rarity: 'rare' }, // Heart Amulet
                        resultText: "'Sister of the sea,' she says, 'you understand.' She gifts you a beautiful amulet, woven from sea-jewels, as a token of your bond.",
                        outcomeEmoji: '💖'
                    }
                }
            },
            {
                text: 'Offer a shiny gem',
                emoji: '💎',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Mermaid's Favor", description: "Permanently gain +5% Fortune.", type: 'buff', modifiers: { percent: { luck: 0.05 } } }], duration_ms: Infinity },
                    resultText: "'A lovely gift!' she says. 'While it is not my pearl, your kindness deserves a reward.' She grants you a permanent blessing of good fortune.",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Splash her.',
                emoji: '💦',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Salty Eyes", description: "-10% Accuracy for 90s.", type: 'debuff', modifiers: { percent: { accuracy: -0.10 } } }], duration_ms: 90000 },
                    resultText: "'How rude!' She flicks her tail, splashing salty sea water directly into your eyes. It stings!",
                    outcomeEmoji: '😠'
                }
            },
            {
                text: 'Swim away slowly.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Her song is enchanting, but dangerous. You back away before you're drawn in.",
                    outcomeEmoji: '😬'
                }
            }
        ]
    },
    {
        id: 'pirate_cove_16_rigging_race',
        title: "Rigging Race",
        description: "A storm is brewing ⛈️. The mast of a shipwreck sways precariously. At the top, a flag flutters, attached to a heavy-looking coin purse. 💰",
        emojis: ['⛈️', '💰', '🏃', '🪓'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Scramble up the rigging!',
                emoji: '🏃',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 500 },
                    resultText: "You move like the wind, scrambling up the rigging with ease to claim the prize before the storm hits!",
                    outcomeEmoji: '😎'
                }
            },
            {
                text: 'Try to climb it anyway.',
                emoji: '🧗',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.10 },
                    resultText: "You're not fast enough. A gust of wind sends you tumbling to the deck, taking 10% of your max health in damage.",
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Chop down the mast.',
                emoji: '🪓',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "'Timber!' A crude but effective method. You collect a smaller, but still substantial, reward from the fallen mast.",
                    outcomeEmoji: '👍'
                }
            },
            {
                text: 'Wait for the storm to pass.',
                emoji: '⏳',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You wait. When the storm passes, the flag and the purse have been blown away by the wind.",
                    outcomeEmoji: '🤷'
                }
            }
        ]
    }
];
