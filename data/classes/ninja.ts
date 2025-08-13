/**
 * @file data/classes/ninja.ts
 * @description Defines the Ninja class.
 */
import { PlayerClass, UpgradeId, SpecialAbilityId } from '../../types';

export const ninja: PlayerClass = {
    id: 'ninja',
    name: 'Ninja',
    emoji: '🥷',
    description: 'A swift assassin, prioritizing raw power and critical hits.',
    tier: 'base',
    unlockDescription: 'Available from start.',
    classStatId: UpgradeId.EdgeUp,
    noviceEffectDescription: "Focusing on power grants a Novice bonus, increasing Attack Power by 10%.",
    expertEffectDescription: "Mastering power replaces the Novice bonus with an Expert bonus, increasing Attack Power by 25% and Crit Damage by 10%.",
    specializationBonuses: {
        novice: { percent: { attackPower: 0.10 } },
        expert: { percent: { attackPower: 0.25, critDamage: 0.10 } },
    },
    transformations: [
        {
            focus: 'power',
            upgradeId: UpgradeId.EdgeUp,
            novice: { neutral: '🏋️', male: '🏋️‍♂️', female: '🏋️‍♀️' },
            expert: { neutral: '🥷', male: '🥷', female: '🥷' },
        },
        {
            focus: 'speed',
            upgradeId: UpgradeId.QuickHands,
            novice: { neutral: '🏃', male: '🏃‍♂️', female: '🏃‍♀️' },
            expert: { neutral: '🤸', male: '🤸‍♂️', female: '🤸‍♀️' },
        },
        {
            focus: 'health',
            upgradeId: UpgradeId.IronLungs,
            novice: { neutral: '💂', male: '💂‍♂️', female: '💂‍♀️' },
            expert: { neutral: '🫅', male: '🤴', female: '👸' },
        },
        {
            focus: 'fortune',
            upgradeId: UpgradeId.KeenEye,
            novice: { neutral: '🕵️', male: '🕵️‍♂️', female: '🕵️‍♀️' },
            expert: { neutral: '🤵', male: '🤵‍♂️', female: '🤵‍♀️' },
        },
    ],
    baseStats: {
        attackPower: 8,
        attackSpeed: 1.5,
        critChance: 0.10,
        critDamage: 1.6,
        maxHealth: 80,
        luck: 1.05,
        accuracy: 0.95,
        damageReduction: 0,
    },
    upgrades: [
        // Core
        { id: UpgradeId.EdgeUp, name: 'Edge Up', baseCost: 5, costIncreaseFactor: 1.18, description: 'Increases base Attack Power.', statChangeText: '+5 Attack', category: 'core', emoji: '🔪' },
        { id: UpgradeId.QuickHands, name: 'Quick Hands', baseCost: 4, costIncreaseFactor: 1.15, description: 'Increases base Attack Speed.', statChangeText: '+0.25 APS', category: 'core', emoji: '💨' },
        { id: UpgradeId.IronLungs, name: 'Iron Lungs', baseCost: 6, costIncreaseFactor: 1.20, description: 'Increases base Max Health.', statChangeText: '+30 Health', category: 'core', emoji: '🫁' },
        { id: UpgradeId.KeenEye, name: 'Keen Eye', baseCost: 7, costIncreaseFactor: 1.22, description: 'Increases base Crit Chance.', statChangeText: '+2% Crit', category: 'core', emoji: '👁️' },
        // Grind
        { id: UpgradeId.Footwork, name: 'Footwork', baseCost: 30, costIncreaseFactor: 1.35, description: '+0.25 Attacks Per Second.', statChangeText: '+0.25 APS', category: 'grind', emoji: '🦶', unlockCriteria: { requiredCoreUpgradeVariety: 1 } },
        { id: UpgradeId.PoisonTips, name: 'Poison Tips', baseCost: 75, costIncreaseFactor: 1.4, description: 'Attacks have a chance to apply a light poison.', statChangeText: 'Poison Chance', category: 'grind', emoji: '☠️', unlockCriteria: { requiredCoreUpgradeVariety: 2 } },
        { id: UpgradeId.CloakedBlade, name: 'Cloaked Blade', baseCost: 24, costIncreaseFactor: 1.28, description: '+10% Crit Damage.', statChangeText: '+20% Crit Dmg', category: 'grind', emoji: '🤫', unlockCriteria: { requiredCoreUpgradeVariety: 3 } },
        { id: UpgradeId.AssassinsCode, name: 'Assassin’s Code', baseCost: 120, costIncreaseFactor: 1.5, description: '+5% Attack Power.', statChangeText: '+10% Attack', category: 'grind', emoji: '📜', unlockCriteria: { requiredCoreUpgradeVariety: 4 } },
    ],
    skills: [
        { id: SpecialAbilityId.SwiftSlash, name: 'Shadow Rend', description: 'Unleash a blindingly fast 3-hit combo, each strike dealing 250% AP. Critical hits rend the foe\'s spirit, weakening their next attack.', cost: (stage) => 4 + Math.floor(stage * 1.5), cooldown: 5000, emoji: '⚔️', unlockCriteria: { requiredTotalLevels: 2 } },
        { id: SpecialAbilityId.SmokeScreen, name: 'Misty Veil', description: 'Vanish into an unnatural mist. The next 3 enemy attacks will miss. Your first strike from the mist is a guaranteed critical hit.', cost: (stage) => 5 + Math.floor(stage * 1.5), cooldown: 12000, emoji: '💨', unlockCriteria: { requiredTotalLevels: 5 } },
        { id: SpecialAbilityId.ShurikenStorm, name: 'Blade Cyclone', description: 'Become a whirlwind of death, launching 8 ricocheting shurikens. Each deals 120% AP and has a high chance to cause a deep bleed.', cost: (stage) => 10 + stage * 3, cooldown: 20000, emoji: '⭐', unlockCriteria: { requiredTotalLevels: 15 } },
        { id: SpecialAbilityId.DragonStrike, name: 'Dragon\'s Fury', description: 'Channel the spirit of a vengeful dragon, dealing a cataclysmic 1500% AP strike that stuns for 3s and leaves the foe burning with dragonfire.', cost: (stage) => 15 + stage * 4, cooldown: 30000, emoji: '🐉', unlockCriteria: { requiredTotalLevels: 30 } },
    ]
};