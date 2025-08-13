/**
 * @file data/events/hauntedCatacombs_5.ts
 * @description Contains the fifth batch of events specific to the Haunted Catacombs realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const hauntedCatacombsEvents_5: GameEvent[] = [
    {
        id: 'haunted_catacombs_12_bone_collector',
        title: "The Bone Collector's Request",
        description: 'A skeleton meticulously sorting through a massive pile of bones looks up at you with empty eye sockets. "I\'m building the perfect warrior!" it rasps. "I\'m missing a pristine, left femur! Could you help?" 💀🦴',
        emojis: ['💀', '🦴', '🙏', '🤔'],
        eventType: 'realm_specific',
        realm: 'Haunted Catacombs',
        options: [
            {
                text: '"I\'ll find one." (Requires Luck focus)',
                emoji: '🍀',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Anatomical Insight', description: 'Permanently gain +2% Crit Chance.', type: 'buff', modifiers: { percent: { critChance: 0.02 } } }], duration_ms: Infinity },
                    resultText: 'You rummage through the pile and, by sheer chance, your hand lands on a perfect femur. The skeleton is overjoyed and teaches you a secret about finding weak points.',
                    outcomeEmoji: '🎯'
                }
            },
            {
                text: '"I\'ll acquire one." (Requires Power focus)',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Grave Strength', description: 'Permanently gain +5% Attack Power.', type: 'buff', modifiers: { percent: { attackPower: 0.05 } } }], duration_ms: Infinity },
                    resultText: 'You spot a larger, tougher skeleton embedded in the wall and easily snap off its femur. The collector is impressed with your strength.',
                    outcomeEmoji: '💥'
                }
            },
            {
                text: '"I\'ve got a bone to pick..." (Male character)',
                emoji: '♂️',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r10', rarity: 'legendary' }, // Infinity Stone
                    resultText: 'You point to your own leg. The skeleton clatters with laughter. It\'s so amused it trades you a legendary trinket for the excellent joke.',
                    outcomeEmoji: '😂'
                }
            },
            {
                text: '"Just use a different bone!" (Female character)',
                emoji: '♀️',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 300 },
                    resultText: 'You scold it for being so picky. The skeleton gets flustered by your tone and drops a bag of valuable bone dust.',
                    outcomeEmoji: '💰'
                }
            }
        ]
    },
    {
        id: 'haunted_catacombs_13_three_echoes',
        title: 'The Crypt of Three Echoes',
        description: 'You enter a crypt where three ghostly echoes swirl. A plaque reads: "One speaks truth, two speak lies. Choose wisely." The first whispers of power, the second of wealth, the third of protection.',
        emojis: ['👻', '🗣️', '❓', '🛡️'],
        eventType: 'realm_specific',
        realm: 'Haunted Catacombs',
        options: [
            {
                text: 'Trust the Echo of Power.',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Draining Lie', description: 'The echo lied! -10% Attack Power for 2 minutes.', type: 'debuff', modifiers: { percent: { attackPower: -0.10 } } }], duration_ms: 120000 },
                    resultText: 'The echo laughs as it drains some of your strength. It was a lie.',
                    outcomeEmoji: '😫'
                }
            },
            {
                text: 'Trust the Echo of Wealth.',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: -100 },
                    resultText: 'The echo cackles as 100 of your coins vanish into the ether. It was a lie.',
                    outcomeEmoji: '💸'
                }
            },
            {
                text: 'Trust the Echo of Protection.',
                emoji: '🛡️',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'full', amount: 1 },
                    resultText: "'True victory is in survival.' The echo speaks the truth and grants you its protective energy, healing you completely.",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: '"Which of you thinks I\'m the prettiest?"',
                emoji: '🥰',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Chaotic Flattery', description: 'Your skin tone has changed!', type: 'buff', modifiers: {} }], duration_ms: Infinity },
                    resultText: 'All three echoes clamor to agree with you. The chaotic energy of their pandering magically alters your skin tone for this run!',
                    outcomeEmoji: '🌈'
                }
            }
        ]
    },
    {
        id: 'haunted_catacombs_14_ghoul_feast',
        title: "The Ghoul's Dinner Party",
        description: 'A surprisingly cheerful ghoul 🧟 invites you to its "dinner party." The table is set with cobwebs, and the main course is a quivering, grey mystery meat. "Bon appétit!" it says.',
        emojis: ['🧟', '🍽️', '🤢', '😋'],
        eventType: 'realm_specific',
        realm: 'Haunted Catacombs',
        options: [
            {
                text: '"Looks delicious!" (Requires Health focus)',
                emoji: '😋',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Iron Stomach', description: 'Permanently gain +10% Max Health.', type: 'buff', modifiers: { percent: { maxHealth: 0.10 } } }], duration_ms: Infinity },
                    resultText: 'You eat the mystery meat. It tastes... ancient. But your strong constitution turns it into permanent vitality.',
                    outcomeEmoji: '💪'
                }
            },
            {
                text: '"Could I have a drink instead?"',
                emoji: '🍷',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.10 },
                    resultText: 'It serves you a goblet of what is definitely not wine. The foul liquid damages you for 10% of your max health.',
                    outcomeEmoji: '🤢'
                }
            },
            {
                text: '"I\'m a terrible cook, let me help!" (Female)',
                emoji: '♀️',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 400 },
                    resultText: 'The ghoul is so flattered it lets you in on its secret stash of "spices" (valuable grave dust).',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: '"This calls for a toast!" (Male)',
                emoji: '♂️',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_missing', amount: 0.50 },
                    resultText: 'You raise your flask. The ghoul joins in. After a drink, it\'s so happy it gives you a potent healing potion.',
                    outcomeEmoji: '❤️‍🩹'
                }
            }
        ]
    },
    {
        id: 'haunted_catacombs_15_epitaph',
        title: 'The Incomplete Epitaph',
        description: 'You find a grand tombstone with a half-finished epitaph: "Here lies Bartholomew the Bold, who in his final moment, showed not fear, but..." The chisel lies next to the stone.',
        emojis: ['🪦', '✍️', '🤔', '💖'],
        eventType: 'realm_specific',
        realm: 'Haunted Catacombs',
        options: [
            {
                text: 'Carve "...unflinching courage."',
                emoji: '💪',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Spirit of Courage', description: 'Permanently gain +5% Attack Power.', type: 'buff', modifiers: { percent: { attackPower: 0.05 } } }], duration_ms: Infinity },
                    resultText: "The ghost of a warrior appears, salutes you, and imbues your weapon with his spirit.",
                    outcomeEmoji: '⚔️'
                }
            },
            {
                text: 'Carve "...a surprising sense of humor."',
                emoji: '😂',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 350 },
                    resultText: 'A ghostly chuckle echoes. The tombstone cracks open, revealing a stash of gold hidden by the jester who wrote the epitaph.',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Carve "...a moment of hesitation."',
                emoji: '😰',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Echo of Doubt', description: 'You feel hesitant. -15% Accuracy for 2 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.15 } } }], duration_ms: 120000 },
                    resultText: 'A sad sigh is heard. The air grows cold, and your hands tremble with regret.',
                    outcomeEmoji: '😭'
                }
            },
            {
                text: 'Carve "...a deep love for his pet rock."',
                emoji: '💖',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r5', rarity: 'legendary' }, // Lucky Horseshoe
                    resultText: "The ghost of Bartholomew appears, holding a pet rock. He's so happy you understood him, he gives you his rock. It's a legendary good luck charm!",
                    outcomeEmoji: '🪨'
                }
            }
        ]
    }
];