/**
 * @file data/events/celebrity_legends_4.ts
 * @description Contains a batch of celebrity-specific "Encounter with a Legend" events.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const celebrityLegendEvents_4: GameEvent[] = [
    {
        id: 'legend_chopra_01',
        title: "Encounter with the Global Icon",
        description: "'A global conquest,' the King rasps. 'But you are stretched thin. One foot in each world means you stand firmly in neither.'",
        emojis: ['🌍', '🎬', '👑', '🎶'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            { text: '"I will conquer both worlds."', emoji: '💪', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_chopra_conquer' }, resultText: 'Your boundless ambition makes you powerful and incredibly lucky.', outcomeEmoji: '🔥' } },
            { text: '"I am an unstoppable force."', emoji: '🚀', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_chopra_unstoppable' }, resultText: 'Your drive is immense. You become devastatingly powerful, but the hustle makes you fragile.', outcomeEmoji: '💥' } },
            { text: '"My roots are my strength."', emoji: '❤️', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_chopra_roots' }, resultText: 'You draw power from your heritage, making you incredibly resilient and tough.', outcomeEmoji: '🛡️' } },
            { text: '"I am... exhausted."', emoji: '😩', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_chopra_exhausted' }, resultText: 'The constant jet-lag and pressure have taken their toll, making your movements sluggish.', outcomeEmoji: '😔' } }
        ]
    },
    {
        id: 'legend_bhatt_01',
        title: "Encounter with the Rising Star",
        description: "'A rising star,' the King concedes. 'You have the talent. But the shadow of your legacy is long. Can you truly shine on your own?'",
        emojis: ['✨', '🎬', '🌟', '💖'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            { text: '"My work speaks for itself."', emoji: '🎭', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_bhatt_work' }, resultText: 'You let your craft define you. Your strikes become incredibly precise and devastatingly critical.', outcomeEmoji: '🎯' } },
            { text: '"I am the student of the year, every year."', emoji: '🎓', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_bhatt_student' }, resultText: 'Your versatility is your strength, granting a balanced boost to all your abilities.', outcomeEmoji: '😇' } },
            { text: '"I will build my own dynasty."', emoji: '👑', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_bhatt_dynasty' }, resultText: 'Your ambition to forge your own path brings you immense fortune.', outcomeEmoji: '💰' } },
            { text: '"The criticism is deafening."', emoji: '😥', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_bhatt_criticism' }, resultText: 'The constant noise has shaken your confidence, making your attacks less accurate.', outcomeEmoji: '😤' } }
        ]
    }
];