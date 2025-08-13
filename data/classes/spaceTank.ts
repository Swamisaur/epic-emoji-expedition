/**
 * @file data/classes/spaceTank.ts
 * @description Defines the Space Tank class.
 */
import { PlayerClass, UpgradeId, SpecialAbilityId } from '../../types';

export const spaceTank: PlayerClass = {
    id: 'spaceTank',
    name: 'Space Tank',
    emoji: '🧑‍🚀',
    description: 'A heavily armored unit, specializing in damage mitigation and high-impact abilities.',
    tier: 'advanced',
    baseClassId: 'snacker',
    unlockDescription: 'Defeat Realm 1 Boss with Snacker',
    classStatId: UpgradeId.PlasteelPlate,
    noviceEffectDescription: "Focusing on Health grants a Novice bonus, increasing Max Health by 10%.",
    expertEffectDescription: "Mastering Health replaces the Novice bonus with an Expert bonus, increasing Max Health by 25% and adding 5% Damage Reduction.",
    specializationBonuses: {
        novice: { percent: { maxHealth: 0.10 } },
        expert: { percent: { maxHealth: 0.25, damageReduction: 0.05 } },
    },
    transformations: [
        {
            focus: 'power',
            upgradeId: UpgradeId.RocketPunch,
            novice: { neutral: '🧑‍🚒', male: '👨‍🚒', female: '👩‍🚒' },
            expert: { neutral: '🦸', male: '🦸‍♂️', female: '🦸‍♀️' },
        },
        {
            focus: 'speed',
            upgradeId: UpgradeId.ZeroGFlow,
            novice: { neutral: '🧑‍✈️', male: '👨‍✈️', female: '👩‍✈️' },
            expert: { neutral: '🧑‍🏎️', male: '👨‍🏎️', female: '👩‍🏎️' },
        },
        {
            focus: 'health',
            upgradeId: UpgradeId.PlasteelPlate,
            novice: { neutral: '🧑‍🔧', male: '👨‍🔧', female: '👩‍🔧' },
            expert: { neutral: '🧑‍🚀', male: '👨‍🚀', female: '👩‍🚀' },
        },
        {
            focus: 'fortune',
            upgradeId: UpgradeId.StarFortune,
            novice: { neutral: '🧝', male: '🧝‍♂️', female: '🧝‍♀️' },
            expert: { neutral: '🧙', male: '🧙‍♂️', female: '🧙‍♀️' },
        },
    ],
    baseStats: {
        attackPower: 8,
        attackSpeed: 0.9,
        critChance: 0.05,
        critDamage: 1.5,
        maxHealth: 200,
        luck: 1.10,
        accuracy: 0.95,
        damageReduction: 0.10,
    },
    upgrades: [
        // Core
        { id: UpgradeId.PlasteelPlate, name: 'Plasteel Plate', baseCost: 5, costIncreaseFactor: 1.17, description: 'Increases base Max Health.', statChangeText: '+60 Health', category: 'core', emoji: '🔩' },
        { id: UpgradeId.GForceGrit, name: 'G-Force Grit', baseCost: 6, costIncreaseFactor: 1.22, description: 'Increases Damage Reduction.', statChangeText: '+3% Dmg Resist', category: 'core', emoji: '🏋️' },
        { id: UpgradeId.RocketPunch, name: 'Rocket Punch', baseCost: 7, costIncreaseFactor: 1.25, description: 'Increases base Attack Power.', statChangeText: '+6 Attack', category: 'core', emoji: '🚀' },
        { id: UpgradeId.StarFortune, name: 'Star Fortune', baseCost: 5, costIncreaseFactor: 1.18, description: 'Increases base Fortune.', statChangeText: '+10% Fortune', category: 'core', emoji: '🌟' },
        // Grind
        { id: UpgradeId.AutoMed, name: 'Auto-Med', baseCost: 54, costIncreaseFactor: 1.42, description: 'Heal a small % of max health after each battle.', statChangeText: '+3% Heal/Wave', category: 'grind', emoji: '💉', unlockCriteria: { requiredCoreUpgradeVariety: 1 } },
        { id: UpgradeId.DeflectorNet, name: 'Deflector Net', baseCost: 66, costIncreaseFactor: 1.48, description: 'Gain a medium shield after each battle.', statChangeText: '+50 Shield/Wave', category: 'grind', emoji: '🌐', unlockCriteria: { requiredCoreUpgradeVariety: 2 } },
        { id: UpgradeId.ZeroGFlow, name: 'Zero-G Flow', baseCost: 36, costIncreaseFactor: 1.38, description: 'Passively increases Attack Speed.', statChangeText: '+0.25 APS', category: 'grind', emoji: '💫', unlockCriteria: { requiredCoreUpgradeVariety: 3 } },
        { id: UpgradeId.IonThrusters, name: 'Ion Thrusters', baseCost: 105, costIncreaseFactor: 1.55, description: 'Increases base Crit Chance.', statChangeText: '+2% Crit', category: 'grind', emoji: '☄️', unlockCriteria: { requiredCoreUpgradeVariety: 4 } },
    ],
    skills: [
        { id: SpecialAbilityId.RocketDash, name: 'Rocket Dash', description: 'Engage thrusters and dash through the enemy with explosive force, dealing 600% AP damage.', cost: (stage) => 5 + stage * 2, cooldown: 8000, emoji: '💨', unlockCriteria: { requiredTotalLevels: 2 } },
        { id: SpecialAbilityId.ForceField, name: 'Force Field', description: 'Activate a personal force field, absorbing damage equal to an unbelievable 100% of your max HP.', cost: (stage) => 7 + Math.floor(stage * 2.5), cooldown: 20000, emoji: '🛡️', unlockCriteria: { requiredTotalLevels: 5 } },
        { id: SpecialAbilityId.OrbitalStrike, name: 'Orbital Strike', description: 'Call down a devastating orbital laser strike, dealing an immense 2000% AP damage and stunning the target for 4s.', cost: (stage) => 15 + stage * 4, cooldown: 30000, emoji: '🛰️', unlockCriteria: { requiredTotalLevels: 15 } },
        { id: SpecialAbilityId.Singularity, name: 'Singularity', description: 'Create a micro-singularity, dealing 2500% AP damage and weakening the enemy\'s very existence, causing them to deal 50% less damage.', cost: (stage) => 25 + stage * 6, cooldown: 60000, emoji: '🌌', unlockCriteria: { requiredTotalLevels: 30 } },
    ]
};