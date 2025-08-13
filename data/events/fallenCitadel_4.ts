/**
 * @file data/events/fallenCitadel_4.ts
 * @description Contains the fourth batch of events specific to the Fallen Citadel realm.
 * This file is part of Task 7.1 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const fallenCitadelEvents_4: GameEvent[] = [
    {
        id: 'fallen_citadel_10_protocol',
        title: "The Last Stand",
        description: "You find a sealed chamber with a large, ominous lever 🕹️, matching the description in the Captain's journal. This will activate the citadel's final defense. 🛡️💥",
        emojis: ['⚙️', '🛡️', '💥', '🕹️'],
        eventType: 'realm_specific',
        realm: "Fallen Citadel",
        requiredFlag: 'citadel_protocol_known',
        options: [
            {
                text: 'Activate the protocol',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 5 }, // Go straight to the boss
                    resultText: "You pull the lever 💥. Golems of stone and steel rise from the walls, marching past you to clear the entire path to the Guardian's chamber! 🚀🤖",
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Loot the control room',
                emoji: '🤑',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o10', rarity: 'legendary' }, // Aegis of the Gods
                    resultText: "You ignore the lever and instead find the emergency armory chest 🤑. Inside is a shield of legendary power. 🤩🛡️",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Sabotage the protocol',
                emoji: '😈',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Arcane Backlash", description: "The machinery shorts out, shocking you. -15% Crit Damage for 3 minutes.", type: 'debuff', modifiers: { percent: { critDamage: -0.15 } } }], duration_ms: 180000 },
                    resultText: "You smash the controls 😈. The delicate machinery explodes with arcane energy, leaving your senses scrambled. 😖💥",
                    outcomeEmoji: '😖'
                }
            },
            {
                text: 'Leave it untouched',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Activating this seems... final 🤔. You decide to face the citadel's horrors on your own terms. 😌🚶",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'fallen_citadel_11',
        title: "The Whispering Well",
        description: "A deep well 💧 in the central courtyard whispers forgotten secrets 🤫 of the castle on a cold draft. 🌬️",
        emojis: ['💧', '🤫', '🪙', '👂'],
        eventType: 'realm_specific',
        realm: "Fallen Citadel",
        options: [
            {
                text: 'Listen for tactical secrets',
                emoji: '👂',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Whispered Tactics", description: "+15% Crit Chance for 2 minutes.", type: 'buff', modifiers: { percent: { critChance: 0.15 } } }], duration_ms: 120000 },
                    resultText: "The well whispers of a guardsman's secret fighting style 👂, showing you where to strike. 🎯⚔️",
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: 'Listen for rumors of treasure',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 225 },
                    resultText: "A ghostly voice tells you of a loose brick in the wall nearby 🧱. Behind it, you find a small bag of gold. 🪙💰",
                    outcomeEmoji: '🪙'
                }
            },
            {
                text: 'Drop a coin in',
                emoji: '🪙',
                cost: 25,
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.30 },
                    resultText: "The well accepts your offering 🪙. A cool, spectral mist rises and mends 30% of your max health. ❤️‍🩹✨",
                    outcomeEmoji: '❤️‍🩹'
                }
            },
            {
                text: 'Yell into the well',
                emoji: '🗣️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Your voice echoes back at you 🗣️. The whispers fall silent. You feel a bit foolish. 🤷‍♂️",
                    outcomeEmoji: '🤷'
                }
            }
        ]
    }
];