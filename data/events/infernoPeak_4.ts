/**
 * @file data/events/infernoPeak_4.ts
 * @description Contains the fourth batch of events specific to the Inferno Peak realm.
 * This file fulfills Task 5.1 of the Great Event Expansion.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const infernoPeakEvents_4: GameEvent[] = [
    {
        id: 'inferno_peak_11',
        title: "The Heartstone",
        description: "You find a massive, pulsating geode ❤️‍🔥 half-submerged in a lava flow. Its inner crystals glow with a steady, warm light. 💎✨",
        emojis: ['💎', '❤️‍🔥', '✨', '🧘'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Meditate on its light',
                emoji: '🧘',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Heartstone Calm", description: "+20% Crit Chance for 2 minutes. ✨", type: 'buff', modifiers: { percent: { critChance: 0.20 } } }], duration_ms: 120000 },
                    resultText: "The geode's steady pulse calms your battle-fury into a razor-sharp focus 🧘. You see the flaws in everything. 🎯🧠",
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: 'Chip off a crystal shard',
                emoji: '⛏️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'm7', rarity: 'rare' }, // Pickaxe of Piercing
                    resultText: "You manage to break off a large, sharp crystal ⛏️. It makes a fine, if brittle, weapon. ✨⚔️",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Push it into the lava',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Volcanic Backdraft", description: "-15% Attack Speed for 90s. 🌋", type: 'debuff', modifiers: { percent: { attackSpeed: -0.15 } } }], duration_ms: 90000 },
                    resultText: "The geode cracks and explodes in a burst of superheated steam 🔥, which blasts you and makes you sluggish. 🥵😫",
                    outcomeEmoji: '🥵'
                }
            },
            {
                text: 'Cool it with your water',
                emoji: '💧',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Tempered Soul", description: "Permanently gain +5% Max Health. ❤️‍🔥", type: 'buff', modifiers: { percent: { maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "The water sizzles as you pour it on the geode 💧, which seems to absorb it. The process tempers your spirit, making you permanently tougher. ❤️💪",
                    outcomeEmoji: '❤️'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_12',
        title: "The Magma Eel",
        description: "A creature made of living lava with diamond eyes 🐍 swims in a fiery river. It watches you, seeming to expect something. 🔥👀",
        emojis: ['🐍', '🔥', '💎', '🎣'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Offer it 100 gold',
                emoji: '🪙',
                cost: 100,
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 400 },
                    resultText: "The eel swallows your coins 🪙 and spits up a pile of much more valuable gems it had collected. 💰💎",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Try to fish it out',
                emoji: '🎣',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "You manage to hook it 🎣, and it drags you far down the path at incredible speed before snapping the line. 🚀💨",
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Splash lava at it',
                emoji: '💦',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Retaliation", description: "-10% Attack Power for 2 minutes. 😠", type: 'debuff', modifiers: { percent: { attackPower: -0.10 } } }], duration_ms: 120000 },
                    resultText: "The eel is not amused 💦. It splashes a much bigger wave of lava back at you, burning you slightly. 😠🔥",
                    outcomeEmoji: '😠'
                }
            },
            {
                text: 'Wave hello',
                emoji: '👋',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "The eel blinks its diamond eyes slowly and submerges into the lava 👋. That was weird. 🤔🐍",
                    outcomeEmoji: '🤔'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_runesmith_1',
        title: "The Runesmith's Legacy",
        description: "The ghost of a dwarf 👻 hammers on an ethereal anvil ⚒️, sparks flying. 'My masterpiece,' he groans, 'never finished. If only I had a proper heartstone to focus the magic...'💎",
        emojis: ['👻', '⚒️', '💎', '🔥'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        options: [
            {
                text: 'Offer a piece of obsidian',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'runesmith_helped' },
                    resultText: "'Close enough!' he bellows 🪨. He hammers the obsidian into a strange, dark lens. 'Find me again when you have a worthy weapon, and I'll show you its true power.' ✨🤝",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Ask what he\'s forging',
                emoji: '❓',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "'Perfection!' he bellows, not looking up from his work ❓. He seems busy. 🤷‍♂️",
                    outcomeEmoji: '🤷'
                }
            },
            {
                text: 'Interrupt his work',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -1 },
                    resultText: "'Do not disturb the artist!' 😠 A wave of heat from his forge sends you stumbling backward down the path. 🥵🔥",
                    outcomeEmoji: '🥵'
                }
            },
            {
                text: 'Watch in silence',
                emoji: '👀',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You watch the master at work for a while 👀. You learn nothing, but it was neat. You move on. 😌👍",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'inferno_peak_runesmith_2',
        title: "The Finishing Touch",
        description: "You encounter the Runesmith's ghost again 👻. He holds up the dark lens he forged. 'Ah, the hero returns! Your main-hand weapon... let me see it. I will unveil its final secret.' ✨⚔️",
        emojis: ['👻', '⚒️', '✨', '⚔️'],
        eventType: 'realm_specific',
        realm: "Inferno Peak",
        requiredFlag: 'runesmith_helped',
        options: [
            {
                text: 'Hand over your weapon',
                emoji: '🤝',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Runeforged", description: "Permanently gain +10% Attack Power and +5% Crit Chance. 룬 단조.", type: 'buff', modifiers: { percent: { attackPower: 0.10, critChance: 0.05 } } }], duration_ms: Infinity },
                    resultText: "The ghost uses the lens to focus an intense beam of light 🤝, etching glowing runes onto your weapon. You feel its power surge to new heights. 🤩✨",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: '"What\'s in it for me?"',
                emoji: '🤨',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "'Impudence! 🤨 But... I admire the spirit. Take this and leave me to my art.' He tosses you some gold and vanishes. 💰💨",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: '"I don\'t trust ghosts."',
                emoji: '🚫',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "'Your loss.' 🚫 The ghost shrugs and fades away, taking his secrets with him. 😒👻",
                    outcomeEmoji: '😒'
                }
            },
            {
                text: 'Offer him your helmet instead',
                emoji: '⛑️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Botched Engraving", description: "Permanently lose 5% Max Health. 엉터리 조각.", type: 'debuff', modifiers: { percent: { maxHealth: -0.05 } } }], duration_ms: Infinity },
                    resultText: "'A helmet? ⛑️ I am a WEAPONsmith!' He angrily smacks it with his hammer, accidentally cracking it before he disappears. 🤕💥",
                    outcomeEmoji: '🤕'
                }
            }
        ]
    }
];