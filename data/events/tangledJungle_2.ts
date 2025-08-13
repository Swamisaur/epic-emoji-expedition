/**
 * @file data/events/tangledJungle_2.ts
 * @description Contains the second batch of events specific to the Tangled Jungle realm.
 * This file is part of Task 7.3 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const tangledJungleEvents_2: GameEvent[] = [
    {
        id: 'tangled_jungle_06_altar',
        title: 'The Primal Altar',
        description: 'You find a blood-stained stone altar 🩸 deep in the jungle 🌳. It hums with a terrifying, ancient power. 😨',
        emojis: ['🩸', '🗿', '🙏', '💥'],
        eventType: 'realm_specific',
        realm: 'Tangled Jungle',
        options: [
            {
                text: 'Offer your blood',
                emoji: '🩸',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'primal_altar_sacrifice' },
                    resultText: 'You slice your palm and offer your life force 🩸. The altar accepts your sacrifice. The jungle seems to notice you. 👀',
                    outcomeEmoji: '👀',
                },
            },
            {
                text: 'Offer a prayer to the Old Gods',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Primal Fear', description: 'Your prayers go unanswered. -10% Crit Chance for 2 minutes.', type: 'debuff', modifiers: { percent: { critChance: -0.1 } } }], duration_ms: 120000 },
                    resultText: 'You pray 🙏, but only silence answers. A profound sense of dread makes your hands tremble. 😨',
                    outcomeEmoji: '😨',
                },
            },
            {
                text: 'Desecrate the altar',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Altar\'s Wrath', description: 'The altar curses you! Permanently lose 5% to all core stats.', type: 'debuff', modifiers: { percent: { attackPower: -0.05, maxHealth: -0.05, attackSpeed: -0.05 } } }], duration_ms: Infinity },
                    resultText: 'You strike the altar 💥. It cracks, releasing a wave of dark energy that permanently weakens your body and soul. 😠',
                    outcomeEmoji: '😠',
                },
            },
            {
                text: 'Leave the dark place',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'This is dark magic 😈. You wisely decide to leave it alone. 👍',
                    outcomeEmoji: '👍',
                },
            },
        ],
    },
    {
        id: 'tangled_jungle_07_vine',
        title: 'The Symbiotic Vine',
        description: 'A strange, pulsating vine 🌿 covered in glowing flowers ✨ snakes towards you. It seems to want to bond with you. 🤔',
        emojis: ['🌿', '✨', '💪', '🧠'],
        eventType: 'realm_specific',
        realm: 'Tangled Jungle',
        options: [
            {
                text: 'Let it bond with your weapon arm',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Vine-Wrapped Arm', description: 'Permanently +20% Attack Speed, but -10% Max Health.', type: 'buff', modifiers: { percent: { attackSpeed: 0.2, maxHealth: -0.1 } } }], duration_ms: Infinity },
                    resultText: 'The vine wraps around your arm 💪, becoming a living brace. You feel incredibly fast, but also strangely fragile. ⚡️',
                    outcomeEmoji: '⚡️',
                },
            },
            {
                text: 'Let it bond with your head',
                emoji: '🧠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Vine-Wrapped Mind', description: 'Permanently +10% Crit Chance & Damage, but -10% Attack Speed.', type: 'buff', modifiers: { percent: { critChance: 0.1, critDamage: 0.1, attackSpeed: -0.1 } } }], duration_ms: Infinity },
                    resultText: 'The vine weaves into your hair 🧠, its pollen sharpening your mind. You feel more tactical, but your movements become more deliberate. 🎯',
                    outcomeEmoji: '🎯',
                },
            },
            {
                text: 'Eat one of its flowers',
                emoji: '🌸',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_missing', amount: 0.75 },
                    resultText: 'The flower is delicious and miraculously restorative 🌸, healing 75% of your missing health! ❤️‍🩹',
                    outcomeEmoji: '❤️‍🩹',
                },
            },
            {
                text: 'Cut it down',
                emoji: '✂️',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: 'You chop the vine ✂️. Its sap bleeds out and hardens into valuable amber. 💰',
                    outcomeEmoji: '💰',
                },
            },
        ],
    },
];