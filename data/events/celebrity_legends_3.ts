/**
 * @file data/events/celebrity_legends_3.ts
 * @description Contains a batch of celebrity-specific "Encounter with a Legend" events.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const celebrityLegendEvents_3: GameEvent[] = [
    {
        id: 'legend_bachchan_01',
        title: "Encounter with the Shahenshah",
        description: "'A long and storied reign,' the King gasps. 'But every superstar becomes a memory. How will they remember you, the star of the millennium?'",
        emojis: ['👑', '🎬', '🔥', '👳'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            { text: '"As the Angry Young Man."', emoji: '🔥', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_bachchan_angry' }, resultText: 'You embrace your fiery beginnings. Your power is immense, but the rage makes you reckless.', outcomeEmoji: '💥' } },
            { text: '"As the Star of the Millennium."', emoji: '✨', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_bachchan_star' }, resultText: 'Your legacy is one of unmatched versatility and longevity, granting a balanced boost to all your abilities.', outcomeEmoji: '😇' } },
            { text: '"Through my family\'s legacy."', emoji: '❤️', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_bachchan_legacy' }, resultText: 'You choose to build a dynasty. Your resilience and fortune grow, securing your future.', outcomeEmoji: '💪' } },
            { text: '"They will not forget. I am eternal."', emoji: '😠', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_bachchan_eternal' }, resultText: 'Your immense ego makes you complacent. Your movements become slower.', outcomeEmoji: '😤' } }
        ]
    },
    {
        id: 'legend_rekha_01',
        title: "Encounter with the Diva",
        description: "'An evergreen performance,' the King whispers. 'But beauty is a mask, and the mystery is a cage. Who are you when the camera stops rolling?'",
        emojis: ['💃', '✨', '🌹', '🎬'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            { text: '"I am an enigma."', emoji: '🤫', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_rekha_enigma' }, resultText: 'Your mysterious allure makes you incredibly lucky and your strikes more precise.', outcomeEmoji: '✨' } },
            { text: '"I am a timeless icon."', emoji: '👑', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_rekha_icon' }, resultText: 'Your iconic status makes you incredibly resilient and difficult to harm.', outcomeEmoji: '🛡️' } },
            { text: '"I am whatever the role demands."', emoji: '🎭', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_rekha_versatile' }, resultText: 'Your versatility is your greatest asset, granting a balanced boost to all your abilities.', outcomeEmoji: '😇' } },
            { text: '"I am... alone."', emoji: '💔', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_rekha_alone' }, resultText: 'The isolation of stardom takes its toll, making you more fragile.', outcomeEmoji: '😔' } }
        ]
    },
    {
        id: 'legend_tendulkar_01',
        title: "Encounter with the God of Cricket",
        description: "'A perfect innings,' the King concedes. 'A century of centuries. But the crowd's roar fades. What is a God without believers?'",
        emojis: ['🏏', '🏆', '🇮🇳', '🙏'],
        eventType: 'common',
        isPostGameEvent: true,
        options: [
            { text: '"I play for the love of the game."', emoji: '❤️', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_tendulkar_love' }, resultText: 'Your pure passion for the sport grants a balanced boost to all your abilities.', outcomeEmoji: '😇' } },
            { text: '"I carry the hopes of a billion people."', emoji: '🙏', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_tendulkar_hopes' }, resultText: 'The weight of a nation makes you powerful and resilient.', outcomeEmoji: '💪' } },
            { text: '"My technique is flawless."', emoji: '✨', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_tendulkar_technique' }, resultText: 'Your perfect technique makes your strikes unerringly precise and accurate.', outcomeEmoji: '🎯' } },
            { text: '"The pressure is immense."', emoji: '😥', consequence: { type: EventConsequenceType.SET_FLAG, payload: { flag: 'legend_tendulkar_pressure' }, resultText: 'The constant pressure to perform has made your movements more deliberate and slow.', outcomeEmoji: '😤' } }
        ]
    }
];
