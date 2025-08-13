/**
 * @file data/events/contaminatedSewers_5.ts
 * @description Contains the fifth batch of events specific to the Contaminated Sewers realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const contaminatedSewersEvents_5: GameEvent[] = [
    {
        id: 'contaminated_sewers_12_fatberg',
        title: 'The Sentient Fatberg',
        description: 'A colossal, quivering mass of grease and garbage blocks the tunnel. Two bottle caps drift on its surface like eyes. "Halt," it gurgles. "None shall pass... the Fatberg." 🤢',
        emojis: ['🤢', '🍔', '💪', '🍀'],
        eventType: 'realm_specific',
        realm: 'Contaminated Sewers',
        options: [
            {
                text: 'Eat your way through.',
                emoji: '😋',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Iron Gut', description: 'Permanently gain +10% Max Health.', type: 'buff', modifiers: { percent: { maxHealth: 0.10 } } }], duration_ms: Infinity },
                    resultText: 'You take a deep breath and start eating. It\'s disgusting, but your powerful constitution converts the... material... into permanent vitality.',
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Search for treasure.',
                emoji: '🍀',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r5', rarity: 'legendary' }, // Lucky Horseshoe
                    resultText: 'You rummage through the muck. Your hand closes around something hard... a legendary lucky charm swallowed by the Fatberg long ago!',
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Punch it.',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: 'You punch a hole straight through the greasy mass. It\'s a disgusting but effective shortcut.',
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Reason with it.',
                emoji: '🗣️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Gunk Splash', description: 'It splashes you! -15% Accuracy for 2 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.15 } } }], duration_ms: 120000 },
                    resultText: 'Your heartfelt speech causes the Fatberg to weep greasy tears, one of which splashes in your eye, blurring your vision.',
                    outcomeEmoji: '😭'
                }
            }
        ]
    },
    {
        id: 'contaminated_sewers_13_three_eyed_fish',
        title: 'The Three-Eyed Fish',
        description: 'A glowing, three-eyed fish 🐟 swims in a pool of murky water. "I see all futures," it whispers in your mind. "What do you wish to know?"',
        emojis: ['🐟', '👁️', '✨', '🔮'],
        eventType: 'realm_specific',
        realm: 'Contaminated Sewers',
        options: [
            {
                text: 'Ask for a vision of power.',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Glimpse of Power', description: '+20% Attack Power for 2 minutes.', type: 'buff', modifiers: { percent: { attackPower: 0.20 } } }], duration_ms: 120000 },
                    resultText: 'The fish shows you a vision of you as a mighty conqueror. The image inspires you, filling you with power.',
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Ask for a vision of wealth.',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 500 },
                    resultText: 'The fish shows you where a sewer worker dropped their entire paycheck. You find the soggy, but still valuable, gold.',
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Ask to see yourself... differently.',
                emoji: '🎨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'A New Reflection', description: 'Your perspective shifts, granting +10% Fortune for 3 minutes.', type: 'buff', modifiers: { percent: { luck: 0.10 } } }], duration_ms: 180000 },
                    resultText: "The fish shows you a reflection of a luckier self. The vision is so powerful, it grants you a temporary boon of good fortune!",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Eat the fish.',
                emoji: '😋',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: 'Prophecies don\'t fill the belly. The radioactive fish tastes like static, but heals you completely.',
                    outcomeEmoji: '☢️'
                }
            }
        ]
    },
    {
        id: 'contaminated_sewers_14_alchemist_runoff',
        title: "The Alchemist's Runoff",
        description: 'A pipe from the city above is leaking three distinct, glowing liquids into the sewer. Red, Green, and Blue. They smell... potent. 🧪',
        emojis: ['🧪', '🔴', '🟢', '🔵'],
        eventType: 'realm_specific',
        realm: 'Contaminated Sewers',
        options: [
            {
                text: 'Drink the glowing red liquid.',
                emoji: '🔴',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.25 },
                    resultText: 'It was acid! The burning liquid deals 25% of your max health in damage.',
                    outcomeEmoji: '😫'
                }
            },
            {
                text: 'Drink the glowing green liquid.',
                emoji: '🟢',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.50 },
                    resultText: 'It was a potent healing potion! You heal for 50% of your max health.',
                    outcomeEmoji: '❤️‍🩹'
                }
            },
            {
                text: 'Drink the glowing blue liquid.',
                emoji: '🔵',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Unstable Mutagen", description: "The mutagen rewrites your form! Your gender is swapped!", type: 'buff', modifiers: {} }], duration_ms: Infinity },
                    resultText: 'The liquid tastes of ozone and possibility. Your form shimmers and reforms, swapping your gender for the rest of this life!',
                    outcomeEmoji: '🧬'
                }
            },
            {
                text: 'Mix them all together.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: 'The liquids violently neutralize each other in a puff of grey, odorless smoke. Nothing happens.',
                    outcomeEmoji: '🤷'
                }
            }
        ]
    },
    {
        id: 'contaminated_sewers_15_rat_tamer',
        title: "The Rat Tamer's Flute",
        description: 'You find a skeleton clutching a strange flute made of bone 🦴. A circle of rats sits around it, as if listening to a silent song. 🎶',
        emojis: ['🦴', '🎶', '🐀', '💀'],
        eventType: 'realm_specific',
        realm: 'Contaminated Sewers',
        options: [
            {
                text: 'Play a fast tune.',
                emoji: '💨',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Rat Scramble', description: 'Permanently gain +5% Attack Speed.', type: 'buff', modifiers: { percent: { attackSpeed: 0.05 } } }], duration_ms: Infinity },
                    resultText: 'The rats dance manically to your tune. Their chaotic energy infuses you, making you permanently faster.',
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Play a somber tune.',
                emoji: '🍀',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 400 },
                    resultText: 'The rats are moved by your sad song. They each bring you a shiny coin from their nests as a tribute.',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Play a battle hymn.',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Rat Fury', description: 'Permanently gain +5% Attack Power.', type: 'buff', modifiers: { percent: { attackPower: 0.05 } } }], duration_ms: Infinity },
                    resultText: 'Your powerful hymn excites the rats into a frenzy. Their collective fury grants you a permanent boost to your strength.',
                    outcomeEmoji: '🔥'
                }
            },
            {
                text: 'Break the flute.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Freed Spirits", description: 'The spirits are grateful! +10% to all core stats for 2 minutes.', type: 'buff', modifiers: { percent: { attackPower: 0.1, maxHealth: 0.1, attackSpeed: 0.1 } } }], duration_ms: 120000 },
                    resultText: 'You snap the flute. A chorus of ghostly whispers thanks you for freeing them from the tamer\'s control. They grant you a powerful, temporary blessing.',
                    outcomeEmoji: '😇'
                }
            }
        ]
    }
];