/**
 * @file data/events/common_3.ts
 * @description Contains the third batch of common events that can appear in any realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const commonEvents_3: GameEvent[] = [
    {
        id: 'common_08',
        title: 'The Broken Golem',
        description: 'You find a massive stone golem 🗿, slumped and motionless. One of its arms is broken 💔, but a faint light pulses from a gem in its chest. 💎',
        emojis: ['🗿', '💎', '💔', '🔧'],
        eventType: 'common',
        options: [
            {
                text: 'Take the gem',
                emoji: '💎',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Golem's Heart",
                            description: "Permanently gain +5% Max Health.",
                            type: 'buff',
                            modifiers: { percent: { maxHealth: 0.05 } }
                        }],
                        duration_ms: Infinity
                    },
                    resultText: 'You pry the gem from its chest 💎. It merges with your own heart, making you feel incredibly sturdy. ❤️‍🔥💪',
                    outcomeEmoji: '❤️‍🔥'
                }
            },
            {
                text: 'Smash the gem',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: 'You shatter the gem 💥. It explodes in a shower of valuable magic dust! ✨💰',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Try to repair it',
                emoji: '🔧',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: 'You manage to wedge its arm back into place 🔧. The golem groans to life, picks you up, and carries you a great distance forward before setting you down and crumbling to dust. 🚀💨',
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Use it for cover',
                emoji: '🛡️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You rest behind the golem for a moment 😴, catching your breath before continuing on. 😌👍',
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'common_09',
        title: 'The Mystery Box',
        description: 'A shady merchant 😈 with a wide grin offers you a locked, humming box 📦. "Could be anything!" he says. "A treasure, a wonder... or a tiny, angry scorpion." 🦂',
        emojis: ['📦', '❓', '🤔', '🦂'],
        eventType: 'common',
        options: [
            {
                text: 'Buy it and open it',
                emoji: '🎁',
                cost: 100,
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r5', rarity: 'rare' }, // Lucky Horseshoe
                    resultText: 'You pay the man and open the box 🎁 to find a rare and powerful trinket! A lucky find! 🍀🤩',
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Shake the box first',
                emoji: '🤔',
                cost: 100,
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Scorpion Sting",
                            description: "-10% Attack Speed for 90s",
                            type: 'debuff',
                            modifiers: { percent: { attackSpeed: -0.1 } }
                        }],
                        duration_ms: 90000
                    },
                    resultText: 'You shake the box and hear a rattle 🎶. As you open it, an angry scorpion jumps out and stings you! 🦂 The merchant is already gone. 💨😖',
                    outcomeEmoji: '😖'
                }
            },
            {
                text: 'Steal the box',
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You snatch the box and run 🏃, but it vanishes from your hands in a puff of logic. It was an illusion all along. 💨😵‍💫',
                    outcomeEmoji: '💨'
                }
            },
            {
                text: 'Decline the offer',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You decide not to gamble 🎲. The merchant shrugs and vanishes into thin air. 👍💨',
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'common_10',
        title: "An Adventurer's Diary",
        description: "You find the diary of a fallen adventurer 💀. The last few pages are tear-stained and hastily written. What do you read? 📖😥",
        emojis: ['📖', '💀', '❤️', '💎'],
        eventType: 'common',
        options: [
            {
                text: 'Read about their greatest foe',
                emoji: '👹',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Foe's Weakness",
                            description: "+15% Crit Damage for 3 minutes.",
                            type: 'buff',
                            modifiers: { percent: { critDamage: 0.15 } }
                        }],
                        duration_ms: 180000
                    },
                    resultText: 'The diary describes a fatal flaw in a beast they fought 🐉. The knowledge can be applied to any foe. 🎯🧠',
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: 'Read about their hidden treasure',
                emoji: '💎',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 350 },
                    resultText: 'The last page is a crude map to a nearby stash of gold 🗺️. You easily find it. 💰🤑',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Read about their deepest regret',
                emoji: '❤️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: {
                        effects: [{
                            name: "Empathy",
                            description: "Permanently gain +25 Max Health.",
                            type: 'buff',
                            modifiers: { flat: { maxHealth: 25 } }
                        }],
                        duration_ms: Infinity
                    },
                    resultText: 'Their regret was not being strong enough to protect others 💔. Their words resonate with you, hardening your own resolve. ❤️‍🩹💪',
                    outcomeEmoji: '❤️‍🩹'
                }
            },
            {
                text: 'Give the diary a proper burial',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'You bury the diary, letting the adventurer rest in peace 🙏. It feels like the right thing to do. 😌⚰️',
                    outcomeEmoji: '😌'
                }
            }
        ]
    }
];