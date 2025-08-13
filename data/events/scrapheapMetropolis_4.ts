/**
 * @file data/events/scrapheapMetropolis_4.ts
 * @description Contains the fourth batch of events specific to the Scrapheap Metropolis realm.
 * This file is part of Task 7.2 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const scrapheapMetropolisEvents_4: GameEvent[] = [
    {
        id: 'scrapheap_metropolis_10_aicore',
        title: 'The Unstable Power Source',
        description: 'You find what the AI core needs: a humming, unstable Isotope-X battery ☢️, leaking dangerous energy. It could power the AI... or it could power YOU. 🤔',
        emojis: ['☢️', '🔋', '🤖', '✨'],
        eventType: 'realm_specific',
        realm: 'Scrapheap Metropolis',
        requiredFlag: 'ai_core_quest_active',
        options: [
            {
                text: 'Bring the battery to the AI Core',
                emoji: '🤖',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Sentinel Protocol', description: 'Permanently gain +5% to all core stats. 🤖', type: 'buff', modifiers: { percent: { attackPower: 0.05, maxHealth: 0.05, attackSpeed: 0.05 } } }], duration_ms: Infinity },
                    resultText: 'The AI absorbs the power 🔋. "Systems optimal. Alliance protocol initiated." It optimizes your gear, granting a permanent, balanced boost. 😇✨',
                    outcomeEmoji: '😇',
                },
            },
            {
                text: 'Keep the power for yourself',
                emoji: '😈',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Unstable Power', description: 'Permanently gain +15% Attack Power. 🔥', type: 'buff', modifiers: { percent: { attackPower: 0.15 } } }], duration_ms: Infinity },
                    resultText: 'You absorb the battery\'s raw energy 😈. The power is immense and makes you permanently stronger, but you hear a faint, sad beep in the distance. 😢🤖',
                    outcomeEmoji: '🔥',
                },
            },
            {
                text: 'Try to stabilize it first',
                emoji: '🔧',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Energy Discharge', description: 'It explodes! 💥 -15% Crit Damage for 3 minutes.', type: 'debuff', modifiers: { percent: { critDamage: -0.15 } } }], duration_ms: 180000 },
                    resultText: 'Your tinkering destabilizes the battery 🔧, causing a minor explosion that scrambles your focus. 💥😖',
                    outcomeEmoji: '💥',
                },
            },
            {
                text: 'Sell it to a junker',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 500 },
                    resultText: 'A passing junker sees the battery and offers you a massive amount of gold for it 💰, no questions asked. 🤑🤝',
                    outcomeEmoji: '🤑',
                },
            },
        ],
    },
    {
        id: 'scrapheap_metropolis_11',
        title: 'A Malfunctioning Traffic Light',
        description: 'A rusty traffic light 🚦 is stuck, flashing all three colors at once 🔴🟡🟢. It speaks in a monotone voice: "Please... choose... a... lane."',
        emojis: ['🚦', '🔴', '🟡', '🟢'],
        eventType: 'realm_specific',
        realm: 'Scrapheap Metropolis',
        options: [
            {
                text: 'Choose Red (Stop)',
                emoji: '🔴',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: '"Stopping... traffic." ✋ A barrier slams down in front of you, forcing you to backtrack. 🔴🚧',
                    outcomeEmoji: '✋',
                },
            },
            {
                text: 'Choose Yellow (Yield)',
                emoji: '🟡',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: '"Yielding... right... of... way." 🙏 The light opens a compartment and yields a small toll of gold to you. 🟡💰',
                    outcomeEmoji: '💰',
                },
            },
            {
                text: 'Choose Green (Go)',
                emoji: '🟢',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: '"Proceed... with... caution." ✅ A hidden panel opens in the road, revealing a shortcut. 🟢🚀',
                    outcomeEmoji: '🚀',
                },
            },
            {
                text: 'Wait for it to fix itself',
                emoji: '⏳',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You wait. ⏳ It continues to flash all three colors. It is not going to fix itself. You walk around it. 🤷‍♂️🚶',
                    outcomeEmoji: '🤷',
                },
            },
        ],
    },
];