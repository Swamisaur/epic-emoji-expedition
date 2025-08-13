/**
 * @file data/events/tangledJungle_4.ts
 * @description Contains the fourth batch of events specific to the Tangled Jungle realm.
 * This file is part of Task 7.3 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const tangledJungleEvents_4: GameEvent[] = [
    {
        id: 'tangled_jungle_10_sapling',
        title: 'The World-Tree Sapling',
        description: 'Where you planted the seed 🌱, a colossal, luminous tree 🌳 now touches the sky. It grew in mere moments. It offers you a single gift for giving it life. 🙏',
        emojis: ['🌳', '✨', '🍎', '🙏'],
        eventType: 'realm_specific',
        realm: 'Tangled Jungle',
        requiredFlag: 'world_seed_planted',
        options: [
            {
                text: 'Take its fruit',
                emoji: '🍎',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: 'You pluck a fruit of pure light and eat it 🍎. Your wounds, weariness, and worries all vanish. You are fully healed. 😇',
                    outcomeEmoji: '😇',
                },
            },
            {
                text: 'Take its bark',
                emoji: '🛡️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 't10', rarity: 'legendary' }, // Golden Fleece
                    resultText: 'You peel a piece of its bark 🛡️. It hardens in your hand into a piece of legendary, living armor. 🤩',
                    outcomeEmoji: '🤩',
                },
            },
            {
                text: 'Climb its branches',
                emoji: '🧗',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 5 }, // Go to boss
                    resultText: 'You climb into the canopy and see the entire realm laid out before you 🧗. You easily spot the direct path to the Guardian. 🚀',
                    outcomeEmoji: '🚀',
                },
            },
            {
                text: 'Listen to its song',
                emoji: '🎶',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Song of Creation', description: 'Permanently gain +5% Crit Chance and +10% Crit Damage.', type: 'buff', modifiers: { percent: { critChance: 0.05, critDamage: 0.1 } } }], duration_ms: Infinity },
                    resultText: 'You listen to the rustling of its leaves 🎶 and learn a primal secret of creation and destruction. 🧠',
                    outcomeEmoji: '🧠',
                },
            },
        ],
    },
    {
        id: 'tangled_jungle_11_bloodgod',
        title: 'The Blood God\'s Boon',
        description: 'The altar where you made your sacrifice now glows with an intense, crimson light 🩸. It offers you its final, terrible blessing. 🙏',
        emojis: ['🩸', '🗿', '💪', '😈'],
        eventType: 'realm_specific',
        realm: 'Tangled Jungle',
        requiredFlag: 'primal_altar_sacrifice',
        options: [
            {
                text: 'Accept the Blood God\'s Power',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Blood Rage', description: 'Permanently +20% Attack Power, but -10% Max Health.', type: 'buff', modifiers: { percent: { attackPower: 0.2, maxHealth: -0.1 } } }], duration_ms: Infinity },
                    resultText: 'You accept the dark pact 💪. Your muscles swell with power, but your life force feels permanently drained. 😈',
                    outcomeEmoji: '😈',
                },
            },
            {
                text: 'Offer another sacrifice',
                emoji: '🩸',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "God's Favor", description: "+30% to all core stats for 3 minutes.", type: 'buff', modifiers: { percent: { attackPower: 0.3, maxHealth: 0.3, attackSpeed: 0.3 } } }], duration_ms: 180000 },
                    resultText: 'The altar takes your devotion and grants you a colossal, temporary buff to all stats for 3 minutes. 🔥',
                    outcomeEmoji: '🔥',
                },
            },
            {
                text: 'Destroy the altar',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'm8', rarity: 'legendary' }, // Scythe of Reaping
                    resultText: 'You shatter the altar 💥. The dark magic implodes and solidifies into a terrifying, soul-reaping weapon. 💀',
                    outcomeEmoji: '💀',
                },
            },
            {
                text: 'Deny the dark power',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: 'You refuse the pact 🙏. The altar cracks, and the light within fades. The jungle seems to breathe a sigh of relief, healing your wounds. ❤️‍🩹',
                    outcomeEmoji: '❤️‍🩹',
                },
            },
        ],
    },
];