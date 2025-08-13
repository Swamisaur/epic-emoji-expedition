/**
 * @file data/events/madKingsVault.ts
 * @description Contains the first batch of events specific to The Mad King's Vault realm.
 */
import { GameEvent, EventConsequenceType } from '../../types';

export const madKingsVaultEvents_1: GameEvent[] = [
    {
        id: 'mad_kings_vault_01',
        title: "The Mimic's Gambit",
        description: "You enter a room filled with treasure chests of all shapes and sizes. A skeletal finger has scrawled on the wall: 'Only one holds true treasure. The rest... BITE.'",
        emojis: ['🎁', '💎', '💰', '🦷'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'Open the ornate, golden chest.',
                emoji: '👑',
                consequence: {
                    type: EventConsequenceType.ITEM_REWARD,
                    payload: { itemId: 'r10', rarity: 'legendary' }, // Infinity Stone
                    resultText: "Your gamble pays off! The chest contains an item of unimaginable power, a true king's treasure.",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Open the plain, wooden chest.',
                emoji: '📦',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 400 },
                    resultText: "A safe bet. The simple chest is filled to the brim with gold coins.",
                    outcomeEmoji: '💰'
                }
            },
            {
                text: 'Open the one that is slightly ajar.',
                emoji: '👀',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Mimic's Greed", description: "-10% Fortune for 3 minutes.", type: 'debuff', modifiers: { percent: { luck: -0.10 } } }], duration_ms: 180000 },
                    resultText: "It's a mimic! It chomps on your arm before you can react, cursing you with bad luck.",
                    outcomeEmoji: '😵'
                }
            },
            {
                text: 'Leave the room untouched.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "The odds are not in your favor. You decide not to play the mimic's game.",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'mad_kings_vault_02_accountant',
        title: "The Royal Accountant",
        description: "The ghost of a frantic, wiry man is endlessly counting spectral coins. 'The books... must be balanced!' he wails, not noticing you.",
        emojis: ['👻', '🧾', '💰', '🤔'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'Help him count.',
                emoji: '➕',
                consequence: {
                    type: EventConsequenceType.SET_FLAG,
                    payload: { flag: 'accountant_helped' },
                    resultText: "You help him with the math. He is grateful. 'The King kept the grand vault's key in his... memory,' he whispers. 'The numbers... 10-3-24...'",
                    outcomeEmoji: '🤫'
                }
            },
            {
                text: 'Give him 100 gold.',
                emoji: '🪙',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Accountant's Blessing", description: "Permanently gain +5% Fortune.", type: 'buff', modifiers: { percent: { luck: 0.05 } } }], duration_ms: Infinity },
                    resultText: "He eagerly adds your coin to his spectral pile. 'A new asset! Bless you!' A bit of his obsessive luck rubs off on you.",
                    outcomeEmoji: '😇'
                }
            },
            {
                text: 'Tip over his coin piles.',
                emoji: '😈',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Bureaucratic Curse", description: "You feel disorganized. -10% Crit Chance for 2 minutes.", type: 'debuff', modifiers: { percent: { critChance: -0.10 } } }], duration_ms: 120000 },
                    resultText: "He lets out a soul-rending shriek of pure rage, cursing your lack of organizational skills.",
                    outcomeEmoji: '😠'
                }
            },
            {
                text: 'Sneak past quietly.',
                emoji: '🤫',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You quietly slip past the preoccupied ghost.",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'mad_kings_vault_03_treasury',
        title: "The Royal Treasury",
        description: "You find a colossal vault door with a complex combination lock. You remember the accountant's numbers: 10-3-24.",
        emojis: ['🔒', '💰', '💎', '🤑'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        requiredFlag: 'accountant_helped',
        options: [
            {
                text: 'Enter the combination: 10-3-24.',
                emoji: '🔑',
                consequence: {
                    type: EventConsequenceType.RESOURCE,
                    payload: { amount: 1500 },
                    resultText: "The tumblers click into place. The massive door swings open, revealing a mountain of gold. You've hit the jackpot!",
                    outcomeEmoji: '🤑'
                }
            },
            {
                text: 'Try to break the lock.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Golden Sludge", description: "A trap sprays you with sticky gold. -15% Attack Speed for 2 minutes.", type: 'debuff', modifiers: { percent: { attackSpeed: -0.15 } } }], duration_ms: 120000 },
                    resultText: "A terrible idea. A trap triggers, covering you in a sticky, golden sludge that slows you down.",
                    outcomeEmoji: '😫'
                }
            },
            {
                text: 'Try a different combination.',
                emoji: '🤔',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "You try a few other numbers, but nothing happens. The lock is too complex.",
                    outcomeEmoji: '🤷'
                }
            },
            {
                text: 'Leave the vault.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "It's too much trouble. You leave the vault for other adventurers.",
                    outcomeEmoji: '👍'
                }
            }
        ]
    },
    {
        id: 'mad_kings_vault_04',
        title: 'The Hall of Mirrors',
        description: "You enter a hall lined with ornate, golden mirrors. Each reflects you, but one shows you holding a sword of pure light that you do not possess.",
        emojis: ['🪞', '✨', '⚔️', '💔'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'Reach into the mirror for the sword.',
                emoji: '✋',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Shattered Self", description: "You gain a powerful weapon, but lose a piece of yourself. Permanently -10% Max Health.", type: 'debuff', modifiers: { percent: { maxHealth: -0.10 } } }], duration_ms: Infinity },
                    resultText: "Your hand passes through the cold glass. You pull out the sword, but feel a piece of your spirit tear away, leaving you more fragile.",
                    outcomeEmoji: '⚔️'
                }
            },
            {
                text: 'Smash the enchanted mirror.',
                emoji: '💥',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "77 Years Bad Luck", description: "You feel incredibly unlucky. -20% Fortune for 3 minutes.", type: 'debuff', modifiers: { percent: { luck: -0.20 } } }], duration_ms: 180000 },
                    resultText: "You shatter the mirror. The sound is deafening, and a wave of catastrophic bad luck washes over you.",
                    outcomeEmoji: '😭'
                }
            },
            {
                text: 'Talk to your reflection.',
                emoji: '🗣️',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Mirror's Blessing", description: "+15% to all core stats for 2 minutes.", type: 'buff', modifiers: { percent: { attackPower: 0.15, maxHealth: 0.15, attackSpeed: 0.15 } } }], duration_ms: 120000 },
                    resultText: "Your reflection smiles, and its power flows into you, granting a temporary, massive boost to your abilities.",
                    outcomeEmoji: '🤩'
                }
            },
            {
                text: 'Walk past without looking.',
                emoji: '🚶',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "These mirrors are bad news. You avert your eyes and walk straight through the hall.",
                    outcomeEmoji: '😌'
                }
            }
        ]
    },
    {
        id: 'mad_kings_vault_05',
        title: "The Mad King's Jester",
        description: "The ghostly jester of the court appears before you, juggling skulls. 'A riddle for the intruder!' he cackles. 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?'",
        emojis: ['🤡', '💀', '❓', '🗺️'],
        eventType: 'realm_specific',
        realm: "The Mad King's Vault",
        options: [
            {
                text: 'A Map.',
                emoji: '🤔',
                consequence: {
                    type: EventConsequenceType.TELEPORT,
                    payload: { substages: 2 },
                    resultText: "'Correct!' the jester giggles, bowing low. He vanishes, and a secret door creaks open, revealing a shortcut.",
                    outcomeEmoji: '✅'
                }
            },
            {
                text: 'A Dream.',
                emoji: '💭',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Jester's Mockery", description: "You feel foolish. -10% Crit Damage for 90s.", type: 'debuff', modifiers: { percent: { critDamage: -0.10 } } }], duration_ms: 90000 },
                    resultText: "'Wrong!' he shrieks with laughter. His mockery makes you second-guess your own abilities.",
                    outcomeEmoji: '❌'
                }
            },
            {
                text: 'A Painting.',
                emoji: '🎨',
                consequence: {
                    type: EventConsequenceType.STAT_MODIFIER,
                    payload: { effects: [{ name: "Jester's Mockery", description: "You feel foolish. -10% Crit Damage for 90s.", type: 'debuff', modifiers: { percent: { critDamage: -0.10 } } }], duration_ms: 90000 },
                    resultText: "'Wrong!' he shrieks with laughter. His mockery makes you second-guess your own abilities.",
                    outcomeEmoji: '❌'
                }
            },
            {
                text: "I don't have time for games.",
                emoji: '😠',
                consequence: {
                    type: EventConsequenceType.NOTHING,
                    resultText: "'No fun at all!' the jester pouts, fading away into the wall.",
                    outcomeEmoji: '😒'
                }
            }
        ]
    }
];