/**
 * @file data/events/contaminatedSewers.ts
 * @description Contains the first batch of events specific to the Contaminated Sewers realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const contaminatedSewersEvents_1: GameEvent[] = [
    {
        id: 'contaminated_sewers_01',
        title: "The Mysterious Goo",
        description: "A large puddle of iridescent, bubbling goo 🦠 blocks the path. It pulses with a faint, sickly light ✨. It smells like ozone and regret. ☣️",
        emojis: ['🦠', '🧪', '✨', '☣️'],
        eventType: 'realm_specific',
        realm: "Contaminated Sewers",
        options: [
            {
                text: 'Touch it.',
                emoji: '👉',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Controlled Mutation", description: "Permanently gain +10% Attack Power, but lose 5% Max Health.", type: 'buff', modifiers: { percent: { attackPower: 0.10, maxHealth: -0.05 } } }], duration_ms: Infinity },
                    resultText: "You touch the goo 👉. A painful, thrilling energy surges through you, rewriting your very essence. You are stronger, but more fragile. 🧬",
                    outcomeEmoji: '🧬'
                }
            },
            {
                text: 'Throw some scrap into it.',
                emoji: '🔩',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o10', rarity: 'rare' }, // Aegis of the Gods
                    resultText: "The scrap dissolves instantly 🔩, then reforms into a bizarre, yet powerful, shield-like object. 🛡️",
                    outcomeEmoji: '🛡️'
                }
            },
            {
                text: 'Try to bottle some.',
                emoji: '🧪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Corrosive Splash", description: "You are burned by the goo! -10% Attack Power for 2 minutes.", type: 'debuff', modifiers: { percent: { attackPower: -0.10 } } }], duration_ms: 120000 },
                    resultText: "You try to bottle the goo 🧪, but it eats right through the glass, splashing onto your hands and weakening you. 😖",
                    outcomeEmoji: '😖'
                }
            },
            {
                text: 'Find a way around.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Absolutely not 🙅. You find a dry, non-glowing path to continue on. 👍",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'contaminated_sewers_02_farmer',
        title: "The Algae Farmer",
        description: "In a dimly lit cistern, a pale figure in a hazmat suit 🧑‍🔬 tends to patches of glowing green algae ✨. 'Care for a sample?' he asks, his voice muffled. 'It's the food of the future!' 🌿",
        emojis: ['🧑‍🔬', '🌿', '✨', '😋'],
        eventType: 'realm_specific',
        realm: "Contaminated Sewers",
        options: [
            {
                text: 'Eat the glowing algae.',
                emoji: '😋',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'ate_glow_kelp' },
                    resultText: "It tastes... electric 😋. The farmer nods. 'It changes you. Find me again, if you survive the change.' You feel a strange tingling. ⚡️",
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Politely refuse.',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You're not quite ready for the food of the future 🙏. The farmer shrugs and returns to his work. 😌",
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Ask about his work.',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "He rambles on about bio-luminescence and nutrient paste 🧐. It's fascinating, but you have a quest to finish. 🤔",
                    outcomeEmoji: '🤔'
                }
            },
            {
                text: 'Report him to the Sewer Authority.',
                emoji: '👮',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "There is no Sewer Authority 👮. He just stares at you blankly. 🤷",
                    outcomeEmoji: '🤷'
                }
            }
        ]
    },
    {
        id: 'contaminated_sewers_03_mutation',
        title: "The Change",
        description: "The tingling from the algae intensifies! A faint green light ✨ begins to emanate from your skin. You feel power coursing through you, raw and untamed. 🤢",
        emojis: ['🤢', '✨', '💪', '🧬'],
        eventType: 'realm_specific',
        realm: "Contaminated Sewers",
        requiredFlag: 'ate_glow_kelp',
        options: [
            {
                text: 'Embrace the mutation.',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Unstable Mutation", description: "Permanently gain +10% Attack Power and +10% Attack Speed.", type: 'buff', modifiers: { percent: { attackPower: 0.10, attackSpeed: 0.10 } } }], duration_ms: Infinity },
                    resultText: "You accept the change 💪, letting the strange energy settle. You feel permanently faster and stronger, a true child of the sewer. 🤩",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Try to fight it.',
                emoji: '😫',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Cellular Rejection", description: "Your body fights itself! -15% Max Health for 3 minutes.", type: 'debuff', modifiers: { percent: { maxHealth: -0.15 } } }], duration_ms: 180000 },
                    resultText: "You try to reject the power 😫. Your body is wracked with pain as it fights the mutation, leaving you weakened. 🤕",
                    outcomeEmoji: '🤕'
                }
            },
            {
                text: 'Rub some dirt on it.',
                emoji: '🤷',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You try a folk remedy 🤷. It does not work. The tingling eventually fades on its own, leaving no lasting effects. 😌",
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Find the farmer again.',
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Stabilized Serum", description: "Permanently gain +5% to all core stats.", type: 'buff', modifiers: { percent: { attackPower: 0.05, maxHealth: 0.05, attackSpeed: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You find the farmer 🏃, who injects you with a stabilizing agent. The raw power is lessened, but refined, granting a balanced boost to your abilities. 👍",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'contaminated_sewers_04',
        title: "A Clogged Pipe",
        description: "A colossal pipe is blocked 🔧, flooding the passage ahead with murky water 💧. Three large, color-coded valves are on a nearby wall. 🔴🟢",
        emojis: ['🔧', '💧', '🔴', '🟢'],
        eventType: 'realm_specific',
        realm: "Contaminated Sewers",
        options: [
            {
                text: 'Turn the Red Valve.',
                emoji: '🔴',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Steam Rush", description: "Hot steam fills the room. +15% Attack Speed for 90s.", type: 'buff', modifiers: { percent: { attackSpeed: 0.15 } } }], duration_ms: 90000 },
                    resultText: "You turn the valve 🔴, and hot steam erupts from the pipe, clearing a small blockage. The heat makes you feel energized. 💨",
                    outcomeEmoji: '💨'
                }
            },
            {
                text: 'Turn the Blue Valve.',
                emoji: '🔵',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "The valve drains the flooded passage 🔵, revealing a hidden shortcut. The path ahead is clear! 🚀",
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Turn the Green Valve.',
                emoji: '🟢',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Noxious Fumes", description: "A foul gas leaks out. -10% Crit Chance for 2 minutes.", type: 'debuff', modifiers: { percent: { critChance: -0.10 } } }], duration_ms: 120000 },
                    resultText: "A sickly green gas hisses from the valve 🟢. You feel dizzy and your vision blurs. 🤢",
                    outcomeEmoji: '🤢'
                }
            },
            {
                text: 'Smash the pipe with your weapon.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "A torrent of foul water erupts from the pipe 💥, washing you back down the corridor you came from. 🌊",
                    outcomeEmoji: '🌊'
                }
            }
        ]
    },
    {
        id: 'contaminated_sewers_05',
        title: "The Alligator's Nest",
        description: "You stumble upon a nest of large, leathery eggs 🥚. A massive albino alligator 🐊 sleeps nearby, its white scales shimmering in the gloom. 😴",
        emojis: ['🐊', '🥚', '🤫', '😴'],
        eventType: 'realm_specific',
        realm: "Contaminated Sewers",
        options: [
            {
                text: 'Steal an egg.',
                emoji: '🥚',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o10', rarity: 'legendary' }, // Aegis of the Gods
                    resultText: "You snatch an egg 🥚. It's incredibly heavy and tough, more like a divine shield than an egg. You escape before the gator wakes. 🤩",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Try to cook an egg.',
                emoji: '🍳',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Mutagenic Omelette", description: "Permanently gain +5% Crit Damage.", type: 'buff', modifiers: { percent: { critDamage: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You cook and eat an egg 🍳. It has a strange, metallic taste, but you feel its mutagenic properties sharpening your killer instincts. 💥",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Wake the alligator.',
                emoji: '🗣️',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -2 },
                    resultText: "The alligator wakes up and lets out a terrifying bellow 😱. You flee in terror, losing a significant amount of ground. 🏃",
                    outcomeEmoji: '😱'
                }
            },
            {
                text: 'Leave the nest in peace.',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You wisely decide not to mess with a sleeping mother alligator and her brood. 👍",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];