/**
 * @file data/events/scrapheapMetropolis_5.ts
 * @description Contains the fifth batch of events specific to the Scrapheap Metropolis realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const scrapheapMetropolisEvents_5: GameEvent[] = [
    {
        id: 'scrapheap_metropolis_12_ai_poet',
        title: 'The AI Poet',
        description: 'A discarded terminal flickers to life. "QUERY: WHAT IS... LOVE?" a synthesized voice asks. "INPUT REQUIRED TO COMPLETE POETRY SUBROUTINE." 🤖❤️',
        emojis: ['🤖', '❤️', '🤔', '✍️'],
        eventType: 'realm_specific',
        realm: 'Scrapheap Metropolis',
        options: [
            {
                text: 'Describe the thrill of battle. (Power focus)',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Poetic Power', description: '+15% Attack Power for 2 minutes.', type: 'buff', modifiers: { percent: { attackPower: 0.15 } } }], duration_ms: 120000 },
                    resultText: '"ANALYSIS: LOVE IS... VIOLENCE." The AI processes your input and rewards your insight with a combat optimization routine.',
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Describe the grace of speed. (Speed focus)',
                emoji: '💨',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Poetic Speed', description: '+15% Attack Speed for 2 minutes.', type: 'buff', modifiers: { percent: { attackSpeed: 0.15 } } }], duration_ms: 120000 },
                    resultText: '"ANALYSIS: LOVE IS... MOMENTUM." The AI finds your description elegant and optimizes your motor functions.',
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Tell it a confusing joke.',
                emoji: '😂',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: '"LOGIC ERROR. DOES NOT COMPUTE." The AI dispenses coins in a panic before crashing.',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: '"Baby don\'t hurt me."',
                emoji: '🎶',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.05 },
                    resultText: '"NO MORE." The AI plays a sad 8-bit song and self-destructs, sending a small piece of shrapnel into your arm.',
                    outcomeEmoji: '💔'
                }
            }
        ]
    },
    {
        id: 'scrapheap_metropolis_13_parts_scavenger',
        title: 'The Parts Scavenger',
        description: 'A grimy scavenger with cybernetic eyes offers to upgrade your gear. "Top-tier tech," he rasps, showing you a box of mismatched parts. "Trust me." 👀🔧',
        emojis: ['🔧', '🔩', '🤝', '🤔'],
        eventType: 'realm_specific',
        realm: 'Scrapheap Metropolis',
        options: [
            {
                text: 'Charm him. (Female character)',
                emoji: '🥰',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Good Deal', description: 'Permanently gain +5% Fortune.', type: 'buff', modifiers: { percent: { luck: 0.05 } } }], duration_ms: Infinity },
                    resultText: "The scavenger is flustered by your charm and gives you a genuinely good part that seems to attract wealth.",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Intimidate him. (Male character)',
                emoji: '💪',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Botched Job', description: 'He fumbles the upgrade! -10% Accuracy for 2 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.10 } } }], duration_ms: 120000 },
                    resultText: "He's scared, but his trembling hands botch the installation, making your weapon feel unbalanced.",
                    outcomeEmoji: '😖'
                }
            },
            {
                text: 'Let him work his "magic."',
                emoji: '🎲',
                randomConsequences: [
                    { weight: 50, consequence: { type: EventConsequenceType.HEAL, payload: { healType: 'percent_max', amount: 0.25 }, resultText: "It works! His jury-rigged device sends a restorative pulse through you, healing 25% of your max health.", outcomeEmoji: '❤️‍🩹' } },
                    { weight: 50, consequence: { type: EventConsequenceType.HEAL, payload: { healType: 'percent_max', amount: -0.10 }, resultText: "Sparks fly! His device backfires, shocking you for 10% of your max health.", outcomeEmoji: '🤕' } }
                ]
            },
            {
                text: 'Decline.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You don't trust his 'tech'. You walk away, and he just shrugs.",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'scrapheap_metropolis_14_sentient_vending',
        title: 'The Sentient Vending Machine',
        description: 'A vending machine with a sassy, synthesized voice calls out. "Hey, meatbag! Feeling peckish? I\'ve got the goods!" Its display shows several bizarre options. 🤖🥤',
        emojis: ['🤖', '🥤', '⚡️', '🎨'],
        eventType: 'realm_specific',
        realm: 'Scrapheap Metropolis',
        options: [
            {
                text: 'Drink "Nutrient Paste." (Requires Health focus)',
                emoji: '🤢',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Nutrient Boost', description: 'Permanently gain +10% Max Health.', type: 'buff', modifiers: { percent: { maxHealth: 0.10 } } }], duration_ms: Infinity },
                    resultText: "It tastes like despair, but it's packed with vitamins! You feel permanently more robust.",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Drink "Liquid Nitrogen Slushie."',
                emoji: '🥶',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Brain Freeze', description: '+20% Attack Speed, but -10% Accuracy for 2 minutes.', type: 'buff', modifiers: { percent: { attackSpeed: 0.2, accuracy: -0.1 } } }], duration_ms: 120000 },
                    resultText: "The brain freeze is intense, but the cold shock makes you incredibly fast, if a bit shaky.",
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Drink "Rainbow Coolant."',
                emoji: '🌈',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Chroma-Cool', description: 'Your skin tone has changed for this run!', type: 'buff', modifiers: {} }], duration_ms: Infinity },
                    resultText: "It tastes like every flavor at once. Your skin begins to shimmer with a new, vibrant hue!",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Shake the machine.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 100 },
                    resultText: '"Hey! Watch the merchandise!" it yells, as a handful of coins drops into the change slot.',
                    outcomeEmoji: '🪙'
                }
            }
        ]
    },
    {
        id: 'scrapheap_metropolis_15_sentry_turret',
        title: 'The Automated Sentry Turret',
        description: 'An old, forgotten security turret 🔫 swivels to aim at you, its red light glowing menacingly. It guards a shortcut loaded with valuable scrap.',
        emojis: ['🔫', '💥', '🤫', '🍀'],
        eventType: 'realm_specific',
        realm: 'Scrapheap Metropolis',
        options: [
            {
                text: 'Hack its targeting system. (Requires Luck focus)',
                emoji: '🍀',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "You find the control panel and guess the password on the first try! The turret powers down, letting you pass and claim the valuable scrap.",
                    outcomeEmoji: '🏆'
                }
            },
            {
                text: 'Sneak past its sensors. (Requires Speed focus)',
                emoji: '💨',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "You're a blur of motion! You zip past the turret before it can get a lock on you.",
                    outcomeEmoji: '😎'
                }
            },
            {
                text: 'Charge it head-on. (Requires Power focus)',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 350 },
                    resultText: "You charge through its hail of gunfire and smash it to pieces. You salvage its valuable power core.",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Find another way.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Nope. Not dealing with that. You go the long, safe, boring way.",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];