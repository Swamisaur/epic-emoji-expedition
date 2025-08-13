/**
 * @file data/classes/conArtist.ts
 * @description Defines the Con Artist class.
 */
import { PlayerClass, UpgradeId, SpecialAbilityId } from '../../types';

export const conArtist: PlayerClass = {
    id: 'conArtist',
    name: 'Con Artist',
    emoji: '🤹',
    description: 'A silver-tongued trickster who juggles fortune and risk.',
    tier: 'base',
    unlockDescription: 'Available from the start.',
    classStatId: UpgradeId.LoadedDice,
    noviceEffectDescription: "Your juggling skills pay off: Luck increased slightly.",
    expertEffectDescription: "Master con artist: Luck and Crit Chance increased further.",
    specializationBonuses: {
        novice: { percent: { luck: 0.10 } },
        expert: { percent: { luck: 0.20, critChance: 0.05 } }
    },
    transformations: [
        {
            focus: 'power',
            upgradeId: UpgradeId.GreasePalm,
            novice: { neutral: '💁', male: '💁‍♂️', female: '💁‍♀️' },
            expert: { neutral: '🤵', male: '🤵‍♂️', female: '🤵‍♀️' },
        },
        {
            focus: 'speed',
            upgradeId: UpgradeId.QuickFingers,
            novice: { neutral: '🧑‍🎨', male: '👨‍🎨', female: '👩‍🎨' },
            expert: { neutral: '🧑‍🎤', male: '👨‍🎤', female: '👩‍🎤' },
        },
        {
            focus: 'health',
            upgradeId: UpgradeId.PocketSnacks,
            novice: { neutral: '🧑‍🍳', male: '👨‍🍳', female: '👩‍🍳' },
            expert: { neutral: '🙆', male: '🙆‍♂️', female: '🙆‍♀️' },
        },
        {
            focus: 'fortune',
            upgradeId: UpgradeId.LoadedDice,
            novice: { neutral: '🕵️', male: '🕵️‍♂️', female: '🕵️‍♀️' },
            expert: { neutral: '🤹', male: '🤹‍♂️', female: '🤹‍♀️' },
        },
    ],
    baseStats: {
        attackPower: 6,
        attackSpeed: 1.15,
        critChance: 0.10,
        critDamage: 1.6,
        maxHealth: 95,
        luck: 1.20,
        accuracy: 0.95,
        damageReduction: 0
    },
    upgrades: [
        { id: UpgradeId.LoadedDice, name: 'Loaded Dice', baseCost: 6, costIncreaseFactor: 1.22, description: 'Moderate Luck up.', statChangeText: '+12% Fortune', category: 'core', emoji: '🎲' },
        { id: UpgradeId.QuickFingers, name: 'Quick Fingers', baseCost: 5, costIncreaseFactor: 1.22, description: 'Small Attack-speed up.', statChangeText: '+0.25 APS', category: 'core', emoji: '🤏' },
        { id: UpgradeId.PocketSnacks, name: 'Pocket Snacks', baseCost: 4, costIncreaseFactor: 1.22, description: 'Small Health up.', statChangeText: '+35 Health', category: 'core', emoji: '🍪' },
        { id: UpgradeId.LuckyStrike, name: 'Lucky Strike', baseCost: 5, costIncreaseFactor: 1.22, description: 'Small Crit-chance up.', statChangeText: '+3% Crit', category: 'core', emoji: '🍀' },
        { id: UpgradeId.SlickMoves, name: 'Slick Moves', baseCost: 42, costIncreaseFactor: 1.25, description: 'Small Dodge up.', statChangeText: '+2% Dmg Resist', category: 'grind', emoji: '🕺', unlockCriteria: { requiredCoreUpgradeVariety: 1 } },
        { id: UpgradeId.GoldenTongue, name: 'Golden Tongue', baseCost: 48, costIncreaseFactor: 1.25, description: 'Luck increases each shop visit.', statChangeText: '+12% Fortune', category: 'grind', emoji: '💬', unlockCriteria: { requiredCoreUpgradeVariety: 2 } },
        { id: UpgradeId.MarkedCards, name: 'Marked Cards', baseCost: 54, costIncreaseFactor: 1.25, description: 'Small Crit-damage up.', statChangeText: '+20% Crit Dmg', category: 'grind', emoji: '🂡', unlockCriteria: { requiredCoreUpgradeVariety: 3 } },
        { id: UpgradeId.GreasePalm, name: 'Grease Palm', baseCost: 60, costIncreaseFactor: 1.25, description: 'Medium Attack up.', statChangeText: '+8 Attack', category: 'grind', emoji: '🤝', unlockCriteria: { requiredCoreUpgradeVariety: 4 } }
    ],
    skills: [
        { id: SpecialAbilityId.CoinFlip, name: 'Double or Nothing', description: 'Heads: Deals 3000% AP damage and you gain that much gold. Tails: The coin flips you. Lose 50% of your current gold.', cost: (stage) => 8 + stage * 2, cooldown: 5000, unlockCriteria: { requiredTotalLevels: 2 }, emoji: '🪙' },
        { id: SpecialAbilityId.EscapeRope, name: 'Getaway', description: 'Vanish in a puff of smoke. The next 3 enemy attacks miss. In the confusion, you miraculously find a hidden purse of gold.', cost: (stage) => 10 + Math.floor(stage * 2.5), cooldown: 10000, unlockCriteria: { requiredTotalLevels: 5 }, emoji: '🧵' },
        { id: SpecialAbilityId.Pickpocket, name: 'Heist', description: 'A masterful strike that deals 400% AP damage and steals a jaw-dropping 50% of the enemy\'s total gold, plus a handsome bonus.', cost: (stage) => 14 + Math.floor(stage * 3.5), cooldown: 15000, unlockCriteria: { requiredTotalLevels: 15 }, emoji: '👜' },
        { id: SpecialAbilityId.Jackpot, name: 'Jackpot', description: 'Hit the big one! Instantly win a massive pile of gold and gain an unbelievable +50% Crit Chance and +100% Fortune for 15s.', cost: (stage, casts = 0) => 50 + stage * 10 + casts * 25, cooldown: 20000, unlockCriteria: { requiredTotalLevels: 30 }, emoji: '🎰' }
    ]
};