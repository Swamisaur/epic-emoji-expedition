/**
 * @file data/events/tangledJungle_5.ts
 * @description Contains the fifth batch of events specific to the Tangled Jungle realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const tangledJungleEvents_5: GameEvent[] = [
    {
        id: 'tangled_jungle_12_carnivorous_plant',
        title: "The Carnivorous Plant's Lure",
        description: "A giant, beautiful, and hungry plant has a pristine, probably magical boot sticking out of its maw. It seems to pulse with a faint light.",
        emojis: ['🌺', '👢', '💪', '💨'],
        eventType: 'realm_specific',
        realm: 'Tangled Jungle',
        options: [
            {
                text: 'Rip it open.',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'b4', rarity: 'legendary' }, // Hiking Boots
                    resultText: 'With a mighty heave, you tear the plant open. The boot is legendary, and it still has a foot in it! You discard the foot.',
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Snatch the boot.',
                emoji: '💨',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'b2', rarity: 'rare' }, // Shorts of Speed
                    resultText: "You're faster than it is! You snatch the boot before it can react. It's a fine, rare piece of gear.",
                    outcomeEmoji: '😎'
                }
            },
            {
                text: 'Provoke it.',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Pollen Cloud', description: '-20% Accuracy for 2 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.20 } } }], duration_ms: 120000 },
                    resultText: "The plant lets out a massive cloud of debilitating pollen right in your face. It's hard to see!",
                    outcomeEmoji: '😵'
                }
            },
            {
                text: 'Water it.',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.15 },
                    resultText: "The plant seems grateful for the drink. It spits out a partially-digested, but nourishing, fruit that heals you for 15% of your max health.",
                    outcomeEmoji: '😋'
                }
            }
        ]
    },
    {
        id: 'tangled_jungle_13_shaman',
        title: "The Shaman's Challenge",
        description: 'A tribal shaman 🗿, covered in ritualistic paint, demands you prove your spirit before you can pass.',
        emojis: ['🗿', '💪', '💖', '🍀'],
        eventType: 'realm_specific',
        realm: 'Tangled Jungle',
        options: [
            {
                text: 'Show compassion.',
                emoji: '💖',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: "The shaman sees the kindness in your spirit and performs a ritual that heals you completely.",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Wrestle him.',
                emoji: '💪',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Spirit of the Jaguar', description: 'Permanently gain +5% Attack Power.', type: 'buff', modifiers: { percent: { attackPower: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You best the shaman in a contest of strength! He is impressed and shares a secret of the jaguar's power with you.",
                    outcomeEmoji: '🏆'
                }
            },
            {
                text: 'Show him a magic trick.',
                emoji: '🍀',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o9', rarity: 'rare' }, // Monkey's Paw
                    resultText: "The shaman is so entertained by your sleight of hand, he trades you a powerful, and very questionable, artifact.",
                    outcomeEmoji: '😂'
                }
            },
            {
                text: 'Decline the challenge.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "The shaman is disappointed but lets you pass. You feel his judging eyes on your back.",
                    outcomeEmoji: '😒'
                }
            }
        ]
    },
    {
        id: 'tangled_jungle_14_tree_of_faces',
        title: 'The Tree of Faces',
        description: 'An ancient, gnarled tree 🌳 has dozens of human-like faces carved into its bark. They all whisper at once, offering you a boon. 🗣️',
        emojis: ['🌳', '🗣️', '💪', '💨'],
        eventType: 'realm_specific',
        realm: 'Tangled Jungle',
        options: [
            {
                text: 'Ask for the strength of its roots.',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Ironwood Heart', description: 'Permanently gain +10% Max Health.', type: 'buff', modifiers: { percent: { maxHealth: 0.10 } } }], duration_ms: Infinity },
                    resultText: "The tree grants you the resilience of its ancient roots, permanently boosting your health.",
                    outcomeEmoji: '🛡️'
                }
            },
            {
                text: 'Ask for the swiftness of its leaves.',
                emoji: '💨',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Whisperwind', description: 'Permanently gain +5% Attack Speed.', type: 'buff', modifiers: { percent: { attackSpeed: 0.05 } } }], duration_ms: Infinity },
                    resultText: "The tree grants you the swiftness of its leaves in the wind, permanently increasing your attack speed.",
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: '"Make me... different."',
                emoji: '🎨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Chameleon Bark', description: 'Your skin tone has been magically altered!', type: 'buff', modifiers: {} }], duration_ms: Infinity },
                    resultText: "The tree sheds a shower of multicolored pollen on you, magically altering your skin tone for the rest of this life!",
                    outcomeEmoji: '🌈'
                }
            },
            {
                text: 'Carve your own face into it.',
                emoji: '✍️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Your carving is... not great. The other faces seem to be silently judging your artistic skills. You leave in shame.",
                    outcomeEmoji: '😅'
                }
            }
        ]
    },
    {
        id: 'tangled_jungle_15_waterfall_cave',
        title: 'The Waterfall Cave',
        description: 'A powerful waterfall 🌊 conceals the entrance to a dark cave. The roar is deafening, and the force of the water is immense. 🏞️',
        emojis: ['🌊', '🏞️', '💪', '💎'],
        eventType: 'realm_specific',
        realm: 'Tangled Jungle',
        options: [
            {
                text: 'Brave the waterfall.',
                emoji: '💪',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 't10', rarity: 'legendary' }, // Golden Fleece
                    resultText: "You withstand the crushing water and enter the cave, where you find a legendary treasure!",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Look for a side entrance.',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: "You find a smaller, drier cave nearby containing a small offering of gold left by a previous traveler.",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Try to block the waterfall with a rock.',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "The immense force of the water instantly blasts the rock back at you, sending you tumbling backward.",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Go for a swim.',
                emoji: '🏊',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.10 },
                    resultText: "The water is invigorating! You feel refreshed, healing for 10% of your max health.",
                    outcomeEmoji: '😌'
                }
            }
        ]
    }
];
