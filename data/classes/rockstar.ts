/**
 * @file data/classes/rockstar.ts
 * @description Defines the Rockstar class.
 */
import { PlayerClass, UpgradeId, SpecialAbilityId } from '../../types';

export const rockstar: PlayerClass = {
    id: 'rockstar',
    name: 'Rockstar',
    emoji: '🧑‍🎤',
    description: 'An icon of shred, overwhelming foes with raw power and flair.',
    tier: 'advanced',
    baseClassId: 'ninja',
    unlockDescription: 'Defeat Realm 1 Boss with Ninja',
    classStatId: UpgradeId.PowerChord,
    noviceEffectDescription: "Focusing on power grants a Novice bonus, increasing Attack Power by 10%.",
    expertEffectDescription: "Mastering power replaces the Novice bonus with an Expert bonus, increasing Attack Power by 25% and Crit Damage by 10%.",
    specializationBonuses: {
        novice: { percent: { attackPower: 0.10 } },
        expert: { percent: { attackPower: 0.25, critDamage: 0.10 } },
    },
    transformations: [
        {
            focus: 'power',
            upgradeId: UpgradeId.PowerChord,
            novice: { neutral: '🧑‍🚒', male: '👨‍🚒', female: '👩‍🚒' },
            expert: { neutral: '🧑‍🎤', male: '👨‍🎤', female: '👩‍🎤' },
        },
        {
            focus: 'speed',
            upgradeId: UpgradeId.Encore,
            novice: { neutral: '🕺', male: '🕺', female: '💃' },
            expert: { neutral: '🦸', male: '🦸‍♂️', female: '🦸‍♀️' },
        },
        {
            focus: 'health',
            upgradeId: UpgradeId.StageStamina,
            novice: { neutral: '💂', male: '💂‍♂️', female: '💂‍♀️' },
            expert: { neutral: '🏋️', male: '🏋️‍♂️', female: '🏋️‍♀️' },
        },
        {
            focus: 'fortune',
            upgradeId: UpgradeId.CrowdSurf,
            novice: { neutral: '🧑‍🎨', male: '👨‍🎨', female: '👩‍🎨' },
            expert: { neutral: '🧙', male: '🧙‍♂️', female: '🧙‍♀️' },
        },
    ],
    baseStats: {
        attackPower: 12,
        attackSpeed: 1.2,
        critChance: 0.05,
        critDamage: 1.8,
        maxHealth: 100,
        luck: 1.1,
        accuracy: 0.95,
        damageReduction: 0,
    },
    upgrades: [
        // Core
        { id: UpgradeId.PowerChord, name: 'Power Chord', baseCost: 4, costIncreaseFactor: 1.16, description: 'Increases base Attack Power.', statChangeText: '+8 Attack', category: 'core', emoji: '🎸' },
        { id: UpgradeId.Encore, name: 'Encore', baseCost: 6, costIncreaseFactor: 1.20, description: 'Increases base Attack Speed.', statChangeText: '+0.25 APS', category: 'core', emoji: '🤘' },
        { id: UpgradeId.StageStamina, name: 'Stage Stamina', baseCost: 7, costIncreaseFactor: 1.22, description: 'Increases base Max Health.', statChangeText: '+40 Health', category: 'core', emoji: '🎤' },
        { id: UpgradeId.CrowdSurf, name: 'Crowd Surf', baseCost: 10, costIncreaseFactor: 1.25, description: 'Increases base Crit Chance.', statChangeText: '+2.5% Crit', category: 'core', emoji: '🌊' },
        // Grind
        { id: UpgradeId.AmpFeedback, name: 'Amp Feedback', baseCost: 36, costIncreaseFactor: 1.38, description: '+5% Attack Power.', statChangeText: '+12% Attack', category: 'grind', emoji: '🔊', unlockCriteria: { requiredCoreUpgradeVariety: 1 } },
        { id: UpgradeId.PyroShow, name: 'Pyro Show', baseCost: 90, costIncreaseFactor: 1.45, description: 'Attacks have a chance to apply a light burn.', statChangeText: 'Burn Chance', category: 'grind', emoji: '🔥', unlockCriteria: { requiredCoreUpgradeVariety: 2 } },
        { id: UpgradeId.StageFlair, name: 'Stage Flair', baseCost: 30, costIncreaseFactor: 1.32, description: '+10% Crit Damage.', statChangeText: '+25% Crit Dmg', category: 'grind', emoji: '🕺', unlockCriteria: { requiredCoreUpgradeVariety: 3 } },
        { id: UpgradeId.FanFrenzy, name: 'Fan Frenzy', baseCost: 45, costIncreaseFactor: 1.35, description: '+5% Fortune.', statChangeText: '+10% Fortune', category: 'grind', emoji: '🙌', unlockCriteria: { requiredCoreUpgradeVariety: 4 } },
    ],
    skills: [
        { id: SpecialAbilityId.PowerRiff, name: 'Power Riff', description: 'Shred a colossal power chord that blasts your enemy for 400% AP damage.', cost: (stage) => 4 + Math.floor(stage * 1.5), cooldown: 6000, emoji: '🎶', unlockCriteria: { requiredTotalLevels: 2 } },
        { id: SpecialAbilityId.AmpShield, name: 'Amp Shield', description: 'Crank the amp to 11, creating a sonic shield that absorbs damage equal to a staggering 50% of your max HP.', cost: (stage) => 6 + stage * 2, cooldown: 15000, emoji: '🛡️', unlockCriteria: { requiredTotalLevels: 5 } },
        { id: SpecialAbilityId.SonicBoom, name: 'Sonic Boom', description: 'Unleash a cataclysmic sonic boom that deals 800% AP damage and stuns the enemy for 2s.', cost: (stage) => 11 + stage * 3, cooldown: 22000, emoji: '💥', unlockCriteria: { requiredTotalLevels: 15 } },
        { id: SpecialAbilityId.Starfall, name: 'Starfall', description: 'You are a rock god! Call down a rain of 5 guaranteed, stage-shattering critical hits from the heavens.', cost: (stage) => 18 + Math.floor(stage * 4.5), cooldown: 30000, emoji: '🌟', unlockCriteria: { requiredTotalLevels: 30 } },
    ]
};