/**
 * @file data/events/madKingsVault_4.ts
 * @description Contains the fourth batch of events specific to The Mad King's Vault realm.
 * This file is part of Task 7.4 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const madKingsVaultEvents_4: GameEvent[] = [
    {
        id: 'mad_kings_vault_10_chessboard',
        title: "The Grandmaster's Game",
        description: "A spectral chessboard ♟️ is laid out before you, the pieces moving on their own. A ghostly voice whispers, 'Make a move, challenger. Your choice will define your path.' 🤔",
        emojis: ['♟️', '🐴', '👑', '💥'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'Advance the Pawn',
                emoji: '♟️',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "A simple, effective move 👍. The board shifts, and you find yourself one step closer to your goal. ✅",
                    outcomeEmoji: '👍'
                }
            },
            {
                text: 'Sacrifice the Knight',
                emoji: '🐴',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Knight's Gambit", description: "A sacrifice for a tactical advantage. +40% Crit Damage for 2 minutes. 💥", type: 'buff', modifiers: { percent: { critDamage: 0.40 } } }], duration_ms: 120000 },
                    resultText: "A bold gambit! 🐴 Losing the knight opens up a devastating line of attack. You feel your blows become incredibly potent. 💥",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Castle the King',
                emoji: '👑',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Fortified Position", description: "A defensive maneuver. +40% Max Health for 90 seconds. 🛡️", type: 'buff', modifiers: { percent: { maxHealth: 0.40 } } }], duration_ms: 90000 },
                    resultText: "You secure your king 👑. The board shifts to a defensive posture, granting you immense, temporary resilience. 🛡️",
                    outcomeEmoji: '🛡️'
                }
            },
            {
                text: 'Flip the board',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { 
                        effects: [{ 
                            name: "Board Flip Fumble", 
                            description: "The chaos is disorienting. -10% Attack Power for 90s. 🤕", 
                            type: 'debuff', 
                            modifiers: { percent: { attackPower: -0.10 } } 
                        }], 
                        duration_ms: 90000 
                    },
                    resultText: "You flip the board! 💥 The resulting chaos is disorienting and weakens your resolve. 🤕",
                    outcomeEmoji: '🤕'
                }
            }
        ]
    },
    {
        id: 'mad_kings_vault_11_echo',
        title: "The Mad King's Echo",
        description: "A shimmering echo of the Mad King himself 👑 appears on his throne, laughing maniacally 🤪. 'My treasure! My beautiful, beautiful taxes! Would you like to see my masterpiece of fiscal policy?' 🧾",
        emojis: ['👑', '👻', '🧾', '🤪'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: '"Yes, your majesty." (Cost: 300 gold)',
                emoji: '🧐',
                cost: 300,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Prosperity Tax", description: "A wise investment. Permanently gain +2% to all core stats. 📈", type: 'buff', modifiers: { percent: { attackPower: 0.02, maxHealth: 0.02, attackSpeed: 0.02 } } }], duration_ms: Infinity },
                    resultText: "He implements the 'Prosperity Tax.' 📈 You pay the fee, but you feel the investment making you permanently stronger in every way. ✨",
                    outcomeEmoji: '📈'
                }
            },
            {
                text: '"Your tax policy is flawed."',
                emoji: '🤓',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Intellectual Debate", description: "The debate sharpens your mind. Permanently gain +5% Crit Chance. 🧠", type: 'buff', modifiers: { percent: { critChance: 0.05 } } }], duration_ms: Infinity },
                    resultText: "He is intrigued! 🤔 You spend an hour debating fiscal policy. You gain no treasure, but the intellectual exercise permanently sharpens your tactical mind. 🧠",
                    outcomeEmoji: '🧠'
                }
            },
            {
                text: '"Can I have some treasure?"',
                emoji: '🤑',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -3 },
                    resultText: "'OF COURSE!' he bellows 😈. A trapdoor opens beneath you, sending you tumbling down a long slide back to the start of the vault. 😭",
                    outcomeEmoji: '😭'
                }
            },
            {
                text: '"I\'m more of a \'smash the state\' type."',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Bureaucratic Inefficiency", description: "He curses you with red tape. Permanently lose 5% Attack Speed. 😠", type: 'debuff', modifiers: { percent: { attackSpeed: -0.05 } } }], duration_ms: Infinity },
                    resultText: "He laughs even harder 😂. 'An anarchist! How droll!' He curses you with endless paperwork and regulations, permanently slowing your actions. 😠",
                    outcomeEmoji: '😠'
                }
            }
        ]
    }
];