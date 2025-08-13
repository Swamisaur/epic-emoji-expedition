/**
 * @file data/events/piratesCove_4.ts
 * @description Contains the fourth and final batch of events for the Pirate's Cove realm.
 * This file is part of Task 6 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const piratesCoveEvents_4: GameEvent[] = [
    {
        id: 'pirate_cove_11',
        title: "Liar's Dice",
        description: "The ghost of a one-eyed pirate captain 👻 challenges you to a game of Liar's Dice. 'A friendly wager?' he grins, rattling a spectral cup. 🎲💰",
        emojis: ['🎲', '👻', '💰', '🤔'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        options: [
            {
                text: 'Bet 50 Gold.',
                emoji: '💰',
                cost: 50,
                randomConsequences: [
                    {
                        weight: 50,
                        consequence: {
                            type: EventConsequenceType.RESOURCE,
                            payload: { amount: 150 },
                            resultText: "You win! The ghost captain laughs and pays out your winnings. You won 100 gold!",
                            outcomeEmoji: '🤑'
                        }
                    },
                    {
                        weight: 50,
                        consequence: {
                            type: EventConsequenceType.NOTHING,
                            resultText: "'Better luck next time, matey!' The ghost chuckles as he collects your wager.",
                            outcomeEmoji: '😭'
                        }
                    }
                ]
            },
            {
                text: 'Double or Nothing! (100 Gold)',
                emoji: '🤑',
                cost: 100,
                randomConsequences: [
                     {
                        weight: 50,
                        consequence: {
                            type: EventConsequenceType.RESOURCE,
                            payload: { amount: 300 },
                            resultText: "High risk, high reward! Your bold bet pays off, and you win 200 gold!",
                            outcomeEmoji: '🤩'
                        }
                    },
                    {
                        weight: 50,
                        consequence: {
                            type: EventConsequenceType.NOTHING,
                            resultText: "You lose the high-stakes bet. Ouch. The ghost thanks you for the donation.",
                            outcomeEmoji: '😱'
                        }
                    }
                ]
            },
            {
                text: 'Accuse him of cheating.',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Captain's Curse", description: "The ghost curses your clumsiness. -10% Attack Speed for 2 minutes.", type: 'debuff', modifiers: { percent: { attackSpeed: -0.10 } } }], duration_ms: 120000 },
                    resultText: "'Cheat? I never!' he roars, offended 😠. He curses you for the slight before fading away. 😖👻",
                    outcomeEmoji: '😖'
                }
            },
            {
                text: 'Refuse to play.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "'Suit yerself.' The ghost shrugs and continues rattling his dice, ignoring you. 👍🤷‍♂️",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'pirate_cove_12_shrine',
        title: "The Sunken Shrine",
        description: "You come to a circle of standing stones half-submerged in the tide 🌊. The conch you found begins to hum. This must be the place. 🐚✨",
        emojis: ['🌊', '🐚', '✨', '🙏'],
        eventType: 'realm_specific',
        realm: "Pirate's Cove",
        requiredFlag: 'found_conch_shell',
        options: [
            {
                text: 'Blow the conch shell.',
                emoji: '🎶',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Tidal Blessing", description: "Permanently gain +5% to all core stats.", type: 'buff', modifiers: { percent: { attackPower: 0.05, maxHealth: 0.05, attackSpeed: 0.05 } } }], duration_ms: Infinity },
                    resultText: "A deep, resonant note echoes across the water 🎶. The shrine glows, granting you a permanent blessing of the tides. 😇✨",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Smash the conch on the stones.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 400 },
                    resultText: "You smash the shell 💥. The magic within erupts, revealing a hidden cache of pearls and gold. 💎💰",
                    outcomeEmoji: '💎'
                }
            },
            {
                text: 'Offer the conch to the sea.',
                emoji: '🌊',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'm6', rarity: 'legendary' }, // Trident of the Depths
                    resultText: "You toss the shell into the waves 🌊. A moment later, a magnificent, legendary trident washes ashore at your feet. 🔱🤩",
                    outcomeEmoji: '🔱'
                }
            },
            {
                text: 'Ignore the shrine and keep the shell.',
                emoji: '🤷',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You decide to keep the pretty shell and leave the strange shrine alone. 😌👍",
                    outcomeEmoji: '😌'
                }
            }
        ]
    }
];