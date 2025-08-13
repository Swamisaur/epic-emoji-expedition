/**
 * @file data/events/contaminatedSewers_3.ts
 * @description Contains the third batch of events specific to the Contaminated Sewers realm.
 * This file is part of Task 7.3 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const contaminatedSewersEvents_3: GameEvent[] = [
    {
        id: 'contaminated_sewers_08_grate',
        title: 'The Great Filter',
        description: 'A colossal, sparking electrical grate ⚡️ blocks the main sewer channel. The water rushing through it is moving dangerously fast. 🌊',
        emojis: ['⚡️', '🌊', '⚙️', '💥'],
        eventType: 'realm_specific',
        realm: 'Contaminated Sewers',
        options: [
            {
                text: 'Overload it',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'System Shock', description: 'Permanently gain +20% Crit Damage.', type: 'buff', modifiers: { percent: { critDamage: 0.2 } } }], duration_ms: Infinity },
                    resultText: 'You jam your weapon into the controls 💥. The resulting shock courses through you, frying some of your nerves but sharpening others to a razor edge. 🧠',
                    outcomeEmoji: '💥',
                },
            },
            {
                text: 'Rewire it',
                emoji: '🔧',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: 'A smaller shock jolts you as you successfully rewire the grate 🔧 to open a service tunnel, bypassing a large section of the sewer. 🚀',
                    outcomeEmoji: '🚀',
                },
            },
            {
                text: 'Swim through the muck',
                emoji: '🏊',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Sewer Gunk', description: 'Permanently lose 5% Attack Speed, but find 500 gold.', type: 'debuff', modifiers: { percent: { attackSpeed: -0.05 } } }], duration_ms: Infinity },
                    resultText: 'You dive into the disgusting sludge 🏊. You make it through, but the filth weighs you down permanently. You did find a huge sack of lost gold, though. 💰',
                    outcomeEmoji: '💰',
                },
            },
            {
                text: 'Look for a manual crank',
                emoji: '⚙️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You find a rusty crank ⚙️. It takes ages, but you slowly open the grate. You\'re safe, but you gained no advantage. 🤷',
                    outcomeEmoji: '🤷',
                },
            },
        ],
    },
    {
        id: 'contaminated_sewers_09_blueprint',
        title: 'The Leaky Blueprint',
        description: 'You find a waterlogged, but mostly readable, blueprint 📜 for a device called a "Gunk-Converter 9000." ⚙️🤔',
        emojis: ['📜', '⚙️', '🤔', '🚽'],
        eventType: 'realm_specific',
        realm: 'Contaminated Sewers',
        options: [
            {
                text: 'Try to build it from scrap',
                emoji: '🛠️',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'gunk_converter_built' },
                    resultText: 'Following the diagrams, you cobble together a strange, humming machine 🛠️. It seems to be working... ✨',
                    outcomeEmoji: '✨',
                },
            },
            {
                text: 'Sell it to a scavenger',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: 'A nearby scavenger eagerly trades a hefty bag of gold for the strange blueprint. 🤑',
                    outcomeEmoji: '🤑',
                },
            },
            {
                text: 'Use it as toilet paper',
                emoji: '🚽',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'It\'s not very absorbent 🚽. You feel a brief moment of regret before continuing on. 🤢',
                    outcomeEmoji: '🤢',
                },
            },
            {
                text: 'Eat it for the fiber',
                emoji: '😋',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Paper Jam', description: 'You have a stomach ache. -5% to all core stats for 2 minutes.', type: 'debuff', modifiers: { percent: { attackPower: -0.05, maxHealth: -0.05, attackSpeed: -0.05 } } }], duration_ms: 120000 },
                    resultText: 'It tastes like soggy paper and regret 😋. Your stomach is not pleased. 😖',
                    outcomeEmoji: '😖',
                },
            },
        ],
    },
];