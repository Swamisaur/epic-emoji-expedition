/**
 * @file data/events/whisperingWoods_5.ts
 * @description Contains the fifth batch of events specific to the Whispering Woods realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const whisperingWoodsEvents_5: GameEvent[] = [
    {
        id: 'whispering_woods_17_grumpy_treant',
        title: 'The Grumpy Treant',
        description: 'A massive, ancient tree with a grumpy, mossy face blocks the path. "Get off my lawn... er... roots!" it groans, shaking its branches threateningly. 🌳😠',
        emojis: ['🌳', '😠', '💪', '❤️'],
        eventType: 'realm_specific',
        realm: 'Whispering Woods',
        options: [
            {
                text: 'Try to push it over. (Requires Power focus)',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Treant\'s Respect', description: 'Permanently gain +5% Attack Power.', type: 'buff', modifiers: { percent: { attackPower: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You heave with all your might! The treant doesn't move, but it rumbles, 'Impressive. Very well, you may pass.' You feel its ancient strength flowing into you.",
                    outcomeEmoji: '😎'
                }
            },
            {
                text: 'Compliment its beautiful bark. (Female character)',
                emoji: '🥰',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.30 },
                    resultText: "'Oh, well... thank you, dearie.' The treant's cheeks turn a rosy shade of sapwood. It drops a healing fruit that restores 30% of your max health.",
                    outcomeEmoji: '😊'
                }
            },
            {
                text: 'Throw a rock at its face.',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Branch Slap', description: 'You see stars. -15% Accuracy for 2 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.15 } } }], duration_ms: 120000 },
                    resultText: "A branch whips out and smacks you on the head with surprising speed. Your vision swims, making it hard to focus.",
                    outcomeEmoji: '😵'
                }
            },
            {
                text: 'Offer to prune its dead branches.',
                emoji: '✂️',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_missing', amount: 0.50 },
                    resultText: "'Hmmph. Fine.' After some careful pruning, the grateful tree drops a revitalizing seed that heals 50% of your missing health.",
                    outcomeEmoji: '❤️‍🩹'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_18_faerie_prankster',
        title: 'The Faerie Prankster',
        description: 'A tiny, mischievous pixie 🧚 zips around you, giggling. It offers you a choice of three "blessings" from its glowing hands. ✨',
        emojis: ['🧚', '✨', '💨', '🎨'],
        eventType: 'realm_specific',
        realm: 'Whispering Woods',
        options: [
            {
                text: 'Try to catch the pixie. (Requires Speed focus)',
                emoji: '💨',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Pixie Dust', description: '+25% Attack Speed for 2 minutes.', type: 'buff', modifiers: { percent: { attackSpeed: 0.25 } } }], duration_ms: 120000 },
                    resultText: "You're faster! You snatch the pixie from the air. 'Alright, you win!' it laughs, showering you in dust that makes you incredibly swift.",
                    outcomeEmoji: '🏆'
                }
            },
            {
                text: "Accept the 'blessing' of shifting colors.",
                emoji: '🎨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Chameleon Cloak', description: 'Your skin shifts colors! +20% Fortune for 3 minutes.', type: 'buff', modifiers: { percent: { luck: 0.20 } } }], duration_ms: 180000 },
                    resultText: "The pixie blows shimmering dust on you. Your skin begins to slowly shift colors! The camouflage makes you feel much luckier.",
                    outcomeEmoji: '🌈'
                }
            },
            {
                text: "Accept the 'blessing' of eternal hiccups.",
                emoji: '🤢',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'The Hiccups', description: 'Hic! -10% Accuracy for 90s.', type: 'debuff', modifiers: { percent: { accuracy: -0.10 } } }], duration_ms: 90000 },
                    resultText: "A tiny puff of purple smoke hits you. You immediately start hiccuping, throwing off your aim.",
                    outcomeEmoji: '😵'
                }
            },
            {
                text: 'Offer it a shiny button.',
                emoji: '🪙',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: "'Ooh, shiny!' The pixie snatches the button and, in return, shows you a hidden Leprechaun's stash of gold.",
                    outcomeEmoji: '💰'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_19_goblin_vandal',
        title: 'The Goblin Vandal',
        description: 'You find a goblin 👺 trying to "improve" an ancient elven statue by painting a mustache on it with mud. He offers you the "brush." 🎨',
        emojis: ['👺', '🎨', '🗿', '😂'],
        eventType: 'realm_specific',
        realm: 'Whispering Woods',
        options: [
            {
                text: 'Help him paint. (Requires Luck focus)',
                emoji: '😂',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Artistic Vision', description: 'The statue is amused. Permanently +5% Fortune.', type: 'buff', modifiers: { percent: { luck: 0.05 } } }], duration_ms: Infinity },
                    resultText: "Your additions are hilarious! A ghostly elven sigh of amusement echoes, blessing you with good fortune.",
                    outcomeEmoji: '🤣'
                }
            },
            {
                text: 'Suggest a lovely bonnet instead. (Male character)',
                emoji: '👒',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Charmed Spirit", description: "The statue is charmed. Permanently gain +25 Max Health.", type: 'buff', modifiers: { flat: { maxHealth: 25 } } }], duration_ms: Infinity },
                    resultText: "The goblin loves the idea! The statue's spirit is so charmed by the new look, it grants you a permanent boon of health.",
                    outcomeEmoji: '🥰'
                }
            },
            {
                text: 'Suggest a lovely bonnet instead. (Female character)',
                emoji: '👒',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: "The goblin is so impressed with your fashion sense, it gives you some gold it was hiding.",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Scold the goblin.',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Mud in Your Eye', description: 'The goblin retaliates! -20% Accuracy for 90s.', type: 'debuff', modifiers: { percent: { accuracy: -0.20 } } }], duration_ms: 90000 },
                    resultText: "'Art hater!' The goblin shrieks and flings the muddy brush at you, getting gunk right in your eyes.",
                    outcomeEmoji: '😵'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_20_memory_well',
        title: 'The Whispering Well of Memories',
        description: "You find a well that doesn't hold water, but swirling, misty memories 💧. It whispers, offering to show you a memory of a past hero in exchange for one of your own. 🧠",
        emojis: ['💧', '🧠', '💪', '🧬'],
        eventType: 'realm_specific',
        realm: 'Whispering Woods',
        options: [
            {
                text: 'Trade a memory of a hearty meal. (Requires Health focus)',
                emoji: '🍔',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Memory of Resilience', description: 'Permanently gain +10% Max Health.', type: 'buff', modifiers: { percent: { maxHealth: 0.10 } } }], duration_ms: Infinity },
                    resultText: "The well shows you a vision of a hero enduring a great wound. You absorb their resilience, feeling permanently tougher.",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Trade a memory of an embarrassing moment.',
                emoji: '😳',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: "The well erupts with ghostly laughter, the echoes shaking loose a bag of gold someone dropped in long ago.",
                    outcomeEmoji: '😂'
                }
            },
            {
                text: 'Trade a memory of a great failure.',
                emoji: '👎',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Echo of Doubt', description: 'You are shaken. -15% Accuracy for 3 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.15 } } }], duration_ms: 180000 },
                    resultText: "The well shows you your failure, magnified and twisted. The vision fills you with self-doubt, making your aim unsteady.",
                    outcomeEmoji: '😭'
                }
            },
            {
                text: 'Trade a memory of your identity.',
                emoji: '🧬',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "A New Self", description: "You gain a new perspective, permanently gaining +5% to all core stats.", type: 'buff', modifiers: { percent: { attackPower: 0.05, maxHealth: 0.05, attackSpeed: 0.05 } } }], duration_ms: Infinity },
                    resultText: "A risky choice! The well consumes your memory of self and gives you a new one. You feel a profound, permanent surge of power as your understanding of self deepens.",
                    outcomeEmoji: '✨'
                }
            }
        ]
    }
];