/**
 * @file data/events/contaminatedSewers_4.ts
 * @description Contains the fourth batch of events specific to the Contaminated Sewers realm.
 * This file is part of Task 7.3 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const contaminatedSewersEvents_4: GameEvent[] = [
    {
        id: 'contaminated_sewers_10_converter',
        title: 'The Gunk-Converter 9000',
        description: 'Your creation hums, ready for input ⚙️. A slot opens, labeled: "INSERT ORGANIC OR MINERAL MATTER FOR CONVERSION." ✨',
        emojis: ['⚙️', '✨', '💰', '❤️‍🔥'],
        eventType: 'realm_specific',
        realm: 'Contaminated Sewers',
        requiredFlag: 'gunk_converter_built',
        options: [
            {
                text: 'Feed it your essence',
                emoji: '❤️‍🔥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { 
                        effects: [{ 
                            name: 'Bio-Conversion', 
                            description: 'Permanently gain +15% to all core stats.', 
                            type: 'buff', 
                            modifiers: { percent: { attackPower: 0.15, maxHealth: 0.15, attackSpeed: 0.15 } } 
                        }], 
                        duration_ms: Infinity 
                    },
                    resultText: 'You offer your life force ❤️‍🔥. The machine converts it into raw power, granting you a PERMANENT +15% to all core stats! ✨',
                    outcomeEmoji: '✨',
                },
            },
            {
                text: 'Feed it 250 gold',
                emoji: '💰',
                cost: 250,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Gilded Power', description: 'The gold is converted into a massive power boost! +25% to all core stats for 3 minutes.', type: 'buff', modifiers: { percent: { attackPower: 0.25, maxHealth: 0.25, attackSpeed: 0.25 } } }], duration_ms: 180000 },
                    resultText: 'The machine consumes your gold 💰 and converts it into a potent, temporary surge of power! 🚀',
                    outcomeEmoji: '🚀',
                },
            },
            {
                text: "Analyze an item's essence",
                emoji: '🔬',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Item Essence', description: 'The item\'s spirit is absorbed, granting you a permanent +10% Crit Damage.', type: 'buff', modifiers: { percent: { critDamage: 0.1 } } }], duration_ms: Infinity },
                    resultText: "You place an item near the machine 🔬. It scans the item's molecular structure, learning its properties and infusing you with a permanent critical edge. 💥",
                    outcomeEmoji: '💥',
                },
            },
            {
                text: 'Kick it',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Overload', description: 'The machine explodes! -15% Attack Power for 2 minutes.', type: 'debuff', modifiers: { percent: { attackPower: -0.15 } } }], duration_ms: 120000 },
                    resultText: 'Your kick causes a critical malfunction 💥. The converter explodes, and the backlash weakens you. 😖',
                    outcomeEmoji: '😖',
                },
            },
        ],
    },
    {
        id: 'contaminated_sewers_11_message',
        title: 'Message in the Sludge',
        description: 'Scrawled on the slimy wall ✍️ are three distinct messages, written by those who came before. 📜',
        emojis: ['✍️', '❤️‍🩹', '🧠', '💥'],
        eventType: 'realm_specific',
        realm: 'Contaminated Sewers',
        options: [
            {
                text: 'Read: "Don\'t give up, skeleton!"',
                emoji: '❤️‍🩹',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: 'The simple, hopeful message resonates with you ❤️‍🩹, mending your wounds and restoring your spirit completely. 😇',
                    outcomeEmoji: '😇',
                },
            },
            {
                text: 'Read: "The rats know the secrets..."',
                emoji: '🧠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Rat-like Cunning', description: 'You gain feral insight! +25% Crit Chance, but -10% Attack Power for 2 minutes.', type: 'buff', modifiers: { percent: { critChance: 0.25, attackPower: -0.1 } } }], duration_ms: 120000 },
                    resultText: 'The mad ramblings grant you a strange, feral insight 🧠, allowing you to spot weaknesses but distracting you from powerful blows. 🤯',
                    outcomeEmoji: '🤯',
                },
            },
            {
                text: 'Read: "Strike the third pipe..."',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Structural Weakness', description: 'You learn a secret of engineering. Permanently gain +5% Crit Damage.', type: 'buff', modifiers: { percent: { critDamage: 0.05 } } }], duration_ms: Infinity },
                    resultText: 'The tactical diagram shows a structural weakness in sewer construction 💥. You can apply this knowledge to your foes. 🎯',
                    outcomeEmoji: '🎯',
                },
            },
            {
                text: 'Wipe the wall clean',
                emoji: '🧼',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You clean the graffiti off the wall 🧼. The sewer is a slightly nicer place now. Good for you. 😌',
                    outcomeEmoji: '😌',
                },
            },
        ],
    },
];