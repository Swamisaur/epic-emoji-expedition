/**
 * @file data/events/fallenCitadel.ts
 * @description Contains the first batch of events specific to the Fallen Citadel realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const fallenCitadelEvents_1: GameEvent[] = [
    {
        id: 'fallen_citadel_01',
        title: "The Ghostly Guard",
        description: "The spectral image of a guard 👻, still at his post, bars your way. 'None shall pass without the King's word!' he proclaims. 👑✋",
        emojis: ['👻', '🛡️', '👑', '❓'],
        eventType: 'realm_specific',
        realm: "Fallen Citadel",
        options: [
            {
                text: 'Password: "Nightingale"',
                emoji: '🤫',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "The ghost looks shocked 🤫. 'That... is correct. You may pass.' The path ahead seems to clear for you. ✅✨",
                    outcomeEmoji: '✅'
                }
            },
            {
                text: '"I serve the new king: me!"',
                emoji: '👑',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Royal Bearing", description: "Permanently gain +5% Max Health. 👑", type: 'buff', modifiers: { percent: { maxHealth: 0.05 } } }], duration_ms: Infinity },
                    resultText: "Your sheer audacity impresses the spirit 👑. 'A king, you say? Very well. Carry yourself with honor.' You feel a surge of regal vitality. 💪❤️‍🔥",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Attempt to fight it',
                emoji: '⚔️',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "Your weapon passes right through the ghost ⚔️. It sighs, bored. 'Just go around. I'm a spirit, not a wall.' 🙄😑",
                    outcomeEmoji: '🙄'
                }
            },
            {
                text: '"Is this the bathroom?"',
                emoji: '🚽',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "The ghost is flummoxed 🚽. 'Uh... down the hall, second on the left?' It points, and you awkwardly shuffle past. 😅🚶",
                    outcomeEmoji: '😅'
                }
            }
        ]
    },
    {
        id: 'fallen_citadel_02',
        title: "The King's Banquet",
        description: "You enter a grand hall 🏛️. A long table is set with a feast that has long since turned to dust 🍽️, except for a single, gleaming, perfect apple. 🍎✨",
        emojis: ['🍎', '🍽️', '👑', '💀'],
        eventType: 'realm_specific',
        realm: "Fallen Citadel",
        options: [
            {
                text: 'Eat the apple',
                emoji: '😋',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "King's Vigor", description: "+25% Max Health for 3 minutes. 🍎", type: 'buff', modifiers: { percent: { maxHealth: 0.25 } } }], duration_ms: 180000 },
                    resultText: "The apple is crisp and impossibly delicious 😋. You feel a wave of strength and health wash over you. 🤩💪",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Sit on the throne',
                emoji: '👑',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Weight of Command", description: "-10% Attack Speed, +10% Fortune for 2 minutes 👑", type: 'debuff', modifiers: { percent: { attackSpeed: -0.10, luck: 0.10 } } }], duration_ms: 120000 },
                    resultText: "You sit on the throne 👑, feeling the weight of ages. You feel more important, but the responsibility makes you sluggish. 🤔⚖️",
                    outcomeEmoji: '🤔'
                }
            },
            {
                text: 'Search the room for gold',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 250 },
                    resultText: "You find a heavy purse of gold under the throne 🧐, forgotten for centuries. 💰🤑",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Pay your respects and leave',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You bow your head to the fallen king and leave the hall untouched. 🙏😌",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'fallen_citadel_03',
        title: "The Haunted Armory",
        description: "You find the citadel's armory. Racks of dusty weapons ⚔️ and armor 🛡️ line the walls, gleaming in the faint light. ✨",
        emojis: ['⚔️', '🛡️', '⛑️', '👻'],
        eventType: 'realm_specific',
        realm: "Fallen Citadel",
        options: [
            {
                text: 'Take the gleaming sword',
                emoji: '⚔️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'm10', rarity: 'rare' }, // Excalibur
                    resultText: "You pull a magnificent sword from its rack ⚔️. It feels perfectly balanced in your hand. 🤩✨",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Don the sturdy shield',
                emoji: '🛡️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'o8', rarity: 'rare' }, // Kite Shield
                    resultText: "You pick up a heavy, ornate shield 🛡️. It feels like it could stop a dragon. 💪🐲",
                    outcomeEmoji: '💪'
                }
            },
            {
                text: 'Polish a rusty helmet',
                emoji: '✨',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'h7', rarity: 'common' }, // Hard Hat
                    resultText: "You spend some time polishing a helmet ✨. It's not fancy, but it's very solid. 👷👍",
                    outcomeEmoji: '👷'
                }
            },
            {
                text: 'Leave the weapons for the dead',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "These belong to the fallen warriors of the citadel 🙏. You leave them in peace. 😌",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'fallen_citadel_04',
        title: 'A Moving Tapestry',
        description: 'A massive tapestry on the wall depicts a heroic knight 🤺 slaying a great beast 🐉. As you watch, the figures seem to move. ✨🖼️',
        emojis: ['🖼️', '🤺', '🐉', '✨'],
        eventType: 'realm_specific',
        realm: "Fallen Citadel",
        options: [
            {
                text: 'Study the knight\'s technique',
                emoji: '🧐',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Combat Lesson", description: "+20% Crit Damage for 3 minutes 💥", type: 'buff', modifiers: { percent: { critDamage: 0.20 } } }], duration_ms: 180000 },
                    resultText: "You watch the knight's final, perfect strike 🧐. You learn a valuable lesson about hitting vital points. 💥🧠",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Touch the tapestry',
                emoji: '✋',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: "You touch the shimmering threads and are pulled through ✋, tumbling out into a corridor further ahead. 🌀🚀",
                    outcomeEmoji: '🌀'
                }
            },
            {
                text: 'Look for hidden treasure behind it',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 125 },
                    resultText: "You pull the tapestry aside to find a hidden alcove with a small stash of gold. 💰🪙",
                    outcomeEmoji: '🪙'
                }
            },
            {
                text: 'Admire the art and move on',
                emoji: '🎨',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "It's a beautiful piece of work 🎨. You appreciate it for a moment before continuing your quest. 😌🚶",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'fallen_citadel_05',
        title: "The Broken Crown",
        description: "On a dusty pedestal sits a beautiful, yet broken 💔, silver crown 👑. It still pulses with a faint magical aura. ✨",
        emojis: ['👑', '💔', '✨', '🙏'],
        eventType: 'realm_specific',
        realm: "Fallen Citadel",
        options: [
            {
                text: 'Try to wear it',
                emoji: '🙋',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Crown's Sorrow", description: "-10% Attack Speed for 2 minutes 😔", type: 'debuff', modifiers: { percent: { attackSpeed: -0.10 } } }], duration_ms: 120000 },
                    resultText: "You place it on your head 🙋. A wave of sorrow and regret washes over you, slowing your movements. 😔💔",
                    outcomeEmoji: '😔'
                }
            },
            {
                text: 'Melt it for silver',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: "It's a historical artifact, but silver is silver 🔥. You melt it down for a good amount of coin. 💰🤑",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Attempt to mend it',
                emoji: '🛠️',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'h3', rarity: 'legendary' }, // Crown of Greed
                    resultText: "You carefully bend the silver back into shape 🛠️. The crown's magic flares to life, restoring it to a powerful, legendary state! 🤩👑",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Leave it on its pedestal',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "A king's crown should remain with his kingdom 🙏. You leave it be. 😌👑",
                    outcomeEmoji: '😌'
                }
            }
        ]
    }
];