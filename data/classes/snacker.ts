/**
 * @file data/classes/snacker.ts
 * @description Defines the Snacker class.
 */
import { PlayerClass, UpgradeId, SpecialAbilityId } from '../../types';

export const snacker: PlayerClass = {
    id: 'snacker',
    name: 'Snacker',
    emoji: '🫃',
    description: 'A connoisseur of combat cuisine, turning snacks into survivability.',
    tier: 'base',
    unlockDescription: 'Available from start.',
    classStatId: UpgradeId.SnackStack,
    noviceEffectDescription: "Focusing on Health grants a Novice bonus, increasing Max Health by 10%.",
    expertEffectDescription: "Mastering Health replaces the Novice bonus with an Expert bonus, increasing Max Health by 25% and adding 5% Damage Reduction.",
    specializationBonuses: {
        novice: { percent: { maxHealth: 0.10 } },
        expert: { percent: { maxHealth: 0.25, damageReduction: 0.05 } },
    },
    transformations: [
        {
            focus: 'power',
            upgradeId: UpgradeId.BulkUp,
            novice: { neutral: '🧑‍🍳', male: '👨‍🍳', female: '👩‍🍳' },
            expert: { neutral: '🧑‍🌾', male: '👨‍🌾', female: '👩‍🌾' },
        },
        {
            focus: 'speed',
            upgradeId: UpgradeId.SugarRush,
            novice: { neutral: '🧟', male: '🧟‍♂️', female: '🧟‍♀️' },
            expert: { neutral: '🧛', male: '🧛‍♂️', female: '🧛‍♀️' },
        },
        {
            focus: 'health',
            upgradeId: UpgradeId.SnackStack,
            novice: { neutral: '🧑‍🍳', male: '👨‍🍳', female: '👩‍🍳' },
            expert: { neutral: '🫄', male: '🫃', female: '🤰' },
        },
        {
            focus: 'fortune',
            upgradeId: UpgradeId.ComfortFood,
            novice: { neutral: '🤑', male: '🤑', female: '🤑' },
            expert: { neutral: '🧝', male: '🧝‍♂️', female: '🧝‍♀️' },
        },
    ],
    baseStats: {
        attackPower: 5,
        attackSpeed: 1.0,
        critChance: 0.05,
        critDamage: 1.5,
        maxHealth: 150,
        luck: 1.15,
        accuracy: 0.90,
        damageReduction: 0.05,
    },
    upgrades: [
        // Core
        { id: UpgradeId.SnackStack, name: 'Snack Stack', baseCost: 5, costIncreaseFactor: 1.18, description: 'Increases base Max Health.', statChangeText: '+50 Health', category: 'core', emoji: '🍔' },
        { id: UpgradeId.ThickSkin, name: 'Thick Skin', baseCost: 7, costIncreaseFactor: 1.25, description: 'Increases Damage Reduction.', statChangeText: '+2% Dmg Resist', category: 'core', emoji: '🥞' },
        { id: UpgradeId.BulkUp, name: 'Bulk Up', baseCost: 6, costIncreaseFactor: 1.20, description: 'Increases base Attack Power.', statChangeText: '+4 Attack', category: 'core', emoji: '🥱' },
        { id: UpgradeId.ComfortFood, name: 'Comfort Food', baseCost: 4, costIncreaseFactor: 1.15, description: 'Increases base Fortune.', statChangeText: '+8% Fortune', category: 'core', emoji: '🍕' },
        // Grind
        { id: UpgradeId.SnackHeal, name: 'Snack Heal', baseCost: 45, costIncreaseFactor: 1.4, description: 'Heal a small amount after each battle.', statChangeText: '+20 Heal/Wave', category: 'grind', emoji: '🍎', unlockCriteria: { requiredCoreUpgradeVariety: 1 } },
        { id: UpgradeId.GreaseShield, name: 'Grease Shield', baseCost: 60, costIncreaseFactor: 1.45, description: 'Gain a small shield after each battle.', statChangeText: '+30 Shield/Wave', category: 'grind', emoji: '🥓', unlockCriteria: { requiredCoreUpgradeVariety: 2 } },
        { id: UpgradeId.SugarRush, name: 'Sugar Rush', baseCost: 30, costIncreaseFactor: 1.35, description: '+0.25 Attacks Per Second.', statChangeText: '+0.25 APS', category: 'grind', emoji: '🍬', unlockCriteria: { requiredCoreUpgradeVariety: 3 } },
        { id: UpgradeId.CalorieConvert, name: 'Calorie Convert', baseCost: 90, costIncreaseFactor: 1.5, description: 'Increases Crit Chance when above 90% health.', statChangeText: '+5% Crit (HP>90%)', category: 'grind', emoji: '⚡️', unlockCriteria: { requiredCoreUpgradeVariety: 4 } },
    ],
    skills: [
        { id: SpecialAbilityId.Munch, name: 'Gourmet Bite', description: 'Consume a five-star snack, dealing 300% AP damage, healing 40% of max HP, and granting a delicious shield for 10s.', cost: (stage) => 4 + Math.floor(stage * 1.5), cooldown: 8000, emoji: '🥪', unlockCriteria: { requiredTotalLevels: 2 } },
        { id: SpecialAbilityId.StickyGlaze, name: 'Caramelize', description: 'Encase your foe in molten sugar, slowing their attacks by a massive 75% and inflicting a scorching burn DoT.', cost: (stage) => 5 + stage * 2, cooldown: 15000, emoji: '🍯', unlockCriteria: { requiredTotalLevels: 5 } },
        { id: SpecialAbilityId.RollingPin, name: 'Tenderize', description: 'WHACK! A colossal swing that deals 1500% AP damage and stuns the enemy for 2s.', cost: (stage) => 10 + stage * 3, cooldown: 20000, emoji: '🥖', unlockCriteria: { requiredTotalLevels: 15 } },
        { id: SpecialAbilityId.FeastMode, name: 'Food Coma', description: 'Enter the ultimate state of culinary nirvana. Heal to full, gain a 100% max HP shield, 75% damage reduction, and reflect 25% of damage for 15s.', cost: (stage) => 20 + stage * 5, cooldown: 45000, emoji: '🍗', unlockCriteria: { requiredTotalLevels: 30 } },
    ]
};