/**
 * @file data/events/fallenCitadel_5.ts
 * @description Contains the fifth batch of events specific to the Fallen Citadel realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const fallenCitadelEvents_5: GameEvent[] = [
    {
        id: 'fallen_citadel_12_courtier',
        title: 'The Spectral Courtier',
        description: "A ghostly noblewoman 👻 glides through a long-abandoned ballroom, weeping for her lost locket. 'My love's final gift... gone...' she sobs.",
        emojis: ['👻', '😭', '💖', '💃'],
        eventType: 'realm_specific',
        realm: 'Fallen Citadel',
        options: [
            {
                text: 'Search for the locket. (Requires Luck focus)',
                emoji: '🍀',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Courtier\'s Gratitude', description: 'Permanently gain +5% Fortune.', type: 'buff', modifiers: { percent: { luck: 0.05 } } }], duration_ms: Infinity },
                    resultText: "Your keen eyes spot something shimmering under a floorboard. It's the locket! The ghost thanks you with a blessing of good fortune.",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Ask her for a dance. (Male character)',
                emoji: '💃',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.40 },
                    resultText: "She accepts, and for a moment, the ballroom is filled with spectral music. Her ghostly touch is surprisingly restorative, healing you for 40% of your max health.",
                    outcomeEmoji: '🥰'
                }
            },
            {
                text: 'Offer a handkerchief. (Female character)',
                emoji: '♀️',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 150 },
                    resultText: "She takes the handkerchief and dabs her spectral eyes. 'A simple kindness... thank you.' A small purse of old coins appears at your feet.",
                    outcomeEmoji: '🪙'
                }
            },
            {
                text: '"He probably left you for a reason."',
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'A Woman\'s Scorn', description: 'Her weeping turns to rage! -15% Accuracy for 2 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.15 } } }], duration_ms: 120000 },
                    resultText: "Her weeping turns into a furious shriek. A curse of sorrow clouds your vision, making it hard to focus.",
                    outcomeEmoji: '😡'
                }
            }
        ]
    },
    {
        id: 'fallen_citadel_13_library',
        title: 'The Whispering Library',
        description: 'You enter a vast library where books float in the air, whispering forgotten lore. One glowing tome floats towards you. 📖',
        emojis: ['📖', '🔥', '💨', '💀'],
        eventType: 'realm_specific',
        realm: 'Fallen Citadel',
        options: [
            {
                text: 'Read the "Tome of Endless War." (Requires Power focus)',
                emoji: '🔥',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'War Secrets', description: '+25% Attack Power for 2 minutes.', type: 'buff', modifiers: { percent: { attackPower: 0.25 } } }], duration_ms: 120000 },
                    resultText: "The tome fills your mind with brutal, ancient battle tactics, granting you a massive surge of power.",
                    outcomeEmoji: '💥'
                }
            },
            {
                text: 'Read the "Manual of Swift Blades." (Requires Speed focus)',
                emoji: '💨',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Blade Dancer\'s Secrets', description: '+25% Attack Speed for 2 minutes.', type: 'buff', modifiers: { percent: { attackSpeed: 0.25 } } }], duration_ms: 120000 },
                    resultText: "The manual shows you techniques of blinding speed, making your movements a blur.",
                    outcomeEmoji: '⚡️'
                }
            },
            {
                text: 'Touch the skull-bound book.',
                emoji: '💀',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.15 },
                    resultText: "The book snaps shut on your hand like a jaw! It drains 15% of your max health before you can pull free.",
                    outcomeEmoji: '😫'
                }
            },
            {
                text: 'Catch the book with gold leaf pages.',
                emoji: '💰',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 400 },
                    resultText: "You snatch the book. The pages are heavy and made of pure, solid gold!",
                    outcomeEmoji: '🤑'
                }
            }
        ]
    },
    {
        id: 'fallen_citadel_14_armor',
        title: "The King's Empty Armor",
        description: "The Mad King's personal suit of ornate, black armor stands on a dais, empty but radiating an immense pressure. It seems to beckon to you. 🛡️",
        emojis: ['🛡️', '💪', '✨', '😂'],
        eventType: 'realm_specific',
        realm: 'Fallen Citadel',
        options: [
            {
                text: 'Try to wear it. (Requires Health focus)',
                emoji: '💪',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Armor\'s Echo', description: 'Permanently gain +10% Max Health.', type: 'buff', modifiers: { percent: { maxHealth: 0.10 } } }], duration_ms: Infinity },
                    resultText: "It's far too heavy, but as you touch it, you absorb an echo of its incredible resilience, permanently boosting your health.",
                    outcomeEmoji: '🛡️'
                }
            },
            {
                text: 'Polish the breastplate.',
                emoji: '✨',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 200 },
                    resultText: "The ghost of a royal squire appears and thanks you for your service, showing you a hidden compartment with coins inside.",
                    outcomeEmoji: '🪙'
                }
            },
            {
                text: 'Put a funny hat on it.',
                emoji: '😂',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.10 },
                    resultText: "The armor animates for a moment, delivering a swift punch that deals 10% of your max health in damage before settling down again.",
                    outcomeEmoji: '👊'
                }
            },
            {
                text: 'Melt it down for scrap.',
                emoji: '🔥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 75 },
                    resultText: "The armor is enchanted and won't melt, but you manage to scrape off some of the valuable gold filigree.",
                    outcomeEmoji: '💰'
                }
            }
        ]
    },
    {
        id: 'fallen_citadel_15_executioner',
        title: "The Executioner's Block",
        description: "You find the old executioner's block in a grim courtyard. The headsman's axe, stained with spectral blood, is still embedded in the wood. 🪓",
        emojis: ['🪓', '💀', '🙏', '🩸'],
        eventType: 'realm_specific',
        realm: 'Fallen Citadel',
        options: [
            {
                text: 'Take the Headsman\'s Axe.',
                emoji: '🪓',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Cursed Axe', description: 'A powerful but cursed weapon. Permanently +15% Attack Power, but -10% Max Health.', type: 'buff', modifiers: { percent: { attackPower: 0.15, maxHealth: -0.10 } } }], duration_ms: Infinity },
                    resultText: "You claim the axe. It is immensely powerful, but carrying it feels like a heavy weight on your soul.",
                    outcomeEmoji: '😈'
                }
            },
            {
                text: 'Say a prayer for the condemned.',
                emoji: '🙏',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Spirits' Gratitude", description: 'The spirits are grateful. Permanently gain +5% Crit Chance.', type: 'buff', modifiers: { percent: { critChance: 0.05 } } }], duration_ms: Infinity },
                    resultText: "The tormented spirits are soothed by your prayer, granting you their collective insight into finding final, critical peace.",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Test the block with your finger.',
                emoji: '👆',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: -0.05 },
                    resultText: "It's still sharp. You get a nasty cut, taking 5% of your max health in damage.",
                    outcomeEmoji: '🩸'
                }
            },
            {
                text: 'Use the block for a quick rest.',
                emoji: '😴',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_missing', amount: 0.25 },
                    resultText: "It's a morbid seat, but a seat nonetheless. You rest, healing 25% of your missing health. The ghosts don't seem to mind.",
                    outcomeEmoji: '😌'
                }
            }
        ]
    }
];