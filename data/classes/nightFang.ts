/**
 * @file data/classes/nightFang.ts
 * @description Defines the Night Fang class.
 */
import { PlayerClass, UpgradeId, SpecialAbilityId } from '../../types';

export const nightFang: PlayerClass = {
    id: 'nightFang',
    name: 'Night Fang',
    emoji: '🧛',
    description: 'A deadly predator of the night, thriving on critical strikes and life steal.',
    tier: 'advanced',
    baseClassId: 'mage',
    unlockDescription: 'Defeat Realm 1 Boss with Mage',
    classStatId: UpgradeId.BloodEdge,
    noviceEffectDescription: "Focusing on criticals grants a Novice bonus, increasing Crit Chance by 10%.",
    expertEffectDescription: "Mastering criticals replaces the Novice bonus with an Expert bonus, increasing Crit Chance by 15% and Crit Damage by 15%.",
    specializationBonuses: {
        novice: { percent: { critChance: 0.10 } },
        expert: { percent: { critChance: 0.15, critDamage: 0.15 } },
    },
    transformations: [
        {
            focus: 'power',
            upgradeId: UpgradeId.ClawFury,
            novice: { neutral: '🧟', male: '🧟‍♂️', female: '🧟‍♀️' },
            expert: { neutral: '🦹', male: '🦹‍♂️', female: '🦹‍♀️' },
        },
        {
            focus: 'speed',
            upgradeId: UpgradeId.SharpenFang,
            novice: { neutral: '🤸', male: '🤸‍♂️', female: '🤸‍♀️' },
            expert: { neutral: '🧝', male: '🧝‍♂️', female: '🧝‍♀️' },
        },
        {
            focus: 'health',
            upgradeId: UpgradeId.DarkVitality,
            novice: { neutral: '🧙', male: '🧙‍♂️', female: '🧙‍♀️' },
            expert: { neutral: '💁', male: '💁‍♂️', female: '💁‍♀️' },
        },
        {
            focus: 'fortune',
            upgradeId: UpgradeId.BloodEdge,
            novice: { neutral: '🕵️', male: '🕵️‍♂️', female: '🕵️‍♀️' },
            expert: { neutral: '🧛', male: '🧛‍♂️', female: '🧛‍♀️' },
        },
    ],
    baseStats: {
        attackPower: 9,
        attackSpeed: 1.3,
        critChance: 0.20,
        critDamage: 1.8,
        maxHealth: 110,
        luck: 1.15,
        accuracy: 0.95,
        damageReduction: 0,
    },
    upgrades: [
        // Core
        { id: UpgradeId.BloodEdge, name: 'Blood Edge', baseCost: 6, costIncreaseFactor: 1.20, description: 'Increases base Crit Chance.', statChangeText: '+4% Crit', category: 'core', emoji: '🔪' },
        { id: UpgradeId.SharpenFang, name: 'Sharpen Fang', baseCost: 6, costIncreaseFactor: 1.20, description: 'Increases base Attack Speed.', statChangeText: '+0.25 APS', category: 'core', emoji: '🦷' },
        { id: UpgradeId.DarkVitality, name: 'Dark Vitality', baseCost: 7, costIncreaseFactor: 1.22, description: 'Increases base Max Health.', statChangeText: '+35 Health', category: 'core', emoji: '🦇' },
        { id: UpgradeId.ClawFury, name: 'Claw Fury', baseCost: 10, costIncreaseFactor: 1.25, description: 'Increases base Crit Damage.', statChangeText: '+30% Crit Dmg', category: 'core', emoji: '💅' },
        // Grind
        { id: UpgradeId.TheMoon, name: 'The Moon', baseCost: 36, costIncreaseFactor: 1.38, description: '+3% Fortune.', statChangeText: '+10% Fortune', category: 'grind', emoji: '🌕', unlockCriteria: { requiredCoreUpgradeVariety: 1 } },
        { id: UpgradeId.NightHunger, name: 'Night Hunger', baseCost: 54, costIncreaseFactor: 1.42, description: 'Increases base Attack Power.', statChangeText: '+8 Attack', category: 'grind', emoji: '🥩', unlockCriteria: { requiredCoreUpgradeVariety: 2 } },
        { id: UpgradeId.BleedingHits, name: 'Bleeding Hits', baseCost: 90, costIncreaseFactor: 1.48, description: 'Critical hits have a chance to apply a strong bleed.', statChangeText: 'Crits may bleed', category: 'grind', emoji: '🩸', unlockCriteria: { requiredCoreUpgradeVariety: 3 } },
        { id: UpgradeId.Awoooo, name: 'Awoooo', baseCost: 120, costIncreaseFactor: 1.5, description: '+5% Attack Power.', statChangeText: '+15% Attack', category: 'grind', emoji: '🐺', unlockCriteria: { requiredCoreUpgradeVariety: 4 } },
    ],
    skills: [
        { id: SpecialAbilityId.QuickBite, name: 'Quick Bite', description: 'A vicious bite that deals 200% AP damage, heals you for 150% of damage dealt, and fills you with bloodlust for 10s.', cost: (stage) => 4 + Math.floor(stage * 1.5), cooldown: 7000, emoji: '🧛', unlockCriteria: { requiredTotalLevels: 2 } },
        { id: SpecialAbilityId.BatForm, name: 'Bat Form', description: 'Dissolve into a swarm of bats, gaining an immense +75% Damage Reduction and +60% Attack Speed for 10s.', cost: (stage) => 6 + stage * 2, cooldown: 20000, emoji: '🦇', unlockCriteria: { requiredTotalLevels: 5 } },
        { id: SpecialAbilityId.ShadowRift, name: 'Shadow Rift', description: 'Rip a hole in reality. For 10s, your next 10 attacks are guaranteed, soul-shattering critical hits.', cost: (stage) => 12 + Math.floor(stage * 3.5), cooldown: 25000, emoji: '🌀', unlockCriteria: { requiredTotalLevels: 15 } },
        { id: SpecialAbilityId.BloodMoon, name: 'Blood Moon', description: 'Summon a Blood Moon, dealing massive damage and granting Frenzy and an insane +100% Crit Damage for 8s.', cost: (stage) => 20 + stage * 5, cooldown: 40000, emoji: '🔴', unlockCriteria: { requiredTotalLevels: 30 } },
    ]
};