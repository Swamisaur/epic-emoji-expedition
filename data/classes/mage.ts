/**
 * @file data/classes/mage.ts
 * @description Defines the Mage class.
 */
import { PlayerClass, UpgradeId, SpecialAbilityId } from '../../types';

export const mage: PlayerClass = {
    id: 'mage',
    name: 'Mage',
    emoji: '🧙',
    description: 'A master of arcane arts, focused on critical strikes and elemental power.',
    tier: 'base',
    unlockDescription: 'Available from start.',
    classStatId: UpgradeId.ArcaneFocus,
    noviceEffectDescription: "Focusing on criticals grants a Novice bonus, increasing Crit Chance by 10%.",
    expertEffectDescription: "Mastering criticals replaces the Novice bonus with an Expert bonus, increasing Crit Chance by 15% and Crit Damage by 15%.",
    specializationBonuses: {
        novice: { percent: { critChance: 0.10 } },
        expert: { percent: { critChance: 0.15, critDamage: 0.15 } },
    },
    transformations: [
        {
            focus: 'power',
            upgradeId: UpgradeId.ManaSurge,
            novice: { neutral: '🧑‍🔬', male: '👨‍🔬', female: '👩‍🔬' },
            expert: { neutral: '🦸', male: '🦸‍♂️', female: '🦸‍♀️' },
        },
        {
            focus: 'speed',
            upgradeId: UpgradeId.WandSpeed,
            novice: { neutral: '🧝', male: '🧝‍♂️', female: '🧝‍♀️' },
            expert: { neutral: '🧚', male: '🧚‍♂️', female: '🧚‍♀️' },
        },
        {
            focus: 'health',
            upgradeId: UpgradeId.VitalSpark,
            novice: { neutral: '🧑‍🎓', male: '👨‍🎓', female: '👩‍🎓' },
            expert: { neutral: '🧑‍🏫', male: '👨‍🏫', female: '👩‍🏫' },
        },
        {
            focus: 'fortune',
            upgradeId: UpgradeId.ArcaneFocus,
            novice: { neutral: '🧝', male: '🧝‍♂️', female: '🧝‍♀️' },
            expert: { neutral: '🧙', male: '🧙‍♂️', female: '🧙‍♀️' },
        },
    ],
    baseStats: {
        attackPower: 6,
        attackSpeed: 1.2,
        critChance: 0.15,
        critDamage: 1.7,
        maxHealth: 90,
        luck: 1.1,
        accuracy: 0.95,
        damageReduction: 0,
    },
    upgrades: [
        // Core
        { id: UpgradeId.ArcaneFocus, name: 'Arcane Focus', baseCost: 7, costIncreaseFactor: 1.22, description: 'Increases base Crit Chance.', statChangeText: '+3% Crit', category: 'core', emoji: '🎯' },
        { id: UpgradeId.WandSpeed, name: 'Wand Speed', baseCost: 5, costIncreaseFactor: 1.18, description: 'Increases base Attack Speed.', statChangeText: '+0.25 APS', category: 'core', emoji: '⚡️' },
        { id: UpgradeId.VitalSpark, name: 'Vital Spark', baseCost: 6, costIncreaseFactor: 1.20, description: 'Increases base Max Health.', statChangeText: '+30 Health', category: 'core', emoji: '❤️' },
        { id: UpgradeId.ManaSurge, name: 'Mana Surge', baseCost: 9, costIncreaseFactor: 1.24, description: 'Increases base Crit Damage.', statChangeText: '+25% Crit Dmg', category: 'core', emoji: '💥' },
        // Grind
        { id: UpgradeId.RuneFire, name: 'Rune Fire', baseCost: 30, costIncreaseFactor: 1.35, description: '+2% Fortune.', statChangeText: '+8% Fortune', category: 'grind', emoji: '✨', unlockCriteria: { requiredCoreUpgradeVariety: 1 } },
        { id: UpgradeId.EchoBolt, name: 'Echo Bolt', baseCost: 45, costIncreaseFactor: 1.4, description: 'Increases base Attack Power slightly.', statChangeText: '+6 Attack', category: 'grind', emoji: '💫', unlockCriteria: { requiredCoreUpgradeVariety: 2 } },
        { id: UpgradeId.ArcaneArmor, name: 'Arcane Armor', baseCost: 60, costIncreaseFactor: 1.45, description: '+0.5% Damage Reduction.', statChangeText: '+1.5% Dmg Resist', category: 'grind', emoji: '🛡️', unlockCriteria: { requiredCoreUpgradeVariety: 3 } },
        { id: UpgradeId.SpellLuck, name: 'Spell-Luck', baseCost: 24, costIncreaseFactor: 1.28, description: '+3% Fortune.', statChangeText: '+10% Fortune', category: 'grind', emoji: '🍀', unlockCriteria: { requiredCoreUpgradeVariety: 4 } },
    ],
    skills: [
        { id: SpecialAbilityId.SparkShot, name: 'Arcane Barrage', description: 'Launch 5 homing bolts of pure energy, each dealing 120% AP. Each bolt has a chance to transmute into raw gold on impact.', cost: (stage) => 3 + Math.floor(stage * 1.5), cooldown: 5000, emoji: '✨', unlockCriteria: { requiredTotalLevels: 2 } },
        { id: SpecialAbilityId.MagicBarrier, name: 'Prismatic Ward', description: 'Shields for 75% of max HP, reflects 75% of damage taken, and grants you +20% crit chance for its 8s duration.', cost: (stage) => 5 + stage * 2, cooldown: 18000, emoji: '💠', unlockCriteria: { requiredTotalLevels: 5 } },
        { id: SpecialAbilityId.ChainZap, name: 'Arc Lightning', description: 'A bolt of focused lightning deals 800% AP damage, stuns for 3s, and supercharges your next 3 attacks to be guaranteed criticals.', cost: (stage) => 9 + stage * 3, cooldown: 20000, emoji: '⛓️', unlockCriteria: { requiredTotalLevels: 15 } },
        { id: SpecialAbilityId.MeteorCall, name: 'Apocalypse', description: 'Summon a trio of world-shattering meteors, each dealing 800% AP damage. The impact site becomes a searing inferno, dealing massive fire damage over time.', cost: (stage) => 15 + stage * 4, cooldown: 35000, emoji: '☄️', unlockCriteria: { requiredTotalLevels: 30 } },
    ]
};