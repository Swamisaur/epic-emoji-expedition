/**
 * @file data/events/madKingsVault_5.ts
 * @description Contains the fifth batch of events specific to The Mad King's Vault realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const madKingsVaultEvents_5: GameEvent[] = [
    {
        id: 'mad_kings_vault_12_echo',
        title: "The Mad King's Echo",
        description: "A shimmering echo of the Mad King himself 👑 sits on the throne, laughing. 'Another challenger! Come, entertain me, and I may grant you a gift from my treasury.' 🤪",
        emojis: ['👑', '🤪', '💪', '🍀'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: '"Behold my strength!"',
                emoji: '💪',
                requirement: { focus: 'power' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Kingly Nod', description: 'Permanently gain +5% Attack Power.', type: 'buff', modifiers: { percent: { attackPower: 0.05 } } }], duration_ms: Infinity },
                    resultText: 'You display your might. The King\'s echo nods in approval. "Impressive. Take this boon of strength."',
                    outcomeEmoji: '👍'
                }
            },
            {
                text: '"Witness my luck!"',
                emoji: '🍀',
                requirement: { focus: 'fortune' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 1000 },
                    resultText: 'You perform an impossible feat of chance. "Hah! Fortune favors the bold!" the King laughs, showering you with gold.',
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: '"You seem lonely."',
                emoji: '🥰',
                requirement: { gender: 'female' },
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r10', rarity: 'legendary' }, // Infinity Stone
                    resultText: 'The echo stops laughing. "...I am." Your empathy touches its spectral heart. It gifts you its most prized treasure.',
                    outcomeEmoji: '💖'
                }
            },
            {
                text: '"This vault is mine now."',
                emoji: '😠',
                requirement: { gender: 'male' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Royal Mockery', description: 'His laughter rattles you. -15% Accuracy for 2 minutes.', type: 'debuff', modifiers: { percent: { accuracy: -0.15 } } }], duration_ms: 120000 },
                    resultText: 'The King laughs hysterically. "Audacious! But foolish." His mocking laughter fills you with self-doubt, making your aim unsteady.',
                    outcomeEmoji: '😂'
                }
            }
        ]
    },
    {
        id: 'mad_kings_vault_13_treasury_trap',
        title: 'The Treasury Trap',
        description: 'You enter a vast chamber filled to your knees with gold coins 💰. The floor groans ominously. It feels... unstable.',
        emojis: ['💰', '🏃', '💪', '🏊'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'Dash across the gold.',
                emoji: '💨',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Golden Dash', description: 'Your speed is rewarded. +15% Attack Speed for 2 minutes.', type: 'buff', modifiers: { percent: { attackSpeed: 0.15 } } }], duration_ms: 120000 },
                    resultText: 'You sprint across the coins just as the floor gives way behind you. Your adrenaline is pumping!',
                    outcomeEmoji: '😎'
                }
            },
            {
                text: 'Wade through it carefully.',
                emoji: '💪',
                requirement: { focus: 'health' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 750 },
                    resultText: 'You trigger the trap, but your resilience allows you to weather the collapsing floor and grab a massive amount of gold on your way down to the next level.',
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Throw a rock to test it.',
                emoji: '🪨',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 1 },
                    resultText: 'The rock triggers the trap, collapsing the floor and revealing a secret passage below that serves as a shortcut.',
                    outcomeEmoji: '🚀'
                }
            },
            {
                text: 'Attempt a gold swim.',
                emoji: '🏊',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: -2 },
                    resultText: 'You dive in. Gold coins are not liquid. The trap triggers, and you are washed back two rooms by a flood of heavy, painful metal.',
                    outcomeEmoji: '😫'
                }
            }
        ]
    },
    {
        id: 'mad_kings_vault_14_jester_masks',
        title: "The Jester's Final Joke",
        description: "The ghostly jester 🤡 appears, holding three magical masks. 'Comedy 🤣, Tragedy 😭, or Mystery 🤔? Choose your face for the final act!'",
        emojis: ['🤡', '🤣', '😭', '🤔'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'Wear the Comedy Mask.',
                emoji: '🤣',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Cosmic Joke', description: 'The absurdity is liberating! You permanently gain +5% Fortune.', type: 'buff', modifiers: { percent: { luck: 0.05 } } }], duration_ms: Infinity },
                    resultText: "You can't stop laughing! The cosmic absurdity of it all blesses you with permanent good luck.",
                    outcomeEmoji: '🌈'
                }
            },
            {
                text: 'Wear the Tragedy Mask.',
                emoji: '😭',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'Tragic Power', description: 'Permanently gain +10% Crit Damage, but lose 5% Max Health.', type: 'buff', modifiers: { percent: { critDamage: 0.10, maxHealth: -0.05 } } }], duration_ms: Infinity },
                    resultText: "You are filled with the sorrow of a thousand fallen kings. The pain hones your critical strikes, but weakens your spirit.",
                    outcomeEmoji: '💔'
                }
            },
            {
                text: 'Wear the Mystery Mask.',
                emoji: '🤔',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "A New Role", description: "A new identity! You gain a deeper understanding of self, and permanently gain +5% to all core stats.", type: 'buff', modifiers: { percent: { attackPower: 0.05, maxHealth: 0.05, attackSpeed: 0.05 } } }], duration_ms: Infinity },
                    resultText: "The mask merges with your face, granting you a new perspective on your own being. You feel different, but more powerful than ever.",
                    outcomeEmoji: '✨'
                }
            },
            {
                text: 'Juggle the masks.',
                emoji: '🤹',
                consequence: {
                    type: EventConsequenceType.HEAL,
                    payload: { healType: 'percent_max', amount: 0.25 },
                    resultText: 'The jester is so impressed with your skills, he applauds and casts a potent healing spell on you.',
                    outcomeEmoji: '👏'
                }
            }
        ]
    },
    {
        id: 'mad_kings_vault_15_true_treasure',
        title: "The King's True Treasure",
        description: 'You find a small, simple wooden box 📦 next to an opulent, jewel-encrusted chest 💎. A plaque reads "My True Treasure".',
        emojis: ['📦', '💎', '❤️', '💥'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'Open the simple wooden box.',
                emoji: '📦',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: 'True Treasure', description: 'The King\'s love for his lost child blesses you, granting a permanent +10% to all core stats.', type: 'buff', modifiers: { percent: { attackPower: 0.1, maxHealth: 0.1, attackSpeed: 0.1 } } }], duration_ms: Infinity },
                    resultText: 'Inside is a faded drawing of a child. The king\'s love for his lost child blesses you, granting a powerful permanent boon.',
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Open the jewel-encrusted chest.',
                emoji: '💎',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 1200 },
                    resultText: "It's not a trap, just a distraction. Inside is a massive pile of gold and jewels.",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Smash them both.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 400 },
                    resultText: 'You destroy both chests. The jewel chest spills gold, but the blessing from the wooden box is lost forever.',
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Quickly loot both.',
                emoji: '💨',
                requirement: { focus: 'speed' },
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 600 },
                    resultText: "You're fast enough to snatch a hefty amount of gold from the jewel chest and the blessing from the wooden box before anything bad can happen!",
                    outcomeEmoji: '😎'
                }
            }
        ]
    }
];