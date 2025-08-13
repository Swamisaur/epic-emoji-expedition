/**
 * @file data/events/whisperingWoods_4.ts
 * @description Contains the fourth batch of events specific to the Whispering Woods realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const whisperingWoodsEvents_4: GameEvent[] = [
    {
        id: 'whispering_woods_13',
        title: "Wolf Pack's Hunt",
        description: "You stumble upon a pack of wolves 🐺 skillfully cornering a large, wounded boar. 🐗",
        emojis: ['🐺', '🐗', '⚔️', '🤔'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Help the wolves',
                emoji: '🐺',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Pack Hunter", description: "You feel the thrill of the hunt. +15% Attack Power for 2 minutes.", type: 'buff', modifiers: { percent: { attackPower: 0.15 } } }], duration_ms: 120000 },
                    resultText: "You help the wolves take down the boar 🐺. The alpha gives you a nod of respect, and you feel the spirit of the hunt within you. 💪",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Help the boar',
                emoji: '🐗',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Boar's Resilience", description: "The boar's fighting spirit inspires you. +15% Max Health for 2 minutes.", type: 'buff', modifiers: { percent: { maxHealth: 0.15 } } }], duration_ms: 120000 },
                    resultText: "You drive the wolves away 👋. The boar gives you a grateful snort before limping into the undergrowth. Its resilience inspires you. 🛡️",
                    outcomeEmoji: '🛡️'
                }
            },
            {
                text: 'Steal the kill',
                emoji: '😈',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "While they fight, you finish off the boar and make off with the prize 😈. The wolves howl in anger, but you're already gone with the spoils. 🤑",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Watch from a distance',
                emoji: '👀',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You decide not to interfere with the natural order of the forest. 😌",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_14',
        title: "The Hermit's Hut",
        description: "Deep in the woods, you find a small hut 🛖. An old hermit 🧙 offers you a ladle from one of three bubbling cauldrons. 🥣",
        emojis: ['🛖', '🧙', '🥣', '❓'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Drink the murky brown brew',
                emoji: '🟤',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Earthen Brew", description: "Permanently gain +50 Max Health.", type: 'buff', modifiers: { flat: { maxHealth: 50 } } }], duration_ms: Infinity },
                    resultText: "It tastes of roots and earth 🟤. You feel a deep, lasting vitality take root in your core. ❤️",
                    outcomeEmoji: '❤️'
                }
            },
            {
                text: 'Drink the clear blue brew',
                emoji: '🔵',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Sky Brew", description: "You feel light-headed. -10% Attack Power for 2 minutes.", type: 'debuff', modifiers: { percent: { attackPower: -0.10 } } }], duration_ms: 120000 },
                    resultText: "It tastes of sky and air 🔵. You feel dizzy and unfocused, your strikes losing their impact. 😵",
                    outcomeEmoji: '😵'
                }
            },
            {
                text: 'Drink the swirling grey brew',
                emoji: '⚪',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: "It tastes like stone and minerals ⚪. When you finish, you find a lump of silver at the bottom of the ladle. 💰",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Decline his offer',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "The hermit shrugs and sips from the grey cauldron himself. You continue on your way. 👍",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'whispering_woods_15',
        title: "Poison Ivy Patch",
        description: "A narrow shortcut through the dense thicket is covered in glistening, three-leaved poison ivy. ☠️🌿",
        emojis: ['🌿', '☠️', '🏃', '🤔'],
        eventType: 'realm_specific',
        realm: "Whispering Woods",
        options: [
            {
                text: 'Run through it!',
                emoji: '🏃',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Poison Ivy Rash", description: "You are very itchy. -10% Attack Speed for 3 minutes.", type: 'debuff', modifiers: { percent: { attackSpeed: -0.10 } } }], duration_ms: 180000 },
                    resultText: "You make it through 🏃, but now you're covered in an agonizingly itchy rash that slows your every move. 😫",
                    outcomeEmoji: '😫'
                }
            },
            {
                text: 'Carefully pick your way through',
                emoji: '👣',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "Your careful steps pay off! 👣 You navigate the patch without a single itch and come out ahead. 😌",
                    outcomeEmoji: '😌'
                }
            },
            {
                text: 'Burn it with a torch',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You clear the path with fire 🔥, but the smoke is noxious and you have to wait a while for it to clear. You gain no time. 🤷",
                    outcomeEmoji: '🤷'
                }
            },
            {
                text: 'Go the long way around',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Not worth the risk. You stick to the main path. 👍",
                    outcomeEmoji: '👍'
                }
            }
        ]
    }
];